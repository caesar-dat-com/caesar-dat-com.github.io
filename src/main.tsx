import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import App from './App'
import './index.css'

// Initialize Lenis smooth scroll
const lenis = new Lenis({
  lerp: 0.1,
  smoothWheel: true,
})

function raf(time: number) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Expose lenis globally for GSAP ScrollTrigger integration
;(window as any).__lenis = lenis

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)