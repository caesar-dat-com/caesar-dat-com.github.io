import { useState } from 'react'
import { CORE_SKILLS, SOFT_SKILLS } from '../data/profile'
import NotchCard from '../components/NotchCard'

export default function StackPage() {
  const [skills, setSkills] = useState<string[]>([])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Skills LinkedIn */}
      <div>
        <h3 className="text-secondary-500 font-mono tracking-wider uppercase text-sm mb-3">Skills (LinkedIn)</h3>
        <div className="flex flex-wrap gap-2">
          {skills.length > 0 ? (
            skills.map((s, i) => <span key={i} className="px-3 py-1.5 border border-primary-600/90 text-secondary-500 font-mono tracking-wider text-sm uppercase rounded-sm bg-primary-600/10">{s}</span>)
          ) : (
            <p className="text-primary-200 text-sm">Cargando skills...</p>
          )}
        </div>
        <p className="text-primary-200 text-xs mt-2">Skills base: Python, Power BI, DAX, Excel, Git, HTML/CSS</p>
      </div>

      {/* Skills clave */}
      <div>
        <h3 className="text-secondary-500 font-mono tracking-wider uppercase text-sm mb-3">Skills clave</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {CORE_SKILLS.map((s, i) => (
            <NotchCard key={i} className="cursor-default">
              <span className="text-secondary-500 font-mono tracking-wider text-sm uppercase">{s}</span>
            </NotchCard>
          ))}
        </div>
      </div>

      {/* Soft skills */}
      <div className="md:col-span-2">
        <h3 className="text-secondary-500 font-mono tracking-wider uppercase text-sm mb-3">Soft skills & idiomas</h3>
        <NotchCard className="mb-4">
          <p className="text-primary-200 text-sm leading-relaxed">
            {SOFT_SKILLS.join(' · ')}
          </p>
        </NotchCard>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <NotchCard>
            <h4 className="text-secondary-500 font-mono tracking-wider uppercase text-xs mb-2">Español</h4>
            <p className="text-primary-200 text-sm">Nativo</p>
          </NotchCard>
          <NotchCard>
            <h4 className="text-secondary-500 font-mono tracking-wider uppercase text-xs mb-2">Inglés</h4>
            <p className="text-primary-200 text-sm">Intermedio (B1–B2)</p>
          </NotchCard>
        </div>
      </div>
    </div>
  )
}
