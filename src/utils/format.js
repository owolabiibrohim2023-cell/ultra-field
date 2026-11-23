// Formatting + validation helpers shared across the app.

export function formatCurrency(amount, currency = 'NGN') {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(iso) {
  if (!iso) return '—'
  const date = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export const isEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim())

export const isPhone = (value) => {
  const digits = String(value || '').replace(/[^\d+]/g, '')
  return digits.length >= 7 && digits.length <= 15
}

export const isEmpty = (value) =>
  value === undefined || value === null || String(value).trim() === ''

/** Minimal field validator that returns an errors object keyed by field name. */
export function validateFields(values, rules) {
  const errors = {}
  for (const [field, rule] of Object.entries(rules)) {
    const message = rule(values[field], values)
    if (message) errors[field] = message
  }
  return errors
}
