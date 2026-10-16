import { useEffect, useState } from 'react'

/**
 * Modo liviano: celular, pantallas sin hover, movimiento reducido o CPU modesta.
 * Arranca en true para no montar efectos pesados antes de saber el dispositivo.
 */
export default function useLiteMode() {
  const [lite, setLite] = useState(true)

  useEffect(() => {
    const narrow = window.matchMedia('(max-width: 768px)').matches
    const noHover = window.matchMedia('(hover: none)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lowCpu = (navigator.hardwareConcurrency ?? 8) <= 4
    setLite(narrow || noHover || reduced || lowCpu)
  }, [])

  return lite
}
