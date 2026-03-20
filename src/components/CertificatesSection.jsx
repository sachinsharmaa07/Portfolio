import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';

const certificates = [
  {
    title: 'Summer Training — Centre for Professional Enhancement',
    issuer: 'Lovely Professional University',
    issued: "Jul '25",
    category: 'Summer Training',
    slug: 'summer-training-cpe',
    description: 'Completed summer training under Centre for Professional Enhancement and earned a Certificate of Merit for strong performance and practical proficiency.',
    skills: ['Practical Training', 'Project Execution', 'Problem Solving', 'Professional Skills'],
    accent: 'var(--color-cyan)',
    link: 'https://drive.google.com/file/d/1sgRzJcGU7w9SP3WbyQCQoZh6hWXLvi3P/view?usp=drive_link',
  },
  {
    title: 'ChatGPT-4 Prompt Engineering: ChatGPT, Generative AI & LLM',
    issuer: 'Certification Program',
    issued: "Jul '25",
    category: 'Certification',
    slug: 'chatgpt4-prompt-engineering',
    description: 'Learned structured prompt design, context framing, iteration techniques, and practical use of LLMs for productivity and engineering workflows.',
    skills: ['Prompt Engineering', 'LLMs', 'Generative AI', 'AI Workflows'],
    accent: 'var(--color-violet)',
    link: 'https://drive.google.com/file/d/126n7dSroGPs20USTaOgxfKMEDQDx1Rp4/view?usp=sharing',
  },
  {
    title: 'Cloud Computing — NPTEL, IIT Kharagpur',
    issuer: 'NPTEL',
    issued: "Apr '25",
    category: 'Certification',
    slug: 'cloud-computing-nptel-iit-kharagpur',
    description: 'Covered cloud service models, virtualization fundamentals, distributed systems concepts, and architecture-level understanding of cloud platforms.',
    skills: ['Cloud Computing', 'Virtualization', 'Distributed Systems', 'Architecture'],
    accent: 'var(--color-magenta)',
    link: 'https://drive.google.com/file/d/1iZnoJRZ67coF5mBbS5-wX8I382Mex-AP/view?usp=drive_link',
  },
];

function CertificateCard({ certificate, index }) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="macos-card h-full"
      >
        <div className="macos-titlebar">
          <div className="flex gap-1.5">
            <div className="traffic-light traffic-red" />
            <div className="traffic-light traffic-yellow" />
            <div className="traffic-light traffic-green" />
          </div>
          <span className="flex-1 text-center macos-path">
            ~/certificates/{certificate.slug}
          </span>
          <span
            className="text-[10px] px-2 py-0.5 rounded tracking-widest uppercase"
            style={{
              background: 'rgba(var(--color-violet-rgb),0.16)',
              color: 'var(--color-violet)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {certificate.category}
          </span>
        </div>

        <div className="macos-body flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3
                className="text-xl font-bold leading-snug"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
              >
                {certificate.title}
              </h3>
              <p className="text-sm mt-1" style={{ color: certificate.accent, fontFamily: 'var(--font-mono)' }}>
                {certificate.issuer}
              </p>
            </div>
            <span
              className="text-[10px] px-2 py-1 rounded"
              style={{
                background: 'rgba(var(--color-cyan-rgb),0.12)',
                color: 'var(--color-cyan)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {certificate.issued}
            </span>
          </div>

          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>
            {certificate.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-1">
            {certificate.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-xs rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.11)',
                  color: 'var(--color-muted)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {certificate.link && (
            <a
              href={certificate.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-auto text-sm no-underline"
              style={{ color: 'var(--color-cyan)', fontFamily: 'var(--font-mono)' }}
            >
              View Certificate <FiExternalLink size={14} />
            </a>
          )}

          <div className="h-[2px] w-14 rounded mt-auto" style={{ background: certificate.accent, opacity: 0.65 }} />
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function CertificatesSection() {
  return (
    <section id="certificates" className="section-padding" style={{ background: 'var(--color-void)' }}>
      <div className="content-shell">
        <ScrollReveal>
          <div className="accent-label mb-4 flex items-center gap-3">
            <span className="inline-block w-8 h-[1px]" style={{ background: 'var(--color-cyan)' }} />
            CERTIFICATIONS
          </div>
          <h2
            className="text-4xl lg:text-5xl font-bold mb-16"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}
          >
            Verified <span className="text-gradient">Credentials</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificates.map((certificate, index) => (
            <CertificateCard key={certificate.slug} certificate={certificate} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
