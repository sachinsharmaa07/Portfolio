import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiSend } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import ScrollReveal from './ScrollReveal';

const contactLinks = [
  { icon: FiGithub, href: 'https://github.com/sachinsharmaa07', label: 'GitHub', handle: 'sachinsharmaa07' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/sachinsharmaa07', label: 'LinkedIn', handle: 'sachinsharmaa07' },
  { icon: SiLeetcode, href: 'https://leetcode.com/u/sachinsharmaa07', label: 'LeetCode', handle: 'sachinsharmaa07' },
  { icon: FiMail, href: 'mailto:studentgroup479@gmail.com', label: 'Email', handle: 'studentgroup479@gmail.com' },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.location.href = `mailto:studentgroup479@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => setSending(false), 1000);
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'var(--color-text)',
    fontFamily: 'var(--font-mono)',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  };

  const focusStyle = (e) => {
    e.target.style.borderColor = 'var(--color-cyan)';
    e.target.style.boxShadow = '0 0 20px rgba(0,255,194,0.1)';
  };

  const blurStyle = (e) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.08)';
    e.target.style.boxShadow = 'none';
  };

  return (
    <section id="contact" className="section-padding relative" style={{ background: 'var(--color-void)' }}>
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, var(--color-cyan), var(--color-violet), transparent)' }}
      />

      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="accent-label mb-4 flex items-center justify-center gap-3">
              <span className="inline-block w-8 h-[1px]" style={{ background: 'var(--color-cyan)' }} />
              GET IN TOUCH
              <span className="inline-block w-8 h-[1px]" style={{ background: 'var(--color-cyan)' }} />
            </div>
            <h2
              className="text-5xl lg:text-7xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}
            >
              Let's <span className="text-gradient">Connect</span>
            </h2>
            <p className="text-base mx-auto max-w-lg" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>
              Have a project in mind or want to collaborate? I'm always open to discussing new opportunities.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ScrollReveal delay={0.1}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3.5 rounded-lg"
                style={{ ...inputStyle, minHeight: '52px' }}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3.5 rounded-lg"
                style={{ ...inputStyle, minHeight: '52px' }}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
              <textarea
                placeholder="Your Message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3.5 rounded-lg resize-none"
                style={{ ...inputStyle, minHeight: '140px' }}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
              <motion.button
                type="submit"
                disabled={sending}
                className="w-full inline-flex items-center justify-center gap-2 py-4 text-base font-semibold rounded-lg transition-all duration-300"
                style={{
                  background: 'var(--color-cyan)',
                  color: 'var(--color-void)',
                  fontFamily: 'var(--font-display)',
                  border: 'none',
                  cursor: 'pointer',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <FiSend size={18} />
                {sending ? 'Opening Mail...' : 'Send Message'}
              </motion.button>
            </form>
          </ScrollReveal>

          {/* Social Links */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col gap-4">
              {contactLinks.map(({ icon: Icon, href, label, handle }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-xl no-underline transition-all duration-300"
                  style={{ background: 'var(--color-card)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0,255,194,0.3)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,194,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="p-3 rounded-lg" style={{ background: 'rgba(0,255,194,0.06)' }}>
                    <Icon size={20} style={{ color: 'var(--color-cyan)' }} />
                  </div>
                  <div>
                    <div className="text-base font-semibold" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
                      {label}
                    </div>
                    <div className="text-sm" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>
                      {handle}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
