import { LINKS, EMAIL } from '../data/profile'
import GlassCard from '../components/GlassCard'
import NeonText from '../components/NeonText'

export default function ContactPage() {
  return (
    <div className="space-y-5">
      <div className="animate-spring-in">
        <NeonText as="h2" color="blue" className="text-lg">Contacto</NeonText>
        <p className="text-primary-300 text-sm mt-1">Hablemos.</p>
      </div>

      <GlassCard glow="blue" className="animate-spring-in stagger-1">
        <NeonText as="h4" color="blue" className="text-sm mb-3">Mensaje rápido</NeonText>
        <div className="glass-deep rounded-2xl p-4 border border-primary-600/6">
          <p className="text-primary-300 text-sm italic">
            "Hola César, vi tu perfil y me gustaría hablar sobre..."
          </p>
        </div>
      </GlassCard>

      <GlassCard glow="lunar" className="animate-spring-in stagger-2">
        <NeonText as="h4" color="lunar" className="text-sm mb-3">Enlaces</NeonText>
        <div className="space-y-2">
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-secondary-500/8 bg-secondary-500/3
                       backdrop-blur-sm transition-all duration-300
                       hover:border-secondary-500/15 hover:bg-secondary-500/6
                       hover:shadow-[0_4px_16px_rgba(0,113,227,0.06)] hover:-translate-y-0.5
                       group"
          >
            <span className="text-lg">✉️</span>
            <div>
              <span className="text-primary-500 text-sm font-medium group-hover:text-secondary-500 transition-colors">Email</span>
              <p className="text-primary-300 text-xs font-mono">{EMAIL}</p>
            </div>
          </a>

          {Object.entries(LINKS).map(([key, url]) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-primary-600/6 bg-bg-300/50
                         backdrop-blur-sm transition-all duration-300
                         hover:border-lunar-200/20 hover:bg-lunar-100/40
                         hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:-translate-y-0.5
                         group"
            >
              <span className="text-lg">
                {key === 'linkedin' ? '💼' : key === 'github' ? '⚡' : key === 'instagram' ? '📸' : '🎵'}
              </span>
              <div>
                <span className="text-primary-500 text-sm font-medium group-hover:text-lunar-500 transition-colors capitalize">{key}</span>
                <p className="text-primary-300 text-xs font-mono truncate max-w-[200px]">{url.replace('https://', '')}</p>
              </div>
            </a>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}