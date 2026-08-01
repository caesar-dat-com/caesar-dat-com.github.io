import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

type Variant = 'orbital' | 'sls' | 'muted'
type Shape = 'circle' | 'squircle' | 'bare'

interface Props {
  icon: LucideIcon | React.ComponentType<{ size?: number | string; className?: string }>
  size?: number
  boxSize?: number
  variant?: Variant
  shape?: Shape
  /** Traza el icono al entrar en viewport (solo iconos de línea) */
  draw?: boolean
  /** Anillo orbital girando alrededor */
  orbit?: boolean
  className?: string
  strokeWidth?: number
}

const VARIANT_COLOR: Record<Variant, string> = {
  orbital: 'var(--color-orbital)',
  sls: 'var(--color-sls)',
  muted: 'var(--color-text-tertiary)',
}

export default function IconBadge({
  icon: Icon,
  size = 22,
  boxSize = 48,
  variant = 'orbital',
  shape = 'squircle',
  draw = true,
  orbit = false,
  className = '',
  strokeWidth = 1.5,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const color = VARIANT_COLOR[variant]
  const shouldDraw = draw && inView && !reduced

  if (shape === 'bare') {
    return (
      <motion.span
        ref={ref as any}
        className={`icon-badge-bare ${shouldDraw ? 'icon-draw' : ''} ${className}`}
        style={{ color, display: 'inline-flex' }}
        initial={reduced ? false : { opacity: 0, scale: 0.7 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Icon size={size} strokeWidth={strokeWidth} />
      </motion.span>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={`icon-badge icon-badge--${shape} icon-badge--${variant} ${className}`}
      style={{ width: boxSize, height: boxSize, color }}
      initial={reduced ? false : { opacity: 0, scale: 0.6, rotate: -12 }}
      animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduced ? undefined : { scale: 1.08, rotate: 3 }}
    >
      {orbit && <span className="icon-badge__orbit" aria-hidden="true" />}
      <span className="icon-badge__glow" aria-hidden="true" />
      <span className={shouldDraw ? 'icon-draw' : ''}>
        <Icon size={size} strokeWidth={strokeWidth} />
      </span>
    </motion.div>
  )
}
