export default function AuraPanel({ children, className = '' }) {
  return <div className={`aura-panel ${className}`.trim()}>{children}</div>
}
