import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import heroImage from '../assets/images/wedding/hero-wedding.webp'
import portrait from '../assets/images/wedding/portrait-kurta.webp'
import galleryGuest from '../assets/images/wedding/gallery-guest.webp'
import galleryCrowd from '../assets/images/wedding/gallery-crowd.webp'
import galleryBride from '../assets/images/wedding/gallery-bride.webp'
import gallerySing from '../assets/images/wedding/gallery-sing.webp'
import gallerySmile from '../assets/images/wedding/gallery-smile.webp'
import {
  CITY_SUGGESTIONS,
  EVENT_TYPES,
  REELS,
  REPLY_TIME,
  SET_FORMATS,
  TESTIMONIALS,
  WHATSAPP_NUMBER,
} from './config'
import { sendLead, toE164, track } from './tracking'

const whatsappLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`

const inputClass =
  'w-full px-4 py-3 bg-bg-dark/70 border border-border rounded-sm text-white placeholder-text-muted focus:outline-none focus:border-amber transition-colors'
const labelClass = 'block text-xs tracking-widest uppercase text-text-secondary mb-2'
const buttonClass =
  'w-full px-6 py-4 bg-amber text-white text-sm font-semibold tracking-widest uppercase hover:bg-amber-light transition-all btn-glow disabled:opacity-60'

function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}

// Minimal top bar: logo only, so ad visitors have one thing to do.
function TopBar() {
  return (
    <header className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-5 lg:px-12 py-5">
      <span className="font-display text-xl font-bold tracking-[0.2em] text-white">
        AVISH <span className="text-amber">LIVE</span>
      </span>
      {WHATSAPP_NUMBER && (
        <a
          href={whatsappLink('Hi Avish, I’d like to check availability for my wedding.')}
          onClick={() => track('whatsapp_click', { location: 'top_bar' })}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs tracking-widest uppercase text-text-secondary hover:text-amber transition-colors"
        >
          WhatsApp
        </a>
      )}
    </header>
  )
}

type FormState = {
  eventDate: string
  dateNotFixed: boolean
  approxMonth: string
  city: string
  eventTypes: string[]
  setFormat: string
  name: string
  phone: string
  email: string
  notes: string
  company: string // honeypot, real people never see or fill it
}

const emptyForm: FormState = {
  eventDate: '',
  dateNotFixed: false,
  approxMonth: '',
  city: '',
  eventTypes: [],
  setFormat: '',
  name: '',
  phone: '',
  email: '',
  notes: '',
  company: '',
}

// Two-step enquiry form: easy questions first, personal details second.
function EnquiryForm() {
  const navigate = useNavigate()
  const [step, setStep] = useState<1 | 2>(1)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const today = new Date().toISOString().slice(0, 10)

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const toggleEventType = (type: string) =>
    set('eventTypes', form.eventTypes.includes(type) ? form.eventTypes.filter((t) => t !== type) : [...form.eventTypes, type])

  const goToStep2 = (e: React.FormEvent) => {
    e.preventDefault()
    track('lead_form_step1', { city: form.city })
    setStep(2)
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.eventTypes.length === 0) {
      setError('Pick at least one event.')
      return
    }
    if (form.phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid WhatsApp number.')
      return
    }
    setError('')
    if (form.company) return // bot

    const phone = toE164(form.phone)
    setSending(true)
    try {
      await sendLead({
        name: form.name,
        phone,
        email: form.email,
        event_date: form.dateNotFixed ? `Approx: ${form.approxMonth}` : form.eventDate,
        city: form.city,
        event_types: form.eventTypes.join(', '),
        set_format: form.setFormat,
        notes: form.notes,
      })
    } catch {
      setSending(false)
      setError('Couldn’t send. Check your connection and try again.')
      return
    }

    track('generate_lead', {
      lead_city: form.city,
      lead_event_types: form.eventTypes.join(', '),
      lead_set_format: form.setFormat,
      user_data: { phone_number: phone, ...(form.email && { email: form.email.trim().toLowerCase() }) },
    })
    navigate('/wedding/thank-you', { state: { name: form.name.split(' ')[0] } })
  }

  return (
    <div id="enquire" className="bg-bg-card/90 backdrop-blur border border-border rounded-sm p-5 sm:p-8 scroll-mt-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <p className="font-display text-lg text-white">Check your date</p>
        <p className="text-xs tracking-widest uppercase text-text-muted">Step {step} of 2</p>
      </div>

      {step === 1 ? (
        <form onSubmit={goToStep2} className="space-y-4 sm:space-y-5">
          <div>
            <label htmlFor="eventDate" className={labelClass}>Wedding / event date</label>
            {form.dateNotFixed ? (
              <input
                id="eventDate"
                type="text"
                required
                placeholder="Approx. month, e.g. Feb 2027"
                value={form.approxMonth}
                onChange={(e) => set('approxMonth', e.target.value)}
                className={inputClass}
              />
            ) : (
              <input
                id="eventDate"
                type="date"
                required
                min={today}
                value={form.eventDate}
                onChange={(e) => set('eventDate', e.target.value)}
                className={`${inputClass} [color-scheme:dark]`}
              />
            )}
            <label className="mt-2 flex items-center gap-2 text-sm text-text-muted cursor-pointer">
              <input
                type="checkbox"
                checked={form.dateNotFixed}
                onChange={(e) => set('dateNotFixed', e.target.checked)}
                className="accent-amber"
              />
              Date not fixed yet
            </label>
          </div>
          <div>
            <label htmlFor="city" className={labelClass}>City / venue</label>
            <input
              id="city"
              type="text"
              required
              list="city-list"
              placeholder="e.g. Udaipur, The Leela Palace"
              value={form.city}
              onChange={(e) => set('city', e.target.value)}
              className={inputClass}
            />
            <datalist id="city-list">
              {CITY_SUGGESTIONS.map((c) => <option key={c} value={c} />)}
            </datalist>
          </div>
          <button type="submit" className={buttonClass}>Check my date →</button>
          <p className="text-xs text-text-muted text-center">Free, no obligation. We reply on WhatsApp {REPLY_TIME}.</p>
        </form>
      ) : (
        <form onSubmit={submit} className="space-y-5" noValidate={false}>
          <fieldset>
            <legend className={labelClass}>Which events?</legend>
            <div className="flex flex-wrap gap-2">
              {EVENT_TYPES.map((type) => {
                const on = form.eventTypes.includes(type)
                return (
                  <button
                    type="button"
                    key={type}
                    onClick={() => toggleEventType(type)}
                    aria-pressed={on}
                    className={`px-3 py-2 text-sm border rounded-sm transition-colors ${
                      on ? 'border-amber bg-amber/15 text-white' : 'border-border text-text-secondary hover:border-text-muted'
                    }`}
                  >
                    {type}
                  </button>
                )
              })}
            </div>
          </fieldset>
          <div>
            <label htmlFor="setFormat" className={labelClass}>Performance setup</label>
            <select id="setFormat" required value={form.setFormat} onChange={(e) => set('setFormat', e.target.value)} className={inputClass}>
              <option value="" disabled>Choose one</option>
              {SET_FORMATS.map((s) => <option key={s.name}>{s.name}</option>)}
              <option>Not sure yet, suggest one</option>
            </select>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className={labelClass}>Your name</label>
              <input id="name" type="text" required autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>WhatsApp number</label>
              <input
                id="phone"
                type="tel"
                required
                autoComplete="tel"
                inputMode="tel"
                placeholder="+91"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>Email <span className="normal-case tracking-normal text-text-muted">(optional)</span></label>
            <input id="email" type="email" autoComplete="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="notes" className={labelClass}>Anything else? <span className="normal-case tracking-normal text-text-muted">(optional)</span></label>
            <textarea
              id="notes"
              rows={2}
              placeholder="Guest count, song requests, timings…"
              value={form.notes}
              onChange={(e) => set('notes', e.target.value)}
              className={`${inputClass} resize-none`}
            />
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
          <button type="submit" disabled={sending} className={buttonClass}>
            {sending ? 'Sending…' : 'Get availability & quote'}
          </button>
          <button type="button" onClick={() => setStep(1)} className="w-full text-xs tracking-widest uppercase text-text-muted hover:text-white">
            ← Back
          </button>
        </form>
      )}
    </div>
  )
}

// YouTube embeds load only on tap, so the page stays fast on mobile data.
function Reel({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="relative aspect-[9/16] w-[70vw] max-w-[280px] shrink-0 snap-center overflow-hidden rounded-sm border border-border bg-bg-card">
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&playsinline=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            setPlaying(true)
            track('video_play', { video_id: id, video_title: title })
          }}
          className="group absolute inset-0 w-full h-full"
          aria-label={`Play ${title}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${id}/oardefault.jpg`}
            onError={(e) => { e.currentTarget.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg` }}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-amber/90 flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 ml-1 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </span>
          <span className="absolute bottom-4 left-4 right-4 text-left font-display text-white">{title}</span>
        </button>
      )}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs tracking-[0.3em] uppercase text-amber mb-4">{children}</p>
}

const faqs = [
  {
    q: 'Do you travel for destination weddings?',
    a: 'Yes. Avish is based between Mumbai and Ahmedabad and performs across India, including Rajasthan. Travel and stay are included in your quote.',
  },
  {
    q: 'What kind of songs do you play?',
    a: 'Classic and current Bollywood hits, mostly Hindi, plus crowd favourites for the dance floor. Share your must-play list and we’ll plan the set around it.',
  },
  {
    q: 'Do you bring sound and lights?',
    a: 'Tell us your venue and we’ll confirm what’s needed. We can work with your venue’s or planner’s sound team, or arrange it.',
  },
  {
    q: 'Which setup is right for our event?',
    a: 'Solo acoustic suits cocktails, mehendi and smaller functions. The 3-piece band gives a fuller sound for mid-size events. Full band production (8–10 piece) is built for a big sangeet or reception. Not sure? Choose “Not sure yet” in the form and we’ll suggest one.',
  },
  {
    q: 'How long do you perform?',
    a: 'Set length is planned around your function and its timings. Tell us your schedule and we’ll confirm it in your quote.',
  },
  {
    q: 'Do you perform at events other than weddings?',
    a: 'Yes, including corporate events, private parties, festivals and cultural events. Mention it in the form’s notes.',
  },
  {
    q: 'How far ahead should we book?',
    a: 'Peak wedding dates go first, so enquire as soon as your date is fixed. If your date isn’t fixed yet, share the month and we’ll hold options.',
  },
  {
    q: 'How do we confirm the booking?',
    a: 'We send availability and a quote on WhatsApp. Your date is locked once the advance is paid, and then we plan the set list with you.',
  },
]

export function WeddingPage() {
  usePageTitle('Avish Live | Live Bollywood Singer for Weddings & Sangeet')
  const heroRef = useRef<HTMLElement>(null)
  const [showSticky, setShowSticky] = useState(false)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const observer = new IntersectionObserver(([entry]) => setShowSticky(!entry.isIntersecting), { threshold: 0.1 })
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  const scrollToForm = (from: string) => {
    track('cta_click', { location: from })
    document.getElementById('enquire')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="grain-overlay min-h-screen bg-bg-dark">
      {/* 1. Hero + form step 1 */}
      <section ref={heroRef} className="relative min-h-[100svh] hero-bg" style={{ backgroundImage: `url(${heroImage})`, backgroundPosition: '55% 20%' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/70 via-bg-dark/80 to-bg-dark lg:bg-gradient-to-r lg:from-bg-dark/95 lg:via-bg-dark/60 lg:to-bg-dark/90" />
        <TopBar />
        <div className="relative z-10 max-w-6xl mx-auto px-5 lg:px-12 pt-20 pb-14 lg:pt-32 grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-16 items-center">
          <div className="animate-fade-in">
            <p className="text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-amber mb-3 sm:mb-5">Now taking wedding dates in India</p>
            <h1 className="font-display text-[2rem] sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-white">
              Live Bollywood <br className="hidden sm:block" />singer for your <span className="text-amber">wedding</span>
            </h1>
            <p className="hidden sm:block mt-5 text-lg text-text-secondary max-w-md">
              Sangeet, wedding and reception sets with real live vocals. Not a playlist.
            </p>
            <ul className="mt-4 sm:mt-6 flex flex-wrap gap-x-4 sm:gap-x-5 gap-y-1 text-sm text-white/90">
              <li><span className="text-amber font-semibold">100+</span> live shows</li>
              <li><span className="text-amber font-semibold">4</span> continents</li>
              <li><span className="text-amber font-semibold">7M+</span> views</li>
              <li className="hidden sm:list-item">Featured in Rolling Stone India</li>
            </ul>
            <p className="hidden sm:block mt-4 text-sm text-text-muted">Mumbai · Ahmedabad · Rajasthan · Delhi NCR · destination weddings</p>
          </div>
          <div className="animate-fade-in [animation-delay:150ms] opacity-0">
            <EnquiryForm />
          </div>
        </div>
      </section>

      {/* 2. Watch him live */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-5 lg:px-12">
          <SectionLabel>Watch him live</SectionLabel>
          <h2 className="font-display text-3xl lg:text-4xl text-white mb-8">Real crowds. Real live vocals.</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-5 lg:px-12 pb-4 max-w-6xl mx-auto">
          {REELS.map((r) => <Reel key={r.id} {...r} />)}
        </div>
      </section>

      {/* 2b. Real weddings */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-6xl mx-auto px-5 lg:px-12">
          <SectionLabel>Real weddings</SectionLabel>
          <h2 className="font-display text-3xl lg:text-4xl text-white mb-8">Where the dance floor fills up</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {[
              [galleryGuest, 'Avish singing with a guest at a wedding'],
              [galleryCrowd, 'Wedding guests dancing with hands up'],
              [galleryBride, 'Bride dancing during Avish’s set'],
              [gallerySing, 'Avish performing at a wedding'],
              [gallerySmile, 'Avish smiling mid-song'],
            ].map(([src, alt], i) => (
              <img
                key={src}
                src={src}
                alt={alt}
                loading="lazy"
                className={`w-full h-full object-cover rounded-sm ${i === 0 ? 'col-span-2 md:row-span-2 aspect-[16/10] md:aspect-auto' : 'aspect-[16/10]'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Artist intro */}
      <section className="py-16 lg:py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-5 lg:px-12 grid md:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-center">
          <img src={portrait} alt="Avish, live Bollywood singer" loading="lazy" className="w-full max-w-sm aspect-[3/4] object-cover object-top rounded-sm" />
          <div>
            <SectionLabel>Meet Avish</SectionLabel>
            <h2 className="font-display text-3xl lg:text-4xl text-white mb-6">From international stages to your sangeet</h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Avish is a Hindi singer-songwriter and live performer who has played 100+ shows across four continents,
                including crowds of 20,000+. His music has been featured by Spotify editorial and Rolling Stone India.
              </p>
              <p>
                At weddings he brings the songs everyone knows, from old Bollywood classics to this year’s hits,
                sung live and paced to keep your dance floor full all night.
              </p>
            </div>
            <p className="mt-8 text-xs tracking-[0.3em] uppercase text-text-muted mb-3">Worked with &amp; featured on</p>
            <p className="font-display text-white/80 flex flex-wrap gap-x-4 gap-y-1">
              <span>T-Series</span><span className="text-text-muted">·</span>
              <span>Zee Music Company</span><span className="text-text-muted">·</span>
              <span>Saregama</span><span className="text-text-muted">·</span>
              <span>Rolling Stone India</span>
            </p>
          </div>
        </div>
      </section>

      {/* 4. Events and locations */}
      <section className="py-16 lg:py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-5 lg:px-12">
          <SectionLabel>What we play for</SectionLabel>
          <h2 className="font-display text-3xl lg:text-4xl text-white mb-10">Every function, one voice</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {[
              ['Sangeet', 'High-energy sets that get both families dancing.'],
              ['Wedding', 'Baraat to pheras, music for the big moments.'],
              ['Reception', 'Elegant live Bollywood for your guests.'],
              ['Cocktail', 'Acoustic and lounge sets for the evening.'],
            ].map(([title, text]) => (
              <div key={title} className="bg-bg-dark p-6 lg:p-8">
                <p className="font-display text-xl text-white mb-2">{title}</p>
                <p className="text-sm text-text-muted leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-text-secondary">
            <span className="text-white">Available across India:</span> Mumbai, Ahmedabad, Delhi NCR, Jaipur, Udaipur, Jodhpur and destination weddings.
          </p>
        </div>
      </section>

      {/* 4b. Setups */}
      <section className="py-16 lg:py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-5 lg:px-12">
          <SectionLabel>Pick your setup</SectionLabel>
          <h2 className="font-display text-3xl lg:text-4xl text-white mb-10">From acoustic to full production</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {SET_FORMATS.map((s, i) => (
              <div key={s.name} className={`p-6 lg:p-8 border rounded-sm ${i === 2 ? 'border-amber bg-amber/5' : 'border-border'}`}>
                <p className="font-display text-xl text-white mb-3">{s.name}</p>
                <p className="text-sm text-text-muted leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      {TESTIMONIALS.length > 0 && (
        <section className="py-16 lg:py-24 border-t border-border">
          <div className="max-w-4xl mx-auto px-5 lg:px-12 text-center">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name}>
                <blockquote className="font-display text-2xl lg:text-4xl text-white leading-snug">“{t.quote}”</blockquote>
                <figcaption className="mt-6 text-sm tracking-widest uppercase text-text-muted">
                  {t.name} <span className="text-amber">·</span> {t.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* 6. How it works */}
      <section className="py-16 lg:py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-5 lg:px-12">
          <SectionLabel>How it works</SectionLabel>
          <ol className="grid md:grid-cols-3 gap-8">
            {[
              ['Share your date', 'Takes under a minute: date, city and the events you’re planning.'],
              ['Get a reply on WhatsApp', `We confirm availability and send a quote ${REPLY_TIME}.`],
              ['Lock your date', 'Confirm with an advance and we plan the set list with you.'],
            ].map(([title, text], i) => (
              <li key={title} className="border-t border-amber pt-5">
                <p className="font-display text-4xl text-amber/60 mb-3">0{i + 1}</p>
                <p className="font-display text-xl text-white mb-2">{title}</p>
                <p className="text-sm text-text-muted leading-relaxed">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-16 lg:py-24 border-t border-border">
        <div className="max-w-3xl mx-auto px-5 lg:px-12">
          <SectionLabel>Questions</SectionLabel>
          <div className="divide-y divide-border border-y border-border">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-white">
                  {f.q}
                  <span className="text-amber text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-text-muted leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final CTA */}
      <section className="py-20 lg:py-28 border-t border-border text-center px-5">
        <h2 className="font-display text-3xl lg:text-5xl text-white mb-4">Wedding dates fill fast this season</h2>
        <p className="text-text-secondary mb-8">Check if yours is free. It takes less than a minute.</p>
        <button type="button" onClick={() => scrollToForm('final_cta')} className={`${buttonClass} max-w-xs`}>
          Check my date
        </button>
      </section>

      <footer className="border-t border-border px-5 lg:px-12 py-8 pb-28 lg:pb-8 text-xs text-text-muted flex flex-wrap gap-4 justify-between max-w-6xl mx-auto">
        <span>© {new Date().getFullYear()} Avish · UA International</span>
        <span className="flex gap-4">
          <Link to="/privacy" className="hover:text-white">Privacy policy</Link>
          <Link to="/" className="hover:text-white">avishmusic.com</Link>
        </span>
      </footer>

      {/* Sticky mobile CTA once the hero is out of view */}
      <div
        className={`lg:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-bg-dark/95 backdrop-blur border-t border-border flex gap-2 transition-transform duration-300 ${
          showSticky ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <button type="button" onClick={() => scrollToForm('sticky_bar')} className={`${buttonClass} py-3`}>
          Check my date
        </button>
        {WHATSAPP_NUMBER && (
          <a
            href={whatsappLink('Hi Avish, I’d like to check availability for my wedding.')}
            onClick={() => track('whatsapp_click', { location: 'sticky_bar' })}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="shrink-0 w-14 flex items-center justify-center border border-border text-white hover:border-amber"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zm8.3-18.1C18.1 1.5 15.1.3 12 .3 5.5.3.3 5.5.3 12c0 2.1.5 4.1 1.6 5.9L.2 23.7l6-1.6c1.7.9 3.7 1.4 5.7 1.4 6.4 0 11.7-5.2 11.7-11.7 0-3.1-1.2-6.1-3.3-8.1z" /></svg>
          </a>
        )}
      </div>
    </div>
  )
}

export function WeddingThankYouPage() {
  usePageTitle('Thank you | Avish Live')
  const location = useLocation()
  const name = (location.state as { name?: string } | null)?.name

  // The router keeps the scroll position of the form; start this page at the top.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="grain-overlay min-h-[100svh] bg-bg-dark flex items-center">
      <TopBar />
      <div className="max-w-xl mx-auto px-5 py-24 text-center animate-fade-in">
        <p className="text-xs tracking-[0.3em] uppercase text-amber mb-5">Enquiry received</p>
        <h1 className="font-display text-4xl lg:text-5xl text-white mb-6">Thank you{name ? `, ${name}` : ''}!</h1>
        <p className="text-text-secondary text-lg mb-10">
          We’ll message you on WhatsApp {REPLY_TIME} with availability and a quote for your date.
        </p>
        {WHATSAPP_NUMBER && (
          <a
            href={whatsappLink('Hi Avish, I just sent a wedding enquiry from your website.')}
            onClick={() => track('whatsapp_click', { location: 'thank_you' })}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonClass} inline-block max-w-xs mb-6`}
          >
            Chat now on WhatsApp
          </a>
        )}
        <p>
          <Link to="/live" className="text-sm text-text-muted hover:text-white link-underline">See more live performances</Link>
        </p>
      </div>
    </div>
  )
}

export function PrivacyPage() {
  usePageTitle('Privacy policy | Avish')
  return (
    <div className="min-h-screen bg-bg-dark">
      <div className="max-w-2xl mx-auto px-5 py-20 space-y-5 text-text-secondary leading-relaxed">
        <Link to="/" className="font-display text-xl font-bold tracking-[0.2em] text-white">AVISH</Link>
        <h1 className="font-display text-3xl text-white pt-6">Privacy policy</h1>
        <p>
          When you send an enquiry on this website we collect the details you enter (name, WhatsApp number, email,
          event date, location, event type, performance setup and notes). We use them only to reply to your enquiry and to plan
          your event. We don’t sell or share them with anyone else.
        </p>
        <p>
          We use Google Analytics and Google Ads cookies to understand how visitors use the site and to measure our
          advertising. These services may collect information such as your device, browser and the pages you visit.
          You can opt out of Google ad personalisation at adssettings.google.com.
        </p>
        <p>
          To see, correct or delete the details you sent us, email{' '}
          <a href="mailto:avishsharmamusic@outlook.com" className="text-amber">avishsharmamusic@outlook.com</a>.
        </p>
      </div>
    </div>
  )
}
