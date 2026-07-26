import { useEffect } from 'react'
import { initAnimations } from './anim.js'
import LoadIntro from './components/LoadIntro.jsx'
import Cursor from './components/Cursor.jsx'
import Header from './components/Header.jsx'
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

export default function App() {
  useEffect(() => {
    // Wait a frame so all sections are in the DOM before wiring ScrollTrigger.
    let cleanup = () => {}
    const id = requestAnimationFrame(() => { cleanup = initAnimations() || (() => {}) })
    return () => { cancelAnimationFrame(id); cleanup() }
  }, [])

  return (
    <>
      <LoadIntro />
      <Cursor />
      <Header />
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
      <Footer />
    </>
  )
}
