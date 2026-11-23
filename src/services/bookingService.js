import { delay, apiRequest, USE_MOCK_DATA } from './api.js'

// Bookings are frontend-only demonstrations. Nothing is persisted to a real
// backend yet; the real booking API will be added with FastAPI + PostgreSQL.

export async function createBooking(payload) {
  if (USE_MOCK_DATA) {
    await delay(900)
    const reference = `UF-BK-${Date.now().toString().slice(-8)}`
    return {
      bookingReference: reference,
      status: 'booking_received',
      submittedAt: new Date().toISOString(),
      payload,
      demo: true,
    }
  }
  return apiRequest('/bookings', { method: 'POST', body: payload })
}

export async function getBookings() {
  if (USE_MOCK_DATA) {
    await delay(500)
    return { items: [], demo: true }
  }
  return apiRequest('/bookings')
}

export async function updateBookingStatus(reference, status) {
  if (USE_MOCK_DATA) {
    await delay(450)
    return { updated: true, reference, status, demo: true }
  }
  return apiRequest(`/bookings/${reference}/status`, {
    method: 'PATCH',
    body: { status },
  })
}
