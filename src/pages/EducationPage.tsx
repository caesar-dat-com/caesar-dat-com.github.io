import GlassCard from '../components/GlassCard'
import NeonText from '../components/NeonText'

export default function EducationPage() {
  return (
    <div className="space-y-5">
      <div className="animate-spring-in">
        <NeonText as="h2" color="blue" className="text-lg">Educación</NeonText>
        <p className="text-primary-300 text-sm mt-1">Formación base + especialización en datos/IA.</p>
      </div>

      <GlassCard glow="blue" className="animate-spring-in stagger-1">
        <div className="flex items-start gap-3">
          <span className="text-2xl mt-0.5">🎓</span>
          <div>
            <NeonText as="h4" color="blue" className="text-sm mb-1">Ingeniería en Datos e Inteligencia Artificial</NeonText>
            <p className="text-primary-300 text-sm mb-2">Universidad Autónoma de Occidente (UAO) · Cali, Colombia</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-0.5 rounded-lg border border-secondary-500/10 bg-secondary-500/4 text-primary-300 font-mono text-xs">
                Etapa final
              </span>
              <span className="px-2.5 py-0.5 rounded-lg border border-lunar-200/15 bg-lunar-100/30 text-primary-300 font-mono text-xs">
                Certificación inglés B1/B2
              </span>
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard glow="lunar" className="animate-spring-in stagger-2">
        <div className="flex items-start gap-3">
          <span className="text-2xl mt-0.5">⚙️</span>
          <div>
            <NeonText as="h4" color="lunar" className="text-sm mb-1">Tecnología en Gestión de Sistemas Mecatrónicos</NeonText>
            <p className="text-primary-300 text-sm">FCECEP · Cali, Colombia</p>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}