import { useEffect, useRef, useState } from 'react'

/** Retícula HUD que sigue al puntero con coordenadas; se "fija" sobre elementos interactivos. */
export default function HUDCursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [locked, setLocked] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const canHover = window.matchMedia('(hover: hover)').matches
    const narrow = window.matchMedia('(max-width: 768px)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || !canHover || narrow || reduced) return
    setEnabled(true)

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const pos = { ...target }
    let raf = 0
    let lastReadout = 0

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      const now = performance.now()
      if (now - lastReadout > 80) {
        lastReadout = now
        setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) })
      }
      const el = e.target as Element | null
      setLocked(!!el?.closest('a, button, [role="button"], input, textarea'))
    }

    const animate = () => {
      pos.x += (target.x - pos.x) * 0.22
      pos.y += (target.y - pos.y) * 0.22
      if (ref.current) {
        ref.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <div ref={ref} className={`hud-cursor${locked ? ' is-locked' : ''}`} aria-hidden="true">
      <span className="hud-cursor__ring" />
      <span className="hud-cursor__dot" />
      <span className="hud-cursor__tick hud-cursor__tick--n" />
      <span className="hud-cursor__tick hud-cursor__tick--s" />
      <span className="hud-cursor__tick hud-cursor__tick--w" />
      <span className="hud-cursor__tick hud-cursor__tick--e" />
      <span className="hud-cursor__readout">
        {String(coords.x).padStart(4, '0')} · {String(coords.y).padStart(4, '0')}
      </span>
    </div>
  )
}
