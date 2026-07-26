import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../anim.js'

/* Page-load curtain: a navy panel with the crest and a growing rule, then two
   halves split apart to reveal the hero. Skipped entirely for reduced motion. */
export default function LoadIntro() {
  const [gone, setGone] = useState(prefersReducedMotion())
  const top = useRef(null)
  const bot = useRef(null)
  const mark = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    document.body.classList.add('is-loading')
    const tl = gsap.timeline({ onComplete: () => { document.body.classList.remove('is-loading'); setGone(true) } })
    tl.fromTo(mark.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .fromTo('.loader__rule i', { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, '-=0.15')
      .to(mark.current, { opacity: 0, duration: 0.4, ease: 'power1.in', delay: 0.25 })
      .to(top.current, { yPercent: -100, duration: 0.8, ease: 'power4.inOut' }, '<')
      .to(bot.current, { yPercent: 100, duration: 0.8, ease: 'power4.inOut' }, '<')
    return () => tl.kill()
  }, [])

  if (gone) return null
  return (
    <div className="loader" aria-hidden>
      <span className="loader__half loader__half--top" ref={top} />
      <span className="loader__half loader__half--bot" ref={bot} />
      <div className="loader__center" ref={mark}>
        <img src="/fairview-logo-white.png" alt="" className="loader__logo" />
        <span className="loader__rule"><i /></span>
        <span className="loader__tag">A Top Global IB World School · Since 1978</span>
      </div>
    </div>
  )
}
