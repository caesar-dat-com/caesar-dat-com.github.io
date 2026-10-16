import { useEffect, useRef, useState } from 'react'

export default function MeshGradient() {
  const ref = useRef<HTMLDivElement>(null)
  const [isLunar, setIsLunar] = useState(false)

  // Check theme
  useEffect(() => {
    const check = () => setIsLunar(document.body.classList.contains('lunar'))
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="MeshGradient pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
      style={{
        background: isLunar
          ? `
          radial-gradient(ellipse 80% 60% at 12% 18%, rgba(0, 0, 0, 0.055) 0%, transparent 62%),
          radial-gradient(ellipse 60% 80% at 82% 72%, rgba(0, 0, 0, 0.045) 0%, transparent 62%),
          radial-gradient(ellipse 55% 50% at 50% 48%, rgba(138, 90, 51, 0.035) 0%, transparent 60%)
        `
          : `
          radial-gradient(ellipse 80% 60% at 10% 20%, rgba(255, 255, 255, 0.055) 0%, transparent 60%),
          radial-gradient(ellipse 60% 80% at 80% 70%, rgba(190, 196, 208, 0.04) 0%, transparent 60%),
          radial-gradient(ellipse 50% 50% at 50% 50%, rgba(192, 138, 94, 0.03) 0%, transparent 60%)
        `,
        animation: 'mesh-drift 20s ease-in-out infinite alternate',
        opacity: 1,
        transition: 'opacity 0.5s ease',
      }}
    />
  )
}