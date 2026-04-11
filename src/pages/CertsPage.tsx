import { useState, useEffect } from 'react'
import GlassCard from '../components/GlassCard'
import NeonText from '../components/NeonText'

export default function CertsPage() {
  const [certs, setCerts] = useState<any[]>([])

  useEffect(() => {
    fetch('/data/linkedin-data.json')
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.certifications) setCerts(d.certifications) })
      .catch(() => {})
  }, [])

  return (
    <div className="space-y-5">
      <div className="animate-fade-up">
        <NeonText as="h2" color="cyan" className="text-lg">Certificaciones</NeonText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* LinkedIn certs */}
        <div className="animate-fade-up stagger-1">
          <NeonText as="h3" color="lunar" className="text-sm mb-3">LinkedIn</NeonText>
          <div className="space-y-2">
            {certs.length > 0 ? certs.map((c: any, i: number) => (
              <GlassCard key={i}>
                <div className="flex items-center justify-between mb-1">
                  <NeonText as="h4" color="lunar" className="text-xs">{c.name}</NeonText>
                  {c.url && (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 rounded-md border border-secondary-500/15 bg-secondary-500/5
                                 text-secondary-500 font-mono text-xs uppercase transition-all duration-300
                                 hover:border-secondary-500/30 hover:bg-secondary-500/10"
                    >
                      Ver
                    </a>
                  )}
                </div>
                <p className="text-primary-300 text-xs">{c.authority}</p>
                <p className="text-primary-200 text-xs mt-0.5">
                  {c.timePeriod?.startDate?.month && c.timePeriod?.startDate?.year
                    ? `${c.timePeriod.startDate.month}/${c.timePeriod.startDate.year}`
                    : '—'}
                </p>
              </GlassCard>
            )) : (
              <p className="text-primary-200 text-sm">Cargando certificaciones...</p>
            )}
          </div>
        </div>

        {/* Additional training */}
        <div className="animate-fade-up stagger-2">
          <NeonText as="h3" color="cyan" className="text-sm mb-3">Formación adicional</NeonText>
          <GlassCard glow="lunar">
            <p className="text-primary-300 text-sm leading-relaxed mb-3">
              Más de 18 cursos completados como parte de una ruta integral en Análisis de Datos y Business Intelligence:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['Power BI', 'DAX', 'Tableau', 'Looker Studio', 'Excel', 'Forecasting',
                'Storytelling', 'Estadística', 'Python', 'Git'].map(s => (
                <span
                  key={s}
                  className="px-2 py-1 rounded-md border border-secondary-500/10 bg-secondary-500/4
                             text-primary-300 font-mono text-xs uppercase
                             transition-all duration-300 hover:border-secondary-500/20"
                >
                  {s}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}