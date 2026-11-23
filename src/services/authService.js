import { delay, apiRequest, USE_MOCK_DATA } from './api.js'

// Demo-only authentication. This is a FRONTEND-ONLY mock state: there is no
// real account security, sessions, or persistent backend authentication yet.
// The real implementation will be added with the FastAPI backend.

export async function login({ email, password }) {
  if (USE_MOCK_DATA) {
    await delay(600)
    return {
      token: 'demo-token-frontend-only',
      user: {
        id: 'UF-C-001',
        name: 'Demo Customer',
        email: email || 'demo.customer@example.com',
        phone: '0803 331 3686',
        role: 'customer',
      },
    }
  }
  return apiRequest('/auth/login', { method: 'POST', body: { email, password } })
}

export async function register({ name, email, password }) {
  if (USE_MOCK_DATA) {
    await delay(600)
    return {
      token: 'demo-token-frontend-only',
      user: {
        id: 'UF-C-NEW',
        name: name || 'New Customer',
        email: email || 'new.customer@example.com',
        phone: '',
        role: 'customer',
      },
    }
  }
  return apiRequest('/auth/register', { method: 'POST', body: { name, email, password } })
}

export async function requestPasswordReset(email) {
  if (USE_MOCK_DATA) {
    await delay(600)
    return { sent: true, demo: true }
  }
  return apiRequest('/auth/forgot-password', { method: 'POST', body: { email } })
}

export async function resetPassword({ token, password }) {
  if (USE_MOCK_DATA) {
    await delay(600)
    return { reset: true, demo: true }
  }
  return apiRequest('/auth/reset-password', { method: 'POST', body: { token, password } })
}
