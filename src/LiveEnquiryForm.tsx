import { useState } from 'react'
import { WHATSAPP_NUMBER } from './wedding/config'
import { sendLead, toE164, track } from './wedding/tracking'

const inputClass =
  'w-full px-4 py-3 bg-bg-dark/70 border border-border rounded-sm text-white placeholder-text-muted focus:outline-none focus:border-amber transition-colors'
const labelClass = 'block text-xs tracking-widest uppercase text-text-secondary mb-2'
const optional = <span className="normal-case tracking-normal text-text-muted">(optional)</span>

const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Avish, I’d like to enquire about a live performance.')}`

type Form = {
  name: string
  event: string
  date: string
  city: string
  phone: string
  email: string
  details: string
  company: string // honeypot, real people never see or fill it
}

const empty: Form = { name: '', event: '', date: '', city: '', phone: '', email: '', details: '', company: '' }

function WhatsAppButton({ location }: { location: string }) {
  if (!WHATSAPP_NUMBER) return null
  return (
    <a
      href={whatsappHref}
      onClick={() => track('whatsapp_click', { location })}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full px-6 py-4 border border-border text-white text-sm font-semibold tracking-widest uppercase text-center hover:border-amber hover:text-amber transition-colors"
    >
      WhatsApp us
    </a>
  )
}

// General booking enquiries for the Live page. Saves to the same leads Sheet as the
// wedding form (page = /live) but fires its own event, so it doesn't count as a
// wedding conversion in Google Ads.
export function LiveEnquiryForm() {
  const [form, setForm] = useState<Form>(empty)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState('')
  const today = new Date().toISOString().slice(0, 10)

  const set = <K extends keyof Form>(key: K, value: Form[K]) => setForm((f) => ({ ...f, [key]: value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid phone number.')
      return
    }
    setError('')
    if (form.company) return // bot

    setStatus('sending')
    try {
      await sendLead({
        name: form.name,
        phone: toE164(form.phone),
        email: form.email,
        event_date: form.date,
        city: form.city,
        event_types: form.event,
        notes: form.details,
      })
    } catch {
      setStatus('idle')
      setError('Couldn’t send. Check your connection and try again.')
      return
    }
    track('general_enquiry', { lead_event: form.event, lead_city: form.city })
    setStatus('sent')
  }

  if (status === 'sent') {
    return (
      <div className="text-center" role="status">
        <p className="font-display text-2xl text-white mb-3">Thank you, {form.name.split(' ')[0]}!</p>
        <p className="text-text-secondary mb-8">We’ve received your enquiry and will get back to you soon.</p>
        <div className="max-w-xs mx-auto">
          <WhatsAppButton location="live_thank_you" />
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-5 text-left">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="live-name" className={labelClass}>Name</label>
          <input id="live-name" type="text" required autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label htmlFor="live-event" className={labelClass}>Event</label>
          <input
            id="live-event"
            type="text"
            required
            placeholder="e.g. Corporate event"
            value={form.event}
            onChange={(e) => set('event', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="live-date" className={labelClass}>Date</label>
          <div className="relative">
            <input
              id="live-date"
              type="date"
              required
              min={today}
              value={form.date}
              onChange={(e) => set('date', e.target.value)}
              className={`${inputClass} date-input peer [color-scheme:dark] ${form.date ? '' : 'is-empty'}`}
            />
            {!form.date && (
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted peer-focus:hidden">
                Select date
              </span>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="live-city" className={labelClass}>City</label>
          <input id="live-city" type="text" required autoComplete="address-level2" value={form.city} onChange={(e) => set('city', e.target.value)} className={inputClass} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="live-phone" className={labelClass}>Number</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">+91</span>
            <input
              id="live-phone"
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              placeholder="Phone number"
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
              className={`${inputClass} pl-14`}
            />
          </div>
        </div>
        <div>
          <label htmlFor="live-email" className={labelClass}>Email {optional}</label>
          <input id="live-email" type="email" autoComplete="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="live-details" className={labelClass}>Additional details {optional}</label>
        <textarea id="live-details" rows={3} value={form.details} onChange={(e) => set('details', e.target.value)} className={`${inputClass} resize-none`} />
      </div>
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={form.company}
        onChange={(e) => set('company', e.target.value)}
        className="hidden"
      />
      {error && <p className="text-sm text-amber-light" role="alert">{error}</p>}
      <div className="grid sm:grid-cols-2 gap-3">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full px-6 py-4 bg-amber text-white text-sm font-semibold tracking-widest uppercase hover:bg-amber-light transition-all btn-glow disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Submit inquiry'}
        </button>
        <WhatsAppButton location="live_form" />
      </div>
    </form>
  )
}
