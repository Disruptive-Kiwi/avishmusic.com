import tuHiReCover from '../assets/images/wedding/reel-tu-hi-re.webp'
import aaoNaCover from '../assets/images/wedding/reel-aao-na.webp'

// Wedding landing page settings. Everything the client may need to change lives here.
// Values marked TODO must be filled in before the page goes live with ads.

// Google Tag Manager container ID, e.g. 'GTM-ABC1234'. Empty = no tracking loaded.
export const GTM_ID = 'GTM-T43TV34P'

// Google Apps Script web app URL that writes leads to the Google Sheet.
// Empty = form submits are only logged in the browser console (for testing).
export const LEADS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxqrPhVpyE5IgUCyp5TY-6Y3LYlHSFpdTZ5iSc21xChqeoJUKirFonxkVCg8M7ZT1ruwA/exec'

// WhatsApp number in international format, digits only, e.g. '919876543210'.
// Empty = WhatsApp buttons are hidden.
export const WHATSAPP_NUMBER = '918160717703'

// Promise shown under the form and on the thank-you page.
export const REPLY_TIME = 'within 24 hours'

export const EVENT_TYPES = ['Wedding', 'Sangeet', 'Reception', 'Cocktail', 'Mehendi / Haldi', 'Other']

// "Expected performance requirements" from the brief. formLabel is what the
// enquiry form's dropdown shows; name and detail are for the "Pick your setup" cards.
export const SET_FORMATS = [
  { name: 'Solo acoustic set', formLabel: 'Acoustic/unplugged (up to 50 guests)', detail: 'Just Avish, live and up close. Ideal for cocktails, mehendi and smaller functions. Set can have an acoustic vibe or karaokes for a fuller sound, or a mix of both!' },
  { name: 'Small band (3-piece)', formLabel: 'Small band (50–100 guests)', detail: 'Live vocals with two musicians adding a fuller sound and flair that still fits any venue.' },
  { name: 'Full band production (8–10 piece)', formLabel: 'Full band production (100+ guests)', detail: 'The complete show for your sangeet or reception, built to fill a big dance floor.' },
]

export const CITY_SUGGESTIONS = [
  'Mumbai',
  'Ahmedabad',
  'Delhi NCR',
  'Jaipur',
  'Udaipur',
  'Jodhpur',
  'Pune',
  'Surat',
  'Bengaluru',
  'Goa',
]

// Showreels for the "Watch him live" strip, left to right. YouTube videos must be
// Unlisted or Public. Instagram reels can't play inline cleanly, so they show a saved
// cover and open on Instagram.
export type ReelItem = { id: string; title: string; instagramCover?: string }

export const REELS: ReelItem[] = [
  { id: 'C2I4ozPeVGs', title: 'Wo Ladki' },
  { id: 'D_AwWJCHZSs', title: 'Teri Deewani' },
  { id: 'CnHE9JRpfbU', title: 'Tu Hi Re', instagramCover: tuHiReCover },
  { id: 'DO5mXgyCHJM', title: 'Aao Na', instagramCover: aaoNaCover },
  { id: '8X8Pz0xcvk4', title: 'Teri Meri Kahaani' },
  { id: 'GDJ2ukQVBWU', title: 'Chaleya' },
  { id: 'x4WsyfyM1Sc', title: 'Bang Bang' },
]

export const TESTIMONIALS = [
  { quote: 'One of the best performers I’ve ever seen.', name: 'Sumeet Bagai', role: 'Dream Shaadi (US)' },
]
