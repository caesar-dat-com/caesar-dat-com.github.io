import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface NebulaLayer {
  id: string
  cx: string
  cy: string
  rx: string
  ry: string
  color1: string
  color2: string
  speed: number
}

const LAYERS: NebulaLayer[] = [
  {
    id: 'nebula-1',
    cx: '25%', cy: '35%', rx: '300', ry: '200',
    color1: 'rgba(0,102,255,0.08)',
    color2: 'rgba(0,60,180,0.03)',
    speed: 0.3,
  },
  {
    id: 'nebula-2',
    cx: '70%', cy: '60%', rx: '250', ry: '180',
    color1: 'rgba(255,107,53,0.06)',
    color2: 'rgba(180,60,20,0.02)',
    speed: 0.5,
  },
  {
    id: 'nebula-3',
    cx: '50%', cy: '20%', rx: '350', ry: '150',
    color1: 'rgba(100,0,255,0.05)',
    color2: 'rgba(50,0,150,0.02)',
    speed: 0.7,
  },
]

export default function ParallaxNebula() {
  const containerRef = useRef<HTMLDivElement>(null)
  const layerRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const triggers: ScrollTrigger[] = []

    layerRefs.current.forEach((el, i) => {
      if (!el) return
      const speed = LAYERS[i].speed

      const st = ScrollTrigger.create({
        trigger: containerRef.current!,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          gsap.set(el!, { y: self.progress * -200 * speed })
        },
      })

      triggers.push(st)
    })

    return () => {
      triggers.forEach(t => t.kill())
    }
  }, [])

  // Respect reduced motion
  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  if (prefersReduced) return null

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {LAYERS.map((layer, i) => (
        <div
          key={layer.id}
          ref={(el) => { layerRefs.current[i] = el }}
          className="absolute will-change-transform"
          style={{ left: 0, top: 0, width: '100%', height: '100%' }}
        >
          <svg
            className="absolute"
            style={{ left: layer.cx, top: layer.cy, transform: 'translate(-50%, -50%)' }}
            width={layer.rx}
            height={layer.ry}
            viewBox={`0 0 ${layer.rx} ${layer.ry}`}
          >
            <defs>
              <radialGradient id={`grad-${layer.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={layer.color1} />
                <stop offset="100%" stopColor={layer.color2} />
              </radialGradient>
            </defs>
            <ellipse
              cx={parseInt(layer.rx) / 2}
              cy={parseInt(layer.ry) / 2}
              rx={parseInt(layer.rx) / 2}
              ry={parseInt(layer.ry) / 2}
              fill={`url(#grad-${layer.id})`}
            />
          </svg>
        </div>
      ))}
    </div>
  )
}