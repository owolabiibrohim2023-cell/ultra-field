import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Truck, ShieldCheck, MapPin } from 'lucide-react'
import heroPhoto from '../../assets/photos/hero.jpg'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay } },
})

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-ink-950 sm:min-h-[76vh] lg:min-h-[88vh]">
      {/* Photographic background */}
      <img
        src={heroPhoto}
        alt="White semi-truck transporting freight along a highway under a dramatic sky"
        decoding="async"
        width={1600}
        height={1067}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Dark navy overlay gradient for text contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-ink-950/40"
      />

      <div className="container-uf relative">
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <span className="eyebrow !text-ultrablue-300">
            <span className="h-px w-6 bg-current opacity-60" />
            ULTRAFIELD LOGISTICS LIMITED
          </span>

          <h1 className="mt-5 font-archivo text-4xl font-bold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            MOVING YOUR WORLD
            <br />
            FORWARD.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-sand-100/80 sm:text-lg">
            Reliable logistics solutions designed to make shipping, delivery coordination, and
            shipment management more convenient.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link to="/book-shipment" className="btn-primary">
              Book a Shipment
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/track" className="btn-ghost-light">
              Track Your Shipment
            </Link>
          </div>

          {/* Trust strip */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-2.5 text-sand-100/80">
              <ShieldCheck className="h-5 w-5 text-ultrablue-300" />
              <span className="text-sm font-medium">
                4.8/5 rating from customer reviews
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-sand-100/80">
              <Truck className="h-5 w-5 text-ultrablue-300" />
              <span className="text-sm font-medium">Professional freight operations</span>
            </div>
            <div className="flex items-center gap-2.5 text-sand-100/80">
              <MapPin className="h-5 w-5 text-ultrablue-300" />
              <span className="text-sm font-medium">Abeokuta, Ogun State, Nigeria</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade into the page */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
