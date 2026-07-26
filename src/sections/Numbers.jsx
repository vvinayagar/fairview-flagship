import GhostNum from '../components/GhostNum.jsx'
import { stats } from '../data.js'

/* A space-filling bento grid instead of a horizontal carousel: the #1 stat is a
   2x2 feature tile, one stat runs wide, and the rest tile in — so the grid fills
   edge to edge. anim.js animates [data-stat-grid] with a staggered pop-in and a
   pointer tilt. */
export default function Numbers() {
  return (
    <section className="numbers section-pad" id="numbers">
      <div className="wrap">
        <GhostNum n="02" label="By the numbers" />
        <h2 className="display" data-reveal>Fairview in <em>numbers</em></h2>
        <p className="lede" data-reveal>
          Nearly five decades of IB education, a nationwide campus network and thousands of
          graduates thriving at leading universities — the Fairview story, told in figures.
        </p>

        <div className="stat-grid" data-stat-grid>
          {stats.map(s => (
            <div key={s.label}
              className={`stat ${s.big ? 'stat--feature' : ''} ${s.wide ? 'stat--wide' : ''}`}>
              <span className="stat__icon" aria-hidden>★</span>
              <span className="stat__value count-text" data-count={s.value}>{s.value}</span>
              <span className="stat__label">{s.label}</span>
              {s.link && <a href="#" className="stat__link">Read more ›</a>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
