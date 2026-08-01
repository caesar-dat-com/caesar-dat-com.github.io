import { LINKS, EMAIL } from '../data/profile'
import GlassCard from '../components/GlassCard'
import HUDBracket from '../components/HUDBracket'
import MagneticButton from '../components/MagneticButton'
import TelemetryTypewriter from '../components/TelemetryTypewriter'
import StaggerText from '../components/StaggerText'
import IconBadge from '../components/IconBadge'
import { RadioTower, Send, Mail, MapPin, ArrowUpRight, GithubIcon, LinkedinIcon, InstagramIcon, SpotifyIcon } from '../components/icons'

const SOCIAL_ICON: Record<string, React.ReactNode> = {
  linkedin: <LinkedinIcon size={16} />,
  github: <GithubIcon size={16} />,
  instagram: <InstagramIcon size={16} />,
  spotify: <SpotifyIcon size={16} />,
}

const SOCIAL_LABEL: Record<string, string> = {
  linkedin: 'LinkedIn',
  github: 'GitHub',
  instagram: 'Instagram',
  spotify: 'Spotify',
}

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-section relative min-h-screen flex items-center py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 w-full">
        <div className="mb-16 text-center gsap-reveal">
          <HUDBracket className="section-badge inline-block mb-4" size={16}>
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
          <div className="section-rule mx-auto mt-8 max-w-[220px]" />
        </div>

        <div className="mx-auto max-w-2xl space-y-6">
          <div className="gsap-reveal">
            <GlassCard glow>
              <div className="text-center">
                <IconBadge icon={RadioTower} variant="orbital" shape="circle" boxSize={62} size={28} orbit className="mx-auto mb-5" />
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
                  <span className="icon-inline"><Send size={16} strokeWidth={1.6} /> Enviar email</span>
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
                    className="contact-link group flex items-center justify-between rounded-xl border border-glass-border bg-space-800/30 px-4 py-3 text-text-secondary transition-colors hover:border-orbital/40 hover:text-orbital w-full"
                  >
                    <span className="icon-inline font-medium capitalize">
                      {SOCIAL_ICON[key] ?? null}
                      {SOCIAL_LABEL[key] ?? key}
                    </span>
                    <ArrowUpRight size={16} strokeWidth={1.6} className="text-orbital transition-transform duration-300 group-hover:translate-x-0.5" />
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
                  <IconBadge icon={Mail} variant="orbital" boxSize={32} size={15} />
                  <span>{EMAIL}</span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary">
                  <IconBadge icon={MapPin} variant="muted" boxSize={32} size={15} />
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