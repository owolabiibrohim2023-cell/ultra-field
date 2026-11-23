import { motion } from 'framer-motion'
import { MessagesSquare, Route, Headphones, Eye } from 'lucide-react'
import SectionHeading from '../common/SectionHeading.jsx'
import warehousePhoto from '../../assets/photos/warehouse-operations.jpg'
import packageHandlingPhoto from '../../assets/photos/package-handling.jpg'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

// General brand principles — not factual claims about the business.
const REASONS = [
  {
    icon: MessagesSquare,
    title: 'Reliable communication',
    text: 'Plain, responsive communication keeps customers informed at every stage of the shipment process.',
  },
  {
    icon: Route,
    title: 'Organized shipment coordination',
    text: 'Shipments are coordinated with attention to detail, so pickup, transit, and delivery stay organized.',
  },
  {
    icon: Headphones,
    title: 'Customer-focused service',
    text: 'Support that listens first — understanding shipment needs and responding with care.',
  },
  {
    icon: Eye,
    title: 'Convenient shipment visibility',
    text: 'Check shipment status and progress with your reference number whenever you need to.',
  },
]

export default function WhyChoose() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-uf">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <SectionHeading
              eyebrow="Why Ultrafield"
              title="Professional logistics, built around trust"
              subtitle="The principles behind how we work — reliability, coordination, service, and shipment visibility in every shipment."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {REASONS.map((reason) => {
                const Icon = reason.icon
                return (
                  <div key={reason.title} className="card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-cardLg">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-ultrablue-100 bg-ultrablue-50 text-ultrablue-600">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 font-archivo text-lg font-bold text-ink-950">{reason.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-700/70">{reason.text}</p>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Photo panel */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-4"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-cardLg">
              <div className="aspect-[16/8] overflow-hidden">
                <img
                  src={warehousePhoto}
                  alt="Forklift operating among organized warehouse shelving"
                  loading="lazy"
                  decoding="async"
                  width={1600}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/45 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-5 left-6 right-6 rounded-xl bg-white/95 p-4 shadow-md backdrop-blur">
                <p className="font-archivo text-base font-bold text-ink-950">Warehouse operations</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-cardLg">
              <div className="aspect-[16/7] overflow-hidden">
                <img
                  src={packageHandlingPhoto}
                  alt="Package handling with parcels prepared for shipment"
                  loading="lazy"
                  decoding="async"
                  width={1600}
                  height={700}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/45 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-5 left-6 right-6 rounded-xl bg-white/95 p-4 shadow-md backdrop-blur">
                <p className="font-archivo text-base font-bold text-ink-950">Package handling</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
