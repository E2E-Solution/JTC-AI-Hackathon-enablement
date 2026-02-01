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

## Azure Container Apps (Consumption/serverless) deployment

Use this script to deploy the backend with Managed Identity (for `DefaultAzureCredential()`).

```bash
export SUBSCRIPTION_ID="<your-subscription-id>"
export LOCATION="southeastasia"
export RG="rg-AI-Hackathon"
export ENV_NAME="cae-ai-hackathon"
export APP_NAME="hackathon-backend"

export AI_PROJECT_ENDPOINT="https://proj-gpt51-codex-resource.services.ai.azure.com/api/projects/proj-gpt51-codex"
export AGENT_NAME="utilit-agents-azure-msft"
export CORS_ORIGINS="https://e2e-solution.github.io"
export AGENT_SHARED_KEY=""  # optional

az login
az account set --subscription "$SUBSCRIPTION_ID"

az group create -n "$RG" -l "$LOCATION"

# Create a Consumption (serverless) environment
az containerapp env create \
   -n "$ENV_NAME" \
   -g "$RG" \
   -l "$LOCATION"

# Build and deploy from source (uses backend/Dockerfile)
az containerapp up \
   -n "$APP_NAME" \
   -g "$RG" \
   --environment "$ENV_NAME" \
   --source "/workspaces/JTC-AI-Hackathon-enablement/backend" \
   --ingress external \
   --target-port 8000

# Configure scaling (min/max replicas)
az containerapp update -n "$APP_NAME" -g "$RG" \
   --min-replicas 0 \
   --max-replicas 10

# Enable Managed Identity
az containerapp identity assign -n "$APP_NAME" -g "$RG"

# Configure environment variables
az containerapp update -n "$APP_NAME" -g "$RG" \
   --set-env-vars \
   AI_PROJECT_ENDPOINT="$AI_PROJECT_ENDPOINT" \
   AGENT_NAME="$AGENT_NAME" \
   AGENT_SHARED_KEY="$AGENT_SHARED_KEY" \
   CORS_ORIGINS="$CORS_ORIGINS"

# Grant the Container App identity access to the AI Project
APP_PRINCIPAL_ID=$(az containerapp identity show -n "$APP_NAME" -g "$RG" --query principalId -o tsv)

# Set the AI Project resource ID directly if you already know it
# export AI_PROJECT_RESOURCE_ID="/subscriptions/<sub>/resourceGroups/<rg>/providers/<provider>/<resourceType>/<resourceName>"

export AI_PROJECT_RESOURCE_ID="/subscriptions/<sub>/resourceGroups/<rg>/providers/<provider>/<resourceType>/<resourceName>"

# Or look it up by resource name + type
# export AI_PROJECT_RESOURCE_NAME="proj-gpt51-codex-resource"
# export AI_PROJECT_RESOURCE_TYPE="Microsoft.MachineLearningServices/workspaces"

# AI_PROJECT_RESOURCE_ID=$(az resource show \
#    --name "$AI_PROJECT_RESOURCE_NAME" \
#    --resource-type "$AI_PROJECT_RESOURCE_TYPE" \
#    -g "$RG" \
#    --query id -o tsv)

az role assignment create \
   --assignee-object-id "$APP_PRINCIPAL_ID" \
   --assignee-principal-type ServicePrincipal \
   --role "Azure AI Developer" \
   --scope "$AI_PROJECT_RESOURCE_ID"
```

## MCP Tool Auto-Approval

Set these in backend/.env to auto-approve MCP tools:

- `AUTO_APPROVE_TOOLS=true`
- `AUTO_APPROVE_TOOL_NAMES=MicrosoftLearn-01` (optional, comma-separated)
