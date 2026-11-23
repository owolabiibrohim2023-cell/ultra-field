/**
 * Carrier definitions for external shipment tracking.
 *
 * Each carrier exposes a real, publicly-accessible tracking deep-link builder
 * (`trackUrl(number)`) that opens the carrier's own tracking page in a new tab.
 * These links work immediately without any backend or API keys.
 *
 * `pattern` is a best-effort tracking-number regex used for auto-detection.
 * Detection is heuristic — the user can always override the carrier manually.
 *
 * NOTE: carrier logos/brand marks are the property of each carrier and are not
 * reproduced here. Only standard tracking URL formats are referenced.
 */

export const CARRIERS = [
  {
    id: 'ups',
    name: 'UPS',
    short: 'UPS',
    color: '#8B1A1A',
    website: 'https://www.ups.com',
    trackUrl: (num) =>
      `https://www.ups.com/track/tracknum?loc=en_US&tracknum=${encodeURIComponent(num)}`,
    // 1Z + 16 alphanumeric, or an 18–20 digit number.
    pattern: /^(1Z[0-9A-Z]{16}|\d{18,20})$/i,
  },
  {
    id: 'dhl',
    name: 'DHL Express',
    short: 'DHL',
    color: '#D40511',
    website: 'https://www.dhl.com',
    trackUrl: (num) =>
      `https://www.dhl.com/en/express/tracking.html?AWB=${encodeURIComponent(num)}&brand=DHL`,
    // 10-digit waybill, or JD + 14–16 chars (DHL eCommerce).
    pattern: /^(\d{10}|JD[0-9A-Z]{14,16})$/i,
  },
  {
    id: 'fedex',
    name: 'FedEx',
    short: 'FedEx',
    color: '#4D148C',
    website: 'https://www.fedex.com',
    trackUrl: (num) =>
      `https://www.fedex.com/fedextrack/?trknbr=${encodeURIComponent(num)}`,
    // 12, 15, or 20–22 digit tracking numbers.
    pattern: /^\d{12}$|^\d{15}$|^\d{20,22}$/,
  },
  {
    id: 'usps',
    name: 'USPS',
    short: 'USPS',
    color: '#2E5C8A',
    website: 'https://www.usps.com',
    trackUrl: (num) =>
      `https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=${encodeURIComponent(num)}`,
    // 20-digit (92–96 / 94 prefix) or 15-digit Priority numbers.
    pattern: /^(9[2-6]\d{18,19}|\d{15})$/,
  },
  {
    id: 'royal-mail',
    name: 'Royal Mail',
    short: 'Royal Mail',
    color: '#D40511',
    website: 'https://www.royalmail.com',
    trackUrl: (num) =>
      `https://www.royalmail.com/track-your-item#/track/${encodeURIComponent(num)}`,
    // RM + digits, or 13–15 digit barcode.
    pattern: /^(RM[0-9A-Z]{6,14}|\d{13,15})$/i,
  },
  {
    id: 'auspost',
    name: 'Australia Post',
    short: 'AusPost',
    color: '#012169',
    website: 'https://auspost.com.au',
    trackUrl: (num) =>
      `https://auspost.com.au/mypost/track/#/track/${encodeURIComponent(num)}`,
    // 12–15 alphanumeric, or 9-digit followed by 2 check digits.
    pattern: /^[0-9A-Z]{9,15}$/i,
  },
  {
    id: 'canada-post',
    name: 'Canada Post',
    short: 'Canada Post',
    color: '#E01A25',
    website: 'https://www.canadapost.ca',
    trackUrl: (num) =>
      `https://www.canadapost.ca/cpotools/apps/track/personal/search?lang=en&locale=en_CA&ob=mcs&tracknumbers=${encodeURIComponent(num)}`,
    // 13–16 digit, or 2 letters + 9 digits.
    pattern: /^([A-Z]{2}\d{9}|\d{13,16})$/i,
  },
  {
    id: 'ems',
    name: 'EMS (Global)',
    short: 'EMS',
    color: '#0072CE',
    website: 'https://www.ems.post',
    trackUrl: (num) => `https://t.17track.net/en#numbers=${encodeURIComponent(num)}`,
    // 13-digit EMS / 17track-compatible.
    pattern: /^\d{13}$/,
  },
  {
    id: 'dpd',
    name: 'DPD',
    short: 'DPD',
    color: '#004B8F',
    website: 'https://www.dpd.com',
    trackUrl: (num) =>
      `https://www.dpd.com/uk/en/personal/track-your-parcel.page?tracking=${encodeURIComponent(num)}`,
    pattern: /^[0-9A-Z]{10,20}$/i,
  },
  {
    id: 'tnt',
    name: 'TNT',
    short: 'TNT',
    color: '#F40000',
    website: 'https://www.tnt.com',
    trackUrl: (num) =>
      `https://www.tnt.com/express/en_GB/home/tracking/tracking-parcel.html?respid=tnt&awb=${encodeURIComponent(num)}`,
    // 10-digit waybill.
    pattern: /^\d{10}$/,
  },
  {
    id: 'gls',
    name: 'GLS',
    short: 'GLS',
    color: '#E2001A',
    website: 'https://www.gls-group.eu',
    trackUrl: (num) => `https://track.gls-logistics.com/en/parcel?tracking=${encodeURIComponent(num)}`,
    pattern: /^[0-9A-Z]{8,16}$/i,
  },
  {
    id: 'aramex',
    name: 'Aramex',
    short: 'Aramex',
    color: '#C8102E',
    website: 'https://www.aramex.com',
    trackUrl: (num) => `https://www.aramex.com/track.shtml?reference=${encodeURIComponent(num)}`,
    // 11 digits, or 9-digit with 2-letter prefix.
    pattern: /^([A-Z]{2}\d{9}|\d{11})$/i,
  },
  {
    id: 'lasership',
    name: 'Lasership',
    short: 'Lasership',
    color: '#1B4F8F',
    website: 'https://www.lasership.com',
    trackUrl: (num) =>
      `https://www.lasership.com/track-a-shipment/?trackingNumber=${encodeURIComponent(num)}`,
    pattern: /^[0-9A-Z]{10,20}$/i,
  },
  {
    id: 'ontrac',
    name: 'OnTrac',
    short: 'OnTrac',
    color: '#003A70',
    website: 'https://www.ontrac.com',
    trackUrl: (num) =>
      `https://www.ontrac.com/tracking/?trackingNumber=${encodeURIComponent(num)}`,
    pattern: /^\d{11,15}$/,
  },
]

/** Default carrier shown for Ultrafield's own internal tracking numbers. */
export const INTERNAL_CARRIER = {
  id: 'ultrafield',
  name: 'Ultrafield Logistics',
  short: 'Ultrafield',
  color: '#1f49db',
  website: 'https://localhost',
  // Internal reference numbers have no external carrier page.
  trackUrl: null,
  pattern: null,
}

/** Return all carriers including the internal one for selector display. */
export function getAllCarriers() {
  return [INTERNAL_CARRIER, ...CARRIERS]
}
