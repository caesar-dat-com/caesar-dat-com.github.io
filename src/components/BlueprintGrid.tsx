import { useEffect, useRef } from 'react'
import useLiteMode from '../hooks/useLiteMode'

/** Retícula de plano técnico con marcas de esquina; se desplaza levemente con el scroll. */
export default function BlueprintGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const lite = useLiteMode()

  useEffect(() => {
    if (lite) return
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        if (ref.current) ref.current.style.setProperty('--grid-shift', `${window.scrollY * 0.04}px`)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [lite])

  if (lite) return null

  return (
    <div ref={ref} className="blueprint-grid pointer-events-none fixed inset-0" aria-hidden="true">
      <span className="blueprint-tick blueprint-tick--tl" />
      <span className="blueprint-tick blueprint-tick--tr" />
      <span className="blueprint-tick blueprint-tick--bl" />
      <span className="blueprint-tick blueprint-tick--br" />
    </div>
  )
}
