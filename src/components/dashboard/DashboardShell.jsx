import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, LogOut } from 'lucide-react'
import BrandLogo from '../common/BrandLogo.jsx'

// Shared shell for the customer & admin dashboards: desktop sidebar +
// mobile drawer navigation.
export default function DashboardShell({ navItems, activeId, onNavigate, children }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  const go = (id) => {
    onNavigate(id)
    setDrawerOpen(false)
  }

  return (
    <div className="bg-sand-50">
      {/* Mobile top bar */}
      <div className="sticky top-[72px] z-30 flex items-center justify-between border-b border-ink-700/10 bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <BrandLogo className="h-7 w-7" />
          <span className="font-archivo text-sm font-bold text-ink-950">Dashboard</span>
        </div>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-ink-700/15"
          aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen((open) => !open)}
        >
          {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="container-uf flex gap-8 py-8 lg:py-10">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 space-y-6">
            <div className="flex items-center gap-2.5 rounded-2xl bg-white p-4 shadow-card">
              <BrandLogo className="h-9 w-9" />
              <div className="leading-tight">
                <span className="block font-archivo text-sm font-bold text-ink-950">ULTRAFIELD</span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-ultrablue-600">
                  Dashboard
                </span>
              </div>
            </div>

            <nav className="space-y-1" aria-label="Dashboard navigation">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = activeId === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => go(item.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm font-medium transition-colors ${
                      active
                        ? 'bg-ink-950 text-white'
                        : 'text-ink-700/75 hover:bg-white hover:text-ink-950'
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5 shrink-0" />
                    {item.label}
                  </button>
                )
              })}
            </nav>

            <div className="rounded-2xl bg-ink-950 p-4 text-sand-100">
              <p className="text-xs font-semibold uppercase tracking-wider text-sand-100/55">
                Demo data
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-sand-100/65">
                All dashboard content is sample data shown with frontend demo state.
              </p>
            </div>
          </div>
        </aside>

        {/* Mobile drawer */}
        <AnimatePresence>
          {drawerOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-ink-950/40 lg:hidden"
                onClick={() => setDrawerOpen(false)}
                aria-hidden="true"
              />
              <motion.aside
                initial={{ x: -320 }}
                animate={{ x: 0 }}
                exit={{ x: -320 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-y-0 left-0 z-50 w-72 bg-white p-5 shadow-cardLg lg:hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <BrandLogo className="h-9 w-9" />
                    <div className="leading-tight">
                      <span className="block font-archivo text-sm font-bold text-ink-950">
                        ULTRAFIELD
                      </span>
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-ultrablue-600">
                        Dashboard
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-ink-700/15"
                    aria-label="Close menu"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <nav className="mt-6 space-y-1" aria-label="Dashboard navigation">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const active = activeId === item.id
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => go(item.id)}
                        className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm font-medium transition-colors ${
                          active
                            ? 'bg-ink-950 text-white'
                            : 'text-ink-700/75 hover:bg-sand-50'
                        }`}
                      >
                        <Icon className="h-4.5 w-4.5 shrink-0" />
                        {item.label}
                      </button>
                    )
                  })}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="min-w-0 flex-1" key={location.pathname + activeId}>
          {children}
        </div>
      </div>
    </div>
  )
}

export function DashboardCard({ title, subtitle, action, children, className = '' }) {
  return (
    <div className={`card overflow-hidden ${className}`}>
      {(title || action) && (
        <div className="flex items-start justify-between gap-4 border-b border-ink-700/10 px-6 py-5">
          <div>
            {title && <h2 className="font-archivo text-lg font-bold text-ink-950">{title}</h2>}
            {subtitle && <p className="mt-0.5 text-xs text-ink-700/55">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  )
}

export function StatCard({ icon: Icon, label, value, tone = 'blue' }) {
  const tones = {
    blue: 'bg-ultrablue-50 text-ultrablue-600',
    ink: 'bg-ink-950 text-white',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
  }
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-700/55">{label}</p>
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${tones[tone]}`}>
          <Icon className="h-4.5 w-4.5" />
        </span>
      </div>
      <p className="mt-3 font-archivo text-2xl font-bold text-ink-950">{value}</p>
    </div>
  )
}

export function DashboardSignOut({ onSignOut }) {
  return (
    <button
      type="button"
      onClick={onSignOut}
      className="inline-flex items-center gap-2 rounded-xl border border-ink-700/15 px-4 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:border-red-500/30 hover:bg-red-50 hover:text-red-600"
    >
      <LogOut className="h-4 w-4" />
      Sign out
    </button>
  )
}
