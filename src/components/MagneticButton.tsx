import { useRef, useCallback, type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  as?: 'a' | 'button'
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  as: Component = 'a',
  href,
  target,
  rel,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const motionRef = useRef({ x: 0, y: 0 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength
      motionRef.current = { x: deltaX, y: deltaY }
      if (ref.current) {
        ref.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`
      }
    },
    [strength]
  )

  const handleMouseLeave = useCallback(() => {
    motionRef.current = { x: 0, y: 0 }
    if (ref.current) {
      ref.current.style.transform = 'translate(0, 0)'
      ref.current.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      setTimeout(() => {
        if (ref.current) ref.current.style.transition = ''
      }, 400)
    }
  }, [])

  const sharedProps = {
    ref: ref as any,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className,
  }

  if (Component === 'button') {
    return (
      <button {...sharedProps} onClick={onClick} type="button">
        {children}
      </button>
    )
  }

  return (
    <a {...sharedProps} href={href} target={target} rel={rel}>
      {children}
    </a>
  )
}