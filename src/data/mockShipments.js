// Mock shipment records for frontend demonstration only.
// These are sample data — NOT real shipment records. Real data will come from
// the PostgreSQL database via the FastAPI backend in a later phase.

export const SHIPMENT_STATUSES = {
  PENDING_PICKUP: 'Pending Pickup',
  IN_TRANSIT: 'In Transit',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
}

const baseProgress = (currentStep) =>
  [0, 1, 2, 3, 4].map((step) => ({
    step: step + 1,
    label:
      ['Order Received', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered'][step],
    status: step < currentStep ? 'done' : step === currentStep ? 'current' : 'upcoming',
  }))

export const mockShipments = [
  {
    id: 'UF-SHP-1001',
    trackingNumber: 'UF1001ABK',
    shipmentType: 'Parcel Delivery',
    carrier: 'ups',
    origin: 'Lafenwa, Abeokuta, Ogun State',
    destination: 'Yaba, Lagos State',
    shipmentDate: '2026-11-14',
    estimatedDelivery: '2026-11-18',
    status: SHIPMENT_STATUSES.IN_TRANSIT,
    customer: 'Demo Customer',
    currentStep: 3,
    progress: baseProgress(2),
  },
  {
    id: 'UF-SHP-1002',
    trackingNumber: 'UF1002ABK',
    shipmentType: 'Business Logistics',
    carrier: 'dhl',
    origin: 'Abeokuta, Ogun State',
    destination: 'Port Harcourt, Rivers State',
    shipmentDate: '2026-11-16',
    estimatedDelivery: '2026-11-22',
    status: SHIPMENT_STATUSES.PENDING_PICKUP,
    customer: 'Demo Customer',
    currentStep: 1,
    progress: baseProgress(0),
  },
  {
    id: 'UF-SHP-1003',
    trackingNumber: 'UF1003ABK',
    shipmentType: 'Logistics Services',
    carrier: 'fedex',
    origin: 'Lagos Island, Lagos State',
    destination: 'Abeokuta, Ogun State',
    shipmentDate: '2026-11-08',
    estimatedDelivery: '2026-11-12',
    status: SHIPMENT_STATUSES.DELIVERED,
    customer: 'Demo Customer',
    currentStep: 5,
    progress: baseProgress(4),
  },
]

export const dashboardShipments = mockShipments

export const adminShipments = [
  ...mockShipments,
  {
    id: 'UF-SHP-1004',
    trackingNumber: 'UF1004ABK',
    shipmentType: 'Shipment Handling',
    carrier: 'usps',
    origin: 'Ilorin, Kwara State',
    destination: 'Lafenwa, Abeokuta, Ogun State',
    shipmentDate: '2026-11-19',
    estimatedDelivery: '2026-11-24',
    status: SHIPMENT_STATUSES.OUT_FOR_DELIVERY,
    customer: 'Akinwale A.',
    currentStep: 4,
    progress: baseProgress(3),
  },
  {
    id: 'UF-SHP-1005',
    trackingNumber: 'UF1005ABK',
    shipmentType: 'Delivery Coordination',
    carrier: 'royal-mail',
    origin: 'Abeokuta, Ogun State',
    destination: 'Ibadan, Oyo State',
    shipmentDate: '2026-11-20',
    estimatedDelivery: '2026-11-25',
    status: SHIPMENT_STATUSES.IN_TRANSIT,
    customer: 'Adaeze O.',
    currentStep: 3,
    progress: baseProgress(2),
  },
]
