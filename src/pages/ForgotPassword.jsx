import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, AlertCircle, CheckCircle2, Mail } from 'lucide-react'
import AuthLayout, { AuthLink } from '../components/common/AuthLayout.jsx'
import { FormField, TextInput } from '../components/forms/FormField.jsx'
import { requestPasswordReset } from '../services/authService.js'
import { isEmail, isEmpty } from '../utils/format.js'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    document.title = 'Forgot Password | Ultrafield Logistics Limited'
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    const emailError = isEmpty(email)
      ? 'Email is required.'
      : !isEmail(email)
        ? 'Please enter a valid email address.'
        : ''
    setError(emailError)
    if (emailError) return

    setSending(true)
    try {
      await requestPasswordReset(email)
      setSent(true)
    } catch {
      setError('The password reset request could not be processed. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <AuthLayout
      title="Forgot password"
      subtitle="Enter your account email and we will send password reset instructions."
      footer={
        <>
          Remembered it? <AuthLink to="/login">Back to sign in</AuthLink>
        </>
      }
    >
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-5"
          >
            <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-50 px-4 py-4 text-emerald-700">
              <CheckCircle2 className="h-6 w-6 shrink-0" />
              <div>
                <p className="text-sm font-bold">Reset instructions sent (demo)</p>
                <p className="text-xs">
                  If an account exists for <span className="font-mono">{email}</span>, instructions
                  would be sent. Demo mode does not send real emails.
                </p>
              </div>
            </div>
            <AuthLink to="/reset-password">Continue to reset password</AuthLink>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            className="space-y-5"
            aria-label="Forgot password form"
          >
            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                <AlertCircle className="h-5 w-5 shrink-0" />
                {error}
              </div>
            )}

            <FormField label="Email" name="email" required error={error}>
              {(id, describedBy, ref) => (
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink-700/40" />
                  <TextInput
                    id={id}
                    describedBy={describedBy}
                    error={error}
                    ref={ref}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError('')
                    }}
                    type="email"
                    placeholder="name@example.com"
                    autoComplete="email"
                    className="pl-11"
                  />
                </div>
              )}
            </FormField>

            <button type="submit" className="btn-primary w-full" disabled={sending}>
              {sending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                'Send reset instructions'
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </AuthLayout>
  )
}
