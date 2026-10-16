import { type ReactNode, useState, useEffect, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'

interface MissionPatchProps {
  children: ReactNode
  delay?: number
  className?: string
  missionId?: string
  status?: 'active' | 'complete' | 'training'
}

const statusColors = {
  active: { bg: 'rgba(255, 255, 255, 0.08)', border: 'rgba(255, 255, 255, 0.32)', text: '#ffffff', glow: 'rgba(255, 255, 255, 0.22)' },
  complete: { bg: 'rgba(192, 138, 94, 0.08)', border: 'rgba(192, 138, 94, 0.3)', text: '#c08a5e', glow: 'rgba(192, 138, 94, 0.18)' },
  training: { bg: 'rgba(124, 130, 140, 0.08)', border: 'rgba(124, 130, 140, 0.3)', text: '#7c828c', glow: 'rgba(124, 130, 140, 0.15)' },
}

const lunarStatusColors = {
  active: { bg: '#000000', border: '#000000', text: '#ffffff' },
  complete: { bg: 'rgba(138, 90, 51, 0.08)', border: 'rgba(138, 90, 51, 0.4)', text: '#7a4d29' },
  training: { bg: '#ffffff', border: 'rgba(0, 0, 0, 0.16)', text: '#6a6a70' },
}

const STATUS_LABEL: Record<string, string> = {
  active: 'EN CURSO',
  complete: 'COMPLETA',
  training: 'ENTRENAMIENTO',
}

export default function MissionPatch({
  children,
  delay = 0,
  className = '',
  missionId,
  status = 'complete',
}: MissionPatchProps) {
  const [isLunar, setIsLunar] = useState(false)
  const [reduced, setReduced] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const check = () => setIsLunar(document.body.classList.contains('lunar'))
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    return () => obs.disconnect()
  }, [])

  const colors = statusColors[status]
  const lunarColors = lunarStatusColors[status]

  const mx = useMotionValue(-9999)
  const my = useMotionValue(-9999)
  const sx = useSpring(mx, { stiffness: 300, damping: 30, mass: 0.4 })
  const sy = useSpring(my, { stiffness: 300, damping: 30, mass: 0.4 })

  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 200, damping: 22 })
  const sry = useSpring(ry, { stiffness: 200, damping: 22 })

  const accent = isLunar ? lunarColors.text : colors.text
  const sheen = useMotionTemplate`radial-gradient(300px circle at ${sx}px ${sy}px, ${accent}1f, transparent 62%)`

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || reduced) return
    const r = ref.current.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
    const amp = isLunar ? 2 : 5
    rx.set(((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -amp)
    ry.set(((e.clientX - r.left - r.width / 2) / (r.width / 2)) * amp)
  }, [mx, my, rx, ry, isLunar, reduced])

  const onLeave = useCallback(() => {
    rx.set(0); ry.set(0); mx.set(-9999); my.set(-9999)
  }, [rx, ry, mx, my])

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 34, scale: 0.94, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.75, delay: delay * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduced ? undefined : { y: -6 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`mission-patch ${isLunar ? '' : 'breathing-glow'} ${className}`}
      style={{
        ...(isLunar ? {} : ({ '--glow-color': colors.glow } as React.CSSProperties)),
        ...(reduced ? {} : { transformPerspective: 900, rotateX: srx, rotateY: sry }),
      }}
    >
      <span className="trace-border" aria-hidden="true" />
      {/* Reflejo que sigue al cursor */}
      {!reduced && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: sheen }}
        />
      )}

      <div className="relative z-10" style={{ transform: reduced ? undefined : 'translateZ(30px)' }}>
        {missionId && (
          <div
            className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-mono uppercase tracking-widest"
            style={isLunar ? {
              background: lunarColors.bg,
              border: `1px solid ${lunarColors.border}`,
              color: lunarColors.text,
            } : {
              background: colors.bg,
              border: `1px solid ${colors.border}`,
              color: colors.text,
            }}
          >
            <span
              className={status === 'active' ? 'status-pulse' : 'inline-block h-1.5 w-1.5 rounded-full'}
              style={{ background: accent, color: accent }}
            />
            {missionId}
            <span className="opacity-45">· {STATUS_LABEL[status]}</span>
          </div>
        )}
        {children}
      </div>
    </motion.div>
  )
}
