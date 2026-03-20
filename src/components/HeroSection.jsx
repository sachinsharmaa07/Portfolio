import { lazy, Suspense, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiDownload, FiArrowDown } from 'react-icons/fi';
import {
  SiLeetcode, SiReact, SiNodedotjs, SiMongodb, SiDocker,
  SiJavascript, SiCplusplus, SiExpress, SiGit, SiLinux,
  SiTailwindcss, SiTypescript,
} from 'react-icons/si';
import AnimatedText from './AnimatedText';
import { useTypewriter } from '../hooks/useTypewriter';

const HeroScene = lazy(() => import('./HeroScene'));

const socialLinks = [
  { icon: FiGithub, href: 'https://github.com/sachinsharmaa07', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/sachinsharmaa07', label: 'LinkedIn' },
  { icon: SiLeetcode, href: 'https://leetcode.com/u/sachinsharmaa07', label: 'LeetCode' },
];

// Floating tech icons — each with position, animation params, and color
const floatingIcons = [
  { icon: SiReact,       color: '#61DAFB', top: '12%', left: '8%',  delay: 0,    dur: 8.5, rotateA: -14, rotateB: 10 },
  { icon: SiNodedotjs,   color: '#68A063', top: '70%', left: '10%', delay: 0.8,  dur: 9.2, rotateA: -11, rotateB: 13 },
  { icon: SiMongodb,     color: '#4DB33D', top: '85%', left: '30%', delay: 1.6,  dur: 7.8, rotateA: -16, rotateB: 8 },
  { icon: SiDocker,      color: '#2496ED', top: '15%', left: '85%', delay: 0.4,  dur: 9.8, rotateA: -9, rotateB: 15 },
  { icon: SiJavascript,  color: '#F7DF1E', top: '55%', left: '90%', delay: 1.2,  dur: 8.3, rotateA: -18, rotateB: 7 },
  { icon: SiCplusplus,   color: '#00599C', top: '80%', left: '80%', delay: 0.2,  dur: 9.1, rotateA: -12, rotateB: 12 },
  { icon: SiGit,         color: '#F05032', top: '35%', left: '93%', delay: 2.0,  dur: 7.5, rotateA: -15, rotateB: 9 },
  { icon: SiLinux,       color: '#FCC624', top: '25%', left: '4%',  delay: 1.4,  dur: 10.4, rotateA: -8, rotateB: 14 },
  { icon: SiTailwindcss, color: '#38BDF8', top: '50%', left: '6%',  delay: 0.6,  dur: 8.8, rotateA: -13, rotateB: 11 },
  { icon: SiTypescript,  color: '#3178C6', top: '90%', left: '55%', delay: 1.0,  dur: 9.6, rotateA: -10, rotateB: 16 },
  { icon: SiExpress,     color: '#aaaaaa', top: '8%',  left: '55%', delay: 1.8,  dur: 8.1, rotateA: -17, rotateB: 6 },
  { icon: SiReact,       color: '#61DAFB', top: '18%', left: '24%', delay: 0.5,  dur: 8.9, rotateA: -12, rotateB: 14 },
  { icon: SiNodedotjs,   color: '#68A063', top: '74%', left: '44%', delay: 1.1,  dur: 9.4, rotateA: -9, rotateB: 13 },
  { icon: SiDocker,      color: '#2496ED', top: '28%', left: '76%', delay: 1.7,  dur: 10.1, rotateA: -14, rotateB: 10 },
  { icon: SiTypescript,  color: '#3178C6', top: '38%', left: '14%', delay: 2.2,  dur: 8.6, rotateA: -16, rotateB: 7 },
  { icon: SiMongodb,     color: '#4DB33D', top: '62%', left: '72%', delay: 2.6,  dur: 9.7, rotateA: -11, rotateB: 12 },
  { icon: SiGit,         color: '#F05032', top: '9%',  left: '40%', delay: 2.9,  dur: 8.2, rotateA: -15, rotateB: 8 },
];

function FloatingTechIcons() {
  const prefersReducedMotion = useReducedMotion();
  const [isCompactViewport, setIsCompactViewport] = useState(false);

  useEffect(() => {
    const syncViewport = () => setIsCompactViewport(window.innerWidth < 1024);
    syncViewport();
    window.addEventListener('resize', syncViewport, { passive: true });
    return () => window.removeEventListener('resize', syncViewport);
  }, []);

  const visibleIcons = isCompactViewport ? floatingIcons.slice(0, 11) : floatingIcons;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {visibleIcons.map(({ icon: Icon, color, top, left, delay, dur, rotateA, rotateB }, i) => (
        <motion.div
          key={i}
          className="absolute floating-tech-icon"
          style={{ top, left }}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={prefersReducedMotion
            ? { opacity: 0.22, y: 0, rotate: 0, scale: 1 }
            : {
                opacity: [0, 0.45, 0.3, 0.42, 0],
                y: [0, -20, -4, -16, 0],
                rotate: [rotateA, rotateB, rotateA],
                scale: [0.94, 1.04, 0.98, 1.05, 0.94],
              }}
          transition={{
            duration: dur,
            delay,
            repeat: Infinity,
            ease: [0.42, 0, 0.58, 1],
          }}
        >
          <div
            className="p-3.5 rounded-2xl"
            style={{
              background: `${color}1c`,
              border: `1px solid ${color}3a`,
              backdropFilter: 'blur(6px)',
            }}
          >
            <Icon size={34} color={color} style={{ filter: `drop-shadow(0 0 10px ${color}88)` }} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const subtitle = useTypewriter(
    ['MERN Stack · C++ DSA · Cloud & DevOps', 'React · Node.js · Express · MongoDB', 'Docker · AWS · CI/CD · Git'],
    80,
    40,
    2500
  );

  return (
    <section
      id="hero"
      className="relative w-full flex items-center overflow-hidden"
      style={{ minHeight: '100vh', background: 'var(--color-void)' }}
    >
      {/* 3D Background */}
      <Suspense fallback={<div className="absolute inset-0" style={{ background: 'var(--color-void)' }} />}>
        <HeroScene />
      </Suspense>

      {/* Floating Tech Icons */}
      <FloatingTechIcons />

      {/* Gradient Orbs */}
      <div className="pointer-events-none absolute top-1/4 left-1/3 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-violet), transparent)' }} />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-cyan), transparent)' }} />

      {/* Two-Column Content */}
      <div className="relative z-10 content-shell grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center pt-24 md:pt-28 lg:pt-20 pb-12 md:pb-16">

        {/* LEFT — Text column, shifted right with padding + margin */}
        <div className="text-left order-2 lg:order-1 max-w-2xl lg:pl-8 xl:pl-14 pr-1 lg:pr-4 mx-auto lg:mx-0">

          {/* Eyebrow */}
          <motion.div
            className="accent-label mb-6 flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block w-6 h-[2px]" style={{ background: 'var(--color-cyan)' }} />
            FULL-STACK DEVELOPER
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-6"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            Sachin <span className="text-gradient">Kumar</span>
          </motion.h1>

          {/* Tagline */}
          <motion.div
            className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-7 leading-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-muted)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <AnimatedText text="Building Systems That Scale." delay={0.6} />
          </motion.div>

          {/* Typewriter Subtitle */}
          <motion.p
            className="text-base lg:text-lg mb-12 leading-relaxed"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)', minHeight: '34px', maxWidth: '40ch' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            {subtitle}
            <span className="inline-block w-[2px] h-5 ml-1 align-middle animate-caret-blink"
              style={{ background: 'var(--color-cyan)' }} />
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <a href="#work"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold no-underline btn-neon"
              style={{ background: 'var(--color-cyan)', color: 'var(--color-void)', fontFamily: 'var(--font-display)' }}>
              View My Work
            </a>
            <a href="/CV_Sachin_Final.pdf" download
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold no-underline btn-neon-outline"
              style={{ background: 'transparent', color: 'var(--color-cyan)', border: '1px solid var(--color-cyan)', fontFamily: 'var(--font-display)' }}>
              <FiDownload size={16} />
              CV
            </a>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="w-16 h-[1px] mb-10"
            style={{ background: 'rgba(255,255,255,0.1)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          />

          {/* Social Icons — spaced out row with labels */}
          <motion.div
            className="flex flex-wrap items-center gap-x-7 gap-y-5 sm:gap-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="group flex flex-col items-center gap-2 no-underline"
              >
                <div
                  className="p-3.5 rounded-xl hero-social-icon transition-all duration-300 group-hover:scale-110"
                >
                  <Icon size={26} />
                </div>
                <span className="text-[10px] tracking-widest uppercase"
                  style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>
                  {label}
                </span>
              </a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — Photo */}
        <motion.div
          className="flex items-center justify-center relative order-1 lg:order-2 mb-4 lg:mb-0"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Outer rotating glow ring */}
          <div className="absolute w-[308px] h-[308px] md:w-[368px] md:h-[368px] rounded-full animate-spin-slow"
            style={{ background: 'conic-gradient(from 0deg, var(--color-cyan), var(--color-violet), var(--color-magenta), var(--color-cyan))' }} />
          {/* Inner void buffer */}
          <div className="absolute w-[302px] h-[302px] md:w-[362px] md:h-[362px] rounded-full"
            style={{ background: 'var(--color-void)' }} />

          {/* Photo container */}
          <div className="relative w-[288px] h-[288px] md:w-[348px] md:h-[348px] rounded-full overflow-hidden z-10"
            style={{ boxShadow: '0 0 60px rgba(var(--color-cyan-rgb),0.2), 0 0 120px rgba(var(--color-violet-rgb),0.14)' }}>
            <img
              src="/sachin.jpg"
              alt="Sachin Kumar"
              className="w-full h-full object-cover object-top"
              style={{ filter: 'none', mixBlendMode: 'normal' }}
            />
            {/* Subtle color overlay */}
            <div className="absolute inset-0 rounded-full"
              style={{ background: 'linear-gradient(160deg, rgba(var(--color-cyan-rgb),0.07) 0%, rgba(var(--color-violet-rgb),0.11) 100%)', pointerEvents: 'none' }} />
          </div>

          {/* Available badge */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap"
            style={{ background: 'rgba(8,10,20,0.92)', border: '1px solid rgba(var(--color-cyan-rgb),0.38)', backdropFilter: 'blur(10px)' }}>
            <motion.span className="w-2 h-2 rounded-full" style={{ background: 'var(--color-cyan)' }}
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <span className="text-[11px] tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-cyan)' }}>
              AVAILABLE FOR WORK
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}>
        <span className="text-[10px] tracking-widest" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>SCROLL</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <FiArrowDown size={16} style={{ color: 'var(--color-cyan)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
