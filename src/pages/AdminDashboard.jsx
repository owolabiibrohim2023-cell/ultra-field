import { useEffect, useState } from 'react'
import {
  LayoutDashboard,
  Users,
  Package,
  ClipboardList,
  Search,
  CreditCard,
  Receipt,
  Bell,
  Settings as SettingsIcon,
  ArrowRight,
  MapPin,
  Calendar,
} from 'lucide-react'
import DashboardShell, { DashboardCard, StatCard } from '../components/dashboard/DashboardShell.jsx'
import StatusBadge from '../components/common/StatusBadge.jsx'
import { adminOverview, mockBookings, mockPayments, mockQuotes } from '../data/mockPayments.js'
import { mockCustomers } from '../data/mockCustomers.js'
import { adminShipments } from '../data/mockShipments.js'
import { formatCurrency, formatDate } from '../utils/format.js'

const NAV = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'shipments', label: 'Shipments', icon: Package },
  { id: 'bookings', label: 'Bookings', icon: ClipboardList },
  { id: 'tracking', label: 'Tracking', icon: Search },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'invoices', label: 'Invoices', icon: Receipt },
  { id: 'quotations', label: 'Quotations', icon: Receipt },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
]

export default function AdminDashboard() {
  const [active, setActive] = useState('overview')

  useEffect(() => {
    document.title = 'Admin Dashboard | Ultrafield Logistics Limited'
  }, [])

  return (
    <DashboardShell navItems={NAV} activeId={active} onNavigate={setActive}>
      <div className="mb-6">
        <span className="eyebrow">Administration</span>
        <h1 className="mt-2 font-archivo text-2xl font-bold text-ink-950 sm:text-3xl">
          Ultrafield administration
        </h1>
        <p className="mt-1 text-sm text-ink-700/60">
          Demo admin console — all controls below update local demo state only. They are not real
          administrative operations.
        </p>
      </div>

      <AdminContent active={active} setActive={setActive} />
    </DashboardShell>
  )
}

function AdminContent({ active, setActive }) {
  if (active === 'overview') {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard icon={Users} label="Total customers" value={adminOverview.totalCustomers} tone="blue" />
          <StatCard icon={Package} label="Total shipments" value={adminOverview.totalShipments} tone="ink" />
          <StatCard icon={Package} label="Active shipments" value={adminOverview.activeShipments} tone="amber" />
          <StatCard icon={Package} label="Delivered shipments" value={adminOverview.deliveredShipments} tone="emerald" />
          <StatCard icon={ClipboardList} label="Pending bookings" value={adminOverview.pendingBookings} tone="blue" />
          <StatCard icon={CreditCard} label="Outstanding payments" value={adminOverview.outstandingPayments} tone="ink" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <DashboardCard title="Recent booking requests" subtitle="Demo booking queue">
            <ul className="space-y-3">
              {mockBookings.map((booking) => (
                <li key={booking.reference} className="flex items-center justify-between gap-3 rounded-xl bg-sand-50 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-mono font-bold text-ink-950">{booking.reference}</p>
                    <p className="truncate text-xs text-ink-700/60">{booking.customer} · {booking.pickupDate}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={booking.status} />
                    <button type="button" onClick={() => setActive('bookings')} className="text-xs font-semibold text-ultrablue-600 hover:underline">
                      Manage →
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </DashboardCard>

          <DashboardCard title="Outstanding payments" subtitle="Demo payment queue">
            <ul className="space-y-3">
              {mockPayments
                .filter((payment) => payment.status === 'pending')
                .map((payment) => (
                  <li key={payment.id} className="flex items-center justify-between gap-3 rounded-xl bg-sand-50 px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate font-mono font-bold text-ink-950">{payment.reference}</p>
                      <p className="truncate text-xs text-ink-700/60">{payment.customer}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-ink-950">{formatCurrency(payment.amount, payment.currency)}</span>
                      <StatusBadge status={payment.status} />
                    </div>
                  </li>
                ))}
            </ul>
          </DashboardCard>
        </div>
      </div>
    )
  }

  if (active === 'customers') {
    return <CustomersPanel />
  }
  if (active === 'shipments') {
    return <ShipmentsPanel setActive={setActive} />
  }
  if (active === 'bookings') {
    return <BookingsPanel />
  }
  if (active === 'tracking') {
    return <TrackingPanel />
  }
  if (active === 'payments') {
    return <PaymentsPanel />
  }
  if (active === 'invoices') {
    return <InvoicesPanel />
  }
  if (active === 'quotations') {
    return <QuotationsPanel />
  }
  if (active === 'notifications') {
    return <AdminNotificationsPanel />
  }
  return <AdminSettingsPanel />
}

function CustomersPanel() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(query.toLowerCase()) ||
      customer.email.toLowerCase().includes(query.toLowerCase()) ||
      customer.phone.includes(query.trim())
  )

  return (
    <div className="space-y-6">
      <DashboardCard
        title="Customers"
        subtitle="Demo customer records"
        action={
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-700/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search customers"
              aria-label="Search customers"
              className="field w-56 py-2 pl-9"
            />
          </div>
        }
      >
        {filtered.length === 0 ? (
          <p className="py-6 text-center text-sm text-ink-700/55">No customers match your search.</p>
        ) : (
          <ul className="divide-y divide-ink-700/8">
            {filtered.map((customer) => (
              <li key={customer.id} className="flex items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ultrablue-50 font-archivo text-sm font-bold text-ultrablue-700">
                    {customer.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
                  </span>
                  <div>
                    <p className="font-bold text-ink-950">{customer.name}</p>
                    <p className="text-xs text-ink-700/55">{customer.email} · {customer.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold text-ink-700/70">{customer.shipments} shipments</span>
                  <StatusBadge status={customer.status} />
                  <button type="button" onClick={() => setSelected(customer)} className="inline-flex items-center gap-1 text-xs font-semibold text-ultrablue-600 hover:underline">
                    Details <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </DashboardCard>

      {selected && (
        <DashboardCard title="Customer details" subtitle={selected.id} action={<button type="button" onClick={() => setSelected(null)} className="text-xs font-semibold text-ink-700/60 hover:underline">Close</button>}>
          <dl className="grid gap-4 sm:grid-cols-2">
            <Info label="Name" value={selected.name} />
            <Info label="Customer ID" value={selected.id} mono />
            <Info label="Email" value={selected.email} mono />
            <Info label="Phone" value={selected.phone} />
            <Info label="Address" value={selected.address} />
            <Info label="Shipments" value={String(selected.shipments)} />
            <Info label="Status" value={selected.status} />
            <Info label="Joined" value={formatDate(selected.createdAt)} />
          </dl>
        </DashboardCard>
      )}
    </div>
  )
}

function ShipmentsPanel({ setActive }) {
  const [selected, setSelected] = useState(null)
  return (
    <div className="space-y-6">
      <DashboardCard title="Shipments" subtitle="Demo shipment records">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink-700/10 text-xs uppercase tracking-wider text-ink-700/55">
                <th className="pb-3 font-semibold">Reference</th>
                <th className="pb-3 font-semibold">Customer</th>
                <th className="pb-3 font-semibold">Route</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold" />
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-700/8">
              {adminShipments.map((shipment) => (
                <tr key={shipment.id}>
                  <td className="py-3 font-mono font-bold text-ink-950">{shipment.trackingNumber}</td>
                  <td className="py-3 text-ink-700/80">{shipment.customer}</td>
                  <td className="py-3 text-ink-700/80">{shipment.origin} → {shipment.destination}</td>
                  <td className="py-3 text-ink-700/80">{formatDate(shipment.shipmentDate)}</td>
                  <td className="py-3"><StatusBadge status={shipment.status} /></td>
                  <td className="py-3">
                    <button type="button" onClick={() => setSelected(shipment)} className="inline-flex items-center gap-1 font-semibold text-ultrablue-600 hover:underline">
                      Details <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      {selected && (
        <DashboardCard title="Shipment details" subtitle={selected.trackingNumber} action={<button type="button" onClick={() => setSelected(null)} className="text-xs font-semibold text-ink-700/60 hover:underline">Close</button>}>
          <div className="mb-5 flex items-center justify-between rounded-xl bg-sand-50 px-4 py-3">
            <StatusBadge status={selected.status} />
            <span className="text-xs text-ink-700/55">{selected.customer}</span>
          </div>
          <dl className="grid gap-4 sm:grid-cols-2">
            <Info label="Type" value={selected.shipmentType} />
            <Info label="Origin" value={selected.origin} />
            <Info label="Destination" value={selected.destination} />
            <Info label="Shipment date" value={formatDate(selected.shipmentDate)} />
            <Info label="Estimated delivery" value={formatDate(selected.estimatedDelivery)} />
            <Info label="Tracking number" value={selected.trackingNumber} mono />
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => { setActive('tracking'); setSelected(null) }} className="btn-primary py-2.5">
              Manage in tracking
            </button>
            <button type="button" onClick={() => setSelected(null)} className="btn-outline py-2.5">
              Close
            </button>
          </div>
        </DashboardCard>
      )}
    </div>
  )
}

function BookingsPanel() {
  const [bookings, setBookings] = useState(mockBookings)

  const setStatus = (reference, status) => {
    setBookings((prev) => prev.map((b) => (b.reference === reference ? { ...b, status } : b)))
  }

  return (
    <DashboardCard title="Booking requests" subtitle="Demo bookings — status changes are local demo state">
      <ul className="divide-y divide-ink-700/8">
        {bookings.map((booking) => (
          <li key={booking.reference} className="py-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <p className="font-mono font-bold text-ink-950">{booking.reference}</p>
                <p className="text-xs text-ink-700/60">
                  {booking.customer} · {booking.shipmentType} · pickup {formatDate(booking.pickupDate)}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-700/55">
                  <MapPin className="h-3.5 w-3.5" />
                  {booking.pickupAddress} → {booking.deliveryAddress}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={booking.status} />
                <div className="flex gap-2">
                  <button type="button" onClick={() => setStatus(booking.reference, 'confirmed')} className="rounded-lg border border-emerald-500/30 px-3 py-1.5 text-xs font-semibold text-emerald-600 hover:bg-emerald-50">
                    Confirm
                  </button>
                  <button type="button" onClick={() => setStatus(booking.reference, 'pending')} className="rounded-lg border border-ink-700/15 px-3 py-1.5 text-xs font-semibold text-ink-700 hover:bg-sand-50">
                    Hold
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </DashboardCard>
  )
}

function TrackingPanel() {
  const [shipments, setShipments] = useState(adminShipments)
  const [selected, setSelected] = useState(adminShipments[0])

  const setStatus = (trackingNumber, status) => {
    setShipments((prev) =>
      prev.map((s) => (s.trackingNumber === trackingNumber ? { ...s, status } : s))
    )
    setSelected((prev) => (prev && prev.trackingNumber === trackingNumber ? { ...prev, status } : prev))
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
      <DashboardCard title="Demo tracking records" subtitle="Click a shipment to view progress">
        <ul className="space-y-2">
          {shipments.map((shipment) => (
            <li key={shipment.trackingNumber}>
              <button
                type="button"
                onClick={() => setSelected(shipment)}
                className={`flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left transition-colors ${
                  selected?.trackingNumber === shipment.trackingNumber
                    ? 'bg-ink-950 text-white'
                    : 'bg-sand-50 text-ink-900 hover:bg-sand-100'
                }`}
              >
                <span className="font-mono font-bold">{shipment.trackingNumber}</span>
                <StatusBadge status={shipment.status} className={selected?.trackingNumber === shipment.trackingNumber ? '!bg-white/10 !text-white !ring-white/20' : ''} />
              </button>
            </li>
          ))}
        </ul>
      </DashboardCard>

      <DashboardCard
        title="Shipment progress"
        subtitle={selected?.trackingNumber || ''}
        action={
          <select
            value={selected?.status || ''}
            onChange={(e) => setStatus(selected.trackingNumber, e.target.value)}
            className="field w-44 py-2"
            aria-label="Update shipment status"
          >
            <option>Pending Pickup</option>
            <option>In Transit</option>
            <option>Out for Delivery</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        }
      >
        {selected && (
          <>
            <div className="mb-5 flex items-center justify-between rounded-xl bg-sand-50 px-4 py-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-700/55">Current status</p>
                <p className="font-archivo font-bold text-ink-950">{selected.status}</p>
              </div>
              <StatusBadge status={selected.status} />
            </div>
            <ol className="flex flex-col gap-0">
              {selected.progress.map((step, index) => (
                <li key={step.step} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${
                      step.status === 'done' ? 'border-ultrablue-600 bg-ultrablue-600 text-white'
                        : step.status === 'current' ? 'border-ultrablue-600 bg-white text-ultrablue-600'
                        : 'border-ink-700/20 bg-white text-ink-700/40'
                    }`}>
                      {step.status === 'done' ? '✓' : step.step}
                    </span>
                    {index < selected.progress.length - 1 && <span className="my-1 w-px flex-1 bg-ink-700/15" aria-hidden />}
                  </div>
                  <div className="pb-6 pt-1.5">
                    <p className="text-sm font-semibold text-ink-950">{step.label}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-2 text-xs text-ink-700/55">
              Status controls update local demo state only — not a real administrative operation.
            </p>
          </>
        )}
      </DashboardCard>
    </div>
  )
}

function PaymentsPanel() {
  return (
    <DashboardCard title="Payment records" subtitle="Demo payment statuses and history">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink-700/10 text-xs uppercase tracking-wider text-ink-700/55">
              <th className="pb-3 font-semibold">Reference</th>
              <th className="pb-3 font-semibold">Customer</th>
              <th className="pb-3 font-semibold">Description</th>
              <th className="pb-3 font-semibold">Amount</th>
              <th className="pb-3 font-semibold">Date</th>
              <th className="pb-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-700/8">
            {mockPayments.map((payment) => (
              <tr key={payment.id}>
                <td className="py-3 font-mono font-bold text-ink-950">{payment.reference}</td>
                <td className="py-3 text-ink-700/80">{payment.customer}</td>
                <td className="py-3 text-ink-700/80">{payment.description}</td>
                <td className="py-3 font-bold text-ink-950">{formatCurrency(payment.amount, payment.currency)}</td>
                <td className="py-3 text-ink-700/80">{formatDate(payment.date)}</td>
                <td className="py-3"><StatusBadge status={payment.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  )
}

function InvoicesPanel() {
  return (
    <DashboardCard title="Invoices" subtitle="Demo invoice records">
      <ul className="divide-y divide-ink-700/8">
        {mockPayments.map((invoice) => (
          <li key={invoice.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono font-bold text-ink-950">{invoice.reference}</p>
              <p className="text-xs text-ink-700/60">{invoice.description} · {formatDate(invoice.date)}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-ink-950">{formatCurrency(invoice.amount, invoice.currency)}</span>
              <StatusBadge status={invoice.status} />
              <button type="button" className="rounded-lg border border-ink-700/15 px-3 py-1.5 text-xs font-semibold text-ink-700 hover:bg-sand-50" aria-label={`View ${invoice.reference} (demo)`}>
                View
              </button>
            </div>
          </li>
        ))}
      </ul>
    </DashboardCard>
  )
}

function QuotationsPanel() {
  return (
    <DashboardCard title="Quote requests" subtitle="Demo quotation requests">
      <ul className="divide-y divide-ink-700/8">
        {mockQuotes.map((quote) => (
          <li key={quote.reference} className="py-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="font-mono font-bold text-ink-950">{quote.reference}</p>
                <p className="text-xs text-ink-700/60">
                  {quote.customer} · {quote.shipmentCategory} · {quote.size}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-700/55">
                  <MapPin className="h-3.5 w-3.5" />
                  {quote.pickupLocation} → {quote.destination}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <StatusBadge status={quote.status} />
                <button type="button" className="rounded-lg border border-emerald-500/30 px-3 py-1.5 text-xs font-semibold text-emerald-600 hover:bg-emerald-50">
                  Mark responded
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </DashboardCard>
  )
}

function AdminNotificationsPanel() {
  const notifications = [
    { title: 'New booking request received', message: 'UF-BK-000118 from Akinwale A. is awaiting confirmation.', date: '2026-11-20' },
    { title: 'Shipment delivered', message: 'UF1003ABK was marked delivered successfully.', date: '2026-11-12' },
    { title: 'Outstanding payment', message: 'UF-INV-2026-0007 remains unpaid for 9 days.', date: '2026-11-21' },
    { title: 'New quote request', message: 'UF-QT-000041 from Chinedu E. requires a quotation.', date: '2026-11-20' },
  ]
  return (
    <DashboardCard title="Notifications" subtitle="Customer activity updates (demo)">
      <ul className="space-y-3">
        {notifications.map((notification, index) => (
          <li key={index} className="flex gap-4 rounded-xl bg-sand-50 p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-ultrablue-600 shadow-card">
              <Bell className="h-4.5 w-4.5" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-bold text-ink-950">{notification.title}</p>
              <p className="mt-0.5 text-xs text-ink-700/60">{notification.message}</p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-700/45">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(notification.date)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </DashboardCard>
  )
}

function AdminSettingsPanel() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <DashboardCard title="Dashboard settings" subtitle="Demo preferences">
        <dl className="grid gap-4 sm:grid-cols-2">
          <Info label="Date format" value="DD/MM/YYYY" />
          <Info label="Currency" value="NGN" />
          <Info label="Timezone" value="Africa/Lagos" />
          <Info label="Theme" value="Default" />
        </dl>
        <button type="button" className="btn-primary mt-6 w-full">Save settings</button>
      </DashboardCard>
      <DashboardCard title="Demo notice" subtitle="About this console">
        <p className="text-sm leading-relaxed text-ink-700/70">
          This administration console is a frontend demonstration. Every list, detail view, and
          status control operates on local demo data. No real administrative operations occur until
          the FastAPI backend and PostgreSQL database are connected in a later phase.
        </p>
      </DashboardCard>
    </div>
  )
}

function Info({ label, value, mono }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-ink-700/55">{label}</dt>
      <dd className={`mt-1 text-sm font-semibold text-ink-950 ${mono ? 'font-mono' : ''}`}>{value}</dd>
    </div>
  )
}
