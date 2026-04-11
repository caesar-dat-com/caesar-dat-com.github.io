import { type ReactNode } from 'react'

interface NotchCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  as?: 'div' | 'article' | 'button' | 'section'
}

export default function NotchCard({
  children,
  className = '',
  onClick,
  as: Tag = 'div',
}: NotchCardProps) {
  return (
    <Tag
      className={`relative glass-card notch-clip overflow-hidden transition-all duration-200 ${
        onClick
          ? 'cursor-pointer hover:bg-white/[0.06] active:scale-[0.99]'
          : ''
      } ${className}`}
      onClick={onClick}
      {...(onClick ? { role: 'button', tabIndex: 0 } : {})}
    >
      {/* Decoración notch — línea diagonal cyan (detalle cyberpunk) */}
      <span className="notch-deco" />
      <div className="p-4 pb-[calc(1rem+0.75rem)] min-w-0">
        {children}
      </div>
    </Tag>
  )
}
