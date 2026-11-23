import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Package,
  Truck,
  PackageCheck,
  Route,
  Warehouse,
  ArrowRight,
  ClipboardList,
  MapPin,
} from 'lucide-react'
import PageHeader from '../components/common/PageHeader.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import parcelPhoto from '../assets/photos/svc-parcel.jpg'
import logisticsPhoto from '../assets/photos/svc-logistics.jpg'
import handlingPhoto from '../assets/photos/svc-handling.jpg'
import coordinationPhoto from '../assets/photos/svc-coordination.jpg'
import businessPhoto from '../assets/photos/svc-business.jpg'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

// Initial editable service categories — draft website content, kept open so the
// business can confirm or adjust the actual service list.
const SERVICES = [
  {
    icon: Package,
    title: 'Parcel Delivery',
    text: 'Convenient parcel delivery solutions designed to help customers move packages with confidence. Suitable for personal shipments and smaller consignments.',
    points: ['Pickup and delivery coordination', 'Package condition attention', 'Clear status communication'],
    photo: parcelPhoto,
    alt: 'Courier at a delivery van with parcels',
  },
  {
    icon: Truck,
    title: 'Logistics Services',
    text: 'Professional logistics coordination designed around customer delivery and transportation needs, from collection to final delivery.',
    points: ['End-to-end coordination', 'Transportation organization', 'Delivery scheduling support'],
    photo: logisticsPhoto,
    alt: 'Cargo truck transporting freight',
  },
  {
    icon: PackageCheck,
    title: 'Shipment Handling',
    text: 'Careful shipment handling with attention to package condition and delivery requirements at every stage of the process.',
    points: ['Careful loading and handling', 'Delivery requirement checks', 'Shipment condition care'],
    photo: handlingPhoto,
    alt: 'Organized warehouse racks with cartons',
  },
  {
    icon: Route,
    title: 'Delivery Coordination',
    text: 'Organized delivery coordination and clear communication throughout the shipment process, keeping deliveries moving efficiently.',
    points: ['Delivery route organization', 'Ongoing shipment communication', 'Delivery status updates'],
    photo: coordinationPhoto,
    alt: 'Delivery van loaded with packages',
  },
  {
    icon: Warehouse,
    title: 'Business Logistics',
    text: 'Flexible logistics support for business customers and their shipment requirements, coordinated around business delivery needs.',
    points: ['Business shipment support', 'Coordinated deliveries', 'Dedicated communication'],
    photo: businessPhoto,
    alt: 'Workers managing palletized goods in a warehouse',
  },
]

const PROCESS = [
  { icon: ClipboardList, title: 'Share your details', text: 'Book a shipment or request a quotation with your pickup, delivery, and package information.' },
  { icon: PackageCheck, title: 'Careful handling', text: 'Your shipment is handled with attention to package condition and delivery requirements.' },
  { icon: Route, title: 'Coordinated delivery', text: 'Delivery is organized end to end with clear communication throughout the process.' },
  { icon: MapPin, title: 'Delivered', text: 'The shipment reaches its destination and the status is updated from collection to delivery.' },
]

export default function Services() {
  useEffect(() => {
    document.title = 'Services | Ultrafield Logistics Limited'
  }, [])

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Logistics services for every shipment"
        subtitle="Ultrafield Logistics Limited offers focused service categories covering parcel delivery, logistics coordination, shipment handling, and business logistics support."
      />

      {/* Services list */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-uf space-y-6">
          {SERVICES.map((service, index) => {
            const Icon = service.icon
            const reversed = index % 2 === 1
            return (
              <motion.article
                key={service.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="card grid gap-8 overflow-hidden p-7 lg:grid-cols-2 lg:items-center lg:p-10"
              >
                <div className={reversed ? 'lg:order-2' : ''}>
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ultrablue-50 text-ultrablue-600">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h2 className="mt-5 font-archivo text-2xl font-bold text-ink-950">{service.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-700/70">{service.text}</p>
                  <ul className="mt-5 space-y-2">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-2.5 text-sm font-medium text-ink-900">
                        <span className="h-1.5 w-1.5 rounded-full bg-ultrablue-600" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link to="/book-shipment" className="btn-primary py-2.5">
                      Book this service
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link to="/get-a-quote" className="btn-outline py-2.5">
                      Request a quote
                    </Link>
                  </div>
                </div>
                <div
                  className={`relative overflow-hidden rounded-2xl ${reversed ? 'lg:order-1' : ''}`}
                >
                  <img
                    src={service.photo}
                    alt={service.alt}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={600}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </motion.article>
            )
          })}
        </div>
      </section>

      {/* Process */}
      <section className="bg-sand-50 py-16 sm:py-20">
        <div className="container-uf">
          <SectionHeading
            eyebrow="How it works"
            title="From request to delivery"
            subtitle="A simple process that keeps every shipment organized from pickup through to confirmed delivery."
            align="center"
          />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {PROCESS.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.title} className="card p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-950 text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-archivo text-2xl font-bold text-sand-200">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-5 font-archivo text-lg font-bold text-ink-950">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700/70">{step.text}</p>
                </div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Service categories note */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-uf">
          <div className="mx-auto max-w-3xl rounded-2xl border border-ink-700/10 bg-sand-50 p-8 text-center">
            <h2 className="font-archivo text-xl font-bold text-ink-950">Service categories are draft content</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-700/70">
              The categories shown are the initial website content. They are kept editable and will
              be adjusted to match the company's confirmed services as they are finalized. Delivery
              destinations, timelines, and pricing are confirmed per quotation or booking.
            </p>
            <Link to="/get-a-quote" className="btn-primary mt-6">
              Request a quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
