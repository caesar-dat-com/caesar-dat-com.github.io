import { useState, useEffect } from 'react'

interface ToastMessage {
  id: string
  text: string
  type: 'success' | 'error' | 'info'
}

export default function Toast() {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  useEffect(() => {
    // Listen for custom events
    const handler = (e: any) => {
      const { detail } = e
      const id = Math.random().toString(36).slice(2, 9)
      setMessages((prev) => [...prev, { id, ...detail }])
      setTimeout(() => {
        setMessages((prev) => prev.filter((m) => m.id !== id))
      }, 3000)
    }
    window.addEventListener('toast', handler as EventListener)
    return () => window.removeEventListener('toast', handler as EventListener)
  }, [])

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-[18px] z-[9999] pointer-events-none">
      {messages.map((m) => (
        <div
          key={m.id}
          className={`relative bg-bg-500/92 border border-secondary-500 text-secondary-500 px-3 py-2.5 font-mono tracking-wider uppercase notch-clip shadow-[0_0_18px_rgba(43,228,234,0.35)] animate-[vt-in_0.2s_ease_both] pointer-events-auto max-w-[calc(100vw-24px)] ${m.type === 'error' ? 'border-primary-600 text-primary-200 shadow-[0_0_18px_rgba(232,97,90,0.35)]' : ''}`}
          role="status"
          aria-live="polite"
        >
          {m.text}
        </div>
      ))}
    </div>
  )
}

// Helper to dispatch a toast
export function toast(text: string, type: 'success' | 'error' | 'info' = 'success') {
  window.dispatchEvent(
    new CustomEvent('toast', {
      detail: { text, type },
    })
  )
}