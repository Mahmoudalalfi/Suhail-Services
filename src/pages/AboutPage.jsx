import { useEffect, useRef } from 'react'
import useSEO from '../hooks/useSEO'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'
import LiquidButton from '../components/ui/LiquidButton'

gsap.registerPlugin(ScrollTrigger)

const GOLD = '#C9A84C'

const PILLAR_ICONS = {
  security: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  ),
  cleaning: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/>
      <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>
    </svg>
  ),
  facility: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20"/>
      <path d="M5 20V8l7-5 7 5v12"/>
      <path d="M9 20v-5h6v5"/>
      <path d="M9 9h1v1H9zM14 9h1v1h-1zM9 13h1v1H9zM14 13h1v1h-1z"/>
    </svg>
  ),
  logistics: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  construction: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/>
      <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/>
      <path d="M4 15v-3a6 6 0 0 1 6-6"/>
      <path d="M14 6a6 6 0 0 1 6 6v3"/>
    </svg>
  ),
}

const VALUE_ICONS = {
  reliable: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  personal: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  trust: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  quality: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
}

function useScrollReveal(ref, opts = {}) {
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    gsap.fromTo(el,
      { opacity: 0, y: opts.y ?? 40 },
      {
        opacity: 1, y: 0,
        duration: opts.duration ?? 0.85,
        ease: opts.ease ?? 'power3.out',
        delay: opts.delay ?? 0,
        scrollTrigger: { trigger: el, start: opts.start ?? 'top 82%', once: true },
      }
    )
  }, [])
}

function RevealBlock({ children, y = 40, delay = 0, style = {} }) {
  const ref = useRef(null)
  useScrollReveal(ref, { y, delay })
  return <div ref={ref} style={{ opacity: 0, ...style }}>{children}</div>
}

export default function AboutPage() {
  const { t, lang } = useLanguage()
  useSEO({
    title: 'Über uns — Suhaili Service GmbH',
    description: 'Erfahren Sie mehr über Suhaili Service GmbH: unsere Geschichte, Werte und unser Team in Berlin.',
    canonical: 'https://www.suhaili-services.de/about',
  })
  const heroRef = useRef(null)

  const pillars = Array.isArray(t('about.pillars')) ? t('about.pillars') : []
  const values = Array.isArray(t('about.values')) ? t('about.values') : []

  useEffect(() => {
    if (!heroRef.current) return
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 }
    )
  }, [])

  return (
    <div style={{ background: '#fff' }}>

      {/* ── Hero ── */}
      <section className="about-page-hero" style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
      }}>
        <img
          src={t('about.heroImage')}
          alt={t('about.heroImageAlt')}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          className="about-hero-img"
        />
        <style>{`
          @media (max-width: 768px) {
            .about-hero-img { object-position: 75% center !important; }
          }
        `}</style>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(8,8,12,0.15) 0%, rgba(8,8,12,0.55) 55%, rgba(8,8,12,0.82) 100%)',
        }} />
        <div
          ref={heroRef}
          style={{
            position: 'relative',
            zIndex: 1,
            opacity: 0,
            width: '100%',
            maxWidth: 1200,
            margin: '0 auto',
            padding: 'clamp(100px, 14vw, 140px) clamp(20px, 5vw, 40px) clamp(56px, 8vw, 80px)',
          }}
        >
          <h1 style={{
            fontSize: 'clamp(34px, 5.8vw, 68px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: '#fff',
            lineHeight: 1.08,
            margin: '0 0 20px',
            maxWidth: 900,
          }}>
            {t('about.heroTitleLead')}{' '}
            <span style={{ color: GOLD }}>{t('about.heroTitleAccent')}</span>
          </h1>
          <p style={{
            fontSize: 'clamp(15px, 1.7vw, 19px)',
            color: 'rgba(255,255,255,0.82)',
            lineHeight: 1.65,
            maxWidth: 640,
            margin: '0 0 32px',
          }}>
            {t('about.heroSub')}
          </p>
          <LiquidButton as={Link} to={t('about.learnMoreHref') || '/contact'} tint={GOLD} textColor="#000">
            {t('about.learnMoreLabel')} →
          </LiquidButton>
        </div>
      </section>

      {/* ── Intro ── */}
      <section style={{ padding: 'clamp(64px, 9vw, 96px) clamp(20px, 5vw, 40px)' }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(28px, 4vw, 64px)',
          alignItems: 'start',
        }}>
          <RevealBlock>
            <p style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: GOLD,
              marginBottom: 16,
            }}>
              {t('about.aboutEyebrow')}
            </p>
            <h2 style={{
              fontSize: 'clamp(26px, 3.8vw, 44px)',
              fontWeight: 700,
              color: '#0a0a0a',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              margin: 0,
            }}>
              {t('about.aboutHeading')}
            </h2>
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <p style={{
              fontSize: 'clamp(15px, 1.6vw, 17px)',
              color: 'rgba(30,31,40,0.62)',
              lineHeight: 1.75,
              margin: 0,
            }}>
              {t('about.aboutIntro')}
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* ── Service pillars ── */}
      <section style={{ padding: '0 clamp(20px, 5vw, 40px) clamp(72px, 10vw, 96px)' }}>
        <div className="about-pillars-grid" style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 'clamp(20px, 3vw, 32px)',
        }}>
          {pillars.map((pillar, i) => (
            <RevealBlock key={pillar.id || i} delay={i * 0.06}>
              <div style={{ textAlign: 'center', padding: '0 8px' }}>
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  border: `2px solid ${GOLD}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 18px',
                  color: GOLD,
                }}>
                  {PILLAR_ICONS[pillar.icon] || PILLAR_ICONS.cleaning}
                </div>
                <p style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 'clamp(15px, 1.4vw, 17px)',
                  fontWeight: 700,
                  color: '#0a0a0a',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  margin: '0 0 10px',
                }}>
                  {pillar.title}
                </p>
                <p style={{
                  fontSize: 13,
                  color: 'rgba(30,31,40,0.58)',
                  lineHeight: 1.65,
                  margin: 0,
                }}>
                  {pillar.desc}
                </p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ── Quality section ── */}
      <section className="about-quality-section" style={{
        background: '#0f0f12',
        padding: 'clamp(48px, 7vw, 80px) clamp(20px, 6vw, 80px)',
        marginTop: 8,
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'center',
        }}>
          <RevealBlock>
            <h2 style={{
              fontSize: 'clamp(22px, 3vw, 36px)',
              fontWeight: 700,
              color: GOLD,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              margin: '0 0 12px',
            }}>
              {t('about.qualityTitle')}
            </h2>
            {/* gold underline */}
            <div style={{ width: 36, height: 3, borderRadius: 2, background: GOLD, margin: '0 0 20px' }} />
            <p style={{
              fontSize: 'clamp(14px, 1.4vw, 15px)',
              color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.7,
              margin: '0 0 14px',
            }}>
              {t('about.qualityP1')}
            </p>
            <p style={{
              fontSize: 'clamp(14px, 1.4vw, 15px)',
              color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.7,
              margin: '0 0 28px',
            }}>
              {t('about.qualityP2')}
            </p>
            <div className="about-values-row" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 12,
            }}>
              {values.map((v, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 10px',
                    color: GOLD,
                  }}>
                    {VALUE_ICONS[v.icon] || VALUE_ICONS.reliable}
                  </div>
                  <p style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.9)',
                    margin: 0,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}>
                    {v.label}
                  </p>
                </div>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.12}>
            <div style={{
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(0,0,0,0.55)',
            }}>
              <img
                src={t('https://res.cloudinary.com/df7aiznm6/image/upload/v1782403795/Companys_Board_slij2w.png')}
                alt={t('about.qualityImageAlt')}
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
            </div>
          </RevealBlock>
        </div>
      </section>


      {/* ── Service ticker ── */}
      <div style={{
        background: `linear-gradient(90deg, #b8860b 0%, #e8c84a 35%, #f5d76e 55%, #c9a020 100%)`,
        overflow: 'hidden',
        position: 'relative',
        height: 56,
        display: 'flex',
        alignItems: 'center',
      }}>
        {/* fade edges */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, #b8860b, transparent)', zIndex: 2 }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, #c9a020, transparent)', zIndex: 2 }} />
        <div className="ticker-track">
          {[1, 2].map(copy => (
            <div key={copy} className="ticker-set" aria-hidden={copy === 2}>
              {[
                { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>, label: lang === 'de' ? 'Sicherheit' : 'Security' },
                { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>, label: lang === 'de' ? 'Reinigung' : 'Cleaning' },
                { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20"/><path d="M5 20V8l7-5 7 5v12"/><path d="M9 20v-5h6v5"/></svg>, label: lang === 'de' ? 'Gebäudeservice' : 'Facility Service' },
                { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, label: lang === 'de' ? 'Lager & Logistik' : 'Warehouse & Logistics' },
                { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a6 6 0 0 1 6-6"/><path d="M14 6a6 6 0 0 1 6 6v3"/></svg>, label: lang === 'de' ? 'Baustellenservice' : 'Construction Service' },
              ].map((item, i, arr) => (
                <span key={i} className="ticker-item">
                  <span className="ticker-item-icon">{item.icon}</span>
                  <span className="ticker-item-label">{item.label}</span>
                  {i < arr.length - 1 && <span className="ticker-dot">◆</span>}
                </span>
              ))}
              <span className="ticker-dot" style={{ marginRight: 28 }}>◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Partner companies ── */}
      <section style={{ background: '#fff', padding: 'clamp(56px, 10vw, 96px) clamp(24px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <RevealBlock>
            <h2 style={{
              fontSize: 'clamp(24px, 3.6vw, 40px)',
              fontWeight: 700,
              color: '#1a1200',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              margin: '0 0 clamp(36px, 5vw, 52px)',
              maxWidth: 720,
            }}>
              {t('referencesPage.logosHeading')}
            </h2>
          </RevealBlock>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(20px, 3vw, 32px)',
            alignItems: 'stretch',
          }}
            className="about-partner-cards"
          >
            {(Array.isArray(t('referencesPage.clients')) ? t('referencesPage.clients') : []).map((client, i) => {
              const BRAND_COLOR = {
                'suhaili-security': '#e03535',
                'crystal-dbc':      '#3b8beb',
                'aufsteig':         '#a8b8c8',
              }[client.slug] || GOLD
              const bc = BRAND_COLOR

              return (
              <RevealBlock key={client.slug || i} delay={i * 0.08} style={{ height: '100%' }}>
                <a
                  href={client.websiteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="partner-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'linear-gradient(160deg, #1a1a1f 0%, #0d0d10 100%)',
                    borderRadius: 24,
                    border: `1px solid ${bc}30`,
                    boxShadow: `0 2px 0 0 ${bc}18 inset, 0 24px 48px rgba(0,0,0,0.45)`,
                    padding: 'clamp(28px, 4vw, 40px)',
                    boxSizing: 'border-box',
                    height: '100%',
                    textDecoration: 'none',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-6px)'
                    e.currentTarget.style.boxShadow = `0 2px 0 0 ${bc}40 inset, 0 32px 64px rgba(0,0,0,0.55), 0 0 0 1px ${bc}55`
                    e.currentTarget.style.borderColor = `${bc}70`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = `0 2px 0 0 ${bc}18 inset, 0 24px 48px rgba(0,0,0,0.45)`
                    e.currentTarget.style.borderColor = `${bc}30`
                  }}
                >
                  {/* brand radial glow */}
                  <div style={{
                    position: 'absolute', top: -40, right: -40, width: 180, height: 180,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${bc}14 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }} />

                  {/* logo area */}
                  <div style={{
                    height: 120,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 28,
                  }}>
                    <img src={client.logo} alt={client.name} style={{ maxWidth: '80%', maxHeight: 100, objectFit: 'contain' }} />
                  </div>


                  <h3 style={{ fontSize: 'clamp(17px, 1.8vw, 21px)', fontWeight: 700, color: '#fff', lineHeight: 1.25, margin: '0 0 12px', letterSpacing: '-0.01em' }}>
                    {client.name}
                  </h3>

                  {client.body && (
                    <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.52)', lineHeight: 1.75, margin: '0 0 auto', paddingBottom: 24, flexGrow: 1 }}>
                      {client.body}
                    </p>
                  )}

                  {/* footer row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={bc} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                      </svg>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{client.website}</span>
                    </div>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      background: `${bc}18`,
                      border: `1px solid ${bc}40`,
                      borderRadius: 999,
                      padding: '5px 14px',
                      fontSize: 12, fontWeight: 600, color: bc,
                      letterSpacing: '0.02em',
                    }}>
                      {t('referencesPage.learnMore')}
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={bc} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </a>
              </RevealBlock>
              )
            })}
          </div>
        </div>
      </section>

    </div>
  )
}
