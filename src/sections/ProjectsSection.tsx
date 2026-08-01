import MissionPatch from '../components/MissionPatch'
import HUDBracket from '../components/HUDBracket'
import StaggerText from '../components/StaggerText'
import IconBadge from '../components/IconBadge'
import { Satellite, Trophy, Rocket, BrainCircuit, Settings2, ChartNoAxesCombined } from '../components/icons'

export default function ProjectsSection() {
  return (
    <section id="projects" className="scroll-section relative min-h-screen flex items-center py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 w-full">
        <div className="mb-16 text-center gsap-reveal">
          <HUDBracket className="section-badge inline-block mb-4" size={16}>
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
          <div className="section-rule mx-auto mt-8 max-w-[220px]" />
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          <div className="gsap-reveal">
            <MissionPatch missionId="MISIÓN-001" status="active" className="h-full">
              <IconBadge icon={Satellite} variant="orbital" shape="squircle" boxSize={54} size={26} orbit className="mb-5 mx-auto" />
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
              <IconBadge icon={Trophy} variant="sls" shape="squircle" boxSize={54} size={26} orbit className="mb-5 mx-auto" />
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
              <IconBadge icon={Rocket} variant="orbital" shape="squircle" boxSize={54} size={26} orbit className="mb-5 mx-auto" />
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

          <div className="gsap-reveal">
            <MissionPatch missionId="MISIÓN-004" status="complete" className="h-full">
              <IconBadge icon={BrainCircuit} variant="orbital" shape="squircle" boxSize={54} size={26} orbit className="mb-5 mx-auto" />
              <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-xl font-semibold text-lunar mb-2">
                Nyou — Plataforma SaaS para Clínicas Psicológicas
              </h3>
              <p className="text-text-tertiary text-sm mb-3" style={{ fontFamily: 'var(--font-mono)' }}>
                Plataforma SaaS · Gestión clínica
              </p>
              <ul className="space-y-2 text-text-secondary text-sm text-left">
                <li className="flex gap-2">
                  <span className="text-sls">▸</span>
                  <span>Diseño y desarrollo de plataforma para gestión de citas, historias clínicas y seguimiento de pacientes en clínicas psicológicas.</span>
                </li>
              </ul>
              <p className="mt-3 text-xs text-text-muted" style={{ fontFamily: 'var(--font-mono)' }}>UAO, ene. 2024</p>
            </MissionPatch>
          </div>

          <div className="gsap-reveal">
            <MissionPatch missionId="MISIÓN-005" status="active" className="h-full">
              <IconBadge icon={Settings2} variant="sls" shape="squircle" boxSize={54} size={26} orbit className="mb-5 mx-auto" />
              <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-xl font-semibold text-lunar mb-2">
                Torque (Troqu3) — Gestión de Mantenimiento Industrial
              </h3>
              <p className="text-text-tertiary text-sm mb-3" style={{ fontFamily: 'var(--font-mono)' }}>
                SaaS · Control de mantenimiento industrial
              </p>
              <div className="mb-4 inline-block rounded-full bg-orbital/10 px-3 py-1 text-sm font-bold text-orbital">
                En producción · POSTOBON
              </div>
              <ul className="space-y-2 text-text-secondary text-sm text-left">
                <li className="flex gap-2">
                  <span className="text-orbital">▸</span>
                  <span>Sistema de gestión de mantenimiento industrial para control de personal, asignación de tareas y seguimiento en planta.</span>
                </li>
              </ul>
            </MissionPatch>
          </div>

          <div className="gsap-reveal">
            <MissionPatch missionId="MISIÓN-006" status="training" className="h-full">
              <IconBadge icon={ChartNoAxesCombined} variant="orbital" shape="squircle" boxSize={54} size={26} orbit className="mb-5 mx-auto" />
              <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-xl font-semibold text-lunar mb-2">
                Ares Profile — Dashboard Personal
              </h3>
              <p className="text-text-tertiary text-sm mb-3" style={{ fontFamily: 'var(--font-mono)' }}>
                Dashboard unificado · Salud + Finanzas
              </p>
              <ul className="space-y-2 text-text-secondary text-sm text-left">
                <li className="flex gap-2">
                  <span className="text-text-muted">▸</span>
                  <span>React 19 + Vite + Tailwind 4 + Recharts. Visualización de métricas de salud (Apple Health) y finanzas personales.</span>
                </li>
              </ul>
            </MissionPatch>
          </div>


        </div>
      </div>
    </section>
  )
}