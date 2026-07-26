/* Oversized translucent section numeral. The page is a real ordered journey,
   so the sequence carries meaning rather than decoration. */
export default function GhostNum({ n, label, light }) {
  return (
    <div className={`ghost ${light ? 'ghost--light' : ''}`} data-reveal>
      <span className="ghost__num">{n}</span>
      <span className="ghost__label">{label}</span>
    </div>
  )
}
