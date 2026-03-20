import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';

const projects = [
  {
    title: 'Akhada Analytics',
    slug: 'akhada-analytics',
    subtitle: 'Full-Stack Fitness Tracking Platform',
    description:
      'A mobile-first MERN fitness platform combining workout logging, nutrition tracking, and body analytics with JWT dual-token auth, Google OAuth, and a 900+ item food database.',
    highlights: [
      'Interactive Muscle Heatmap with 7-day frequency visualization',
      'Pre-built programs from elite athletes (CBum, Ronnie Coleman, Jeff Nippard)',
      'Production-grade security: Helmet, rate limiting, bcrypt, token-reuse detection',
    ],
    tech: ['React 19', 'Node.js', 'Express 5', 'MongoDB Atlas', 'Zustand', 'Recharts', 'Framer Motion', 'JWT', 'OAuth 2.0'],
    github: 'https://github.com/sachinsharmaa07',
    live: 'https://akhada-analytics.vercel.app/login',
    featured: true,
    date: "Feb '26",
  },
  {
    title: 'E-lib',
    slug: 'e-lib',
    subtitle: 'Digital Library Management System',
    description:
      'A full-stack MERN application to digitize library operations with secure book discovery, approval-driven borrowing workflows, and role-based administration.',
    highlights: [
      'Approval-driven borrowing architecture with inventory tracking',
      '3 core data models (Users, Books, Borrows) and 15+ RESTful APIs',
      'Optimized CRUD operations with protected admin routes',
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Vercel', 'Render'],
    github: 'https://github.com/sachinsharmaa07',
    live: null,
    featured: false,
    date: "Dec '25",
  },
  {
    title: 'Portfolio v1',
    slug: 'portfolio-v1',
    subtitle: 'Personal Developer Portfolio',
    description:
      'A minimal card-based portfolio with smooth scroll (Lenis), dark/light toggle, and pure CSS animations — zero UI frameworks. Optimized build: JS 55KB, CSS 3.4KB gzipped.',
    highlights: [
      'Smooth scroll with Lenis, custom CSS animations using custom properties',
      'Auto-deploy on Vercel with optimized Vite 5 build pipeline',
      'Downloadable CV, project showcase, and contact section',
    ],
    tech: ['React 18', 'Vite 5', 'Lenis', 'Pure CSS', 'Vercel'],
    github: 'https://github.com/sachinsharmaa07',
    live: 'https://sachinsharmaa07.vercel.app/',
    featured: false,
    date: "Nov '25",
  },
];

function MacOSProjectCard({ project }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="macos-card group"
    >
      {/* macOS Titlebar */}
      <div className="macos-titlebar">
        <div className="flex gap-1.5">
          <div className="traffic-light traffic-red" />
          <div className="traffic-light traffic-yellow" />
          <div className="traffic-light traffic-green" />
        </div>
        <span className="flex-1 text-center text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>
          ~/projects/{project.slug}
        </span>
        <div className="flex gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: 'var(--color-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
            >
              <FiGithub size={15} />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: 'var(--color-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
            >
              <FiExternalLink size={15} />
            </a>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 md:p-7">
        {/* Featured badge */}
        {project.featured && (
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-4 text-[10px] tracking-widest uppercase rounded-full"
            style={{
              fontFamily: 'var(--font-mono)',
              background: 'rgba(0,255,194,0.1)',
              color: 'var(--color-cyan)',
              border: '1px solid rgba(0,255,194,0.2)',
            }}
          >
            ◆ FEATURED
          </span>
        )}

        {/* Title */}
        <div className="flex items-center gap-3 mb-1">
          <h3
            className="text-2xl font-bold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            {project.title}
          </h3>
          <span
            className="text-[10px] px-2 py-0.5 rounded"
            style={{ background: 'rgba(123,92,250,0.15)', color: 'var(--color-violet)', fontFamily: 'var(--font-mono)' }}
          >
            {project.date}
          </span>
        </div>
        <p className="text-sm mb-3" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-violet)' }}>
          {project.subtitle}
        </p>

        {/* Description */}
        <p
          className="text-base leading-relaxed mb-5"
          style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}
        >
          {project.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-2 mb-6">
          {project.highlights.map((h, j) => (
            <li key={j} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-muted)' }}>
              <span style={{ color: 'var(--color-cyan)', marginTop: '2px', flexShrink: 0 }}>▸</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{h}</span>
            </li>
          ))}
        </ul>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-xs rounded-full transition-colors duration-200"
              style={{
                fontFamily: 'var(--font-mono)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'var(--color-muted)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-cyan)';
                e.currentTarget.style.borderColor = 'rgba(0,255,194,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-muted)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="work" className="section-padding" style={{ background: 'var(--color-void)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <ScrollReveal>
          <div className="accent-label mb-4 flex items-center gap-3">
            <span className="inline-block w-8 h-[1px]" style={{ background: 'var(--color-cyan)' }} />
            FEATURED WORK
          </div>
          <h2
            className="text-4xl lg:text-5xl font-bold mb-16"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}
          >
            Projects I've <span className="text-gradient">Built</span>
          </h2>
        </ScrollReveal>

        {/* Grid: Featured spans full, others side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ScrollReveal
              key={project.slug}
              delay={i * 0.12}
              className={project.featured ? 'lg:col-span-2' : ''}
            >
              <MacOSProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
