import { CARRIERS, INTERNAL_CARRIER } from '../data/carriers.js'

/**
 * Best-effort carrier auto-detection from a tracking number.
 * Patterns overlap between carriers, so this is heuristic — always allow the
 * user to override the result manually in the UI.
 *
 * @param {string} trackingNumber
 * @returns {object|null} a carrier definition, or null when no pattern matches.
 */
export function detectCarrier(trackingNumber) {
  const num = String(trackingNumber || '').trim()
  if (!num) return null

  // Internal Ultrafield references (e.g. UF1001ABK, UF-BK-...) have no external
  // carrier page — never match them to a third-party carrier.
  if (/^UF[-\dA-Z]+$/i.test(num)) return null

  // Order matters: more specific patterns first.
  const ordered = [
    'ups', // 1Z... is unambiguous
    'dhl', // JD... prefix
    'ems', // 13 digits
    'fedex',
    'usps',
    'royal-mail',
    'canada-post',
    'aramex',
    'ontrac',
    'tnt',
    'dpd',
    'gls',
    'lasership',
    'auspost',
  ]

  for (const id of ordered) {
    const carrier = CARRIERS.find((c) => c.id === id)
    if (carrier && carrier.pattern && carrier.pattern.test(num)) {
      return carrier
    }
  }
  return null
}

/**
 * Build the carrier's external tracking deep-link.
 * Returns null when the carrier has no external tracking page (e.g. Ultrafield
 * internal references).
 *
 * @param {string} carrierId
 * @param {string} trackingNumber
 * @returns {string|null}
 */
export function getCarrierTrackingUrl(carrierId, trackingNumber) {
  const num = String(trackingNumber || '').trim()
  const carrier = [INTERNAL_CARRIER, ...CARRIERS].find((c) => c.id === carrierId)
  if (!carrier || !carrier.trackUrl || !num) return null
  return carrier.trackUrl(num)
}

/** Look up a single carrier definition by id. */
export function getCarrier(carrierId) {
  return [INTERNAL_CARRIER, ...CARRIERS].find((c) => c.id === carrierId) || null
}

/**
 * Resolve the effective carrier for a tracking number: the detected carrier
 * when available, otherwise the internal Ultrafield carrier.
 */
export function resolveCarrier(trackingNumber) {
  return detectCarrier(trackingNumber) || INTERNAL_CARRIER
}

/** Whether the resolved carrier supports an external tracking deep-link. */
export function hasExternalTracking(carrier) {
  return Boolean(carrier && carrier.trackUrl)
}
