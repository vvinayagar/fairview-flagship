import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../anim.js'

/* Custom cursor: a small dot that tracks precisely, and a ring that lags behind
   and swells over interactive targets. Disabled for touch and reduced motion. */
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    if (window.matchMedia('(hover: none)').matches) return
    document.body.classList.add('has-cursor')

    const xDot = gsap.quickTo(dot.current, 'x', { duration: 0.08, ease: 'power3' })
    const yDot = gsap.quickTo(dot.current, 'y', { duration: 0.08, ease: 'power3' })
    const xRing = gsap.quickTo(ring.current, 'x', { duration: 0.35, ease: 'power3' })
    const yRing = gsap.quickTo(ring.current, 'y', { duration: 0.35, ease: 'power3' })

    const move = e => {
      xDot(e.clientX); yDot(e.clientY); xRing(e.clientX); yRing(e.clientY)
    }
    const over = e => {
      if (e.target.closest('a, button, input, select, textarea, [data-magnetic], .wheel__label'))
        ring.current.classList.add('cursor__ring--active')
    }
    const out = e => {
      if (e.target.closest('a, button, input, select, textarea, [data-magnetic], .wheel__label'))
        ring.current.classList.remove('cursor__ring--active')
    }
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    return () => {
      document.body.classList.remove('has-cursor')
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
    }
  }, [])

  return (
    <>
      <span className="cursor__dot" ref={dot} aria-hidden />
      <span className="cursor__ring" ref={ring} aria-hidden />
    </>
  )
}
