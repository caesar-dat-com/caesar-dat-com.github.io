import { useRef, useState, useCallback, useEffect, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'

interface GlassCardProps {
  children: ReactNode
  delay?: number
  className?: string
  glow?: boolean
}

export default function GlassCard({ children, delay = 0, className = '', glow = false }: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isLunar, setIsLunar] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const check = () => setIsLunar(document.body.classList.contains('lunar'))
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    return () => obs.disconnect()
  }, [])

  // Posición del cursor (px, relativa a la tarjeta)
  const mouseX = useMotionValue(-9999)
  const mouseY = useMotionValue(-9999)
  const springX = useSpring(mouseX, { stiffness: 320, damping: 30, mass: 0.4 })
  const springY = useSpring(mouseY, { stiffness: 320, damping: 30, mass: 0.4 })

  // Tilt 3D
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, { stiffness: 220, damping: 22 })
  const springRotateY = useSpring(rotateY, { stiffness: 220, damping: 22 })

  const shadowX = useTransform(springRotateY, [-8, 8], [10, -10])
  const shadowY = useTransform(springRotateX, [-8, 8], [-10, 10])

  // Gradientes reactivos — useMotionTemplate sí se re-evalúa en cada frame
  const glowBg = useMotionTemplate`radial-gradient(340px circle at ${springX}px ${springY}px, rgba(0,102,255,0.13), transparent 65%)`
  const sheenBg = useMotionTemplate`radial-gradient(240px circle at ${springX}px ${springY}px, rgba(255,255,255,0.09), transparent 55%)`
  const lunarGlowBg = useMotionTemplate`radial-gradient(320px circle at ${springX}px ${springY}px, rgba(0,102,255,0.07), transparent 62%)`
  const boxShadow = useMotionTemplate`${shadowX}px ${shadowY}px 34px rgba(0,0,0,0.32)`

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || reduced) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    mouseX.set(x)
    mouseY.set(y)

    // El tilt se atenúa en modo lunar (superficie mate, no cristal)
    const amp = isLunar ? 2.5 : 6.5
    rotateX.set(((y - rect.height / 2) / (rect.height / 2)) * -amp)
    rotateY.set(((x - rect.width / 2) / (rect.width / 2)) * amp)
  }, [mouseX, mouseY, rotateX, rotateY, isLunar, reduced])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    rotateX.set(0)
    rotateY.set(0)
    mouseX.set(-9999)
    mouseY.set(-9999)
  }, [rotateX, rotateY, mouseX, mouseY])

  return (
    <motion.div
      ref={cardRef}
      initial={reduced ? false : { opacity: 0, y: 34, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.75, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`glass-card p-6 ${className}`}
      style={reduced ? {} : {
        transformPerspective: 900,
        rotateX: springRotateX,
        rotateY: springRotateY,
      }}
    >
      {/* Halo que sigue al cursor */}
      {(glow || isHovered) && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[20px]"
          style={{ background: isLunar ? lunarGlowBg : glowBg }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Reflejo especular — solo modo espacio */}
      {!isLunar && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[20px]"
          style={{ background: sheenBg }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        />
      )}

      {/* Sombra proyectada que acompaña al tilt */}
      {!isLunar && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[20px]"
          style={{ boxShadow }}
          animate={{ opacity: isHovered ? 0.55 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <div className="relative z-10" style={{ transform: 'translateZ(28px)' }}>{children}</div>
    </motion.div>
  )
}
