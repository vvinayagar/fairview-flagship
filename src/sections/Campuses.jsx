import { Link } from 'react-router-dom'
import GhostNum from '../components/GhostNum.jsx'
import { campuses } from '../data.js'
import { openCampusChooser } from '../components/CampusChooser.jsx'

export default function Campuses() {
  return (
    <section className="campus section-pad" id="campus">
      <div className="wrap">
        <GhostNum n="07" label="Find your campus" />
        <div className="campus__head" data-reveal>
          <h2 className="display">Choose your <em>campus</em></h2>
          <p>Explore Fairview’s campuses across Kuala Lumpur, Subang, Ipoh, Penang and Johor.</p>
          <button className="btn btn--gold" data-magnetic onClick={openCampusChooser}>Open campus picker</button>
        </div>
        <div className="row g-4" data-reveal-group>
          {campuses.map(c => (
            <div className="col-12 col-md-6 col-lg-4" key={c.name} data-reveal-item>
              <Link to={`/campus/${c.slug}`} className="campus-card">
                <div className="campus-card__img"><img src={c.photo} alt={c.name} loading="lazy" /></div>
                <div className="campus-card__body">
                  <h3>{c.name}</h3>
                  <span className="campus-card__place">📍 {c.place}</span>
                  <div className="campus-card__meta">
                    <span className="campus-card__age">{c.ages}</span>
                    {c.tags.map(t => <span key={t} className="chip">{t}</span>)}
                  </div>
                  <span className="campus-card__more">More details ›</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
