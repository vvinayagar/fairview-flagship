import GhostNum from '../components/GhostNum.jsx'
import { news } from '../data.js'

export default function News() {
  const [feat, ...rest] = news
  return (
    <section className="news section-pad">
      <div className="wrap">
        <GhostNum n="08" label="Latest" />
        <div className="news__head" data-reveal>
          <h2 className="display">From the <em>newsroom</em></h2>
          <a href="#" className="btn btn--navy" data-magnetic>See all news</a>
        </div>
        <div className="news__grid row g-4" data-reveal>
          <article className="news-feature col-12 col-lg-7">
            <div className="news-feature__img">
              <span className="news-tag">{feat.tag}</span>
              <img src={feat.photo} alt="" loading="lazy" />
            </div>
            <span className="news-date">{feat.date}</span>
            <h3>{feat.title}</h3>
            <a href="#" className="read-more">Read more ›</a>
          </article>
          <div className="news-side col-12 col-lg-5">
            {rest.map(n => (
              <article className="news-row" key={n.title}>
                <div className="news-row__img"><img src={n.photo} alt="" loading="lazy" /></div>
                <div>
                  <span className="news-date">{n.date} · {n.tag}</span>
                  <h4>{n.title}</h4>
                  <a href="#" className="read-more">Read more ›</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
