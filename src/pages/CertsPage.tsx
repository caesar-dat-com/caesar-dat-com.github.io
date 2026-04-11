import { useState, useEffect } from 'react'
import NotchCard from '../components/NotchCard'

export default function CertsPage() {
  const [certs, setCerts] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/data/linkedin-data.json')
        if (res.ok) {
          const data = await res.json()
          setCerts(data.certifications || [])
        }
      } catch {
        setCerts([])
      }
    }
    load()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 className="text-secondary-500 font-mono tracking-wider uppercase text-sm mb-3">Certificaciones (LinkedIn)</h3>
        <div id="certifications">
          {certs.length > 0 ? (
            certs.map((c: any, i: number) => (
              <NotchCard key={i} className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-secondary-500 font-mono tracking-wider uppercase text-xs">{c.name}</h4>
                  {c.url && (
                    <span className="border border-primary-600/90 text-primary-200 font-mono tracking-wider px-1.5 py-0.5 text-[0.8rem] uppercase rounded-sm">
                      ver
                    </span>
                  )}
                </div>
                <p className="text-primary-200 text-xs mb-1">{c.authority}</p>
                <p className="text-primary-200 text-xs opacity-80">
                  {c.timePeriod?.startDate?.month && c.timePeriod?.startDate?.year
                    ? `${c.timePeriod.startDate.month}/${c.timePeriod.startDate.year}`
                    : '—'}
                </p>
              </NotchCard>
            ))
          ) : (
            <p className="text-primary-200 text-sm">Cargando certificaciones...</p>
          )}
        </div>
        <p className="text-primary-200 text-xs mt-2">Formación adicional: +18 cursos BI/Analytics</p>
      </div>

      <div>
        <h3 className="text-secondary-500 font-mono tracking-wider uppercase text-sm mb-3">Formación adicional</h3>
        <NotchCard>
          <p className="text-primary-200 text-sm leading-relaxed">
            Más de 18 cursos completados como parte de una ruta integral en Análisis de Datos y Business Intelligence, incluyendo:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-primary-200 text-sm mt-2">
            <li>Power BI, DAX, Tableau, Looker Studio, Excel avanzado, forecasting, métricas de negocio, storytelling, estadística aplicada.</li>
            <li>Python, circuitos electrónicos, electricidad e inglés técnico enfocado en tecnología e innovación.</li>
          </ul>
        </NotchCard>
      </div>
    </div>
  )
}
