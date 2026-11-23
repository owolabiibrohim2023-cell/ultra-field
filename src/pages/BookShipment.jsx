import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, Loader2, Truck, Package } from 'lucide-react'
import PageHeader from '../components/common/PageHeader.jsx'
import { FormField, TextInput, TextArea, Select } from '../components/forms/FormField.jsx'
import { createBooking } from '../services/bookingService.js'
import { validateFields, isEmail, isPhone, isEmpty, formatDate } from '../utils/format.js'
import bookingPhoto from '../assets/photos/booking-photo.jpg'

const EMPTY_FORM = {
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
}

const SHIPMENT_TYPES = [
  'Parcel Delivery',
  'Logistics Services',
  'Shipment Handling',
  'Delivery Coordination',
  'Business Logistics',
]

export default function BookShipment() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [confirmation, setConfirmation] = useState(null)

  useEffect(() => {
    document.title = 'Book a Shipment | Ultrafield Logistics Limited'
  }, [])

  const setField = (name) => (e) => {
    setForm((prev) => ({ ...prev, [name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const validate = () =>
    validateFields(form, {
      fullName: (v) => (isEmpty(v) ? 'Full name is required.' : v.trim().length < 2 ? 'Please enter a valid full name.' : ''),
      email: (v) => (isEmpty(v) ? 'Email is required.' : !isEmail(v) ? 'Please enter a valid email address.' : ''),
      phone: (v) => (isEmpty(v) ? 'Phone number is required.' : !isPhone(v) ? 'Please enter a valid phone number.' : ''),
      pickupAddress: (v) => (isEmpty(v) ? 'Pickup address is required.' : ''),
      deliveryAddress: (v) => (isEmpty(v) ? 'Delivery address is required.' : ''),
      shipmentType: (v) => (isEmpty(v) ? 'Please select a shipment type.' : ''),
      packageDescription: (v) => (isEmpty(v) ? 'Please describe the package.' : ''),
      packageWeight: (v) =>
        isEmpty(v)
          ? 'Package weight is required.'
          : isNaN(Number(v)) || Number(v) <= 0
            ? 'Enter a positive weight value.'
            : '',
      pickupDate: (v) => {
        if (isEmpty(v)) return 'Preferred pickup date is required.'
        const chosen = new Date(`${v}T00:00:00`)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return chosen <= today ? 'Pickup date must be today or later.' : ''
      },
    })

  const onSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    try {
      const result = await createBooking(form)
      setConfirmation(result)
    } catch {
      setErrors({ form: 'The booking could not be submitted. Please try again.' })
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
        eyebrow="Booking"
        title="Book a shipment"
        subtitle="Share your shipment details and our team will coordinate pickup and delivery. The booking form is currently a frontend demonstration — no real shipment is created."
      />

      {/* Intro photo banner */}
      <div className="container-uf">
        <div className="relative mt-8 overflow-hidden rounded-2xl shadow-cardLg">
          <img
            src={bookingPhoto}
            alt="Parcels and shipment packages prepared for booking and dispatch"
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
                Book a shipment
              </span>
              <h2 className="mt-3 font-archivo text-2xl font-bold text-white sm:text-3xl">
                Share your shipment details in a few steps
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-sand-100/80">
                Provide pickup and delivery details, describe your package, and choose a pickup date
                — our team coordinates the rest.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-uf">
          <div className="mx-auto max-w-3xl">
            <AnimatePresence mode="wait">
              {confirmation ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="card p-10 text-center"
                >
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </span>
                  <h2 className="mt-5 font-archivo text-2xl font-bold text-ink-950">
                    Booking request received (demo)
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-700/70">
                    This is a frontend demonstration — no real shipment has been booked. Your
                    reference for this demo is{' '}
                    <span className="font-mono font-bold text-ink-950">
                      {confirmation.bookingReference}
                    </span>
                    .
                  </p>
                  <dl className="mx-auto mt-6 grid max-w-md gap-3 text-left sm:grid-cols-2">
                    <ConfirmationRow label="Shipment type" value={form.shipmentType} />
                    <ConfirmationRow label="Pickup date" value={formatDate(form.pickupDate)} />
                    <ConfirmationRow label="Contact" value={`${form.fullName} · ${form.phone}`} />
                    <ConfirmationRow label="Email" value={form.email} />
                  </dl>
                  <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <button type="button" onClick={resetForm} className="btn-primary">
                      Book another shipment
                    </button>
                    <a href="/" className="btn-outline">
                      Back to home
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  noValidate
                  className="card space-y-6 p-6 sm:p-8"
                  aria-label="Book a shipment form"
                >
                  {errors.form && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      {errors.form}
                    </div>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField label="Full name" name="fullName" required error={errors.fullName}>
                      {(id, describedBy, ref) => (
                        <TextInput id={id} describedBy={describedBy} error={errors.fullName} ref={ref} value={form.fullName} onChange={setField('fullName')} placeholder="e.g. Adebayo Adeyemi" autoComplete="name" />
                      )}
                    </FormField>
                    <FormField label="Email" name="email" required error={errors.email}>
                      {(id, describedBy, ref) => (
                        <TextInput id={id} describedBy={describedBy} error={errors.email} ref={ref} value={form.email} onChange={setField('email')} placeholder="name@example.com" autoComplete="email" type="email" />
                      )}
                    </FormField>
                    <FormField label="Phone number" name="phone" required error={errors.phone}>
                      {(id, describedBy, ref) => (
                        <TextInput id={id} describedBy={describedBy} error={errors.phone} ref={ref} value={form.phone} onChange={setField('phone')} placeholder="e.g. 0803 331 3686" autoComplete="tel" type="tel" />
                      )}
                    </FormField>
                    <FormField label="Preferred pickup date" name="pickupDate" required error={errors.pickupDate}>
                      {(id, describedBy, ref) => (
                        <TextInput id={id} describedBy={describedBy} error={errors.pickupDate} ref={ref} value={form.pickupDate} onChange={setField('pickupDate')} type="date" />
                      )}
                    </FormField>
                  </div>

                  <FormField label="Pickup address" name="pickupAddress" required error={errors.pickupAddress}>
                    {(id, describedBy, ref) => (
                      <TextInput id={id} describedBy={describedBy} error={errors.pickupAddress} ref={ref} value={form.pickupAddress} onChange={setField('pickupAddress')} placeholder="Street, area, city, state" />
                    )}
                  </FormField>

                  <FormField label="Delivery address" name="deliveryAddress" required error={errors.deliveryAddress}>
                    {(id, describedBy, ref) => (
                      <TextInput id={id} describedBy={describedBy} error={errors.deliveryAddress} ref={ref} value={form.deliveryAddress} onChange={setField('deliveryAddress')} placeholder="Street, area, city, state" />
                    )}
                  </FormField>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField label="Shipment type" name="shipmentType" required error={errors.shipmentType}>
                      {(id, describedBy, ref) => (
                        <Select id={id} describedBy={describedBy} error={errors.shipmentType} ref={ref} value={form.shipmentType} onChange={setField('shipmentType')}>
                          <option value="" disabled>
                            Select a shipment type
                          </option>
                          {SHIPMENT_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </Select>
                      )}
                    </FormField>
                    <FormField label="Package weight (kg)" name="packageWeight" required error={errors.packageWeight}>
                      {(id, describedBy, ref) => (
                        <TextInput id={id} describedBy={describedBy} error={errors.packageWeight} ref={ref} value={form.packageWeight} onChange={setField('packageWeight')} placeholder="e.g. 5.5" inputMode="decimal" />
                      )}
                    </FormField>
                  </div>

                  <FormField label="Package description" name="packageDescription" required error={errors.packageDescription}>
                    {(id, describedBy, ref) => (
                      <TextArea id={id} describedBy={describedBy} error={errors.packageDescription} ref={ref} value={form.packageDescription} onChange={setField('packageDescription')} placeholder="Describe the package contents, dimensions, and any handling notes." />
                    )}
                  </FormField>

                  <FormField
                    label="Additional instructions"
                    name="additionalInstructions"
                    hint="Optional — delivery timing preferences, access notes, or any special requirements."
                  >
                    {(id, describedBy, ref) => (
                      <TextArea id={id} describedBy={describedBy} ref={ref} value={form.additionalInstructions} onChange={setField('additionalInstructions')} placeholder="Optional instructions" rows={3} />
                    )}
                  </FormField>

                  <div className="flex flex-col gap-4 border-t border-ink-700/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="flex items-start gap-2 text-xs text-ink-700/55">
                      <Package className="mt-0.5 h-4 w-4 shrink-0 text-ultrablue-600" />
                      Frontend demonstration: submitting the form does not create a real shipment.
                    </p>
                    <button type="submit" className="btn-primary" disabled={submitting}>
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          <Truck className="h-4 w-4" />
                          Submit booking request
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  )
}

function ConfirmationRow({ label, value }) {
  return (
    <div className="rounded-xl bg-sand-50 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-700/55">{label}</p>
      <p className="mt-1 text-sm font-semibold text-ink-950">{value}</p>
    </div>
  )
}
