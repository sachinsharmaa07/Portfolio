import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

function Counter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="text-gradient">
      {count}{suffix}
    </span>
  );
}

const stats = [
  { value: 3, suffix: '+', label: 'Production Projects' },
  { value: 100, suffix: '+', label: 'LeetCode Problems' },
  { value: 8.0, suffix: '', label: 'CGPA at LPU' },
];

const terminalLines = [
  { prefix: 'const', text: ' sachin = {', color: 'var(--color-violet)' },
  { prefix: '  role:', text: ' "Full-Stack MERN Developer",', color: 'var(--color-cyan)' },
  { prefix: '  stack:', text: ' ["React", "Node", "Express", "MongoDB"],', color: 'var(--color-cyan)' },
  { prefix: '  dsa:', text: ' "C++ | 100+ LeetCode",', color: 'var(--color-cyan)' },
  { prefix: '  learning:', text: ' ["AWS", "Docker", "DevOps"],', color: 'var(--color-cyan)' },
  { prefix: '  education:', text: ' "B.Tech CS @ LPU",', color: 'var(--color-cyan)' },
  { prefix: '  mindset:', text: ' "Build → Ship → Iterate"', color: 'var(--color-magenta)' },
  { prefix: '};', text: '', color: 'var(--color-violet)' },
];

export default function AboutSection() {
  const terminalRef = useRef(null);
  const isInView = useInView(terminalRef, { once: true });

  return (
    <section id="about" className="section-padding" style={{ background: 'var(--color-void)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <ScrollReveal>
          <div className="accent-label mb-4 flex items-center gap-3">
            <span className="inline-block w-8 h-[1px]" style={{ background: 'var(--color-cyan)' }} />
            ABOUT ME
          </div>
          <h2
            className="text-4xl lg:text-5xl font-bold mb-16"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}
          >
            Who I <span className="text-gradient">Am</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column */}
          <div>
            {/* Stats */}
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-3 gap-6 mb-10">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <div
                      className="text-3xl md:text-4xl font-bold mb-1"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      <Counter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Bio */}
            <ScrollReveal delay={0.2}>
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}
              >
                I'm <span style={{ color: 'var(--color-text)' }}>Sachin</span>, a Full-Stack MERN Developer and B.Tech Computer Science
                student at Lovely Professional University. I'm passionate about building production-grade web applications
                with clean architectures and optimized performance.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}
              >
                Currently deepening my DSA skills in C++ (100+ LeetCode problems) while exploring Cloud Computing with AWS,
                Docker, and DevOps tooling. I believe in the power of iterative building — ship fast, gather feedback, optimize relentlessly.
              </p>
            </ScrollReveal>
          </div>

          {/* Right Column — Terminal macOS Card */}
          <ScrollReveal delay={0.3}>
            <div ref={terminalRef} className="macos-card glow-violet">
              {/* macOS Titlebar */}
              <div className="macos-titlebar">
                <div className="flex gap-1.5">
                  <div className="traffic-light traffic-red" />
                  <div className="traffic-light traffic-yellow" />
                  <div className="traffic-light traffic-green" />
                </div>
                <span className="ml-3 text-xs" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>
                  ~/sachin/profile.js
                </span>
              </div>

              {/* Terminal Body */}
              <div className="p-5 text-sm leading-7" style={{ fontFamily: 'var(--font-mono)' }}>
                {terminalLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                  >
                    <span style={{ color: line.color }}>{line.prefix}</span>
                    <span style={{ color: 'var(--color-text)' }}>{line.text}</span>
                  </motion.div>
                ))}
                <motion.span
                  className="inline-block w-2 h-4 mt-2"
                  style={{ background: 'var(--color-cyan)' }}
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
