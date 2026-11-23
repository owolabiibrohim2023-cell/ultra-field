import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Clock,
  Receipt,
  ShieldCheck,
  Lock,
  Loader2,
} from 'lucide-react'
import PageHeader from '../components/common/PageHeader.jsx'
import StatusBadge from '../components/common/StatusBadge.jsx'
import { getPayment } from '../services/paymentService.js'
import { openPaystackCheckout, verifyPayment, isPaystackConfigured } from '../services/paystackService.js'
import { formatCurrency, formatDate } from '../utils/format.js'

export default function Payment() {
  const [searchParams] = useSearchParams()
  const [reference, setReference] = useState(searchParams.get('ref') || '')
  const [payment, setPayment] = useState(null)
  const [loading, setLoading] = useState(false)
  const [paying, setPaying] = useState(false)
  const [demoNotice, setDemoNotice] = useState('')
  const [error, setError] = useState('')
  const [paid, setPaid] = useState(false)

  useEffect(() => {
    document.title = 'Online Payment | Ultrafield Logistics Limited'
  }, [])

  useEffect(() => {
    const initial = searchParams.get('ref')
    if (initial) loadPayment(initial)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadPayment = async (ref) => {
    const trimmed = String(ref ?? reference).trim()
    if (!trimmed) {
      setError('Please enter an invoice or shipment reference.')
      setPayment(null)
      return
    }
    setLoading(true)
    setError('')
    try {
      const data = await getPayment(trimmed)
      setPayment(data)
    } catch {
      setError('We could not load a payment for that reference. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    loadPayment()
  }

  const onPay = async () => {
    setPaying(true)
    setDemoNotice('')
    setError('')
    try {
      const ref = payment?.reference || reference
      // Convert amount to the smallest currency unit (kobo) for Paystack.
      const amountKobo = Math.round((payment?.amount || 0) * 100)

      const checkout = await openPaystackCheckout({
        amount: amountKobo,
        currency: payment?.currency || 'NGN',
        email: payment?.customerEmail || 'customer@example.com',
        name: payment?.customerName || 'Customer',
        reference: ref,
        description: payment?.description || 'Payment for shipment',
      })

      if (checkout.demo) {
        // No public key configured — frontend-only demo interaction.
        setDemoNotice(
          'Demo mode: no Paystack public key is configured. No real charge was made. Add VITE_PAYSTACK_PUBLIC_KEY to enable live checkout.'
        )
        setPayment((prev) =>
          prev
            ? {
                ...prev,
                status: 'demo_pending',
                history: [
                  ...prev.history,
                  {
                    id: `p${prev.history.length + 1}`,
                    action: 'Pay Now pressed (demo)',
                    date: new Date().toISOString().slice(0, 10),
                    note: 'Frontend-only interaction — no real charge',
                  },
                ],
              }
            : prev
        )
        setPaying(false)
        return
      }

      // Real Paystack checkout opened.
      checkout.onSuccess = async (data) => {
        // IMPORTANT: onSuccess is NOT a trusted confirmation on its own.
        // Confirm the transaction on the backend (secret key lives server-side).
        setPaying(false)
        setDemoNotice('Payment authorised — verifying with the backend…')
        try {
          const verification = await verifyPayment(ref)
          if (verification.verified) {
            setPaid(true)
            setPayment((prev) =>
              prev
                ? {
                    ...prev,
                    status: 'paid',
                    history: [
                      ...prev.history,
                      {
                        id: `p${prev.history.length + 1}`,
                        action: 'Payment completed (Paystack)',
                        date: new Date().toISOString().slice(0, 10),
                        note: 'Verified via backend — see transaction reference',
                      },
                    ],
                  }
                : prev
            )
            setDemoNotice('Payment successful. The transaction was verified on the backend.')
          } else {
            setDemoNotice(
              'Payment authorised but backend verification is required to confirm this transaction.'
            )
          }
        } catch {
          setDemoNotice(
            'Payment authorised, but we could not verify it with the backend yet. Please contact support with your reference.'
          )
        }
      }
      checkout.onClose = () => {
        setPaying(false)
        setDemoNotice('The payment window was closed before completion. No charge confirmation was received.')
      }
      checkout.open()
    } catch (err) {
      setError(
        `The Paystack checkout could not be opened: ${err.message || 'please try again.'}`
      )
      setPaying(false)
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Online payment"
        title="Pay for your shipment"
        subtitle="Review the invoice details and complete payment securely with Paystack. When no public key is configured, the form runs in clearly-labelled demo mode."
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-uf">
          <form onSubmit={onSubmit} className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Invoice or shipment reference"
              aria-label="Invoice or shipment reference"
              className="field flex-1"
              autoComplete="off"
            />
            <button type="submit" className="btn-primary shrink-0" disabled={loading}>
              {loading ? 'Loading…' : 'Load Invoice'}
            </button>
          </form>

          {error && (
            <div className="mx-auto mt-4 flex max-w-2xl items-center gap-2 rounded-xl border border-red-500/20 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              <AlertCircle className="h-5 w-5 shrink-0" />
              {error}
            </div>
          )}

          {demoNotice && (
            <div className="mx-auto mt-4 flex max-w-2xl items-start gap-2 rounded-xl border border-ultrablue-200 bg-ultrablue-50 px-4 py-3 text-sm font-medium text-ultrablue-700">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
              {demoNotice}
            </div>
          )}

          {/* Paystack status banner */}
          <div className="mx-auto mt-4 flex max-w-2xl items-center gap-2 text-xs">
            <Lock className="h-4 w-4 text-emerald-600" />
            <span className="text-ink-700/70">
              {isPaystackConfigured()
                ? 'Paystack live checkout is enabled. Your card details are handled by Paystack — we never see them.'
                : 'Demo mode active. Set VITE_PAYSTACK_PUBLIC_KEY to enable live Paystack checkout.'}
            </span>
          </div>

          {!payment && !loading && (
            <div className="mx-auto mt-10 max-w-md rounded-2xl border border-dashed border-ink-700/20 p-10 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sand-50 text-ink-700/40">
                <Receipt className="h-7 w-7" />
              </span>
              <h3 className="mt-4 font-archivo text-lg font-bold text-ink-950">
                Enter a reference to view the invoice
              </h3>
              <p className="mt-2 text-sm text-ink-700/60">
                Demo reference: <span className="font-mono font-semibold">UF-INV-2026-0007</span>
              </p>
            </div>
          )}

          <AnimatePresence>
            {payment && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto mt-10 grid max-w-4xl gap-6 lg:grid-cols-[1.4fr_1fr]"
              >
                {/* Invoice card */}
                <div className="card overflow-hidden">
                  <div className="flex items-center justify-between border-b border-ink-700/10 px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-950 text-white">
                        <CreditCard className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-ink-700/55">
                          Invoice
                        </p>
                        <p className="font-archivo text-lg font-bold text-ink-950">
                          {payment.reference}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={paid ? 'paid' : payment.status} />
                  </div>

                  <dl className="grid grid-cols-2 gap-x-6 gap-y-4 p-6">
                    <Detail label="Customer" value={payment.customerName} />
                    <Detail label="Reference" value={payment.reference} mono />
                    <div className="col-span-2">
                      <Detail label="Payment description" value={payment.description} />
                    </div>
                    <Detail label="Amount due" value={formatCurrency(payment.amount, payment.currency)} highlight />
                    <Detail label="Currency" value={payment.currency} />
                  </dl>

                  <div className="flex flex-col items-stretch gap-3 border-t border-ink-700/10 bg-sand-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-ink-700/55">
                      {isPaystackConfigured()
                        ? 'Secured by Paystack — card details are processed by Paystack.'
                        : 'Demo invoice — no real charge is made without a Paystack public key.'}
                    </p>
                    <button
                      type="button"
                      onClick={onPay}
                      className="btn-primary"
                      disabled={paying || paid}
                    >
                      {paying ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processing…
                        </>
                      ) : paid ? (
                        'Payment complete'
                      ) : (
                        'Pay Now'
                      )}
                    </button>
                  </div>

                  {paid && (
                    <div className="flex items-center gap-2 border-t border-emerald-500/20 bg-emerald-50 px-6 py-4 text-sm font-medium text-emerald-700">
                      <CheckCircle2 className="h-5 w-5 shrink-0" />
                      Payment completed and verified. A receipt has been recorded for this reference.
                    </div>
                  )}
                </div>

                {/* Payment history */}
                <div className="card h-fit overflow-hidden">
                  <div className="border-b border-ink-700/10 px-6 py-5">
                    <h2 className="font-archivo text-lg font-bold text-ink-950">Payment history</h2>
                  </div>
                  <ul className="divide-y divide-ink-700/8">
                    {payment.history.map((entry) => (
                      <li key={entry.id} className="flex items-start gap-3 px-6 py-4">
                        <span
                          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                            entry.action.toLowerCase().includes('paid') ||
                            entry.action.toLowerCase().includes('completed')
                              ? 'bg-emerald-50 text-emerald-600'
                              : 'bg-amber-50 text-amber-600'
                          }`}
                        >
                          {entry.action.toLowerCase().includes('paid') ||
                          entry.action.toLowerCase().includes('completed') ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <Clock className="h-4 w-4" />
                          )}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-ink-950">{entry.action}</p>
                          <p className="text-xs text-ink-700/55">{entry.note}</p>
                        </div>
                        <span className="text-xs font-medium text-ink-700/55">{formatDate(entry.date)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}

function Detail({ label, value, mono, highlight }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-ink-700/55">{label}</dt>
      <dd
        className={`mt-1 text-sm font-semibold ${
          highlight ? 'text-ultrablue-700' : 'text-ink-950'
        } ${mono ? 'font-mono' : ''}`}
      >
        {value}
      </dd>
    </div>
  )
}
