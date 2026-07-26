import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { initAnimations } from './anim.js'
import LoadIntro from './components/LoadIntro.jsx'
import Cursor from './components/Cursor.jsx'
import Header from './components/Header.jsx'
import CampusChooser from './components/CampusChooser.jsx'
import Hero from './sections/Hero.jsx'
import Intro from './sections/Intro.jsx'
import Numbers from './sections/Numbers.jsx'
import Pillars from './sections/Pillars.jsx'
import Nurture from './sections/Nurture.jsx'
import Panorama from './sections/Panorama.jsx'
import University from './sections/University.jsx'
import Wheel from './sections/Wheel.jsx'
import Voices from './sections/Voices.jsx'
import Campuses from './sections/Campuses.jsx'
import News from './sections/News.jsx'
import Enquire from './sections/Enquire.jsx'
import Footer from './sections/Footer.jsx'
import CampusPage from './sections/CampusPage.jsx'

function Home() {
  return (
    <>
      {/* Hero is fixed; the spacer reserves its scroll length and the content
          below slides up over it as the hero shrinks away. */}
      <Hero />
      <div className="hero-spacer" aria-hidden />
      <main className="content">
        <Intro />
        <Numbers />
        <Pillars />
        <Nurture />
        <Panorama />
        <University />
        <Wheel />
        <Voices />
        <Campuses />
        <News />
        <Enquire />
      </main>
    </>
  )
}

/* scroll to top on route change (or to a #hash target if present) */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => {
    // Wait a frame so the route's DOM is present before wiring ScrollTrigger.
    let cleanup = () => {}
    const id = requestAnimationFrame(() => { cleanup = initAnimations() || (() => {}) })
    return () => { cancelAnimationFrame(id); cleanup() }
  }, [pathname])

  return (
    <>
      <LoadIntro />
      <Cursor />
      <ScrollManager />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campus/:slug" element={<CampusPage />} />
      </Routes>
      <CampusChooser />
      <Footer />
    </>
  )
}
