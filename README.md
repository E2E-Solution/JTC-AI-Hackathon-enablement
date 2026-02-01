# Procurement Command Center

**Mission: Ignite the Best Vendor Match**

A modern, mission-control-themed HOL (Hands-On Lab) website for AI Foundry that guides users through building an intelligent procurement system. The website features a polished UI with step-by-step navigation, progress indicators, and a "mission control" experience.

## Overview

This website walks participants through building a Procurement Command Center with three main stages:

1. **Vendor Scout Agent** (Model + Knowledge Base) - AI-powered vendor matching
2. **Mission Comms** (Logic Apps workflows) - Automated RFP email distribution and approvals
3. **Mission Debrief** (Code Interpreter) - Python analysis and visualizations

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Multi-page navigation
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Syntax Highlighter** - Beautiful code block rendering (ready for future use)

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

### Deploy to GitHub Pages (Automated with GitHub Actions)

The repository includes a GitHub Actions workflow that automatically builds and deploys the site when you push to the `main` branch.

**Setup Steps:**

1. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under "Source", select **GitHub Actions**
   - Save the changes

2. **Push the workflow file:**
   - The workflow file is located at `.github/workflows/deploy.yml`
   - Commit and push the workflow file to the `main` branch:
     ```bash
     git add .github/workflows/deploy.yml
     git commit -m "Add GitHub Actions deployment workflow"
     git push origin main
     ```

3. **Automatic Deployment:**
   - The workflow will automatically run on every push to `main`
   - You can also trigger it manually from the **Actions** tab
   - Once deployed, your site will be available at:
     `https://zaf24.github.io/JTC-AI-Hackathon-enablement/`

4. **Verify Base Path:**
   - The base path is configured in `vite.config.js` as `/JTC-AI-Hackathon-enablement/`
   - If your repository name is different, update the `basePath` in `vite.config.js`
   - If deploying to a custom domain at root, change base path to `/`

**Manual Deployment (Alternative):**

If you prefer to deploy manually:
```bash
npm run build
# Then copy contents of dist/ folder to your gh-pages branch
```

**Troubleshooting:**

- **Blank page**: Check browser console (F12) for 404 errors
- **Images not loading**: Verify base path matches your GitHub Pages URL
- **Routes not working**: Ensure React Router basename matches the base path
- **Workflow fails**: Check the Actions tab for error messages

## Project Structure

```
├── src/
│   ├── components/
│   │   └── Layout.jsx          # Navigation and footer layout
│   ├── pages/
│   │   ├── Home.jsx            # Landing page with mission briefing
│   │   └── Stages.jsx          # Stages overview page
│   ├── App.jsx                 # Main app with routing
│   ├── main.jsx                # React entry point
│   └── index.css               # Tailwind imports and custom styles
├── index.html                  # HTML template
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── postcss.config.js           # PostCSS configuration
```

## Features

- ✨ **Hero Section** - Compelling mission statement and call-to-action
- 📋 **Mission Briefing** - Context and problem statement
- 🎯 **Stage Overview** - Table and card views of all stages
- 🧭 **Navigation** - Easy navigation between Mission and Stages pages
- 🎨 **Modern UI** - Clean, polished design with smooth animations
- 📱 **Responsive** - Works beautifully on desktop, tablet, and mobile

## Design Philosophy

The website is designed to feel like a "mission control" experience:

- **Hero Story** - Compelling narrative that sets the context
- **Stages as Modules** - Each stage is presented as a focused mission
- **Step-by-Step Guidance** - Clear progression through each stage
- **Progress Indicators** - Visual feedback on mission status
- **Polished UI Components** - Professional, modern design

## Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```js
colors: {
  mission: {
    primary: '#1e40af',    // Main blue
    secondary: '#3b82f6',  // Lighter blue
    accent: '#60a5fa',     // Light blue accent
    dark: '#1e3a8a',       // Dark blue
  }
}
```

### Content

- **Home page content**: Edit `src/pages/Home.jsx`
- **Stages content**: Edit `src/pages/Stages.jsx`
- **Navigation**: Edit `src/components/Layout.jsx`

## Hackathon Learning Assistant

This site includes a persistent assistant drawer that can call your Foundry agent backend. The assistant sends a stage identifier derived from the current route and keeps chat history in the browser.

### Environment Variables

Set these at build time (for GitHub Pages or any static hosting):

- `VITE_ASSISTANT_API_ENDPOINT` — Full HTTPS endpoint for your backend (for example: `https://your-aca-app.azurecontainerapps.io/api/assistant`).
- `VITE_ASSISTANT_API_KEY` — Shared key value sent in the `X-AGENT-KEY` header.

### Request Payload

The frontend sends JSON like:

```json
{
  "clientId": "uuid",
  "threadId": "uuid",
  "stageId": "1",
  "message": "User input"
}
```

### Notes

- The shared key lives in the client bundle, so it should be treated as a lightweight gate, not a secret.
- The assistant stores `clientId`, `threadId`, `sidebarOpen`, and messages in local storage to persist across pages.

## Assistant Backend (FastAPI)

The backend service integrates with Microsoft Foundry Agent and exposes a single endpoint for the assistant UI.

### Local Run

1. Copy backend/.env.example to backend/.env and update values.
2. Create the environment and sync from the lockfile:
  - `uv venv`
  - `uv pip sync backend/uv.lock`
3. Run the API:
  - `uv run uvicorn backend.main:app --reload --port 8000`

### Container Build

1. Build the image:
  - `docker build -t assistant-backend ./backend`
2. Run locally:
  - `docker run -p 8000:8000 --env-file backend/.env assistant-backend`

### Backend Environment Variables

- `AI_PROJECT_ENDPOINT` — Foundry project endpoint.
- `AGENT_NAME` — Name of the Foundry agent.
- `AGENT_SHARED_KEY` — Shared key matched to `X-AGENT-KEY`.
- `RATE_LIMIT_PER_MINUTE` — Requests per minute per client.
- `CORS_ORIGINS` — Comma-separated origins (use `*` to allow all).
- `AUTO_APPROVE_TOOLS` — Set to `true` to auto-approve MCP tool calls.
- `AUTO_APPROVE_TOOL_NAMES` — Optional comma-separated tool names to auto-approve (e.g., `MicrosoftLearn-01`).

## Future Enhancements

- Individual stage detail pages with step-by-step instructions
- Progress tracking and completion indicators
- Code examples with syntax highlighting
- Interactive demos and embedded content
- User progress persistence

## License

Built for AI Foundry · Procurement Command Center ✨

## Credits

Designed and built following the mission-control theme for hands-on lab experiences.
