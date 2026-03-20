import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const educationData = [
  {
    degree: 'B.Tech — Computer Science & Engineering',
    institution: 'Lovely Professional University',
    location: 'Punjab, India',
    period: '2023 – Present',
    cgpa: '8.1 / 10',
    slug: 'lpu-btech',
    highlights: [
      'Specialization in Cloud Computing & DevOps',
      'Active member of coding society — 3 hackathons participated',
      'Coursework: DSA, DBMS, OS, Computer Networks, Cloud Architecture',
    ],
    accent: 'var(--color-cyan)',
  },
  {
    degree: 'Senior Secondary — Science (PCM)',
    institution: 'BSF Senior Secondary School, Jammu',
    location: 'Jammu , J&K',
    period: '2020 – 2022',
    cgpa: '88%',
    slug: 'dps-12th',
    highlights: [
      'Physics, Chemistry, Mathematics stream',
      'School-level programming competition finalist',
    ],
    accent: 'var(--color-violet)',
  },
];

function EduCard({ edu, index }) {
  return (
    <ScrollReveal delay={index * 0.12}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="macos-card"
      >
        {/* macOS Title Bar */}
        <div className="macos-titlebar">
          <div className="flex gap-1.5">
            <div className="traffic-light traffic-red" />
            <div className="traffic-light traffic-yellow" />
            <div className="traffic-light traffic-green" />
          </div>
          <span className="flex-1 text-center text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>
            ~/education/{edu.slug}
          </span>
          <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(0,255,194,0.08)', color: edu.accent, fontFamily: 'var(--font-mono)' }}>
            {edu.cgpa}
          </span>
        </div>

        {/* Body */}
        <div className="p-6 md:p-7">
          {/* Period badge */}
          <span className="inline-flex items-center px-2.5 py-1 mb-4 text-[10px] tracking-widest uppercase rounded-full"
            style={{ fontFamily: 'var(--font-mono)', background: `rgba(123,92,250,0.1)`, color: 'var(--color-violet)', border: '1px solid rgba(123,92,250,0.2)' }}>
            {edu.period}
          </span>

          <h3 className="text-2xl font-bold mb-1"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
            {edu.degree}
          </h3>
          <p className="text-sm mb-1" style={{ fontFamily: 'var(--font-mono)', color: edu.accent }}>
            {edu.institution}
          </p>
          <p className="text-xs mb-5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>
            📍 {edu.location}
          </p>

          <ul className="space-y-2">
            {edu.highlights.map((h, j) => (
              <li key={j} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-muted)' }}>
                <span style={{ color: edu.accent, marginTop: '2px', flexShrink: 0 }}>▸</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function EducationSection() {
  return (
    <section id="education" className="section-padding" style={{ background: 'var(--color-void)' }}>
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="accent-label mb-4 flex items-center gap-3">
            <span className="inline-block w-8 h-[1px]" style={{ background: 'var(--color-cyan)' }} />
            EDUCATION
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-16"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>
            Academic <span className="text-gradient">Background</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {educationData.map((edu, i) => (
            <EduCard key={edu.slug} edu={edu} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
