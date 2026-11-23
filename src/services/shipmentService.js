import { delay, apiRequest, USE_MOCK_DATA } from './api.js'
import { mockShipments } from '../data/mockShipments.js'
import { resolveCarrier, getCarrierTrackingUrl, getCarrier, detectCarrier } from '../utils/carriers.js'

// Shipment queries are mock data for now. Real shipment tracking will be
// powered by the FastAPI backend + PostgreSQL database in a later phase.

export async function getShipmentByTrackingNumber(trackingNumber) {
  if (USE_MOCK_DATA) {
    await delay(650)
    const normalized = String(trackingNumber || '').trim().toUpperCase()
    const record =
      mockShipments.find(
        (s) =>
          s.trackingNumber === normalized ||
          (normalized.length > 0 && s.trackingNumber.includes(normalized))
      ) || mockShipments[0]
    return { ...record, demo: true }
  }
  return apiRequest(`/shipments/track/${encodeURIComponent(trackingNumber)}`)
}

export async function getShipmentsByCustomer(customerId) {
  if (USE_MOCK_DATA) {
    await delay(500)
    return mockShipments.map((s) => ({ ...s, demo: true }))
  }
  return apiRequest(`/shipments/customer/${customerId}`)
}

export async function getAdminShipments() {
  if (USE_MOCK_DATA) {
    await delay(500)
    return mockShipments.map((s) => ({ ...s, demo: true }))
  }
  return apiRequest('/shipments')
}

export async function updateShipmentStatus(trackingNumber, status) {
  if (USE_MOCK_DATA) {
    await delay(450)
    // Local demo state only — not a real administrative operation.
    return { updated: true, trackingNumber, status, demo: true }
  }
  return apiRequest(`/shipments/${trackingNumber}/status`, {
    method: 'PATCH',
    body: { status },
  })
}

/**
 * Resolve external carrier tracking for a shipment / tracking number.
 *
 * In mock mode the carrier is resolved from an explicit override (or
 * auto-detected) and a real carrier tracking deep-link is built locally — no
 * backend needed. When the backend is connected, carrier tracking events can be
 * fetched from the API (carrier API keys live server-side); the deep-link is
 * always available locally.
 *
 * @param {string} trackingNumber
 * @param {string} [carrierId] Optional explicit carrier override.
 */
export async function getExternalTracking(trackingNumber, carrierId) {
  if (USE_MOCK_DATA) {
    await delay(300)
    const shipment = mockShipments.find((s) => s.trackingNumber === trackingNumber)
    // Priority: explicit user selection -> auto-detection -> the shipment's
    // assigned carrier (internal Ultrafield references) -> internal fallback.
    const resolved =
      getCarrier(carrierId) ||
      detectCarrier(trackingNumber) ||
      getCarrier(shipment?.carrier) ||
      resolveCarrier(trackingNumber)
    const url = getCarrierTrackingUrl(resolved.id, trackingNumber)
    return { carrier: resolved, trackingUrl: url, demo: true }
  }
  return apiRequest(`/tracking/external/${encodeURIComponent(trackingNumber)}`, {
    query: { carrier: carrierId || '' },
  })
}
