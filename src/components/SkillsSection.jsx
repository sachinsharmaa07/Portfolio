import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ScrollReveal from './ScrollReveal';

const skillGroups = [
  {
    title: 'Languages',
    file: 'languages.sh',
    skills: ['JavaScript', 'C++', 'Java', 'Python', 'SQL', 'C'],
    accent: 'var(--color-cyan)',
  },
  {
    title: 'Frameworks & Libraries',
    file: 'frameworks.sh',
    skills: ['React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS', 'Socket.IO', 'Framer Motion'],
    accent: 'var(--color-violet)',
  },
  {
    title: 'Tools & Platforms',
    file: 'tools.sh',
    skills: ['Docker', 'Git', 'GitHub', 'MongoDB', 'MySQL', 'Vercel', 'Render', 'AWS'],
    accent: 'var(--color-magenta)',
  },
  {
    title: 'Concepts',
    file: 'concepts.sh',
    skills: ['DSA', 'REST APIs', 'JWT Auth', 'OAuth 2.0', 'CI/CD', 'Cloud Computing', 'MVC Architecture'],
    accent: '#28C840',
  },
];

function SkillTag({ skill, accent, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      className="inline-flex items-center text-sm px-4 py-2 rounded-lg cursor-default transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.04)',
        color: '#C0C0D0',
        border: '1px solid rgba(255,255,255,0.08)',
        fontFamily: 'var(--font-mono)',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      whileHover={{
        scale: 1.05,
        boxShadow: `0 0 12px ${accent}30`,
        borderColor: `${accent}60`,
        color: accent,
      }}
    >
      {skill}
    </motion.span>
  );
}

function MacOSSkillCard({ group, index }) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <div className="macos-card">
        {/* macOS Titlebar */}
        <div className="macos-titlebar">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF5F57' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FEBC2E' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28C840' }} />
          </div>
          <span
            className="flex-1 text-center text-xs"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}
          >
            {group.file}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: group.accent }}
            />
            <span
              className="text-sm font-semibold"
              style={{ fontFamily: 'var(--font-mono)', color: group.accent }}
            >
              {group.title}
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {group.skills.map((skill, si) => (
              <SkillTag key={skill} skill={skill} accent={group.accent} index={si} />
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="section-padding relative" style={{ background: 'var(--color-void)' }}>
      {/* Background glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-violet), transparent)' }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Label */}
        <ScrollReveal>
          <div className="accent-label mb-4 flex items-center gap-3">
            <span className="inline-block w-8 h-[1px]" style={{ background: 'var(--color-cyan)' }} />
            TECH STACK
          </div>
          <h2
            className="text-4xl lg:text-5xl font-bold mb-16"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}
          >
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
        </ScrollReveal>

        {/* macOS Skill Windows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skillGroups.map((group, i) => (
            <MacOSSkillCard key={group.title} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
