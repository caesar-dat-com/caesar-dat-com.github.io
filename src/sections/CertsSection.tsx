import { useState, useEffect } from 'react'
import GlassCard from '../components/GlassCard'
import HUDBracket from '../components/HUDBracket'
import StaggerText from '../components/StaggerText'

export default function CertsSection() {
  const [certs, setCerts] = useState<Array<{ name: string; authority: string; url?: string; timePeriod?: { startDate?: { month: number; year: number } } }>>([])

  useEffect(() => {
    fetch('/data/linkedin-data.json')
      .then(r => r.ok ? r.json() : null)
      .then((d: any) => { if (d?.certifications) setCerts(d.certifications) })
      .catch(() => {})
  }, [])

  return (
    <section id="certs" className="scroll-section relative min-h-screen flex items-center py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 w-full">
        <div className="mb-16 text-center gsap-reveal">
          <HUDBracket className="inline-block mb-4" size={16}>
            <span
              className="text-xs uppercase tracking-[0.3em] text-orbital"
              style={{ fontFamily: 'var(--font-mono)', padding: '0.5rem 2rem' }}
            >
              MISSION.BADGE
            </span>
          </HUDBracket>
          <StaggerText
            text="Certificaciones"
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
            Mission badges — validación de habilidades y formación continua.
          </p>
        </div>

        <div className="mx-auto max-w-2xl space-y-4">
          {certs.length > 0 ? certs.map((c, i: number) => (
            <div key={i} className="gsap-reveal">
              <div className="mission-badge group cursor-default">
                <span className="badge-icon">🏅</span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary group-hover:text-orbital transition-colors">
                    {c.name}
                  </div>
                  <div className="text-xs text-text-tertiary" style={{ fontFamily: 'var(--font-mono)' }}>
                    {c.authority}
                    {c.timePeriod?.startDate && (
                      <> · {c.timePeriod.startDate.month}/{c.timePeriod.startDate.year}</>
                    )}
                  </div>
                </div>
                {c.url && (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-orbital hover:text-orbital-hover transition-colors"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    Ver →
                  </a>
                )}
              </div>
            </div>
          )) : (
            <p className="text-text-muted text-center py-8 gsap-reveal">Cargando certificaciones...</p>
          )}

          <div className="gsap-reveal">
            <GlassCard className="mt-6">
              <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-lg font-semibold text-sls mb-3">
                Formación adicional
              </h3>
              <p className="text-text-secondary text-sm mb-3">
                39 certificaciones validadas en Power BI, DAX, SQL, Python, Docker, Airflow, Spark, Git, React, Node.js.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Docker', 'SQL', 'Git', 'Kubernetes', 'Apache Airflow', 'Apache Spark', 'Machine Learning', 'Computer Vision', 'NLP', 'ETL', 'Big Data', 'React', 'TypeScript', 'Node.js', 'PowerShell', 'Power BI', 'DAX', 'Ingeniería de datos', 'POO'].map(s => (
                  <span key={s} className="skill-orbit">
                    {s}
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