import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Moon, SunMedium } from './icons'

export default function ThemeToggle() {
  const [isLunar, setIsLunar] = useState(() => {
    if (typeof window === 'undefined') return false
    return document.body.classList.contains('lunar')
  })

  useEffect(() => {
    // Check saved preference
    const saved = localStorage.getItem('theme')
    if (saved === 'lunar') {
      document.body.classList.add('lunar')
      setIsLunar(true)
    }
  }, [])

  const toggle = () => {
    const next = !isLunar
    setIsLunar(next)

    // Add transition class for smooth theme switch
    document.body.classList.add('theme-transitioning')

    if (next) {
      document.body.classList.add('lunar')
      localStorage.setItem('theme', 'lunar')
    } else {
      document.body.classList.remove('lunar')
      localStorage.setItem('theme', 'space')
    }

    // Remove transition class after animation
    setTimeout(() => {
      document.body.classList.remove('theme-transitioning')
    }, 600)
  }

  return (
    <motion.button
      onClick={toggle}
      className={`theme-toggle-btn relative flex h-8 w-8 items-center justify-center rounded-full border text-sm backdrop-blur-sm transition-colors ${
        isLunar
          ? 'border-black/15 bg-black/[0.04] hover:border-orbital/40 hover:bg-orbital/10'
          : 'border-white/10 bg-white/5 hover:border-orbital/40 hover:bg-orbital/10'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isLunar ? 'Switch to space mode' : 'Switch to lunar mode'}
      title={isLunar ? 'Modo lunar' : 'Modo espacio'}
    >
      <span className="theme-icon-swap" aria-hidden="true">
        <SunMedium size={15} strokeWidth={1.6} className={isLunar ? 'is-on' : ''} />
        <Moon size={15} strokeWidth={1.6} className={isLunar ? '' : 'is-on'} />
      </span>
    </motion.button>
  )
}