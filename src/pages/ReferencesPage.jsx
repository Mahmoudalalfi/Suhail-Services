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

function LogoTile({ client, index }) {
  const logoSrc = typeof client.logo === 'string' && client.logo.trim().length > 0 ? client.logo.trim() : null
  const [imgBroken, setImgBroken] = useState(false)
  const showPlaceholder = !logoSrc || imgBroken

  return (
    <RevealBlock delay={index * 0.022} style={{ height: '100%' }}>
      <div
        className="references-logo-cell"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'clamp(76px, 12vw, 104px)',
          padding: 'clamp(20px, 4vw, 36px) clamp(12px, 2.5vw, 28px)',
          boxSizing: 'border-box',
        }}
      >
        {!showPlaceholder ? (
          <img
            src={logoSrc}
            alt={client.name}
            draggable={false}
            onError={() => setImgBroken(true)}
            className="references-logo-img"
            style={{
              maxWidth: 'min(280px, 100%)',
              width: 'auto',
              height: 'auto',
              maxHeight: 'clamp(68px, 10vmin, 102px)',
              objectFit: 'contain',
            }}
          />
        ) : (
          <span
            className="references-logo-placeholder-text"
            style={{
              fontSize: 'clamp(13px, 1.65vw, 15px)',
              fontWeight: 600,
              textAlign: 'center',
              lineHeight: 1.45,
              letterSpacing: '-0.02em',
            }}
          >
            {client.name}
          </span>
        )}
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
            onMouseEnter={(e) => { e.currentTarget.style.color = '#1d4ed8' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(10,26,60,0.4)' }}
          >
            ← {t('common.backTo')} {t('nav.about')}
          </Link>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FACC15', marginBottom: 20 }}>
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
                color: '#0a1628',
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
              gap: 'clamp(28px, 5vw, 48px) clamp(20px, 4vw, 40px)',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(160px, 100%), 1fr))',
              alignItems: 'center',
            }}
            onMouseEnter={handleGridEnter}
            onMouseLeave={handleGridLeave}
          >
            {clients.map((c, i) => (
              <LogoTile key={c.slug || c.name || i} client={c} index={i} />
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
            <LiquidButton as={Link} to="/contact" tint="#FACC15" textColor="#000">
              {t('nav.contact')}
            </LiquidButton>
          </RevealBlock>
        </div>
      </section>
    </div>
  )
}
