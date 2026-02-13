import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Get base path from Vite config
// Vite's BASE_URL includes trailing slash (e.g., '/ai-procurement-lab/')
// React Router basename should NOT have trailing slash (except for root '/')
const baseUrl = import.meta.env.BASE_URL || '/'
const basename = baseUrl === '/' ? '/' : baseUrl.replace(/\/$/, '')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
