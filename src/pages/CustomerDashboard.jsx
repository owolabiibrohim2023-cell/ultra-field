import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Package,
  Search,
  Truck,
  CreditCard,
  Receipt,
  Bell,
  User,
  Settings,
  ArrowRight,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  PackageCheck,
  ExternalLink,
} from 'lucide-react'
import DashboardShell, { DashboardCard, StatCard, DashboardSignOut } from '../components/dashboard/DashboardShell.jsx'
import StatusBadge from '../components/common/StatusBadge.jsx'
import { FormField, TextInput } from '../components/forms/FormField.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { getShipmentsByCustomer, getExternalTracking } from '../services/shipmentService.js'
import { dashboardInvoices, dashboardPaymentHistory, dashboardNotifications, dashboardOverview } from '../data/mockPayments.js'
import { formatCurrency, formatDate, isEmpty } from '../utils/format.js'
import thumbParcel from '../assets/photos/svc-parcel.jpg'
import thumbLogistics from '../assets/photos/svc-logistics.jpg'
import thumbHandling from '../assets/photos/svc-handling.jpg'
import thumbCoordination from '../assets/photos/svc-coordination.jpg'
import thumbBusiness from '../assets/photos/svc-business.jpg'

// Small thumbnails for demo shipment cards (thumbnails only, no large imagery).
const SHIPMENT_THUMBS = [thumbParcel, thumbLogistics, thumbHandling, thumbCoordination, thumbBusiness]

const NAV = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'shipments', label: 'My Shipments', icon: Package },
  { id: 'track', label: 'Track Shipment', icon: Search },
  { id: 'book', label: 'Book Shipment', icon: Truck },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'invoices', label: 'Invoices', icon: Receipt },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function CustomerDashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [active, setActive] = useState('overview')
  const [shipments, setShipments] = useState([])
  const [loadingShipments, setLoadingShipments] = useState(true)

  useEffect(() => {
    document.title = 'Customer Dashboard | Ultrafield Logistics Limited'
  }, [])

  useEffect(() => {
    let active = true
    getShipmentsByCustomer('UF-C-001')
      .then((data) => {
        if (active) setShipments(data)
      })
      .finally(() => active && setLoadingShipments(false))
    return () => {
      active = false
    }
  }, [])

  const handleSignOut = () => {
    signOut()
    navigate('/')
  }

  return (
    <DashboardShell navItems={NAV} activeId={active} onNavigate={setActive}>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="eyebrow">Customer dashboard</span>
          <h1 className="mt-2 font-archivo text-2xl font-bold text-ink-950 sm:text-3xl">
            Welcome back, {user?.name?.split(' ')[0] || 'Customer'}
          </h1>
          <p className="mt-1 text-sm text-ink-700/60">
            Demo dashboard — all shipments, payments, and invoices shown here are sample data.
          </p>
        </div>
        <DashboardSignOut onSignOut={handleSignOut} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="space-y-6"
        >
          {active === 'overview' && (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard icon={Package} label="Total shipments" value={dashboardOverview.totalShipments} tone="blue" />
                <StatCard icon={Truck} label="Active shipments" value={dashboardOverview.activeShipments} tone="amber" />
                <StatCard icon={CheckCircle2} label="Delivered" value={dashboardOverview.deliveredShipments} tone="emerald" />
                <StatCard icon={CreditCard} label="Pending payments" value={dashboardOverview.pendingPayments} tone="ink" />
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <DashboardCard title="Recent shipments" subtitle="Latest activity on your account">
                  <ul className="space-y-3">
                    {shipments.slice(0, 3).map((shipment, idx) => (
                      <li key={shipment.id} className="flex items-center justify-between gap-3 rounded-xl bg-sand-50 px-4 py-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <img
                            src={SHIPMENT_THUMBS[idx % SHIPMENT_THUMBS.length]}
                            alt={`Shipment ${shipment.trackingNumber} thumbnail`}
                            loading="lazy"
                            decoding="async"
                            width={48}
                            height={48}
                            className="h-12 w-12 shrink-0 rounded-lg object-cover"
                          />
                          <div className="min-w-0">
                            <p className="truncate font-mono text-sm font-bold text-ink-950">{shipment.trackingNumber}</p>
                            <p className="truncate text-xs text-ink-700/60">{shipment.origin} → {shipment.destination}</p>
                          </div>
                        </div>
                        <StatusBadge status={shipment.status} />
                      </li>
                    ))}
                    {loadingShipments && (
                      <li className="flex items-center gap-3 text-sm text-ink-700/55">Loading shipments…</li>
                    )}
                  </ul>
                </DashboardCard>

                <DashboardCard title="Pending payments" subtitle="Invoices awaiting payment">
                  <ul className="space-y-3">
                    {dashboardInvoices
                      .filter((inv) => inv.status === 'pending')
                      .map((invoice) => (
                        <li key={invoice.id} className="flex items-center justify-between gap-3 rounded-xl bg-sand-50 px-4 py-3">
                          <div className="min-w-0">
                            <p className="truncate font-mono text-sm font-bold text-ink-950">{invoice.reference}</p>
                            <p className="truncate text-xs text-ink-700/60">{invoice.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-ink-950">{formatCurrency(invoice.amount, invoice.currency)}</p>
                            <Link to="/payment" className="text-xs font-semibold text-ultrablue-600 hover:underline">
                              Pay now →
                            </Link>
                          </div>
                        </li>
                      ))}
                    <li className="rounded-xl bg-sand-50 px-4 py-3 text-xs text-ink-700/55">
                      No other pending payments in the demo data.
                    </li>
                  </ul>
                </DashboardCard>
              </div>
            </>
          )}

          {active === 'shipments' && (
            <DashboardCard
              title="My shipments"
              subtitle="Sample shipment records on your account"
              action={
                <Link to="/book-shipment" className="btn-primary py-2.5">
                  Book new shipment
                </Link>
              }
            >
              {loadingShipments ? (
                <p className="text-sm text-ink-700/55">Loading shipments…</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-ink-700/10 text-xs uppercase tracking-wider text-ink-700/55">
                        <th className="pb-3 font-semibold">Thumb</th>
                        <th className="pb-3 font-semibold">Reference</th>
                        <th className="pb-3 font-semibold">Type</th>
                        <th className="pb-3 font-semibold">Origin</th>
                        <th className="pb-3 font-semibold">Destination</th>
                        <th className="pb-3 font-semibold">Date</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 font-semibold" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink-700/8">
                      {shipments.map((shipment, idx) => (
                        <tr key={shipment.id}>
                          <td className="py-3">
                            <img
                              src={SHIPMENT_THUMBS[idx % SHIPMENT_THUMBS.length]}
                              alt={`Shipment ${shipment.trackingNumber} thumbnail`}
                              loading="lazy"
                              decoding="async"
                              width={48}
                              height={48}
                              className="h-12 w-12 rounded-lg object-cover"
                            />
                          </td>
                          <td className="py-3 font-mono font-bold text-ink-950">{shipment.trackingNumber}</td>
                          <td className="py-3 text-ink-700/80">{shipment.shipmentType}</td>
                          <td className="py-3 text-ink-700/80">{shipment.origin}</td>
                          <td className="py-3 text-ink-700/80">{shipment.destination}</td>
                          <td className="py-3 text-ink-700/80">{formatDate(shipment.shipmentDate)}</td>
                          <td className="py-3"><StatusBadge status={shipment.status} /></td>
                          <td className="py-3">
                            <button
                              type="button"
                              onClick={() => setActive('track')}
                              className="inline-flex items-center gap-1 font-semibold text-ultrablue-600 hover:underline"
                            >
                              View details <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </DashboardCard>
          )}

          {active === 'track' && <TrackShipmentPanel shipments={shipments} loading={loadingShipments} />}

          {active === 'book' && <BookShipmentPanel onBooked={() => setActive('shipments')} />}

          {active === 'payments' && (
            <div className="space-y-6">
              <DashboardCard title="Outstanding payments" subtitle="Amounts currently due">
                <ul className="space-y-3">
                  {dashboardInvoices.filter((i) => i.status === 'pending').map((invoice) => (
                    <li key={invoice.id} className="flex items-center justify-between gap-3 rounded-xl bg-sand-50 px-4 py-4">
                      <div>
                        <p className="font-mono font-bold text-ink-950">{invoice.reference}</p>
                        <p className="text-xs text-ink-700/60">{invoice.description}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-ink-950">{formatCurrency(invoice.amount, invoice.currency)}</span>
                        <Link to="/payment" className="btn-primary py-2">
                          Pay now
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </DashboardCard>

              <DashboardCard title="Payment history" subtitle="Demo payment activity">
                <ul className="divide-y divide-ink-700/8">
                  {dashboardPaymentHistory.map((entry) => (
                    <li key={entry.id} className="flex items-center justify-between gap-3 py-3">
                      <div>
                        <p className="font-mono font-bold text-ink-950">{entry.reference}</p>
                        <p className="text-xs text-ink-700/55">{formatDate(entry.date)}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-ink-950">{formatCurrency(entry.amount, entry.currency)}</span>
                        <StatusBadge status={entry.status} />
                      </div>
                    </li>
                  ))}
                </ul>
              </DashboardCard>
            </div>
          )}

          {active === 'invoices' && (
            <DashboardCard title="Invoices" subtitle="Demo invoices on your account">
              <ul className="divide-y divide-ink-700/8">
                {dashboardInvoices.map((invoice) => (
                  <li key={invoice.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-mono font-bold text-ink-950">{invoice.reference}</p>
                      <p className="text-xs text-ink-700/60">{invoice.description} · {formatDate(invoice.date)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-ink-950">{formatCurrency(invoice.amount, invoice.currency)}</span>
                      <StatusBadge status={invoice.status} />
                      <button
                        type="button"
                        className="rounded-lg border border-ink-700/15 px-3 py-1.5 text-xs font-semibold text-ink-700 hover:bg-sand-50"
                        aria-label={`Download ${invoice.reference} (demo placeholder)`}
                      >
                        Download
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-start gap-2 text-xs text-ink-700/55">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-ultrablue-600" />
                Download is a UI placeholder — invoice documents will be available once the backend is connected.
              </p>
            </DashboardCard>
          )}

          {active === 'notifications' && (
            <DashboardCard title="Notifications" subtitle="Shipment and payment updates">
              <ul className="space-y-3">
                {dashboardNotifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`flex gap-4 rounded-xl p-4 ${
                      notification.read ? 'bg-sand-50' : 'bg-ultrablue-50/60 ring-1 ring-ultrablue-600/10'
                    }`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-ultrablue-600 shadow-card">
                      {notification.type === 'shipment' ? (
                        <Truck className="h-4.5 w-4.5" />
                      ) : notification.type === 'payment' ? (
                        <CreditCard className="h-4.5 w-4.5" />
                      ) : (
                        <Bell className="h-4.5 w-4.5" />
                      )}
                    </span>
                    <div className="flex-1">
                      <p className="flex items-center gap-2 text-sm font-bold text-ink-950">
                        {notification.title}
                        {!notification.read && (
                          <span className="h-2 w-2 rounded-full bg-ultrablue-600" aria-label="Unread" />
                        )}
                      </p>
                      <p className="mt-0.5 text-xs text-ink-700/60">{notification.message}</p>
                      <p className="mt-1 text-xs text-ink-700/45">{formatDate(notification.date)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </DashboardCard>
          )}

          {active === 'profile' && <ProfilePanel />}

          {active === 'settings' && <SettingsPanel />}
        </motion.div>
      </AnimatePresence>
    </DashboardShell>
  )
}

function TrackShipmentPanel({ shipments, loading }) {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [result, setResult] = useState(null)
  const [external, setExternal] = useState(null)
  const [error, setError] = useState('')

  const handleTrack = async (e) => {
    e.preventDefault()
    if (isEmpty(trackingNumber)) {
      setError('Enter a tracking number to track a shipment.')
      setResult(null)
      return
    }
    const record = shipments.find((s) => s.trackingNumber.includes(trackingNumber.trim().toUpperCase()))
    setError(record ? '' : 'No demo shipment found for that number. Try UF1001ABK.')
    setResult(record || null)
    if (record) {
      getExternalTracking(record.trackingNumber, '').then(setExternal)
    } else {
      setExternal(null)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <DashboardCard title="Track shipment" subtitle="Enter a tracking number">
        <form onSubmit={handleTrack} className="space-y-4">
          <FormField label="Tracking number" name="tracking" error={error}>
            {(id, describedBy, ref) => (
              <TextInput id={id} describedBy={describedBy} error={error} ref={ref} value={trackingNumber} onChange={(e) => { setTrackingNumber(e.target.value); setError('') }} placeholder="e.g. UF1001ABK" />
            )}
          </FormField>
          <button type="submit" className="btn-primary w-full">Track shipment</button>
          <p className="text-xs text-ink-700/55">Demo data only — real tracking arrives with the backend.</p>
        </form>
      </DashboardCard>

      {result && (
        <DashboardCard title="Shipment status" subtitle={result.trackingNumber}>
          <div className="mb-5 flex items-center justify-between rounded-xl bg-sand-50 px-4 py-3">
            <StatusBadge status={result.status} />
            <span className="text-xs text-ink-700/55">Reference {result.trackingNumber}</span>
          </div>
          {external?.carrier && (
            <div className="mb-5 flex flex-col items-start gap-3 rounded-xl border border-ultrablue-600/15 bg-ultrablue-50/50 p-4">
              <div className="flex items-center justify-between gap-3 w-full">
                <p className="text-sm text-ink-950">
                  Handled by{' '}
                  <span className="font-bold" style={{ color: external.carrier.color }}>
                    {external.carrier.name}
                  </span>
                </p>
              </div>
              {external.trackingUrl ? (
                <a
                  href={external.trackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-ultrablue-700 hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  Track on {external.carrier.name}
                </a>
              ) : (
                <p className="text-xs text-ink-700/55">
                  No public tracking page for this carrier reference.
                </p>
              )}
            </div>
          )}

          <ol className="flex flex-col gap-0">
            {result.progress.map((step, index) => (
              <li key={step.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${
                    step.status === 'done' ? 'border-ultrablue-600 bg-ultrablue-600 text-white'
                      : step.status === 'current' ? 'border-ultrablue-600 bg-white text-ultrablue-600'
                      : 'border-ink-700/20 bg-white text-ink-700/40'
                  }`}>
                    {step.status === 'done' ? '✓' : step.step}
                  </span>
                  {index < result.progress.length - 1 && <span className="my-1 w-px flex-1 bg-ink-700/15" aria-hidden />}
                </div>
                <div className="pb-6 pt-1.5">
                  <p className="text-sm font-semibold text-ink-950">{step.label}</p>
                  <p className="text-xs text-ink-700/55">
                    {step.status === 'done' && 'Completed'}
                    {step.status === 'current' && 'Currently in this stage'}
                    {step.status === 'upcoming' && 'Pending'}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </DashboardCard>
      )}
    </div>
  )
}

function BookShipmentPanel({ onBooked }) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    pickupAddress: '',
    deliveryAddress: '',
    shipmentType: '',
    packageDescription: '',
    packageWeight: '',
    pickupDate: '',
    additionalInstructions: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const setField = (name) => (e) => {
    setForm((prev) => ({ ...prev, [name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const next = {
      fullName: isEmpty(form.fullName) ? 'Full name is required.' : '',
      email: isEmpty(form.email) ? 'Email is required.' : '',
      phone: isEmpty(form.phone) ? 'Phone number is required.' : '',
      pickupAddress: isEmpty(form.pickupAddress) ? 'Pickup address is required.' : '',
      deliveryAddress: isEmpty(form.deliveryAddress) ? 'Delivery address is required.' : '',
      shipmentType: isEmpty(form.shipmentType) ? 'Select a shipment type.' : '',
      packageDescription: isEmpty(form.packageDescription) ? 'Describe the package.' : '',
      packageWeight: isEmpty(form.packageWeight) ? 'Weight is required.' : '',
      pickupDate: isEmpty(form.pickupDate) ? 'Pickup date is required.' : '',
    }
    setErrors(next)
    if (Object.values(next).some(Boolean)) return

    setSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 700))
    setSubmitting(false)
    setDone(true)
    onBooked?.()
  }

  if (done) {
    return (
      <DashboardCard title="Booking request" subtitle="Demo submission">
        <div className="flex flex-col items-center py-6 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-7 w-7" />
          </span>
          <p className="mt-4 text-sm font-semibold text-ink-950">Demo booking request received</p>
          <p className="mt-1 max-w-sm text-xs text-ink-700/60">
            No real shipment was created. Use “Book a shipment” on the site when backend booking is live.
          </p>
          <button type="button" onClick={() => { setDone(false); setForm({ fullName: '', email: '', phone: '', pickupAddress: '', deliveryAddress: '', shipmentType: '', packageDescription: '', packageWeight: '', pickupDate: '', additionalInstructions: '' }) }} className="btn-primary mt-6">
            Book another
          </button>
        </div>
      </DashboardCard>
    )
  }

  return (
    <DashboardCard title="Book a shipment" subtitle="Quick form from your dashboard — demo only">
      <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full name" name="fullName" required error={errors.fullName}>
          {(id, describedBy, ref) => (<TextInput id={id} describedBy={describedBy} error={errors.fullName} ref={ref} value={form.fullName} onChange={setField('fullName')} />)}
        </FormField>
        <FormField label="Email" name="email" required error={errors.email}>
          {(id, describedBy, ref) => (<TextInput id={id} describedBy={describedBy} error={errors.email} ref={ref} value={form.email} onChange={setField('email')} type="email" />)}
        </FormField>
        <FormField label="Phone" name="phone" required error={errors.phone}>
          {(id, describedBy, ref) => (<TextInput id={id} describedBy={describedBy} error={errors.phone} ref={ref} value={form.phone} onChange={setField('phone')} type="tel" />)}
        </FormField>
        <FormField label="Pickup date" name="pickupDate" required error={errors.pickupDate}>
          {(id, describedBy, ref) => (<TextInput id={id} describedBy={describedBy} error={errors.pickupDate} ref={ref} value={form.pickupDate} onChange={setField('pickupDate')} type="date" />)}
        </FormField>
        <FormField label="Pickup address" name="pickupAddress" required error={errors.pickupAddress} className="sm:col-span-2">
          {(id, describedBy, ref) => (<TextInput id={id} describedBy={describedBy} error={errors.pickupAddress} ref={ref} value={form.pickupAddress} onChange={setField('pickupAddress')} />)}
        </FormField>
        <FormField label="Delivery address" name="deliveryAddress" required error={errors.deliveryAddress} className="sm:col-span-2">
          {(id, describedBy, ref) => (<TextInput id={id} describedBy={describedBy} error={errors.deliveryAddress} ref={ref} value={form.deliveryAddress} onChange={setField('deliveryAddress')} />)}
        </FormField>
        <FormField label="Shipment type" name="shipmentType" required error={errors.shipmentType}>
          {(id, describedBy, ref) => (
            <select id={id} ref={ref} value={form.shipmentType} onChange={setField('shipmentType')} className={`field cursor-pointer ${errors.shipmentType ? 'field-error' : ''}`}>
              <option value="" disabled>Select type</option>
              <option>Parcel Delivery</option>
              <option>Logistics Services</option>
              <option>Shipment Handling</option>
              <option>Delivery Coordination</option>
              <option>Business Logistics</option>
            </select>
          )}
        </FormField>
        <FormField label="Weight (kg)" name="packageWeight" required error={errors.packageWeight}>
          {(id, describedBy, ref) => (<TextInput id={id} describedBy={describedBy} error={errors.packageWeight} ref={ref} value={form.packageWeight} onChange={setField('packageWeight')} inputMode="decimal" />)}
        </FormField>
        <FormField label="Package description" name="packageDescription" required error={errors.packageDescription} className="sm:col-span-2">
          {(id, describedBy, ref) => (
            <textarea id={id} ref={ref} rows={3} value={form.packageDescription} onChange={setField('packageDescription')} className={`field resize-y ${errors.packageDescription ? 'field-error' : ''}`} />
          )}
        </FormField>
        <div className="sm:col-span-2">
          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit booking request'}
          </button>
        </div>
      </form>
    </DashboardCard>
  )
}

function ProfilePanel() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <DashboardCard title="Customer information" subtitle="Demo profile details">
        <dl className="grid gap-4 sm:grid-cols-2">
          <ProfileRow icon={User} label="Customer ID" value="UF-C-001" mono />
          <ProfileRow icon={User} label="Name" value="Demo Customer" />
          <ProfileRow icon={User} label="Email" value="demo.customer@example.com" mono />
          <ProfileRow icon={User} label="Phone" value="0803 331 3686" />
          <ProfileRow icon={MapPin} label="Address" value="26 Ita Iyalode Road, Lafenwa, Abeokuta" full />
          <ProfileRow icon={PackageCheck} label="Account status" value="Active" />
        </dl>
      </DashboardCard>

      <DashboardCard title="Contact details" subtitle="As recorded for your account (demo)">
        <dl className="space-y-4">
          <ProfileRow icon={User} label="Full name" value="Demo Customer" />
          <ProfileRow icon={User} label="Email" value="demo.customer@example.com" mono />
          <ProfileRow icon={User} label="Phone" value="0803 331 3686" />
          <ProfileRow icon={Calendar} label="Member since" value="2026-10-02" />
        </dl>
      </DashboardCard>
    </div>
  )
}

function ProfileRow({ icon: Icon, label, value, mono, full }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-700/55">
        <Icon className="h-4 w-4" />
        {label}
      </dt>
      <dd className={`mt-1 text-sm font-semibold text-ink-950 ${mono ? 'font-mono' : ''}`}>{value}</dd>
    </div>
  )
}

function SettingsPanel() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    shipmentUpdates: true,
    paymentUpdates: true,
    marketingEmails: false,
    language: 'en',
    timezone: 'Africa/Lagos',
  })
  const [saved, setSaved] = useState(false)

  const toggle = (key) => (e) => {
    setSettings((prev) => ({ ...prev, [key]: e.target.checked }))
    setSaved(false)
  }

  const onSave = (e) => {
    e.preventDefault()
    setSaved(true)
  }

  const Row = ({ title, description, children }) => (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-semibold text-ink-950">{title}</p>
        <p className="text-xs text-ink-700/55">{description}</p>
      </div>
      {children}
    </div>
  )

  return (
    <div className="space-y-6">
      <DashboardCard title="Notification preferences" subtitle="Choose how you receive updates (demo settings)">
        <form onSubmit={onSave} className="divide-y divide-ink-700/8">
          <Row title="Shipment updates" description="Tracking status and delivery progress">
            <input type="checkbox" checked={settings.shipmentUpdates} onChange={toggle('shipmentUpdates')} className="h-4 w-4 rounded border-ink-700/30 text-ultrablue-600 focus:ring-ultrablue-500" />
          </Row>
          <Row title="Payment updates" description="Invoice and payment confirmations">
            <input type="checkbox" checked={settings.paymentUpdates} onChange={toggle('paymentUpdates')} className="h-4 w-4 rounded border-ink-700/30 text-ultrablue-600 focus:ring-ultrablue-500" />
          </Row>
          <Row title="Email notifications" description="Receive updates by email">
            <input type="checkbox" checked={settings.emailNotifications} onChange={toggle('emailNotifications')} className="h-4 w-4 rounded border-ink-700/30 text-ultrablue-600 focus:ring-ultrablue-500" />
          </Row>
          <Row title="SMS notifications" description="Receive updates by SMS">
            <input type="checkbox" checked={settings.smsNotifications} onChange={toggle('smsNotifications')} className="h-4 w-4 rounded border-ink-700/30 text-ultrablue-600 focus:ring-ultrablue-500" />
          </Row>
          <Row title="Marketing emails" description="Tips and offers from Ultrafield">
            <input type="checkbox" checked={settings.marketingEmails} onChange={toggle('marketingEmails')} className="h-4 w-4 rounded border-ink-700/30 text-ultrablue-600 focus:ring-ultrablue-500" />
          </Row>
        </form>
      </DashboardCard>

      <DashboardCard title="Profile preferences" subtitle="Display and regional settings (demo)">
        <form onSubmit={onSave} className="grid gap-5 sm:grid-cols-2">
          <FormField label="Language" name="language">
            {(id, describedBy, ref) => (
              <select id={id} ref={ref} value={settings.language} onChange={(e) => { setSettings((p) => ({ ...p, language: e.target.value })); setSaved(false) }} className="field cursor-pointer">
                <option value="en">English</option>
              </select>
            )}
          </FormField>
          <FormField label="Timezone" name="timezone">
            {(id, describedBy, ref) => (
              <select id={id} ref={ref} value={settings.timezone} onChange={(e) => { setSettings((p) => ({ ...p, timezone: e.target.value })); setSaved(false) }} className="field cursor-pointer">
                <option value="Africa/Lagos">Africa/Lagos</option>
              </select>
            )}
          </FormField>
        </form>
      </DashboardCard>

      <div className="flex items-center gap-4">
        <button type="button" onClick={onSave} className="btn-primary">Save preferences</button>
        {saved && <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600"><CheckCircle2 className="h-4 w-4" /> Saved (demo)</span>}
      </div>
    </div>
  )
}
