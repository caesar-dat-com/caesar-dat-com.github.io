import { useEffect, useRef } from 'react'

/**
 * StarField — Canvas-based star particles for the Artemis 2 lunar aesthetic.
 * Renders twinkling stars with subtle parallax on mouse move.
 */
export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let mouseX = 0
    let mouseY = 0

    interface Star {
      x: number
      y: number
      size: number
      opacity: number
      speed: number
      twinkleSpeed: number
      twinklePhase: number
    }

    let stars: Star[] = []

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
      initStars()
    }

    function initStars() {
      const count = Math.floor((canvas!.width * canvas!.height) / 8000)
      stars = Array.from({ length: Math.min(count, 200) }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.5 + 0.2,
        speed: Math.random() * 0.15 + 0.02,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      }))
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

      const cx = canvas!.width / 2
      const cy = canvas!.height / 2
      const parallaxX = (mouseX - cx) * 0.008
      const parallaxY = (mouseY - cy) * 0.008

      for (const star of stars) {
        star.twinklePhase += star.twinkleSpeed
        const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7
        const alpha = star.opacity * twinkle

        const drawX = star.x + parallaxX * star.speed * 10
        const drawY = star.y + parallaxY * star.speed * 10

        // Glow
        if (star.size > 1) {
          ctx!.beginPath()
          const gradient = ctx!.createRadialGradient(drawX, drawY, 0, drawX, drawY, star.size * 3)
          gradient.addColorStop(0, `rgba(0, 240, 255, ${alpha * 0.15})`)
          gradient.addColorStop(1, 'transparent')
          ctx!.fillStyle = gradient
          ctx!.arc(drawX, drawY, star.size * 3, 0, Math.PI * 2)
          ctx!.fill()
        }

        // Star point
        ctx!.beginPath()
        ctx!.arc(drawX, drawY, star.size, 0, Math.PI * 2)
        ctx!.fillStyle = star.size > 0.8
          ? `rgba(192, 208, 230, ${alpha})`  // Lunar silver
          : `rgba(200, 215, 235, ${alpha * 0.8})`
        ctx!.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.6 }}
    />
  )
}