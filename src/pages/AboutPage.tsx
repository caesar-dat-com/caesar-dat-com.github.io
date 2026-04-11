import { useEffect, useState } from 'react'
import { LINKS, defaultSummary } from '../data/profile'
import NotchCard from '../components/NotchCard'

export default function AboutPage() {
  const [profile, setProfile] = useState<{ firstName: string; lastName: string; headline: string; location: string; summary: string } | null>(null)

  useEffect(() => {
    // Cargar datos de LinkedIn
    const load = async () => {
      try {
        const res = await fetch('/data/linkedin-data.json')
        if (res.ok) {
          const data = await res.json()
          setProfile({
            firstName: data.firstName || 'César',
            lastName: data.lastName || 'Reyes',
            headline: data.headline || 'Data · IA · Automatización',
            location: data.location || 'Cali, Valle del Cauca',
            summary: data.summary || defaultSummary,
          })
        }
      } catch {
        setProfile({
          firstName: 'César',
          lastName: 'Reyes',
          headline: 'Data · IA · Automatización',
          location: 'Cali, Valle del Cauca',
          summary: defaultSummary,
        })
      }
    }
    load()
  }, [])

  const p = profile || { firstName: 'César', lastName: 'Reyes', headline: 'Data · IA · Automatización', location: 'Cali, Valle del Cauca', summary: defaultSummary }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-mono text-secondary-500 tracking-wider uppercase shadow-[0_0_18px_currentColor]">{p.firstName} {p.lastName}</h1>
        <p className="text-primary-200 mt-2">{p.headline}</p>
        <div className="mt-3 space-x-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 border border-primary-600/90 bg-primary-600/10 text-primary-200 rounded-sm">
            💼 <strong>{p.headline}</strong>
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1 border border-primary-600/90 bg-primary-600/10 text-primary-200 rounded-sm">
            📍 <strong>{p.location}</strong>
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1 border border-primary-600/90 bg-primary-600/10 text-primary-200 rounded-sm">
            ⚡ <strong>Automatización · Datos · IA</strong>
          </span>
        </div>
      </div>

      <hr className="border-primary-500/35 shadow-[0_0_10px_rgba(232,97,90,0.35)] my-4 opacity-80" />

      <p className="text-primary-200 text-lg leading-relaxed">{p.summary}</p>

      <hr className="border-primary-500/35 shadow-[0_0_10px_rgba(232,97,90,0.35)] my-4 opacity-80" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <NotchCard>
          <h4 className="text-secondary-500 font-mono tracking-wider uppercase text-sm mb-1">Enfoque actual</h4>
          <p className="text-primary-200 text-sm leading-relaxed">
            Ingeniería en Datos e IA (UAO) + automatización de procesos y mejora continua (experiencia industrial).
          </p>
        </NotchCard>
        <NotchCard>
          <h4 className="text-secondary-500 font-mono tracking-wider uppercase text-sm mb-1">Highlights</h4>
          <ul className="list-disc pl-4 text-primary-200 text-sm space-y-1">
            <li>Implementé un aplicativo low-code (~1300 usuarios).</li>
            <li>1er lugar Rally Latinoamericano de Innovación (UAO).</li>
            <li>Ruta BI/Analytics (Power BI, DAX, Tableau, Looker, Excel).</li>
          </ul>
        </NotchCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <NotchCard>
          <h4 className="text-secondary-500 font-mono tracking-wider uppercase text-sm mb-1">Contacto</h4>
          <p className="text-primary-200 text-sm">
            Email: <a href={`mailto:cesar.cesarreyes25@gmail.com`} className="text-secondary-500 hover:text-primary-200 underline">cesar.cesarreyes25@gmail.com</a>
          </p>
        </NotchCard>
        <NotchCard>
          <h4 className="text-secondary-500 font-mono tracking-wider uppercase text-sm mb-1">Redes</h4>
          <div className="flex gap-2 flex-wrap">
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="text-secondary-500 text-sm hover:text-primary-200 underline">LinkedIn</a>
            <a href={LINKS.github} target="_blank" rel="noreferrer" className="text-secondary-500 text-sm hover:text-primary-200 underline">GitHub</a>
            <a href={LINKS.instagram} target="_blank" rel="noreferrer" className="text-secondary-500 text-sm hover:text-primary-200 underline">Instagram</a>
            <a href={LINKS.spotify} target="_blank" rel="noreferrer" className="text-secondary-500 text-sm hover:text-primary-200 underline">Spotify</a>
          </div>
        </NotchCard>
      </div>
    </div>
  )
}
