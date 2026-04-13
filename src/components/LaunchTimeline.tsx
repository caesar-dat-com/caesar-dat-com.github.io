import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface LaunchTimelineProps {
  children: ReactNode
  className?: string
}

export function TimelineEntry({
  children,
  isActive = false,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  isActive?: boolean
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: delay * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative pl-10 pb-8 ${className}`}
    >
      {/* Timeline dot */}
      <div className={`timeline-dot ${isActive ? 'active' : ''}`} />
      {/* Timeline line extends via CSS */}
      <div className="glass-card p-5 rounded-2xl">
        {children}
      </div>
    </motion.div>
  )
}

export default function LaunchTimeline({ children, className = '' }: LaunchTimelineProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Vertical line */}
      <div className="timeline-line" />
      {children}
    </div>
  )
}