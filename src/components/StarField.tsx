import { useEffect, useRef, useCallback, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  twinkleSpeed: number
  twinklePhase: number
  parallaxFactor: number
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const animFrameRef = useRef<number>(0)
  const scrollRef = useRef<number>(0)
  const prefersReduced = useReducedMotion()
  const [isLunar, setIsLunar] = useState(false)

  // Check theme
  useEffect(() => {
    const check = () => setIsLunar(document.body.classList.contains('lunar'))
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  const initStars = useCallback((width: number, height: number) => {
    const count = Math.min(Math.floor((width * height) / 6000), 250)
    const stars: Star[] = []
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 3, // extended for parallax
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.15 + 0.02,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        parallaxFactor: Math.random() * 0.3 + 0.1,
      })
    }
    starsRef.current = stars
  }, [])

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReduced || isLunar) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars(canvas.width, canvas.height)
    }

    resize()
    window.addEventListener('resize', resize)

    let time = 0
    const animate = () => {
      time += 1
      const scroll = scrollRef.current
      ctx!.clearRect(0, 0, canvas.width, canvas.height)

      for (const star of starsRef.current) {
        // Base position + parallax offset from scroll
        const parallaxY = star.y - scroll * star.parallaxFactor
        // Wrap around extended height
        const wrappedY = ((parallaxY % (canvas.height * 3)) + canvas.height * 3) % (canvas.height * 3) - canvas.height

        // Only render if in viewport
        if (wrappedY < -10 || wrappedY > canvas.height + 10) continue

        // Slow drift
        star.x += star.speed * 0.1
        if (star.x > canvas.width + 5) star.x = -5

        // Twinkle
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase)
        const currentOpacity = star.opacity * (0.6 + 0.4 * twinkle)

        ctx!.beginPath()
        ctx!.arc(star.x, wrappedY, star.size, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(200, 220, 255, ${currentOpacity})`
        ctx!.fill()

        // Glow for larger stars
        if (star.size > 1.5) {
          ctx!.beginPath()
          ctx!.arc(star.x, wrappedY, star.size * 3, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(100, 160, 255, ${currentOpacity * 0.15})`
          ctx!.fill()
        }
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [initStars, prefersReduced, isLunar])

  // Don't render in lunar mode
  if (isLunar) return null

  if (prefersReduced) {
    return (
      <div
        className="starfield-container"
        style={{
          backgroundImage: `radial-gradient(1px 1px at 10% 20%, rgba(200,220,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 30% 60%, rgba(200,220,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 50% 40%, rgba(200,220,255,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 70% 30%, rgba(100,160,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 90% 80%, rgba(200,220,255,0.3) 0%, transparent 100%)`,
        }}
      />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className="starfield-container"
      style={{ opacity: 0.7 }}
    />
  )
}