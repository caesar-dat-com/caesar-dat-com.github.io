import GlassCard from '../components/GlassCard'
import HUDBracket from '../components/HUDBracket'
import StaggerText from '../components/StaggerText'
import IconBadge from '../components/IconBadge'
import { GraduationCap, Cpu, CodeXml } from '../components/icons'

export default function EducationSection() {
  return (
    <section id="education" className="scroll-section relative min-h-screen flex items-center py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 w-full">
        <div className="mb-16 text-center gsap-reveal">
          <HUDBracket className="section-badge inline-block mb-4" size={16}>
            <span
              className="text-xs uppercase tracking-[0.3em] text-orbital"
              style={{ fontFamily: 'var(--font-mono)', padding: '0.5rem 2rem' }}
            >
              FLIGHT.PLAN
            </span>
          </HUDBracket>
          <StaggerText
            text="Educación"
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
            Flight plan — formación base + especialización.
          </p>
          <div className="section-rule mx-auto mt-8 max-w-[220px]" />
        </div>

        <div className="mx-auto max-w-2xl space-y-6">
          <div className="gsap-reveal">
            <div className="flight-plan">
              <div className="flex items-start gap-4">
                <IconBadge icon={GraduationCap} variant="orbital" shape="circle" boxSize={48} size={22} />
                <div>
                  <div className="mb-1 inline-block rounded-full bg-orbital/10 px-2 py-0.5 text-xs font-mono uppercase tracking-wider text-orbital">
                    En curso
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-lg font-semibold text-lunar mb-1">
                    Ingeniería en Datos e Inteligencia Artificial
                  </h3>
                  <p className="text-text-tertiary text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
                    Universidad Autónoma de Occidente (UAO) · Cali, Colombia
                  </p>
                  <p className="mt-2 text-text-secondary text-sm">
                    Etapa final · Certificación inglés B1/B2.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="gsap-reveal">
            <div className="flight-plan">
              <div className="flex items-start gap-4">
                <IconBadge icon={Cpu} variant="muted" shape="circle" boxSize={48} size={22} />
                <div>
                  <div className="mb-1 inline-block rounded-full bg-space-600 px-2 py-0.5 text-xs font-mono uppercase tracking-wider text-text-tertiary">
                    Completado
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-lg font-semibold text-lunar mb-1">
                    Tecnología en Gestión de Sistemas Mecatrónicos
                  </h3>
                  <p className="text-text-tertiary text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
                    FCECEP · Cali, Colombia
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="gsap-reveal">
            <div className="flight-plan">
              <div className="flex items-start gap-4">
                <IconBadge icon={CodeXml} variant="muted" shape="circle" boxSize={48} size={22} />
                <div>
                  <div className="mb-1 inline-block rounded-full bg-space-600 px-2 py-0.5 text-xs font-mono uppercase tracking-wider text-text-tertiary">
                    Completado
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-lg font-semibold text-lunar mb-1">
                    Codificación y Programación (Diplomado)
                  </h3>
                  <p className="text-text-tertiary text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
                    Pontificia Universidad Javeriana + Samsung Electronics · Cali, Colombia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}