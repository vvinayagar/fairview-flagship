import { useEffect, useRef, useState } from 'react'
import GhostNum from '../components/GhostNum.jsx'
import { uniStats, uniRegions, uniList } from '../data.js'
import { prefersReducedMotion } from '../anim.js'

export default function University() {
  const [region, setRegion] = useState(uniRegions[0])
  const [auto, setAuto] = useState(true)
  const mapRef = useRef(null)
  const timer = useRef(null)

  // Load the world map SVG once and inject it so region <path>s can highlight.
  useEffect(() => {
    let alive = true
    fetch('/world.svg')
      .then(r => r.text())
      .then(txt => {
        if (!alive || !mapRef.current) return
        const doc = new DOMParser().parseFromString(txt, 'image/svg+xml')
        mapRef.current.replaceChildren(doc.documentElement)
      })
      .catch(() => {})
    return () => { alive = false }
  }, [])

  // Auto-cycle the regions until the visitor picks one themselves.
  useEffect(() => {
    if (!auto || prefersReducedMotion()) return
    timer.current = setInterval(() => {
      setRegion(cur => {
        const i = uniRegions.findIndex(r => r.key === cur.key)
        return uniRegions[(i + 1) % uniRegions.length]
      })
    }, 2600)
    return () => clearInterval(timer.current)
  }, [auto])

  // A click hands control to the visitor and stops the cycle for good — clear
  // the timer immediately so no queued tick can advance past the pick.
  const pick = r => { clearInterval(timer.current); setAuto(false); setRegion(r) }
  const cycling = auto && !prefersReducedMotion()

  return (
    <section className="uni section-pad">
      <div className="wrap">
        <GhostNum n="04" label="Where they go next" />
        <div className="row g-5">
          <div className="col-12 col-lg-3" data-reveal>
            <h2 className="display">University <em>destinations</em></h2>
            <p>Fairview graduates leave with the results, skills and confidence to earn places at
              leading universities worldwide.</p>
            {uniStats.map(s => (
              <div className="uni-stat" key={s.label}>
                <span className="uni-stat__value count-text" data-count={s.value}>{s.value}</span>
                <span className="uni-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="col-12 col-lg-6" data-reveal>
            <div className={`uni-tabs ${cycling ? 'is-auto' : ''}`} role="tablist" aria-label="Region">
              {uniRegions.map(r => (
                <button key={r.key} role="tab" aria-selected={region.key === r.key}
                  className={region.key === r.key ? 'is-active' : ''} onClick={() => pick(r)}>
                  {r.label}
                </button>
              ))}
            </div>
            <div ref={mapRef} className="uni-map" data-active={region.key} role="img"
              aria-label={`World map with ${region.label} highlighted`} />
          </div>
          <div className="col-12 col-lg-3" data-reveal>
            <div className="uni-list">
              {uniList[region.label].map(u => (
                <div className="uni-list__group" key={u.country}>
                  <h4>{u.country}</h4>
                  <ul>{u.schools.map(s => <li key={s}>{s}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
