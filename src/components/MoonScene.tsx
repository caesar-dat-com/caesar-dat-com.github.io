import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function MoonMesh() {
  const meshRef = useRef<THREE.Mesh>(null)

  // Procedural moon texture
  const texture = useMemo(() => {
    const size = 512
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!

    // Base gray
    ctx.fillStyle = '#8a8a8a'
    ctx.fillRect(0, 0, size, size)

    // Craters
    const seed = (x: number) => {
      const s = Math.sin(x * 127.1 + 311.7) * 43758.5453
      return s - Math.floor(s)
    }

    for (let i = 0; i < 40; i++) {
      const x = seed(i * 3.1) * size
      const y = seed(i * 7.3) * size
      const r = seed(i * 11.7) * 40 + 8
      const darkness = seed(i * 2.1) * 0.15

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, r)
      gradient.addColorStop(0, `rgba(60, 60, 60, ${0.3 + darkness})`)
      gradient.addColorStop(0.6, `rgba(80, 80, 80, ${0.15 + darkness})`)
      gradient.addColorStop(1, 'rgba(120, 120, 120, 0)')
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()
    }

    // Maria (dark patches)
    for (let i = 0; i < 6; i++) {
      const x = seed(i * 19.3 + 50) * size
      const y = seed(i * 23.7 + 100) * size * 0.8 + size * 0.1
      const rx = seed(i * 13.1 + 200) * 80 + 30
      const ry = seed(i * 17.9 + 300) * 60 + 20

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, Math.max(rx, ry))
      gradient.addColorStop(0, 'rgba(55, 55, 65, 0.4)')
      gradient.addColorStop(0.5, 'rgba(70, 70, 75, 0.2)')
      gradient.addColorStop(1, 'rgba(100, 100, 100, 0)')
      ctx.save()
      ctx.translate(x, y)
      ctx.scale(1, ry / rx)
      ctx.beginPath()
      ctx.arc(0, 0, rx, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()
      ctx.restore()
    }

    // Noise
    const imageData = ctx.getImageData(0, 0, size, size)
    for (let i = 0; i < imageData.data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 15
      imageData.data[i] = Math.min(255, Math.max(0, imageData.data[i] + noise))
      imageData.data[i + 1] = Math.min(255, Math.max(0, imageData.data[i + 1] + noise))
      imageData.data[i + 2] = Math.min(255, Math.max(0, imageData.data[i + 2] + noise))
    }
    ctx.putImageData(imageData, 0, 0)

    const tex = new THREE.CanvasTexture(canvas)
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    return tex
  }, [])

  // Bump map
  const bumpTexture = useMemo(() => {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!

    ctx.fillStyle = '#808080'
    ctx.fillRect(0, 0, size, size)

    const seed = (x: number) => {
      const s = Math.sin(x * 127.1 + 311.7) * 43758.5453
      return s - Math.floor(s)
    }

    for (let i = 0; i < 25; i++) {
      const x = seed(i * 3.1) * size
      const y = seed(i * 7.3) * size
      const r = seed(i * 11.7) * 20 + 5
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, r)
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.4)')
      gradient.addColorStop(1, 'rgba(128, 128, 128, 0)')
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()
    }

    return new THREE.CanvasTexture(canvas)
  }, [])

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          bumpMap={bumpTexture}
          bumpScale={0.04}
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>
    </Float>
  )
}

export default function MoonScene() {
  const [isLunar, setIsLunar] = useState(false)

  useEffect(() => {
    const check = () => setIsLunar(document.body.classList.contains('lunar'))
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  return (
    <div
      className={`moon-scene absolute inset-0 z-0`}
      style={{
        pointerEvents: 'none',
        opacity: isLunar ? 0.3 : 1,
        transition: 'opacity 0.5s ease',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 3, 5]} intensity={1.2} color="#c8d8ff" />
        <directionalLight position={[-3, -2, 2]} intensity={0.3} color="#ff6b35" />
        <pointLight position={[0, 0, 4]} intensity={0.2} color="#0066ff" />
        <MoonMesh />
      </Canvas>
    </div>
  )
}