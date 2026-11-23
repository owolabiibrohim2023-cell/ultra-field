import { apiRequest, USE_MOCK_DATA, delay } from './api.js'

/**
 * Paystack frontend integration.
 *
 * SECURITY: Only the PUBLISHABLE (public) key is ever used in the frontend.
 * The SECRET key must NEVER be placed in frontend code or frontend env vars —
 * it belongs on the backend only, where it is used to verify transactions
 * (verify endpoint / webhook) and to sign requests.
 *
 * The public key is read from VITE_PAYSTACK_PUBLIC_KEY (frontend-safe). When it
 * is not configured the checkout falls back to a clearly-labelled demo mode, so
 * the UI never breaks and never claims a real charge.
 *
 * Amount is expected in the smallest currency unit (kobo for NGN), matching
 * Paystack's inline checkout requirement.
 */

const SDK_URL = 'https://js.paystack.co/inline/2/inline/checkout.js'
const PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || ''

let scriptPromise = null

/** Inject the Paystack inline checkout SDK exactly once. */
function loadPaystackScript() {
  if (typeof window !== 'undefined' && window.Paystack) {
    return Promise.resolve(window.Paystack)
  }
  if (scriptPromise) return scriptPromise
  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${SDK_URL}"]`)
    const onLoad = () => resolve(window.Paystack)
    if (existing) {
      existing.addEventListener('load', onLoad, { once: true })
      // Already loaded (race) — resolve immediately.
      if (window.Paystack) resolve(window.Paystack)
      return
    }
    const script = document.createElement('script')
    script.src = SDK_URL
    script.async = true
    script.onload = onLoad
    script.onerror = () =>
      reject(new Error('Paystack checkout script could not be loaded.'))
    document.head.appendChild(script)
  })
  return scriptPromise
}

/** Whether a real public key is configured (frontend-safe). */
export function isPaystackConfigured() {
  return Boolean(PUBLIC_KEY)
}

/**
 * Open the real Paystack inline checkout for a transaction.
 * Returns the Paystack handler so callers can observe callbacks.
 *
 * @param {object} opts
 * @param {number} opts.amount    Amount in smallest currency unit (kobo for NGN).
 * @param {string} opts.currency  Currency code, e.g. "NGN".
 * @param {string} opts.email     Customer email.
 * @param {string} opts.name      Customer name.
 * @param {string} opts.reference Unique transaction reference.
 * @param {string} [opts.description]
 */
export async function openPaystackCheckout(opts) {
  if (!isPaystackConfigured()) {
    return { demo: true }
  }
  const Paystack = await loadPaystackScript()

  const handler = Paystack.inline(PUBLIC_KEY, {
    reference: opts.reference,
    amount: opts.amount,
    currency: opts.currency || 'NGN',
    email: opts.email,
    name: opts.name,
    metadata: {
      reference: opts.reference,
      description: opts.description || '',
    },
    publicKey: PUBLIC_KEY,
  })

  return {
    demo: false,
    open: () => handler.open(),
    onSuccess: (cb) => {
      handler.onSuccess = cb
    },
    onClose: (cb) => {
      handler.onClose = cb
    },
    onInitialized: (cb) => {
      handler.onInitialized = cb
    },
  }
}

/**
 * Verify a transaction on the backend. The SECRET key is used server-side only.
 * Falls back to a mock verification while the backend is not connected.
 */
export async function verifyPayment(reference) {
  if (USE_MOCK_DATA) {
    await delay(700)
    return { reference, verified: true, demo: true, message: 'Demo verification — no backend connected.' }
  }
  return apiRequest(`/payments/verify/${encodeURIComponent(reference)}`)
}
