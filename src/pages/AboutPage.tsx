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
    <div className="space-y-6">
      {/* Hero — Apple clean, big name */}
      <div className="animate-spring-in">
        <h1 className="text-4xl font-bold tracking-tight text-primary-500">
          {p.firstName} <span className="text-secondary-500">{p.lastName}</span>
        </h1>
        <p className="text-primary-300 mt-2 text-lg tracking-wide">{p.headline}</p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-secondary-500/10 bg-secondary-500/5 text-primary-300 text-sm backdrop-blur-sm transition-all duration-300 hover:bg-secondary-500/10 hover:-translate-y-0.5">
            💼 {p.headline}
          </span>
          <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-lunar-200/30 bg-lunar-100/50 text-primary-300 text-sm backdrop-blur-sm transition-all duration-300 hover:bg-lunar-200/15 hover:-translate-y-0.5">
            📍 {p.location}
          </span>
          <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-tertiary-500/10 bg-tertiary-500/4 text-primary-300 text-sm backdrop-blur-sm transition-all duration-300 hover:bg-tertiary-500/8 hover:-translate-y-0.5">
            ⚡ Automatización · Datos · IA
          </span>
        </div>
      </div>

      <div className="separator" />

      {/* Summary — Apple clean typography */}
      <p className="text-primary-300 text-lg leading-relaxed animate-fade-up stagger-1">
        {p.summary}
      </p>

      <div className="separator" />

      {/* Info cards — Liquid Glass */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-spring-in stagger-2">
        <GlassCard glow="blue">
          <NeonText as="h4" color="blue" className="text-sm mb-2">Enfoque actual</NeonText>
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

      {/* Mission — Apple inspirational */}
      <GlassCard className="animate-spring-in stagger-3">
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

      {/* Links — Apple pill buttons */}
      <div className="flex flex-wrap gap-3 animate-fade-up stagger-4">
        {Object.entries(LINKS).map(([key, url]) => (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl border border-primary-600/10 bg-bg-300/80 text-primary-300 text-sm font-medium
                       backdrop-blur-sm transition-all duration-300
                       hover:border-secondary-500/20 hover:bg-secondary-500/5 hover:text-secondary-500
                       hover:shadow-[0_4px_16px_rgba(0,113,227,0.08)]
                       hover:-translate-y-0.5 active:scale-[0.98]"
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