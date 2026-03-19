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
  const activeSectionRef = useRef('about')
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
  const [statsComplete, setStatsComplete] = useState(false)
  const [stats, setStats] = useState({ projects: 0, leetcode: 0, cgpa: 0, certs: 0 })
  const [contactForm, setContactForm] = useState({ name: '', email: '', cc: '', message: '' })
  const [debugOpen, setDebugOpen] = useState(false)
  const [debugStats, setDebugStats] = useState({ fps: 0, profile: 'desktop-cinematic', icons: 0 })

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

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    let rafId = 0
    let running = true
    let lastTime = 0
    let time = 0
    let scrollY = window.scrollY
    let lastScrollY = window.scrollY
    let scrollVelocity = 0
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let viewportCenterX = window.innerWidth / 2
    let viewportCenterY = window.innerHeight / 2
    let viewWidth = window.innerWidth
    let viewHeight = window.innerHeight
    let dpr = 1
    let zoom = 1
    let speedBoost = 1
    let reducedMotion = reducedMotionQuery.matches
    let globalOpacityMult = 1
    let targetOpacityMult = 1
    const sectionOpacity = { hero: 1, about: 0.65, skills: 1.3, projects: 1.2, education: 0.55, contact: 0.8 }
    let sectionElements = []
    let bgGradient = null
    const isMobile = () => window.innerWidth < 768
    const getMotionProfile = () => {
      const mobile = isMobile()
      if (reducedMotion) {
        return {
          iconCount: mobile ? 8 : 12,
          zoomMax: 1.06,
          speedBoostMax: 1.35,
          blurMult: 0.35,
          driftMult: 0.45,
          repelMult: 0,
          scrollParallaxMult: 0.35,
        }
      }
      if (mobile) {
        return {
          iconCount: 12,
          zoomMax: 1.12,
          speedBoostMax: 1.6,
          blurMult: 0.65,
          driftMult: 0.7,
          repelMult: 0,
          scrollParallaxMult: 0.6,
        }
      }
      return {
        iconCount: 28,
        zoomMax: 1.22,
        speedBoostMax: 2.1,
        blurMult: 0.75,
        driftMult: 1,
        repelMult: 1,
        scrollParallaxMult: 1,
      }
    }
    let motionProfile = getMotionProfile()
    let motionProfileName = reducedMotion ? 'reduced-motion' : isMobile() ? 'mobile-smooth' : 'desktop-cinematic'
    let targetIconCount = motionProfile.iconCount
    let activeIconCount = motionProfile.iconCount
    let minIconCount = Math.max(6, Math.floor(motionProfile.iconCount * 0.45))
    let qualityCooldownUntil = 0
    let imagesReady = false
    let fpsFrameCount = 0
    let fpsTimeAcc = 0
    let fpsLastReport = 0

    const loadedImages = []
    let orbitIcons = []

    const resize = () => {
      viewWidth = window.innerWidth
      viewHeight = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, reducedMotion ? 1 : isMobile() ? 1.2 : 1.5)

      canvas.width = Math.floor(viewWidth * dpr)
      canvas.height = Math.floor(viewHeight * dpr)
      canvas.style.width = `${viewWidth}px`
      canvas.style.height = `${viewHeight}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      viewportCenterX = viewWidth / 2
      viewportCenterY = viewHeight / 2
      bgGradient = ctx.createLinearGradient(0, 0, 0, viewHeight)
      bgGradient.addColorStop(0, 'rgba(8, 12, 28, 0.26)')
      bgGradient.addColorStop(0.5, 'rgba(28, 16, 55, 0.1)')
      bgGradient.addColorStop(1, 'rgba(6, 10, 22, 0.24)')
      sectionElements = Array.from(document.querySelectorAll('section[id]'))
      motionProfile = getMotionProfile()
      motionProfileName = reducedMotion ? 'reduced-motion' : isMobile() ? 'mobile-smooth' : 'desktop-cinematic'
      targetIconCount = motionProfile.iconCount
      minIconCount = Math.max(6, Math.floor(targetIconCount * 0.45))
      activeIconCount = Math.min(Math.max(activeIconCount, minIconCount), targetIconCount)
      if (imagesReady && orbitIcons.length !== activeIconCount) {
        initOrbitIcons()
      }
    }

    class OrbitIcon {
      constructor(index) {
        this.iconIndex = index % loadedImages.length
        this.layerOrder = 1
        this.reset()
      }

      reset() {
        const layerRoll = Math.random()
        this.layer = layerRoll < 0.34 ? 'background' : layerRoll < 0.78 ? 'midground' : 'foreground'
        this.layerOrder = this.layer === 'background' ? 0 : this.layer === 'midground' ? 1 : 2
        this.baseSize = this.layer === 'foreground' ? 38 + Math.random() * 24 : this.layer === 'midground' ? 28 + Math.random() * 20 : 22 + Math.random() * 16
        this.depth = this.layer === 'foreground' ? 1.28 : this.layer === 'midground' ? 1.08 : 0.88
        this.layerOpacity = this.layer === 'foreground' ? 0.95 : this.layer === 'midground' ? 0.78 : 0.48
        this.baseBlur = this.layer === 'foreground' ? 0 : this.layer === 'midground' ? 0.8 : 1.5
        this.speed =
          this.layer === 'foreground'
            ? 0.38 + Math.random() * 0.3
            : this.layer === 'midground'
              ? 0.22 + Math.random() * 0.2
              : 0.1 + Math.random() * 0.14

        this.angle = Math.random() * Math.PI * 2
        this.angleOffset = Math.random() * Math.PI * 2
        this.depthOffset = Math.random() * Math.PI * 2
        this.depthFreq = 0.75 + Math.random() * 1.3
        this.radiusX = (viewWidth * (this.layer === 'foreground' ? 0.22 : this.layer === 'midground' ? 0.32 : 0.42)) * (0.65 + Math.random() * 0.55)
        this.radiusY = (viewHeight * (this.layer === 'foreground' ? 0.2 : this.layer === 'midground' ? 0.27 : 0.34)) * (0.6 + Math.random() * 0.55)
        this.rotation = Math.random() * Math.PI * 2
        this.rotSpeed = (Math.random() - 0.5) * 0.01
        this.repelX = 0
        this.repelY = 0
        this.x = 0
        this.y = 0
        this.scale = 0
        this.opacity = 0
        this.blur = 0
      }

      update(dt) {
        const t = time * 0.001
        const angle = this.angle + t * this.speed * speedBoost + this.angleOffset
        const z = Math.sin(t * this.depthFreq + this.depthOffset)
        const rawScale = (z + this.depth) / (2 * this.depth)
        const layerScaleBoost = this.layer === 'foreground' ? 0.18 : this.layer === 'midground' ? 0.08 : -0.02
        this.scale = Math.max(0.18, Math.min(rawScale + layerScaleBoost, 1.05))
        this.opacity = Math.max(0.12, Math.min(this.scale * this.layerOpacity * globalOpacityMult, 1))
        this.blur = ((1 - this.scale) * 3.8 + this.baseBlur) * motionProfile.blurMult

        const orbitX = viewportCenterX + Math.cos(angle) * this.radiusX * zoom
        const orbitY =
          viewportCenterY +
          Math.sin(angle * 0.92) * this.radiusY * zoom -
          scrollY * 0.02 * this.scale * motionProfile.scrollParallaxMult
        const driftX = Math.sin(t * 1.4 + this.depthOffset) * 8 * motionProfile.driftMult
        const driftY = Math.cos(t * 1.1 + this.angleOffset) * 6 * motionProfile.driftMult

        let targetRepelX = 0
        let targetRepelY = 0

        if (!isMobile() && !reducedMotion) {
          const dx = orbitX - mouseX
          const dy = orbitY - mouseY
          const dist = Math.sqrt(dx * dx + dy * dy)
          const repelRadius = this.layer === 'foreground' ? 170 : 130
          if (dist < repelRadius && dist > 0) {
            const force = (1 - dist / repelRadius) * (this.layer === 'foreground' ? 22 : 14)
            targetRepelX = (dx / dist) * force * motionProfile.repelMult
            targetRepelY = (dy / dist) * force * motionProfile.repelMult
          }
        }

        const smooth = Math.min(0.2, dt * 0.01)
        this.repelX += (targetRepelX - this.repelX) * smooth
        this.repelY += (targetRepelY - this.repelY) * smooth

        this.x = orbitX + driftX + this.repelX
        this.y = orbitY + driftY + this.repelY
        this.rotation += this.rotSpeed
      }

      draw() {
        const image = loadedImages[this.iconIndex]
        if (!image?.complete || image.naturalWidth === 0) return
        const size = this.baseSize * this.scale
        ctx.save()
        ctx.globalAlpha = this.opacity
        if (this.layer === 'background' && this.blur > 0.3) {
          ctx.filter = `blur(${this.blur.toFixed(2)}px)`
        } else {
          ctx.filter = 'none'
        }
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)
        ctx.drawImage(image, -size / 2, -size / 2, size, size)
        ctx.restore()
      }
    }

    const initOrbitIcons = (nextCount = activeIconCount) => {
      cancelAnimationFrame(rafId)
      const count = Math.max(minIconCount, Math.min(nextCount, targetIconCount))
      activeIconCount = count
      orbitIcons = Array.from({ length: count }, (_, index) => new OrbitIcon(index))
      if (import.meta.env.DEV) {
        setDebugStats((prev) => ({ ...prev, profile: motionProfileName, icons: count }))
      }
      if (running) {
        rafId = requestAnimationFrame(loop)
      }
    }

    const onScroll = () => {
      scrollVelocity = window.scrollY - lastScrollY
      lastScrollY = window.scrollY
      scrollY = window.scrollY
      speedBoost = Math.min(motionProfile.speedBoostMax, 1 + Math.abs(scrollVelocity) * 0.016)
      zoom = Math.min(motionProfile.zoomMax, 1 + window.scrollY * 0.00012)
      targetOpacityMult = scrollY < window.innerHeight * 0.35 ? sectionOpacity.hero : sectionOpacity[activeSectionRef.current] ?? 1
    }

    const onMotionPreferenceChange = () => {
      reducedMotion = reducedMotionQuery.matches
      motionProfile = getMotionProfile()
      motionProfileName = reducedMotion ? 'reduced-motion' : isMobile() ? 'mobile-smooth' : 'desktop-cinematic'
      targetIconCount = motionProfile.iconCount
      minIconCount = Math.max(6, Math.floor(targetIconCount * 0.45))
      activeIconCount = reducedMotion ? targetIconCount : Math.min(Math.max(activeIconCount, minIconCount), targetIconCount)
      if (reducedMotion) {
        window.removeEventListener('mousemove', onMouseMove)
      } else {
        window.addEventListener('mousemove', onMouseMove)
      }
      initOrbitIcons()
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
      time += dt
      fpsFrameCount += 1
      fpsTimeAcc += dt
      globalOpacityMult += (targetOpacityMult - globalOpacityMult) * 0.03
      speedBoost += (1 - speedBoost) * 0.045

      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, viewWidth, viewHeight)

      orbitIcons.forEach((icon) => {
        icon.update(dt)
      })
      orbitIcons.forEach((icon) => {
        if (icon.layerOrder === 0) icon.draw()
      })
      orbitIcons.forEach((icon) => {
        if (icon.layerOrder === 1) icon.draw()
      })
      orbitIcons.forEach((icon) => {
        if (icon.layerOrder === 2) icon.draw()
      })

      if (import.meta.env.DEV && timestamp - fpsLastReport > 450 && fpsTimeAcc > 0) {
        const fps = Math.round((fpsFrameCount * 1000) / fpsTimeAcc)
        setDebugStats({ fps, profile: motionProfileName, icons: activeIconCount })

        if (!reducedMotion && timestamp > qualityCooldownUntil) {
          const canReduce = activeIconCount > minIconCount
          const canIncrease = activeIconCount < targetIconCount

          if (fps < 50 && canReduce) {
            initOrbitIcons(activeIconCount - 2)
            qualityCooldownUntil = timestamp + 2200
          } else if (fps > 58 && canIncrease) {
            initOrbitIcons(activeIconCount + 1)
            qualityCooldownUntil = timestamp + 2600
          }
        }

        fpsLastReport = timestamp
        fpsFrameCount = 0
        fpsTimeAcc = 0
      }

      if (running) {
        rafId = requestAnimationFrame(loop)
      }
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    if (!reducedMotion) {
      window.addEventListener('mousemove', onMouseMove)
    }
    document.addEventListener('visibilitychange', onVisibility)
    reducedMotionQuery.addEventListener('change', onMotionPreferenceChange)

    let ready = 0
    iconSources.forEach((entry, index) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        ready += 1
        if (ready === iconSources.length) {
          imagesReady = true
          initOrbitIcons()
        }
      }
      img.onerror = () => {
        ready += 1
        if (ready === iconSources.length) {
          imagesReady = true
          initOrbitIcons()
        }
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
      reducedMotionQuery.removeEventListener('change', onMotionPreferenceChange)
    }
  }, [])

  useEffect(() => {
    if (!import.meta.env.DEV) return

    const onKeyDown = (event) => {
      if (event.shiftKey && event.code === 'KeyD') {
        event.preventDefault()
        setDebugOpen((prev) => !prev)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const sectionNodes = Array.from(document.querySelectorAll('section[id]'))
    let ticking = false

    const updateScrollState = () => {
      setScrolled(window.scrollY > 50)
      setShowTop(window.scrollY > 400)
      if (reducedMotion || window.innerWidth < 768) return
      sectionNodes.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const progress = ((window.innerHeight - rect.top) / (window.innerHeight + rect.height)) * 2 - 1
        section.style.setProperty('--section-parallax', `${Math.max(-16, Math.min(16, progress * 12)).toFixed(2)}px`)
      })
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        updateScrollState()
        ticking = false
      })
    }

    updateScrollState()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'))
      return
    }

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            entry.target.querySelectorAll('.stagger').forEach((element, index) => {
              element.style.transitionDelay = `${index * 0.1}s`
            })
            observer.unobserve(entry.target)
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
            const nextSection = entry.target.id
            if (nextSection !== activeSectionRef.current) {
              activeSectionRef.current = nextSection
              setActiveSection(nextSection)
            }
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
    const timeline = document.querySelector('.timeline-wrap')
    if (!timeline) return
    let ticking = false

    const updateTimeline = () => {
      const rect = timeline.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.9 - rect.top) / (rect.height + window.innerHeight * 0.4)))
      timeline.style.setProperty('--timeline-progress', progress.toFixed(3))
    }

    const onTimelineScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        updateTimeline()
        ticking = false
      })
    }

    updateTimeline()
    window.addEventListener('scroll', onTimelineScroll, { passive: true })
    window.addEventListener('resize', updateTimeline)

    return () => {
      window.removeEventListener('scroll', onTimelineScroll)
      window.removeEventListener('resize', updateTimeline)
    }
  }, [])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || window.innerWidth < 768) return

    const tiltNodes = document.querySelectorAll('.about-card, .project-card')
    if (!tiltNodes.length) return

    const handlers = []
    tiltNodes.forEach((node) => {
      const maxTilt = node.classList.contains('about-card') ? 8 : 10

      const onMove = (event) => {
        const rect = node.getBoundingClientRect()
        const px = (event.clientX - rect.left) / rect.width
        const py = (event.clientY - rect.top) / rect.height
        const tiltX = ((0.5 - py) * maxTilt).toFixed(2)
        const tiltY = ((px - 0.5) * maxTilt).toFixed(2)
        const shiftX = ((px - 0.5) * 10).toFixed(2)
        const shiftY = ((py - 0.5) * 8).toFixed(2)

        node.style.setProperty('--tilt-x', `${tiltX}deg`)
        node.style.setProperty('--tilt-y', `${tiltY}deg`)
        node.style.setProperty('--glow-x', `${(px * 100).toFixed(2)}%`)
        node.style.setProperty('--glow-y', `${(py * 100).toFixed(2)}%`)
        node.style.setProperty('--parallax-x', `${shiftX}px`)
        node.style.setProperty('--parallax-y', `${shiftY}px`)
      }

      const onLeave = () => {
        node.style.setProperty('--tilt-x', '0deg')
        node.style.setProperty('--tilt-y', '0deg')
        node.style.setProperty('--parallax-x', '0px')
        node.style.setProperty('--parallax-y', '0px')
        node.style.setProperty('--glow-x', '50%')
        node.style.setProperty('--glow-y', '50%')
      }

      node.addEventListener('mousemove', onMove)
      node.addEventListener('mouseleave', onLeave)
      handlers.push({ node, onMove, onLeave })
    })

    return () => {
      handlers.forEach(({ node, onMove, onLeave }) => {
        node.removeEventListener('mousemove', onMove)
        node.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  useEffect(() => {
    const button = document.querySelector('.contact-form button')
    if (!button) return

    const onClick = (event) => {
      const rect = button.getBoundingClientRect()
      button.style.setProperty('--ripple-x', `${event.clientX - rect.left}px`)
      button.style.setProperty('--ripple-y', `${event.clientY - rect.top}px`)
      button.classList.remove('ripple-active')
      requestAnimationFrame(() => button.classList.add('ripple-active'))
    }

    button.addEventListener('click', onClick)
    return () => button.removeEventListener('click', onClick)
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
      } else {
        setStatsComplete(true)
      }
    }
    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [statsStarted])

  const handleContactChange = (event) => {
    const { name, value } = event.target
    setContactForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleContactSubmit = (event) => {
    event.preventDefault()
    const recipient = 'studentgroup479@gmail.com'
    const subject = `Portfolio Contact from ${contactForm.name.trim()}`
    const body = [
      `Name: ${contactForm.name.trim()}`,
      `Email: ${contactForm.email.trim()}`,
      '',
      'Message:',
      contactForm.message.trim(),
    ].join('\n')

    const params = new URLSearchParams({
      subject,
      body,
    })

    if (contactForm.cc.trim()) {
      params.set('cc', contactForm.cc.trim())
    }

    window.location.href = `mailto:${recipient}?${params.toString()}`
  }

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

          <a className="btn-cv" href="/assets/CV_Sachin_Sharma.pdf" target="_blank" rel="noopener noreferrer">
            View CV ↗
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
              <article className="about-card stagger tilt-card">
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
                <article className={`stat-card ${statsComplete ? 'done' : ''}`}>
                  <h3>{stats.projects}+</h3>
                  <p>Projects Built</p>
                </article>
                <article className={`stat-card ${statsComplete ? 'done' : ''}`}>
                  <h3>{stats.leetcode}+</h3>
                  <p>LeetCode Problems</p>
                </article>
                <article className={`stat-card ${statsComplete ? 'done' : ''}`}>
                  <h3>{stats.cgpa}</h3>
                  <p>CGPA at LPU</p>
                </article>
                <article className={`stat-card ${statsComplete ? 'done' : ''}`}>
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
                <article className="project-card stagger tilt-card">
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

                <article className="project-card stagger tilt-card">
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
                    <a href="https://akhada-analytics.vercel.app/login" target="_blank" rel="noopener noreferrer">
                      ↗ Live
                    </a>
                  </div>
                </article>

                <article className="project-card stagger tilt-card">
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

                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <div className="field-wrap">
                    <input id="contact-name" type="text" name="name" placeholder=" " value={contactForm.name} onChange={handleContactChange} required />
                    <label htmlFor="contact-name">Your Name</label>
                  </div>
                  <div className="field-wrap">
                    <input id="contact-email" type="email" name="email" placeholder=" " value={contactForm.email} onChange={handleContactChange} required />
                    <label htmlFor="contact-email">Your Email</label>
                  </div>
                  <div className="field-wrap">
                    <input id="contact-cc" type="email" name="cc" placeholder=" " value={contactForm.cc} onChange={handleContactChange} />
                    <label htmlFor="contact-cc">CC Email (optional)</label>
                  </div>
                  <div className="field-wrap">
                    <textarea id="contact-message" name="message" placeholder=" " value={contactForm.message} onChange={handleContactChange} rows={4} required />
                    <label htmlFor="contact-message">Your Message</label>
                  </div>
                  <button type="submit">Send Email</button>
                </form>

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
          Sachin Kumar · 2026
        </footer>

        <button
          className={`back-to-top ${showTop ? 'visible' : ''}`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          ↑
        </button>

        {import.meta.env.DEV && debugOpen && (
          <aside className="debug-hud" aria-live="polite">
            <h4>Motion Debug</h4>
            <p>FPS: {debugStats.fps}</p>
            <p>Profile: {debugStats.profile}</p>
            <p>Icons: {debugStats.icons}</p>
            <small>Toggle: Shift + D</small>
          </aside>
        )}
      </div>
    </>
  )
}

export default App