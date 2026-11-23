import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Calendar, Package, ArrowRight, AlertCircle, CheckCircle2, ExternalLink, Truck } from 'lucide-react'
import PageHeader from '../components/common/PageHeader.jsx'
import StatusBadge from '../components/common/StatusBadge.jsx'
import { getShipmentByTrackingNumber, getExternalTracking } from '../services/shipmentService.js'
import { formatDate } from '../utils/format.js'
import { resolveCarrier, getCarrierTrackingUrl } from '../utils/carriers.js'
import { getAllCarriers } from '../data/carriers.js'
import trackIntroPhoto from '../assets/photos/track-intro.jpg'

export default function TrackShipment() {
  const [searchParams] = useSearchParams()
  const [trackingNumber, setTrackingNumber] = useState(searchParams.get('q') || '')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [carrierId, setCarrierId] = useState('')
  const [external, setExternal] = useState(null)

  useEffect(() => {
    document.title = 'Track Shipment | Ultrafield Logistics Limited'
  }, [])

  // Auto-track when arriving with ?q= from the homepage quick-access form.
  useEffect(() => {
    const initial = searchParams.get('q')
    if (initial) handleTrack(initial)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTrack = async (value) => {
    const trimmed = String(value ?? trackingNumber).trim()
    if (!trimmed) {
      setError('Please enter a tracking number.')
      setResult(null)
      setExternal(null)
      return
    }
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const shipment = await getShipmentByTrackingNumber(trimmed)
      setResult(shipment)
      // Resolve the external carrier (auto-detect or shipment's assigned carrier).
      const tracking = await getExternalTracking(trimmed, '')
      setExternal(tracking)
      setCarrierId(tracking.carrier?.id || '')
    } catch {
      setError('We could not retrieve a shipment for that tracking number. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    handleTrack()
  }

  return (
    <>
      <PageHeader
        eyebrow="Shipment tracking"
        title="Track your shipment"
        subtitle="Enter your shipment tracking number to view status, route details, and delivery progress. Tracking results are currently sample data."
      />

      {/* Intro photo banner */}
      <div className="container-uf">
        <div className="relative mt-8 overflow-hidden rounded-2xl shadow-cardLg">
          <img
            src={trackIntroPhoto}
            alt="Shipment tracking in operation with a courier and delivery van"
            loading="lazy"
            decoding="async"
            width={1600}
            height={480}
            className="aspect-[16/6] w-full object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink-950/55 via-ink-950/20 to-transparent" />
          <div className="absolute inset-0 flex items-center p-8 sm:p-12">
            <div className="max-w-md">
              <span className="eyebrow !text-ultrablue-300">
                <span className="h-px w-6 bg-current opacity-60" />
                Shipment tracking
              </span>
              <h2 className="mt-3 font-archivo text-2xl font-bold text-white sm:text-3xl">
                Follow every shipment, from collection to delivery
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-sand-100/80">
                Use your tracking number to check status, route details, and delivery progress —
                updated as your shipment moves.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-uf">
          {/* Tracking form */}
          <form
            onSubmit={onSubmit}
            className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row"
            role="search"
            aria-label="Track a shipment"
          >
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-700/40" />
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="e.g. UF1001ABK"
                aria-label="Tracking number"
                className="field pl-12"
                autoComplete="off"
              />
            </div>
            <button type="submit" className="btn-primary shrink-0" disabled={loading}>
              {loading ? 'Tracking…' : 'Track Shipment'}
            </button>
          </form>

          {error && (
            <div className="mx-auto mt-4 flex max-w-2xl items-center gap-2 rounded-xl border border-red-500/20 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              <AlertCircle className="h-5 w-5 shrink-0" />
              {error}
            </div>
          )}

          {/* Demo notice */}
          <p className="mx-auto mt-4 flex max-w-2xl items-start gap-2 text-xs text-ink-700/55">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-ultrablue-600" />
            Demo functionality: the tracking record below is sample data. Real shipment tracking
            will be available once the backend is connected.
          </p>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto mt-10 max-w-4xl"
              >
                {/* Result card */}
                <div className="card overflow-hidden">
                  <div className="flex flex-col gap-4 border-b border-ink-700/10 bg-sand-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-ink-700/55">
                        Shipment reference
                      </p>
                      <p className="mt-1 font-archivo text-xl font-bold text-ink-950">
                        {result.trackingNumber}
                      </p>
                    </div>
                    <StatusBadge status={result.status} />
                  </div>

                  <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
                    <InfoTile icon={Package} label="Shipment type" value={result.shipmentType} />
                    <InfoTile icon={MapPin} label="Origin" value={result.origin} />
                    <InfoTile icon={MapPin} label="Destination" value={result.destination} />
                    <InfoTile icon={Calendar} label="Shipment date" value={formatDate(result.shipmentDate)} />
                    <InfoTile
                      icon={Calendar}
                      label="Estimated delivery"
                      value={formatDate(result.estimatedDelivery)}
                    />
                    <InfoTile
                      icon={CheckCircle2}
                      label="Current status"
                      value={result.status}
                      highlight
                    />
                  </div>

                  {/* External carrier tracking */}
                  {external?.carrier && (
                    <div className="border-t border-ink-700/10 px-6 py-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                          <h2 className="font-archivo text-lg font-bold text-ink-950">
                            External carrier tracking
                          </h2>
                          <p className="mt-1 text-sm text-ink-700/60">
                            This shipment is handled by{' '}
                            <span className="font-bold" style={{ color: external.carrier.color }}>
                              {external.carrier.name}
                            </span>
                            . Track it directly on the carrier's site.
                          </p>
                        </div>
                        <div className="flex flex-col gap-3 sm:items-end">
                          {/* Carrier selector */}
                          <label className="text-xs font-semibold uppercase tracking-wider text-ink-700/55">
                            Carrier
                          </label>
                          <select
                            value={carrierId}
                            onChange={(e) => {
                              const id = e.target.value
                              setCarrierId(id)
                              getExternalTracking(result.trackingNumber, id).then(setExternal)
                            }}
                            className="field cursor-pointer max-w-[220px]"
                            aria-label="Select carrier for external tracking"
                          >
                            <option value="">Auto-detect</option>
                            {getAllCarriers()
                              .filter((c) => c.id !== 'ultrafield')
                              .map((c) => (
                                <option key={c.id} value={c.id}>
                                  {c.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>

                      {external.trackingUrl ? (
                        <a
                          href={external.trackingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary mt-5 w-full sm:w-auto"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Track on {external.carrier.name}
                        </a>
                      ) : (
                        <p className="mt-5 flex items-center gap-2 rounded-xl bg-sand-50 px-4 py-3 text-sm text-ink-700/60">
                          <Truck className="h-4 w-4 text-ink-700/40" />
                          {external.carrier.name} does not offer a public tracking page for this
                          reference. Use the Ultrafield tracking above.
                        </p>
                      )}
                      <p className="mt-3 text-xs text-ink-700/45">
                        Opens {external.carrier.name}'s tracking page in a new tab. Carrier tracking
                        is a deep-link integration — no backend required.
                      </p>
                    </div>
                  )}

                  {/* Progress timeline */}
                  <div className="border-t border-ink-700/10 px-6 py-6">
                    <h2 className="font-archivo text-lg font-bold text-ink-950">Shipment progress</h2>
                    <ol className="mt-5 flex flex-col gap-0">
                      {result.progress?.map((step, index) => (
                        <li key={step.step} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <span
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${
                                step.status === 'done'
                                  ? 'border-ultrablue-600 bg-ultrablue-600 text-white'
                                  : step.status === 'current'
                                    ? 'border-ultrablue-600 bg-white text-ultrablue-600'
                                    : 'border-ink-700/20 bg-white text-ink-700/40'
                              }`}
                            >
                              {step.status === 'done' ? '✓' : step.step}
                            </span>
                            {index < result.progress.length - 1 && (
                              <span className="my-1 w-px flex-1 bg-ink-700/15" aria-hidden="true" />
                            )}
                          </div>
                          <div className="pb-6 pt-1.5">
                            <p
                              className={`text-sm font-semibold ${
                                step.status === 'upcoming' ? 'text-ink-700/45' : 'text-ink-950'
                              }`}
                            >
                              {step.label}
                            </p>
                            <p className="text-xs text-ink-700/55">
                              {step.status === 'done' && 'Completed'}
                              {step.status === 'current' && 'Currently in this stage'}
                              {step.status === 'upcoming' && 'Pending'}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="flex flex-col items-center gap-3 border-t border-ink-700/10 bg-sand-50 px-6 py-5 sm:flex-row sm:justify-between">
                    <p className="text-xs text-ink-700/55">Sample data — for demonstration only.</p>
                    <Link to="/contact" className="btn-outline py-2.5">
                      Need help with this shipment?
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state */}
          {!result && !loading && (
            <div className="mx-auto mt-10 max-w-md rounded-2xl border border-dashed border-ink-700/20 p-10 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sand-50 text-ink-700/40">
                <Search className="h-7 w-7" />
              </span>
              <h3 className="mt-4 font-archivo text-lg font-bold text-ink-950">
                Enter a tracking number to begin
              </h3>
              <p className="mt-2 text-sm text-ink-700/60">
                Try a sample number such as <span className="font-mono font-semibold">UF1001ABK</span>,{' '}
                <span className="font-mono font-semibold">UF1002ABK</span>, or{' '}
                <span className="font-mono font-semibold">UF1003ABK</span>.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function InfoTile({ icon: Icon, label, value, highlight }) {
  return (
    <div
      className={`rounded-xl p-4 ${
        highlight ? 'bg-ultrablue-50 ring-1 ring-ultrablue-600/15' : 'bg-sand-50'
      }`}
    >
      <div className="flex items-center gap-2 text-ink-700/55">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-1.5 font-semibold text-ink-950">{value}</p>
    </div>
  )
}
