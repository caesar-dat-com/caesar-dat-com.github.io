import { useEffect, useRef, useCallback, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/* ===================================================
   Campo estelar en canvas 2D.
   3 capas de profundidad con parallax de scroll + puntero,
   clases espectrales reales, y meteoros esporádicos.
   =================================================== */

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  drift: number
  twinkleSpeed: number
  twinklePhase: number
  parallaxFactor: number
  color: string
}

interface Meteor {
  x: number
  y: number
  vx: number
  vy: number
  len: number
  life: number
  maxLife: number
}

// Clases espectrales — blanco azulado dominante, algunas cálidas
const SPECTRUM = [
  '200,220,255', '200,220,255', '200,220,255',
  '170,200,255',
  '255,244,224',
  '255,214,180',
]

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const meteorsRef = useRef<Meteor[]>([])
  const animFrameRef = useRef<number>(0)
  const scrollRef = useRef<number>(0)
  const pointerRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 })
  const prefersReduced = useReducedMotion()
  const [isLunar, setIsLunar] = useState(false)

  useEffect(() => {
    const check = () => setIsLunar(document.body.classList.contains('lunar'))
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  const initStars = useCallback((width: number, height: number) => {
    const count = Math.min(Math.floor((width * height) / 4200), 340)
    const stars: Star[] = []
    for (let i = 0; i < count; i++) {
      // 3 capas: fondo (lento/tenue) → frente (rápido/brillante)
      const layer = Math.random()
      const depth = layer < 0.55 ? 0 : layer < 0.85 ? 1 : 2
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 3,
        size: [0.6, 1.1, 1.9][depth] + Math.random() * 0.7,
        opacity: [0.28, 0.5, 0.75][depth] + Math.random() * 0.22,
        drift: (Math.random() * 0.05 + 0.01) * (depth + 1),
        twinkleSpeed: Math.random() * 0.022 + 0.004,
        twinklePhase: Math.random() * Math.PI * 2,
        parallaxFactor: [0.08, 0.2, 0.42][depth],
        color: SPECTRUM[Math.floor(Math.random() * SPECTRUM.length)],
      })
    }
    starsRef.current = stars
  }, [])

  useEffect(() => {
    const onScroll = () => { scrollRef.current = window.scrollY }
    const onPointer = (e: PointerEvent) => {
      pointerRef.current.tx = (e.clientX / window.innerWidth - 0.5) * 2
      pointerRef.current.ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onPointer, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointer)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReduced || isLunar) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let dpr = 1
    let W = 0
    let H = 0

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initStars(W, H)
      meteorsRef.current = []
    }

    resize()
    window.addEventListener('resize', resize)

    const spawnMeteor = () => {
      const fromLeft = Math.random() > 0.35
      const speed = 7 + Math.random() * 6
      const angle = (Math.random() * 12 + 22) * (Math.PI / 180)
      meteorsRef.current.push({
        x: fromLeft ? -60 : Math.random() * W,
        y: Math.random() * H * 0.55,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: 90 + Math.random() * 130,
        life: 0,
        maxLife: 70 + Math.random() * 40,
      })
    }

    let time = 0
    const animate = () => {
      time += 1
      const scroll = scrollRef.current
      const p = pointerRef.current
      p.x += (p.tx - p.x) * 0.045
      p.y += (p.ty - p.y) * 0.045

      ctx.clearRect(0, 0, W, H)

      const wrapH = H * 3
      for (const star of starsRef.current) {
        const parallaxY = star.y - scroll * star.parallaxFactor - p.y * star.parallaxFactor * 42
        const wrappedY = ((parallaxY % wrapH) + wrapH) % wrapH - H
        if (wrappedY < -12 || wrappedY > H + 12) continue

        star.x += star.drift
        if (star.x > W + 6) star.x = -6
        const px = star.x - p.x * star.parallaxFactor * 42

        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase)
        const alpha = star.opacity * (0.58 + 0.42 * twinkle)

        ctx.beginPath()
        ctx.arc(px, wrappedY, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${star.color},${alpha})`
        ctx.fill()

        // halo en las brillantes
        if (star.size > 1.6) {
          const g = ctx.createRadialGradient(px, wrappedY, 0, px, wrappedY, star.size * 5)
          g.addColorStop(0, `rgba(${star.color},${alpha * 0.32})`)
          g.addColorStop(1, `rgba(${star.color},0)`)
          ctx.beginPath()
          ctx.arc(px, wrappedY, star.size * 5, 0, Math.PI * 2)
          ctx.fillStyle = g
          ctx.fill()
        }
      }

      // Meteoros — ~1 cada 6 s
      if (Math.random() < 0.0028 && meteorsRef.current.length < 2) spawnMeteor()

      for (let i = meteorsRef.current.length - 1; i >= 0; i--) {
        const m = meteorsRef.current[i]
        m.x += m.vx
        m.y += m.vy
        m.life++

        const fade = 1 - m.life / m.maxLife
        const nx = m.vx / Math.hypot(m.vx, m.vy)
        const ny = m.vy / Math.hypot(m.vx, m.vy)
        const g = ctx.createLinearGradient(m.x, m.y, m.x - nx * m.len, m.y - ny * m.len)
        g.addColorStop(0, `rgba(215,232,255,${0.85 * fade})`)
        g.addColorStop(0.35, `rgba(120,170,255,${0.32 * fade})`)
        g.addColorStop(1, 'rgba(120,170,255,0)')

        ctx.beginPath()
        ctx.moveTo(m.x, m.y)
        ctx.lineTo(m.x - nx * m.len, m.y - ny * m.len)
        ctx.strokeStyle = g
        ctx.lineWidth = 1.6
        ctx.lineCap = 'round'
        ctx.stroke()

        if (m.life > m.maxLife || m.x > W + 200 || m.y > H + 200) {
          meteorsRef.current.splice(i, 1)
        }
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Pausa cuando la pestaña no está visible
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(animFrameRef.current)
      else animate()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [initStars, prefersReduced, isLunar])

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

  return <canvas ref={canvasRef} className="starfield-container" style={{ opacity: 0.8 }} />
}
