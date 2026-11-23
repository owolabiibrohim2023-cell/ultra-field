// Mock payment/invoice records for demonstration only.
// Sample data — NOT real invoices. No real payment processing is connected.

export const mockPayments = [
  {
    id: 'UF-INV-2026-0007',
    reference: 'UF-INV-2026-0007',
    customer: 'Demo Customer',
    description: 'Shipment booking — Parcel Delivery (UF1001ABK)',
    amount: 12500,
    currency: 'NGN',
    status: 'pending',
    date: '2026-11-12',
  },
  {
    id: 'UF-INV-2026-0005',
    reference: 'UF-INV-2026-0005',
    customer: 'Demo Customer',
    description: 'Shipment booking — Logistics Services (UF1003ABK)',
    amount: 18900,
    currency: 'NGN',
    status: 'paid',
    date: '2026-11-08',
    paidAt: '2026-11-09',
  },
  {
    id: 'UF-INV-2026-0002',
    reference: 'UF-INV-2026-0002',
    customer: 'Akinwale A.',
    description: 'Shipment booking — Shipment Handling (UF1004ABK)',
    amount: 9400,
    currency: 'NGN',
    status: 'pending',
    date: '2026-11-15',
  },
]

export const dashboardInvoices = mockPayments

export const dashboardPaymentHistory = [
  { id: 'ph1', reference: 'UF-INV-2026-0005', amount: 18900, currency: 'NGN', status: 'paid', date: '2026-11-09' },
  { id: 'ph2', reference: 'UF-INV-2026-0007', amount: 12500, currency: 'NGN', status: 'pending', date: '2026-11-12' },
]

export const dashboardNotifications = [
  {
    id: 'n1',
    type: 'shipment',
    title: 'Shipment UF1003ABK delivered',
    message: 'Your shipment has been delivered to the destination address.',
    date: '2026-11-12',
    read: false,
  },
  {
    id: 'n2',
    type: 'payment',
    title: 'Invoice UF-INV-2026-0007 is pending',
    message: 'A payment of NGN 12,500 is awaiting completion for shipment UF1001ABK.',
    date: '2026-11-12',
    read: false,
  },
  {
    id: 'n3',
    type: 'general',
    title: 'Welcome to Ultrafield Logistics',
    message: 'Demo dashboard — your shipments and invoices shown here are sample data.',
    date: '2026-11-01',
    read: true,
  },
]

export const dashboardOverview = {
  totalShipments: 4,
  activeShipments: 2,
  deliveredShipments: 1,
  pendingPayments: 1,
}

export const adminOverview = {
  totalCustomers: 4,
  totalShipments: 5,
  activeShipments: 3,
  deliveredShipments: 1,
  pendingBookings: 2,
  outstandingPayments: 2,
}

export const mockBookings = [
  {
    reference: 'UF-BK-000118',
    customer: 'Akinwale A.',
    shipmentType: 'Parcel Delivery',
    pickupAddress: '12 Ago Market Road, Abeokuta',
    deliveryAddress: 'Yaba, Lagos State',
    pickupDate: '2026-11-23',
    status: 'pending',
    date: '2026-11-20',
  },
  {
    reference: 'UF-BK-000119',
    customer: 'Adaeze O.',
    shipmentType: 'Business Logistics',
    pickupAddress: '4 Ogunmodede Avenue, Lafenwa, Abeokuta',
    deliveryAddress: 'Port Harcourt, Rivers State',
    pickupDate: '2026-11-25',
    status: 'confirmed',
    date: '2026-11-19',
  },
]

export const mockQuotes = [
  {
    reference: 'UF-QT-000041',
    customer: 'Chinedu E.',
    pickupLocation: 'Abeokuta, Ogun State',
    destination: 'Ibadan, Oyo State',
    shipmentCategory: 'Parcel Delivery',
    size: 'Medium parcel (~8 kg)',
    status: 'pending',
    date: '2026-11-20',
  },
]
