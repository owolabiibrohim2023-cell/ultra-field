// Centralized API service layer.
//
// The backend (Python FastAPI + PostgreSQL) is NOT built yet. Every service in
// this folder currently returns mock data and simulates latency so the frontend
// can be developed and reviewed end-to-end.
//
// To integrate the real backend later:
//   1. Set VITE_API_BASE_URL in the environment (see .env.example).
//   2. Flip `USE_MOCK_DATA` to false.
//   3. The service functions already call the correct endpoint paths.
//
// NEVER store secret keys (API keys, DB credentials, Paystack secrets) in
// frontend environment variables — only the API base URL belongs here.

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

// Demo mode. All service calls return mock data while the backend is absent.
export const USE_MOCK_DATA = true

/** Simulated network latency so loading states behave realistically. */
export function delay(ms = 550) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Generic request helper for the future backend.
 * Kept here so swapping mock services to real HTTP is a one-file change per
 * service module.
 */
export async function apiRequest(path, { method = 'GET', body, headers } = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    const detail = await response
      .json()
      .catch(() => response.statusText || 'Request failed')
    const error = new Error(`Request failed with status ${response.status}`)
    error.status = response.status
    error.detail = detail
    throw error
  }

  if (response.status === 204) return null
  return response.json()
}
