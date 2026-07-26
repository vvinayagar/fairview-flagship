import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Parse "1,000+" / "97%" / "#1" -> { prefix, num, suffix, hasComma } */
function parseCount(text) {
  const m = text.trim().match(/^([^\d]*)([\d.,]+)\s*([a-zA-Z%+]*)$/)
  if (!m) return null
  const num = parseFloat(m[2].replace(/,/g, ''))
  if (isNaN(num)) return null
  return { prefix: m[1] || '', num, suffix: m[3] || '', hasComma: m[2].includes(',') }
}
const format = (n, meta) =>
  meta.prefix + (meta.hasComma ? Math.round(n).toLocaleString('en-US') : Math.round(n)) + meta.suffix

let lenis = null

/* One unified motion system. Called once after the app mounts.
   Everything degrades gracefully: with reduced motion we skip smooth scroll,
   parallax, pinning and particles, and reveal content instantly. */
export function initAnimations() {
  const reduce = prefersReducedMotion()
  ScrollTrigger.getAll().forEach(t => t.kill())

  /* ---- smooth scroll (Lenis) driving ScrollTrigger ----
     Desktop/pointer devices only. On touch we skip Lenis and let ScrollTrigger
     use native scroll, so every reveal/parallax/pin fires reliably on mobile. */
  const touch = window.matchMedia('(hover: none), (pointer: coarse)').matches
  if (!reduce && !touch && !lenis) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 0.9 })
    if (typeof window !== 'undefined') window.__lenis = lenis // exposed for anchor/scroll control
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(t => lenis.raf(t * 1000))
    gsap.ticker.lagSmoothing(0)
  }

  /* ---- count-up numbers (always run; instant when reduced) ---- */
  gsap.utils.toArray('.count-text').forEach(el => {
    const meta = parseCount(el.dataset.count || el.textContent)
    if (!meta) return
    const final = el.textContent
    if (reduce) { el.textContent = final; return }
    el.textContent = format(0, meta)
    const obj = { v: 0 }
    ScrollTrigger.create({
      trigger: el, start: 'top 92%', once: true,
      onEnter: () => gsap.to(obj, {
        v: meta.num, duration: 1.9, ease: 'power1.out',
        onUpdate: () => { el.textContent = format(obj.v, meta) },
        onComplete: () => { el.textContent = final },
      }),
    })
  })

  if (reduce) return () => {}

  /* ---- single-element reveals ---- */
  gsap.utils.toArray('[data-reveal]').forEach(el => {
    const y = parseFloat(el.dataset.reveal) || 42
    gsap.set(el, { opacity: 0, y })
    ScrollTrigger.create({
      trigger: el, start: 'top 88%', once: true,
      onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }),
    })
  })

  /* ---- staggered groups ---- */
  gsap.utils.toArray('[data-reveal-group]').forEach(group => {
    const items = group.querySelectorAll('[data-reveal-item]')
    gsap.set(items, { opacity: 0, y: 48 })
    ScrollTrigger.create({
      trigger: group, start: 'top 82%', once: true,
      onEnter: () => gsap.to(items, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12 }),
    })
  })

  /* ---- clip-path image unmask ---- */
  gsap.utils.toArray('[data-unmask]').forEach(el => {
    gsap.fromTo(el,
      { clipPath: 'inset(0 0 100% 0)' },
      { clipPath: 'inset(0 0 0% 0)', ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 45%', scrub: true } })
  })

  /* ---- parallax layers ---- */
  gsap.utils.toArray('[data-parallax]').forEach(el => {
    const speed = parseFloat(el.dataset.parallax) || 0.2
    gsap.fromTo(el, { yPercent: -speed * 50 }, {
      yPercent: speed * 50, ease: 'none',
      scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: true },
    })
  })

  /* ---- stat bento grid: staggered pop-in + pointer tilt ---- */
  const tilts = []
  const statGrid = document.querySelector('[data-stat-grid]')
  if (statGrid) {
    const cards = gsap.utils.toArray('.stat', statGrid)
    // Scatter each tile to a random place/angle/size (a fresh scatter every
    // time), then let them fly in and settle into their real grid slots.
    // xPercent/yPercent are relative to each tile's own size, so nothing
    // escapes far enough to break layout.
    const scatter = () => gsap.set(cards, {
      opacity: 0,
      xPercent: () => gsap.utils.random(-130, 130, 1),
      yPercent: () => gsap.utils.random(-110, 130, 1),
      rotation: () => gsap.utils.random(-55, 55, 1),
      scale: () => gsap.utils.random(0.25, 0.6, 0.01),
      transformOrigin: '50% 50%',
    })
    const assemble = () => gsap.to(cards, {
      opacity: 1, xPercent: 0, yPercent: 0, rotation: 0, scale: 1,
      duration: 1.05, ease: 'power4.out', overwrite: true,
      stagger: { each: 0.09, from: 'random' },
    })
    scatter()
    // No `once`: scrolling back up above the grid re-scatters it, so it replays
    // each time you scroll down into view.
    ScrollTrigger.create({
      trigger: statGrid, start: 'top 78%',
      onEnter: assemble,
      onEnterBack: assemble,
      onLeaveBack: scatter,
    })
    cards.forEach(card => {
      const rotX = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power2.out' })
      const rotY = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power2.out' })
      const move = e => {
        const r = card.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        rotY(px * 12); rotX(-py * 12)
      }
      const leave = () => { rotX(0); rotY(0) }
      card.addEventListener('mousemove', move)
      card.addEventListener('mouseleave', leave)
      tilts.push([card, move, leave])
    })
  }

  /* ---- hero shrinks & fades away over the first screen (all viewports) ---- */
  const heroEl = document.querySelector('.hero')
  const heroSpacer = document.querySelector('.hero-spacer')
  if (heroEl && heroSpacer) {
    const smaller = window.matchMedia('(max-width: 767px)').matches
    gsap.to(heroEl, {
      scale: smaller ? 0.9 : 0.85, opacity: 0,
      borderRadius: smaller ? 44 : 80, filter: 'blur(4px)', ease: 'none',
      scrollTrigger: {
        trigger: heroSpacer, start: 'top top', end: 'bottom top', scrub: 0.4,
        // hide once gone so the still-playing video can't repaint behind content
        onLeave: () => gsap.set(heroEl, { visibility: 'hidden' }),
        onEnterBack: () => gsap.set(heroEl, { visibility: 'visible' }),
      },
    })
  }

  /* ---- pinned video that scrubs with scroll ----
     Touch devices can't seek video smoothly and pinning is janky there, so on
     mobile the panorama just autoplays and the text reveals normally. */
  const pano = document.querySelector('[data-pano]')
  const panoVideo = pano && pano.querySelector('video')
  if (pano && panoVideo && touch) {
    panoVideo.muted = true
    panoVideo.loop = true
    panoVideo.play().catch(() => {})
    gsap.from(pano.querySelectorAll('.pano__eyebrow, .pano__title, .pano__hint'), {
      opacity: 0, y: 40, duration: 0.8, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: pano, start: 'top 75%', once: true },
    })
  } else if (pano && panoVideo) {
    panoVideo.pause()
    const bind = () => {
      const dur = (panoVideo.duration || 4) - 0.05
      const proxy = { t: 0 }
      // Tween a proxy under a numeric `scrub`, so ScrollTrigger eases the
      // playhead (inertia) instead of snapping currentTime 1:1 with the wheel.
      // Only seek when the frame actually changed, to avoid stacking seeks.
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: pano, start: 'top top', end: '+=190%',
          pin: true, scrub: 1.2, anticipatePin: 1,
        },
      })
      tl.to(proxy, {
        t: dur, duration: 1,
        onUpdate: () => {
          if (panoVideo.readyState >= 2 && Math.abs(panoVideo.currentTime - proxy.t) > 0.033)
            panoVideo.currentTime = proxy.t
        },
      }, 0)
      // text eases in over the first slice of the pin, then holds
      tl.from(pano.querySelectorAll('.pano__eyebrow, .pano__title, .pano__hint'),
        { opacity: 0, y: 46, duration: 0.18, stagger: 0.05, ease: 'power2.out' }, 0)
      ScrollTrigger.refresh()
    }
    if (panoVideo.readyState >= 1) bind()
    else panoVideo.addEventListener('loadedmetadata', bind, { once: true })
  }

  /* ---- magnetic buttons ---- */
  const magnets = []
  gsap.utils.toArray('[data-magnetic]').forEach(el => {
    const move = e => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - (r.left + r.width / 2)
      const y = e.clientY - (r.top + r.height / 2)
      gsap.to(el, { x: x * 0.35, y: y * 0.4, duration: 0.4, ease: 'power3.out' })
    }
    const reset = () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' })
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', reset)
    magnets.push([el, move, reset])
  })

  /* ---- settle: refresh triggers once media/fonts load, then a safety pass so
     no reveal target can stay stuck hidden (e.g. after a client-side route
     change or slow image load, esp. on mobile) ---- */
  const settle = () => {
    ScrollTrigger.refresh()
    const vh = window.innerHeight
    gsap.utils.toArray('[data-reveal], [data-reveal-item]').forEach(el => {
      const r = el.getBoundingClientRect()
      // reveal anything already within (or scrolled past the top of) the viewport
      if (r.top < vh * 0.95 && getComputedStyle(el).opacity === '0') {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      }
    })
  }
  window.addEventListener('load', settle)
  const settleTimer = setTimeout(settle, 1200)
  const settleTimer2 = setTimeout(settle, 2600)

  return () => {
    clearTimeout(settleTimer)
    clearTimeout(settleTimer2)
    window.removeEventListener('load', settle)
    magnets.forEach(([el, move, reset]) => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', reset)
    })
    tilts.forEach(([el, move, leave]) => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    })
    ScrollTrigger.getAll().forEach(t => t.kill())
  }
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true })
  else window.scrollTo(0, 0)
}
