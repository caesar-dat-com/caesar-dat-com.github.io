import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CORE_SKILLS, SOFT_SKILLS } from '../data/profile'
import GlassCard from '../components/GlassCard'
import HUDBracket from '../components/HUDBracket'
import StaggerText from '../components/StaggerText'
import IconBadge from '../components/IconBadge'
import { Zap, Satellite, Target } from '../components/icons'

gsap.registerPlugin(ScrollTrigger)

export default function StackSection() {
  const [skills, setSkills] = useState<string[]>([])

  useEffect(() => {
    fetch('/data/linkedin-data.json')
      .then(r => r.ok ? r.json() : null)
      .then((d: any) => { if (d?.skills) setSkills(d.skills.map((s: { name: string }) => s.name)) })
      .catch(() => {})
  }, [])

  return (
    <section id="stack" className="scroll-section relative min-h-screen flex items-center py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 w-full">
        <div className="mb-16 text-center gsap-reveal">
          <HUDBracket className="section-badge inline-block mb-4" size={16}>
            <span
              className="text-xs uppercase tracking-[0.3em] text-orbital"
              style={{ fontFamily: 'var(--font-mono)', padding: '0.5rem 2rem' }}
            >
              SYS.STACK
            </span>
          </HUDBracket>
          <StaggerText
            text="Stack"
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
            Tecnologías y herramientas que uso para construir.
          </p>
          <div className="section-rule mx-auto mt-8 max-w-[220px]" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="gsap-reveal">
            <GlassCard glow>
              <h3 style={{ fontFamily: 'var(--font-heading)' }} className="mb-4 flex items-center gap-3 text-lg font-semibold text-orbital">
                <IconBadge icon={Zap} variant="orbital" boxSize={34} size={17} />
                Skills Clave
              </h3>
              <div className="flex flex-wrap gap-2">
                {CORE_SKILLS.map((skill, i) => (
                  <span key={i} className={`skill-orbit ${i < 5 ? 'core' : ''}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>

          <div className="gsap-reveal">
            <GlassCard glow>
              <h3 style={{ fontFamily: 'var(--font-heading)' }} className="mb-4 flex items-center gap-3 text-lg font-semibold text-text-secondary">
                <IconBadge icon={Satellite} variant="muted" boxSize={34} size={17} />
                LinkedIn Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.length > 0 ? skills.map((s, i) => (
                  <span key={i} className="skill-orbit">
                    {s}
                  </span>
                )) : (
                  <span className="text-text-muted">Cargando...</span>
                )}
              </div>
            </GlassCard>
          </div>

          <div className="md:col-span-2 gsap-reveal">
            <GlassCard>
              <h3 style={{ fontFamily: 'var(--font-heading)' }} className="mb-4 flex items-center gap-3 text-lg font-semibold text-sls">
                <IconBadge icon={Target} variant="sls" boxSize={34} size={17} />
                Soft Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {SOFT_SKILLS.map((skill, i) => (
                  <span
                    key={i}
                    className="soft-skill-tag rounded-full border border-sls/30 bg-sls/5 px-4 py-2 text-sm text-text-secondary transition-colors hover:border-sls hover:text-sls"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  )
}