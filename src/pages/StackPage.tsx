import { useEffect, useState } from 'react'
import { CORE_SKILLS, SOFT_SKILLS } from '../data/profile'
import GlassCard from '../components/GlassCard'
import NeonText from '../components/NeonText'

export default function StackPage() {
  const [skills, setSkills] = useState<string[]>([])

  useEffect(() => {
    fetch('/data/linkedin-data.json')
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.skills) setSkills(d.skills.map((s: { name: string }) => s.name)) })
      .catch(() => {})
  }, [])

  return (
    <div className="space-y-6">
      {/* LinkedIn Skills */}
      <div className="animate-fade-up">
        <NeonText as="h3" color="cyan" className="text-sm mb-3">Skills (LinkedIn)</NeonText>
        <div className="flex flex-wrap gap-2">
          {skills.length > 0 ? skills.map((s, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-lg border border-secondary-500/12 bg-secondary-500/5
                         text-primary-300 font-mono tracking-wider text-sm uppercase
                         backdrop-blur-sm transition-all duration-300
                         hover:border-secondary-500/25 hover:bg-secondary-500/10
                         hover:shadow-[0_0_12px_rgba(0,240,255,0.08)] hover:-translate-y-0.5"
            >
              {s}
            </span>
          )) : (
            <p className="text-primary-200 text-sm">Cargando skills...</p>
          )}
        </div>
      </div>

      <div className="separator" />

      {/* Core Skills Grid */}
      <div className="animate-fade-up stagger-1">
        <NeonText as="h3" color="lunar" className="text-sm mb-3">Skills clave</NeonText>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {CORE_SKILLS.map((s, i) => (
            <GlassCard key={i} className="!p-0">
              <div className="px-3 py-2.5 text-center">
                <span className="text-secondary-500 font-mono tracking-wider text-xs uppercase">
                  {s}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="separator" />

      {/* Soft Skills & Languages */}
      <div className="animate-fade-up stagger-2">
        <NeonText as="h3" color="cyan" className="text-sm mb-3">Soft skills & idiomas</NeonText>
        <GlassCard glow="lunar" className="mb-4">
          <p className="text-primary-300 text-sm leading-relaxed">
            {SOFT_SKILLS.join(' · ')}
          </p>
        </GlassCard>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <GlassCard>
            <NeonText as="h4" color="lunar" className="text-xs mb-1">Español</NeonText>
            <p className="text-primary-300 text-sm">Nativo</p>
          </GlassCard>
          <GlassCard>
            <NeonText as="h4" color="lunar" className="text-xs mb-1">Inglés</NeonText>
            <p className="text-primary-300 text-sm">Intermedio (B1–B2)</p>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}