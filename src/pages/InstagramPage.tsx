import { LINKS } from '../data/profile'
import NotchCard from '../components/NotchCard'

export default function InstagramPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h2 className="text-secondary-500 font-mono tracking-wider uppercase text-lg mb-3">Instagram</h2>
        <p className="text-primary-200 text-sm mb-4">Previsualización + acceso rápido.</p>

        <NotchCard className="mb-4">
          <h3 className="text-secondary-500 font-mono tracking-wider uppercase text-sm mb-2">Perfil</h3>
          <p className="text-primary-200 text-sm mb-4">
            Si tu navegador bloquea el embed (a veces pasa por políticas de terceros), usa el botón "Abrir en Instagram".
          </p>
          <div className="aspect-video bg-black/18 rounded-sm mb-4 flex items-center justify-center text-primary-200 text-sm">
            <span className="opacity-60">Instagram embed placeholder (ver en vivo en el sitio)</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => window.open(LINKS.instagram, '_blank')} className="text-secondary-500 border border-secondary-500/65 bg-black/25 font-mono tracking-wider px-3 py-2 uppercase hover:bg-secondary-500/08 text-sm">
              Abrir en Instagram
            </button>
            <button onClick={() => navigator.clipboard.writeText(LINKS.instagram).then(() => alert('Link copiado'))} className="text-secondary-500 border border-secondary-500/65 bg-black/25 font-mono tracking-wider px-3 py-2 uppercase hover:bg-secondary-500/08 text-sm">
              Copiar link
            </button>
          </div>
        </NotchCard>

        <NotchCard>
          <h3 className="text-secondary-500 font-mono tracking-wider uppercase text-sm mb-2">Atajo</h3>
          <p className="text-primary-200 text-sm mb-4">Puedes usar <code className="text-tertiary-500 font-mono">U</code> (Actions) para abrir Instagram desde cualquier sección.</p>
          <p className="text-primary-200 text-sm font-mono">{LINKS.instagram}</p>
        </NotchCard>
      </div>

      <div>
        <h2 className="text-secondary-500 font-mono tracking-wider uppercase text-lg mb-3">Mini preview</h2>
        <NotchCard>
          <p className="text-primary-200 text-sm mb-4">Mismo embed, compacto.</p>
          <div className="aspect-video bg-black/18 rounded-sm flex items-center justify-center text-primary-200 text-xs">
            <span className="opacity-60">Mini preview (ver en vivo)</span>
          </div>
        </NotchCard>
      </div>
    </div>
  )
}
