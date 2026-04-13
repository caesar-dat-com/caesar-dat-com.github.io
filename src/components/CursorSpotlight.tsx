import { useEffect, useRef, useState } from 'react'

export default function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null)
  const [isLunar, setIsLunar] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const posRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  // Check theme
  useEffect(() => {
    const check = () => setIsLunar(document.body.classList.contains('lunar'))
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  // Track mouse
  useEffect(() => {
    if (isLunar) return

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
    }

    const onLeave = () => setIsVisible(false)
    const onEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [isLunar, isVisible])

  // Animate position with RAF for smoothness
  useEffect(() => {
    if (isLunar || !spotlightRef.current) return

    const animate = () => {
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate(${posRef.current.x - 200}px, ${posRef.current.y - 200}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isLunar])

  // Respect reduced motion
  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  if (isLunar || prefersReduced) return null

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed z-[1] h-[400px] w-[400px] rounded-full opacity-0 transition-opacity duration-500"
      style={{
        background: 'radial-gradient(circle, rgba(0,102,255,0.07) 0%, rgba(0,102,255,0.02) 40%, transparent 70%)',
        mixBlendMode: 'screen',
        opacity: isVisible ? 1 : 0,
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  )
}