import { useEffect, useMemo, useRef, useState } from 'react'
import { SiGithub, SiLinkedin, SiLeetcode, SiHackerrank } from 'react-icons/si'

const roles = [
  'Full-Stack Developer',
  'MERN Stack Engineer',
  'DSA Problem Solver',
  'Open Source Builder',
]

const iconSources = [
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', name: 'JS' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', name: 'React' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', name: 'Node' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', name: 'Mongo' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', name: 'Docker' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', name: 'Python' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', name: 'C++' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', name: 'Git' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', name: 'MySQL' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg', name: 'Tailwind' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', name: 'Express' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', name: 'Next.js' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', name: 'Java' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', name: 'GitHub' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', name: 'HTML5' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', name: 'CSS3' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', name: 'TS' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', name: 'Linux' },
]

const skillsMap = {
  Languages: [
    { name: 'JavaScript', pct: '90%' },
    { name: 'Java', pct: '60%' },
    { name: 'C++', pct: '75%' },
    { name: 'C', pct: '68%' },
    { name: 'Python', pct: '70%' },
    { name: 'SQL', pct: '70%' },
  ],
  Frameworks: [
    { name: 'Node.js', pct: '85%' },
    { name: 'React', pct: '85%' },
    { name: 'Express', pct: '80%' },
    { name: 'Next.js', pct: '65%' },
    { name: 'HTML/CSS', pct: '90%' },
    { name: 'Tailwind CSS', pct: '80%' },
    { name: 'Socket.IO', pct: '70%' },
  ],
  Tools: [
    { name: 'Docker', pct: '65%' },
    { name: 'MySQL', pct: '70%' },
    { name: 'MongoDB', pct: '80%' },
    { name: 'Git', pct: '90%' },
    { name: 'GitHub', pct: '90%' },
    { name: 'Vercel', pct: '80%' },
    { name: 'Render', pct: '75%' },
  ],
  'Soft Skills': [
    { name: 'Leadership' },
    { name: 'Adaptive' },
    { name: 'Reliable' },
    { name: 'Iterative Improvement' },
    { name: 'Persistence' },
  ],
}

function App() {
  const canvasRef = useRef(null)
  const roleIndexRef = useRef(0)
  const charIndexRef = useRef(0)
  const deletingRef = useRef(false)
  const [typedRole, setTypedRole] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const [showTop, setShowTop] = useState(false)
  const [statsStarted, setStatsStarted] = useState(false)
  const [barsAnimated, setBarsAnimated] = useState(false)
  const [stats, setStats] = useState({ projects: 0, leetcode: 0, cgpa: 0, certs: 0 })

  const sectionIds = useMemo(() => ['about', 'skills', 'projects', 'education', 'contact'], [])

  useEffect(() => {
    let timeoutId
    const step = () => {
      const current = roles[roleIndexRef.current]
      if (!deletingRef.current) {
        charIndexRef.current += 1
        setTypedRole(current.slice(0, charIndexRef.current))
        if (charIndexRef.current === current.length) {
          deletingRef.current = true
          timeoutId = setTimeout(step, 1800)
          return
        }
      } else {
        charIndexRef.current -= 1
        setTypedRole(current.slice(0, charIndexRef.current))
        if (charIndexRef.current === 0) {
          deletingRef.current = false
          roleIndexRef.current = (roleIndexRef.current + 1) % roles.length
        }
      }
      timeoutId = setTimeout(step, deletingRef.current ? 42 : 88)
    }
    step()
    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId = 0
    let running = true
    let lastTime = 0
    let scrollY = window.scrollY
    let lastScrollY = window.scrollY
    let scrollVelocity = 0
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let globalOpacityMult = 1
    let targetOpacityMult = 1
    const sectionOpacity = { hero: 1, about: 0.65, skills: 1.3, projects: 1.2, education: 0.55, contact: 0.8 }
    const isMobile = () => window.innerWidth < 768

    const loadedImages = []
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    class IconParticle {
      constructor(index) {
        this.iconIndex = index % loadedImages.length
        this.reset(true)
      }

      reset(initial = false) {
        this.x = Math.random() * canvas.width
        this.y = initial ? Math.random() * canvas.height : -80
        this.size = 28 + Math.random() * 32
        this.baseOpacity = 0.07 + Math.random() * 0.11
        this.opacity = 0
        this.rotation = Math.random() * Math.PI * 2
        this.rotSpeed = (Math.random() - 0.5) * 0.008
        this.vx = (Math.random() - 0.5) * 0.35
        this.baseVy = 0.25 + Math.random() * 0.55
        this.vy = this.baseVy
        this.wobbleAmp = 20 + Math.random() * 30
        this.wobbleFreq = 0.0008 + Math.random() * 0.001
        this.wobbleOff = Math.random() * Math.PI * 2
        this.time = Math.random() * 1000
        this.parallaxFactor = 0.05 + Math.random() * 0.18
        this.fadeInSpeed = 0.008 + Math.random() * 0.006
      }

      update(dt) {
        this.time += dt
        if (this.opacity < this.baseOpacity) {
          this.opacity = Math.min(this.opacity + this.fadeInSpeed, this.baseOpacity)
        }

        const wobble = Math.sin(this.time * this.wobbleFreq + this.wobbleOff) * this.wobbleAmp
        const parallaxY = scrollY * this.parallaxFactor * -0.08

        if (!isMobile()) {
          const dx = this.x - mouseX
          const dy = this.y - mouseY
          const dist = Math.sqrt(dx * dx + dy * dy)
          const repelRadius = 140
          if (dist < repelRadius && dist > 0) {
            const force = (1 - dist / repelRadius) * 0.9
            this.x += (dx / dist) * force
            this.y += (dy / dist) * force
          }
        }

        this.vy += scrollVelocity * 0.04 * this.parallaxFactor
        this.vy = Math.max(0.1, Math.min(this.vy, 4))
        this.vy += (this.baseVy - this.vy) * 0.06

        this.x += this.vx + wobble * 0.003
        this.y += this.vy
        this.rotation += this.rotSpeed
        this.renderY = this.y + parallaxY

        if (this.y > canvas.height + 100 || this.x < -100 || this.x > canvas.width + 100) {
          this.iconIndex = Math.floor(Math.random() * loadedImages.length)
          this.reset(false)
          this.x = Math.random() * canvas.width
        }
      }

      draw() {
        const image = loadedImages[this.iconIndex]
        if (!image?.complete || image.naturalWidth === 0) return
        ctx.save()
        ctx.globalAlpha = this.opacity * globalOpacityMult
        ctx.translate(this.x, this.renderY ?? this.y)
        ctx.rotate(this.rotation)
        ctx.drawImage(image, -this.size / 2, -this.size / 2, this.size, this.size)
        ctx.restore()
      }
    }

    const initParticles = () => {
      const count = isMobile() ? 8 : 20
      particles = Array.from({ length: count }, (_, index) => new IconParticle(index))
      if (running) {
        rafId = requestAnimationFrame(loop)
      }
    }

    const onScroll = () => {
      scrollVelocity = window.scrollY - lastScrollY
      lastScrollY = window.scrollY
      scrollY = window.scrollY
      const sectionElements = document.querySelectorAll('section[id]')
      sectionElements.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const inView = rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.45
        if (inView) {
          targetOpacityMult = sectionOpacity[section.id] ?? 1
        }
      })
    }

    const onMouseMove = (event) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(rafId)
      } else {
        running = true
        rafId = requestAnimationFrame(loop)
      }
    }

    const loop = (timestamp) => {
      const dt = Math.min(timestamp - lastTime || 16, 50)
      lastTime = timestamp
      globalOpacityMult += (targetOpacityMult - globalOpacityMult) * 0.03

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((particle) => {
        particle.update(dt)
        particle.draw()
      })
      if (running) {
        rafId = requestAnimationFrame(loop)
      }
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('visibilitychange', onVisibility)

    let ready = 0
    iconSources.forEach((entry, index) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        ready += 1
        if (ready === iconSources.length) initParticles()
      }
      img.onerror = () => {
        ready += 1
        if (ready === iconSources.length) initParticles()
      }
      img.src = entry.src
      loadedImages[index] = img
    })

    return () => {
      running = false
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      setShowTop(window.scrollY > 400)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            entry.target.querySelectorAll('.stagger').forEach((element, index) => {
              element.style.transitionDelay = `${index * 0.1}s`
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element))
    return () => revealObserver.disconnect()
  }, [])

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.4 }
    )
    sectionIds.forEach((id) => {
      const node = document.getElementById(id)
      if (node) sectionObserver.observe(node)
    })
    return () => sectionObserver.disconnect()
  }, [sectionIds])

  useEffect(() => {
    const statsNode = document.querySelector('.stats-grid')
    const skillsNode = document.getElementById('skills')
    if (!statsNode || !skillsNode) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target === statsNode) {
            setStatsStarted(true)
          }
          if (entry.isIntersecting && entry.target === skillsNode) {
            setBarsAnimated(true)
          }
        })
      },
      { threshold: 0.3 }
    )
    observer.observe(statsNode)
    observer.observe(skillsNode)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!statsStarted) return
    const targets = { projects: 3, leetcode: 100, cgpa: 8, certs: 3 }
    const duration = 1800
    let start = null
    let frameId
    const ease = (value) => (value < 0.5 ? 2 * value * value : -1 + (4 - 2 * value) * value)

    const tick = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = ease(progress)
      setStats({
        projects: Math.floor(eased * targets.projects),
        leetcode: Math.floor(eased * targets.leetcode),
        cgpa: Number((eased * targets.cgpa).toFixed(1)),
        certs: Math.floor(eased * targets.certs),
      })
      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      }
    }
    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [statsStarted])

  return (
    <>
      <canvas id="icon-bg-canvas" ref={canvasRef} />

      <div className="site-layer">
        <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
          <a href="#hero" className="nav-logo" aria-label="Back to hero">
            <span className="logo-glyph">SK</span>
          </a>

          <nav className="nav-links" aria-label="Main navigation">
            {sectionIds.map((id) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''} onClick={() => setMenuOpen(false)}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </nav>

          <a className="btn-cv" href="/assets/CV_Sachin_Sharma.pdf" download>
            Download CV ↓
          </a>

          <button
            className={`menu-toggle ${menuOpen ? 'open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
            {sectionIds.map((id) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </div>
        </header>

        <main>
          <section id="hero" className="hero reveal">
            <div className="container hero-content">
              <div className="hero-badge stagger">{'< SS / >'}</div>
              <h1 className="hero-name stagger">Sachin Kumar</h1>
              <p className="hero-type stagger">
                <span>{typedRole}</span>
                <span className="cursor">|</span>
              </p>
              <p className="hero-subtitle stagger">CSE @ LPU · Open to Opportunities</p>
              <a href="#projects" className="hero-cta stagger">
                View Projects →
              </a>
              <div className="hero-divider stagger" />
              <div className="hero-socials stagger">
                <a href="https://github.com/sachinsharmaa07" target="_blank" rel="noopener noreferrer">
                  <SiGithub /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/sachinsharmaa07/" target="_blank" rel="noopener noreferrer">
                  <SiLinkedin /> LinkedIn
                </a>
                <a href="https://leetcode.com/u/sachinsharmaa07/" target="_blank" rel="noopener noreferrer">
                  <SiLeetcode /> LeetCode
                </a>
              </div>
              <a href="#about" className="scroll-arrow stagger" aria-label="Scroll down">
                ↓
              </a>
            </div>
          </section>

          <div className="section-divider" />

          <section id="about" className="section reveal">
            <div className="container about-grid">
              <article className="about-card stagger">
                <h2>About</h2>
                <p>
                  I&apos;m a Full-Stack Developer specialising in the <span>MERN stack</span>, studying Computer Science at
                  <span> Lovely Professional University</span>. I build production-grade applications from digital library systems to
                  full-scale fitness platforms with emphasis on clean architecture, security, and performance.
                </p>
                <p>
                  Actively solving <span>DSA</span> problems on LeetCode and learning <span>DevOps</span> with Docker and cloud computing.
                </p>
                <span className="badge-available">
                  <span className="pulse-dot" /> Open to Opportunities
                </span>
              </article>

              <div className="stats-grid stagger">
                <article className="stat-card">
                  <h3>{stats.projects}+</h3>
                  <p>Projects Built</p>
                </article>
                <article className="stat-card">
                  <h3>{stats.leetcode}+</h3>
                  <p>LeetCode Problems</p>
                </article>
                <article className="stat-card">
                  <h3>{stats.cgpa}</h3>
                  <p>CGPA at LPU</p>
                </article>
                <article className="stat-card">
                  <h3>{stats.certs}</h3>
                  <p>Certifications</p>
                </article>
              </div>
            </div>
          </section>

          <div className="section-divider" />

          <section id="skills" className="section reveal">
            <div className="container">
              <h2 className="stagger">Skills</h2>
              <p className="skills-intro stagger">Languages, Frameworks, and Tools in one responsive dynamic view.</p>

              <div className="skills-onepage-grid stagger">
                {['Languages', 'Frameworks', 'Tools'].map((category) => (
                  <article key={category} className="skills-column">
                    <h3 className="column-head">{category}</h3>
                    <div className="skills-grid">
                      {skillsMap[category].map((item) => (
                        <article key={item.name} className="skill-card">
                          <div className="skill-head">
                            <span>{item.name}</span>
                            <span>{item.pct}</span>
                          </div>
                          <div className="skill-bar-track">
                            <span
                              className={`skill-bar-fill ${barsAnimated ? 'animate' : ''}`}
                              style={{ '--pct': item.pct }}
                            />
                          </div>
                        </article>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              <div className="skills-panel stagger">
                <h3 className="column-head">Soft Skills</h3>
                <div className="soft-skills-grid">
                  {skillsMap['Soft Skills'].map((item) => (
                    <span key={item.name} className="soft-chip">
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="section-divider" />

          <section id="projects" className="section reveal">
            <div className="container">
              <h2 className="stagger">Projects</h2>
              <div className="projects-grid">
                <article className="project-card stagger">
                  <span className="project-date">Aug '25</span>
                  <h3>E-Lib — Digital Library Management System</h3>
                  <p>
                    Engineered a full-stack MERN application to digitize library operations with secure book discovery, borrowing workflows,
                    and role-based administration.
                  </p>
                  <ul>
                    <li>Implemented approval-driven borrowing architecture with inventory tracking; 3 core models and 15+ RESTful APIs.</li>
                    <li>Production-ready CRUD + protected admin routes with concurrent user support and consistent data integrity.</li>
                  </ul>
                  <div className="stack-pills">
                    <span>MERN</span>
                    <span>Git</span>
                    <span>GitHub</span>
                  </div>
                  <div className="project-links">
                    <a href="https://github.com/sachinsharmaa07/E-Lib" target="_blank" rel="noopener noreferrer">
                      ⌥ Code ↗
                    </a>
                  </div>
                </article>

                <article className="project-card stagger">
                  <span className="project-date">Mar '25</span>
                  <h3>Akhada Analytics — Full-Stack Fitness Tracking Platform</h3>
                  <p>
                    Mobile-first MERN fitness platform with workout logging, nutrition tracking, body analytics, JWT dual-token auth,
                    Google OAuth, and 900+ item multi-cuisine food database.
                  </p>
                  <ul>
                    <li>Interactive Muscle Heatmap with 7-day frequency visualization and automatic personal record detection.</li>
                    <li>Deployed on Vercel + Render + MongoDB Atlas with Helmet, rate limiting, bcrypt 12 rounds, and token-reuse detection.</li>
                  </ul>
                  <div className="stack-pills">
                    <span>React 19</span>
                    <span>Express 5</span>
                    <span>MongoDB Atlas</span>
                    <span>JWT</span>
                  </div>
                  <div className="project-links">
                    <a href="https://github.com/sachinsharmaa07/Akhada-Anlaytics" target="_blank" rel="noopener noreferrer">
                      ⌥ Code ↗
                    </a>
                    <a href="https://akhada-anlaytics.vercel.app/" target="_blank" rel="noopener noreferrer">
                      ↗ Live
                    </a>
                  </div>
                </article>

                <article className="project-card stagger">
                  <span className="project-date">Feb '25</span>
                  <h3>Portfolio — Personal Developer Portfolio</h3>
                  <p>
                    Minimal card-based portfolio with smooth scroll (Lenis), dark/light theme toggle, and pure CSS animations with zero UI
                    frameworks.
                  </p>
                  <ul>
                    <li>Vite 5 build pipeline with optimized assets (JS gzip: 55 KB, CSS gzip: 3.4 KB).</li>
                    <li>Auto-deploy flow on Vercel with Git-based updates.</li>
                  </ul>
                  <div className="stack-pills">
                    <span>React 18</span>
                    <span>Vite 5</span>
                    <span>Lenis</span>
                    <span>Vercel</span>
                  </div>
                  <div className="project-links">
                    <a href="https://github.com/sachinsharmaa07/portfolio" target="_blank" rel="noopener noreferrer">
                      ⌥ Code ↗
                    </a>
                    <a href="https://sachinsharmaa07.vercel.app/" target="_blank" rel="noopener noreferrer">
                      ↗ Live
                    </a>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <div className="section-divider" />

          <section id="education" className="section reveal">
            <div className="container">
              <h2 className="stagger">Education</h2>

              <div className="timeline-wrap stagger">
                <span className="timeline-line" />

                <article className="timeline-card">
                  <span className="timeline-dot" />
                  <h3>Lovely Professional University, Punjab</h3>
                  <p>B.Tech CSE</p>
                  <span>CGPA: 8+ · Aug 2023 – Present</span>
                </article>

                <article className="timeline-card">
                  <span className="timeline-dot" />
                  <h3>BSF Senior Secondary School, J&K, Jammu</h3>
                  <p>Intermediate (12th), 79%</p>
                  <span>Apr 2021 – Mar 2022</span>
                </article>

                <article className="timeline-card">
                  <span className="timeline-dot" />
                  <h3>BSF Senior Secondary School, J&K, Jammu</h3>
                  <p>Matriculation (10th), 78%</p>
                  <span>Jun 2019 – Mar 2020</span>
                </article>
              </div>

              <h3 className="sub-title stagger">Certifications & Training</h3>
              <div className="cert-grid">
                <article className="cert-card stagger">
                  <h4>ChatGPT-4 Prompt Engineering: ChatGPT, Generative AI & LLM</h4>
                  <p>Jul 2025</p>
                </article>
                <article className="cert-card stagger">
                  <h4>Cloud Computing — NPTEL, IIT Kharagpur</h4>
                  <p>Apr 2025</p>
                  <a
                    href="https://drive.google.com/file/d/1NyiPayNa-C3iKG5WZGnZ2uGSchHFhjG7/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Certificate →
                  </a>
                </article>
                <article className="cert-card stagger">
                  <h4>Data Structures & Algorithms — Centre for Professional Enhancement</h4>
                  <p>Jul 2025</p>
                  <a
                    href="https://drive.google.com/file/d/1T33n0g4lwI7WMEvEyse4153USfleY-RE/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Certificate →
                  </a>
                </article>
              </div>

              <h3 className="sub-title stagger">Achievements</h3>
              <ul className="achievements-list stagger">
                <li>
                  Solved 100+ LeetCode problems, improved accuracy by 25% ·
                  <a href="https://leetcode.com/u/sachinsharmaa07/" target="_blank" rel="noopener noreferrer">
                    Profile
                  </a>
                </li>
                <li>
                  Earned Python Badges on HackerRank (Dec 2024) ·
                  <a href="https://www.hackerrank.com/profile/studentgroup479" target="_blank" rel="noopener noreferrer">
                    Profile
                  </a>
                </li>
              </ul>
            </div>
          </section>

          <div className="section-divider" />

          <section id="contact" className="section reveal">
            <div className="container">
              <article className="contact-card stagger">
                <h2>Let&apos;s build something.</h2>
                <a href="mailto:studentgroup479@gmail.com">✉ studentgroup479@gmail.com</a>
                <a href="tel:+916006607602">📱 +91 6006607602</a>
                <a href="https://www.linkedin.com/in/sachinsharmaa07/" target="_blank" rel="noopener noreferrer">
                  🔗 linkedin.com/in/sachinsharmaa07
                </a>

                <div className="social-grid">
                  <a href="https://github.com/sachinsharmaa07" target="_blank" rel="noopener noreferrer">
                    <SiGithub /> GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/sachinsharmaa07/" target="_blank" rel="noopener noreferrer">
                    <SiLinkedin /> LinkedIn
                  </a>
                  <a href="https://leetcode.com/u/sachinsharmaa07/" target="_blank" rel="noopener noreferrer">
                    <SiLeetcode /> LeetCode
                  </a>
                  <a href="https://www.hackerrank.com/profile/studentgroup479" target="_blank" rel="noopener noreferrer">
                    <SiHackerrank /> HackerRank
                  </a>
                </div>
              </article>
            </div>
          </section>
        </main>

        <footer>
          Sachin Kumar · 2025
        </footer>

        <button
          className={`back-to-top ${showTop ? 'visible' : ''}`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          ↑
        </button>
      </div>
    </>
  )
}

export default App