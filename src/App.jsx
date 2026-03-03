import { useEffect, useRef, useState, memo, useCallback } from 'react'
import Lenis from 'lenis'

/* ===== REACT ICONS ===== */
import {
  SiReact, SiNodedotjs, SiMongodb, SiExpress, SiJavascript,
  SiTypescript, SiTailwindcss, SiGit, SiGithub, SiVite,
  SiHtml5, SiCss3, SiPython, SiCplusplus, SiMysql,
  SiPostman, SiVercel, SiNpm, SiFigma, SiLinux
} from 'react-icons/si'

/* ===== COUNTER HOOK ===== */
function useCounter(target, duration = 2200) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const t0 = performance.now()
          const tick = (now) => {
            const p = Math.min((now - t0) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setCount(Math.round(eased * target))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return [count, ref]
}

/* ===== THEME TOGGLE ===== */
const ThemeToggle = memo(function ThemeToggle({ theme, toggle }) {
  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
      {theme === 'dark' ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
})

/* ===== HERO CARD ===== */
const HeroCard = memo(function HeroCard() {
  return (
    <div className="hero-content">
      <p className="hero-label">Portfolio</p>
      <h1 className="hero-name">Sachin Kumar</h1>
      <p className="hero-tagline">
        Calm. Focused. Builder from Jammu.
      </p>
      <a
        href="/Sachin_Kumar_CV.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="hero-cv"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        View CV
      </a>
      <div className="hero-cursor" aria-hidden="true" />
    </div>
  )
})

/* ===== AKHADA ANALYTICS CARD ===== */
const AkhadaCard = memo(function AkhadaCard() {
  const [foods, foodsRef] = useCounter(900, 2400)
  const [exercises, exRef] = useCounter(500, 2600)
  const [apis, apisRef] = useCounter(20, 1600)

  const bars = [40, 62, 48, 78, 55, 88, 66, 82, 50, 74, 60, 85]

  const features = [
    { icon: '\u{1F3CB}', title: 'Workout Tracking', desc: 'Log sets, reps, weights with exercise library' },
    { icon: '\u{1F34E}', title: 'Nutrition Logging', desc: '900+ foods with macro & calorie breakdown' },
    { icon: '\u{1F4CA}', title: 'Body Analytics', desc: 'Progress charts, BMI, body composition tracking' },
    { icon: '\u{1F525}', title: 'Interactive Heatmap', desc: 'Muscle group targeting visualization' },
    { icon: '\u{1F512}', title: 'JWT Dual-Token Auth', desc: 'Secure access + refresh token architecture' },
    { icon: '\u{1F310}', title: 'OAuth 2.0', desc: 'Google sign-in with social authentication' },
  ]

  return (
    <div className="akhada-content">
      <div className="akhada-header">
        <span className="card-label">Featured Project</span>
        <h2 className="akhada-title">Akhada Analytics</h2>
        <p className="akhada-desc">
          Fitness intelligence platform. Track workouts, log nutrition,
          analyze progress &#8212; built for athletes who train with intention.
        </p>
      </div>

      <div className="akhada-features">
        {features.map((f) => (
          <div key={f.title} className="feature">
            <span className="feature-icon">{f.icon}</span>
            <div className="feature-text">
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="akhada-metrics">
        <div className="metric" ref={foodsRef}>
          <span className="metric-value">{foods}+</span>
          <span className="metric-label">Foods in Database</span>
        </div>
        <div className="metric" ref={exRef}>
          <span className="metric-value">{exercises}+</span>
          <span className="metric-label">Exercises Cataloged</span>
        </div>
        <div className="metric" ref={apisRef}>
          <span className="metric-value">{apis}+</span>
          <span className="metric-label">API Routes</span>
        </div>
      </div>

      <div className="akhada-chart">
        {bars.map((h, i) => (
          <div key={i} className="chart-bar" style={{ '--h': `${h}%`, '--d': `${i * 70}ms` }} />
        ))}
      </div>

      <div className="akhada-stack">
        {['React 19', 'Node.js', 'MongoDB', 'Express 5', 'JWT', 'OAuth 2.0', 'Chart.js', 'Tailwind CSS'].map((t) => (
          <span key={t} className="stack-tag">{t}</span>
        ))}
      </div>

      <div className="akhada-links">
        <a href="https://akhada-anlaytics.vercel.app/login" target="_blank" rel="noopener noreferrer" className="card-link">
          View Live &#8599;
        </a>
        <a href="https://github.com/sachinsharmaa07/Akhada-Anlaytics" target="_blank" rel="noopener noreferrer" className="card-link card-link--secondary">
          Source &#8599;
        </a>
      </div>
    </div>
  )
})

/* ===== SIMULATOR CARD ===== */
const SimulatorCard = memo(function SimulatorCard() {
  const [step, setStep] = useState(0)

  const steps = [
    { frames: ['\u2014', '\u2014', '\u2014'], page: '7', fault: true },
    { frames: ['7', '\u2014', '\u2014'], page: '0', fault: true },
    { frames: ['7', '0', '\u2014'], page: '1', fault: true },
    { frames: ['7', '0', '1'], page: '2', fault: true },
    { frames: ['2', '0', '1'], page: '0', fault: false },
    { frames: ['2', '0', '1'], page: '3', fault: true },
    { frames: ['2', '3', '1'], page: '0', fault: true },
    { frames: ['0', '3', '1'], page: '4', fault: true },
  ]

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s + 1) % steps.length)
    }, 1800)
    return () => clearInterval(id)
  }, [steps.length])

  const cur = steps[step]

  return (
    <div className="sim-content">
      <span className="card-label">Systems Project</span>
      <h2 className="sim-title">Page Replacement Simulator</h2>
      <p className="sim-desc">
        FIFO &#183; LRU &#183; Optimal &#8212; visualized in real time.
      </p>
      <p className="sim-details">
        Built in modular C with a clean educational UI. Compares three classic OS page
        replacement algorithms side-by-side, showing fault rates, hit ratios, and frame
        states for any custom reference string and frame count.
      </p>

      <div className="sim-visual">
        <div className="sim-input">
          <span className="sim-input-label">Page</span>
          <span className="sim-input-value" key={step}>{cur.page}</span>
        </div>

        <div className="sim-arrow">&rarr;</div>

        <div className="sim-frames">
          {cur.frames.map((val, i) => (
            <div key={i} className={`sim-frame${val !== '\u2014' ? ' sim-frame--filled' : ''}`}>
              <span className="sim-frame-value" key={`${step}-${i}`}>{val}</span>
            </div>
          ))}
        </div>

        <div className={`sim-status ${cur.fault ? 'sim-status--fault' : 'sim-status--hit'}`} key={`s-${step}`}>
          {cur.fault ? 'fault' : 'hit'}
        </div>
      </div>

      <div className="sim-links">
        <a href="https://sachinsharmaa07.github.io/Efficient-Page-Replacement-Algorithm-Simulator/" target="_blank" rel="noopener noreferrer" className="card-link">
          Try It &#8599;
        </a>
        <a href="https://github.com/sachinsharmaa07/Efficient-Page-Replacement-Algorithm-Simulator" target="_blank" rel="noopener noreferrer" className="card-link card-link--secondary">
          Source &#8599;
        </a>
      </div>
    </div>
  )
})

/* ===== MORE PROJECTS CARD ===== */
const MoreProjectsCard = memo(function MoreProjectsCard() {
  const projects = [
    {
      icon: '\u{1F4DA}',
      title: 'E-Library System',
      desc: 'Digital library management with book cataloging, user accounts, and borrowing workflows.',
      tags: ['Java', 'MySQL', 'Swing UI'],
      links: [
        { label: 'Source \u2197', href: 'https://github.com/sachinsharmaa07' },
      ],
    },
    {
      icon: '\u{1F3AF}',
      title: 'SubmiTrack',
      desc: 'Assignment submission tracker with deadline reminders, status dashboard, and analytics.',
      tags: ['React', 'Node.js', 'MongoDB'],
      links: [
        { label: 'Source \u2197', href: 'https://github.com/sachinsharmaa07' },
      ],
    },
    {
      icon: '\u{1F697}',
      title: 'Parking Management',
      desc: 'Smart parking slot allocation system with real-time availability and booking management.',
      tags: ['C++', 'Data Structures', 'CLI'],
      links: [
        { label: 'Source \u2197', href: 'https://github.com/sachinsharmaa07' },
      ],
    },
    {
      icon: '\u{1F4BB}',
      title: 'Portfolio Website',
      desc: 'This site. Card-based scroll experience with Lenis smooth scrolling and pure CSS animations.',
      tags: ['React', 'Vite', 'Lenis', 'CSS'],
      links: [
        { label: 'Source \u2197', href: 'https://github.com/sachinsharmaa07' },
      ],
    },
  ]

  return (
    <div className="projects-content">
      <div className="projects-header">
        <span className="card-label">More Work</span>
        <h2 className="projects-title">Other Projects</h2>
        <p className="projects-sub">A selection of things I have built along the way.</p>
      </div>

      <div className="projects-grid">
        {projects.map((p) => (
          <div key={p.title} className="project-mini">
            <div className="project-mini-icon">{p.icon}</div>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="project-mini-tags">
              {p.tags.map((tag) => (
                <span key={tag} className="project-mini-tag">{tag}</span>
              ))}
            </div>
            <div className="project-mini-links">
              {p.links.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="project-mini-link">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

/* ===== PHILOSOPHY CARD ===== */
const PhilosophyCard = memo(function PhilosophyCard() {
  return (
    <div className="philosophy-content">
      <blockquote className="philosophy-quote">
        I build systems the way akhadas build strength &#8212; slow, disciplined, repeatable.
      </blockquote>
      <p className="philosophy-sub">
        CSE at LPU &#183; 100+ LeetCode problems &#183; Every day is a rep.
      </p>
    </div>
  )
})

/* ===== CONTACT CARD ===== */
const ContactCard = memo(function ContactCard() {
  const links = [
    {
      label: 'GitHub',
      href: 'https://github.com/sachinsharmaa07',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/sachinsharmaa07/',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: 'LeetCode',
      href: 'https://leetcode.com/u/sachinsharmaa07/',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m16 18 6-6-6-6" />
          <path d="m8 6-6 6 6 6" />
          <path d="m14.5 4-5 16" />
        </svg>
      ),
    },
    {
      label: 'Email',
      href: 'mailto:studentgroup479@gmail.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      label: 'Resume',
      href: '/Sachin_Kumar_CV.pdf',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
  ]

  return (
    <div className="contact-content">
      <p className="contact-label">Say hello</p>
      <div className="contact-links">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
            aria-label={link.label}
          >
            {link.icon}
            <span>{link.label}</span>
          </a>
        ))}
      </div>
      <p className="contact-note">Open to opportunities</p>
    </div>
  )
})

/* ===== TECH STACK CARD ===== */
const techCategories = [
  {
    category: 'Frontend',
    techs: [
      { name: 'React', icon: SiReact, color: '#61DAFB', link: 'https://react.dev' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', link: 'https://www.typescriptlang.org' },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26', link: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
      { name: 'CSS3', icon: SiCss3, color: '#1572B6', link: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', link: 'https://tailwindcss.com' },
    ],
  },
  {
    category: 'Backend',
    techs: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933', link: 'https://nodejs.org' },
      { name: 'Express', icon: SiExpress, color: '#888888', link: 'https://expressjs.com' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248', link: 'https://www.mongodb.com' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1', link: 'https://www.mysql.com' },
      { name: 'Python', icon: SiPython, color: '#3776AB', link: 'https://www.python.org' },
      { name: 'C++', icon: SiCplusplus, color: '#00599C', link: 'https://isocpp.org' },
    ],
  },
  {
    category: 'Tools & Platforms',
    techs: [
      { name: 'Git', icon: SiGit, color: '#F05032', link: 'https://git-scm.com' },
      { name: 'GitHub', icon: SiGithub, color: '#aaa', link: 'https://github.com' },
      { name: 'Vite', icon: SiVite, color: '#646CFF', link: 'https://vitejs.dev' },
      { name: 'Postman', icon: SiPostman, color: '#FF6C37', link: 'https://www.postman.com' },
      { name: 'Vercel', icon: SiVercel, color: '#aaa', link: 'https://vercel.com' },
      { name: 'NPM', icon: SiNpm, color: '#CB3837', link: 'https://www.npmjs.com' },
      { name: 'Figma', icon: SiFigma, color: '#F24E1E', link: 'https://www.figma.com' },
      { name: 'Linux', icon: SiLinux, color: '#FCC624', link: 'https://www.linux.org' },
    ],
  },
]

/* All icons for the 3D sphere */
const sphereIcons = [
  { Icon: SiReact, color: '#61DAFB', name: 'React' },
  { Icon: SiNodedotjs, color: '#339933', name: 'Node.js' },
  { Icon: SiMongodb, color: '#47A248', name: 'MongoDB' },
  { Icon: SiExpress, color: '#888888', name: 'Express' },
  { Icon: SiJavascript, color: '#F7DF1E', name: 'JavaScript' },
  { Icon: SiTypescript, color: '#3178C6', name: 'TypeScript' },
  { Icon: SiTailwindcss, color: '#06B6D4', name: 'Tailwind' },
  { Icon: SiGit, color: '#F05032', name: 'Git' },
  { Icon: SiGithub, color: '#aaaaaa', name: 'GitHub' },
  { Icon: SiVite, color: '#646CFF', name: 'Vite' },
  { Icon: SiHtml5, color: '#E34F26', name: 'HTML5' },
  { Icon: SiCss3, color: '#1572B6', name: 'CSS3' },
  { Icon: SiPython, color: '#3776AB', name: 'Python' },
  { Icon: SiCplusplus, color: '#00599C', name: 'C++' },
  { Icon: SiMysql, color: '#4479A1', name: 'MySQL' },
  { Icon: SiPostman, color: '#FF6C37', name: 'Postman' },
  { Icon: SiVercel, color: '#aaaaaa', name: 'Vercel' },
  { Icon: SiNpm, color: '#CB3837', name: 'NPM' },
  { Icon: SiFigma, color: '#F24E1E', name: 'Figma' },
  { Icon: SiLinux, color: '#FCC624', name: 'Linux' },
]

/* Fibonacci sphere distribution for even spacing */
function fibSphere(count, radius) {
  const points = []
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = goldenAngle * i
    points.push({
      x: Math.cos(theta) * r * radius,
      y: y * radius,
      z: Math.sin(theta) * r * radius,
    })
  }
  return points
}

const IconSphere = memo(function IconSphere() {
  const sphereRef = useRef(null)
  const iconsRef = useRef([])
  const scrollY = useRef(0)
  const mouse = useRef({ x: 0, y: 0 })
  const animFrame = useRef(null)
  const basePoints = useRef(fibSphere(sphereIcons.length, 200))

  useEffect(() => {
    const onScroll = () => { scrollY.current = window.scrollY }
    const onMouse = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouse, { passive: true })

    let prev = performance.now()

    const animate = (now) => {
      const container = sphereRef.current
      if (!container) { animFrame.current = requestAnimationFrame(animate); return }

      const rect = container.getBoundingClientRect()
      const viewH = window.innerHeight
      const sectionProgress = Math.max(0, Math.min(1, (viewH - rect.top) / (viewH + rect.height)))

      /* Scroll drives main rotation */
      const scrollRot = scrollY.current * 0.15
      const tiltX = mouse.current.y * 12
      const tiltY = mouse.current.x * 12

      /* Breathing / pulsing scale */
      const breathe = 1 + Math.sin(now * 0.0008) * 0.04

      /* Explosion factor — icons spread out as you scroll through */
      const explode = 1 + sectionProgress * 0.6

      const points = basePoints.current

      iconsRef.current.forEach((el, i) => {
        if (!el) return
        const p = points[i]

        /* Rotate point around Y axis based on scroll */
        const angle = (scrollRot + i * 3) * (Math.PI / 180)
        const cosA = Math.cos(angle)
        const sinA = Math.sin(angle)
        const rx = p.x * cosA - p.z * sinA
        const rz = p.x * sinA + p.z * cosA
        const ry = p.y

        /* Apply explosion + breathe */
        const fx = rx * explode * breathe
        const fy = ry * explode * breathe
        const fz = rz * explode * breathe

        /* Depth-based scaling & opacity */
        const depthScale = (fz + 300) / 500
        const scale = Math.max(0.35, Math.min(1.3, depthScale))
        const opacity = Math.max(0.4, Math.min(1, depthScale * 1.1))
        const zIdx = Math.round(fz + 300)

        /* Each icon flips based on its own scroll phase */
        const flipX = scrollRot * 1.2 + i * 18
        const flipY = scrollRot * 0.8 + i * 25

        el.style.transform = `translate3d(${fx}px, ${fy}px, ${fz}px) rotateX(${flipX}deg) rotateY(${flipY}deg) scale(${scale})`
        el.style.opacity = opacity
        el.style.zIndex = zIdx
      })

      /* Whole sphere subtle tilt from mouse */
      container.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`

      animFrame.current = requestAnimationFrame(animate)
    }

    animFrame.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
      if (animFrame.current) cancelAnimationFrame(animFrame.current)
    }
  }, [])

  return (
    <div className="icon-sphere-wrapper" aria-hidden="true">
      <div className="icon-sphere" ref={sphereRef}>
        {sphereIcons.map((item, i) => {
          const Icon = item.Icon
          return (
            <div
              key={i}
              className="sphere-icon"
              ref={(el) => (iconsRef.current[i] = el)}
              style={{ '--icon-color': item.color }}
            >
              <Icon />
              <span className="sphere-icon-label">{item.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
})

const TechStackCard = memo(function TechStackCard() {
  return (
    <div className="techstack-content">
      <div className="techstack-header">
        <span className="card-label">Skills &amp; Expertise</span>
        <h2 className="techstack-title">Tech Stack</h2>
        <p className="techstack-desc">
          Technologies I work with daily &#8212; from interfaces to infrastructure.
        </p>
      </div>

      <IconSphere />

      <div className="techstack-categories">
        {techCategories.map((cat) => (
          <div key={cat.category} className="techstack-category">
            <h3 className="techstack-cat-name">{cat.category}</h3>
            <div className="techstack-grid">
              {cat.techs.map((tech) => {
                const Icon = tech.icon
                return (
                  <a
                    key={tech.name}
                    href={tech.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="techstack-item"
                    style={{ '--tech-color': tech.color }}
                  >
                    <div className="techstack-icon-wrap">
                      <Icon className="techstack-icon" />
                    </div>
                    <span className="techstack-name">{tech.name}</span>
                  </a>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

/* ===== GLOBAL ROTATING ICONS BACKGROUND ===== */
const bgIcons = [
  SiReact, SiNodedotjs, SiMongodb, SiJavascript, SiTypescript,
  SiTailwindcss, SiGit, SiVite, SiHtml5, SiCss3,
  SiPython, SiCplusplus, SiPostman, SiVercel, SiFigma,
  SiLinux, SiNpm, SiGithub, SiMysql, SiExpress,
  SiReact, SiNodedotjs, SiMongodb, SiJavascript, SiTypescript,
  SiTailwindcss, SiGit, SiVite, SiHtml5, SiCss3,
]

const GlobalIconsBg = memo(function GlobalIconsBg() {
  const containerRef = useRef(null)

  useEffect(() => {
    const icons = containerRef.current?.querySelectorAll('.gbg-icon')
    if (!icons) return

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const sy = window.scrollY
        icons.forEach((icon, i) => {
          const speed = 0.02 + (i % 6) * 0.012
          const yOff = sy * speed
          const rot = sy * (0.06 + (i % 4) * 0.02) + i * 30
          icon.style.transform = `translateY(${yOff}px) rotate(${rot}deg) scale(${0.8 + Math.sin(sy * 0.001 + i) * 0.2})`
        })
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Spread icons across a tall area */
  const positions = bgIcons.map((_, i) => ({
    top: `${(i / bgIcons.length) * 100}%`,
    left: `${10 + ((i * 37 + i * i * 13) % 80)}%`,
  }))

  return (
    <div className="global-icons-bg" ref={containerRef} aria-hidden="true">
      {bgIcons.map((Icon, i) => (
        <div
          key={i}
          className="gbg-icon"
          style={{ top: positions[i].top, left: positions[i].left, animationDelay: `${(i * 0.7) % 8}s` }}
        >
          <Icon />
        </div>
      ))}
    </div>
  )
})

/* ===== MAIN APP ===== */
const cards = [
  { Component: HeroCard, className: 'card--hero' },
  { Component: AkhadaCard, className: 'card--akhada' },
  { Component: SimulatorCard, className: 'card--sim' },
  { Component: MoreProjectsCard, className: 'card--projects' },
  { Component: TechStackCard, className: 'card--techstack' },
  { Component: PhilosophyCard, className: 'card--philosophy' },
  { Component: ContactCard, className: 'card--contact' },
]

export default function App() {
  const sectionsRef = useRef([])
  const [revealed, setRevealed] = useState(new Set([0]))

  /* -- Theme state -- */
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  /* -- Lenis smooth scrolling -- */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  /* -- Intersection Observer - reveal cards -- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.idx, 10)
            setRevealed((prev) => {
              if (prev.has(idx)) return prev
              const next = new Set(prev)
              next.add(idx)
              return next
            })
          }
        })
      },
      { threshold: 0.12 }
    )

    sectionsRef.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  /* -- Scroll-driven scale for passing cards -- */
  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true

      requestAnimationFrame(() => {
        sectionsRef.current.forEach((section) => {
          if (!section) return
          const rect = section.getBoundingClientRect()
          const card = section.querySelector('.card')
          if (!card) return

          if (rect.top < 0 && rect.bottom > 0) {
            const progress = Math.min(
              Math.abs(rect.top) / (rect.height * 0.6),
              1
            )
            card.style.setProperty('--out', progress.toFixed(3))
          } else {
            card.style.setProperty('--out', '0')
          }
        })
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Grain texture */}
      <svg className="grain" aria-hidden="true">
        <filter id="g">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#g)" />
      </svg>

      {/* Theme toggle */}
      <ThemeToggle theme={theme} toggle={toggleTheme} />

      {/* Global rotating icons background */}
      <GlobalIconsBg />

      <main>
        {cards.map(({ Component, className }, i) => (
          <section
            key={i}
            ref={(el) => (sectionsRef.current[i] = el)}
            data-idx={i}
            className="card-section"
          >
            <div
              className={`card ${className} ${
                revealed.has(i) ? 'card--revealed' : ''
              }`}
            >
              <Component />
            </div>
          </section>
        ))}
      </main>
    </>
  )
}
