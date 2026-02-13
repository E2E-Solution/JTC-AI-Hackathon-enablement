# Solution Architecture — Procurement Command Center

## 1. Solution Overview

The **Procurement Command Center** is an AI-powered Hands-On Lab (HOL) platform that guides users through building an intelligent procurement system using Azure AI Foundry. It pairs a React single-page application with a FastAPI backend that proxies requests to an **Azure AI Foundry Agent**, delivering contextual, stage-aware AI assistance throughout the lab experience.

### Key Capabilities

| Capability | Description |
|---|---|
| **Stage-aware AI Assistant** | A sidebar chat assistant that automatically sends the user's current lab stage to the AI agent, so responses are always relevant to what the user is working on. |
| **Streaming Responses** | Real-time Server-Sent Events (SSE) streaming from the Foundry Agent through FastAPI to the browser for a responsive chat experience. |
| **Multi-thread Conversations** | Client-side conversation management with localStorage persistence across pages and sessions. |
| **Rate Limiting & Auth** | Shared-key authentication and per-client rate limiting at the backend layer. |
| **Tool Auto-Approval** | Optional automatic approval of Foundry Agent MCP tool calls (e.g., Microsoft Learn lookups). |

---

## 2. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          GitHub Pages (Static Hosting)                      │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                     React SPA (Vite + Tailwind)                      │  │
│  │                                                                       │  │
│  │  ┌──────────────┐   ┌────────────────┐   ┌────────────────────────┐  │  │
│  │  │  Layout.jsx   │   │  Page Routes   │   │  LearningAssistant /  │  │  │
│  │  │  (Nav + Stage │──▶│  Stage 1/2/3   │   │  HackathonAssistant   │  │  │
│  │  │   Detection)  │   │  Step pages    │   │  (Chat Sidebar)       │  │  │
│  │  └──────────────┘   └────────────────┘   └──────────┬─────────────┘  │  │
│  │                                                      │                │  │
│  │              stageId derived from URL path            │                │  │
│  │              clientId / threadId from localStorage    │                │  │
│  └──────────────────────────────────────────────────────┼────────────────┘  │
└─────────────────────────────────────────────────────────┼──────────────────┘
                                                          │
                          HTTPS POST (JSON + SSE stream)  │
                          Header: X-AGENT-KEY             │
                          Body: { clientId, threadId,     │
                                  stageId, message }      │
                                                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                   Azure Container Apps (Backend)                            │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                    FastAPI Application (Python)                       │  │
│  │                                                                       │  │
│  │  1. Enforce X-AGENT-KEY authentication                                │  │
│  │  2. Enforce per-client rate limiting                                  │  │
│  │  3. Prepend stageId to user message:                                  │  │
│  │     "Current stage: {stageId}\n\n{message}"                           │  │
│  │  4. Build extra_body with agent name + tool_approval                  │  │
│  │  5. Call openai_client.responses.create(...)                          │  │
│  │  6. Stream SSE deltas back to client                                  │  │
│  └──────────────────────────────────────────────────────┬────────────────┘  │
└─────────────────────────────────────────────────────────┼──────────────────┘
                                                          │
                        Azure AI Projects SDK             │
                        DefaultAzureCredential            │
                                                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      Azure AI Foundry                                       │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │              Foundry Agent: "utilit-agents-azure-msft"               │  │
│  │                                                                       │  │
│  │  • Knowledge Base (grounding data for vendor matching)                │  │
│  │  • Code Interpreter (Python analysis & visualizations)                │  │
│  │  • MCP Tools (e.g., Microsoft Learn, OpenAPI connections)             │  │
│  │  • Model: GPT-based LLM                                              │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Component Breakdown

### 3.1 Frontend — React SPA

| Component | File | Role |
|---|---|---|
| **App** | `src/App.jsx` | Defines all routes (`/`, `/stages`, `/stage/{n}/step/{n.m}`) |
| **Layout** | `src/components/Layout.jsx` | Wraps every page. Extracts `stageId` from the current URL path and passes it to the assistant component. |
| **LearningAssistant** | `src/components/LearningAssistant.jsx` | The sidebar chat drawer. Manages `clientId`, `threadId`, sends requests, handles SSE streaming. |
| **HackathonAssistant** | `src/components/HackathonAssistant.jsx` | Alternative assistant component with the same architecture (used for hackathon-specific guidance). |
| **Stage Pages** | `src/pages/Stage*.jsx` | Content pages for each lab stage with step-by-step instructions. |

#### How `stageId` Is Derived

```
Layout.jsx → getStageId(pathname)
├── /               → "Mission"
├── /stages         → "Overview"
├── /stage/1        → "1"
├── /stage/1/step/1.1 → "1"
├── /stage/2/step/2.3 → "2"
└── /stage/3        → "3"
```

The `stageId` is computed by parsing `location.pathname` and extracting the stage number. This value is passed as a prop to the assistant component and included in every API request.

### 3.2 Backend — FastAPI

| File | Role |
|---|---|
| `backend/main.py` | Single-file API service. Handles auth, rate-limiting, context injection, and proxying to the Foundry Agent. |
| `backend/Dockerfile` | Container image definition (Python 3.11 slim + uvicorn). |
| `backend/.env` | Runtime configuration for the Foundry project endpoint, agent name, CORS origins. |

#### API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Health check — returns `{"status": "ok"}` |
| `POST` | `/api/assistant` | Synchronous request/response (non-streaming) |
| `POST` | `/api/assistant/stream` | Streaming response via SSE (preferred by the frontend) |

#### Request Schema (`AssistantRequest`)

```json
{
  "clientId":  "string (optional) — browser-generated UUID",
  "threadId":  "string (optional) — conversation thread UUID",
  "stageId":   "string (optional) — current lab stage identifier",
  "message":   "string (required) — user's question"
}
```

#### Response Schema (`AssistantResponse` — non-streaming)

```json
{
  "reply":    "string — agent's response text",
  "metadata": "object (optional) — context metadata from the agent"
}
```

#### SSE Stream Format (streaming)

```
data: {"delta": "partial text chunk"}
data: {"delta": "more text..."}
data: {"done": true}
```

### 3.3 Azure AI Foundry Agent

The Foundry Agent (`utilit-agents-azure-msft`) is a pre-configured AI agent hosted in Azure AI Foundry. It is accessed via the **Azure AI Projects SDK** using `DefaultAzureCredential` (Managed Identity in production, Azure CLI/VS Code credentials locally).

The backend calls the agent through the OpenAI-compatible `responses.create()` API exposed by the `AIProjectClient`.

---

## 4. How Context Flows End-to-End

This is the critical path that ensures the AI agent always knows what the user is working on:

```
Step 1: User navigates to /stage/2/step/2.1
  ↓
Step 2: Layout.jsx parses URL → stageId = "2"
  ↓
Step 3: stageId is passed as prop to <LearningAssistant stageId="2" />
  ↓
Step 4: User types "How do I create a Logic Apps workflow?"
  ↓
Step 5: Frontend sends POST to /api/assistant/stream:
        {
          "clientId":  "a1b2c3d4-...",
          "threadId":  "e5f6g7h8-...",
          "stageId":   "2",
          "message":   "How do I create a Logic Apps workflow?"
        }
        Headers: { X-AGENT-KEY: "..." }
  ↓
Step 6: Backend prepends stage context:
        user_input = "Current stage: 2\n\nHow do I create a Logic Apps workflow?"
  ↓
Step 7: Backend builds extra_body:
        {
          "agent": { "name": "utilit-agents-azure-msft", "type": "agent_reference" },
          "tool_approval": { "mode": "auto" }   // if AUTO_APPROVE_TOOLS=true
        }
  ↓
Step 8: Backend calls openai_client.responses.create(
          input=[{"role": "user", "content": user_input}],
          extra_body=extra_body,
          stream=True
        )
  ↓
Step 9: Foundry Agent processes the request with:
        • Knowledge Base grounding
        • Code Interpreter (if needed)
        • MCP tool calls (if configured)
  ↓
Step 10: SSE deltas streamed back through FastAPI → Browser
         User sees the response render in real time
```

---

## 5. Configuration Reference

### 5.1 Frontend Environment Variables (Build-Time)

| Variable | Required | Description |
|---|---|---|
| `VITE_ASSISTANT_API_ENDPOINT` | Yes | Full URL of the backend API (e.g., `https://your-app.azurecontainerapps.io/api/assistant`) |
| `VITE_ASSISTANT_API_KEY` | No | Shared key sent as `X-AGENT-KEY` header. Lightweight gate, not a secret (bundled into client code). |

Set these in `.env.local` for local development or as GitHub Actions secrets for CI/CD builds.

### 5.2 Backend Environment Variables (Runtime)

| Variable | Required | Default | Description |
|---|---|---|---|
| `AI_PROJECT_ENDPOINT` | Yes | — | Azure AI Foundry project endpoint URL |
| `AGENT_NAME` | Yes | — | Name of the Foundry Agent to invoke |
| `AGENT_SHARED_KEY` | No | `""` | Shared key to validate `X-AGENT-KEY` header |
| `RATE_LIMIT_PER_MINUTE` | No | `60` | Max requests per client per minute |
| `CORS_ORIGINS` | No | `*` | Comma-separated allowed origins |
| `AUTO_APPROVE_TOOLS` | No | `false` | Auto-approve MCP tool calls from the agent |
| `AUTO_APPROVE_TOOL_NAMES` | No | `""` | Comma-separated list of specific tool names to auto-approve |

### 5.3 Authentication Chain

```
Browser                     Backend                          Azure AI Foundry
  │                           │                                    │
  │── X-AGENT-KEY header ───▶│                                    │
  │                           │── DefaultAzureCredential ────────▶│
  │                           │   (Managed Identity / CLI / VS)   │
  │                           │                                    │
```

- **Browser → Backend**: Lightweight shared key (`X-AGENT-KEY`). Not a true secret since it's embedded in the client bundle.
- **Backend → Foundry**: Azure `DefaultAzureCredential` — uses Managed Identity in Azure Container Apps, or local developer credentials (Azure CLI / VS Code) during development.

---

## 6. Tips & Tricks

### 6.1 Frontend Tips

| Tip | Detail |
|---|---|
| **Stage context is automatic** | The `Layout.jsx` component parses the URL and injects `stageId` into the assistant. No manual configuration needed per page. |
| **Conversations persist across page navigations** | `clientId`, `threadId`, and all messages are stored in `localStorage`. Switching between stages does not lose chat history. |
| **New Chat resets context** | The "New Chat" button generates a fresh `threadId`, which gives the user a clean conversation slate. |
| **Graceful fallback for non-streaming** | If the response `Content-Type` is not `text/event-stream`, the frontend falls back to parsing the JSON response body. This handles cases where the backend or a proxy strips streaming headers. |
| **Endpoint auto-normalization** | `VITE_ASSISTANT_API_ENDPOINT` is trimmed of trailing slashes and auto-suffixed with `/api/assistant` or `/api/assistant/stream` — so you can set just the base URL. |
| **Missing endpoint warning** | If `VITE_ASSISTANT_API_ENDPOINT` is not set, the assistant shows a yellow warning banner instead of silently failing. |
| **Markdown rendering** | Agent responses are rendered as rich Markdown (tables, lists, bold, links) using `react-markdown` + `remark-gfm`. |

### 6.2 Backend Tips

| Tip | Detail |
|---|---|
| **Stage context injection** | The backend always prepends `"Current stage: {stageId}\n\n"` to the user's message. This gives the Foundry Agent implicit awareness of what the user is working on, without needing separate agent configurations per stage. |
| **Agent loaded at startup** | The Foundry Agent is resolved by name once during `startup()`. If the agent name is wrong or the Foundry endpoint is unreachable, the app fails fast with a clear error. |
| **Rate limiting is in-memory** | Rate limit tracking uses `app.state`, which resets on restart. For production, consider Redis-backed rate limiting. |
| **Tool approval fallback** | If the Foundry endpoint doesn't support `tool_approval`, the backend catches the error and retries without it — graceful degradation. |
| **CORS is configurable** | Set `CORS_ORIGINS` to specific domains in production. The default `*` is convenient for development but should be restricted for deployment. |
| **Container-ready** | The included `Dockerfile` builds a slim Python 3.11 image with uvicorn. Deploy directly to Azure Container Apps with environment variables. |

### 6.3 Agent / Foundry Tips

| Tip | Detail |
|---|---|
| **Single agent, multiple stages** | The same Foundry Agent handles all stages. The `stageId` prefix in the message is the sole mechanism for stage-specific behavior — the agent's system prompt and knowledge base are configured to interpret this. |
| **OpenAI-compatible API** | The `AIProjectClient.get_openai_client()` returns an OpenAI-compatible client. The `extra_body` parameter is used to pass Foundry-specific fields like agent name and tool approval. |
| **MCP tool integration** | The agent can be configured with MCP tools (e.g., OpenAPI connections to Logic Apps, Microsoft Learn). Auto-approval via `AUTO_APPROVE_TOOLS` prevents the agent from blocking on tool consent. |
| **No conversation memory on the agent side** | Each request sends only the current message (no conversation history). The frontend maintains chat history purely for display. If multi-turn context is needed, consider passing previous messages in the `input` array. |

### 6.4 Deployment Tips

| Tip | Detail |
|---|---|
| **Frontend: GitHub Pages** | Built with `npm run build` using the `VITE_ASSISTANT_API_ENDPOINT` secret; deployed via GitHub Actions workflow (`.github/workflows/pages.yml`). |
| **Backend: Azure Container Apps** | Build with `docker build -t assistant-backend ./backend`, then deploy to ACA with env vars for `AI_PROJECT_ENDPOINT`, `AGENT_NAME`, etc. |
| **Managed Identity** | In ACA, assign a system-managed identity and grant it access to the Azure AI Foundry project. `DefaultAzureCredential` picks it up automatically. |
| **HTTPS everywhere** | Both the GitHub Pages frontend and ACA backend use HTTPS. The `X-AGENT-KEY` header is only safe because the transport is encrypted. |

---

## 7. Sequence Diagram

```
┌──────────┐          ┌──────────────┐          ┌──────────────┐          ┌──────────────┐
│  Browser  │          │  Layout.jsx   │          │  FastAPI      │          │  Foundry      │
│  (User)   │          │  + Assistant  │          │  Backend      │          │  Agent        │
└─────┬─────┘          └──────┬───────┘          └──────┬───────┘          └──────┬───────┘
      │  Navigate to           │                         │                         │
      │  /stage/2/step/2.1     │                         │                         │
      │───────────────────────▶│                         │                         │
      │                        │ Parse URL               │                         │
      │                        │ stageId = "2"           │                         │
      │                        │                         │                         │
      │  Type question         │                         │                         │
      │───────────────────────▶│                         │                         │
      │                        │  POST /api/assistant/stream                       │
      │                        │  { clientId, threadId,  │                         │
      │                        │    stageId: "2",        │                         │
      │                        │    message: "..." }     │                         │
      │                        │────────────────────────▶│                         │
      │                        │                         │  Validate X-AGENT-KEY   │
      │                        │                         │  Check rate limit       │
      │                        │                         │  Prepend stage context  │
      │                        │                         │                         │
      │                        │                         │  responses.create(      │
      │                        │                         │    input, extra_body,   │
      │                        │                         │    stream=True)         │
      │                        │                         │────────────────────────▶│
      │                        │                         │                         │
      │                        │                         │  SSE: delta chunks      │
      │                        │                         │◀────────────────────────│
      │                        │  SSE: data: {"delta":…} │                         │
      │                        │◀────────────────────────│                         │
      │  Render streamed text  │                         │                         │
      │◀───────────────────────│                         │                         │
      │                        │  SSE: data: {"done":true}                        │
      │                        │◀────────────────────────│                         │
      │  ✅ Complete response   │                         │                         │
      │◀───────────────────────│                         │                         │
```

---

## 8. Local Development Quick Start

```bash
# 1. Frontend
npm install
echo 'VITE_ASSISTANT_API_ENDPOINT=http://localhost:8000/api/assistant' > .env.local
npm run dev                    # → http://localhost:5173

# 2. Backend (in a separate terminal)
cd backend
pip install -r requirements.txt
# Ensure .env has AI_PROJECT_ENDPOINT and AGENT_NAME
uvicorn main:app --reload --port 8000

# 3. Authenticate to Azure (for DefaultAzureCredential)
az login
```

---

## 9. Summary

The architecture follows a clean **3-tier pattern**:

1. **Presentation (React SPA)** — Derives stage context from the URL, manages chat state in localStorage, streams responses via SSE.
2. **API Gateway (FastAPI)** — Authenticates, rate-limits, injects stage context into the prompt, and proxies to the Foundry Agent.
3. **AI Engine (Azure AI Foundry Agent)** — Processes the enriched prompt with its knowledge base, code interpreter, and MCP tools.

The key design insight is that **context is injected implicitly**: the user never needs to tell the agent what stage they're on — the frontend detects it from the URL and the backend prepends it to every message. This creates a seamless, context-aware assistant experience.
