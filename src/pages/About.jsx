import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, Phone, ArrowRight, ShieldCheck, MessageSquareText, PackageCheck } from 'lucide-react'
import PageHeader from '../components/common/PageHeader.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import aboutIntroPhoto from '../assets/photos/about-intro.jpg'
import aboutTeamPhoto from '../assets/photos/about-team.jpg'
import freightPhoto from '../assets/photos/freight-transport.jpg'
import deliveryPhoto from '../assets/photos/delivery-operations.jpg'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Reliability',
    text: 'A dependable approach to shipment handling and delivery coordination, applied consistently to every shipment.',
  },
  {
    icon: MessageSquareText,
    title: 'Communication',
    text: 'Clear, responsive communication keeps customers informed from collection through to delivery.',
  },
  {
    icon: PackageCheck,
    title: 'Professionalism',
    text: 'Professional standards across handling, coordination, and customer interaction at every step.',
  },
]

export default function About() {
  useEffect(() => {
    document.title = 'About | Ultrafield Logistics Limited'
  }, [])

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Ultrafield Logistics Limited"
        subtitle="A professional logistics services company focused on shipment handling, delivery coordination, and clear communication for every customer."
      />

      {/* Company introduction */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-uf grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <span className="eyebrow">
              <span className="h-px w-6 bg-current opacity-60" />
              Company introduction
            </span>
            <h2 className="mt-4 section-title">Logistics support built around your shipments</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-700/75">
              <p>
                Ultrafield Logistics Limited provides logistics services centered on professional
                shipment handling and delivery coordination. From the moment a shipment is received,
                our focus is on careful handling, organized delivery, and communication that keeps
                customers informed throughout the process.
              </p>
              <p>
                We work with customers moving parcels and business shipments, supporting pickup,
                transit coordination, and delivery. Our approach is straightforward: handle each
                shipment with attention, coordinate deliveries well, and communicate clearly.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/book-shipment" className="btn-primary">
                Book a Shipment
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="btn-outline">
                Get in touch
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <div className="overflow-hidden rounded-2xl shadow-cardLg">
              <img
                src={aboutIntroPhoto}
                alt="Cargo truck at rest in a freight handling setting"
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-cardLg">
              <img
                src={aboutTeamPhoto}
                alt="Workers coordinating goods inside a warehouse"
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-cardLg sm:col-span-2">
              <img
                src={deliveryPhoto}
                alt="Delivery van ready for parcel distribution"
                loading="lazy"
                decoding="async"
                width={1600}
                height={600}
                className="aspect-[16/7] w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand presentation band */}
      <section className="relative overflow-hidden bg-ink-950 py-16 text-sand-100 sm:py-20">
        <img
          src={freightPhoto}
          alt="Freight transport in operation on the road"
          loading="lazy"
          decoding="async"
          width={1600}
          height={600}
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/60" />
        <div className="container-uf relative">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-6 lg:grid-cols-3"
          >
            <IdentityBlock title="Our identity" text="Ultrafield Logistics Limited — a professional logistics services company. Our work is defined by how we handle shipments, coordinate deliveries, and communicate with customers." />
            <IdentityBlock title="Our focus" text="Shipment handling with attention to package condition, delivery coordination that keeps shipments moving, and clear communication throughout the delivery process." />
            <IdentityBlock title="Our standards" text="Reliable operations, professional service, and customer-focused communication — applied consistently across every shipment we coordinate." />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-uf">
          <SectionHeading
            eyebrow="Our values"
            title="Principles that guide how we work"
            subtitle="General brand principles that shape how Ultrafield Logistics approaches every shipment and customer."
            align="center"
          />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-12 grid gap-5 md:grid-cols-3"
          >
            {VALUES.map((value) => {
              const Icon = value.icon
              return (
                <div key={value.title} className="card p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ultrablue-50 text-ultrablue-600">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-archivo text-lg font-bold text-ink-950">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700/70">{value.text}</p>
                </div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact information */}
      <section className="bg-sand-50 py-16 sm:py-20">
        <div className="container-uf">
          <SectionHeading
            eyebrow="Contact information"
            title="Reach Ultrafield Logistics"
            subtitle="Visit our location in Lafenwa, Abeokuta, or call us to discuss shipments, quotes, and bookings."
          />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-12 grid gap-5 md:grid-cols-2"
          >
            <div className="card p-7">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-700/55">
                <MapPin className="h-4 w-4 text-ultrablue-600" /> Address
              </p>
              <p className="mt-3 font-archivo text-lg font-bold text-ink-950">
                26 Ita Iyalode Road, Lafenwa, Abeokuta 110252, Ogun State, Nigeria
              </p>
              <p className="mt-2 text-sm text-ink-700/60">Google Maps: 48VG+R5 Abeokuta</p>
            </div>
            <div className="card p-7">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-700/55">
                <Phone className="h-4 w-4 text-ultrablue-600" /> Phone
              </p>
              <a
                href="tel:08033313686"
                className="mt-3 block font-archivo text-lg font-bold text-ink-950 transition-colors hover:text-ultrablue-700"
              >
                0803 331 3686
              </a>
              <Link to="/contact" className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-ultrablue-600 hover:text-ultrablue-700">
                Open contact page <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

function IdentityBlock({ title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur">
      <h3 className="font-archivo text-lg font-bold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-sand-100/70">{text}</p>
    </div>
  )
}
