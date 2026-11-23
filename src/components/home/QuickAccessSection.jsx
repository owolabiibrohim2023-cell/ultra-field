import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PackageCheck, CreditCard, ArrowRight, ClipboardCheck } from 'lucide-react'
import SectionHeading from '../common/SectionHeading.jsx'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function QuickAccessSection() {
  return (
    <section className="bg-sand-50 py-20 sm:py-28" id="quick-access">
      <div className="container-uf">
        <SectionHeading
          eyebrow="Quick access"
          title="Track your shipment and manage payments"
          subtitle="Two fast paths for ongoing shipments — check delivery progress or complete a payment, right from the homepage."
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 grid gap-6 lg:grid-cols-2"
        >
          {/* Tracking quick access */}
          <div className="card group relative overflow-hidden p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-cardLg">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-ultrablue-50 transition-transform duration-500 group-hover:scale-125"
            />
            <div className="relative">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ultrablue-600 text-white">
                <PackageCheck className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-archivo text-xl font-bold text-ink-950">Shipment Tracking</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700/70">
                Enter your tracking number to view shipment status, origin and destination, and the
                delivery progress timeline.
              </p>
              <form
                className="mt-6 flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault()
                  const input = e.currentTarget.elements.tracking
                  window.location.assign(`/track?q=${encodeURIComponent(input.value || '')}`)
                }}
              >
                <input
                  name="tracking"
                  type="text"
                  placeholder="Enter tracking number"
                  className="field"
                  aria-label="Tracking number"
                />
                <button type="submit" className="btn-primary shrink-0">
                  Track
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
              <Link to="/track" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ultrablue-600 hover:text-ultrablue-700">
                Open tracking page <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Payment quick access */}
          <div className="card group relative overflow-hidden p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-cardLg">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-ultrablue-50 transition-transform duration-500 group-hover:scale-125"
            />
            <div className="relative">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-950 text-white">
                <CreditCard className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-archivo text-xl font-bold text-ink-950">Online Payment</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700/70">
                Review an invoice or shipment reference, confirm the amount due, and complete a
                payment — securely handled through the backend when it goes live.
              </p>
              <form
                className="mt-6 flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault()
                  const input = e.currentTarget.elements.reference
                  window.location.assign(`/payment?ref=${encodeURIComponent(input.value || '')}`)
                }}
              >
                <input
                  name="reference"
                  type="text"
                  placeholder="Invoice / shipment reference"
                  className="field"
                  aria-label="Invoice or shipment reference"
                />
                <button type="submit" className="btn-dark shrink-0">
                  Pay Now
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
              <Link to="/payment" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ultrablue-600 hover:text-ultrablue-700">
                Open payment page <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>

        <p className="mt-6 flex items-center gap-2 text-xs text-ink-700/55">
          <ClipboardCheck className="h-4 w-4 text-ultrablue-600" />
          Demo functionality: tracking records and payment flows are frontend demonstrations
          while the backend is being prepared.
        </p>
      </div>
    </section>
  )
}
