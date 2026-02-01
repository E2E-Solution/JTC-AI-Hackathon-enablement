# Hackathon Assistant Backend

This service uses `uv` for deterministic dependency management.

## Local setup (uv)

1. Install `uv` if needed.
2. Copy environment variables:
   - `cp backend/.env.example backend/.env`
3. Create the virtual environment:
   - `uv venv`
4. Sync dependencies from the lockfile:
   - `uv pip sync backend/uv.lock`
5. Run the API (from repo root):
   - `uv run uvicorn backend.main:app --reload --port 8000`

## Locking versions

- Regenerate the lockfile after dependency changes:
   - `uv pip compile backend/pyproject.toml -o backend/uv.lock`
- Sync from the lockfile anytime:
   - `uv pip sync backend/uv.lock`

## MCP Tool Auto-Approval

Set these in backend/.env to auto-approve MCP tools:

- `AUTO_APPROVE_TOOLS=true`
- `AUTO_APPROVE_TOOL_NAMES=MicrosoftLearn-01` (optional, comma-separated)
