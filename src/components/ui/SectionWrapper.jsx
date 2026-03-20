import { motion } from 'framer-motion'

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function SectionWrapper({ id, className = '', children }) {
  return (
    <motion.section
      id={id}
      className={`section scroll-reactive ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      variants={sectionVariants}
    >
      {children}
    </motion.section>
  )
}
