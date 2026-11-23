import { delay, apiRequest, USE_MOCK_DATA } from './api.js'

// Payments are FRONTEND-ONLY demonstrations. No real payment processing is
// connected. Real Paystack processing will be added securely on the backend
// (server-side) when the FastAPI backend is built — never in frontend code.

export async function getPayment(reference) {
  if (USE_MOCK_DATA) {
    await delay(600)
    return {
      reference: reference || 'UF-INV-2026-0007',
      customerName: 'Demo Customer',
      customerEmail: 'demo.customer@example.com',
      description: 'Payment for shipment booking (demo invoice)',
      amount: 12500,
      currency: 'NGN',
      status: 'pending',
      history: [
        { id: 'p1', action: 'Invoice created', date: '2026-11-12', note: 'Demo invoice generated' },
        { id: 'p2', action: 'Payment awaiting', date: '2026-11-21', note: 'Frontend demo — no real charge' },
      ],
      demo: true,
    }
  }
  return apiRequest(`/payments/${encodeURIComponent(reference)}`)
}

export async function initiatePayment(payload) {
  if (USE_MOCK_DATA) {
    await delay(900)
    // Frontend-only demo interaction. No real Paystack charge is made.
    return {
      status: 'demo_pending',
      message:
        'Demo payment interaction — real Paystack processing will be connected through the backend in a later phase.',
      demo: true,
    }
  }
  // Real flow (future): the backend creates the Paystack transaction and
  // returns a challenge/authorization URL. No secret keys live in the frontend.
  return apiRequest('/payments/initiate', { method: 'POST', body: payload })
}
