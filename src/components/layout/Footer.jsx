import { Link } from 'react-router-dom'
import { MapPin, Phone, Truck, ArrowUpRight } from 'lucide-react'
import BrandLogo from '../common/BrandLogo.jsx'

const FOOTER_LINKS = [
  {
    title: 'Services',
    links: [
      { label: 'Parcel Delivery', to: '/services' },
      { label: 'Logistics Services', to: '/services' },
      { label: 'Shipment Handling', to: '/services' },
      { label: 'Business Logistics', to: '/services' },
    ],
  },
  {
    title: 'Customers',
    links: [
      { label: 'Track Shipment', to: '/track' },
      { label: 'Get a Quote', to: '/get-a-quote' },
      { label: 'Book a Shipment', to: '/book-shipment' },
      { label: 'Pay Online', to: '/payment' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Customer Dashboard', to: '/dashboard' },
      { label: 'Sign In', to: '/login' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-ink-700/10 bg-ink-950 text-sand-100">
      <div className="container-uf py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <BrandLogo className="h-9 w-9" />
              <div className="leading-tight">
                <span className="block font-archivo text-base font-bold tracking-tight text-white">
                  ULTRAFIELD
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-ultrablue-400">
                  Logistics Limited
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-sand-100/65">
              Professional shipment handling, delivery coordination, and logistics
              support — built around reliable communication and convenient shipment
              visibility for every customer.
            </p>

            <div className="mt-5 space-y-3 text-sm text-sand-100/80">
              <a
                href="tel:08033313686"
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 text-ultrablue-400" />
                0803 331 3686
              </a>
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ultrablue-400" />
                26 Ita Iyalode Road, Lafenwa, Abeokuta 110252, Ogun State, Nigeria
              </p>
            </div>
          </div>

          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h3 className="font-archivo text-sm font-semibold uppercase tracking-wider text-white">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="group inline-flex items-center gap-1 text-sand-100/65 transition-colors hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-sand-100/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Ultrafield Logistics Limited. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5" />
            Frontend demonstration — backend integration in a later phase.
          </p>
        </div>
      </div>
    </footer>
  )
}
