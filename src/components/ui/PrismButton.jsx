export default function PrismButton({ children, className = '' }) {
  return <span className={`prism-button ${className}`.trim()}>{children}</span>
}
