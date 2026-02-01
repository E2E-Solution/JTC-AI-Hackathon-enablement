import json
import logging
import os
import time
from typing import Dict, List, Optional

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from dotenv import load_dotenv

from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("hackathon-backend")


class AssistantRequest(BaseModel):
  clientId: Optional[str] = Field(default=None)
  threadId: Optional[str] = Field(default=None)
  stageId: Optional[str] = Field(default=None)
  message: str


class AssistantResponse(BaseModel):
  reply: str
  metadata: Optional[dict] = None


load_dotenv()
load_dotenv(".env.local", override=True)

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


def _build_extra_body() -> dict:
  extra_body = {
    "agent": {"name": app.state.agent_name, "type": "agent_reference"}
  }

  if AUTO_APPROVE_TOOLS:
    extra_body["tool_approval"] = {"mode": "auto"}
    if AUTO_APPROVE_TOOL_NAMES:
      extra_body["tool_approval"]["tool_names"] = AUTO_APPROVE_TOOL_NAMES

  return extra_body


def _create_response(user_input: str, extra_body: dict, stream: bool = False):
  try:
    return app.state.openai_client.responses.create(
      input=[{"role": "user", "content": user_input}],
      extra_body=extra_body,
      stream=stream,
    )
  except Exception as exc:
    error_text = str(exc)
    if "Unknown parameter: 'tool_approval'" in error_text and "tool_approval" in extra_body:
      logger.warning("tool_approval not supported by this endpoint. Retrying without it.")
      extra_body.pop("tool_approval", None)
      return app.state.openai_client.responses.create(
        input=[{"role": "user", "content": user_input}],
        extra_body=extra_body,
        stream=stream,
      )
    raise


@app.on_event("startup")
def startup() -> None:
  if not AI_PROJECT_ENDPOINT or not AGENT_NAME:
    raise RuntimeError("AI_PROJECT_ENDPOINT and AGENT_NAME must be set")

  try:
    project_client = AIProjectClient(
      endpoint=AI_PROJECT_ENDPOINT,
      credential=DefaultAzureCredential(),
    )
    agent = project_client.agents.get(agent_name=AGENT_NAME)

    app.state.project_client = project_client
    app.state.agent_name = agent.name
    app.state.openai_client = project_client.get_openai_client()
    logger.info("Startup complete. Agent '%s' loaded.", app.state.agent_name)
  except Exception:
    logger.exception("Startup failed while initializing Azure AI Project client.")
    raise


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

  extra_body = _build_extra_body()

  try:
    response = _create_response(user_input, extra_body, stream=False)
  except Exception as exc:
    logger.exception("Assistant request failed.")
    raise HTTPException(status_code=500, detail=str(exc)) from exc

  reply_text = getattr(response, "output_text", None) or "I am ready to help. Could you provide more detail?"
  metadata = getattr(response, "context", None)
  if metadata and not isinstance(metadata, dict):
    metadata = getattr(metadata, "__dict__", None)

  return AssistantResponse(reply=reply_text, metadata=metadata)


@app.post("/api/assistant/stream")
def assistant_stream(payload: AssistantRequest, request: Request):
  enforce_api_key(request)

  rate_key = payload.clientId or request.client.host or "anonymous"
  enforce_rate_limit(rate_key)

  stage_label = payload.stageId or "Unknown"
  user_input = f"Current stage: {stage_label}\n\n{payload.message}"
  extra_body = _build_extra_body()

  def event_stream():
    try:
      stream = _create_response(user_input, extra_body, stream=True)
      for event in stream:
        event_type = None
        delta = None

        if isinstance(event, dict):
          event_type = event.get("type")
          delta = event.get("delta") or event.get("text")
        else:
          event_type = getattr(event, "type", None)
          delta = getattr(event, "delta", None) or getattr(event, "text", None)

        if event_type == "response.output_text.delta" or delta:
          if delta:
            yield f"data: {json.dumps({'delta': delta})}\n\n"

      yield "data: {\"done\": true}\n\n"
    except Exception as exc:
      logger.exception("Assistant stream failed.")
      yield f"data: {json.dumps({'error': str(exc)})}\n\n"

  return StreamingResponse(event_stream(), media_type="text/event-stream")
