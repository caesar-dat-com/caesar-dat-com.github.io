import { type ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  hover3d?: boolean
  glow?: 'cyan' | 'lunar' | 'none'
  as?: 'div' | 'article' | 'button' | 'section'
}

/**
 * GlassCard — Apple glassmorphism card with Artemis × Cyberpunk aesthetic.
 * - Frosted glass background with blur
 * - Subtle neon/lunar glow options
 * - 3D tilt effect on hover (optional)
 * - Notch clip + diagonal deco (cyberpunk signature)
 */
export default function GlassCard({
  children,
  className = '',
  onClick,
  hover3d = false,
  glow = 'none',
  as: Tag = 'div',
}: GlassCardProps) {
  const glowClass = glow === 'cyan' ? 'neon-glow' : glow === 'lunar' ? 'lunar-glow' : ''

  return (
    <Tag
      className={`glass-card notch-clip ${glowClass} ${
        onClick ? 'cursor-pointer active:scale-[0.98]' : ''
      } ${hover3d ? 'transition-transform duration-300 hover:scale-[1.02]' : ''} ${className}`}
      onClick={onClick}
      onMouseMove={hover3d ? handle3dTilt : undefined}
      onMouseLeave={hover3d ? handle3dReset : undefined}
      {...(onClick ? { role: 'button', tabIndex: 0 } : {})}
    >
      <span className="notch-deco" />
      <div className="p-4 pb-[calc(1rem+0.65rem)] min-w-0">
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
  const rotateX = ((y - centerY) / centerY) * -4
  const rotateY = ((x - centerX) / centerX) * 4
  el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
}

function handle3dReset(e: React.MouseEvent<HTMLElement>) {
  e.currentTarget.style.transform = ''
}