import { useState, useRef, useEffect } from 'react'
import GhostNum from '../components/GhostNum.jsx'
import { skills } from '../data.js'
import { prefersReducedMotion } from '../anim.js'

/* IB Learner Profile wheel — a live dial. It auto-rotates slowly, you can drag
   it round, and scrolling the wheel while hovering spins it too. Whichever
   cluster sits under the top dot becomes active and drives the cards + blurb. */
const WHEEL = { cx: 280, cy: 280, R: 250, TR: 250 }
const wheelPoint = (deg, r = WHEEL.TR) => {
  const a = (deg * Math.PI) / 180
  return [WHEEL.cx + r * Math.cos(a), WHEEL.cy + r * Math.sin(a)]
}
const wheelArc = (deg, span = 58) => {
  const [x1, y1] = wheelPoint(deg - span / 2)
  const [x2, y2] = wheelPoint(deg + span / 2)
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${WHEEL.TR} ${WHEEL.TR} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`
}

export default function Wheel() {
  const [active, setActive] = useState(0)
  const wrapRef = useRef(null)   // the interactive .wheel box
  const groupRef = useRef(null)  // the rotating <g> of labels
  const rot = useRef(0)          // current rotation, degrees
  const vel = useRef(0)          // angular velocity for inertia
  const target = useRef(null)    // ease-to angle when a cluster is picked
  const drag = useRef(null)      // active drag session
  const hover = useRef(false)    // pause auto-spin while pointer is over it
  const activeRef = useRef(0)
  const n = skills.length
  const step = 360 / n

  /* one rAF loop: auto-spin + inertia + ease-to-target, and derive active idx */
  useEffect(() => {
    const reduce = prefersReducedMotion()
    const AUTO = reduce ? 0 : 0.12
    let raf
    const apply = () => {
      if (groupRef.current) groupRef.current.style.transform = `rotate(${rot.current}deg)`
      const idx = (((Math.round(-rot.current / step)) % n) + n) % n
      if (idx !== activeRef.current) { activeRef.current = idx; setActive(idx) }
    }
    const tick = () => {
      if (!drag.current) {
        if (target.current != null) {
          rot.current += (target.current - rot.current) * (reduce ? 1 : 0.14)
          if (Math.abs(target.current - rot.current) < 0.08) { rot.current = target.current; target.current = null }
        } else {
          if (!hover.current) rot.current += AUTO
          if (!reduce) {
            rot.current += vel.current
            vel.current *= 0.95
            if (Math.abs(vel.current) < 0.004) vel.current = 0
          }
        }
      }
      apply()
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [n, step])

  /* wheel-scroll to spin (native listener so we can preventDefault) */
  useEffect(() => {
    const el = wrapRef.current
    const onWheel = e => {
      e.preventDefault()
      target.current = null
      rot.current += e.deltaY * 0.18
      if (!prefersReducedMotion()) vel.current = Math.max(-9, Math.min(9, e.deltaY * 0.05))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const centerOf = () => {
    const r = wrapRef.current.getBoundingClientRect()
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
  }
  const angleAt = (e, c) => (Math.atan2(e.clientY - c.y, e.clientX - c.x) * 180) / Math.PI

  const onPointerDown = e => {
    const c = centerOf()
    drag.current = { c, lastAngle: angleAt(e, c), total: 0, moved: false }
    target.current = null
    vel.current = 0
    try { wrapRef.current.setPointerCapture(e.pointerId) } catch { /* noop */ }
  }
  const onPointerMove = e => {
    const d = drag.current
    if (!d) return
    const a = angleAt(e, d.c)
    let da = a - d.lastAngle
    if (da > 180) da -= 360
    if (da < -180) da += 360
    d.lastAngle = a
    d.total += Math.abs(da)
    if (d.total > 3) d.moved = true
    rot.current += da
    vel.current = da
  }
  const onPointerUp = e => {
    if (drag.current) { try { wrapRef.current.releasePointerCapture(e.pointerId) } catch { /* noop */ } }
    drag.current = null
  }

  // click a label / arrow → ease that cluster to the top (shortest path)
  const selectCluster = idx => {
    if (drag.current && drag.current.moved) return
    const base = -idx * step
    const k = Math.round((rot.current - base) / 360)
    target.current = base + k * 360
    vel.current = 0
  }

  const s = skills[active]

  return (
    <section className="wheelsec section-pad">
      <div className="wrap">
        <GhostNum n="05" label="How they grow" />
        <div className="text-center" data-reveal>
          <h2 className="display">The IB <em>Learner Profile</em></h2>
          <p className="lede">At the heart of every IB programme are ten attributes that shape how
            Fairview students think, communicate and act. Explore the five clusters we nurture at
            every stage of the journey.</p>
        </div>
        <div className="row align-items-center g-5">
          <div className="col-12 col-lg-5" data-reveal>
            <span className="wheelsec__cat" style={{ color: s.color }}>{s.key}</span>
            <div className="wheelsec__cards">
              {s.items.map(it => (
                <div className="skill-card" key={it.title} style={{ borderColor: s.color }}>
                  <h4>{it.title}</h4>
                  <p>{it.text}</p>
                </div>
              ))}
            </div>
            <div className="wheelsec__nav">
              <button onClick={() => selectCluster((active - 1 + n) % n)} aria-label="Previous cluster">←</button>
              <button onClick={() => selectCluster((active + 1) % n)} aria-label="Next cluster">→</button>
            </div>
          </div>
          <div className="col-12 col-lg-7" data-reveal>
            <div
              className="wheel"
              ref={wrapRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onMouseEnter={() => { hover.current = true }}
              onMouseLeave={() => { hover.current = false }}
            >
              <svg viewBox="0 0 560 560" className="wheel__svg" role="group" aria-label="IB Learner Profile clusters — drag or scroll to rotate">
                <defs>
                  {skills.map((sk, idx) => (
                    <path key={sk.key} id={`arc-${idx}`} d={wheelArc(-90 + idx * step)} fill="none" />
                  ))}
                </defs>
                <circle className="wheel__ring" cx={WHEEL.cx} cy={WHEEL.cy} r={WHEEL.R} fill="none" />
                <circle className="wheel__dot" cx={WHEEL.cx} cy={WHEEL.cy - WHEEL.R} r="16" fill={s.color} />
                <g ref={groupRef} className="wheel__labels"
                  style={{ transformOrigin: `${WHEEL.cx}px ${WHEEL.cy}px`, transition: 'none' }}>
                  {skills.map((sk, idx) => (
                    <text key={sk.key} className={`wheel__label ${idx === active ? 'is-active' : ''}`}
                      fill={sk.color} onClick={() => selectCluster(idx)}>
                      <textPath href={`#arc-${idx}`} startOffset="50%" textAnchor="middle">{sk.key}</textPath>
                    </text>
                  ))}
                </g>
                <foreignObject x="150" y="200" width="260" height="180">
                  <p className="wheel__blurb">{s.blurb}</p>
                </foreignObject>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
