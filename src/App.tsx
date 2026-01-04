import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import './index.css'
import avishPortrait from './assets/images/avish-portrait.jpg'
import heroImage from './assets/images/hero-live.jpg'

// Social links data
const socials = {
  instagram: 'https://www.instagram.com/avishsharma_',
  youtube: 'https://www.youtube.com/avishsharmamusic',
  facebook: 'https://www.facebook.com/avishmusic',
  spotify: 'https://open.spotify.com/artist/6Xmihw4G1rNjdUI3eH1QBv',
  appleMusic: 'https://music.apple.com/nz/artist/avish/1532006809',
  email: 'avishsharmamusic@outlook.com',
}

// Navigation links - order: Music, Live, About, Contact
const navLinks = [
  { path: '/music', label: 'Music' },
  { path: '/live', label: 'Live' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
]

// Left Side Navigation component
function SideNavigation() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile hamburger button - fixed top left */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 left-6 z-[60] text-white p-2 hover:text-amber transition-colors"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Desktop side navigation */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-48 flex-col py-10 px-8 z-50">
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-2xl font-bold tracking-wide text-white hover:text-amber transition-colors block mb-16"
        >
          AVISH
        </Link>

        {/* Nav links */}
        <div className="flex flex-col gap-6 items-start">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm tracking-widest uppercase transition-colors link-underline ${
                location.pathname === link.path
                  ? 'text-amber'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Social icons - horizontal row below nav */}
          <div className="flex gap-4 mt-2">
            <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-amber transition-colors" aria-label="Instagram">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href={socials.youtube} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-amber transition-colors" aria-label="YouTube">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href={socials.spotify} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-amber transition-colors" aria-label="Spotify">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-bg-dark/98 backdrop-blur-md flex flex-col justify-center items-center">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="font-display text-3xl font-bold tracking-wide text-white hover:text-amber transition-colors mb-12"
          >
            AVISH
          </Link>

          {/* Nav links */}
          <div className="flex flex-col items-center gap-8 mb-16">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-xl tracking-widest uppercase transition-colors ${
                  location.pathname === link.path
                    ? 'text-amber'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex gap-8">
            <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-amber transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href={socials.youtube} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-amber transition-colors" aria-label="YouTube">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href={socials.spotify} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-amber transition-colors" aria-label="Spotify">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
            </a>
          </div>
        </div>
      )}
    </>
  )
}

// Page wrapper with side navigation
function PageWrapper({ children, isHome = false }: { children: React.ReactNode; isHome?: boolean }) {
  return (
    <div className="grain-overlay min-h-screen bg-bg-dark">
      <SideNavigation />
      <main className={`min-h-screen ${isHome ? '' : 'lg:ml-48'}`}>
        {children}
      </main>
    </div>
  )
}

// HOME PAGE - Full screen hero with background image
function HomePage() {
  return (
    <PageWrapper isHome={true}>
      <section
        className="min-h-screen hero-bg relative"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 hero-overlay" />

        {/* Mobile AVISH logo - centered at top */}
        <div className="lg:hidden absolute top-6 left-0 right-0 z-10 flex justify-center">
          <span className="font-display text-2xl font-bold tracking-wide text-white">
            AVISH
          </span>
        </div>
      </section>
    </PageWrapper>
  )
}

// ABOUT PAGE
function AboutPage() {
  return (
    <PageWrapper>
      <section className="pt-20 pb-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-3xl animate-fade-in">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="aspect-[3/4] bg-bg-card rounded-sm overflow-hidden card-hover">
              <img
                src={avishPortrait}
                alt="Avish - Singer-Songwriter"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-white">
                Avish is a Hindi indie-pop singer-songwriter from New Zealand, known for his acoustic sound and heartfelt vocals.
              </p>
              <p className="text-text-secondary leading-relaxed">
                He first rose to fame with viral Bollywood covers on YouTube, winning contests hosted by T-Series, before making his way to Mumbai to pursue original music.
              </p>
              <p className="text-text-secondary leading-relaxed">
                His work has since been featured on Spotify editorials and Rolling Stone India, with his latest single <em className="text-amber">Dhoop</em> becoming the first Hindi song to be funded by NZ On Air.
              </p>

              <div className="pt-8 border-t border-border">
                <p className="text-sm tracking-widest uppercase text-text-muted mb-4">Featured On</p>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-text-secondary">
                  <span>T-Series</span>
                  <span className="text-text-muted">&middot;</span>
                  <span>Zee Music Company</span>
                  <span className="text-text-muted">&middot;</span>
                  <span>Rolling Stone India</span>
                  <span className="text-text-muted">&middot;</span>
                  <span>Sa Re Ga Ma</span>
                </div>
              </div>

              <div className="pt-8">
                <p className="text-sm tracking-widest uppercase text-text-muted mb-4">Stats</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-display text-3xl text-amber">7M+</p>
                    <p className="text-sm text-text-muted">Views</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl text-amber">100+</p>
                    <p className="text-sm text-text-muted">Live Shows</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

// MUSIC PAGE
function MusicPage() {
  return (
    <PageWrapper>
      <section className="pt-20 pb-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-3xl animate-fade-in">
          {/* Spotify Embed */}
          <div className="mb-16">
            <p className="text-sm tracking-widest uppercase text-text-muted mb-6">Latest Releases</p>
            <div className="bg-bg-card rounded-sm overflow-hidden">
              <iframe
                style={{ borderRadius: '2px' }}
                src="https://open.spotify.com/embed/artist/6Xmihw4G1rNjdUI3eH1QBv?utm_source=generator&theme=0"
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Player"
              />
            </div>
          </div>

          {/* Featured Video */}
          <div className="mb-16">
            <p className="text-sm tracking-widest uppercase text-text-muted mb-6">Featured Video</p>
            <div className="aspect-video bg-bg-card rounded-sm overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/qZ9yeZQC69c"
                title="Avish - Featured Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Streaming Links */}
          <div>
            <p className="text-sm tracking-widest uppercase text-text-muted mb-6">Listen On</p>
            <div className="flex flex-wrap gap-4">
              <a
                href={socials.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-amber text-white text-sm tracking-widest uppercase hover:bg-amber-light transition-all btn-glow"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                Spotify
              </a>
              <a
                href={socials.appleMusic}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-bg-elevated text-white text-sm tracking-widest uppercase hover:bg-bg-card transition-all border border-border"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>
                Apple Music
              </a>
              <a
                href={socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-bg-elevated text-white text-sm tracking-widest uppercase hover:bg-bg-card transition-all border border-border"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                YouTube
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

// LIVE PAGE
function LivePage() {
  return (
    <PageWrapper>
      <section className="pt-20 pb-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-3xl animate-fade-in">
          <p className="text-text-secondary text-lg mb-12">
            Experience Avish live - from intimate gatherings to audiences of 20,000+
          </p>

          {/* Showreel Video */}
          <div className="mb-16">
            <p className="text-sm tracking-widest uppercase text-text-muted mb-6">Showreel</p>
            <div className="aspect-video bg-bg-card rounded-sm overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/qZ9yeZQC69c?list=PL5biqK8AA-F7QnoPHPfqyv4XFPQvKaaL6"
                title="Avish Live Showreel"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-16">
            <div className="bg-bg-card p-6 md:p-8 rounded-sm text-center card-hover border border-border">
              <p className="font-display text-3xl md:text-4xl text-amber mb-2">100+</p>
              <p className="text-xs md:text-sm tracking-widest uppercase text-text-muted">Shows Performed</p>
            </div>
            <div className="bg-bg-card p-6 md:p-8 rounded-sm text-center card-hover border border-border">
              <p className="font-display text-3xl md:text-4xl text-amber mb-2">20,000+</p>
              <p className="text-xs md:text-sm tracking-widest uppercase text-text-muted">Largest Audience</p>
            </div>
            <div className="bg-bg-card p-6 md:p-8 rounded-sm text-center card-hover border border-border col-span-2 md:col-span-1">
              <p className="font-display text-3xl md:text-4xl text-amber mb-2">4</p>
              <p className="text-xs md:text-sm tracking-widest uppercase text-text-muted">Continents</p>
            </div>
          </div>

          {/* Event Types */}
          <div className="mb-16">
            <p className="text-sm tracking-widest uppercase text-text-muted mb-6">Perfect For</p>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {['Weddings & Sangeets', 'Corporate Events', 'Private Parties', 'Festivals', 'Concert Venues', 'Cultural Events'].map((event) => (
                <div key={event} className="flex items-center gap-3 p-4 bg-bg-card border border-border rounded-sm">
                  <span className="w-2 h-2 bg-amber rounded-full flex-shrink-0" />
                  <span className="text-text-secondary text-sm md:text-base">{event}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-bg-card border border-border p-8 md:p-12 rounded-sm">
            <p className="font-display text-2xl md:text-3xl text-white mb-4">Book Avish for Your Event</p>
            <p className="text-text-muted mb-8">Bollywood &amp; Indie music for any occasion</p>
            <Link
              to="/contact"
              className="inline-block px-8 py-4 bg-amber text-white text-sm tracking-widest uppercase hover:bg-amber-light transition-all btn-glow"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

// CONTACT PAGE
function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    subject: '',
    message: '',
  })
  const [mailingData, setMailingData] = useState({
    name: '',
    email: '',
    country: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailtoLink = `mailto:${socials.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCountry: ${formData.country}\n\n${formData.message}`
    )}`
    window.location.href = mailtoLink
  }

  const handleMailingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you for subscribing! (Mailing list integration coming soon)')
  }

  return (
    <PageWrapper>
      <section className="pt-20 pb-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-3xl animate-fade-in">
          <p className="text-text-secondary text-lg mb-12">
            Get in touch for bookings and inquiries
          </p>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div>
              <p className="text-sm tracking-widest uppercase text-text-muted mb-6">Send a Message</p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-text-secondary mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-card border border-border rounded-sm focus:outline-none focus:border-amber text-white placeholder-text-muted"
                  />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-card border border-border rounded-sm focus:outline-none focus:border-amber text-white placeholder-text-muted"
                  />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-2">Country</label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-card border border-border rounded-sm focus:outline-none focus:border-amber text-white placeholder-text-muted"
                  />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-card border border-border rounded-sm focus:outline-none focus:border-amber text-white placeholder-text-muted"
                  />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-card border border-border rounded-sm focus:outline-none focus:border-amber text-white placeholder-text-muted resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-amber text-white text-sm tracking-widest uppercase hover:bg-amber-light transition-all btn-glow"
                >
                  Send Message
                </button>
              </form>

              {/* Instagram DM */}
              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-text-muted text-sm mb-4">Or message directly on Instagram</p>
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-amber hover:text-amber-light transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  @avishsharma_
                </a>
              </div>
            </div>

            {/* Mailing List */}
            <div>
              <div className="bg-bg-card border border-border p-6 md:p-8 rounded-sm">
                <p className="text-sm tracking-widest uppercase text-text-muted mb-2">Stay Updated</p>
                <p className="font-display text-2xl text-white mb-6">Join the Mailing List</p>
                <p className="text-text-muted mb-8">Be the first to know about new releases, shows, and exclusive content.</p>

                <form onSubmit={handleMailingSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={mailingData.name}
                    onChange={(e) => setMailingData({ ...mailingData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-dark border border-border rounded-sm focus:outline-none focus:border-amber text-white placeholder-text-muted"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={mailingData.email}
                    onChange={(e) => setMailingData({ ...mailingData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-dark border border-border rounded-sm focus:outline-none focus:border-amber text-white placeholder-text-muted"
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    required
                    value={mailingData.country}
                    onChange={(e) => setMailingData({ ...mailingData, country: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-dark border border-border rounded-sm focus:outline-none focus:border-amber text-white placeholder-text-muted"
                  />
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-amber text-white text-sm tracking-widest uppercase hover:bg-amber-light transition-all btn-glow"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Direct Contact */}
              <div className="mt-6 p-6 md:p-8 border border-border rounded-sm">
                <p className="text-sm tracking-widest uppercase text-text-muted mb-6">Direct Contact</p>
                <a
                  href={`mailto:${socials.email}`}
                  className="block text-white hover:text-amber transition-colors mb-2"
                >
                  {socials.email}
                </a>
                <p className="text-text-muted text-sm">Based in Mumbai, India</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

// Main App with Router
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/live" element={<LivePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
