import { useState } from 'react'

export default function ActionsPopover() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        className="relative w-full text-left uppercase inline-flex items-center justify-between gap-3 px-2.5 py-2 border-0 bg-transparent cursor-pointer font-mono tracking-wider min-w-0 text-secondary-500 group"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="bg-secondary-500 text-bg-300 font-bold w-[22px] h-[22px] text-[9px] rounded-full inline-grid place-items-center flex-none">U</span>
        <span className="pointer-events-none">Actions</span>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[220px] bg-bg-500/95 border border-secondary-500 notch-clip shadow-[0_0_18px_rgba(43,228,234,0.35)] p-2.5 z-[100] flex flex-col gap-1.5 rounded-[3px]">
          <span className="absolute -right-1.5 top-[5px] w-[22.6px] h-[3px] rotate-45 bg-secondary-500 pointer-events-none" />
          <button
            type="button"
            className="w-full text-left px-2 py-1.5 rounded-[2px] bg-transparent text-secondary-500 hover:bg-bg-500/70 font-mono tracking-wider text-sm"
            onClick={() => window.dispatchEvent(new CustomEvent('toast', { detail: { text: 'Actions: Copiar link del perfil', type: 'success' } }))}
          >
            Copiar link perfil
          </button>
          <button
            type="button"
            className="w-full text-left px-2 py-1.5 rounded-[2px] bg-transparent text-secondary-500 hover:bg-bg-500/70 font-mono tracking-wider text-sm"
            onClick={() => window.dispatchEvent(new CustomEvent('toast', { detail: { text: 'Actions: Abrir LinkedIn', type: 'info' } }))}
          >
            Abrir LinkedIn
          </button>
          <button
            type="button"
            className="w-full text-left px-2 py-1.5 rounded-[2px] bg-transparent text-secondary-500 hover:bg-bg-500/70 font-mono tracking-wider text-sm"
            onClick={() => window.dispatchEvent(new CustomEvent('toast', { detail: { text: 'Actions: Abrir GitHub', type: 'info' } }))}
          >
            Abrir GitHub
          </button>
          <div className="h-px bg-primary-500/35 my-1.5" />
          <button
            type="button"
            className="w-full text-left px-2 py-1.5 rounded-[2px] bg-transparent text-primary-200 hover:bg-bg-500/70 font-mono tracking-wider text-sm"
            onClick={() => window.dispatchEvent(new CustomEvent('toast', { detail: { text: 'Actions: Copiar email', type: 'success' } }))}
          >
            Copiar email
          </button>
        </div>
      )}
    </div>
  )
}