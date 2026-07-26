import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { topNav, menuNav, stages } from '../data.js'
import { openCampusChooser } from './CampusChooser.jsx'

function Crest() {
  return (
    <Link to="/" className="crest" aria-label="Fairview International School — home">
      <img className="crest__img" src="/fairview-logo-white.png" alt="Fairview International School" />
    </Link>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hovered, setHovered] = useState(0)
  const { pathname } = useLocation()

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

  const solid = scrolled || menuOpen || pathname !== '/'

  return (
    <>
      <header className={`hdr ${solid ? 'hdr--solid' : ''}`} id="top">
        <div className="hdr__inner">
          <Crest />
          <div className="hdr__right">
            <nav className="hdr__top" aria-label="Utility">
              {topNav.map(n => <a key={n} href="#" data-magnetic>{n}</a>)}
            </nav>
            <button className="hdr__cta hdr__cta--ghost" data-magnetic onClick={openCampusChooser}>Choose campus</button>
            <Link to="/#enquire" className="hdr__cta" data-magnetic>Book a Tour</Link>
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
              <a key={n} href="#" style={{ '--i': idx }}
                onClick={e => { e.preventDefault(); setMenuOpen(false); if (n === 'Our Campuses') openCampusChooser() }}>
                <span>{n}</span>
              </a>
            ))}
            {/* mobile-only actions (the header CTAs are hidden on small screens) */}
            <div className="menu__actions">
              <button className="menu__cta menu__cta--ghost" onClick={() => { setMenuOpen(false); openCampusChooser() }}>Choose campus</button>
              <Link to="/#enquire" className="menu__cta menu__cta--gold" onClick={() => setMenuOpen(false)}>Book a Tour</Link>
            </div>
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
