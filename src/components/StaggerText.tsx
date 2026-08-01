import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface StaggerTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
  staggerDelay?: number
  as?: 'h2' | 'h3' | 'span' | 'p'
  /** Alineación del bloque. Por defecto centrado (encabezados de sección). */
  align?: 'left' | 'center' | 'right'
}

const JUSTIFY = { left: 'flex-start', center: 'center', right: 'flex-end' } as const

export default function StaggerText({
  text,
  className = '',
  style,
  staggerDelay = 0.028,
  as: Tag = 'h2',
  align = 'center',
}: StaggerTextProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  if (prefersReduced) {
    return (
      <Tag ref={ref as any} className={className} style={style}>
        {text}
      </Tag>
    )
  }

  const characters = text.split('')

  return (
    <Tag
      ref={ref as any}
      className={className}
      style={{
        ...style,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: JUSTIFY[align],
      }}
      aria-label={text}
    >
      {characters.map((char, i) => (
        // El wrapper recorta: la letra sube desde debajo de su propia línea base
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            paddingBottom: '0.12em',
            marginBottom: '-0.12em',
          }}
        >
          <motion.span
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{
              duration: 0.72,
              delay: i * staggerDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
