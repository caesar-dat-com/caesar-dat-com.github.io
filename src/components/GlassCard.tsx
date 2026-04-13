import { useRef, useState, useCallback, useEffect, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

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

  // Check theme
  useEffect(() => {
    const check = () => setIsLunar(document.body.classList.contains('lunar'))
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  // Mouse-following glow effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 })

  // 3D Tilt
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 })

  // Map tilt to a subtle shadow movement
  const shadowX = useTransform(springRotateY, [-8, 8], [4, -4])
  const shadowY = useTransform(springRotateX, [-8, 8], [-4, 4])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    // In lunar mode, skip tilt and glow
    if (isLunar) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Glow position
    mouseX.set(x)
    mouseY.set(y)

    // 3D tilt — center-relative
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const tiltX = ((y - centerY) / centerY) * -6 // max 6deg
    const tiltY = ((x - centerX) / centerX) * 6
    rotateX.set(tiltX)
    rotateY.set(tiltY)
  }, [mouseX, mouseY, rotateX, rotateY, isLunar])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: delay * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`glass-card p-6 ${className}`}
      style={isLunar ? {} : {
        transform: 'perspective(800px)',
        rotateX: springRotateX,
        rotateY: springRotateY,
      }}
    >
      {/* Mouse-following radial glow — only in dark mode */}
      {!isLunar && (glow || isHovered) && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[20px]"
          style={{
            background: `radial-gradient(300px circle at ${springX.get()}px ${springY.get()}px, rgba(0,102,255,0.08), transparent)`,
            opacity: isHovered ? 1 : 0,
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      {/* Floating shadow for depth — only in dark mode */}
      {!isLunar && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[20px]"
          style={{
            boxShadow: `${shadowX.get()}px ${shadowY.get()}px 30px rgba(0,0,0,0.3)`,
            opacity: isHovered ? 0.5 : 0,
          }}
          animate={{ opacity: isHovered ? 0.5 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}