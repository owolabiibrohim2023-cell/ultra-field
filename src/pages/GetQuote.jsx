import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, Loader2, FileText, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader.jsx'
import { FormField, TextInput, TextArea, Select } from '../components/forms/FormField.jsx'
import { createQuoteRequest } from '../services/quoteService.js'
import { validateFields, isEmail, isPhone, isEmpty, formatDate } from '../utils/format.js'

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  pickupLocation: '',
  destination: '',
  shipmentCategory: '',
  sizeWeight: '',
  additionalInfo: '',
}

const CATEGORIES = [
  'Parcel Delivery',
  'Logistics Services',
  'Shipment Handling',
  'Delivery Coordination',
  'Business Logistics',
]

export default function GetQuote() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [confirmation, setConfirmation] = useState(null)

  useEffect(() => {
    document.title = 'Get a Quote | Ultrafield Logistics Limited'
  }, [])

  const setField = (name) => (e) => {
    setForm((prev) => ({ ...prev, [name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const validate = () =>
    validateFields(form, {
      name: (v) => (isEmpty(v) ? 'Name is required.' : v.trim().length < 2 ? 'Please enter a valid name.' : ''),
      email: (v) => (isEmpty(v) ? 'Email is required.' : !isEmail(v) ? 'Please enter a valid email address.' : ''),
      phone: (v) => (isEmpty(v) ? 'Phone number is required.' : !isPhone(v) ? 'Please enter a valid phone number.' : ''),
      pickupLocation: (v) => (isEmpty(v) ? 'Pickup location is required.' : ''),
      destination: (v) => (isEmpty(v) ? 'Destination is required.' : ''),
      shipmentCategory: (v) => (isEmpty(v) ? 'Please select a shipment category.' : ''),
      sizeWeight: (v) =>
        isEmpty(v)
          ? 'Package size or weight is required.'
          : v.trim().length > 80
            ? 'Please keep this field shorter.'
            : '',
    })

  const onSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    try {
      const result = await createQuoteRequest(form)
      setConfirmation(result)
    } catch {
      setErrors({ form: 'The quotation request could not be submitted. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setForm(EMPTY_FORM)
    setErrors({})
    setConfirmation(null)
  }

  return (
    <>
      <PageHeader
        eyebrow="Quotation"
        title="Get a quote"
        subtitle="Share your shipment details and request a quotation. Quotations are confirmed by Ultrafield Logistics — no prices are calculated automatically."
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-uf">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.5fr_1fr]">
            <AnimatePresence mode="wait">
              {confirmation ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="card p-8 sm:p-10"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </span>
                  <h2 className="mt-5 font-archivo text-2xl font-bold text-ink-950">
                    Quote request received (demo)
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-700/70">
                    {confirmation.message}
                  </p>
                  <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                    <ConfirmationRow label="Quote reference" value={confirmation.quoteReference} mono />
                    <ConfirmationRow label="Submitted" value={formatDate(confirmation.submittedAt.slice(0, 10))} />
                    <ConfirmationRow label="From" value={form.pickupLocation} />
                    <ConfirmationRow label="To" value={form.destination} />
                    <ConfirmationRow label="Category" value={form.shipmentCategory} />
                    <ConfirmationRow label="Contact" value={`${form.name} · ${form.phone}`} />
                  </dl>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <button type="button" onClick={resetForm} className="btn-primary">
                      Request another quote
                    </button>
                    <Link to="/contact" className="btn-outline">
                      Contact us
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  noValidate
                  className="card space-y-6 p-6 sm:p-8"
                  aria-label="Quotation request form"
                >
                  {errors.form && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      {errors.form}
                    </div>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField label="Customer name" name="name" required error={errors.name}>
                      {(id, describedBy, ref) => (
                        <TextInput id={id} describedBy={describedBy} error={errors.name} ref={ref} value={form.name} onChange={setField('name')} placeholder="e.g. Adebayo Adeyemi" autoComplete="name" />
                      )}
                    </FormField>
                    <FormField label="Email" name="email" required error={errors.email}>
                      {(id, describedBy, ref) => (
                        <TextInput id={id} describedBy={describedBy} error={errors.email} ref={ref} value={form.email} onChange={setField('email')} type="email" placeholder="name@example.com" autoComplete="email" />
                      )}
                    </FormField>
                    <FormField label="Phone number" name="phone" required error={errors.phone}>
                      {(id, describedBy, ref) => (
                        <TextInput id={id} describedBy={describedBy} error={errors.phone} ref={ref} value={form.phone} onChange={setField('phone')} type="tel" placeholder="e.g. 0803 331 3686" autoComplete="tel" />
                      )}
                    </FormField>
                    <FormField label="Shipment category" name="shipmentCategory" required error={errors.shipmentCategory}>
                      {(id, describedBy, ref) => (
                        <Select id={id} describedBy={describedBy} error={errors.shipmentCategory} ref={ref} value={form.shipmentCategory} onChange={setField('shipmentCategory')}>
                          <option value="" disabled>
                            Select a category
                          </option>
                          {CATEGORIES.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </Select>
                      )}
                    </FormField>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField label="Pickup location" name="pickupLocation" required error={errors.pickupLocation}>
                      {(id, describedBy, ref) => (
                        <TextInput id={id} describedBy={describedBy} error={errors.pickupLocation} ref={ref} value={form.pickupLocation} onChange={setField('pickupLocation')} placeholder="e.g. Lafenwa, Abeokuta, Ogun State" />
                      )}
                    </FormField>
                    <FormField label="Destination" name="destination" required error={errors.destination}>
                      {(id, describedBy, ref) => (
                        <TextInput id={id} describedBy={describedBy} error={errors.destination} ref={ref} value={form.destination} onChange={setField('destination')} placeholder="e.g. Yaba, Lagos State" />
                      )}
                    </FormField>
                  </div>

                  <FormField
                    label="Package size or weight"
                    name="sizeWeight"
                    required
                    error={errors.sizeWeight}
                    hint="e.g. Medium parcel, approximately 8 kg."
                  >
                    {(id, describedBy, ref) => (
                      <TextInput id={id} describedBy={describedBy} error={errors.sizeWeight} ref={ref} value={form.sizeWeight} onChange={setField('sizeWeight')} placeholder="Size or weight details" />
                    )}
                  </FormField>

                  <FormField label="Additional information" name="additionalInfo" hint="Optional — timing preferences or special requirements.">
                    {(id, describedBy, ref) => (
                      <TextArea id={id} describedBy={describedBy} ref={ref} value={form.additionalInfo} onChange={setField('additionalInfo')} placeholder="Optional information" rows={4} />
                    )}
                  </FormField>

                  <div className="flex flex-col gap-4 border-t border-ink-700/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="flex items-start gap-2 text-xs text-ink-700/55">
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-ultrablue-600" />
                      No pricing is calculated here — our team returns a quotation directly.
                    </p>
                    <button type="submit" className="btn-primary" disabled={submitting}>
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        'Request quote'
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Side panel */}
            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <div className="card p-6">
                <h2 className="font-archivo text-lg font-bold text-ink-950">What happens next</h2>
                <ol className="mt-4 space-y-3 text-sm text-ink-700/70">
                  {[
                    'We review the shipment details you provide.',
                    'Ultrafield Logistics prepares a quotation based on your requirements.',
                    'We follow up by phone or email with the quotation.',
                    'Once confirmed, the shipment can be booked.',
                  ].map((step, index) => (
                    <li key={step} className="flex gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ultrablue-50 text-xs font-bold text-ultrablue-700">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-2xl bg-ink-950 p-6 text-sand-100">
                <p className="text-sm font-semibold text-white">Shipment details</p>
                <p className="mt-2 text-xs leading-relaxed text-sand-100/65">
                  Quotes are prepared by our team — delivery prices, timelines, and coverage are
                  confirmed per quotation, not pre-calculated on this page.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

function ConfirmationRow({ label, value, mono }) {
  return (
    <div className="rounded-xl bg-sand-50 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-700/55">{label}</p>
      <p className={`mt-1 text-sm font-semibold text-ink-950 ${mono ? 'font-mono' : ''}`}>{value}</p>
    </div>
  )
}
