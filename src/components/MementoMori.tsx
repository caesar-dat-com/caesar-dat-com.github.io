import { useEffect, useRef } from 'react'
import { BIRTH, LIFE_EXPECTANCY_YEARS } from '../data/profile'

export default function MementoMori() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const interval = setInterval(() => drawGrid(), 1000)
    drawGrid()
    return () => clearInterval(interval)
  }, [])

  function calcWeeks() {
    const now = new Date()
    const totalDays = LIFE_EXPECTANCY_YEARS * 365.2425
    const totalWeeks = Math.round(totalDays / 7)
    const livedWeeks = Math.max(0, Math.floor((now.getTime() - BIRTH.getTime()) / 604800000))
    const leftWeeks = Math.max(0, totalWeeks - livedWeeks)
    return { totalWeeks, livedWeeks, leftWeeks, currentWeekIndex: Math.min(totalWeeks - 1, livedWeeks) }
  }

  function drawGrid() {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return

    const dpr = Math.max(1, window.devicePixelRatio || 1)
    const cssW = c.clientWidth || c.width
    const cssH = c.clientHeight || c.height
    c.width = Math.floor(cssW * dpr)
    c.height = Math.floor(cssH * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const { totalWeeks, livedWeeks, currentWeekIndex } = calcWeeks()
    const cols = 52
    const rows = Math.ceil(totalWeeks / cols)
    const pad = 6
    const w = cssW - pad * 2
    const h = cssH - pad * 2
    const gap = 1
    const cellW = Math.floor((w - gap * (cols - 1)) / cols)
    const cellH = Math.floor((h - gap * (rows - 1)) / rows)
    const cell = Math.max(1, Math.min(cellW, cellH))
    const gridW = cols * cell + gap * (cols - 1)
    const gridH = rows * cell + gap * (rows - 1)
    const ox = Math.floor((cssW - gridW) / 2)
    const oy = Math.floor((cssH - gridH) / 2)

    ctx.clearRect(0, 0, cssW, cssH)

    for (let i = 0; i < totalWeeks; i++) {
      const r = Math.floor(i / cols)
      const col = i % cols
      const x = ox + col * (cell + gap)
      const y = oy + r * (cell + gap)
      const isLived = i < livedWeeks
      const isNow = i === currentWeekIndex
      ctx.fillStyle = isNow ? '#fed33f' : isLived ? '#2be4ea' : 'rgba(255,255,255,0.12)'
      ctx.fillRect(x, y, cell, cell)
    }
  }

  function msToParts(ms: number) {
    const s = Math.max(0, Math.floor(ms / 1000))
    const days = Math.floor(s / 86400)
    const hours = Math.floor((s % 86400) / 3600)
    const mins = Math.floor((s % 3600) / 60)
    const secs = s % 60
    return { days, hours, mins, secs }
  }

  function fmtDHMS(p: { days: number; hours: number; mins: number; secs: number }) {
    const hh = String(p.hours).padStart(2, '0')
    const mm = String(p.mins).padStart(2, '0')
    const ss = String(p.secs).padStart(2, '0')
    return p.days > 0 ? `${p.days}d ${hh}:${mm}:${ss}` : `${hh}:${mm}:${ss}`
  }

  const { totalWeeks, livedWeeks, leftWeeks } = calcWeeks()
  const now = new Date()
  const eod = new Date(now); eod.setHours(23, 59, 59, 999)
  const eow = (() => {
    const d = new Date(now)
    const day = d.getDay()
    const daysToSunday = (7 - 1 - day + 7) % 7
    const e = new Date(eod)
    e.setDate(e.getDate() + daysToSunday)
    return e
  })()
  const eol = new Date(BIRTH.getTime() + LIFE_EXPECTANCY_YEARS * 365.2425 * 86400000)

  const tDay = fmtDHMS(msToParts(eod.getTime() - now.getTime()))
  const tWeek = fmtDHMS(msToParts(eow.getTime() - now.getTime()))
  const lifeMs = eol.getTime() - now.getTime()
  const lifeParts = msToParts(lifeMs)
  const tLife = lifeMs <= 0 ? '00:00:00' : `${lifeParts.days}d ${String(lifeParts.hours).padStart(2, '0')}:${String(lifeParts.mins).padStart(2, '0')}:${String(lifeParts.secs).padStart(2, '0')}`

  const lifeDateStr = eol.toLocaleString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="space-y-3">
      <div className="bg-bg-500/55 border border-primary-600/90 notch-clip p-3 relative overflow-hidden">
        <span className="absolute -right-1.5 bottom-1 w-[22.6px] h-[3px] -rotate-45 bg-primary-600/90 pointer-events-none" />
        <h4 className="m-0 mb-1 text-secondary-500 text-sm">Fin del día</h4>
        <p className="text-primary-200 m-0 font-mono tracking-wider">{tDay}</p>
      </div>
      <div className="bg-bg-500/55 border border-primary-600/90 notch-clip p-3 relative overflow-hidden">
        <span className="absolute -right-1.5 bottom-1 w-[22.6px] h-[3px] -rotate-45 bg-primary-600/90 pointer-events-none" />
        <h4 className="m-0 mb-1 text-secondary-500 text-sm">Fin de la semana</h4>
        <p className="text-primary-200 m-0 font-mono tracking-wider">{tWeek}</p>
      </div>
      <div className="bg-bg-500/55 border border-primary-600/90 notch-clip p-3 relative overflow-hidden">
        <span className="absolute -right-1.5 bottom-1 w-[22.6px] h-[3px] -rotate-45 bg-primary-600/90 pointer-events-none" />
        <h4 className="m-0 mb-1 text-secondary-500 text-sm">Vida (estimado)</h4>
        <p className="text-primary-200 m-0 font-mono tracking-wider">{tLife}</p>
        <p className="text-primary-200 m-0 mt-2 opacity-90 text-sm">
          Fecha estimada: {lifeDateStr} · (Usando {LIFE_EXPECTANCY_YEARS} años)
        </p>
      </div>
      <div className="bg-bg-500/55 border border-primary-600/90 notch-clip p-3 relative overflow-hidden">
        <span className="absolute -right-1.5 bottom-1 w-[22.6px] h-[3px] -rotate-45 bg-primary-600/90 pointer-events-none" />
        <h4 className="m-0 mb-1 text-secondary-500 text-sm">Semanas</h4>
        <p className="text-primary-200 m-0 text-sm">
          <span className="font-mono tracking-wider">Vividas:</span> {livedWeeks}<br />
          <span className="font-mono tracking-wider">Restantes:</span> {leftWeeks}<br />
          <span className="font-mono tracking-wider">Total:</span> {totalWeeks}
        </p>
      </div>
      <canvas ref={canvasRef} width={400} height={300} className="block w-full h-auto border border-secondary-500/35 bg-black/18 notch-clip p-2.5" aria-label="Calendario de vida por semanas" />
    </div>
  )
}