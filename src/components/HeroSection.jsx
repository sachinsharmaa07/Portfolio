import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
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
  { icon: SiReact,       color: '#61DAFB', top: '12%', left: '8%',  delay: 0,    dur: 6 },
  { icon: SiNodedotjs,   color: '#68A063', top: '70%', left: '10%', delay: 0.8,  dur: 7 },
  { icon: SiMongodb,     color: '#4DB33D', top: '85%', left: '30%', delay: 1.6,  dur: 5.5 },
  { icon: SiDocker,      color: '#2496ED', top: '15%', left: '85%', delay: 0.4,  dur: 8 },
  { icon: SiJavascript,  color: '#F7DF1E', top: '55%', left: '90%', delay: 1.2,  dur: 6 },
  { icon: SiCplusplus,   color: '#00599C', top: '80%', left: '80%', delay: 0.2,  dur: 7 },
  { icon: SiGit,         color: '#F05032', top: '35%', left: '93%', delay: 2.0,  dur: 5 },
  { icon: SiLinux,       color: '#FCC624', top: '25%', left: '4%',  delay: 1.4,  dur: 9 },
  { icon: SiTailwindcss, color: '#38BDF8', top: '50%', left: '6%',  delay: 0.6,  dur: 6.5 },
  { icon: SiTypescript,  color: '#3178C6', top: '90%', left: '55%', delay: 1.0,  dur: 7.5 },
  { icon: SiExpress,     color: '#aaaaaa', top: '8%',  left: '55%', delay: 1.8,  dur: 5.5 },
];

function FloatingTechIcons() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {floatingIcons.map(({ icon: Icon, color, top, left, delay, dur }, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top, left }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0, 0.35, 0.2, 0.35, 0], y: [0, -20, 0, -10, 0] }}
          transition={{
            duration: dur,
            delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div
            className="p-2 rounded-xl"
            style={{
              background: `${color}12`,
              border: `1px solid ${color}25`,
              backdropFilter: 'blur(4px)',
            }}
          >
            <Icon size={22} color={color} style={{ filter: `drop-shadow(0 0 6px ${color}88)` }} />
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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-16">

        {/* LEFT — Text column, shifted right with padding + margin */}
        <div className="text-left order-2 lg:order-1 lg:pl-20">

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
            className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            Sachin <span className="text-gradient">Kumar</span>
          </motion.h1>

          {/* Tagline */}
          <motion.div
            className="text-2xl sm:text-3xl font-semibold mb-5"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-muted)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <AnimatedText text="Building Systems That Scale." delay={0.6} />
          </motion.div>

          {/* Typewriter Subtitle */}
          <motion.p
            className="text-base lg:text-lg mb-12"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)', minHeight: '28px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            {subtitle}
            <span className="inline-block w-[2px] h-5 ml-1 align-middle"
              style={{ background: 'var(--color-cyan)', animation: 'blink 1s step-end infinite' }} />
            <style>{`@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-5 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <a href="#work"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold no-underline transition-all duration-300 hover:scale-105"
              style={{ background: 'var(--color-cyan)', color: 'var(--color-void)', fontFamily: 'var(--font-display)' }}>
              View My Work
            </a>
            <a href="/CV_Sachin_Final.pdf" download
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold no-underline transition-all duration-300 hover:scale-105"
              style={{ background: 'transparent', color: 'var(--color-cyan)', border: '1px solid var(--color-cyan)', fontFamily: 'var(--font-display)' }}>
              <FiDownload size={16} />
              CV
            </a>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="w-16 h-[1px] mb-8"
            style={{ background: 'rgba(255,255,255,0.1)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          />

          {/* Social Icons — spaced out row with labels */}
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="group flex flex-col items-center gap-1.5 no-underline"
              >
                <div
                  className="p-3.5 rounded-xl transition-all duration-300 group-hover:scale-110"
                  style={{ color: 'var(--color-muted)', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-cyan)'; e.currentTarget.style.borderColor = 'rgba(0,255,194,0.4)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(0,255,194,0.15)'; e.currentTarget.style.background = 'rgba(0,255,194,0.06)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-muted)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
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
          className="flex items-center justify-center relative order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Outer rotating glow ring */}
          <div className="absolute w-[308px] h-[308px] md:w-[368px] md:h-[368px] rounded-full animate-spin-slow"
            style={{ background: 'conic-gradient(from 0deg, #00FFC2, #7B5CFA, #FF3CAC, #00FFC2)' }} />
          {/* Inner void buffer */}
          <div className="absolute w-[302px] h-[302px] md:w-[362px] md:h-[362px] rounded-full"
            style={{ background: 'var(--color-void)' }} />

          {/* Photo container */}
          <div className="relative w-[288px] h-[288px] md:w-[348px] md:h-[348px] rounded-full overflow-hidden z-10"
            style={{ boxShadow: '0 0 60px rgba(0,255,194,0.18), 0 0 120px rgba(123,92,250,0.1)' }}>
            <img
              src="/sachin.jpg"
              alt="Sachin Kumar"
              className="w-full h-full object-cover object-top"
              style={{ filter: 'none', mixBlendMode: 'normal' }}
            />
            {/* Subtle color overlay */}
            <div className="absolute inset-0 rounded-full"
              style={{ background: 'linear-gradient(160deg, rgba(0,255,194,0.05) 0%, rgba(123,92,250,0.07) 100%)', pointerEvents: 'none' }} />
          </div>

          {/* Available badge */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap"
            style={{ background: 'rgba(8,8,16,0.92)', border: '1px solid rgba(0,255,194,0.35)', backdropFilter: 'blur(10px)' }}>
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
