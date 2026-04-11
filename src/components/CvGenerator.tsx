import { useEffect, useRef, useState } from 'react'

export default function CvGenerator() {
  const [html, setHtml] = useState<string | null>(null)

  useEffect(() => {
    // Generate a printable CV in HTML
    const cv = document.createElement('div')
    cv.style.width = '210mm'
    cv.style.minHeight = '297mm'
    cv.style.margin = '0 auto'
    cv.style.padding = '20mm'
    cv.style.fontFamily = 'Rajdhani, sans-serif'
    cv.style.background = '#fff'
    cv.style.color = '#111'
    cv.style.boxShadow = '0 0 20px rgba(0,0,0,0.3)'

    cv.innerHTML = `
      <h1 style="font-size: 32px; margin: 0 0 4px; text-transform: uppercase; color: #2be4ea;">CÉSAR REYES</h1>
      <p style="margin: 0 0 12px; font-size: 18px; color: #333;">Data · IA · Automatización</p>
      <p style="margin: 0 0 16px; font-size: 14px; color: #555;">Cali, Valle del Cauca, Colombia</p>
      <hr style="border: 0; height: 1px; background: #2be4ea; opacity: 0.7; margin-bottom: 16px;">
      
      <h2 style="font-size: 18px; margin: 0 0 6px; text-transform: uppercase; color: #2be4ea;">Resumen</h2>
      <p style="margin: 0 0 12px; font-size: 14px; color: #333; line-height: 1.45;">
        Enfocado en automatización, datos e IA, construyo sistemas útiles, medibles y trazables en entornos reales.
        Con experiencia en análisis, BI y desarrollo de soluciones low-code escalables.
      </p>
      
      <h2 style="font-size: 18px; margin: 0 0 6px; text-transform: uppercase; color: #2be4ea;">Experiencia</h2>
      <div style="margin-bottom: 12px;">
        <h3 style="font-size: 16px; margin: 0 0 2px; color: #333;">Supervisor – Postobón S.A.</h3>
        <p style="font-size: 13px; margin: 0 0 6px; color: #666;">Actual</p>
        <ul style="margin: 0 0 12px; padding-left: 18px; font-size: 13px; color: #333; line-height: 1.3;">
          <li>Supervisión operaciones diarias</li>
          <li>Asignación de tareas y seguimiento</li>
          <li>Generación de reportes de gestión</li>
          <li>Trabajo colaborativo con Mantenimiento</li>
        </ul>
      </div>
      <div>
        <h3 style="font-size: 16px; margin: 0 0 2px; color: #333;">Técnico – Postobón S.A.</h3>
        <p style="font-size: 13px; margin: 0 0 6px; color: #666;">Anterior</p>
        <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #333; line-height: 1.3;">
          <li>Soporte técnico operativo</li>
          <li>Registro de incidencias</li>
          <li>Reducción de tiempos de parada</li>
        </ul>
      </div>
      
      <h2 style="font-size: 18px; margin: 0 0 6px; text-transform: uppercase; color: #2be4ea;">Educación</h2>
      <div style="margin-bottom: 12px;">
        <h3 style="font-size: 16px; margin: 0 0 2px; color: #333;">Ingeniería en Datos e IA</h3>
        <p style="margin: 0; font-size: 13px; color: #666;">UAO — Híbrido, Plan 2021</p>
      </div>
      <div>
        <h3 style="font-size: 16px; margin: 0 0 2px; color: #333;">Tecnología en Gestión de Sistemas Mecatrónicos</h3>
        <p style="margin: 0; font-size: 13px; color: #666;">FCECEP</p>
      </div>
      
      <h2 style="font-size: 18px; margin: 0 0 6px; text-transform: uppercase; color: #2be4ea;">Skills Clave</h2>
      <p style="margin: 0 0 8px; font-size: 13px; color: #333;">
        Python, POO, SQL, Power BI, DAX, Tableau, Looker Studio, Excel, QA & Testing, Git/GitHub, HTML/CSS, Low-code, ETL, Data Warehousing, Supabase
      </p>
      
      <h2 style="font-size: 18px; margin: 0 0 6px; text-transform: uppercase; color: #2be4ea;">Contacto</h2>
      <p style="margin: 0; font-size: 13px; color: #666;">cesar.cesarreyes25@gmail.com</p>
    `

    setHtml(cv.outerHTML)
  }, [])

  const handlePrint = () => {
    const win = window.open('', '_blank')
    if (!win) return
    win.document.write('<!DOCTYPE html><html><head><title>CV - César Reyes</title>')
    win.document.write('<link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=VT323&display=swap" rel="stylesheet" />')
    win.document.write('<style>*{box-sizing:border-box} body{font-family:"Rajdhani",sans-serif;color:#333} h1{font-size:32px;margin:0 0 4px;text-transform:uppercase;color:#2be4ea} h2{font-size:18px;margin:0 0 6px;text-transform:uppercase;color:#2be4ea} h3{font-size:16px;margin:0 0 2px;color:#333} p{font-size:13px;color:#666;line-height:1.45} ul{padding-left:18px;margin:0 0 12px} li{color:#333} hr{border:0;height:1px;background:#2be4ea;opacity:.7;margin-bottom:16px}</style>')
    win.document.write('</head><body>')
    win.document.write(html || '')
    win.document.write('</body></html>')
    win.document.close()
    win.focus()
    setTimeout(() => {
      win.print()
      win.close()
    }, 250)
  }

  const handleDownload = () => {
    // Create a Blob for the PDF
    const win = window.open('', '_blank')
    if (!win) return
    win.document.write('<!DOCTYPE html><html><head><title>CV - César Reyes</title>')
    win.document.write('<link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=VT323&display=swap" rel="stylesheet" />')
    win.document.write('<style>*{box-sizing:border-box} body{font-family:"Rajdhani",sans-serif;color:#333} h1{font-size:32px;margin:0 0 4px;text-transform:uppercase;color:#2be4ea} h2{font-size:18px;margin:0 0 6px;text-transform:uppercase;color:#2be4ea} h3{font-size:16px;margin:0 0 2px;color:#333} p{font-size:13px;color:#666;line-height:1.45} ul{padding-left:18px;margin:0 0 12px} li{color:#333} hr{border:0;height:1px;background:#2be4ea;opacity:.7;margin-bottom:16px} @media print{body{width:210mm;min-height:297mm;margin:0 auto;padding:20mm;background:#fff} hr{background:#2be4ea}</style>')
    win.document.write('</head><body>')
    win.document.write(html || '')
    win.document.write('</body></html>')
    win.document.close()
    win.focus()
    setTimeout(() => {
      win.print()
    }, 250)
  }

  return (
    <div className="space-y-3">
      <h4 className="m-0 mb-1 text-secondary-500 text-sm">CV Imprimible</h4>
      <p className="text-primary-200 m-0 text-sm mb-2">
        Genera un CV profesional listo para imprimir o compartir en PDF.
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="border border-secondary-500/65 bg-black/20 text-secondary-500 font-mono tracking-wider uppercase px-3 py-2 cursor-pointer notch-clip text-[0.95rem]"
          onClick={handlePrint}
        >
          Imprimir / PDF
        </button>
        <button
          type="button"
          className="border border-secondary-500/65 bg-black/20 text-secondary-500 font-mono tracking-wider uppercase px-3 py-2 cursor-pointer notch-clip text-[0.95rem]"
          onClick={() => {
            const blob = new Blob([html || ''], { type: 'text/html' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'cv-cesar-reyes.html'
            a.click()
            URL.revokeObjectURL(url)
          }}
        >
          Descargar HTML
        </button>
      </div>
      <div className="mt-3 border border-secondary-500/35 bg-black/18 notch-clip p-2.5 overflow-hidden">
        <div
          className="w-full"
          style={{
            width: '210mm',
            height: 'min(72vh, 860px)',
            transform: 'scale(0.65)',
            transformOrigin: 'top center',
            background: '#fff',
            color: '#333',
          }}
          dangerouslySetInnerHTML={{ __html: html || '' }}
        />
      </div>
    </div>
  )
}