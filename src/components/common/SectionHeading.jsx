import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

// Reusable section heading with an animated eyebrow + title.
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  light = false,
}) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={`flex max-w-2xl flex-col gap-4 ${alignment}`}
    >
      {eyebrow && (
        <span className={`eyebrow ${light ? '!text-ultrablue-300' : ''}`}>
          <span className="h-px w-6 bg-current opacity-60" />
          {eyebrow}
        </span>
      )}
      <h2 className={`section-title ${light ? '!text-white' : ''}`}>{title}</h2>
      {subtitle && (
        <p className={`text-base leading-relaxed ${light ? 'text-sand-100/70' : 'text-ink-700/70'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
