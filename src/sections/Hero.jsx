import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { heroVideo, heroPoster, socials } from '../data.js'
import { prefersReducedMotion } from '../anim.js'
import { openCampusChooser } from '../components/CampusChooser.jsx'

/* Ambient particle drift over the hero video — light, GPU-cheap, and skipped
   entirely for reduced motion. */
function Particles() {
  const ref = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf, w, h
    const dots = []
    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    resize()
    const N = Math.min(70, Math.floor(w / 20))
    for (let i = 0; i < N; i++)
      dots.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.25, vy: -Math.random() * 0.35 - 0.05, a: Math.random() * 0.5 + 0.2 })
    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy
        if (d.y < -5) { d.y = h + 5; d.x = Math.random() * w }
        if (d.x < -5) d.x = w + 5; if (d.x > w + 5) d.x = -5
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(244,211,0,${d.a})`
        ctx.fill()
      })
      raf = requestAnimationFrame(tick)
    }
    tick()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas className="hero__particles" ref={ref} aria-hidden />
}

function Announce() {
  const [open, setOpen] = useState(true)
  if (!open) return null
  return (
    <div className="announce" data-reveal>
      <div>
        <span className="announce__kicker">Whole Campus Open Day</span>
        <span className="announce__date">Saturday, 4 October 2026</span>
      </div>
      <a href="#enquire" className="announce__btn" data-magnetic>RSVP</a>
      <button className="announce__x" onClick={() => setOpen(false)} aria-label="Dismiss announcement">×</button>
    </div>
  )
}

export default function Hero() {
  const titleRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const words = titleRef.current.querySelectorAll('.hero__word > span')
    gsap.set(words, { yPercent: 120 })
    gsap.to(words, { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.09, delay: 0.35 })
    gsap.fromTo('.hero__eyebrow, .hero__lede, .hero__cta',
      { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.9 })
  }, [])

  const title = ['Where', 'potential', 'takes', 'flight']

  return (
    <section className="hero">
      <div className="hero__media">
        <video className="hero__video" autoPlay muted loop playsInline poster={heroPoster}>
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>
      <span className="hero__scrim" />
      <span className="hero__grad" aria-hidden />
      <Particles />

      <div className="hero__content">
        <span className="hero__eyebrow">A Private IB World School · Malaysia · Since 1978</span>
        <h1 className="hero__title" ref={titleRef}>
          {title.map((w, i) => (
            <span className="hero__word" key={i}><span>{w}</span></span>
          ))}
        </h1>
        <p className="hero__lede">
          Fairview is where every child discovers their strengths, finds the confidence to go
          further, and earns a place at the world’s leading universities.
        </p>
        <div className="hero__cta">
          <button className="btn btn--gold" data-magnetic onClick={openCampusChooser}>Find a Fairview near you</button>
          <a href="#numbers" className="btn btn--ghost" data-magnetic>Why Fairview</a>
        </div>
      </div>

      <div className="hero__socials">
        {socials.map((s, i) => <a key={i} href="#" aria-label="Social link">{s}</a>)}
      </div>
      <div className="hero__rail">A Top Global IB World School</div>
      <a href="#intro" className="hero__scroll" aria-label="Scroll to content"><span /></a>
      <Announce />
    </section>
  )
}
