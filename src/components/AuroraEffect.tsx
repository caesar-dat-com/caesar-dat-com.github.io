import { useEffect, useState } from 'react'

export default function AuroraEffect() {
  const [isLunar, setIsLunar] = useState(false)

  useEffect(() => {
    const check = () => setIsLunar(document.body.classList.contains('lunar'))
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  // Respect reduced motion
  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  if (isLunar || prefersReduced) return null

  return (
    <div className="aurora-container pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="aurora-layer aurora-layer-1" />
      <div className="aurora-layer aurora-layer-2" />
      <div className="aurora-layer aurora-layer-3" />
    </div>
  )
}