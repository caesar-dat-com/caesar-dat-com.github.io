import { useRef, useCallback, useEffect, useState, type ReactNode } from 'react'

interface HUDBracketProps {
  children: ReactNode
  className?: string
  size?: number
}

export default function HUDBracket({ children, className = '', size = 12 }: HUDBracketProps) {
  const s = size
  const [isLunar, setIsLunar] = useState(false)

  useEffect(() => {
    const check = () => setIsLunar(document.body.classList.contains('lunar'))
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  const strokeColor = isLunar ? 'rgba(0, 102, 255, 0.25)' : 'rgba(0,102,255,0.4)'

  return (
    <div className={`hud-bracket relative ${className}`}>
      {/* Top-left bracket */}
      <span
        className="pointer-events-none absolute left-0 top-0"
        aria-hidden="true"
      >
        <svg width={s + 2} height={s + 2} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d={`M1 ${s + 2} V2 Q1 1 2 1 H${s + 2}`} stroke={strokeColor} strokeWidth="1" />
        </svg>
      </span>

      {/* Top-right bracket */}
      <span
        className="pointer-events-none absolute right-0 top-0"
        aria-hidden="true"
      >
        <svg width={s + 2} height={s + 2} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d={`M1 1 H${s} Q${s + 1} 1 ${s + 1} 2 V${s + 2}`} stroke={strokeColor} strokeWidth="1" />
        </svg>
      </span>

      {/* Bottom-left bracket */}
      <span
        className="pointer-events-none absolute bottom-0 left-0"
        aria-hidden="true"
      >
        <svg width={s + 2} height={s + 2} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d={`M1 1 V${s} Q1 ${s + 1} 2 ${s + 1} H${s + 2}`} stroke={strokeColor} strokeWidth="1" />
        </svg>
      </span>

      {/* Bottom-right bracket */}
      <span
        className="pointer-events-none absolute bottom-0 right-0"
        aria-hidden="true"
      >
        <svg width={s + 2} height={s + 2} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d={`M${s + 1} 1 V${s} Q${s + 1} ${s + 1} ${s} ${s + 1} H1`} stroke={strokeColor} strokeWidth="1" />
        </svg>
      </span>

      {children}
    </div>
  )
}