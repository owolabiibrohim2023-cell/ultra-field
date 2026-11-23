import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, Phone, ArrowRight, MessageSquare } from 'lucide-react'
import SectionHeading from '../common/SectionHeading.jsx'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const CONTACT_CARDS = [
  {
    icon: MapPin,
    label: 'Visit us',
    value: '26 Ita Iyalode Road, Lafenwa, Abeokuta 110252, Ogun State, Nigeria',
    href: 'https://www.google.com/maps/place/48VG+R5+Abeokuta',
    hint: 'Google Maps location: 48VG+R5 Abeokuta',
  },
  {
    icon: Phone,
    label: 'Call us',
    value: '0803 331 3686',
    href: 'tel:08033313686',
    hint: 'Speak with the Ultrafield team directly',
  },
]

export default function ContactPreview() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-uf">
        <SectionHeading
          eyebrow="Contact & location"
          title="Get in touch with Ultrafield Logistics"
          subtitle="Reach out with shipment questions, quotations, or booking requests — or visit our location in Abeokuta."
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 grid gap-6 lg:grid-cols-2"
        >
          {/* Contact cards */}
          <div className="grid gap-5">
            {CONTACT_CARDS.map((card) => {
              const Icon = card.icon
              return (
                <a
                  key={card.label}
                  href={card.href}
                  target={card.href.startsWith('http') ? '_blank' : undefined}
                  rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="card flex items-start gap-5 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-cardLg"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ultrablue-50 text-ultrablue-600">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink-700/55">
                      {card.label}
                    </p>
                    <p className="mt-1 font-archivo font-bold text-ink-950">{card.value}</p>
                    <p className="mt-1 text-xs text-ink-700/55">{card.hint}</p>
                  </div>
                </a>
              )
            })}
            <Link
              to="/contact"
              className="flex items-center justify-between gap-4 rounded-2xl border border-ink-700/10 bg-sand-50 p-6 transition-colors hover:bg-sand-100"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-950 text-white">
                  <MessageSquare className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-archivo font-bold text-ink-950">Send a message</p>
                  <p className="text-sm text-ink-700/60">Shipment questions, quotes and bookings</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-ultrablue-600" />
            </Link>
          </div>

          {/* Map panel */}
          <div className="card overflow-hidden">
            <div className="relative aspect-[4/3] bg-ink-950">
              {/* Inline SVG map placeholder — static map representation */}
              <svg viewBox="0 0 800 600" className="h-full w-full" role="img" aria-label="Map showing Ultrafield Logistics location in Abeokuta">
                <rect width="800" height="600" fill="#0b1220" />
                <g stroke="#1c2739" strokeWidth="10" fill="none" opacity="0.9">
                  <path d="M-20 160 L820 210" />
                  <path d="M180 -20 L260 620" />
                  <path d="M-20 380 L820 430" />
                  <path d="M480 -20 L560 620" />
                  <path d="M-20 520 L820 560" />
                </g>
                <g stroke="#2a3648" strokeWidth="4" fill="none" opacity="0.8">
                  <path d="M-20 260 L820 290" />
                  <path d="M340 -20 L390 620" />
                  <path d="M-20 450 L820 470" />
                </g>
                {/* route-like arc */}
                <path d="M120 480 C 320 380, 520 440, 700 330" stroke="#3563f9" strokeWidth="5" fill="none" strokeDasharray="14 12" opacity="0.9" />
                {/* pin */}
                <g transform="translate(400 300)">
                  <circle cx="0" cy="0" r="34" fill="#3563f9" opacity="0.25" />
                  <path d="M0 18 C -18 0, -18 -22, 0 -22 C 18 -22, 18 0, 0 18 Z" fill="#3563f9" />
                  <circle cx="0" cy="-12" r="6.5" fill="#ffffff" />
                </g>
              </svg>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/10 bg-ink-950/80 px-4 py-3 backdrop-blur">
                <div>
                  <p className="text-sm font-bold text-white">Ultrafield Logistics Limited</p>
                  <p className="text-xs text-sand-100/65">26 Ita Iyalode Road, Lafenwa, Abeokuta</p>
                </div>
                <span className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
                  48VG+R5 Abeokuta
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
