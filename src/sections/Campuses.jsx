import GhostNum from '../components/GhostNum.jsx'
import { campuses } from '../data.js'

export default function Campuses() {
  return (
    <section className="campus section-pad" id="campus">
      <div className="wrap">
        <GhostNum n="07" label="Find your campus" />
        <div className="campus__head" data-reveal>
          <h2 className="display">Choose your <em>campus</em></h2>
          <p>Explore Fairview’s campuses across Kuala Lumpur, Subang, Ipoh, Penang and Johor.</p>
          <a href="#" className="btn btn--outline" data-magnetic>Show on map</a>
        </div>
        <div className="row g-4" data-reveal-group>
          {campuses.map(c => (
            <div className="col-12 col-md-6 col-lg-4" key={c.name} data-reveal-item>
              <article className="campus-card">
                <div className="campus-card__img"><img src={c.photo} alt={c.name} loading="lazy" /></div>
                <div className="campus-card__body">
                  <h3>{c.name}</h3>
                  <span className="campus-card__place">📍 {c.place}</span>
                  <div className="campus-card__meta">
                    <span className="campus-card__age">{c.ages}</span>
                    {c.tags.map(t => <span key={t} className="chip">{t}</span>)}
                  </div>
                  <a href="#" className="campus-card__more">More details ›</a>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
