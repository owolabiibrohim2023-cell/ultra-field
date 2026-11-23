import { delay, apiRequest, USE_MOCK_DATA } from './api.js'

// Quote requests are frontend-only demonstrations. No prices are calculated
// or promised — quotations are confirmed by Ultrafield Logistics staff.

export async function createQuoteRequest(payload) {
  if (USE_MOCK_DATA) {
    await delay(900)
    const reference = `UF-QT-${Date.now().toString().slice(-8)}`
    return {
      quoteReference: reference,
      status: 'received',
      submittedAt: new Date().toISOString(),
      message:
        'Your quotation request has been received (frontend demo). Ultrafield Logistics will follow up with a quotation.',
      payload,
      demo: true,
    }
  }
  return apiRequest('/quotes', { method: 'POST', body: payload })
}

export async function getQuotes() {
  if (USE_MOCK_DATA) {
    await delay(500)
    return { items: [], demo: true }
  }
  return apiRequest('/quotes')
}
