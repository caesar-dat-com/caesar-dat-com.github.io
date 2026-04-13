import { useEffect, useState } from 'react'

export default function GrainOverlay() {
  const [isLunar, setIsLunar] = useState(false)

  // Check theme
  useEffect(() => {
    const check = () => setIsLunar(document.body.classList.contains('lunar'))
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  if (isLunar) return null

  return (
    <div
      className="grain-overlay pointer-events-none fixed inset-0 z-[1]"
      style={{ opacity: 0.04 }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  )
}