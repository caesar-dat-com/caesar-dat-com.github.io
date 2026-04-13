import MissionPatch from '../components/MissionPatch'
import HUDBracket from '../components/HUDBracket'
import StaggerText from '../components/StaggerText'

export default function ProjectsSection() {
  return (
    <section id="projects" className="scroll-section relative min-h-screen flex items-center py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 w-full">
        <div className="mb-16 text-center gsap-reveal">
          <HUDBracket className="inline-block mb-4" size={16}>
            <span
              className="text-xs uppercase tracking-[0.3em] text-orbital"
              style={{ fontFamily: 'var(--font-mono)', padding: '0.5rem 2rem' }}
            >
              MISSION.LOG
            </span>
          </HUDBracket>
          <StaggerText
            text="Proyectos"
            className="text-shimmer mb-3"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 700,
            }}
          />
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.125rem',
              color: 'var(--color-text-tertiary)',
            }}
          >
            Cada proyecto es una misión. Cada misión, un resultado.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          <div className="gsap-reveal">
            <MissionPatch missionId="MISIÓN-001" status="active" className="h-full">
              <div className="text-4xl mb-4">🛰️</div>
              <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-xl font-semibold text-lunar mb-2">
                Aplicativo Low-Code Nacional
              </h3>
              <p className="text-text-tertiary text-sm mb-3" style={{ fontFamily: 'var(--font-mono)' }}>
                Control de personal y tareas de Mantenimiento
              </p>
              <div className="mb-4 inline-block rounded-full bg-orbital/10 px-3 py-1 text-sm font-bold text-orbital">
                ~2,000 usuarios
              </div>
              <ul className="space-y-2 text-text-secondary text-sm text-left">
                <li className="flex gap-2">
                  <span className="text-orbital">▸</span>
                  <span>Diseño e implementación para control de personal, asignación y seguimiento.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-orbital">▸</span>
                  <span>Centralización de procesos manuales en flujo digital trazable.</span>
                </li>
              </ul>
            </MissionPatch>
          </div>

          <div className="gsap-reveal">
            <MissionPatch missionId="MISIÓN-002" status="complete" className="h-full">
              <div className="text-4xl mb-4">🏆</div>
              <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-xl font-semibold text-lunar mb-2">
                Rally Latinoamericano de Innovación
              </h3>
              <p className="text-text-tertiary text-sm mb-3" style={{ fontFamily: 'var(--font-mono)' }}>
                1er lugar · Categoría Innovación (UAO)
              </p>
              <ul className="space-y-2 text-text-secondary text-sm text-left">
                <li className="flex gap-2">
                  <span className="text-sls">▸</span>
                  <span>Integrante del equipo ganador con solución a reto real en tiempo limitado.</span>
                </li>
              </ul>
            </MissionPatch>
          </div>

          <div className="md:col-span-2 gsap-reveal">
            <MissionPatch missionId="MISIÓN-003" status="training">
              <div className="text-4xl mb-4">🚀</div>
              <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-xl font-semibold text-lunar mb-2">
                Platzi Space Program
              </h3>
              <p className="text-text-tertiary text-sm mb-3" style={{ fontFamily: 'var(--font-mono)' }}>
                Programa intensivo · Satélite
              </p>
              <ul className="space-y-2 text-text-secondary text-sm text-left">
                <li className="flex gap-2">
                  <span className="text-text-muted">▸</span>
                  <span>Refuerzo de fundamentos de ingeniería, trabajo en equipo y pensamiento sistémico.</span>
                </li>
              </ul>
            </MissionPatch>
          </div>
        </div>
      </div>
    </section>
  )
}