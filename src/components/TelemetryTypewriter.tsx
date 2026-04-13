import { useState, useEffect, useRef, useCallback } from 'react'

interface TelemetryTypewriterProps {
  className?: string
}

const LINES = [
  'ALT: 404km | VEL: 28,000km/h | STATUS: NOMINAL',
  'SIGNAL: STRONG | LAT: 3.45°N | LON: 76.53°W',
  'SYS: ONLINE | PWR: 98% | LINK: STABLE',
  'DATA: STREAMING | MISSION: ARTEMIS-VII',
  'COMMS: GREEN | NAV: LOCKED | ORBIT: LEO',
]

export default function TelemetryTypewriter({ className = '' }: TelemetryTypewriterProps) {
  const [text, setText] = useState('')
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const currentLine = LINES[lineIndex]

    if (!isDeleting) {
      if (charIndex < currentLine.length) {
        timeoutRef.current = setTimeout(() => {
          setText(currentLine.slice(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        }, 30 + Math.random() * 40)
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true)
        }, 3000)
      }
    } else {
      if (charIndex > 0) {
        timeoutRef.current = setTimeout(() => {
          setText(currentLine.slice(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        }, 15)
      } else {
        setIsDeleting(false)
        setLineIndex((lineIndex + 1) % LINES.length)
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [charIndex, isDeleting, lineIndex])

  return (
    <div className={`font-mono text-xs tracking-widest text-text-muted ${className}`}>
      <span className="text-orbital/60">{'// '}</span>
      {text}
      <span className="typewriter-cursor" />
    </div>
  )
}