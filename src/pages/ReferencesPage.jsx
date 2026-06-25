import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LiquidButton from '../components/ui/LiquidButton'
import { useLanguage } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

function useScrollReveal(ref, opts = {}) {
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    gsap.fromTo(
      el,
      { opacity: 0, y: opts.y ?? 30 },
      {
        opacity: 1,
        y: 0,
        duration: opts.duration ?? 0.75,
        ease: 'power3.out',
        delay: opts.delay ?? 0,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      }
    )
  }, [])
}

function RevealBlock({ children, y = 30, delay = 0, style = {} }) {
  const ref = useRef(null)
  useScrollReveal(ref, { y, delay })
  return (
    <div ref={ref} style={{ opacity: 0, ...style }}>
      {children}
    </div>
  )
}

const GOLD = '#C9A84C'

function LogoTile({ client, index, learnMore }) {
  const logoSrc = typeof client.logo === 'string' && client.logo.trim().length > 0 ? client.logo.trim() : null
  const [imgBroken, setImgBroken] = useState(false)

  return (
    <RevealBlock delay={index * 0.08} style={{ height: '100%' }}>
      <div
        className="references-logo-cell"
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: '#0f0f12',
          borderRadius: 20,
          padding: 'clamp(28px, 4vw, 40px)',
          boxSizing: 'border-box',
          height: '100%',
        }}
      >
        {/* Logo */}
        <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          {logoSrc && !imgBroken ? (
            <img
              src={logoSrc}
              alt={client.name}
              draggable={false}
              onError={() => setImgBroken(true)}
              style={{ maxWidth: '100%', maxHeight: 110, objectFit: 'contain' }}
            />
          ) : (
            <span style={{ fontSize: 15, fontWeight: 700, color: '#fff', textAlign: 'center' }}>{client.name}</span>
          )}
        </div>

        {/* Divider */}
        <div style={{ width: 40, height: 2, background: GOLD, marginBottom: 20, flexShrink: 0 }} />

        {/* Title */}
        <h3 style={{ fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 700, color: '#fff', lineHeight: 1.25, margin: '0 0 14px' }}>
          {client.name}
        </h3>

        {/* Body */}
        {client.body && (
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, margin: '0 0 24px', flexGrow: 1 }}>
            {client.body}
          </p>
        )}

        {/* Website */}
        {client.website && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: GOLD, margin: '0 0 1px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Website:</p>
              <a
                href={client.websiteHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 13, color: '#fff', textDecoration: 'none' }}
              >
                {client.website}
              </a>
            </div>
          </div>
        )}

        {/* Button */}
        <a
          href={client.websiteHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            background: GOLD,
            color: '#000',
            fontWeight: 700,
            fontSize: 14,
            padding: '13px 20px',
            borderRadius: 10,
            textDecoration: 'none',
            letterSpacing: '0.01em',
          }}
        >
          <span>{learnMore}</span>
          <span>→</span>
        </a>
      </div>
    </RevealBlock>
  )
}

export default function ReferencesPage() {
  const { t } = useLanguage()
  const headRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(headRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: 0.05 })
  }, [])

  const handleGridEnter = () => gridRef.current?.classList.add('is-hovering')
  const handleGridLeave = () => gridRef.current?.classList.remove('is-hovering')

  const clients = Array.isArray(t('referencesPage.clients')) ? t('referencesPage.clients') : []

  return (
    <div>

      <section style={{ padding: '160px 40px 80px', background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div ref={headRef} style={{ opacity: 0, maxWidth: 1180, margin: '0 auto' }}>
          <Link
            to="/about"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: 'rgba(10,26,60,0.4)', textDecoration: 'none', letterSpacing: '0.02em', marginBottom: 28 }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A84C' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(10,26,60,0.4)' }}
          >
            ← {t('common.backTo')} {t('nav.about')}
          </Link>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 20 }}>
            {t('referencesPage.eyebrow')}
          </p>
          <h1 style={{ fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#0a0a0a', lineHeight: 1.0, margin: '0 0 24px' }}>
            {t('referencesPage.title')}
          </h1>
          <p style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', color: 'rgba(30,31,40,0.6)', lineHeight: 1.75, maxWidth: 680, letterSpacing: '-0.01em', margin: 0 }}>
            {t('referencesPage.intro')}
          </p>
        </div>
      </section>

      <section style={{ background: '#faf9f6', padding: 'clamp(56px, 9vw, 84px) clamp(24px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <RevealBlock>
            <p
              style={{
                fontSize: 'clamp(15px, 1.65vw, 17px)',
                color: 'rgba(10,26,60,0.74)',
                lineHeight: 1.85,
                letterSpacing: '-0.01em',
                margin: 0,
              }}
            >
              {t('referencesPage.spotlightBody')}
            </p>
          </RevealBlock>
        </div>
      </section>

      <section style={{ background: '#fff', padding: 'clamp(64px, 10vw, 110px) clamp(24px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <RevealBlock y={22}>
            <h2
              style={{
                fontSize: 'clamp(24px, 3.6vw, 40px)',
                fontWeight: 700,
                color: '#1a1200',
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                margin: '0 0 clamp(36px, 5vw, 52px)',
                maxWidth: 720,
              }}
            >
              {t('referencesPage.logosHeading')}
            </h2>
          </RevealBlock>

          <div
            ref={gridRef}
            className="references-logo-grid"
            style={{
              display: 'grid',
              gap: 'clamp(20px, 3vw, 32px)',
              gridTemplateColumns: 'repeat(3, 1fr)',
              alignItems: 'stretch',
            }}
            onMouseEnter={handleGridEnter}
            onMouseLeave={handleGridLeave}
          >
            {clients.map((c, i) => (
              <LogoTile key={c.slug || c.name || i} client={c} index={i} learnMore={t('referencesPage.learnMore')} />
            ))}
          </div>

          <RevealBlock delay={0.12} style={{ marginTop: 'clamp(48px, 7vw, 72px)', maxWidth: 720 }}>
            <p
              style={{
                fontSize: 'clamp(15px, 1.65vw, 17px)',
                color: 'rgba(10,26,60,0.68)',
                lineHeight: 1.82,
                margin: '0 0 28px',
              }}
            >
              {t('referencesPage.closing')}
            </p>
            <LiquidButton as={Link} to="/contact" tint="#C9A84C" textColor="#000">
              {t('nav.contact')}
            </LiquidButton>
          </RevealBlock>
        </div>
      </section>
    </div>
  )
}
