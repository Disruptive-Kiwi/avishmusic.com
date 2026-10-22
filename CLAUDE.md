# Avish Music Website

> **CLAUDE.md RULES**: Keep <200 lines. Update after changes. Concise > grammar.

## Quick Reference
- Stack/commands/structure → check `package.json`, just `ls`
- Hooks/skills config → `.claude/` directory
- Deployment: Vercel hobby tier, custom domain avishmusic.com, push main = deploy

---

## Claude Instructions

### Before Starting ANY Task
1. Ask all open/unresolved questions first
2. Clarify ambiguous requirements
3. Don't assume - ask

### Before Building Big Features
Web research the latest docs for our stack (React, Vite, Tailwind v4, Vercel etc). Don't assume training cutoff knowledge is current - APIs and best practices change.

### Grug Brain Principles
- Simple > clever
- Less code > more code
- Obvious > elegant
- Delete > comment out
- Fix root cause > patch symptoms

### Frontend Work
Use **frontend-design skill** (`.claude/skills/frontend-design.md`) for all UI work. Hook auto-triggers on frontend file edits.

Key rules:
- Bold aesthetic, not generic AI slop
- Distinctive typography (no Inter/Roboto/Arial)
- Dominant colors + sharp accents
- NEVER purple gradients on white


## Wedding landing page (ads)
- `/wedding` (+ `/wedding/thank-you`, `/privacy`) lives in `src/wedding/`. Settings in `src/wedding/config.ts` (GTM_ID, LEADS_ENDPOINT, WhatsApp, setups, reels).
- Leads → Google Sheet via Apps Script (`LEADS_ENDPOINT`). `/contact` form posts to the same Sheet (page=/contact).
- All "Request a live quote" CTAs (home hero, side nav, mobile menu, /live, /contact) → `/wedding`.
- dataLayer events: generate_lead (main conversion), lead_form_step1, cta_click, whatsapp_click, video_play, contact_submit.
