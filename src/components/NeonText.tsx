import { type ReactNode } from 'react'

interface NeonTextProps {
  children: ReactNode
  color?: 'cyan' | 'magenta' | 'yellow' | 'lunar' | 'blue'
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p'
  className?: string
  pulse?: boolean
}

/**
 * NeonText — Text with glow effect.
 * Light mode: Apple blue (#0071e3) as primary, lunar silver as secondary
 * Dark mode: Cyberpunk neon (cyan, magenta, yellow) + lunar
 */
export default function NeonText({
  children,
  color = 'cyan',
  as: Tag = 'span',
  className = '',
  pulse = false,
}: NeonTextProps) {
  const colors = {
    cyan: {
      text: 'text-secondary-500',
      shadow: '0 0 8px rgba(0,113,227,0.15)',
      darkShadow: '0 0 12px rgba(0,240,255,0.3), 0 0 30px rgba(0,240,255,0.12)',
    },
    blue: {
      text: 'text-secondary-500',
      shadow: '0 0 10px rgba(0,113,227,0.2)',
      darkShadow: '0 0 12px rgba(41,151,255,0.35), 0 0 30px rgba(41,151,255,0.15)',
    },
    magenta: {
      text: 'text-neon-magenta',
      shadow: '0 0 8px rgba(255,45,149,0.15)',
      darkShadow: '0 0 12px rgba(255,45,149,0.4), 0 0 30px rgba(255,45,149,0.15)',
    },
    yellow: {
      text: 'text-neon-yellow',
      shadow: '0 0 8px rgba(255,214,10,0.15)',
      darkShadow: '0 0 12px rgba(255,214,10,0.4), 0 0 30px rgba(255,214,10,0.15)',
    },
    lunar: {
      text: 'text-lunar-500',
      shadow: '0 0 8px rgba(142,168,204,0.12)',
      darkShadow: '0 0 12px rgba(142,168,204,0.25), 0 0 30px rgba(142,168,204,0.08)',
    },
  }

  const { text, shadow, darkShadow } = colors[color]

  // Detect dark mode at render time via CSS custom property won't work in JS,
  // so we use the light shadow by default and let CSS handle the rest
  return (
    <Tag
      className={`${text} font-display tracking-wider uppercase ${pulse ? 'animate-neon-pulse' : ''} ${className}`}
      style={{ textShadow: shadow }}
    >
      {children}
    </Tag>
  )
}