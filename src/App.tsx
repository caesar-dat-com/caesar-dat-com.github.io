import { useEffect, useState, useCallback } from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import { toast } from './components/Toast'
import Toast from './components/Toast'
import NavRail from './components/NavRail'
import SnapshotRail from './components/SnapshotRail'
import MementoMori from './components/MementoMori'
import CvGenerator from './components/CvGenerator'

// Pages
import AboutPage from './pages/AboutPage'
import StackPage from './pages/StackPage'
import ExperiencePage from './pages/ExperiencePage'
import ProjectsPage from './pages/ProjectsPage'
import EducationPage from './pages/EducationPage'
import CertsPage from './pages/CertsPage'
import ContactPage from './pages/ContactPage'
import InstagramPage from './pages/InstagramPage'
import SpotifyPage from './pages/SpotifyPage'

type Theme = 'dark' | 'light'

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved === 'dark' || saved === 'light') return saved
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.remove('theme-dark', 'theme-light')
  root.classList.add(theme === 'light' ? 'theme-light' : 'theme-dark')
  try { localStorage.setItem('theme', theme) } catch { /* noop */ }
}

export default function App() {
  const navigate = useNavigate()
  const [active, setActive] = useState('about')
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [memento, setMemento] = useState<{ livedWeeks: number; leftWeeks: number; totalWeeks: number } | null>(null)
  const [mementoModalOpen, setMementoModalOpen] = useState(false)
  const [cvModalOpen, setCvModalOpen] = useState(false)
  const [actionsModalOpen, setActionsModalOpen] = useState(false)

  // Apply theme on change
  useEffect(() => { applyTheme(theme) }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }, [])

  // Navigation
  const handleNavigate = useCallback((id: string) => {
    setActive(id)
    navigate(`/${id}`)
  }, [navigate])

  // Keyboard shortcuts
  useEffect(() => {
    const map: Record<string, string> = {
      '1': 'about', '2': 'stack', '3': 'experience',
      '4': 'projects', '5': 'education', '6': 'certs',
      '7': 'contact', '8': 'instagram', '9': 'spotify',
    }
    function onKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      if (e.key === '/') {
        const input = document.querySelector('#search') as HTMLInputElement | null
        if (input) { e.preventDefault(); input.focus() }
        return
      }
      if (e.key === 'Escape') {
        setMementoModalOpen(false); setCvModalOpen(false); setActionsModalOpen(false)
        return
      }
      if (map[e.key]) { handleNavigate(map[e.key]); return }
      if ((e.key === 'u' || e.key === 'U') && !e.repeat) setActionsModalOpen(v => !v)
      if ((e.key === 'm' || e.key === 'M') && !e.repeat) setMementoModalOpen(v => !v)
      if ((e.key === 'c' || e.key === 'C') && !e.repeat) setCvModalOpen(v => !v)
      if ((e.key === 't' || e.key === 'T') && !e.repeat) toggleTheme()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleNavigate, toggleTheme])

  // Memento Mori data
  useEffect(() => {
    function calc() {
      const now = new Date()
      const BIRTH = new Date(2000, 0, 25)
      const totalWeeks = Math.round(74.48 * 365.2425 / 7)
      const livedWeeks = Math.max(0, Math.floor((now.getTime() - BIRTH.getTime()) / 604800000))
      const leftWeeks = Math.max(0, totalWeeks - livedWeeks)
      setMemento({ livedWeeks, leftWeeks, totalWeeks })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [])

  // Sync active with URL
  useEffect(() => {
    const hash = (window.location.hash || '#about').replace('#', '')
    if (hash !== active) setActive(hash)
  }, [active])

  return (
    <div className="app-skeleton" id="top">
      {/* ─── Header ─── */}
      <header className="app-header">
        <a className="brand" href="#top" aria-label="Inicio">
          <span className="brand__title">CÉSAR REYES</span>
          <span className="brand__tag">DATA · IA · AUTOMATION</span>
        </a>

        <div className="flex items-center gap-2">
          <span className="hint-pill hidden sm:inline">T: Tema · U/M/C · 1–9: Nav</span>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
            title={`Tema: ${theme === 'dark' ? 'oscuro' : 'claro'} (T)`}
          >
            {theme === 'dark' ? '☀' : '◗'}
          </button>
        </div>
      </header>

      {/* ─── Main grid ─── */}
      <div className="app-container">
        <NavRail active={active} onNavigate={handleNavigate} />

        <main className="h-full min-w-0 overflow-hidden">
          {/* Content card — notch-clip cyberpunk */}
          <div className="relative h-full glass-panel notch-clip card-shadow overflow-hidden">
            <span className="notch-deco" />
            <div className="pad__body pad__scroll min-h-0 min-w-0 h-full">
              <Routes>
                <Route path="/"           element={<AboutPage />} />
                <Route path="/about"      element={<AboutPage />} />
                <Route path="/stack"      element={<StackPage />} />
                <Route path="/experience" element={<ExperiencePage />} />
                <Route path="/projects"   element={<ProjectsPage />} />
                <Route path="/education"  element={<EducationPage />} />
                <Route path="/certs"      element={<CertsPage />} />
                <Route path="/contact"    element={<ContactPage />} />
                <Route path="/instagram"  element={<InstagramPage />} />
                <Route path="/spotify"    element={<SpotifyPage />} />
              </Routes>
            </div>
          </div>
        </main>

        <SnapshotRail
          active={active}
          onOpenCv={() => setCvModalOpen(true)}
          onOpenMemento={() => setMementoModalOpen(true)}
          mmData={memento}
        />
      </div>

      {/* ─── Modal: Actions ─── */}
      {actionsModalOpen && (
        <dialog
          open
          onClose={() => setActionsModalOpen(false)}
          className="modal"
          onClick={(e) => { if (e.target === e.currentTarget) setActionsModalOpen(false) }}
        >
          <div className="modal__body">
            <div className="body__content">
              <h2>Actions</h2>
              <p className="text-primary-300 text-sm mb-4">Acciones rápidas de navegación y utilidades.</p>
              <div className="space-y-2">
                {[
                  { label: 'Copiar link perfil', action: () => { navigator.clipboard.writeText(window.location.href).then(() => toast('Copiado', 'success')); setActionsModalOpen(false) } },
                  { label: 'Abrir LinkedIn', action: () => { window.open('https://www.linkedin.com/in/caesar-reyes-8a60622b2', '_blank', 'noopener'); setActionsModalOpen(false) } },
                  { label: 'Abrir GitHub', action: () => { window.open('https://github.com/caesar-dat-com', '_blank', 'noopener'); setActionsModalOpen(false) } },
                ].map(({ label, action }) => (
                  <div key={label} className="flex items-center justify-between gap-3 py-1">
                    <span className="text-primary-300 text-sm">{label}</span>
                    <button
                      type="button"
                      className="border border-secondary-500/50 bg-secondary-500/08 text-secondary-500 font-mono tracking-wider uppercase px-2.5 py-1.5 cursor-pointer notch-clip text-xs transition-all duration-200 hover:bg-secondary-500/15 hover:border-secondary-500/80"
                      onClick={action}
                    >
                      Ir
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </dialog>
      )}

      {/* ─── Modal: Memento Mori ─── */}
      {mementoModalOpen && (
        <dialog
          open
          onClose={() => setMementoModalOpen(false)}
          className="modal modal--wide"
          onClick={(e) => { if (e.target === e.currentTarget) setMementoModalOpen(false) }}
        >
          <div className="modal__body">
            <div className="body__content">
              <h2>Memento Mori</h2>
              {memento && <MementoMori />}
            </div>
          </div>
        </dialog>
      )}

      {/* ─── Modal: CV ─── */}
      {cvModalOpen && (
        <dialog
          open
          onClose={() => setCvModalOpen(false)}
          className="modal modal--wide"
          onClick={(e) => { if (e.target === e.currentTarget) setCvModalOpen(false) }}
        >
          <div className="modal__body">
            <div className="body__content">
              <h2>CV Imprimible</h2>
              <CvGenerator />
            </div>
          </div>
        </dialog>
      )}

      <Toast />
    </div>
  )
}
