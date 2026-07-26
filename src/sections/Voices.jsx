import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import GhostNum from '../components/GhostNum.jsx'
import { testimonials } from '../data.js'
import { prefersReducedMotion } from '../anim.js'

export default function Voices() {
  const [i, setI] = useState(0)
  const [auto, setAuto] = useState(true)
  const timer = useRef(null)
  const baseRef = useRef(null)   // current photo
  const overlayRef = useRef(null) // outgoing photo (fades out on top)
  const quoteRef = useRef(null)
  const prevPhoto = useRef(testimonials[0].photo)
  const t = testimonials[i]
  const len = testimonials.length

  // Preload photos so the crossfade never waits on a network load.
  useEffect(() => {
    testimonials.forEach(tt => { const im = new Image(); im.src = tt.photo })
  }, [])

  // Smooth transition whenever the active story changes: crossfade the photo and
  // slide the quote up. The base <img> already shows the new photo (React); we
  // fade the previous photo out on top of it, then settle.
  useEffect(() => {
    const oldSrc = prevPhoto.current
    prevPhoto.current = t.photo
    if (prefersReducedMotion() || oldSrc === t.photo) return

    if (overlayRef.current) {
      overlayRef.current.src = oldSrc
      gsap.set(overlayRef.current, { autoAlpha: 1 })
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.75, ease: 'power2.inOut' })
    }
    if (baseRef.current) gsap.fromTo(baseRef.current, { scale: 1.06 }, { scale: 1, duration: 1.1, ease: 'power2.out' })
    if (quoteRef.current) {
      gsap.fromTo(quoteRef.current.querySelectorAll('p, .voices__by'),
        { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1, delay: 0.08 })
    }
  }, [i, t.photo])

  // Auto-advance until the visitor picks a story.
  useEffect(() => {
    if (!auto || prefersReducedMotion()) return
    timer.current = setInterval(() => setI(v => (v + 1) % len), 5200)
    return () => clearInterval(timer.current)
  }, [auto, len])

  const goto = idx => { clearInterval(timer.current); setAuto(false); setI(idx) }
  const move = d => goto((i + d + len) % len)

  return (
    <section className="voices section-pad">
      <div className="wrap">
        <GhostNum n="06" label="In their words" light />
        <div className="voices__head row align-items-end" data-reveal>
          <div className="col-12 col-md-8">
            <h2 className="display display--light">Breakthrough <em>stories</em></h2>
            <p className="voices__intro">Real students, real families. Discover how Fairview learners
              break barriers, surpass expectations and thrive in our personalised IB programmes.</p>
          </div>
          <div className="col-12 col-md-4">
            <div className={`voices__avatars ${auto && !prefersReducedMotion() ? 'is-auto' : ''}`}>
              {testimonials.map((tt, idx) => (
                <button key={idx} className={idx === i ? 'is-active' : ''}
                  onClick={() => goto(idx)} aria-label={`Story from ${tt.name}`}>
                  <img src={tt.avatar} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="voices__feature row g-0" data-reveal>
          <button className="c-arrow c-arrow--l" onClick={() => move(-1)} aria-label="Previous">‹</button>
          <div className="voices__photo col-12 col-md-6">
            <img ref={baseRef} className="voices__photo-layer" src={t.photo} alt={t.name} loading="lazy" />
            <img ref={overlayRef} className="voices__photo-layer voices__photo-prev" alt="" aria-hidden />
          </div>
          <div className="voices__quote col-12 col-md-6" ref={quoteRef}>
            <span className="voices__mark" aria-hidden>”</span>
            <p>{t.quote}</p>
            <div className="voices__by"><strong>{t.name}</strong><span>{t.role}</span></div>
          </div>
          <button className="c-arrow c-arrow--r" onClick={() => move(1)} aria-label="Next">›</button>
        </div>
      </div>
    </section>
  )
}
