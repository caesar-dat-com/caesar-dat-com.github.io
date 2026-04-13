import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LaunchTimeline, { TimelineEntry } from '../components/LaunchTimeline'
import HUDBracket from '../components/HUDBracket'
import StaggerText from '../components/StaggerText'

gsap.registerPlugin(ScrollTrigger)

// Animated countdown numbers — uses GSAP ScrollTrigger (compatible with Lenis)
function MissionCountdown({ label, value, suffix = '' }: { label: string; value: number; suffix?: string }) {
  const [displayed, setDisplayed] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const obj = { val: 0 }
    const tween = gsap.to(obj, {
      val: value,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 90%',
        end: 'top 60%',
        toggleActions: 'play none none reverse',
      },
      onUpdate: () => {
        setDisplayed(Math.round(obj.val))
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [value])

  return (
    <div ref={ref} className="text-center">
      <div
        className="text-4xl md:text-5xl font-bold text-orbital"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {displayed.toLocaleString()}{suffix}
      </div>
      <div
        className="text-xs uppercase tracking-[0.2em] text-text-muted mt-1"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {label}
      </div>
    </div>
  )
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="scroll-section relative min-h-screen flex items-center py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 w-full">
        <div className="mb-16 text-center gsap-reveal">
          <HUDBracket className="inline-block mb-4" size={16}>
            <span
              className="text-xs uppercase tracking-[0.3em] text-orbital"
              style={{ fontFamily: 'var(--font-mono)', padding: '0.5rem 2rem' }}
            >
              FLIGHT.LOG
            </span>
          </HUDBracket>
          <StaggerText
            text="Experiencia"
            className="text-shimmer mb-3"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 700,
            }}
          />
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.125rem',
              color: 'var(--color-text-tertiary)',
            }}
          >
            Trayectoria profesional — cuenta regresiva de lanzamiento.
          </p>
        </div>

        {/* Mission countdown stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <MissionCountdown label="Años Experiencia" value={6} suffix="+" />
          <MissionCountdown label="Usuarios Impacto" value={2000} suffix="+" />
          <MissionCountdown label="Innovación" value={1} suffix="er" />
        </div>

        <div className="mx-auto max-w-2xl gsap-reveal">
          <LaunchTimeline>
            <TimelineEntry isActive delay={0}>
              <div className="flex items-center justify-between mb-2">
                <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-lg font-semibold text-lunar">
                  Supervisor
                </h3>
                <span className="mission-badge">
                  <span className="badge-icon">🟢</span>
                  <span className="text-xs font-mono uppercase tracking-wider text-orbital">ACTIVO</span>
                </span>
              </div>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex gap-2">
                  <span className="text-orbital">▸</span>
                  <span>Supervisión de operaciones en planta, estándares de calidad, productividad y seguridad.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-orbital">▸</span>
                  <span>Asignación y seguimiento de tareas para continuidad de producción.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-orbital">▸</span>
                  <span>Reportes e indicadores con herramientas ofimáticas y sistemas internos.</span>
                </li>
              </ul>
            </TimelineEntry>

            <TimelineEntry delay={1}>
              <div className="flex items-center justify-between mb-2">
                <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-lg font-semibold text-lunar">
                  Técnico
                </h3>
                <span className="text-xs font-mono uppercase tracking-wider text-text-muted">2021–2024</span>
              </div>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex gap-2">
                  <span className="text-text-muted">▸</span>
                  <span>Soporte técnico en líneas de producción y equipos.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-text-muted">▸</span>
                  <span>Registro de incidencias mejorando trazabilidad.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-text-muted">▸</span>
                  <span>Colaboración para reducir tiempos de parada y aumentar eficiencia.</span>
                </li>
              </ul>
            </TimelineEntry>
          </LaunchTimeline>
        </div>
      </div>
    </section>
  )
}