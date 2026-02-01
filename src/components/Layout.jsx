import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import HackathonAssistant from './HackathonAssistant'
import { useState } from 'react'

export default function Layout({ children }) {
  const location = useLocation()
  const [assistantOpen, setAssistantOpen] = useState(false)

  const getStageId = (pathname) => {
    if (pathname.startsWith('/stage/')) {
      const parts = pathname.split('/').filter(Boolean)
      return parts[1] || ''
    }
    if (pathname === '/stages') return 'Overview'
    if (pathname === '/') return 'Mission'
    return ''
  }

  const stageId = getStageId(location.pathname)
  
  const isActive = (path) => location.pathname === path || 
    (path === '/' && location.pathname === '/') ||
    (path === '/stages' && location.pathname.startsWith('/stage'))

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-mission-primary">
                Project Ignite 🚀
              </span>
            </Link>
            <div className="flex space-x-6">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/')
                    ? 'text-mission-primary bg-blue-50'
                    : 'text-gray-700 hover:text-mission-primary hover:bg-gray-50'
                }`}
              >
                Mission 📋
              </Link>
              <Link
                to="/stages"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/stages')
                    ? 'text-mission-primary bg-blue-50'
                    : 'text-gray-700 hover:text-mission-primary hover:bg-gray-50'
                }`}
              >
                Stages 🛫
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main
        className={`flex-grow transition-[padding] duration-300 ${
          assistantOpen ? 'lg:pr-[24rem]' : 'lg:pr-0'
        }`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      <HackathonAssistant stageId={stageId} onOpenChange={setAssistantOpen} />

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            🚀 Project Ignite · Built by Zafir · Solution Engineer, Microsoft 💼
          </p>
        </div>
      </footer>
    </div>
  )
}
