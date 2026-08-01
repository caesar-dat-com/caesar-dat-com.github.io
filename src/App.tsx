import { useState, useEffect, useRef, useCallback, Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import StarField from './components/StarField'
import ThemeToggle from './components/ThemeToggle'
import ScrollProgress from './components/ScrollProgress'
import GrainOverlay from './components/GrainOverlay'
import MeshGradient from './components/MeshGradient'
import TelemetryTypewriter from './components/TelemetryTypewriter'
import TrajectoryLine from './components/TrajectoryLine'
import HUDBracket from './components/HUDBracket'
import MagneticButton from './components/MagneticButton'
import CursorSpotlight from './components/CursorSpotlight'
import SectionCounter from './components/SectionCounter'

// Sections (converted from pages)
import HeroSection from './sections/HeroSection'
import StackSection from './sections/StackSection'
import ExperienceSection from './sections/ExperienceSection'
import ProjectsSection from './sections/ProjectsSection'
import EducationSection from './sections/EducationSection'
import CertsSection from './sections/CertsSection'
import ContactSection from './sections/ContactSection'

import { Menu, X, GithubIcon, LinkedinIcon, Mail } from './components/icons'
import { LINKS, EMAIL } from './data/profile'

gsap.registerPlugin(ScrollTrigger)

const NAV_ITEMS = [
  { id: 'hero', label: 'Inicio' },
  { id: 'stack', label: 'Stack' },
  { id: 'experience', label: 'Experiencia' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'education', label: 'Educación' },
  { id: 'certs', label: 'Certificaciones' },
  { id: 'contact', label: 'Contacto' },
]

function StickyNav() {
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileOpen, setMobileOpen] = useState(false)

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = NAV_ITEMS.map(item => document.getElementById(item.id))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
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

  const scrollTo = useCallback((id: string) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) {
      const lenis = (window as any).__lenis
      if (lenis) {
        lenis.scrollTo(el, { offset: 0 })
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [])

  return (
    <>
      <ScrollProgress />
      <header className="nav-helmet">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <button
            onClick={() => scrollTo('hero')}
            className="font-heading text-lg font-bold tracking-wider hover:text-orbital transition-colors"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-lunar)' }}
          >
            <span className="text-orbital">CÉSAR</span> REYES
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-5 md:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link relative text-xs font-medium tracking-widest uppercase transition-colors ${
                  activeSection === item.id
                    ? 'text-orbital'
                    : 'text-text-tertiary hover:text-lunar'
                }`}
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-orbital rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile toggle */}
          <button
            className="text-text-primary md:hidden flex h-9 w-9 items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
          >
            <span className="theme-icon-swap" aria-hidden="true">
              <X size={22} strokeWidth={1.6} className={mobileOpen ? 'is-on' : ''} />
              <Menu size={22} strokeWidth={1.6} className={mobileOpen ? '' : 'is-on'} />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-menu md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-lg font-medium tracking-wide uppercase ${
                  activeSection === item.id
                    ? 'text-orbital'
                    : 'text-text-secondary hover:text-lunar'
                }`}
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {item.label}
              </button>
            ))}
            <div className="mt-4">
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function App() {
  // Initialize theme
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'lunar') {
      document.body.classList.add('lunar')
    }

    // Sync Lenis with GSAP ScrollTrigger
    const lenis = (window as any).__lenis
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update)
    }
  }, [])

  // GSAP ScrollTrigger setup for section reveals
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Kill all existing ScrollTriggers
    ScrollTrigger.getAll().forEach(t => t.kill())

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const sections = containerRef.current?.querySelectorAll('.scroll-section')
    if (!sections) return

    if (reduced) {
      containerRef.current?.querySelectorAll('.gsap-reveal').forEach(el => {
        gsap.set(el, { opacity: 1, y: 0, scale: 1, filter: 'none' })
      })
      return
    }

    sections.forEach((section) => {
      const elements = section.querySelectorAll('.gsap-reveal')
      elements.forEach((el, i) => {
        // Sin blur aquí: el desenfoque lo aplican GlassCard/MissionPatch a
        // nivel de tarjeta. Anidarlos deja el filtro pegado si el trigger
        // no completa, y cuesta caro en GPU.
        gsap.fromTo(
          el,
          { opacity: 0, y: 64, scale: 0.965 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.05,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 94%',
              once: true,
            },
            delay: i * 0.08,
          }
        )
      })

      // Parallax suave del badge de cada sección (hijo, no colisiona con el reveal)
      const badge = section.querySelector('.section-badge')
      if (badge) {
        gsap.fromTo(
          badge,
          { y: 26 },
          {
            y: -26,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        )
      }
    })

    // Las fuentes cambian la altura del layout → recalcular posiciones
    if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh())
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 800)

    // Dispara .in-view para las animaciones CSS (scan-sweep, section-rule)
    const cssAnimated = containerRef.current?.querySelectorAll('.scan-sweep, .section-rule')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('in-view')),
      { threshold: 0.25 }
    )
    cssAnimated?.forEach(el => io.observe(el))

    return () => {
      window.clearTimeout(refreshTimer)
      io.disconnect()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div className="app-container" ref={containerRef}>
      <StarField />
      <MeshGradient />
      <GrainOverlay />
      <CursorSpotlight />
      <StickyNav />
      <SectionCounter />

      <main className="relative z-10 flex-1">
        <HeroSection />
        <TrajectoryLine className="hidden md:block" />
        <StackSection />
        <TrajectoryLine className="hidden md:block" />
        <ExperienceSection />
        <TrajectoryLine className="hidden md:block" />
        <ProjectsSection />
        <TrajectoryLine className="hidden md:block" />
        <EducationSection />
        <TrajectoryLine className="hidden md:block" />
        <CertsSection />
        <TrajectoryLine className="hidden md:block" />
        <ContactSection />
      </main>

      <footer className="relative z-10 border-t border-glass-border py-8" style={{ transition: 'border-color 0.5s ease' }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <p className="text-text-muted text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
            © {new Date().getFullYear()} César Reyes
          </p>
          <TelemetryTypewriter />
          <div className="flex items-center gap-6 text-sm text-text-tertiary">
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="icon-inline nav-link hover:text-orbital transition-colors">
              <LinkedinIcon size={15} /> LinkedIn
            </a>
            <a href={LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="icon-inline nav-link hover:text-orbital transition-colors">
              <GithubIcon size={15} /> GitHub
            </a>
            <a href={`mailto:${EMAIL}`} aria-label="Email" className="icon-inline nav-link hover:text-orbital transition-colors">
              <Mail size={15} strokeWidth={1.6} /> Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}