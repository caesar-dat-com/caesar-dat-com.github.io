import NotchCard from '../components/NotchCard'

export default function EducationPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-secondary-500 font-mono tracking-wider uppercase text-lg">Educación</h2>
        <span className="text-primary-200 text-sm">Formación base + especialización en datos/IA.</span>
      </div>

      <NotchCard>
        <h4 className="text-secondary-500 font-mono tracking-wider uppercase text-sm mb-2">Ingeniería en Datos e Inteligencia Artificial</h4>
        <p className="text-primary-200 text-sm mb-2">Universidad Autónoma de Occidente (UAO) · Cali, Colombia</p>
        <p className="text-primary-200 text-sm">Etapa final · Incluye certificación de inglés (B1/B2).</p>
      </NotchCard>

      <NotchCard>
        <h4 className="text-secondary-500 font-mono tracking-wider uppercase text-sm mb-2">Tecnología en Gestión de Sistemas Mecatrónicos</h4>
        <p className="text-primary-200 text-sm">FCECEP · Cali, Colombia</p>
      </NotchCard>
    </div>
  )
}
