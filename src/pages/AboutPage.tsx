import { useEffect, useState } from 'react'
import { LINKS, defaultSummary } from '../data/profile'
import GlassCard from '../components/GlassCard'
import NeonText from '../components/NeonText'

export default function AboutPage() {
  const [profile, setProfile] = useState<{
    firstName: string; lastName: string; headline: string; location: string; summary: string
  } | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/data/linkedin-data.json')
        if (res.ok) {
          const data = await res.json()
          setProfile({
            firstName: data.firstName || 'César',
            lastName: data.lastName || 'Reyes',
            headline: data.headline || 'Data · IA · Automatización',
            location: data.location || 'Cali, Colombia',
            summary: data.summary || defaultSummary,
          })
        }
      } catch {
        setProfile({
          firstName: 'César', lastName: 'Reyes',
          headline: 'Data · IA · Automatización',
          location: 'Cali, Colombia', summary: defaultSummary,
        })
      }
    }
    load()
  }, [])

  const p = profile || {
    firstName: 'César', lastName: 'Reyes',
    headline: 'Data · IA · Automatización',
    location: 'Cali, Colombia', summary: defaultSummary,
  }

  return (
    <div className="space-y-5">
      {/* Hero section */}
      <div className="animate-fade-up">
        <NeonText as="h1" color="cyan" className="text-4xl font-bold tracking-widest">
          {p.firstName} {p.lastName}
        </NeonText>
        <p className="text-primary-300 mt-2 text-lg">{p.headline}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-secondary-500/15 bg-secondary-500/5 text-primary-300 text-sm backdrop-blur-sm">
            💼 {p.headline}
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-lunar-200/30 bg-lunar-100/50 text-primary-300 text-sm backdrop-blur-sm">
            📍 {p.location}
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-tertiary-500/15 bg-tertiary-500/5 text-primary-300 text-sm backdrop-blur-sm">
            ⚡ Automatización · Datos · IA
          </span>
        </div>
      </div>

      <div className="separator" />

      {/* Summary */}
      <p className="text-primary-300 text-lg leading-relaxed animate-fade-up stagger-1">
        {p.summary}
      </p>

      <div className="separator" />

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-up stagger-2">
        <GlassCard glow="cyan">
          <NeonText as="h4" color="cyan" className="text-sm mb-2">Enfoque actual</NeonText>
          <p className="text-primary-300 text-sm leading-relaxed">
            Ingeniería en Datos e IA (UAO) + automatización de procesos y mejora continua (experiencia industrial).
          </p>
        </GlassCard>
        <GlassCard glow="lunar">
          <NeonText as="h4" color="lunar" className="text-sm mb-2">Highlights</NeonText>
          <ul className="list-disc pl-4 text-primary-300 text-sm space-y-1">
            <li>Implementé un aplicativo low-code (~1300 usuarios).</li>
            <li>1er lugar Rally Latinoamericano de Innovación (UAO).</li>
            <li>Ruta BI/Analytics (Power BI, DAX, Tableau, Looker, Excel).</li>
          </ul>
        </GlassCard>
      </div>

      {/* Mission statement — Artemis reference */}
      <GlassCard className="animate-fade-up stagger-3">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🌙</span>
          <div>
            <NeonText as="h4" color="lunar" className="text-sm mb-1">Filosofía</NeonText>
            <p className="text-primary-300 text-sm leading-relaxed">
              Como Artemis 2 — la primera misión tripulada a la Luna en más de 50 años —
              creo que la tecnología debe llevarnos más allá de lo que creemos posible.
              Automatizo para que las personas se enfoquen en lo que importa.
              Construyo sistemas que funcionan, no que impresionan.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Links */}
      <div className="flex flex-wrap gap-3 animate-fade-up stagger-4">
        {Object.entries(LINKS).map(([key, url]) => (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg border border-secondary-500/10 bg-secondary-500/5 text-primary-300 text-sm
                       backdrop-blur-sm transition-all duration-300
                       hover:border-secondary-500/25 hover:bg-secondary-500/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)]
                       hover:-translate-y-0.5"
          >
            {key === 'linkedin' ? '💼 LinkedIn' :
             key === 'github' ? '⚡ GitHub' :
             key === 'instagram' ? '📸 Instagram' :
             key === 'spotify' ? '🎵 Spotify' : key}
          </a>
        ))}
      </div>
    </div>
  )
}