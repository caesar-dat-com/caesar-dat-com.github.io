import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award } from './icons'

interface RevealImageProps {
  src: string
  alt: string
  className?: string
  placeholder?: React.ReactNode
}

export default function RevealImage({
  src,
  alt,
  className = '',
  placeholder,
}: RevealImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [inView, setInView] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!imgRef.current) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(imgRef.current)
    return () => obs.disconnect()
  }, [])

  // Respect reduced motion
  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Placeholder */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-3xl bg-space-800/50"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {placeholder ?? <Award size={20} strokeWidth={1.5} />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image with circular reveal */}
      {inView && (
        <motion.img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onLoad={() => setLoaded(true)}
          initial={{ clipPath: 'circle(0% at 50% 50%)' }}
          animate={loaded ? { clipPath: 'circle(75% at 50% 50%)' } : {}}
          transition={{
            duration: prefersReduced ? 0 : 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      )}
    </div>
  )
}