import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { campuses } from '../data.js'
import { prefersReducedMotion } from '../anim.js'

/* Fire this from anywhere to open the immersive campus picker. */
export function openCampusChooser() {
  window.dispatchEvent(new Event('open-campus-chooser'))
}

export default function CampusChooser() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener('open-campus-chooser', onOpen)
    return () => window.removeEventListener('open-campus-chooser', onOpen)
  }, [])

  // lock body scroll + close on Escape while open
  useEffect(() => {
    if (!open) return
    document.body.classList.add('chooser-lock')
    const onKey = e => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.classList.remove('chooser-lock'); window.removeEventListener('keydown', onKey) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // entrance: panels rise + unmask in a staggered sweep (before paint, no flash)
  useLayoutEffect(() => {
    if (!open || !rootRef.current) return
    const root = rootRef.current
    const panels = root.querySelectorAll('.chooser__panel')
    const bar = root.querySelectorAll('.chooser__bar > *')
    if (prefersReducedMotion()) { gsap.set(root, { autoAlpha: 1 }); return }
    gsap.set(root, { autoAlpha: 1 })
    gsap.set(panels, { yPercent: 112, clipPath: 'inset(0 0 100% 0)' })
    gsap.set(bar, { autoAlpha: 0, y: -22 })
    const tl = gsap.timeline()
    tl.to(panels, { yPercent: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.95, ease: 'power4.out', stagger: 0.07 })
      .to(bar, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1 }, 0.35)
    return () => tl.kill()
  }, [open])

  const close = useCallback(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) { setOpen(false); return }
    const panels = root.querySelectorAll('.chooser__panel')
    gsap.to(panels, { yPercent: 112, clipPath: 'inset(0 0 100% 0)', duration: 0.5, ease: 'power3.in', stagger: 0.04 })
    gsap.to(root, { autoAlpha: 0, duration: 0.45, delay: 0.28, onComplete: () => setOpen(false) })
  }, [])

  // choose a campus: the picked panel expands to fill the screen, then navigate
  const choose = (e, c) => {
    if (prefersReducedMotion()) { setOpen(false); navigate(`/campus/${c.slug}`); return }
    const panel = e.currentTarget
    const root = rootRef.current
    const others = [...root.querySelectorAll('.chooser__panel')].filter(p => p !== panel)
    gsap.to(others, { autoAlpha: 0, duration: 0.35, ease: 'power2.in' })
    gsap.to(panel, { flexGrow: 60, duration: 0.7, ease: 'power3.inOut' })
    gsap.to(panel.querySelector('.chooser__img'), { scale: 1.18, duration: 0.9, ease: 'power2.out' })
    gsap.to(panel.querySelector('.chooser__label'), { autoAlpha: 0, duration: 0.3 })
    setTimeout(() => { setOpen(false); navigate(`/campus/${c.slug}`) }, 700)
  }

  if (!open) return null
  return (
    <div className="chooser" ref={rootRef} role="dialog" aria-modal="true" aria-label="Choose your campus">
      <div className="chooser__bar">
        <div>
          <span className="chooser__eyebrow">Six campuses across Malaysia</span>
          <h2 className="chooser__title">Choose your <em>campus</em></h2>
        </div>
        <button className="chooser__close" onClick={close} aria-label="Close campus picker"><span /><span /></button>
      </div>
      <div className="chooser__panels">
        {campuses.map((c, i) => (
          <button className="chooser__panel" key={c.slug} onClick={e => choose(e, c)}
            style={{ '--i': i }} aria-label={`View ${c.name}`}>
            <span className="chooser__img" style={{ backgroundImage: `url(${c.tall})` }} />
            <span className="chooser__scrim" />
            <span className="chooser__index">0{i + 1}</span>
            <span className="chooser__label">
              <span className="chooser__name">{c.short}</span>
              <span className="chooser__meta">{c.place}</span>
              <span className="chooser__go">View campus →</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
