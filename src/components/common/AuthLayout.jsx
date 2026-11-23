import { Link } from 'react-router-dom'
import { Truck, ArrowRight } from 'lucide-react'
import BrandLogo from './BrandLogo.jsx'

// Shared shell for the authentication screens: split-panel premium layout.
export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <section className="bg-ink-950 py-10 text-sand-100 sm:py-16">
      <div className="container-uf">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-white lg:grid-cols-2">
          {/* Brand panel */}
          <div className="relative hidden flex-col justify-between bg-ink-950 p-10 lg:flex">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-ultrablue-600/25 blur-3xl"
            />
            <div className="relative flex items-center gap-2.5">
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
            <div className="relative">
              <Truck className="h-10 w-10 text-ultrablue-400" />
              <h2 className="mt-4 font-archivo text-2xl font-bold leading-tight text-white">
                Manage your shipments with a single, reliable partner.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-sand-100/65">
                Sign in to view shipments, track deliveries, manage invoices, and book new
                shipments from one dashboard.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-sand-100/50">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Frontend demonstration account
              </div>
            </div>
            <p className="relative text-xs text-sand-100/45">
              © {new Date().getFullYear()} Ultrafield Logistics Limited
            </p>
          </div>

          {/* Form panel */}
          <div className="p-8 sm:p-10">
            <div className="mx-auto max-w-sm">
              <div className="mb-8 flex items-center gap-2.5 lg:hidden">
                <BrandLogo className="h-9 w-9" />
                <div className="leading-tight">
                  <span className="block font-archivo text-base font-bold tracking-tight text-ink-950">
                    ULTRAFIELD
                  </span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-ultrablue-600">
                    Logistics Limited
                  </span>
                </div>
              </div>

              <h1 className="font-archivo text-2xl font-bold text-ink-950">{title}</h1>
              {subtitle && <p className="mt-2 text-sm leading-relaxed text-ink-700/70">{subtitle}</p>}

              <div className="mt-6">{children}</div>

              {footer && <div className="mt-6 text-center text-sm text-ink-700/60">{footer}</div>}

              <div className="mt-6 rounded-xl bg-sand-50 px-4 py-3 text-xs text-ink-700/55">
                Demo authentication: this interface uses a frontend-only demo state — it does not
                provide real account security or persistent backend authentication.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function AuthLink({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1 font-semibold text-ultrablue-600 transition-colors hover:text-ultrablue-700"
    >
      {children}
      <ArrowRight className="h-3.5 w-3.5" />
    </Link>
  )
}
