import GlassCard from '../components/GlassCard'
import NeonText from '../components/NeonText'

export default function ProjectsPage() {
  return (
    <div className="space-y-5">
      <div className="animate-fade-up">
        <NeonText as="h2" color="cyan" className="text-lg">Proyectos</NeonText>
        <p className="text-primary-300 text-sm mt-1">Construcción de soluciones útiles y medibles.</p>
      </div>

      <GlassCard glow="cyan" className="animate-fade-up stagger-1">
        <NeonText as="h4" color="cyan" className="text-sm mb-2">Aplicativo low-code nacional</NeonText>
        <p className="text-primary-300 text-sm mb-3">
          Control de personal y tareas de Mantenimiento ·{' '}
          <span className="px-2 py-0.5 rounded-md border border-tertiary-500/20 bg-tertiary-500/8 text-tertiary-500 font-mono tracking-wider text-xs uppercase">
            ~1300 usuarios
          </span>
        </p>
        <ul className="list-disc pl-5 space-y-1 text-primary-300 text-sm">
          <li>Diseño e implementación para control de personal, asignación y seguimiento.</li>
          <li>Centralización de procesos manuales en flujo digital trazable.</li>
        </ul>
      </GlassCard>

      <GlassCard glow="lunar" className="animate-fade-up stagger-2">
        <div className="flex items-center gap-3 mb-2">
          <NeonText as="h4" color="lunar" className="text-sm">Rally Latinoamericano de Innovación</NeonText>
          <span className="px-2 py-0.5 rounded-md border border-tertiary-500/20 bg-tertiary-500/8 text-tertiary-500 font-mono tracking-wider text-xs uppercase">
            🏆 1er lugar
          </span>
        </div>
        <p className="text-primary-300 text-sm mb-2">Categoría Innovación (UAO)</p>
        <ul className="list-disc pl-5 space-y-1 text-primary-300 text-sm">
          <li>Integrante del equipo ganador con solución a reto real en tiempo limitado.</li>
        </ul>
      </GlassCard>

      <GlassCard className="animate-fade-up stagger-3">
        <NeonText as="h4" color="lunar" className="text-sm mb-2">Platzi Space Program</NeonText>
        <p className="text-primary-300 text-sm mb-2">Programa intensivo · Satélite</p>
        <ul className="list-disc pl-5 space-y-1 text-primary-300 text-sm">
          <li>Refuerzo de fundamentos de ingeniería, trabajo en equipo y pensamiento sistémico.</li>
        </ul>
      </GlassCard>
    </div>
  )
}