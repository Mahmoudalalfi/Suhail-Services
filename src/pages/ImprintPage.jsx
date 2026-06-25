import { useLayoutEffect, useRef } from 'react'
import useSEO from '../hooks/useSEO'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const GOLD = '#C9A84C'

const INFO_ITEMS = (lang) => [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/>
      </svg>
    ),
    label: lang === 'de' ? 'Firmenname' : 'Company Name',
    value: 'Suhaili Service GmbH',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: lang === 'de' ? 'Anschrift' : 'Address',
    value: 'Ritterlandweg 2\n13409 Berlin\nDeutschland',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    label: lang === 'de' ? 'Geschäftsführer' : 'Managing Director',
    value: 'Al-Suhaili',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    label: lang === 'de' ? 'Handelsregister' : 'Commercial Register',
    value: 'Amtsgericht Charlottenburg (Berlin)\nHRB 271848 B',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.07 3.4 2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/>
      </svg>
    ),
    label: lang === 'de' ? 'Telefon' : 'Phone',
    value: '+49 176 41180455',
    href: 'tel:+4917641180455',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'E-Mail',
    value: 'Services@suhaili.de\nInfo.Services@suhaili.de\nKontakt.Services@suhaili.de',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    label: 'Website',
    value: 'suhaili-services.de',
    href: 'https://www.suhaili-services.de',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    label: lang === 'de' ? 'Verantwortlich für den Inhalt gemäß § 55 Abs. 2 RStV' : 'Responsible for content (§ 55 Abs. 2 RStV)',
    value: 'Al-Suhaili\nRitterlandweg 2\n13409 Berlin\nDeutschland',
  },
]

const CONTACT_ITEMS = (lang) => [
  { icon: '📍', value: 'Berlin, Deutschland' },
  { icon: '📞', value: '+49 176 41180455', href: 'tel:+4917641180455' },
  { icon: '✉', value: 'Services@suhaili.de', href: 'mailto:Services@suhaili.de' },
  { icon: '🌐', value: 'www.suhaili-services.de', href: 'https://www.suhaili-services.de' },
]

const PARTNER_COMPANIES = (lang) => [
  {
    logo: 'https://res.cloudinary.com/df7aiznm6/image/upload/v1782404488/SuhailSecurityLogo-ZlSrAnyF_iwq20v.png',
    name: lang === 'de' ? 'Suhaili Security UG' : 'Suhaili Security UG',
    body: lang === 'de' ? 'Sicherheitslösungen mit Vertrauen und Verantwortung.' : 'Security solutions with trust and responsibility.',
    website: 'www.suhaili-security.de',
    href: 'https://www.suhaili-security.de',
  },
  {
    logo: 'https://res.cloudinary.com/df7aiznm6/image/upload/v1782404563/crystaldbclogo_sip4su.png',
    name: 'Crystal DBC Real Estate L.L.C',
    body: lang === 'de' ? 'Immobilien & Investments auf höchstem Niveau.' : 'Real estate & investments at the highest level.',
    website: 'www.crystaldbc.com',
    href: 'https://www.crystaldbc.com',
  },
  {
    logo: 'https://res.cloudinary.com/df7aiznm6/image/upload/v1782404393/aufsteig-logo_t8sygm.png',
    name: 'AT Aufsteig Technik GmbH',
    body: lang === 'de' ? 'Technische Gebäudelösungen und Aufzugstechnik für höchste Ansprüche.' : 'Technical building solutions and elevator technology.',
    website: 'www.aufsteigtechnik.de',
    href: 'https://www.aufsteigtechnik.de',
  },
]

export default function ImprintPage() {
  const { t, lang } = useLanguage()
  useSEO({
    title: 'Impressum — Suhaili Service GmbH',
    description: 'Impressum der Suhaili Service GmbH, Ritterlandweg 2, 13409 Berlin. Alle rechtlich erforderlichen Angaben.',
    canonical: 'https://www.suhaili-services.de/imprint',
  })
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const ctx = gsap.context(() => {
      gsap.fromTo(root.querySelectorAll('.imp-fade'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out', delay: 0.1 }
      )
    }, root)
    return () => ctx.revert()
  }, [lang])

  const infoItems = INFO_ITEMS(lang)
  const partners = PARTNER_COMPANIES(lang)

  return (
    <div ref={rootRef} style={{ background: '#fff', minHeight: '100vh', color: '#0a0a0a' }}>

      {/* ── Hero ── */}
      <section style={{
        position: 'relative',
        minHeight: 'clamp(300px, 45vh, 460px)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="https://res.cloudinary.com/df7aiznm6/image/upload/v1782406685/Imprint1_pmdri1.png"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.55) 60%, rgba(10,10,10,0.3) 100%)' }} />
        </div>
        <div className="imp-fade" style={{ position: 'relative', zIndex: 1, padding: 'clamp(100px,12vw,140px) clamp(20px,5vw,60px) clamp(56px,8vw,80px)', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: GOLD, marginBottom: 14 }}>
            {lang === 'de' ? 'RECHTLICHES' : 'LEGAL'}
          </p>
          <h1 style={{ fontSize: 'clamp(42px, 6.5vw, 80px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.0, color: '#fff', margin: '0 0 18px' }}>
            {lang === 'de' ? 'Impressum' : 'Imprint'}
          </h1>
          <p style={{ fontSize: 'clamp(14px, 1.5vw, 17px)', color: 'rgba(255,255,255,0.7)', maxWidth: 480, lineHeight: 1.7, margin: 0 }}>
            {lang === 'de'
              ? 'Transparenz und Vertrauen sind die Basis unseres Handelns. Hier finden Sie alle rechtlich erforderlichen Informationen zu unserem Unternehmen.'
              : 'Transparency and trust are the foundation of our actions. Here you will find all legally required information about our company.'}
          </p>
        </div>
      </section>

      {/* ── Main grid ── */}
      <section style={{ padding: 'clamp(48px,7vw,80px) clamp(20px,5vw,60px)', maxWidth: 1200, margin: '0 auto' }}>
        <div className="imprint-main-grid">

          {/* LEFT — legal info card */}
          <div className="imp-fade" style={{ background: '#f5f5f5', borderRadius: 20, padding: 'clamp(24px,4vw,40px)', border: '1px solid rgba(0,0,0,0.07)' }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: GOLD, marginBottom: 24 }}>
              {lang === 'de' ? 'RECHTLICHE ANGABEN' : 'LEGAL DETAILS'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {infoItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: i < infoItems.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none' }}>
                  <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 10, background: 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, color: GOLD, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 4px' }}>{item.label}</p>
                    {item.value.split('\n').map((line, j) => (
                      item.href && j === 0
                        ? <a key={j} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ display: 'block', fontSize: 14, color: 'rgba(30,31,40,0.85)', lineHeight: 1.6, textDecoration: 'none', fontWeight: item.href.startsWith('tel:') ? 700 : 400 }}
                            onMouseEnter={e => e.currentTarget.style.color = GOLD}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(30,31,40,0.85)'}
                          >{line}</a>
                        : <p key={j} style={{ fontSize: 14, color: 'rgba(30,31,40,0.85)', lineHeight: 1.6, margin: 0 }}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — images + map + contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Image 1 tall */}
            <div className="imp-fade" style={{ borderRadius: 20, overflow: 'hidden', height: 'clamp(260px, 32vw, 420px)' }}>
              <img
                src="https://res.cloudinary.com/df7aiznm6/image/upload/v1782406685/Imprint1_pmdri1.png"
                alt="Suhaili Service GmbH office building"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>

            {/* Image 2 + map side by side */}
            <div className="imp-fade" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {/* Map */}
              <div style={{ borderRadius: 20, overflow: 'hidden', minHeight: 200, position: 'relative' }}>
                <iframe
                  title="Suhaili Service GmbH Berlin"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1212!2d13.3498!3d52.5712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c655f20989%3A0x26bbf4a487fd4dad!2sRitterlandweg%202%2C%2013409%20Berlin!5e0!3m2!1sen!2sde!4v1700000000000!5m2!1sen!2sde"
                  width="100%"
                  height="240"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', padding: '24px 16px 10px', display: 'flex', alignItems: 'center', gap: 8, pointerEvents: 'none' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span style={{ fontSize: 12, color: '#fff', fontWeight: 500 }}>Ritterlandweg 2, 13409 Berlin</span>
                </div>
              </div>

              {/* Image 2 */}
              <div style={{ borderRadius: 20, overflow: 'hidden', minHeight: 200 }}>
                <img
                  src="https://res.cloudinary.com/df7aiznm6/image/upload/v1782407867/Imprint2_btiwsf.png"
                  alt="Suhaili Service GmbH"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>
            </div>

            {/* Contact card */}
            <div className="imp-fade" style={{ background: '#f5f5f5', borderRadius: 20, padding: 'clamp(20px,3vw,32px)', border: '1px solid rgba(0,0,0,0.07)' }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: GOLD, marginBottom: 20 }}>
                {lang === 'de' ? 'KONTAKTIEREN SIE UNS' : 'CONTACT US'}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, value: 'Berlin, Deutschland' },
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.07 3.4 2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/></svg>, value: '+49 176 41180455', href: 'tel:+4917641180455', bold: true },
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, value: 'Services@suhaili.de', href: 'mailto:Services@suhaili.de' },
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, value: 'suhaili-services.de', href: 'https://www.suhaili-services.de' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 8, background: 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {item.icon}
                    </div>
                    {item.href
                      ? <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ fontSize: 14, color: 'rgba(30,31,40,0.75)', textDecoration: 'none', fontWeight: item.bold ? 700 : 400 }}
                          onMouseEnter={e => e.currentTarget.style.color = GOLD}
                          onMouseLeave={e => e.currentTarget.style.color = 'rgba(30,31,40,0.75)'}
                        >{item.value}</a>
                      : <span style={{ fontSize: 14, color: 'rgba(30,31,40,0.75)' }}>{item.value}</span>
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Partner companies ── */}
      <section style={{ padding: 'clamp(48px,7vw,80px) clamp(20px,5vw,60px)', borderTop: '1px solid rgba(0,0,0,0.07)', maxWidth: 1200, margin: '0 auto' }}>
        <div className="imp-fade" style={{ textAlign: 'center', marginBottom: 'clamp(32px,5vw,52px)' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: GOLD, marginBottom: 12 }}>
            {lang === 'de' ? 'DIE SUHAILI GROUP' : 'THE SUHAILI GROUP'}
          </p>
          <h2 style={{ fontSize: 'clamp(22px,3vw,34px)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em', margin: 0 }}>
            {lang === 'de' ? 'Gemeinsam stark. Für eine bessere Zukunft.' : 'Stronger together. For a better future.'}
          </h2>
        </div>
        <div className="imprint-partner-grid">
          {partners.map((p, i) => (
            <div key={i} className="imp-fade" style={{ background: '#0f0f12', borderRadius: 20, padding: 'clamp(24px,3vw,36px)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16 }}>
              <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={p.logo} alt={p.name} style={{ maxHeight: 110, maxWidth: '100%', objectFit: 'contain' }} />
              </div>
              <div style={{ width: 32, height: 2, background: GOLD }} />
              <h3 style={{ fontSize: 'clamp(16px,1.8vw,19px)', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.3 }}>{p.name}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, margin: 0, flexGrow: 1 }}>{p.body}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <a href={p.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.color = GOLD}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                >{p.website}</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .imprint-main-grid {
          display: grid;
          grid-template-columns: minmax(0, 420px) minmax(0, 1fr);
          gap: clamp(20px, 3vw, 32px);
          align-items: start;
        }
        .imprint-partner-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 2.5vw, 28px);
        }
        @media (max-width: 900px) {
          .imprint-main-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .imprint-partner-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
