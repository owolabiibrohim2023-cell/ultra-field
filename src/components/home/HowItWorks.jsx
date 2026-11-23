import { motion } from 'framer-motion'
import { FileText, CheckCircle2, Map, PackageCheck } from 'lucide-react'
import SectionHeading from '../common/SectionHeading.jsx'
import freightPhoto from '../../assets/photos/freight-transport.jpg'
import deliveryPhoto from '../../assets/photos/delivery-operations.jpg'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const STEPS = [
  {
    icon: FileText,
    step: '01',
    title: 'Submit shipment details',
    text: 'Provide your shipment details through the booking form — pickup and delivery information, package description, and preferred pickup date.',
  },
  {
    icon: CheckCircle2,
    step: '02',
    title: 'Receive shipment confirmation',
    text: 'You receive a shipment confirmation with your reference number, so your shipment is on record and ready to handle.',
  },
  {
    icon: Map,
    step: '03',
    title: 'Follow shipment progress',
    text: 'Track your shipment with its reference number and follow the delivery progress from collection through transit.',
  },
  {
    icon: PackageCheck,
    step: '04',
    title: 'Complete delivery',
    text: 'Your shipment arrives at its destination, the delivery is completed, and the shipment status is confirmed.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-sand-50 py-20 sm:py-28">
      <div className="container-uf">
        <SectionHeading
          eyebrow="How it works"
          title="A simple path from submission to delivery"
          subtitle="Every shipment follows a clear, well-coordinated process — so you always know where things stand."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center">
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
                  src={freightPhoto}
                  alt="Freight truck carrying cargo along a road during transport"
                  loading="lazy"
                  decoding="async"
                  width={1600}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/45 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-5 left-6 right-6 rounded-xl bg-white/95 p-4 shadow-md backdrop-blur">
                <p className="font-archivo text-base font-bold text-ink-950">Freight transportation</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-cardLg">
              <div className="aspect-[16/7] overflow-hidden">
                <img
                  src={deliveryPhoto}
                  alt="Delivery van ready for parcel distribution"
                  loading="lazy"
                  decoding="async"
                  width={1600}
                  height={700}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/45 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-5 left-6 right-6 rounded-xl bg-white/95 p-4 shadow-md backdrop-blur">
                <p className="font-archivo text-base font-bold text-ink-950">Delivery operations</p>
              </div>
            </div>
          </motion.div>

          {/* Steps */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-6 md:grid-cols-2"
          >
            {STEPS.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.step} className="card h-full p-7">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ultrablue-600 text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-archivo text-3xl font-bold text-sand-200">{item.step}</span>
                  </div>
                  <h3 className="mt-5 font-archivo text-lg font-bold text-ink-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700/70">{item.text}</p>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
