import { type ReactNode } from 'react'

interface NeonTextProps {
  children: ReactNode
  color?: 'cyan' | 'magenta' | 'yellow' | 'lunar'
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p'
  className?: string
  pulse?: boolean
}

/**
 * NeonText — Text with cyberpunk neon glow effect.
 * - Cyan: primary accent (#00f0ff)
 * - Magenta: secondary accent (#ff2d95)
 * - Yellow: warning/highlight (#ffd60a)
 * - Lunar: soft silver moonlight (#8ea8cc)
 */
export default function NeonText({
  children,
  color = 'cyan',
  as: Tag = 'span',
  className = '',
  pulse = false,
}: NeonTextProps) {
  const colors = {
    cyan: { text: 'text-neon-cyan', shadow: '0 0 10px rgba(0,240,255,0.4), 0 0 30px rgba(0,240,255,0.15)' },
    magenta: { text: 'text-neon-magenta', shadow: '0 0 10px rgba(255,45,149,0.4), 0 0 30px rgba(255,45,149,0.15)' },
    yellow: { text: 'text-neon-yellow', shadow: '0 0 10px rgba(255,214,10,0.4), 0 0 30px rgba(255,214,10,0.15)' },
    lunar: { text: 'text-lunar-400', shadow: '0 0 12px rgba(142,168,204,0.25), 0 0 30px rgba(142,168,204,0.08)' },
  }

  const { text, shadow } = colors[color]

  return (
    <Tag
      className={`${text} font-display tracking-wider uppercase ${pulse ? 'animate-neon-pulse' : ''} ${className}`}
      style={{ textShadow: shadow }}
    >
      {children}
    </Tag>
  )
}