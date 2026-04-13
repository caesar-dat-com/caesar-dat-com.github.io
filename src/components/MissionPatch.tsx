import { type ReactNode, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface MissionPatchProps {
  children: ReactNode
  delay?: number
  className?: string
  missionId?: string
  status?: 'active' | 'complete' | 'training'
}

const statusColors = {
  active: { bg: 'rgba(0, 102, 255, 0.1)', border: 'rgba(0, 102, 255, 0.4)', text: '#0066ff', glow: 'rgba(0, 102, 255, 0.3)' },
  complete: { bg: 'rgba(255, 107, 53, 0.1)', border: 'rgba(255, 107, 53, 0.4)', text: '#ff6b35', glow: 'rgba(255, 107, 53, 0.25)' },
  training: { bg: 'rgba(139, 148, 158, 0.1)', border: 'rgba(139, 148, 158, 0.4)', text: '#8b949e', glow: 'rgba(139, 148, 158, 0.2)' },
}

const lunarStatusColors = {
  active: { bg: 'rgba(0, 102, 255, 0.06)', border: 'rgba(0, 102, 255, 0.25)', text: '#0066ff' },
  complete: { bg: 'rgba(255, 107, 53, 0.06)', border: 'rgba(255, 107, 53, 0.25)', text: '#ff6b35' },
  training: { bg: 'rgba(0, 0, 0, 0.04)', border: 'rgba(0, 0, 0, 0.1)', text: '#86868b' },
}

export default function MissionPatch({
  children,
  delay = 0,
  className = '',
  missionId,
  status = 'complete',
}: MissionPatchProps) {
  const [isLunar, setIsLunar] = useState(false)

  useEffect(() => {
    const check = () => setIsLunar(document.body.classList.contains('lunar'))
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  const colors = statusColors[status]
  const lunarColors = lunarStatusColors[status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: delay * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      className={`mission-patch ${isLunar ? '' : 'breathing-glow'} ${className}`}
      style={isLunar ? {} : {
        '--glow-color': colors.glow,
      } as React.CSSProperties}
    >
      {/* Mission ID badge */}
      {missionId && (
        <div
          className="mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono uppercase tracking-widest"
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
          <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: isLunar ? lunarColors.text : colors.text }} />
          {missionId}
        </div>
      )}
      {children}
    </motion.div>
  )
}