import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ===================================================
   MoonScene v2 — three.js nativo, 0 KB de red
   Texturas procedurales generadas en canvas 2D:
   albedo + displacement + rugosidad.
   Atmósfera fresnel, terminador, Tierra lejana,
   cinturón de polvo y parallax de cámara.
   =================================================== */

/* --- ruido determinista --- */
function hash(x: number) {
  const s = Math.sin(x * 127.1 + 311.7) * 43758.5453
  return s - Math.floor(s)
}

/** Dibuja la superficie lunar sobre un canvas y devuelve
 *  albedo (color) y height (relieve) en la misma pasada. */
function buildMoonMaps(size: number) {
  const albedo = document.createElement('canvas')
  albedo.width = size
  albedo.height = size / 2
  const a = albedo.getContext('2d')!

  const height = document.createElement('canvas')
  height.width = size
  height.height = size / 2
  const h = height.getContext('2d')!

  const W = albedo.width
  const H = albedo.height

  a.fillStyle = '#8b8b90'
  a.fillRect(0, 0, W, H)
  h.fillStyle = '#7f7f7f'
  h.fillRect(0, 0, W, H)

  // Mares (basalto oscuro, bajos)
  for (let i = 0; i < 9; i++) {
    const x = hash(i * 19.3 + 50) * W
    const y = hash(i * 23.7 + 100) * H * 0.7 + H * 0.15
    const rx = hash(i * 13.1 + 200) * W * 0.11 + W * 0.05
    const ry = rx * (0.55 + hash(i * 5.5) * 0.5)

    for (const [ctx, c0, c1] of [
      [a, 'rgba(72,74,86,0.62)', 'rgba(120,120,128,0)'],
      [h, 'rgba(96,96,96,0.75)', 'rgba(127,127,127,0)'],
    ] as [CanvasRenderingContext2D, string, string][]) {
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx)
      g.addColorStop(0, c0)
      g.addColorStop(0.55, c0.replace(/[\d.]+\)$/, '0.28)'))
      g.addColorStop(1, c1)
      ctx.save()
      ctx.translate(x, y)
      ctx.scale(1, ry / rx)
      ctx.beginPath()
      ctx.arc(0, 0, rx, 0, Math.PI * 2)
      ctx.fillStyle = g
      ctx.fill()
      ctx.restore()
    }
  }

  // Cráteres: borde elevado + suelo hundido + eyecta radial
  const CRATERS = 320
  for (let i = 0; i < CRATERS; i++) {
    const x = hash(i * 3.1) * W
    const y = hash(i * 7.3) * H
    const r = Math.pow(hash(i * 11.7), 3.2) * (W * 0.032) + 1.4
    const dark = hash(i * 2.1) * 0.18

    // eyecta clara alrededor de los grandes
    if (r > 12) {
      const eg = a.createRadialGradient(x, y, r, x, y, r * 2.6)
      eg.addColorStop(0, `rgba(205,205,212,${0.16 + hash(i * 1.3) * 0.14})`)
      eg.addColorStop(1, 'rgba(205,205,212,0)')
      a.beginPath()
      a.arc(x, y, r * 2.6, 0, Math.PI * 2)
      a.fillStyle = eg
      a.fill()
    }

    // suelo del cráter (oscuro / bajo)
    const ag = a.createRadialGradient(x, y, 0, x, y, r)
    ag.addColorStop(0, `rgba(54,54,60,${0.4 + dark})`)
    ag.addColorStop(0.62, `rgba(84,84,90,${0.22 + dark})`)
    ag.addColorStop(0.9, `rgba(120,120,126,${0.12 + dark})`)
    ag.addColorStop(1, 'rgba(150,150,155,0)')
    a.beginPath()
    a.arc(x, y, r, 0, Math.PI * 2)
    a.fillStyle = ag
    a.fill()

    // labio iluminado del cráter (borde nítido)
    a.beginPath()
    a.arc(x, y, r * 0.94, Math.PI * 1.15, Math.PI * 1.95)
    a.strokeStyle = `rgba(214,214,220,${0.22 + hash(i * 8.3) * 0.2})`
    a.lineWidth = Math.max(0.7, r * 0.09)
    a.stroke()

    const hg = h.createRadialGradient(x, y, 0, x, y, r)
    hg.addColorStop(0, 'rgba(52,52,52,0.92)')
    hg.addColorStop(0.68, 'rgba(80,80,80,0.62)')
    hg.addColorStop(0.84, 'rgba(215,215,215,0.85)') // labio elevado
    hg.addColorStop(0.95, 'rgba(150,150,150,0.3)')
    hg.addColorStop(1, 'rgba(127,127,127,0)')
    h.beginPath()
    h.arc(x, y, r, 0, Math.PI * 2)
    h.fillStyle = hg
    h.fill()
  }

  // Grano fino sobre el relieve (regolito)
  const hd = h.getImageData(0, 0, W, H)
  for (let i = 0; i < hd.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 22
    hd.data[i] = hd.data[i + 1] = hd.data[i + 2] = Math.min(255, Math.max(0, hd.data[i] + n))
  }
  h.putImageData(hd, 0, 0)

  const ad = a.getImageData(0, 0, W, H)
  for (let i = 0; i < ad.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 16
    ad.data[i] = Math.min(255, Math.max(0, ad.data[i] + n))
    ad.data[i + 1] = Math.min(255, Math.max(0, ad.data[i + 1] + n))
    ad.data[i + 2] = Math.min(255, Math.max(0, ad.data[i + 2] + n))
  }
  a.putImageData(ad, 0, 0)

  const mk = (c: HTMLCanvasElement, srgb: boolean) => {
    const t = new THREE.CanvasTexture(c)
    t.wrapS = THREE.RepeatWrapping
    t.wrapT = THREE.ClampToEdgeWrapping
    t.anisotropy = 4
    if (srgb) t.colorSpace = THREE.SRGBColorSpace
    return t
  }

  return { map: mk(albedo, true), displacement: mk(height, false) }
}

/* --- Atmósfera / rim glow por fresnel --- */
const atmosphereShader = {
  uniforms: {
    uColor: { value: new THREE.Color('#4f8cff') },
    uIntensity: { value: 0.3 },
    uPower: { value: 5.5 },
  },
  vertexShader: /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vView = normalize(-mv.xyz);
      gl_Position = projectionMatrix * mv;
    }
  `,
  fragmentShader: /* glsl */ `
    uniform vec3 uColor;
    uniform float uIntensity;
    uniform float uPower;
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
      float fresnel = pow(1.0 - abs(dot(vNormal, vView)), uPower);
      gl_FragColor = vec4(uColor, fresnel * uIntensity);
    }
  `,
}

function Moon({ quality }: { quality: 'low' | 'high' }) {
  const group = useRef<THREE.Group>(null)
  const mesh = useRef<THREE.Mesh>(null)
  const scrollRot = useRef(0)

  const seg = quality === 'high' ? 128 : 64
  const texSize = quality === 'high' ? 1024 : 512
  const { map, displacement } = useMemo(() => buildMoonMaps(texSize), [texSize])

  // rotación extra ligada al scroll de la página
  useEffect(() => {
    const onScroll = () => {
      scrollRot.current = window.scrollY * 0.0012
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useFrame((state, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * 0.035
    if (group.current) {
      group.current.rotation.x = scrollRot.current * 0.35
      // cabeceo suave
      const t = state.clock.elapsedTime
      group.current.position.y = Math.sin(t * 0.4) * 0.08
      group.current.rotation.z = Math.sin(t * 0.27) * 0.03
    }
  })

  return (
    <group ref={group} rotation={[0.22, 0, -0.12]}>
      <mesh ref={mesh}>
        <sphereGeometry args={[2, seg, seg]} />
        <meshStandardMaterial
          map={map}
          displacementMap={displacement}
          displacementScale={0.075}
          displacementBias={-0.035}
          bumpMap={displacement}
          bumpScale={quality === 'high' ? 1.4 : 0.8}
          roughness={0.96}
          metalness={0.0}
        />
      </mesh>

      {/* halo atmosférico */}
      <mesh scale={1.028}>
        <sphereGeometry args={[2, 48, 48]} />
        <shaderMaterial
          args={[atmosphereShader]}
          transparent
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

/* --- Cinturón de polvo orbital --- */
function DustBelt({ count = 420 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = hash(i * 1.7) * Math.PI * 2
      const radius = 2.45 + hash(i * 3.3) * 1.5
      const yJitter = (hash(i * 9.1) - 0.5) * 0.55
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = yJitter
      pos[i * 3 + 2] = Math.sin(angle) * radius
    }
    return pos
  }, [count])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.06
  })

  return (
    <points ref={ref} rotation={[0.42, 0, 0.18]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        sizeAttenuation
        color="#9fc0ff"
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* --- Tierra lejana (earthrise) --- */
function DistantEarth() {
  const ref = useRef<THREE.Mesh>(null)

  const texture = useMemo(() => {
    const size = 256
    const c = document.createElement('canvas')
    c.width = size
    c.height = size / 2
    const ctx = c.getContext('2d')!
    // océano
    const og = ctx.createLinearGradient(0, 0, 0, c.height)
    og.addColorStop(0, '#0a2d6b')
    og.addColorStop(0.5, '#0f4a9c')
    og.addColorStop(1, '#0a2d6b')
    ctx.fillStyle = og
    ctx.fillRect(0, 0, c.width, c.height)
    // continentes
    ctx.fillStyle = 'rgba(38,96,58,0.85)'
    for (let i = 0; i < 26; i++) {
      const x = hash(i * 4.1) * c.width
      const y = hash(i * 8.7) * c.height
      const r = hash(i * 12.3) * 22 + 6
      ctx.beginPath()
      ctx.ellipse(x, y, r, r * (0.4 + hash(i * 2.7) * 0.6), hash(i) * Math.PI, 0, Math.PI * 2)
      ctx.fill()
    }
    // nubes
    ctx.fillStyle = 'rgba(255,255,255,0.32)'
    for (let i = 0; i < 40; i++) {
      const x = hash(i * 6.9 + 11) * c.width
      const y = hash(i * 14.2 + 7) * c.height
      const r = hash(i * 3.7 + 3) * 16 + 4
      ctx.beginPath()
      ctx.ellipse(x, y, r, r * 0.45, 0, 0, Math.PI * 2)
      ctx.fill()
    }
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }, [])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02
  })

  return (
    <group position={[-1.65, 1.8, 0.6]}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshStandardMaterial map={texture} roughness={0.7} metalness={0.05} />
      </mesh>
      <mesh scale={1.12}>
        <sphereGeometry args={[0.34, 24, 24]} />
        <shaderMaterial
          args={[
            {
              ...atmosphereShader,
              uniforms: {
                uColor: { value: new THREE.Color('#5fa8ff') },
                uIntensity: { value: 0.8 },
                uPower: { value: 3.4 },
              },
            },
          ]}
          transparent
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

/* --- Parallax de cámara con el puntero --- */
function CameraRig({ enabled }: { enabled: boolean }) {
  const { camera } = useThree()
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled) return
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled])

  useFrame(() => {
    if (!enabled) return
    camera.position.x += (target.current.x * 0.5 - camera.position.x) * 0.04
    camera.position.y += (-target.current.y * 0.35 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })

  return null
}

export default function MoonScene() {
  const [isLunar, setIsLunar] = useState(false)
  const [quality, setQuality] = useState<'low' | 'high'>('high')
  const [rich, setRich] = useState(true)

  useEffect(() => {
    const check = () => setIsLunar(document.body.classList.contains('lunar'))
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] })

    const small = window.matchMedia('(max-width: 768px)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const weak = (navigator as any).hardwareConcurrency <= 4
    setQuality(small || weak ? 'low' : 'high')
    setRich(!small && !reduced)

    return () => obs.disconnect()
  }, [])

  return (
    <div
      className="moon-scene absolute inset-0 z-0"
      style={{
        pointerEvents: 'none',
        opacity: isLunar ? 0.42 : 1,
        transition: 'opacity 0.5s ease',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, quality === 'high' ? 1.75 : 1.25]}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        {/* luz ambiente muy baja → terminador marcado */}
        {/* ambiente casi nulo → el lado oscuro se ve oscuro de verdad */}
        <ambientLight intensity={isLunar ? 0.5 : 0.045} />
        {/* sol rasante desde la derecha: crea el terminador */}
        <directionalLight position={[6, 1.6, 1.2]} intensity={2.6} color="#fff6e6" />
        {/* rebote frío de la Tierra sobre el lado en sombra */}
        <directionalLight position={[-4, 0.5, 2.5]} intensity={0.16} color="#3f7dff" />
        {/* rim naranja SLS por detrás */}
        <pointLight position={[-3.4, 1.4, -2.4]} intensity={2.4} distance={11} color="#ff6b35" />

        <Moon quality={quality} />
        {rich && <DustBelt />}
        {rich && <DistantEarth />}
        <CameraRig enabled={rich} />
      </Canvas>
    </div>
  )
}
