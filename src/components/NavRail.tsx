import { SECTIONS } from '../data/profile'

interface NavRailProps {
  active: string
  onNavigate: (id: string) => void
}

export default function NavRail({ active, onNavigate }: NavRailProps) {
  return (
    <aside className="h-full min-w-0">
      <div className="relative glass-panel notch-clip card-shadow h-full overflow-hidden">
        <span className="notch-deco" />
        <div className="p-3 pb-[calc(0.75rem+0.75rem)] min-w-0 overflow-auto overscroll-contain h-full scrollbar-thin overflow-x-hidden">

          {/* Secciones */}
          <p className="text-secondary-500 font-mono tracking-[0.16em] uppercase text-[0.6rem] opacity-70 mb-2 px-1">
            Nav
          </p>
          <ul className="list-none m-0 p-0 flex flex-col gap-0.5 mb-3">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => onNavigate(s.id)}
                  className={`
                    w-full flex items-center justify-between gap-2 px-2.5 py-[7px]
                    rounded-lg border cursor-pointer font-inherit text-sm
                    transition-all duration-200 ease-out min-w-0
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-secondary-500/40
                    ${active === s.id
                      ? 'bg-secondary-500/10 border-secondary-500/25 text-primary-500'
                      : 'bg-transparent border-transparent text-primary-300 hover:bg-primary-600/25 hover:text-primary-500 hover:translate-x-px'
                    }
                  `}
                >
                  <span>{s.label}</span>
                  <kbd className="border border-primary-600/50 rounded text-primary-200 font-mono tracking-wider px-1 py-0.5 text-[0.6rem] flex-none leading-none">
                    {s.key}
                  </kbd>
                </button>
              </li>
            ))}
          </ul>

          {/* Separador */}
          <div className="separator my-3" />

          {/* Buscar */}
          <p className="text-secondary-500 font-mono tracking-[0.16em] uppercase text-[0.6rem] opacity-70 mb-1.5 px-1">
            Buscar
          </p>
          <p className="text-primary-200 text-xs mb-2 px-1">Skills · Certificaciones</p>
          <SearchInput />

          {/* Separador */}
          <div className="separator my-3" />

          {/* Acciones */}
          <NavActions />
        </div>
      </div>
    </aside>
  )
}

function SearchInput() {
  return (
    <div className="relative glass-card notch-clip overflow-hidden px-2.5 py-2 flex items-center gap-2">
      <span className="text-primary-200 text-xs opacity-60">⌕</span>
      <input
        id="search"
        type="text"
        placeholder="python, power bi, ..."
        autoComplete="off"
        className="w-full border-0 outline-none bg-transparent text-primary-300 font-mono text-xs tracking-wider placeholder:text-primary-200/50 min-w-0"
      />
      <span className="notch-deco" style={{ opacity: 0.3 }} />
    </div>
  )
}

function NavActions() {
  const items = [
    { key: 'U', label: 'Actions',      color: 'text-secondary-500', bg: 'bg-secondary-500',  action: 'actions'  },
    { key: 'M', label: 'Memento Mori', color: 'text-tertiary-500',  bg: 'bg-tertiary-500',   action: 'memento'  },
    { key: 'C', label: 'CV / Imprimir',color: 'text-tertiary-500',  bg: 'bg-tertiary-500',   action: 'cv'       },
  ]

  return (
    <div className="flex flex-col gap-0.5">
      {items.map(({ key, label, color, bg, action }) => (
        <button
          key={action}
          type="button"
          data-action={action}
          className={`w-full text-left flex items-center gap-2.5 px-2 py-[7px]
            rounded-lg border border-transparent bg-transparent cursor-pointer
            transition-all duration-200 hover:bg-primary-600/20 ${color}`}
        >
          <span className={`${bg} text-bg-300 font-bold w-5 h-5 text-[0.55rem] rounded-full inline-grid place-items-center flex-none`}>
            {key}
          </span>
          <span className="text-sm">{label}</span>
        </button>
      ))}
    </div>
  )
}
