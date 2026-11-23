import { motion } from 'framer-motion'

// Shared inner-page hero band: eyebrow, title, subtitle.
export default function PageHeader({ eyebrow, title, subtitle, children }) {
  return (
    <section className="relative overflow-hidden border-b border-ink-700/10 bg-ink-950 py-16 text-sand-100 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-ultrablue-600/20 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="container-uf relative"
      >
        {eyebrow && (
          <span className="eyebrow !text-ultrablue-300">
            <span className="h-px w-6 bg-current opacity-60" />
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 font-archivo text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-sand-100/70">{subtitle}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </motion.div>
    </section>
  )
}
