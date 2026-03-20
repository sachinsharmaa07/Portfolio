export default function Footer() {
  return (
    <footer
      className="py-8"
      style={{ background: 'var(--color-void)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>
          Designed & Built by <span style={{ color: 'var(--color-cyan)' }}>Sachin Kumar</span>
        </p>
        <p className="text-xs" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)', opacity: 0.6 }}>
          React · Three.js · Framer Motion | © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
