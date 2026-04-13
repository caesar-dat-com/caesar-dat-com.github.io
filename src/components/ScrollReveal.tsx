import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
  once?: boolean
}

const directionMap = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  once = true,
}: ScrollRevealProps) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  const offset = directionMap[direction]

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{
        duration: 0.7,
        delay: delay * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}