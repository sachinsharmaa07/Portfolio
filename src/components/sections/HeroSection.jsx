import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { SiGithub, SiLinkedin, SiLeetcode } from 'react-icons/si'
import { roles, socialLinks } from '../../data/config'
import MagneticButton from '../ui/MagneticButton'
import AuraPanel from '../ui/AuraPanel'
import NeoBadge from '../ui/NeoBadge'
import PrismButton from '../ui/PrismButton'
import GlassStat from '../ui/GlassStat'
import TechRibbon from '../ui/TechRibbon'

/* Stagger container for Framer Motion */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
}

const childVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function HeroSection() {
  const roleIndexRef = useRef(0)
  const charIndexRef = useRef(0)
  const deletingRef = useRef(false)
  const [typedRole, setTypedRole] = useState('')
  const nameRef = useRef(null)
  const photoCanvasRef = useRef(null)
  const photoWrapRef = useRef(null)

  const techOrbitItems = ['React', 'Node', 'Three.js', 'MongoDB', 'Docker', 'TypeScript']
  const ribbonItems = ['React', 'Node.js', 'MongoDB', 'Three.js', 'GSAP', 'TypeScript', 'Docker', 'Vite']

  /* Typewriter effect */
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

  /* GSAP char-split reveal for name */
  useEffect(() => {
    if (!nameRef.current) return
    const chars = nameRef.current.querySelectorAll('.hero-char')
    gsap.fromTo(
      chars,
      { opacity: 0, y: 60, rotateX: -90 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.9,
        stagger: 0.04,
        ease: 'power4.out',
        delay: 0.5,
      }
    )
    return () => gsap.killTweensOf(chars)
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || window.innerWidth <= 768) return

    const THREE = window.THREE
    if (!THREE || !photoCanvasRef.current || !photoWrapRef.current) return

    const canvas = photoCanvasRef.current
    const container = photoWrapRef.current

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.z = 2.5

    const geometry = new THREE.PlaneGeometry(1.8, 2.2, 32, 32)
    const texture = new THREE.TextureLoader().load('/assets/sachin.png')
    texture.minFilter = THREE.LinearFilter

    const uniforms = {
      uTime: { value: 0 },
      uTexture: { value: texture },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: 0 },
      uOpacity: { value: 1 },
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      vertexShader: `
        uniform float uTime;
        uniform float uMouse;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 pos = position;
          float wave = sin(pos.x * 3.0 + uTime * 0.8) * 0.018;
          float wave2 = cos(pos.y * 2.5 + uTime * 0.6) * 0.012;
          pos.z += wave + wave2;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uTime;
        uniform float uOpacity;
        uniform vec2 uResolution;
        varying vec2 vUv;
        void main() {
          vec2 uv = vUv;
          float aberr = 0.004 + sin(uTime * 0.4) * 0.001;
          float r = texture2D(uTexture, uv + vec2(aberr, 0.0)).r;
          float g = texture2D(uTexture, uv).g;
          float b = texture2D(uTexture, uv - vec2(aberr, 0.0)).b;
          float a = texture2D(uTexture, uv).a;
          vec4 color = vec4(r, g, b, a);
          float vignette = smoothstep(0.85, 0.35, length(uv - 0.5));
          color.rgb *= (0.88 + vignette * 0.22);
          color.rgb += vec3(0.02, 0.04, 0.12) * (1.0 - vignette);
          gl_FragColor = vec4(color.rgb, color.a * uOpacity);
        }
      `,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const updateSize = () => {
      const rect = container.getBoundingClientRect()
      const width = Math.max(rect.width, 1)
      const height = Math.max(rect.height, 1)
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      uniforms.uResolution.value.set(width, height)
    }

    updateSize()

    const onMouseMove = (event) => {
      const rx = (event.clientY / window.innerHeight - 0.5) * 0.25
      const ry = (event.clientX / window.innerWidth - 0.5) * -0.3
      gsap.to(mesh.rotation, { x: rx, y: ry, duration: 1.2, ease: 'power2.out' })
      uniforms.uMouse.value = Math.min(1, Math.max(0, event.clientX / window.innerWidth))
    }

    const clock = new THREE.Clock()
    let rafId = 0

    const animate = () => {
      uniforms.uTime.value = clock.getElapsedTime()
      mesh.position.y = Math.sin(uniforms.uTime.value * 0.5) * 0.018
      renderer.render(scene, camera)
      rafId = requestAnimationFrame(animate)
    }

    animate()

    gsap.from(mesh.scale, {
      x: 0.7,
      y: 0.7,
      z: 0.7,
      duration: 1.4,
      ease: 'expo.out',
      delay: 0.3,
    })
    gsap.from({ val: 0 }, {
      val: 1,
      duration: 1.4,
      ease: 'expo.out',
      delay: 0.3,
      onUpdate() {
        uniforms.uOpacity.value = this.targets()[0].val
      },
    })

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', updateSize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', updateSize)
      geometry.dispose()
      material.dispose()
      texture.dispose()
      renderer.dispose()
    }
  }, [])

  const heroSocials = socialLinks.filter((s) => s.id !== 'hackerrank')
  const iconMap = { SiGithub, SiLinkedin, SiLeetcode }

  /* Split "Sachin Kumar" into individual spans */
  const nameChars = 'Sachin Kumar'.split('').map((char, i) => (
    <span
      key={i}
      className="hero-char"
      style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))

  return (
    <section id="hero" className="hero scroll-reactive">
      <div className="hero-bg-image" aria-hidden="true" />
      <div className="container hero-content">
        <motion.div className="hero-split" variants={containerVariants} initial="hidden" animate="visible">
          <div className="hero-text-col">
            <AuraPanel>
              <motion.div variants={childVariants}>
                <NeoBadge className="hero-badge">{'< SS / > Creative Engineer'}</NeoBadge>
              </motion.div>

              <motion.div variants={childVariants}>
                <h1 className="hero-name" ref={nameRef} style={{ perspective: '600px' }}>
                  {nameChars}
                </h1>
              </motion.div>

              <motion.div variants={childVariants}>
                <p className="hero-role">
                  <span>{typedRole}</span>
                  <span className="cursor">|</span>
                </p>
              </motion.div>

              <motion.div variants={childVariants}>
                <p className="hero-subtitle">CSE @ LPU · Open to Opportunities</p>
              </motion.div>

              <motion.div variants={childVariants} className="hero-stat-grid">
                <GlassStat value="150+" label="LeetCode" />
                <GlassStat value="MERN" label="Production" />
                <GlassStat value="24/7" label="Builder Mode" />
              </motion.div>

              <motion.div variants={childVariants}>
                <MagneticButton>
                  <a href="#projects" className="hero-cta">
                    <PrismButton>View Projects →</PrismButton>
                  </a>
                </MagneticButton>
              </motion.div>

              <motion.div variants={childVariants}>
                <div className="hero-divider" />
              </motion.div>

              <motion.div variants={childVariants}>
                <div className="hero-socials">
                  {heroSocials.map((link) => {
                    const Icon = iconMap[link.icon]
                    return (
                      <MagneticButton key={link.id} strength={0.25}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {Icon && <Icon />} {link.label}
                        </a>
                      </MagneticButton>
                    )
                  })}
                </div>
              </motion.div>

              <motion.div variants={childVariants}>
                <TechRibbon items={ribbonItems} />
              </motion.div>

              <motion.div variants={childVariants}>
                <a href="#about" className="scroll-arrow" aria-label="Scroll down">
                  ↓
                </a>
              </motion.div>
            </AuraPanel>
          </div>

          <motion.div className="hero-photo-col" variants={childVariants}>
            <div className="hero-photo-stage" ref={photoWrapRef}>
              <div className="hero-photo-ring" aria-hidden="true">
                <div className="hero-photo-ring-mask" />
              </div>
              <canvas id="hero-photo-canvas" ref={photoCanvasRef} aria-hidden="true" />
              <img className="hero-photo-mobile" src="/assets/sachin.png" alt="Sachin Sharma" />

              <span className="photo-dot dot-1" aria-hidden="true" />
              <span className="photo-dot dot-2" aria-hidden="true" />
              <span className="photo-dot dot-3" aria-hidden="true" />

              <div className="photo-status-badge" aria-label="Available for Work">
                <span className="pulse-dot" />
                <span>Available for Work</span>
              </div>

              <div className="tech-orbit" aria-hidden="true">
                {techOrbitItems.map((item, index) => (
                  <span
                    key={item}
                    className="tech-orbit-item"
                    style={{ '--angle': `${(360 / techOrbitItems.length) * index}deg` }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
