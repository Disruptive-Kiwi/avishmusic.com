import { GTM_ID, LEADS_ENDPOINT } from './config'

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

const ATTRIBUTION_KEYS = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
const STORAGE_KEY = 'avish_attribution'

// Load GTM once and remember which ad brought the visitor in.
export function initTracking() {
  window.dataLayer = window.dataLayer || []
  saveAttribution()
  if (!GTM_ID) return
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
  document.head.appendChild(script)
}

export function track(event: string, params: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}

function saveAttribution() {
  const params = new URLSearchParams(window.location.search)
  const found: Record<string, string> = {}
  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key)
    if (value) found[key] = value
  }
  if (Object.keys(found).length === 0) return
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found))
  } catch {
    // Storage blocked (private mode). Attribution is nice to have, not required.
  }
}

function getAttribution(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

// Send the lead to the Google Sheet. Apps Script can't return CORS headers,
// so the response is opaque: a network error is the only failure we can see.
export async function sendLead(lead: Record<string, string>) {
  const payload = { ...lead, ...getAttribution(), page: window.location.pathname }
  if (!LEADS_ENDPOINT) {
    console.warn('LEADS_ENDPOINT not set. Lead not saved:', payload)
    return
  }
  await fetch(LEADS_ENDPOINT, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(payload) })
}

// Indian mobile numbers to E.164 (+91XXXXXXXXXX) for enhanced conversions.
export function toE164(phone: string) {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) return `+91${digits}`
  return `+${digits}`
}
