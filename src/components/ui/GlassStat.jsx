export default function GlassStat({ value, label }) {
  return (
    <article className="glass-stat">
      <span className="glass-stat-value">{value}</span>
      <span className="glass-stat-label">{label}</span>
    </article>
  )
}
