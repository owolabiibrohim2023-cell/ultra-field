// Status pill used across tracking, dashboards, and invoices.
const STYLES = {
  pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  active: 'bg-ultrablue-50 text-ultrablue-700 ring-ultrablue-600/20',
  in_transit: 'bg-ultrablue-50 text-ultrablue-700 ring-ultrablue-600/20',
  confirmed: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  delivered: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  paid: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  cancelled: 'bg-red-50 text-red-600 ring-red-500/20',
  new: 'bg-sand-100 text-ink-700 ring-ink-600/20',
  pending_pickup: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  out_for_delivery: 'bg-sky-50 text-sky-700 ring-sky-600/20',
  received: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  demo: 'bg-ink-900/5 text-ink-700 ring-ink-700/15',
}

function normalize(status) {
  const key = String(status || '').toLowerCase().replace(/[^a-z_]/g, '_')
  return STYLES[key] ? key : 'pending'
}

export default function StatusBadge({ status, label, className = '' }) {
  const key = normalize(status)
  const display = label || status
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
        STYLES[key]
      } ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {display}
    </span>
  )
}
