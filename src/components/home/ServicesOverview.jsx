import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Package, Truck, PackageCheck, Route, Warehouse } from 'lucide-react'
import SectionHeading from '../common/SectionHeading.jsx'
import parcelPhoto from '../../assets/photos/svc-parcel.jpg'
import logisticsPhoto from '../../assets/photos/svc-logistics.jpg'
import handlingPhoto from '../../assets/photos/svc-handling.jpg'
import coordinationPhoto from '../../assets/photos/svc-coordination.jpg'
import businessPhoto from '../../assets/photos/svc-business.jpg'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const SERVICES = [
  {
    icon: Package,
    title: 'Parcel Delivery',
    text: 'Convenient parcel delivery solutions designed to help customers move packages with confidence.',
    photo: parcelPhoto,
    alt: 'A courier working at a delivery van with parcels',
  },
  {
    icon: Truck,
    title: 'Logistics Services',
    text: 'Professional logistics coordination designed around customer delivery and transportation needs.',
    photo: logisticsPhoto,
    alt: 'Cargo truck transporting freight along a road',
  },
  {
    icon: PackageCheck,
    title: 'Shipment Handling',
    text: 'Careful shipment handling with attention to package condition and delivery requirements.',
    photo: handlingPhoto,
    alt: 'Organized warehouse racks stacked with cartons',
  },
  {
    icon: Route,
    title: 'Delivery Coordination',
    text: 'Organized delivery coordination and clear communication throughout the shipment process.',
    photo: coordinationPhoto,
    alt: 'A delivery van loaded with packages on a city street',
  },
  {
    icon: Warehouse,
    title: 'Business Logistics',
    text: 'Flexible logistics support for business customers and their shipment requirements.',
    photo: businessPhoto,
    alt: 'Workers managing palletized goods in a warehouse',
  },
]

export default function ServicesOverview() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-uf">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Our services"
            title="Logistics solutions for every shipment"
            subtitle="A focused set of service categories, presented clearly so customers can find the support they need."
          />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link to="/services" className="btn-outline">
              View all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.title}
                to="/services"
                className="card group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-ultrablue-200 hover:shadow-cardLg"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={service.photo}
                    alt={service.alt}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent"
                  />
                  <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-ultrablue-600 shadow-sm backdrop-blur">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-archivo text-lg font-bold text-ink-950">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700/70">{service.text}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ultrablue-600">
                    Explore
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            )
          })}

          {/* CTA card */}
          <div className="relative overflow-hidden rounded-2xl bg-ink-950 p-7 text-white">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-ultrablue-600/30 blur-2xl"
            />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <h3 className="font-archivo text-xl font-bold">Need a quotation?</h3>
                <p className="mt-2 text-sm leading-relaxed text-sand-100/70">
                  Tell us your shipment details and request a quote. Our team follows up with a
                  quotation — no obligation.
                </p>
              </div>
              <Link
                to="/get-a-quote"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-sand-100"
              >
                Get a Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
