import { useParams, Link } from 'react-router-dom'
import { campusBySlug, campuses } from '../data.js'
import { openCampusChooser } from '../components/CampusChooser.jsx'

export default function CampusPage() {
  const { slug } = useParams()
  const c = campusBySlug(slug)
  if (!c) {
    return (
      <main className="cp">
        <section className="cp-missing wrap">
          <h1 className="display">Campus <em>not found</em></h1>
          <p>Sorry, we couldn’t find that campus.</p>
          <Link to="/" className="btn btn--gold">Back home</Link>
        </section>
      </main>
    )
  }
  const others = campuses.filter(x => x.slug !== slug)
  const tel = c.phone.replace(/[^\d+]/g, '')
  return (
    <main className="cp">
      <section className="cp-hero" style={{ '--img': `url(${c.hero})` }}>
        <span className="cp-hero__bg" />
        <span className="cp-hero__scrim" />
        <div className="wrap cp-hero__inner">
          <Link to="/" className="cp-hero__back">← All campuses</Link>
          <span className="cp-hero__eyebrow">{c.tags[0]}</span>
          <h1 className="cp-hero__title">{c.name}</h1>
          <p className="cp-hero__place">📍 {c.place} &nbsp;·&nbsp; {c.ages}</p>
        </div>
      </section>

      <section className="cp-about section-pad">
        <div className="wrap">
          <div className="row g-5">
            <div className="col-12 col-lg-7">
              <span className="cp-kicker" data-reveal>The campus</span>
              <h2 className="display" data-reveal>About <em>{c.short}</em></h2>
              <p className="cp-lead" data-reveal>{c.blurb}</p>
              <ul className="cp-highlights" data-reveal>
                {c.highlights.map(h => <li key={h}><span className="cp-tick">✓</span>{h}</li>)}
              </ul>
              <div className="cp-tags" data-reveal>{c.tags.map(t => <span className="chip" key={t}>{t}</span>)}</div>
              <Link to="/#enquire" className="btn btn--gold" data-magnetic data-reveal>Enquire about this campus</Link>
            </div>
            <div className="col-12 col-lg-5">
              <div className="cp-card" data-reveal>
                <div className="cp-card__img"><img src={c.photo} alt={c.name} loading="lazy" /></div>
                <div className="cp-card__body">
                  <h3>Visit us</h3>
                  <p className="cp-card__addr">{c.address}</p>
                  <p className="cp-card__row"><span>Phone</span><a href={`tel:${tel}`}>{c.phone}</a></p>
                  <p className="cp-card__row"><span>Email</span><a href={`mailto:${c.email}`}>{c.email}</a></p>
                  <p className="cp-card__row"><span>Ages</span><strong>{c.ages}</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cp-others section-pad">
        <div className="wrap">
          <div className="cp-others__head" data-reveal>
            <h2 className="display display--light">Explore other <em>campuses</em></h2>
            <button className="btn btn--gold" onClick={openCampusChooser} data-magnetic>Open campus picker</button>
          </div>
          <div className="row g-4" data-reveal>
            {others.map(o => (
              <div className="col-12 col-md-6 col-lg-4" key={o.slug}>
                <Link to={`/campus/${o.slug}`} className="cp-other">
                  <div className="cp-other__img"><img src={o.photo} alt={o.name} loading="lazy" /></div>
                  <span className="cp-other__scrim" />
                  <span className="cp-other__label"><strong>{o.short}</strong><small>{o.place}</small><span className="cp-other__go">→</span></span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
