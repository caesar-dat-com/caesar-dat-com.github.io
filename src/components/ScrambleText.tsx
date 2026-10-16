import { useEffect, useRef, useState } from 'react'

const GLYPHS = '▚▞ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/·_'

interface ScrambleTextProps {
  text: string
  className?: string
  /** ms entre letras resueltas */
  step?: number
}

/** Etiqueta que se "descifra" letra por letra al entrar en pantalla. */
export default function ScrambleText({ text, className = '', step = 45 }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(text)
      return
    }

    let timer = 0
    let resolved = 0
    const run = () => {
      resolved = 0
      const tick = () => {
        resolved += 1
        setDisplay(
          text
            .split('')
            .map((ch, i) =>
              i < resolved || ch === ' ' || ch === '.' ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            )
            .join('')
        )
        if (resolved < text.length) timer = window.setTimeout(tick, step)
      }
      tick()
    }

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            run()
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.6 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      window.clearTimeout(timer)
    }
  }, [text, step])

  // data-text reserva el ancho final (ver .scramble-text::after) para que no salte el layout
  return (
    <span ref={ref} className={`scramble-text ${className}`.trim()} data-text={text}>
      {display}
    </span>
  )
}
