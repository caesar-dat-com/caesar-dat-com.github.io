import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

interface StaggerTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
  staggerDelay?: number
  as?: 'h2' | 'h3' | 'span' | 'p'
}

export default function StaggerText({
  text,
  className = '',
  style,
  staggerDelay = 0.03,
  as: Tag = 'h2',
}: StaggerTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  // Respect reduced motion
  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  // Split text into characters (handle spaces)
  const characters = text.split('')

  if (prefersReduced) {
    return (
      <Tag ref={ref as any} className={className} style={style}>
        {text}
      </Tag>
    )
  }

  return (
    <Tag ref={ref as any} className={className} style={{ ...style, display: 'flex', flexWrap: 'wrap', overflow: 'hidden' }}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.4,
            delay: i * staggerDelay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
      {/* Hidden accessible text */}
      <span className="sr-only">{text}</span>
    </Tag>
  )
}