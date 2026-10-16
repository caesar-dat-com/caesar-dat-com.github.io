import { useState, useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [velocity, setVelocity] = useState(0)
  const lastScrollY = useRef(0)
  const lastTime = useRef(Date.now())

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = docHeight > 0 ? scrollTop / docHeight : 0
      setProgress(currentProgress)

      // Calculate velocity
      const now = Date.now()
      const dt = now - lastTime.current
      if (dt > 0) {
        const dy = Math.abs(scrollTop - lastScrollY.current)
        const v = dy / dt // px/ms
        setVelocity(v)
      }
      lastScrollY.current = scrollTop
      lastTime.current = now
    }

    // Decay velocity when not scrolling
    let decayTimer: ReturnType<typeof setTimeout>
    const startDecay = () => {
      clearTimeout(decayTimer)
      decayTimer = setTimeout(() => setVelocity(0), 150)
    }

    const handleScroll = () => {
      onScroll()
      startDecay()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(decayTimer)
    }
  }, [])

  // Color interpolation based on velocity
  // Lento (0) = blanco orbital, rápido (>2) = cobre SLS (#c08a5e)
  const t = Math.min(velocity / 2, 1) // normalize 0-1
  const r = Math.round(255 + t * (192 - 255))
  const g = Math.round(255 + t * (138 - 255))
  const b = Math.round(255 + t * (94 - 255))
  const barColor = `rgb(${r}, ${g}, ${b})`
  const glowColor = `rgba(${r}, ${g}, ${b}, 0.6)`

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[1001] h-[2px]"
      aria-hidden="true"
    >
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{
          width: `${progress * 100}%`,
          background: barColor,
          boxShadow: `0 0 8px ${glowColor}, 0 0 20px ${glowColor.replace('0.6', '0.3')}`,
        }}
      />
    </div>
  )
}