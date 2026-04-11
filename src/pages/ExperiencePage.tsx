import NotchCard from '../components/NotchCard'

export default function ExperiencePage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-secondary-500 font-mono tracking-wider uppercase text-lg">Experiencia</h2>
        <span className="text-primary-200 text-sm">Rol actual y trayectoria en planta.</span>
      </div>

      <NotchCard>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-secondary-500 font-mono tracking-wider uppercase text-sm">Supervisor</h4>
          <span className="border border-tertiary-500 text-tertiary-500 font-mono tracking-wider px-2 py-0.5 text-xs uppercase rounded-sm">Actual</span>
        </div>
        <p className="text-primary-200 text-sm mb-3">Postobón S.A. · Cali, Colombia</p>
        <ul className="list-disc pl-5 space-y-1 text-primary-200 text-sm">
          <li>Supervisión de operaciones en planta, estándares de calidad, productividad y seguridad.</li>
          <li>Asignación y seguimiento de tareas para continuidad de producción.</li>
          <li>Reportes e indicadores con herramientas ofimáticas y sistemas internos.</li>
          <li>Trabajo con Mantenimiento para reportar incidentes y proponer mejoras.</li>
        </ul>
      </NotchCard>

      <NotchCard>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-secondary-500 font-mono tracking-wider uppercase text-sm">Técnico</h4>
          <span className="border border-primary-600/90 text-primary-200 font-mono tracking-wider px-2 py-0.5 text-xs uppercase rounded-sm">2022–2024</span>
        </div>
        <p className="text-primary-200 text-sm mb-3">Postobón S.A. · Cali, Colombia</p>
        <ul className="list-disc pl-5 space-y-1 text-primary-200 text-sm">
          <li>Soporte técnico en líneas de producción y equipos.</li>
          <li>Registro de incidencias/intervenciones mejorando trazabilidad.</li>
          <li>Colaboración para reducir tiempos de parada y aumentar eficiencia.</li>
        </ul>
      </NotchCard>
    </div>
  )
}
