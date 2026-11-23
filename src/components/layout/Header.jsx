import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, MapPin, Truck } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import BrandLogo from '../common/BrandLogo.jsx'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/track', label: 'Track Shipment' },
  { to: '/get-a-quote', label: 'Get a Quote' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const handleSignOut = () => {
    signOut()
    setMobileOpen(false)
    navigate('/')
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? 'border-b border-ink-700/10 bg-white/85 backdrop-blur-lg'
          : 'border-b border-transparent bg-white'
      }`}
    >
      <div className="container-uf">
        <div className="flex h-[72px] items-center justify-between gap-6">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5" aria-label="Ultrafield Logistics Limited — home">
            <BrandLogo className="h-9 w-9" />
            <div className="leading-tight">
              <span className="block font-archivo text-base font-bold tracking-tight text-ink-950">
                ULTRAFIELD
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-ultrablue-600">
                Logistics Limited
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-ultrablue-600'
                      : 'text-ink-700/75 hover:text-ink-950'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 lg:flex">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn-outline py-2.5">
                  Customer Dashboard
                </Link>
                <button type="button" onClick={handleSignOut} className="btn-primary py-2.5">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-outline py-2.5">
                  Sign In
                </Link>
                <Link to="/book-shipment" className="btn-primary py-2.5">
                  Book a Shipment
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink-700/15 text-ink-900 lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="uf-mobile-menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="uf-mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-ink-700/10 bg-white lg:hidden"
          >
            <nav className="container-uf flex flex-col gap-1 py-4" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                      isActive ? 'bg-ultrablue-50 text-ultrablue-700' : 'text-ink-700 hover:bg-sand-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <div className="my-2 flex flex-col gap-3 pt-3">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="btn-outline w-full"
                    >
                      Customer Dashboard
                    </Link>
                    <button type="button" onClick={handleSignOut} className="btn-primary w-full">
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="btn-outline w-full"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/book-shipment"
                      onClick={() => setMobileOpen(false)}
                      className="btn-primary w-full"
                    >
                      Book a Shipment
                    </Link>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-sand-50 px-3 py-3 text-xs text-ink-700/80">
                <MapPin className="h-4 w-4 shrink-0 text-ultrablue-600" />
                <span>26 Ita Iyalode Road, Lafenwa, Abeokuta, Ogun State</span>
              </div>
              <a
                href="tel:08033313686"
                className="flex items-center gap-2 rounded-lg bg-sand-50 px-3 py-3 text-xs text-ink-700/80"
              >
                <Truck className="h-4 w-4 shrink-0 text-ultrablue-600" />
                <span>0803 331 3686</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
