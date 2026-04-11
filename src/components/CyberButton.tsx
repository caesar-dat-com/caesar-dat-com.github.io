import { type ReactNode } from 'react'

interface CyberButtonProps {
  children: ReactNode
  kbd: string
  onClick?: () => void
  color?: 'cyan' | 'yellow'
  className?: string
}

export default function CyberButton({ children, kbd, onClick, color = 'cyan', className = '' }: CyberButtonProps) {
  const accentClass = color === 'yellow' ? 'text-tertiary-500' : 'text-secondary-500'
  const kbdBg = color === 'yellow' ? 'bg-tertiary-500' : 'bg-secondary-500'
  const glowClass = color === 'yellow'
    ? 'shadow-[0_0_18px_rgba(254,211,63,0.22)]'
    : 'shadow-[0_0_18px_rgba(43,228,234,0.35)]'

  return (
    <button
      className={`relative w-full text-left uppercase inline-flex items-center justify-between gap-3 px-2.5 py-2 border-0 bg-transparent cursor-pointer font-mono tracking-wider min-w-0 group ${accentClass} ${className}`}
      onClick={onClick}
      type="button"
    >
      {/* Backdrop */}
      <span
        className={`absolute z-[-1] inset-0 bg-black/25 notch-clip pointer-events-none ${glowClass} overflow-hidden`}
      >
        <span
          className="absolute inset-0 bg-current border border-transparent notch-clip opacity-80"
          style={{
            mask: 'linear-gradient(#0000 0% 100%), linear-gradient(#fff 0% 100%)',
            maskClip: 'padding-box, border-box',
            maskRepeat: 'no-repeat',
            maskComposite: 'intersect',
          }}
        />
      </span>

      {/* Corner decoration */}
      <span className="absolute bottom-0 right-0 h-3 w-3">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[135deg] h-[2px] w-[200%] bg-current" />
      </span>

      {/* KBD badge */}
      <span
        className={`${kbdBg} text-bg-300 font-bold w-[22px] h-[22px] text-[9px] rounded-full inline-grid place-items-center flex-none`}
      >
        {kbd}
      </span>

      {/* Label */}
      <span className="pointer-events-none">{children}</span>

      {/* Glitch layer on hover */}
      <span
        className="hidden group-hover:flex absolute inset-0 items-center justify-between gap-3 px-2.5 py-2 animate-[glitch_2s_infinite]"
        aria-hidden="true"
      >
        <span className={`${kbdBg} text-bg-300 font-bold w-[22px] h-[22px] text-[9px] rounded-full inline-grid place-items-center flex-none`}>
          {kbd}
        </span>
        <span className="inline-flex gap-px">
          {String(children).split('').map((ch, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                transform: [1, 4].includes(i % 7) ? 'scaleY(-1)' : [2, 5, 6].includes(i % 7) ? 'scale(-1,-1)' : undefined,
              }}
            >
              {ch}
            </span>
          ))}
        </span>
      </span>
    </button>
  )
}