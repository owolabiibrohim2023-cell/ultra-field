import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, Check } from 'lucide-react'
import AuthLayout, { AuthLink } from '../components/common/AuthLayout.jsx'
import { FormField, TextInput } from '../components/forms/FormField.jsx'
import { resetPassword } from '../services/authService.js'
import { isEmpty } from '../utils/format.js'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    document.title = 'Reset Password | Ultrafield Logistics Limited'
  }, [])

  const setField = (name) => (e) => {
    setForm((prev) => ({ ...prev, [name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
    setFormError('')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const next = {
      password:
        isEmpty(form.password)
          ? 'Password is required.'
          : form.password.length < 6
            ? 'Password must be at least 6 characters.'
            : '',
      confirmPassword:
        isEmpty(form.confirmPassword)
          ? 'Please confirm your password.'
          : form.confirmPassword !== form.password
            ? 'Passwords do not match.'
            : '',
    }
    setErrors(next)
    if (Object.values(next).some(Boolean)) return

    setSending(true)
    setFormError('')
    try {
      // Demo: no real token validation or backend call exists yet.
      await resetPassword({ token: 'demo-token', password: form.password })
      setDone(true)
    } catch {
      setFormError('The password could not be reset. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <AuthLayout
      title="Reset password"
      subtitle="Choose a new password for your Ultrafield account."
      footer={
        <>
          <AuthLink to="/login">Back to sign in</AuthLink>
        </>
      }
    >
      <AnimatePresence mode="wait">
        {done ? (
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
                <p className="text-sm font-bold">Password reset complete (demo)</p>
                <p className="text-xs">This is a frontend demonstration — no real password was changed.</p>
              </div>
            </div>
            <button type="button" onClick={() => navigate('/login')} className="btn-primary w-full">
              Continue to sign in
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            className="space-y-5"
            aria-label="Reset password form"
          >
            {formError && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                <AlertCircle className="h-5 w-5 shrink-0" />
                {formError}
              </div>
            )}

            <FormField label="New password" name="password" required error={errors.password} hint="At least 6 characters.">
              {(id, describedBy, ref) => (
                <div className="relative">
                  <TextInput
                    id={id}
                    describedBy={describedBy}
                    error={errors.password}
                    ref={ref}
                    value={form.password}
                    onChange={setField('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((show) => !show)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2.5 py-2 text-ink-700/45 transition-colors hover:text-ink-950"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              )}
            </FormField>

            <FormField label="Confirm new password" name="confirmPassword" required error={errors.confirmPassword}>
              {(id, describedBy, ref) => (
                <TextInput id={id} describedBy={describedBy} error={errors.confirmPassword} ref={ref} value={form.confirmPassword} onChange={setField('confirmPassword')} type={showPassword ? 'text' : 'password'} placeholder="••••••••" autoComplete="new-password" />
              )}
            </FormField>

            <button type="submit" className="btn-primary w-full" disabled={sending}>
              {sending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Resetting…
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Reset password
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </AuthLayout>
  )
}
