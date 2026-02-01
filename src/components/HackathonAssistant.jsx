import { useEffect, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const STORAGE_KEYS = {
  clientId: 'assistant.clientId',
  sidebarOpen: 'assistant.sidebarOpen',
  threadId: 'assistant.threadId',
  threads: 'assistant.threads'
}

const safeJsonParse = (value, fallback) => {
  if (!value) return fallback
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const normalizeEndpoint = (endpoint) => {
  if (!endpoint) return ''
  return endpoint.replace(/\/$/, '')
}

const getInitialThreads = () => {
  return safeJsonParse(localStorage.getItem(STORAGE_KEYS.threads), {})
}

export default function HackathonAssistant({ stageId, onOpenChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [clientId, setClientId] = useState('')
  const [threadId, setThreadId] = useState('')
  const [threads, setThreads] = useState({})
  const [messageInput, setMessageInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const apiEndpoint = useMemo(() => {
    return normalizeEndpoint(import.meta.env.VITE_ASSISTANT_API_ENDPOINT)
  }, [])

  const apiKey = useMemo(() => import.meta.env.VITE_ASSISTANT_API_KEY || '', [])

  useEffect(() => {
    const storedOpen = localStorage.getItem(STORAGE_KEYS.sidebarOpen)
    if (storedOpen !== null) {
      setIsOpen(storedOpen === 'true')
    }

    const storedClientId = localStorage.getItem(STORAGE_KEYS.clientId)
    const nextClientId = storedClientId || generateId()
    localStorage.setItem(STORAGE_KEYS.clientId, nextClientId)
    setClientId(nextClientId)

    const storedThreads = getInitialThreads()
    setThreads(storedThreads)

    const storedThreadId = localStorage.getItem(STORAGE_KEYS.threadId)
    const nextThreadId = storedThreadId || generateId()

    if (!storedThreads[nextThreadId]) {
      storedThreads[nextThreadId] = {
        createdAt: new Date().toISOString(),
        messages: []
      }
      localStorage.setItem(STORAGE_KEYS.threads, JSON.stringify(storedThreads))
      setThreads({ ...storedThreads })
    }

    localStorage.setItem(STORAGE_KEYS.threadId, nextThreadId)
    setThreadId(nextThreadId)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.sidebarOpen, String(isOpen))
    if (onOpenChange) {
      onOpenChange(isOpen)
    }
  }, [isOpen, onOpenChange])

  useEffect(() => {
    if (threadId) {
      localStorage.setItem(STORAGE_KEYS.threadId, threadId)
    }
  }, [threadId])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.threads, JSON.stringify(threads))
  }, [threads])

  const messages = threads[threadId]?.messages || []

  const toggleOpen = () => setIsOpen((prev) => !prev)

  const startNewConversation = () => {
    const newThreadId = generateId()
    const nextThreads = {
      ...threads,
      [newThreadId]: {
        createdAt: new Date().toISOString(),
        messages: []
      }
    }
    setThreads(nextThreads)
    setThreadId(newThreadId)
    setErrorMessage('')
    setMessageInput('')
  }

  const appendMessage = (newMessage) => {
    setThreads((prevThreads) => {
      const thread = prevThreads[threadId] || {
        createdAt: new Date().toISOString(),
        messages: []
      }
      return {
        ...prevThreads,
        [threadId]: {
          ...thread,
          messages: [...thread.messages, newMessage]
        }
      }
    })
  }

  const handleSend = async () => {
    const trimmed = messageInput.trim()
    if (!trimmed || isSending) return

    if (!apiEndpoint) {
      setErrorMessage('Assistant endpoint is not configured.')
      return
    }

    setErrorMessage('')
    setIsSending(true)

    const userMessage = {
      id: generateId(),
      role: 'user',
      content: trimmed,
      timestamp: new Date().toISOString()
    }

    appendMessage(userMessage)
    setMessageInput('')

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-AGENT-KEY': apiKey
        },
        body: JSON.stringify({
          clientId,
          threadId,
          stageId,
          message: trimmed
        })
      })

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      const data = await response.json()
      const replyText =
        data?.attributes?.output?.messages?.[0] ||
        data?.output?.messages?.[0] ||
        data?.reply ||
        data?.message ||
        data?.output_text ||
        data?.outputText ||
        data?.response ||
        'I am ready to help. Could you provide more detail?'

      appendMessage({
        id: generateId(),
        role: 'assistant',
        content: replyText,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong.')
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  const panelHeader = stageId ? `Stage ${stageId}` : 'Lab Assistance'

  return (
    <>
      <button
        type="button"
        onClick={toggleOpen}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-mission-primary px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-mission-dark"
        aria-expanded={isOpen}
        aria-controls="assistant-panel"
      >
        {isOpen ? 'Close Assistant' : 'Open Assistant'}
      </button>

      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={toggleOpen}
        aria-hidden={!isOpen}
      />

      <aside
        id="assistant-panel"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-gray-200 bg-white shadow-xl transition-transform duration-300 lg:max-w-sm ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="border-b border-gray-200 px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-mission-primary">Hackathon Learning Assistant</p>
              <p className="text-xs text-gray-500">{panelHeader}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={startNewConversation}
                className="rounded-md border border-mission-primary px-3 py-1 text-xs font-semibold text-mission-primary transition hover:bg-mission-primary hover:text-white"
              >
                New Chat
              </button>
              <button
                type="button"
                onClick={toggleOpen}
                className="rounded-md border border-gray-300 px-3 py-1 text-xs font-semibold text-gray-600 transition hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Ask questions about your current lab step. Responses use the configured Foundry agent.
          </p>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
          {messages.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-600">
              Start by asking for help with the current stage or describe an error you are seeing.
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`rounded-lg px-3 py-2 text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'ml-auto bg-mission-primary text-white'
                    : 'mr-auto bg-gray-100 text-gray-800'
                }`}
              >
                {message.role === 'assistant' ? (
                  <div className="prose prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-strong:text-inherit prose-a:text-mission-primary">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ node, ...props }) => (
                          <a {...props} className="font-semibold underline" />
                        )
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  message.content
                )}
              </div>
            ))
          )}
        </div>

        <div className="border-t border-gray-200 px-5 py-4">
          {errorMessage ? (
            <div className="mb-2 rounded-md bg-red-50 px-3 py-2 text-xs text-red-600">
              {errorMessage}
            </div>
          ) : null}
          {!apiEndpoint ? (
            <div className="mb-3 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-700">
              Configure VITE_ASSISTANT_API_ENDPOINT to enable the assistant.
            </div>
          ) : null}
          <div className="flex items-end gap-2">
            <textarea
              rows={2}
              value={messageInput}
              onChange={(event) => setMessageInput(event.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[44px] flex-1 resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-mission-primary focus:outline-none"
              placeholder="Ask about the current step..."
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={isSending}
              className="rounded-md bg-mission-primary px-3 py-2 text-sm font-semibold text-white transition hover:bg-mission-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSending ? 'Sending…' : 'Send'}
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
