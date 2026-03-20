export default function NeoBadge({ children, className = '' }) {
  return <span className={`neo-badge ${className}`.trim()}>{children}</span>
}
