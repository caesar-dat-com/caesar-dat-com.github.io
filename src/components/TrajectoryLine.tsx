import { useRef, useEffect } from 'react'

interface TrajectoryLineProps {
  className?: string
}

export default function TrajectoryLine({ className = '' }: TrajectoryLineProps) {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const path = pathRef.current
    if (!path) return

    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`

    const onScroll = () => {
      const rect = path.getBoundingClientRect()
      const vh = window.innerHeight
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)))
      path.style.strokeDashoffset = `${length * (1 - progress)}`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`trajectory-line pointer-events-none absolute left-1/2 -translate-x-1/2 z-0 ${className}`} aria-hidden="true">
      <svg
        width="40"
        height="200"
        viewBox="0 0 40 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-48 md:h-64"
      >
        <path
          ref={pathRef}
          d="M20 0 C20 40, 35 60, 20 100 C5 140, 20 160, 20 200"
          stroke="rgba(0, 102, 255, 0.2)"
          strokeWidth="1"
          fill="none"
        />
        {/* Small orbit dots */}
        <circle cx="20" cy="100" r="2" fill="rgba(0, 102, 255, 0.3)" />
        <circle cx="28" cy="60" r="1.5" fill="rgba(0, 102, 255, 0.2)" />
        <circle cx="12" cy="150" r="1.5" fill="rgba(0, 102, 255, 0.2)" />
      </svg>
    </div>
  )
}