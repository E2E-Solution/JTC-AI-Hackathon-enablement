import os
import time
from typing import Dict, List, Optional

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient


class AssistantRequest(BaseModel):
  clientId: Optional[str] = Field(default=None)
  threadId: Optional[str] = Field(default=None)
  stageId: Optional[str] = Field(default=None)
  message: str


class AssistantResponse(BaseModel):
  reply: str
  metadata: Optional[dict] = None


AI_PROJECT_ENDPOINT = os.getenv("AI_PROJECT_ENDPOINT", "")
AGENT_NAME = os.getenv("AGENT_NAME", "")
AGENT_SHARED_KEY = os.getenv("AGENT_SHARED_KEY", "")
RATE_LIMIT_PER_MINUTE = int(os.getenv("RATE_LIMIT_PER_MINUTE", "60"))
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*")
AUTO_APPROVE_TOOLS = os.getenv("AUTO_APPROVE_TOOLS", "false").lower() in {"1", "true", "yes"}
AUTO_APPROVE_TOOL_NAMES = [
  name.strip()
  for name in os.getenv("AUTO_APPROVE_TOOL_NAMES", "").split(",")
  if name.strip()
]

app = FastAPI(title="Hackathon Assistant Backend")

origins = [origin.strip() for origin in CORS_ORIGINS.split(",") if origin.strip()]
allow_all = "*" in origins or not origins

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"] if allow_all else origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

app.state.rate_window = 60
app.state.rate_limit = RATE_LIMIT_PER_MINUTE
app.state.rate_events: Dict[str, List[float]] = {}


def enforce_api_key(request: Request) -> None:
  if not AGENT_SHARED_KEY:
    return
  provided = request.headers.get("X-AGENT-KEY", "")
  if provided != AGENT_SHARED_KEY:
    raise HTTPException(status_code=401, detail="Invalid API key")


def enforce_rate_limit(key: str) -> None:
  now = time.time()
  window = app.state.rate_window
  limit = app.state.rate_limit

  events = app.state.rate_events.get(key, [])
  events = [timestamp for timestamp in events if now - timestamp < window]

  if len(events) >= limit:
    raise HTTPException(status_code=429, detail="Rate limit exceeded")

  events.append(now)
  app.state.rate_events[key] = events


@app.on_event("startup")
def startup() -> None:
  if not AI_PROJECT_ENDPOINT or not AGENT_NAME:
    raise RuntimeError("AI_PROJECT_ENDPOINT and AGENT_NAME must be set")

  project_client = AIProjectClient(
    endpoint=AI_PROJECT_ENDPOINT,
    credential=DefaultAzureCredential(),
  )
  agent = project_client.agents.get(agent_name=AGENT_NAME)

  app.state.project_client = project_client
  app.state.agent_name = agent.name
  app.state.openai_client = project_client.get_openai_client()


@app.get("/health")
def health() -> dict:
  return {"status": "ok"}


@app.post("/api/assistant", response_model=AssistantResponse)
def assistant(payload: AssistantRequest, request: Request) -> AssistantResponse:
  enforce_api_key(request)

  rate_key = payload.clientId or request.client.host or "anonymous"
  enforce_rate_limit(rate_key)

  stage_label = payload.stageId or "Unknown"
  user_input = f"Current stage: {stage_label}\n\n{payload.message}"

  extra_body = {
    "agent": {"name": app.state.agent_name, "type": "agent_reference"}
  }

  if AUTO_APPROVE_TOOLS:
    extra_body["tool_approval"] = {"mode": "auto"}
    if AUTO_APPROVE_TOOL_NAMES:
      extra_body["tool_approval"]["tool_names"] = AUTO_APPROVE_TOOL_NAMES

  try:
    response = app.state.openai_client.responses.create(
      input=[{"role": "user", "content": user_input}],
      extra_body=extra_body,
    )
  except Exception as exc:
    raise HTTPException(status_code=500, detail=str(exc)) from exc

  reply_text = getattr(response, "output_text", None) or "I am ready to help. Could you provide more detail?"
  metadata = getattr(response, "context", None)
  if metadata and not isinstance(metadata, dict):
    metadata = getattr(metadata, "__dict__", None)

  return AssistantResponse(reply=reply_text, metadata=metadata)
