import { LINKS, EMAIL } from '../data/profile'
import NotchCard from '../components/NotchCard'

export default function ContactPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-secondary-500 font-mono tracking-wider uppercase text-lg">Contacto</h2>
        <span className="text-primary-200 text-sm">Email: <span id="email-text">{EMAIL}</span></span>
      </div>

      <NotchCard>
        <h4 className="text-secondary-500 font-mono tracking-wider uppercase text-sm mb-2">Mensaje rápido</h4>
        <p className="text-primary-200 text-sm">"Hola César, vi tu perfil y me gustaría hablar sobre..."</p>
      </NotchCard>

      <NotchCard>
        <h4 className="text-secondary-500 font-mono tracking-wider uppercase text-sm mb-2">Enlaces</h4>
        <div className="flex flex-wrap gap-2">
          <a href={`mailto:${EMAIL}`} className="text-secondary-500 hover:text-primary-200 font-mono text-sm underline">Enviar email</a>
          <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="text-secondary-500 hover:text-primary-200 font-mono text-sm underline">LinkedIn</a>
          <a href={LINKS.github} target="_blank" rel="noreferrer" className="text-secondary-500 hover:text-primary-200 font-mono text-sm underline">GitHub</a>
        </div>
      </NotchCard>
    </div>
  )
}
