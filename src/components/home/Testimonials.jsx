import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import SectionHeading from '../common/SectionHeading.jsx'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

// The three customer reviews supplied for Ultrafield Logistics Limited — the
// only reviews displayed. The 4.8/5 rating from 25 reviews reflects the business
// listing information supplied.
const REVIEWS = [
  {
    quote:
      "Excellent service. They don't talk too much, but they do wonderfully well. The package arrived earlier than envisaged.",
    name: 'Tosine MOG',
    detail: 'Parcel delivery customer',
  },
  {
    quote:
      'Excellent service! Very reliable, professional, and efficient. Their customer service and delivery process are impressive.',
    name: 'Oluwaseun Apata',
    detail: 'Shipment customer',
  },
  {
    quote: 'Excellent service! Thank you for safely and promptly delivering my package.',
    name: 'faith taiwo',
    detail: 'Delivery customer',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-ink-950 py-20 text-sand-100 sm:py-28">
      <div className="container-uf">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col justify-center"
          >
            <span className="eyebrow !text-ultrablue-300">
              <span className="h-px w-6 bg-current opacity-60" />
              Customer reviews
            </span>
            <h2 className="mt-5 font-archivo text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              What customers say about working with us
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-sand-100/70">
              Ultrafield Logistics Limited is rated <strong className="text-white">4.8 / 5</strong> from
              <strong className="text-white"> 25 reviews</strong>, based on the business listing
              information supplied.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-white">4.8 / 5 · 25 reviews</span>
            </div>
            <p className="mt-4 text-xs text-sand-100/50">
              Customer feedback is presented exactly as supplied by the business listing.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-5 sm:grid-cols-3"
          >
            {REVIEWS.map((review) => (
              <figure
                key={review.name}
                className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-sand-100/85">
                  “{review.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-white/10 pt-4">
                  <p className="text-sm font-bold text-white">{review.name}</p>
                  <p className="text-xs text-sand-100/55">{review.detail}</p>
                </figcaption>
              </figure>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
