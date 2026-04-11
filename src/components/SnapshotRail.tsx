import { SECTION_META, SECTION_NAMES } from '../data/profile'

interface SnapshotRailProps {
  active: string
  onOpenCv: () => void
  onOpenMemento: () => void
  mmData: { livedWeeks: number; leftWeeks: number; totalWeeks: number } | null
}

export default function SnapshotRail({ active, onOpenCv, onOpenMemento, mmData }: SnapshotRailProps) {
  return (
    <aside className="h-full min-w-0">
      <div className="relative glass-panel notch-clip card-shadow h-full overflow-hidden">
        <span className="notch-deco" />
        <div className="p-3 pb-[calc(0.75rem+0.75rem)] min-w-0 overflow-auto overscroll-contain h-full scrollbar-thin overflow-x-hidden">

          {/* Header */}
          <p className="text-secondary-500 font-mono tracking-[0.16em] uppercase text-[0.6rem] opacity-70 mb-0.5">
            Snapshot
          </p>
          <p className="text-primary-200 text-xs mb-3">
            {SECTION_META[active] || 'Vista rápida.'}
          </p>

          {/* Sección actual */}
          <div className="relative glass-card notch-clip overflow-hidden p-2.5 mb-3">
            <span className="notch-deco" style={{ opacity: 0.3 }} />
            <p className="text-primary-200 font-mono text-[0.6rem] tracking-widest uppercase opacity-60 mb-0.5">Sección</p>
            <p className="text-primary-500 text-sm font-medium">{SECTION_NAMES[active] || '—'}</p>
          </div>

          <div className="separator mb-3" />

          {/* CV Card */}
          <button
            type="button"
            className="relative glass-card notch-clip overflow-hidden w-full text-left cursor-pointer p-2.5 mb-3 transition-all duration-200 hover:bg-white/[0.06] active:scale-[0.99] group"
            onClick={onOpenCv}
          >
            <span className="notch-deco" style={{ opacity: 0.3 }} />
            <p className="text-secondary-500 font-mono text-[0.6rem] tracking-widest uppercase mb-0.5 group-hover:opacity-100 opacity-80">
              CV / Imprimir
            </p>
            <p className="text-primary-300 text-xs leading-relaxed mb-1.5">
              Genera tu hoja de vida con los datos actuales.
            </p>
            <div className="separator mb-1.5" />
            <p className="text-primary-200 text-xs font-mono">
              <span className="text-tertiary-500">Atajo</span>
              <span className="opacity-60">: </span>
              <kbd className="border border-primary-600/50 rounded px-1 py-0.5 text-[0.6rem]">C</kbd>
            </p>
          </button>

          <div className="separator mb-3" />

          {/* Memento Mori */}
          <button
            type="button"
            className="relative glass-card notch-clip overflow-hidden w-full text-left cursor-pointer p-2.5 mb-3 transition-all duration-200 hover:bg-white/[0.06] active:scale-[0.99] group"
            onClick={onOpenMemento}
          >
            <span className="notch-deco" style={{ opacity: 0.3 }} />
            <div className="flex items-baseline justify-between gap-2 mb-1">
              <p className="text-tertiary-500 font-mono text-[0.6rem] tracking-widest uppercase opacity-90">
                Memento Mori
              </p>
              <kbd className="border border-tertiary-500/40 rounded text-tertiary-500 font-mono px-1 py-0.5 text-[0.55rem]">
                Semanas
              </kbd>
            </div>
            <p className="text-primary-200 text-xs mb-2">
              Nacido: 25/01/2000 · Total: {mmData?.totalWeeks ?? '—'}
            </p>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="glass-card notch-clip overflow-hidden p-2">
                <p className="text-secondary-500 font-mono text-[0.55rem] tracking-wider uppercase mb-1 opacity-80">Vividas</p>
                <span className="text-primary-300 text-sm font-mono">{mmData?.livedWeeks ?? '—'}</span>
              </div>
              <div className="glass-card notch-clip overflow-hidden p-2">
                <p className="text-primary-200 font-mono text-[0.55rem] tracking-wider uppercase mb-1 opacity-80">Restantes</p>
                <span className="text-primary-300 text-sm font-mono">{mmData?.leftWeeks ?? '—'}</span>
              </div>
            </div>
            <div className="glass-card notch-clip overflow-hidden p-2">
              <canvas
                id="mm-canvas-rail"
                width={240}
                height={180}
                aria-label="Calendario de vida por semanas"
                className="block w-full h-auto"
              />
              <div className="mt-2 flex gap-2.5 flex-wrap text-primary-200 text-[0.6rem]">
                <span><i className="inline-block w-2 h-2 rounded-[2px] mr-1 bg-secondary-500 opacity-80" />vividas</span>
                <span><i className="inline-block w-2 h-2 rounded-[2px] mr-1 bg-white/15" />restantes</span>
                <span><i className="inline-block w-2 h-2 rounded-[2px] mr-1 bg-tertiary-500 opacity-80" />actual</span>
              </div>
            </div>
          </button>

          <div className="separator mb-3" />

          {/* NETWIRE_ID — detalle cyberpunk */}
          <p className="text-primary-200 text-[0.6rem] font-mono">
            <span className="text-secondary-500 tracking-wider">NETWIRE_ID</span>
            <span className="opacity-40">: </span>
            <span className="opacity-50" id="seed">{generateSeed()}</span>
          </p>

        </div>
      </div>
    </aside>
  )
}

function generateSeed(): string {
  try {
    const s = crypto.getRandomValues(new Uint8Array(8))
    return Array.from(s).map(b => b.toString(16).padStart(2, '0')).join('')
  } catch {
    return 'd869db7fe62fb07c'
  }
}
