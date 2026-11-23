import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Phone,
  Send,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Clock,
  MessageSquare,
} from 'lucide-react'
import PageHeader from '../components/common/PageHeader.jsx'
import { FormField, TextInput, TextArea } from '../components/forms/FormField.jsx'
import { validateFields, isEmail, isPhone, isEmpty } from '../utils/format.js'
import contactPhoto from '../assets/photos/contact-photo.jpg'

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: 'Address',
    value: '26 Ita Iyalode Road, Lafenwa, Abeokuta 110252, Ogun State, Nigeria',
    hint: 'Google Maps location: 48VG+R5 Abeokuta',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '0803 331 3686',
    hint: 'Call us for shipments, quotes, and bookings',
    href: 'tel:08033313686',
  },
]

const EMPTY_FORM = { name: '', email: '', phone: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    document.title = 'Contact | Ultrafield Logistics Limited'
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
      subject: (v) => (isEmpty(v) ? 'Subject is required.' : ''),
      message: (v) => (isEmpty(v) ? 'Message is required.' : v.trim().length < 10 ? 'Please enter a more detailed message.' : ''),
    })

  const onSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSending(true)
    // Frontend demonstration: messages are not persisted until the backend is live.
    await new Promise((resolve) => setTimeout(resolve, 800))
    setSending(false)
    setSent(true)
  }

  const resetForm = () => {
    setForm(EMPTY_FORM)
    setErrors({})
    setSent(false)
  }

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Contact & location"
        subtitle="Reach Ultrafield Logistics Limited for shipment questions, quotations, and bookings. Visit our location in Lafenwa, Abeokuta, or call us directly."
      />

      {/* Subtle logistics photo band */}
      <div className="container-uf">
        <div className="relative mt-8 overflow-hidden rounded-2xl shadow-cardLg">
          <img
            src={contactPhoto}
            alt="Logistics and delivery vans coordinated at a logistics depot"
            loading="lazy"
            decoding="async"
            width={1600}
            height={420}
            className="aspect-[16/5] w-full object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink-950/45 via-ink-950/15 to-transparent" />
          <div className="absolute inset-0 flex items-center p-8 sm:p-10">
            <div className="max-w-xl">
              <span className="eyebrow !text-ultrablue-300">
                <span className="h-px w-6 bg-current opacity-60" />
                Get in touch
              </span>
              <h2 className="mt-3 font-archivo text-2xl font-bold text-white sm:text-3xl">
                Talk to the Ultrafield logistics team
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-sand-100/80">
                Shipment questions, quotations, and bookings — call us or send a message and we will
                respond as soon as we can.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-uf grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          {/* Contact form */}
          <div>
            <AnimatePresence mode="wait">
              {sent ? (
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
                    Message sent (demo)
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-700/70">
                    Thank you, {form.name.split(' ')[0]}. Your message has been captured as a
                    frontend demonstration — it has not been sent or stored. Our team will be in
                    touch once the backend is connected.
                  </p>
                  <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <button type="button" onClick={resetForm} className="btn-primary">
                      Send another message
                    </button>
                    <a href="tel:08033313686" className="btn-outline">
                      Call instead
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  noValidate
                  className="card space-y-6 p-6 sm:p-8"
                  aria-label="Contact form"
                >
                  <div>
                    <h2 className="font-archivo text-xl font-bold text-ink-950">Send us a message</h2>
                    <p className="mt-1 text-sm text-ink-700/60">
                      We respond to shipment inquiries, quotation requests, and booking questions.
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField label="Name" name="name" required error={errors.name}>
                      {(id, describedBy, ref) => (
                        <TextInput id={id} describedBy={describedBy} error={errors.name} ref={ref} value={form.name} onChange={setField('name')} placeholder="Your full name" autoComplete="name" />
                      )}
                    </FormField>
                    <FormField label="Phone" name="phone" required error={errors.phone}>
                      {(id, describedBy, ref) => (
                        <TextInput id={id} describedBy={describedBy} error={errors.phone} ref={ref} value={form.phone} onChange={setField('phone')} type="tel" placeholder="e.g. 0803 331 3686" autoComplete="tel" />
                      )}
                    </FormField>
                  </div>

                  <FormField
                    label="Email"
                    name="email"
                    required
                    error={errors.email}
                    hint="Contact email configuration will be confirmed by the business. Your address here is used to reply."
                  >
                    {(id, describedBy, ref) => (
                      <TextInput id={id} describedBy={describedBy} error={errors.email} ref={ref} value={form.email} onChange={setField('email')} type="email" placeholder="name@example.com" autoComplete="email" />
                    )}
                  </FormField>

                  <FormField label="Subject" name="subject" required error={errors.subject}>
                    {(id, describedBy, ref) => (
                      <TextInput id={id} describedBy={describedBy} error={errors.subject} ref={ref} value={form.subject} onChange={setField('subject')} placeholder="e.g. Quotation for parcel delivery" />
                    )}
                  </FormField>

                  <FormField label="Message" name="message" required error={errors.message}>
                    {(id, describedBy, ref) => (
                      <TextArea id={id} describedBy={describedBy} error={errors.message} ref={ref} value={form.message} onChange={setField('message')} placeholder="Describe your shipment, request, or question." rows={5} />
                    )}
                  </FormField>

                  <button type="submit" className="btn-primary w-full" disabled={sending}>
                    {sending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send message
                      </>
                    )}
                  </button>
                  <p className="flex items-start gap-2 text-xs text-ink-700/55">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-ultrablue-600" />
                    Demo form: messages are not transmitted until the backend is connected.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Contact cards + map */}
          <div className="space-y-5">
            <div className="grid gap-5">
              {CONTACT_INFO.map((info) => {
                const Icon = info.icon
                const content = (
                  <div className="card flex items-start gap-5 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-cardLg">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ultrablue-50 text-ultrablue-600">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-ink-700/55">
                        {info.label}
                      </p>
                      <p className="mt-1 font-archivo font-bold text-ink-950">{info.value}</p>
                      <p className="mt-1 text-xs text-ink-700/55">{info.hint}</p>
                    </div>
                  </div>
                )
                return info.href ? (
                  <a
                    key={info.label}
                    href={info.href}
                    className="block"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={info.label}>{content}</div>
                )
              })}
            </div>

            {/* Map section */}
            <div className="card overflow-hidden">
              <div className="relative aspect-[4/3] bg-ink-950">
                <svg viewBox="0 0 800 600" className="h-full w-full" role="img" aria-label="Map showing Ultrafield Logistics location in Abeokuta">
                  <rect width="800" height="600" fill="#0b1220" />
                  <g stroke="#1c2739" strokeWidth="10" fill="none" opacity="0.9">
                    <path d="M-20 160 L820 210" />
                    <path d="M180 -20 L260 620" />
                    <path d="M-20 380 L820 430" />
                    <path d="M480 -20 L560 620" />
                    <path d="M-20 520 L820 560" />
                  </g>
                  <g stroke="#2a3648" strokeWidth="4" fill="none" opacity="0.8">
                    <path d="M-20 260 L820 290" />
                    <path d="M340 -20 L390 620" />
                  </g>
                  <path d="M120 480 C 320 380, 520 440, 700 330" stroke="#3563f9" strokeWidth="5" fill="none" strokeDasharray="14 12" opacity="0.9" />
                  <g transform="translate(400 300)">
                    <circle cx="0" cy="0" r="34" fill="#3563f9" opacity="0.25" />
                    <path d="M0 18 C -18 0, -18 -22, 0 -22 C 18 -22, 18 0, 0 18 Z" fill="#3563f9" />
                    <circle cx="0" cy="-12" r="6.5" fill="#ffffff" />
                  </g>
                </svg>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/10 bg-ink-950/85 px-4 py-3 backdrop-blur">
                  <div>
                    <p className="text-sm font-bold text-white">Ultrafield Logistics Limited</p>
                    <p className="text-xs text-sand-100/65">26 Ita Iyalode Road, Lafenwa, Abeokuta</p>
                  </div>
                  <span className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
                    48VG+R5 Abeokuta
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3 border-t border-ink-700/10 p-5 sm:flex-row">
                <a
                  href="https://www.google.com/maps/place/48VG+R5+Abeokuta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1 py-2.5"
                >
                  <MapPin className="h-4 w-4" />
                  Open in Google Maps
                </a>
                <a href="tel:08033313686" className="btn-outline flex-1 py-2.5">
                  <Phone className="h-4 w-4" />
                  Call 0803 331 3686
                </a>
              </div>
            </div>

            {/* Hours / support card */}
            <div className="card flex items-start gap-4 p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-950 text-white">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <p className="font-archivo font-bold text-ink-950">Response times</p>
                <p className="mt-1 text-sm text-ink-700/65">
                  For the fastest response, call us directly. Messages received through this form
                  are handled as demonstrations until the backend is connected.
                </p>
              </div>
            </div>

            <div className="card flex items-start gap-4 p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ultrablue-50 text-ultrablue-600">
                <MessageSquare className="h-5 w-5" />
              </span>
              <div>
                <p className="font-archivo font-bold text-ink-950">Email contact</p>
                <p className="mt-1 text-sm text-ink-700/65">
                  Our contact email is being configured and will be confirmed by the business.
                  Please use the phone or the form above for now.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
