import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path for GitHub Pages deployment
// This should match your repository name on GitHub Pages
// If deploying to root domain, change to '/'
const basePath = '/JTC-AI-Hackathon-enablement/'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: basePath,
})
