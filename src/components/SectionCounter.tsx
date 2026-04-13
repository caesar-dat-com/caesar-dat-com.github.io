import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SECTIONS = ['hero', 'stack', 'experience', 'projects', 'education', 'certs', 'contact']
const TOTAL = SECTIONS.length

export default function SectionCounter() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLunar, setIsLunar] = useState(false)

  // Check theme
  useEffect(() => {
    const check = () => setIsLunar(document.body.classList.contains('lunar'))
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const sections = SECTIONS.map(id => document.getElementById(id))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = SECTIONS.indexOf(entry.target.id)
            if (idx !== -1) setActiveIndex(idx)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    )

    sections.forEach(section => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  // Respect reduced motion
  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  const current = String(activeIndex + 1).padStart(2, '0')
  const total = String(TOTAL).padStart(2, '0')

  const mutedColor = isLunar ? '#aeaeb2' : undefined
  const textColor = isLunar ? '#86868b' : undefined

  return (
    <div
      className="section-counter fixed bottom-6 right-6 z-50 flex items-baseline gap-0.5 font-mono text-sm opacity-40 hover:opacity-80 transition-opacity"
      style={{
        fontFamily: 'var(--font-mono)',
        color: textColor,
      }}
      aria-label={`Sección ${activeIndex + 1} de ${TOTAL}`}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={current}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.25, ease: 'easeOut' }}
          className="counter-active text-orbital font-bold"
        >
          {current}
        </motion.span>
      </AnimatePresence>
      <span style={{ color: mutedColor }}>/</span>
      <span>{total}</span>
    </div>
  )
}