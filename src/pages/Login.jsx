import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react'
import AuthLayout, { AuthLink } from '../components/common/AuthLayout.jsx'
import { FormField, TextInput } from '../components/forms/FormField.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { isEmail, isEmpty } from '../utils/format.js'

export default function Login() {
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = new URLSearchParams(location.search).get('redirect') || '/dashboard'

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    document.title = 'Sign In | Ultrafield Logistics Limited'
  }, [])

  const setField = (name) => (e) => {
    setForm((prev) => ({ ...prev, [name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
    setFormError('')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = {
      email: isEmpty(form.email)
        ? 'Email is required.'
        : !isEmail(form.email)
          ? 'Please enter a valid email address.'
          : '',
      password: isEmpty(form.password) ? 'Password is required.' : '',
    }
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return

    setFormError('')
    try {
      await login(form)
      navigate(redirectTo, { replace: true })
    } catch {
      setFormError('Sign in failed. Please check your details and try again.')
    }
  }

  return (
    <AuthLayout
      title="Sign in"
      subtitle="Access your Ultrafield customer dashboard to track shipments and manage bookings."
      footer={
        <>
          New to Ultrafield? <AuthLink to="/register">Create an account</AuthLink>
        </>
      }
    >
      <motion.form onSubmit={onSubmit} noValidate className="space-y-5" aria-label="Sign in form">
        {formError && (
          <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            <AlertCircle className="h-5 w-5 shrink-0" />
            {formError}
          </div>
        )}

        <FormField label="Email" name="email" required error={errors.email}>
          {(id, describedBy, ref) => (
            <TextInput
              id={id}
              describedBy={describedBy}
              error={errors.email}
              ref={ref}
              value={form.email}
              onChange={setField('email')}
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
            />
          )}
        </FormField>

        <FormField label="Password" name="password" required error={errors.password}>
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
                autoComplete="current-password"
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

        <div className="flex justify-end">
          <AuthLink to="/forgot-password">Forgot password?</AuthLink>
        </div>

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in…
            </>
          ) : (
            'Sign in'
          )}
        </button>
      </motion.form>
    </AuthLayout>
  )
}
