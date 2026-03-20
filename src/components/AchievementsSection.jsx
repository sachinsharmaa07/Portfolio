import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const achievements = [
  {
    title: 'LeetCode 150+ Problems',
    slug: 'leetcode-streak',
    category: 'DSA',
    description: 'Solved 150+ problems on LeetCode covering arrays, trees, graphs, dynamic programming, and more in C++.',
    icon: '⚡',
    accent: 'var(--color-cyan)',
    stat: '150+',
    statLabel: 'Problems Solved',
  },
  {
    title: 'Production App — Akhada Analytics',
    slug: 'akhada-prod',
    category: 'Project',
    description: 'Shipped a full-stack fitness tracking MERN platform with 900+ item food database, Google OAuth, and JWT dual-token security architecture.',
    icon: '🚀',
    accent: 'var(--color-violet)',
    stat: '900+',
    statLabel: 'Item Food DB',
  },
  {
    title: 'E-lib Deployed on Vercel + Render',
    slug: 'elib-deploy',
    category: 'Deployment',
    description: 'Successfully deployed a full-stack library management system with separate frontend (Vercel) and backend (Render) pipelines.',
    icon: '🌐',
    accent: '#28C840',
    stat: '100%',
    statLabel: 'Uptime',
  },
  {
    title: 'CGPA 8.1 at LPU',
    slug: 'academic-excellence',
    category: 'Academic',
    description: 'Maintaining a strong 8.1 CGPA in B.Tech Computer Science at Lovely Professional University while working on multiple production projects.',
    icon: '🎓',
    accent: 'var(--color-magenta)',
    stat: '8.1',
    statLabel: 'CGPA',
  },
  {
    title: 'DevOps & Cloud Learner',
    slug: 'cloud-devops',
    category: 'Learning',
    description: 'Actively learning Docker, AWS, GCP, CI/CD pipelines and applying them to real-world project deployments.',
    icon: '☁️',
    accent: 'var(--color-cyan)',
    stat: '3+',
    statLabel: 'Tools Mastered',
  },
  {
    title: 'ImageKit CDN Integration',
    slug: 'imagekit-cdn',
    category: 'Technical',
    description: 'Integrated ImageKit CDN with Multer for optimized image upload, transformation and delivery in production backend systems.',
    icon: '🖼',
    accent: 'var(--color-violet)',
    stat: '60%',
    statLabel: 'Faster Load',
  },
];

function AchievementCard({ item, index }) {
  return (
    <ScrollReveal delay={index * 0.08}>
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="macos-card h-full"
      >
        {/* macOS Title Bar */}
        <div className="macos-titlebar">
          <div className="flex gap-1.5">
            <div className="traffic-light traffic-red" />
            <div className="traffic-light traffic-yellow" />
            <div className="traffic-light traffic-green" />
          </div>
          <span className="flex-1 text-center macos-path">
            ~/achievements/{item.slug}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded tracking-widest uppercase"
            style={{ background: 'rgba(var(--color-violet-rgb),0.16)', color: 'var(--color-violet)', fontFamily: 'var(--font-mono)' }}>
            {item.category}
          </span>
        </div>

        {/* Body */}
        <div className="macos-body flex flex-col gap-4">
          {/* Icon + Stat row */}
          <div className="flex items-center justify-between">
            <span className="text-3xl">{item.icon}</span>
            <div className="text-right">
              <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: item.accent }}>
                {item.stat}
              </div>
              <div className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>
                {item.statLabel}
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold leading-snug"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>
            {item.description}
          </p>

          {/* Accent bottom line */}
          <div className="h-[2px] w-12 rounded mt-auto" style={{ background: item.accent, opacity: 0.6 }} />
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function AchievementsSection() {
  return (
    <section id="achievements" className="section-padding relative" style={{ background: 'var(--color-void)' }}>
      {/* Subtle glow */}
      <div className="pointer-events-none absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, var(--color-magenta), transparent)' }} />

      <div className="relative content-shell">
        <ScrollReveal>
          <div className="accent-label mb-4 flex items-center gap-3">
            <span className="inline-block w-8 h-[1px]" style={{ background: 'var(--color-cyan)' }} />
            ACHIEVEMENTS
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-16"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>
            What I've <span className="text-gradient">Accomplished</span>
          </h2>
        </ScrollReveal>

        {/* 3-column grid on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((item, i) => (
            <AchievementCard key={item.slug} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
