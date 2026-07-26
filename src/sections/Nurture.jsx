import { nurture } from '../data.js'

/* Heading is an array of strings; odd indices are wrapped in <em> emphasis. */
function Heading({ parts }) {
  return (
    <h2 className="display display--light" data-reveal>
      {parts.map((t, i) => (i % 2 ? <em key={i}>{t}</em> : <span key={i}>{t}</span>))}
    </h2>
  )
}

export default function Nurture() {
  return (
    <section className="nurture">
      <div className="wrap">
        {nurture.map((block, idx) => (
          <div className={`nurture__row row align-items-center g-5 ${block.reverse ? 'nurture__row--rev' : ''}`} key={idx}>
            <div className="col-12 col-lg-6 nurture__mediaCol">
              <div className="nurture__media" data-parallax="0.14">
                <img src={block.img} alt="" loading="lazy" data-unmask />
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <Heading parts={block.heading} />
              {block.body.map((t, i) => <p key={i} data-reveal>{t}</p>)}
              <a href="#" className={`btn ${block.ctaGold ? 'btn--gold' : 'btn--outline btn--outline-light'}`}
                data-reveal data-magnetic>{block.cta}</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
