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
        background: `
          radial-gradient(ellipse 80% 60% at 10% 20%, rgba(0, 102, 255, 0.08) 0%, transparent 60%),
          radial-gradient(ellipse 60% 80% at 80% 70%, rgba(100, 50, 255, 0.06) 0%, transparent 60%),
          radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255, 107, 53, 0.04) 0%, transparent 60%)
        `,
        animation: 'mesh-drift 20s ease-in-out infinite alternate',
        opacity: isLunar ? 0.08 : 1,
        transition: 'opacity 0.5s ease',
      }}
    />
  )
}