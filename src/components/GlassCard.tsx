import { type ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  hover3d?: boolean
  glow?: 'cyan' | 'lunar' | 'blue' | 'none'
  as?: 'div' | 'article' | 'button' | 'section'
}

/**
 * GlassCard — Apple Liquid Glass card with specular highlight.
 * - White/translucent background with blur (light-first)
 * - Specular highlight gradient (top-left shine)
 * - 3D tilt effect on hover (optional)
 * - Subtle spring animation on hover
 * - Notch clip + diagonal deco (cyberpunk accent)
 */
export default function GlassCard({
  children,
  className = '',
  onClick,
  hover3d = false,
  glow = 'none',
  as: Tag = 'div',
}: GlassCardProps) {
  const glowClass = glow !== 'none' ? 'neon-glow' : ''

  return (
    <Tag
      className={`glass-card notch-clip ${glowClass} ${
        onClick ? 'cursor-pointer active:scale-[0.98]' : ''
      } ${hover3d ? 'transition-transform duration-500' : ''} ${className}`}
      onClick={onClick}
      onMouseMove={hover3d ? handle3dTilt : undefined}
      onMouseLeave={hover3d ? handle3dReset : undefined}
      {...(onClick ? { role: 'button', tabIndex: 0 } : {})}
    >
      <span className="notch-deco" />
      <div className="p-4 pb-[calc(1rem+0.55rem)] min-w-0 relative z-[2]">
        {children}
      </div>
    </Tag>
  )
}

function handle3dTilt(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = ((y - centerY) / centerY) * -3
  const rotateY = ((x - centerX) / centerX) * 3
  el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`
}

function handle3dReset(e: React.MouseEvent<HTMLElement>) {
  e.currentTarget.style.transform = ''
}