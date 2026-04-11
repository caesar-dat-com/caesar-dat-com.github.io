import GlassCard from '../components/GlassCard'
import NeonText from '../components/NeonText'

export default function ExperiencePage() {
  return (
    <div className="space-y-5">
      <div className="animate-fade-up">
        <NeonText as="h2" color="cyan" className="text-lg">Experiencia</NeonText>
        <p className="text-primary-300 text-sm mt-1">Rol actual y trayectoria en planta.</p>
      </div>

      {/* Timeline */}
      <div className="relative pl-6">
        {/* Timeline line */}
        <div className="absolute left-2 top-3 bottom-3 w-px bg-gradient-to-b from-secondary-500/30 via-lunar-200/15 to-transparent" />

        {/* Current role */}
        <div className="relative mb-6 animate-fade-up stagger-1">
          {/* Timeline dot */}
          <div className="absolute -left-4 top-2 w-2.5 h-2.5 rounded-full bg-secondary-500 shadow-[0_0_8px_rgba(0,240,255,0.4)]" />

          <GlassCard glow="cyan">
            <div className="flex items-center justify-between mb-2">
              <NeonText as="h4" color="cyan" className="text-sm">Supervisor</NeonText>
              <span className="px-2 py-0.5 rounded-md border border-secondary-500/20 bg-secondary-500/8 text-secondary-500 font-mono tracking-wider text-xs uppercase animate-glow-border">
                Actual
              </span>
            </div>
            <p className="text-primary-300 text-sm mb-3">Postobón S.A. · Cali, Colombia</p>
            <ul className="list-disc pl-5 space-y-1 text-primary-300 text-sm">
              <li>Supervisión de operaciones en planta, estándares de calidad, productividad y seguridad.</li>
              <li>Asignación y seguimiento de tareas para continuidad de producción.</li>
              <li>Reportes e indicadores con herramientas ofimáticas y sistemas internos.</li>
              <li>Trabajo con Mantenimiento para reportar incidentes y proponer mejoras.</li>
            </ul>
          </GlassCard>
        </div>

        {/* Previous role */}
        <div className="relative animate-fade-up stagger-2">
          {/* Timeline dot */}
          <div className="absolute -left-4 top-2 w-2.5 h-2.5 rounded-full bg-lunar-400/50" />

          <GlassCard glow="lunar">
            <div className="flex items-center justify-between mb-2">
              <NeonText as="h4" color="lunar" className="text-sm">Técnico</NeonText>
              <span className="px-2 py-0.5 rounded-md border border-primary-600/30 bg-primary-600/10 text-primary-300 font-mono tracking-wider text-xs uppercase">
                2022–2024
              </span>
            </div>
            <p className="text-primary-300 text-sm mb-3">Postobón S.A. · Cali, Colombia</p>
            <ul className="list-disc pl-5 space-y-1 text-primary-300 text-sm">
              <li>Soporte técnico en líneas de producción y equipos.</li>
              <li>Registro de incidencias/intervenciones mejorando trazabilidad.</li>
              <li>Colaboración para reducir tiempos de parada y aumentar eficiencia.</li>
            </ul>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}