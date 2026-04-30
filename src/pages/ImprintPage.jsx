import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const BLUE  = '#1d4ed8'
const YELLOW = '#FACC15'

const telHref = (display) => display.replace(/\s/g, '')

export default function ImprintPage() {
  const { t, lang } = useLanguage()
  const rootRef    = useRef(null)
  const headRef    = useRef(null)

  const lines      = Array.isArray(t('imprint.addressLines')) ? t('imprint.addressLines') : []
  const phones     = Array.isArray(t('imprint.phones'))        ? t('imprint.phones')       : []
  const sideGallery = Array.isArray(t('imprint.sideGallery'))  ? t('imprint.sideGallery')  : []

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.05 }
      )
      gsap.set(root.querySelectorAll('.imprint-scroll-item'), { opacity: 0, y: 36 })
      ScrollTrigger.batch('.imprint-scroll-item', {
        interval: 0.06, batchMax: 10, start: 'top 88%', once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', clearProps: 'transform' }),
      })
    }, root)
    return () => ctx.revert()
  }, [lang])

  return (
    <div ref={rootRef} style={{ background: '#fff', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section style={{ padding: '160px 40px 80px', background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div ref={headRef} style={{ opacity: 0, maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: YELLOW, marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>
            {lang === 'de' ? 'Rechtliches' : 'Legal'}
          </p>
          <h1 style={{ fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#0a0a0a', lineHeight: 1.0, margin: 0 }}>
            {t('imprint.title')}
          </h1>
        </div>
      </section>

      {/* ── Body ── */}
      <section style={{ padding: '72px 40px 120px', maxWidth: 1100, margin: '0 auto' }}>
        <div className="imprint-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,300px) minmax(0,1fr)', gap: 'clamp(32px,5vw,72px)', alignItems: 'start' }}>

          {/* LEFT — photo stack */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {sideGallery.map((panel) => (
              <div
                key={panel.image}
                className="imprint-photo-card"
                style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', aspectRatio: '4/5', maxHeight: 360, background: '#000' }}
              >
                <img
                  className="imprint-side-img"
                  src={panel.image}
                  alt={panel.alt}
                  style={{ position: 'absolute', top: '-6%', left: 0, width: '100%', height: '115%', objectFit: 'cover', objectPosition: 'center top', willChange: 'transform' }}
                />
                <div style={{ position: 'absolute', inset: 'auto 0 0 0', background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)', padding: '32px 18px 16px' }}>
                  <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', color: '#fff', textTransform: 'uppercase', margin: 0 }}>
                    {panel.strap}
                  </p>
                </div>
              </div>
            ))}
          </aside>

          {/* RIGHT — legal info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

            {/* Company */}
            <div className="imprint-scroll-item" style={{ paddingBottom: 36, borderBottom: '1px solid rgba(0,0,0,0.07)', marginBottom: 36 }}>
              <Label>{lang === 'de' ? 'Firma & Anschrift' : 'Company & Address'}</Label>
              <p style={{ fontSize: 20, fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em', margin: '0 0 8px' }}>
                {t('imprint.companyName')}
              </p>
              {lines.map((line) => (
                <p key={line} style={{ fontSize: 16, color: 'rgba(30,31,40,0.7)', lineHeight: 1.6, margin: '2px 0 0' }}>{line}</p>
              ))}
            </div>

            {/* Rep */}
            <div className="imprint-scroll-item" style={{ paddingBottom: 36, borderBottom: '1px solid rgba(0,0,0,0.07)', marginBottom: 36 }}>
              <Label>{t('imprint.representedByTitle')}</Label>
              <p style={{ fontSize: 16, color: 'rgba(30,31,40,0.75)', lineHeight: 1.7 }}>{t('imprint.representedBy')}</p>
            </div>

            {/* Contact */}
            <div className="imprint-scroll-item" style={{ paddingBottom: 36, borderBottom: '1px solid rgba(0,0,0,0.07)', marginBottom: 36 }}>
              <Label>{t('imprint.contactTitle')}</Label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <ContactRow icon="✉">
                  <a href={`mailto:${t('imprint.email')}`} style={{ fontSize: 16, color: BLUE, textDecoration: 'none', borderBottom: `1px solid ${BLUE}44`, paddingBottom: 1, transition: 'border-color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.borderBottomColor = BLUE}
                    onMouseLeave={e => e.currentTarget.style.borderBottomColor = `${BLUE}44`}
                  >
                    {t('imprint.email')}
                  </a>
                </ContactRow>
                {phones.map((p) => (
                  <ContactRow key={p} icon="☎">
                    <a href={`tel:${telHref(p)}`} style={{ fontSize: 16, color: '#0a0a0a', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = BLUE}
                      onMouseLeave={e => e.currentTarget.style.color = '#0a0a0a'}
                    >
                      {p}
                    </a>
                  </ContactRow>
                ))}
              </div>
            </div>

            {/* VAT */}
            <div className="imprint-scroll-item" style={{ paddingBottom: 36, borderBottom: '1px solid rgba(0,0,0,0.07)', marginBottom: 36 }}>
              <Label>{t('imprint.vatTitle')}</Label>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 22, letterSpacing: '0.04em', color: '#0a0a0a' }}>
                {t('imprint.vatNumber')}
              </p>
            </div>

            {/* Data protection teaser */}
            <div className="imprint-scroll-item" style={{ paddingBottom: 36, borderBottom: '1px solid rgba(0,0,0,0.07)', marginBottom: 36 }}>
              <Label>{t('imprint.dpTeaserTitle')}</Label>
              <p style={{ fontSize: 15, color: 'rgba(30,31,40,0.65)', lineHeight: 1.7, marginBottom: 16 }}>{t('imprint.dpTeaserBody')}</p>
              <Link to="/data-protection" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                color: BLUE, textDecoration: 'none',
                borderBottom: `2px solid ${YELLOW}`, paddingBottom: 2,
              }}>
                {t('imprint.dpTeaserCta')} →
              </Link>
            </div>

            {/* Disclaimer + copyright */}
            <div className="imprint-scroll-item" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div style={{ background: '#f8f9fc', borderRadius: 12, padding: '24px 20px' }}>
                <Label>{t('imprint.disclaimerTitle')}</Label>
                <p style={{ fontSize: 14, color: 'rgba(30,31,40,0.6)', lineHeight: 1.7, margin: 0 }}>{t('imprint.disclaimerBody')}</p>
              </div>
              <div style={{ background: '#f8f9fc', borderRadius: 12, padding: '24px 20px' }}>
                <Label>{t('imprint.copyrightTitle')}</Label>
                <p style={{ fontSize: 14, color: 'rgba(30,31,40,0.6)', lineHeight: 1.7, margin: 0 }}>{t('imprint.copyrightBody')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) { .imprint-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}

function Label({ children }) {
  return (
    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: YELLOW, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>
      {children}
    </p>
  )
}

function ContactRow({ icon, children }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <span style={{
        flexShrink: 0, width: 30, height: 30,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: '50%', background: `${YELLOW}22`,
        border: `1px solid ${YELLOW}55`, fontSize: 13,
      }}>
        {icon}
      </span>
      <div>{children}</div>
    </div>
  )
}
