import { useState, useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import GhostNum from '../components/GhostNum.jsx'
import { pillars } from '../data.js'
import { prefersReducedMotion } from '../anim.js'

/* "Imagine a school that…" — auto-cycles through the pillars, and each image
   change plays a puzzle transition: the current photo is sliced into jigsaw
   pieces that scatter away in 3D to reveal the next photo underneath.
   (Adapted from the hero-banner-checker-puzzle-react reference.) */
export default function Pillars() {
  const [i, setI] = useState(0)
  const [auto, setAuto] = useState(true)
  const stageRef = useRef(null)
  const imgRef = useRef(null)
  const layerRef = useRef(null)
  const busy = useRef(false)
  const idxRef = useRef(0)
  const timer = useRef(null)

  // Preload every photo so the reveal underneath the pieces is instant.
  useEffect(() => {
    pillars.forEach(p => { const im = new Image(); im.src = p.photo })
  }, [])

  const go = useCallback(next => {
    const nextIndex = (next + pillars.length) % pillars.length
    if (nextIndex === idxRef.current) return
    const img = imgRef.current
    const layer = layerRef.current
    const stage = stageRef.current

    // reduced motion, or image not ready → swap instantly
    if (!stage || !img || !layer || prefersReducedMotion() || !img.complete || !img.naturalWidth) {
      idxRef.current = nextIndex
      setI(nextIndex)
      return
    }
    if (busy.current) return
    busy.current = true

    const rect = stage.getBoundingClientRect()
    const size = {
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    }
    // Slice the CURRENT photo before React swaps the src. The pieces fully tile
    // the image, so they hide the swap underneath.
    const pieces = createPuzzlePieces(img, size)
    const nodes = pieces.map(pc => pc.canvas)
    nodes.forEach(node => layer.appendChild(node))
    gsap.set(nodes, { force3D: true }) // promote to GPU layers up front

    // Reveal the next photo underneath and let it settle in.
    idxRef.current = nextIndex
    setI(nextIndex)
    gsap.fromTo(img, { scale: 1.05 }, { scale: 1, duration: 1.1, ease: 'power2.out' })

    // Start the scatter on the NEXT frame, after the reveal + React reflow have
    // committed — otherwise piece creation and layout hitch the first frames.
    requestAnimationFrame(() => {
      const tl = gsap.timeline({
        onComplete: () => { nodes.forEach(node => node.remove()); busy.current = false },
      })
      animatePuzzlePieces(tl, pieces, size)
    })
  }, [])

  // Auto-cycle the pillars until the visitor picks one.
  useEffect(() => {
    if (!auto || prefersReducedMotion()) return
    timer.current = setInterval(() => go(idxRef.current + 1), 3600)
    return () => clearInterval(timer.current)
  }, [auto, go])

  const pick = idx => { clearInterval(timer.current); setAuto(false); go(idx) }
  const cycling = auto && !prefersReducedMotion()
  const p = pillars[i]

  return (
    <section className="pillars section-pad">
      <div className="wrap">
        <GhostNum n="03" label="The difference" />
        <h2 className="display text-center" data-reveal>Imagine a school that&hellip;</h2>
        <div className={`tabs ${cycling ? 'is-auto' : ''}`} data-reveal role="tablist" aria-label="What makes Fairview different">
          {pillars.map((pp, idx) => (
            <button key={pp.title} role="tab" aria-selected={idx === i}
              className={idx === i ? 'is-active' : ''} onClick={() => pick(idx)}>
              {pp.title}
            </button>
          ))}
        </div>
        <div className="pillars__panel row align-items-center g-0" data-reveal>
          <div className="pillars__text col-12 col-md-6">
            <h3 key={p.title}>{p.title}</h3>
            <p>{p.text}</p>
            <div className="pillars__actions">
              <a href="#" className="btn btn--navy" data-magnetic>{p.cta}</a>
              <div className="pillars__nav">
                <button onClick={() => pick((i - 1 + pillars.length) % pillars.length)} aria-label="Previous pillar">‹</button>
                <button onClick={() => pick((i + 1) % pillars.length)} aria-label="Next pillar">›</button>
              </div>
            </div>
          </div>
          <div className="pillars__photo col-12 col-md-6">
            <div className="puzzle-stage" ref={stageRef}>
              <img ref={imgRef} src={p.photo} alt={p.title} />
              <div className="puzzle-layer" ref={layerRef} aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- puzzle slicing + scatter (adapted from the reference) ---------- */
const randomRange = (min, max) => min + Math.random() * (max - min)
const randomSign = () => (Math.random() > 0.5 ? 1 : -1)
const clampNumber = (v, min, max) => Math.max(min, Math.min(max, v))

function createPuzzlePieces(img, size) {
  const { width, height, dpr } = size
  const cols = 5
  const rows = clampNumber(Math.round((cols * height) / width), 3, 5)
  const cellW = width / cols
  const cellH = height / rows
  const tab = Math.min(cellW, cellH) * 0.18
  const rightTabs = Array.from({ length: rows }, () => Array.from({ length: cols - 1 }, randomSign))
  const bottomTabs = Array.from({ length: rows - 1 }, () => Array.from({ length: cols }, randomSign))
  const pieces = []

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = col * cellW
      const y = row * cellH
      const box = {
        x: Math.max(0, x - tab), y: Math.max(0, y - tab),
        right: Math.min(width, x + cellW + tab), bottom: Math.min(height, y + cellH + tab),
      }
      box.width = box.right - box.x
      box.height = box.bottom - box.y

      const edges = {
        top: row === 0 ? 0 : -bottomTabs[row - 1][col],
        right: col === cols - 1 ? 0 : rightTabs[row][col],
        bottom: row === rows - 1 ? 0 : bottomTabs[row][col],
        left: col === 0 ? 0 : -rightTabs[row][col - 1],
      }

      const canvas = document.createElement('canvas')
      canvas.className = 'puzzle-piece'
      canvas.width = Math.ceil(box.width * dpr)
      canvas.height = Math.ceil(box.height * dpr)
      canvas.style.width = `${box.width}px`
      canvas.style.height = `${box.height}px`
      canvas.style.left = `${box.x}px`
      canvas.style.top = `${box.y}px`

      const ctx = canvas.getContext('2d')
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.translate(-box.x, -box.y)
      drawPuzzlePath(ctx, x, y, cellW, cellH, tab, edges)
      ctx.clip()
      // draw the whole image scaled to the stage; the clip keeps just this piece
      ctx.drawImage(img, 0, 0, width, height)
      ctx.lineWidth = 1.1
      ctx.strokeStyle = 'rgba(255,255,255,0.34)'
      drawPuzzlePath(ctx, x, y, cellW, cellH, tab, edges)
      ctx.stroke()

      pieces.push({ canvas, center: { x: x + cellW / 2, y: y + cellH / 2 } })
    }
  }
  return pieces
}

function animatePuzzlePieces(timeline, pieces, size) {
  const center = { x: size.width * 0.5, y: size.height * 0.52 }
  pieces.forEach(piece => {
    const dx = piece.center.x - center.x
    const dy = piece.center.y - center.y
    const distance = Math.max(1, Math.hypot(dx, dy))
    const travel = 90 + distance * 0.34 + randomRange(20, 120)
    timeline.to(piece.canvas, {
      x: (dx / distance) * travel + randomRange(-60, 60),
      y: (dy / distance) * travel + randomRange(-30, 100),
      z: randomRange(-460, -110),
      rotationX: randomRange(-38, 38),
      rotationY: randomRange(-44, 44),
      rotationZ: randomRange(-22, 22),
      opacity: 0,
      duration: randomRange(0.8, 1.15),
      ease: 'power3.in',
    }, 0.1 + distance * 0.0007 + randomRange(0, 0.12))
  })
}

function drawPuzzlePath(ctx, x, y, width, height, tab, edges) {
  ctx.beginPath()
  ctx.moveTo(x, y)
  puzzleEdge(ctx, x, y, x + width, y, 0, -1, edges.top, tab)
  puzzleEdge(ctx, x + width, y, x + width, y + height, 1, 0, edges.right, tab)
  puzzleEdge(ctx, x + width, y + height, x, y + height, 0, 1, edges.bottom, tab)
  puzzleEdge(ctx, x, y + height, x, y, -1, 0, edges.left, tab)
  ctx.closePath()
}

function puzzleEdge(ctx, x1, y1, x2, y2, nx, ny, type, tab) {
  const dx = x2 - x1
  const dy = y2 - y1
  if (!type) { ctx.lineTo(x2, y2); return }
  const amp = tab * type
  const p = v => [x1 + dx * v, y1 + dy * v]
  const a = p(0.32); const b = p(0.42); const c = p(0.5); const d = p(0.58); const e = p(0.68)
  ctx.lineTo(a[0], a[1])
  ctx.bezierCurveTo(b[0] + nx * amp * 0.2, b[1] + ny * amp * 0.2, b[0] + nx * amp, b[1] + ny * amp, c[0] + nx * amp, c[1] + ny * amp)
  ctx.bezierCurveTo(d[0] + nx * amp, d[1] + ny * amp, d[0] + nx * amp * 0.2, d[1] + ny * amp * 0.2, e[0], e[1])
  ctx.lineTo(x2, y2)
}
