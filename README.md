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
