import GhostNum from '../components/GhostNum.jsx'
import { introImg } from '../data.js'

export default function Intro() {
  return (
    <section className="intro section-pad" id="intro">
      <div className="wrap">
        <GhostNum n="01" label="Who we are" />
        <div className="row align-items-center g-5">
          <div className="col-12 col-lg-5">
            <h2 className="display" data-reveal>Space to <em>flourish</em></h2>
            <p data-reveal>
              Fairview is where potential and ambition take flight. As Malaysia’s oldest and
              largest IB World School — established in 1978 — we offer an extraordinary education
              in the heart of Asia, where academic rigour meets genuine care.
            </p>
            <p data-reveal>
              A private international school welcoming students aged 3 to 19 across the full IB
              continuum, with a personalised approach that helps every child discover their
              strengths, build confidence and prepare for the world’s best universities.
            </p>
            <a href="#" className="btn btn--outline" data-reveal data-magnetic>About Fairview</a>
          </div>
          <div className="col-12 col-lg-7">
            <div className="intro__media">
              <span className="intro__tab" data-parallax="0.12" />
              <img src={introImg} alt="Aerial view of a Fairview campus" loading="lazy" data-unmask />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
