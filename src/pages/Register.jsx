import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Loader2, AlertCircle, Check } from 'lucide-react'
import AuthLayout, { AuthLink } from '../components/common/AuthLayout.jsx'
import { FormField, TextInput } from '../components/forms/FormField.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { isEmail, isPhone, isEmpty } from '../utils/format.js'

export default function Register() {
  const { register, loading } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreed: false,
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    document.title = 'Create Account | Ultrafield Logistics Limited'
  }, [])

  const setField = (name) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
    setFormError('')
  }

  const validate = () => {
    const next = {
      name: isEmpty(form.name) ? 'Full name is required.' : form.name.trim().length < 2 ? 'Please enter a valid full name.' : '',
      email: isEmpty(form.email) ? 'Email is required.' : !isEmail(form.email) ? 'Please enter a valid email address.' : '',
      phone: isEmpty(form.phone) ? 'Phone number is required.' : !isPhone(form.phone) ? 'Please enter a valid phone number.' : '',
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
      agreed: form.agreed ? '' : 'Please accept the terms to continue.',
    }
    return next
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return

    setFormError('')
    try {
      await register(form)
      navigate('/dashboard', { replace: true })
    } catch {
      setFormError('Registration failed. Please try again.')
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join Ultrafield Logistics to track shipments and book services from one dashboard."
      footer={
        <>
          Already have an account? <AuthLink to="/login">Sign in</AuthLink>
        </>
      }
    >
      <motion.form onSubmit={onSubmit} noValidate className="space-y-5" aria-label="Registration form">
        {formError && (
          <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            <AlertCircle className="h-5 w-5 shrink-0" />
            {formError}
          </div>
        )}

        <FormField label="Full name" name="name" required error={errors.name}>
          {(id, describedBy, ref) => (
            <TextInput id={id} describedBy={describedBy} error={errors.name} ref={ref} value={form.name} onChange={setField('name')} placeholder="e.g. Adebayo Adeyemi" autoComplete="name" />
          )}
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Email" name="email" required error={errors.email}>
            {(id, describedBy, ref) => (
              <TextInput id={id} describedBy={describedBy} error={errors.email} ref={ref} value={form.email} onChange={setField('email')} type="email" placeholder="name@example.com" autoComplete="email" />
            )}
          </FormField>
          <FormField label="Phone" name="phone" required error={errors.phone}>
            {(id, describedBy, ref) => (
              <TextInput id={id} describedBy={describedBy} error={errors.phone} ref={ref} value={form.phone} onChange={setField('phone')} type="tel" placeholder="e.g. 0803 331 3686" autoComplete="tel" />
            )}
          </FormField>
        </div>

        <FormField label="Password" name="password" required error={errors.password} hint="At least 6 characters.">
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

        <FormField label="Confirm password" name="confirmPassword" required error={errors.confirmPassword}>
          {(id, describedBy, ref) => (
            <TextInput id={id} describedBy={describedBy} error={errors.confirmPassword} ref={ref} value={form.confirmPassword} onChange={setField('confirmPassword')} type={showPassword ? 'text' : 'password'} placeholder="••••••••" autoComplete="new-password" />
          )}
        </FormField>

        <label className="flex items-start gap-3 text-sm text-ink-700/70">
          <input
            type="checkbox"
            checked={form.agreed}
            onChange={setField('agreed')}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-700/30 text-ultrablue-600 focus:ring-ultrablue-500"
          />
          <span>
            I agree to the terms of use and privacy policy. <span className="text-ink-700/45">(Demo: no real agreement is recorded.)</span>
          </span>
        </label>
        {errors.agreed && <p role="alert" className="-mt-2 text-xs font-medium text-red-600">{errors.agreed}</p>}

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating account…
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              Create account
            </>
          )}
        </button>
      </motion.form>
    </AuthLayout>
  )
}
