import NotchCard from '../components/NotchCard'

export default function ProjectsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-secondary-500 font-mono tracking-wider uppercase text-lg">Proyectos</h2>
        <span className="text-primary-200 text-sm">Construcción de soluciones útiles y medibles.</span>
      </div>

      <NotchCard>
        <h4 className="text-secondary-500 font-mono tracking-wider uppercase text-sm mb-2">Aplicativo low-code nacional</h4>
        <p className="text-primary-200 text-sm mb-3">Control de personal y tareas de Mantenimiento · <span className="border border-tertiary-500 text-tertiary-500 font-mono tracking-wider px-2 py-0.5 text-xs uppercase rounded-sm">~1300 usuarios</span></p>
        <ul className="list-disc pl-5 space-y-1 text-primary-200 text-sm">
          <li>Diseño e implementación para control de personal, asignación y seguimiento.</li>
          <li>Centralización de procesos manuales en flujo digital trazable.</li>
        </ul>
      </NotchCard>

      <NotchCard>
        <h4 className="text-secondary-500 font-mono tracking-wider uppercase text-sm mb-2">Rally Latinoamericano de Innovación</h4>
        <p className="text-primary-200 text-sm mb-3">1er lugar · Categoría Innovación (UAO)</p>
        <ul className="list-disc pl-5 space-y-1 text-primary-200 text-sm">
          <li>Integrante del equipo ganador con solución a reto real en tiempo limitado.</li>
        </ul>
      </NotchCard>

      <NotchCard>
        <h4 className="text-secondary-500 font-mono tracking-wider uppercase text-sm mb-2">Platzi Space Program</h4>
        <p className="text-primary-200 text-sm">Programa intensivo · Satélite</p>
        <ul className="list-disc pl-5 space-y-1 text-primary-200 text-sm">
          <li>Refuerzo de fundamentos de ingeniería, trabajo en equipo y pensamiento sistémico.</li>
        </ul>
      </NotchCard>
    </div>
  )
}
