import { useEffect, useState } from 'react'
import { topNav, menuNav, stages } from '../data.js'

function Crest() {
  return (
    <a href="#top" className="crest" aria-label="Fairview International School — home">
      <img className="crest__img" src="/fairview-logo-white.png" alt="Fairview International School" />
    </a>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hovered, setHovered] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the overlay is open; close on Escape.
  useEffect(() => {
    document.body.classList.toggle('menu-lock', menuOpen)
    const onKey = e => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const solid = scrolled || menuOpen

  return (
    <>
      <header className={`hdr ${solid ? 'hdr--solid' : ''}`} id="top">
        <div className="hdr__inner">
          <Crest />
          <div className="hdr__right">
            <nav className="hdr__top" aria-label="Utility">
              {topNav.map(n => <a key={n} href="#" data-magnetic>{n}</a>)}
            </nav>
            <a href="#enquire" className="hdr__cta" data-magnetic>Book a Tour</a>
            <button
              className={`burger ${menuOpen ? 'burger--x' : ''}`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(v => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <div className={`menu ${menuOpen ? 'menu--open' : ''}`} role="dialog" aria-modal={menuOpen} aria-label="Main menu">
        <div className="menu__inner">
          <nav className="menu__links" aria-label="Primary">
            {menuNav.map((n, idx) => (
              <a key={n} href="#" onClick={() => setMenuOpen(false)} style={{ '--i': idx }}>
                <span>{n}</span>
              </a>
            ))}
          </nav>
          <div className="menu__side">
            {/* Right-side image swaps as you hover a stage card below. */}
            <div className="menu__media">
              {stages.map((a, idx) => (
                <img key={a.name} src={a.img} alt="" className={idx === hovered ? 'is-active' : ''} loading="lazy" />
              ))}
            </div>
            <ul className="menu__stages">
              {stages.map((a, idx) => (
                <li key={a.name} className={idx === hovered ? 'is-active' : ''}
                  onMouseEnter={() => setHovered(idx)} onFocus={() => setHovered(idx)}
                  onPointerDown={() => setHovered(idx)} tabIndex={0}>
                  <span className="menu__stage-name">{a.name}</span>
                  <span className="menu__stage-ages">{a.ages}</span>
                  <span className="menu__stage-arrow" aria-hidden>→</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
