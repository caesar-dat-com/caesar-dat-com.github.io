import { SECTIONS } from '../data/profile'

interface NavRailProps {
  active: string
  onNavigate: (id: string) => void
}

export default function NavRail({ active, onNavigate }: NavRailProps) {
  return (
    <aside className="h-full min-w-0">
      <div className="relative glass-panel card-shadow h-full overflow-hidden">
        <div className="p-3 min-w-0 overflow-auto overscroll-contain h-full scrollbar-thin overflow-x-hidden">

          {/* Navigation */}
          <p className="text-secondary-500 font-mono tracking-[0.18em] uppercase text-[0.55rem] opacity-50 mb-2 px-1">
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
                      ? 'bg-secondary-500/5 border-secondary-500/12 text-primary-500 shadow-[0_2px_8px_rgba(0,113,227,0.06)]'
                      : 'bg-transparent border-transparent text-primary-300 hover:bg-primary-600/4 hover:text-primary-500 hover:translate-x-px hover:border-primary-600/6'
                    }
                  `}
                >
                  <span>{s.label}</span>
                  <kbd className="border border-primary-600/40 rounded text-primary-200 font-mono tracking-wider px-1 py-0.5 text-[0.55rem] flex-none leading-none">
                    {s.key}
                  </kbd>
                </button>
              </li>
            ))}
          </ul>

          <div className="separator" />

          {/* Search */}
          <p className="text-secondary-500 font-mono tracking-[0.18em] uppercase text-[0.55rem] opacity-60 mb-1.5 px-1">
            Buscar
          </p>
          <p className="text-primary-200 text-xs mb-2 px-1">Skills · Certificaciones</p>
          <SearchInput />

          <div className="separator" />

          {/* Actions */}
          <NavActions />
        </div>
      </div>
    </aside>
  )
}

function SearchInput() {
  return (
    <div className="relative glass-card overflow-hidden px-2.5 py-2 flex items-center gap-2">
      <span className="text-primary-200 text-xs opacity-60">⌕</span>
      <input
        id="search"
        type="text"
        placeholder="python, power bi, ..."
        autoComplete="off"
        className="w-full border-0 outline-none bg-transparent text-primary-300 font-mono text-xs tracking-wider placeholder:text-primary-200/40 min-w-0"
      />
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
            transition-all duration-200 hover:bg-primary-600/4 hover:border-primary-600/4 ${color}`}
        >
          <span className={`${bg} text-bg-300 font-bold w-5 h-5 text-[0.5rem] rounded-full inline-grid place-items-center flex-none`}>
            {key}
          </span>
          <span className="text-sm">{label}</span>
        </button>
      ))}
    </div>
  )
}