import { LINKS, EMAIL } from '../data/profile'
import GlassCard from '../components/GlassCard'
import HUDBracket from '../components/HUDBracket'
import MagneticButton from '../components/MagneticButton'
import TelemetryTypewriter from '../components/TelemetryTypewriter'
import StaggerText from '../components/StaggerText'

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-section relative min-h-screen flex items-center py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 w-full">
        <div className="mb-16 text-center gsap-reveal">
          <HUDBracket className="inline-block mb-4" size={16}>
            <span
              className="text-xs uppercase tracking-[0.3em] text-orbital"
              style={{ fontFamily: 'var(--font-mono)', padding: '0.5rem 2rem' }}
            >
              COMMS.LINK
            </span>
          </HUDBracket>
          <StaggerText
            text="Contacto"
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
            Transmisión abierta — hablemos.
          </p>
        </div>

        <div className="mx-auto max-w-2xl space-y-6">
          <div className="gsap-reveal">
            <GlassCard glow>
              <div className="text-center">
                <div className="mb-4 text-3xl">📡</div>
                <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-xl font-semibold text-lunar mb-3">
                  Señal de contacto
                </h3>
                <TelemetryTypewriter className="mb-4 justify-center" />
                <p className="text-text-tertiary italic mb-6">
                  "Hola César, vi tu perfil y me gustaría hablar sobre..."
                </p>
                <MagneticButton
                  href={`mailto:${EMAIL}`}
                  className="btn-orbital"
                  strength={0.25}
                >
                  📧 Enviar email
                </MagneticButton>
              </div>
            </GlassCard>
          </div>

          <div className="gsap-reveal">
            <GlassCard>
              <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-lg font-semibold text-lunar mb-4">
                Redes
              </h3>
              <div className="space-y-3">
                {Object.entries(LINKS).map(([key, url]) => (
                  <MagneticButton
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    strength={0.15}
                    className="contact-link flex items-center justify-between rounded-xl border border-glass-border bg-space-800/30 px-4 py-3 text-text-secondary transition-colors hover:border-orbital/40 hover:text-orbital w-full"
                  >
                    <span className="font-medium capitalize">
                      {key === 'linkedin' ? '💼 LinkedIn' : key === 'github' ? '⚡ GitHub' : key === 'instagram' ? '📸 Instagram' : key === 'spotify' ? '🎵 Spotify' : key}
                    </span>
                    <span className="text-orbital">→</span>
                  </MagneticButton>
                ))}
              </div>
            </GlassCard>
          </div>

          <div className="gsap-reveal">
            <GlassCard>
              <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-lg font-semibold text-lunar mb-4">
                Datos de contacto
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-text-secondary">
                  <span>📧</span>
                  <span>{EMAIL}</span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary">
                  <span>📍</span>
                  <span>Cali, Colombia</span>
                </div>
              </div>
              <div className="signal-line mt-6" />
              <p className="text-center text-xs text-text-muted" style={{ fontFamily: 'var(--font-mono)' }}>
                // transmisión establecida
              </p>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  )
}