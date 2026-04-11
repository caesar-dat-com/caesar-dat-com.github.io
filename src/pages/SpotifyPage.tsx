import { LINKS } from '../data/profile'
import NotchCard from '../components/NotchCard'

export default function SpotifyPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h2 className="text-secondary-500 font-mono tracking-wider uppercase text-lg mb-3">Spotify</h2>
        <p className="text-primary-200 text-sm mb-4">Previsualización + acceso rápido.</p>

        <NotchCard className="mb-4">
          <h3 className="text-secondary-500 font-mono tracking-wider uppercase text-sm mb-2">Perfil (embed)</h3>
          <p className="text-primary-200 text-sm mb-4">
            Si Spotify no permite embed de perfil en tu región/navegador, el botón "Abrir en Spotify" siempre funciona.
          </p>
          <div className="aspect-video bg-black/18 rounded-sm mb-4 flex items-center justify-center text-primary-200 text-sm">
            <span className="opacity-60">Spotify embed placeholder (ver en vivo en el sitio)</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => window.open(LINKS.spotify, '_blank')} className="text-secondary-500 border border-secondary-500/65 bg-black/25 font-mono tracking-wider px-3 py-2 uppercase hover:bg-secondary-500/08 text-sm">
              Abrir en Spotify
            </button>
            <button onClick={() => navigator.clipboard.writeText(LINKS.spotify).then(() => alert('Link copiado'))} className="text-secondary-500 border border-secondary-500/65 bg-black/25 font-mono tracking-wider px-3 py-2 uppercase hover:bg-secondary-500/08 text-sm">
              Copiar link
            </button>
          </div>
        </NotchCard>

        <NotchCard>
          <h3 className="text-secondary-500 font-mono tracking-wider uppercase text-sm mb-2">Atajo</h3>
          <p className="text-primary-200 text-sm mb-4">Puedes usar <code className="text-tertiary-500 font-mono">U</code> (Actions) para abrir Spotify desde cualquier sección.</p>
          <p className="text-primary-200 text-sm font-mono">{LINKS.spotify}</p>
        </NotchCard>
      </div>

      <div>
        <h2 className="text-secondary-500 font-mono tracking-wider uppercase text-lg mb-3">Recomendación</h2>
        <NotchCard>
          <p className="text-primary-200 text-sm mb-4">
            Spotify embebe perfecto playlists/álbumes/canciones. Si me pasas una playlist tuya, la pongo aquí con 0 fallos.
          </p>
        </NotchCard>
      </div>
    </div>
  )
}
