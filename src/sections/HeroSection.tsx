import { useEffect, useState, useRef, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LINKS, EMAIL, defaultSummary } from '../data/profile'
import HUDBracket from '../components/HUDBracket'
import MagneticButton from '../components/MagneticButton'
import TelemetryTypewriter from '../components/TelemetryTypewriter'
import ParallaxNebula from '../components/ParallaxNebula'
import AuroraEffect from '../components/AuroraEffect'
import { Mail, GithubIcon, LinkedinIcon } from '../components/icons'

const MoonScene = lazy(() => import('../components/MoonScene'))

gsap.registerPlugin(ScrollTrigger)

// Typewriter hook
function useTypewriter(text: string, speed = 50) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        setDone(true)
        clearInterval(interval)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  return { displayed, done }
}

export default function HeroSection() {
  const [profile, setProfile] = useState<{
    firstName: string; lastName: string; headline: string; location: string; summary: string
  } | null>(null)

  useEffect(() => {
    fetch('/data/linkedin-data.json')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) {
          setProfile({
            firstName: data.firstName || 'César',
            lastName: data.lastName || 'Reyes',
            headline: data.headline || 'Data · IA · Automatización',
            location: data.location || 'Cali, Colombia',
            summary: data.summary || defaultSummary,
          })
        }
      })
      .catch(() => {})
  }, [])

  const p = profile || {
    firstName: 'César', lastName: 'Reyes',
    headline: 'Data · IA · Automatización',
    location: 'Cali, Colombia', summary: defaultSummary,
  }

  const { displayed: headlineText, done: headlineDone } = useTypewriter(p.headline, 40)

  // GSAP pinning for hero
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current || !contentRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '+=300',
        scrub: 1,
        pin: false,
      },
    })

    tl.to(contentRef.current, {
      opacity: 0,
      y: -60,
      scale: 0.95,
      ease: 'none',
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section id="hero" ref={heroRef} className="scroll-section hero relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Aurora Borealis */}
      <AuroraEffect />
      {/* Parallax Nebula Layers */}
      <ParallaxNebula />

      {/* 3D Moon */}
      <div className="moon-scene absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] opacity-60 md:opacity-80 pointer-events-none">
        <Suspense fallback={null}>
          <MoonScene />
        </Suspense>
      </div>

      {/* Hero content */}
      <div ref={contentRef} className="relative z-10 mx-auto max-w-5xl px-4 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Mission badge */}
          <HUDBracket className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-glass-border bg-space-800/50 px-4 py-1.5 text-xs uppercase tracking-widest text-orbital backdrop-blur-sm" size={8}>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-orbital animate-pulse" />
            <span style={{ fontFamily: 'var(--font-mono)' }}>MISIÓN ACTIVA</span>
          </HUDBracket>

          {/* Name — massive typography */}
          <h1
            className="text-shimmer mb-4"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(4rem, 10vw, 9rem)',
              fontWeight: 700,
              letterSpacing: '0.02em',
              lineHeight: 1.05,
            }}
          >
            {p.firstName}
            <br />
            <span style={{ color: 'var(--color-orbital)' }}>{p.lastName}</span>
          </h1>

          {/* Headline with typewriter */}
          <p
            className="mb-6 font-medium"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              color: 'var(--color-text-secondary)',
              letterSpacing: '0.01em',
            }}
          >
            {headlineText}
            {!headlineDone && <span className="typewriter-cursor" />}
          </p>

          {/* Summary */}
          <p
            className="mx-auto mb-8 max-w-2xl md:mx-0"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.125rem',
              color: 'var(--color-text-tertiary)',
              lineHeight: 1.7,
            }}
          >
            {p.summary}
          </p>

          {/* Telemetry */}
          <TelemetryTypewriter className="mb-8" />

          {/* CTA Buttons — Magnetic */}
          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <MagneticButton
              href={`mailto:${EMAIL}`}
              className="btn-orbital"
              strength={0.2}
            >
              <span className="icon-inline">
                <Mail size={17} strokeWidth={1.6} /> Contacto
              </span>
            </MagneticButton>
            <MagneticButton
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              strength={0.2}
            >
              <span className="icon-inline">
                <LinkedinIcon size={16} /> LinkedIn
              </span>
            </MagneticButton>
            <MagneticButton
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              strength={0.2}
            >
              <span className="icon-inline">
                <GithubIcon size={16} /> GitHub
              </span>
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-widest text-text-muted" style={{ fontFamily: 'var(--font-mono)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="scroll-indicator w-5 h-8 rounded-full border border-glass-border flex items-start justify-center pt-1"
        >
          <div className="w-1 h-2 rounded-full bg-orbital" />
        </motion.div>
      </motion.div>
    </section>
  )
}