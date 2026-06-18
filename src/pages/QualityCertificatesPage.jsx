import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'
import CertBadge from '../components/ui/CertBadge'
import LiquidButton from '../components/ui/LiquidButton'

gsap.registerPlugin(ScrollTrigger)

function useScrollReveal(ref, opts = {}) {
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    gsap.fromTo(
      el,
      { opacity: 0, y: opts.y ?? 26 },
      {
        opacity: 1,
        y: 0,
        duration: opts.duration ?? 0.72,
        ease: 'power3.out',
        delay: opts.delay ?? 0,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }
    )
  }, [])
}

function RevealBlock({ children, y = 26, delay = 0, style = {} }) {
  const ref = useRef(null)
  useScrollReveal(ref, { y, delay })
  return (
    <div ref={ref} style={{ opacity: 0, ...style }}>
      {children}
    </div>
  )
}

function BulletRing({ style = {} }) {
  return <span className="quality-bullet-ring" style={style} aria-hidden />
}

/** Minimal illustration — documents + accent (+ inspired layouts, original SVG) */
function GraphicCommunication() {
  return (
    <svg width={220} height={176} viewBox="0 0 220 176" aria-hidden className="quality-graphic-svg">
      <rect x="12" y="22" width="96" height="122" rx="12" fill="#e4e9ef" transform="rotate(-8 60 83)" />
      <rect x="44" y="38" width="104" height="128" rx="12" fill="#ffffff" stroke="rgba(10,26,60,0.09)" strokeWidth="1" transform="rotate(-4 96 102)" />
      <rect x="58" y="54" width="22" height="22" rx="4" fill="#1B3A7A" />
      <rect x="88" y="58" width="48" height="5" rx="2" fill="#d6dce6" />
      <rect x="88" y="70" width="40" height="5" rx="2" fill="#d6dce6" />
      <rect x="88" y="82" width="52" height="5" rx="2" fill="#d6dce6" />
      <circle cx="188" cy="138" r="26" fill="#1B3A7A" />
      <path d="M188 125v26M175 138h26" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

function GraphicIdeas() {
  return (
    <svg width={220} height={176} viewBox="0 0 220 176" aria-hidden className="quality-graphic-svg">
      <ellipse cx="108" cy="112" rx="56" ry="36" fill="#eef2f8" />
      <circle cx="108" cy="66" r="22" fill="#dce4ee" />
      <path d="M98 84q10 14 20 0" fill="none" stroke="#b8c4d4" strokeWidth="3" strokeLinecap="round" />
      <rect x="28" y="38" width="68" height="88" rx="10" fill="#fff" stroke="rgba(10,26,60,0.08)" />
      <rect x="124" y="48" width="68" height="88" rx="10" fill="#ffffff" stroke="rgba(10,26,60,0.08)" />
      <circle cx="44" cy="58" r="7" fill="#1B3A7A" />
      <path d="M40 58l3 3 7-7" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="140" cy="66" r="7" fill="#1B3A7A" />
      <path d="M136 66l3 3 7-7" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="156" cy="96" r="7" fill="#1B3A7A" />
      <path d="M152 96l3 3 7-7" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="42" y="76" width="40" height="4" rx="1" fill="#d6dce6" />
      <rect x="42" y="88" width="32" height="4" rx="1" fill="#d6dce6" />
      <rect x="138" y="84" width="40" height="4" rx="1" fill="#d6dce6" />
      <rect x="138" y="96" width="28" height="4" rx="1" fill="#d6dce6" />
    </svg>
  )
}

function PillarBulletRow({ title, body, index, isLast }) {
  return (
    <RevealBlock delay={index * 0.05}>
      <div
        style={{
          display: 'flex',
          gap: 18,
          alignItems: 'flex-start',
          paddingBottom: 'clamp(22px, 3vw, 32px)',
          marginBottom: 6,
          borderBottom: isLast ? 'none' : '1px solid rgba(10,26,60,0.08)',
        }}
      >
        <BulletRing />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            fontSize: 'clamp(17px, 2vw, 19px)',
            fontWeight: 700,
            color: '#1d4ed8',
            letterSpacing: '-0.02em',
            margin: '0 0 12px',
          }}>
            {title}
          </h3>
          <p style={{
            fontSize: 'clamp(14px, 1.5vw, 15px)',
            color: 'rgba(10,26,60,0.72)',
            lineHeight: 1.78,
            margin: 0,
          }}>
            {body}
          </p>
        </div>
      </div>
    </RevealBlock>
  )
}

function SplitFeature({ title, body, graphic }) {
  return (
    <RevealBlock>
      <div className="quality-split">
        <div className="quality-split__viz" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {graphic}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <BulletRing style={{ marginTop: 3 }} />
            <h3 style={{
              fontSize: 'clamp(18px, 2.2vw, 22px)',
              fontWeight: 700,
              color: '#1d4ed8',
              letterSpacing: '-0.02em',
              margin: 0,
            }}>
              {title}
            </h3>
          </div>
          <p style={{
            fontSize: 'clamp(14px, 1.55vw, 16px)',
            color: 'rgba(10,26,60,0.74)',
            lineHeight: 1.82,
            margin: 0,
            whiteSpace: 'pre-line',
          }}>
            {body}
          </p>
        </div>
      </div>
    </RevealBlock>
  )
}

export default function QualityCertificatesPage() {
  const { t } = useLanguage()
  const headRef = useRef(null)
  const qualityHeroClipRef = useRef(null)
  const qualityHeroParallaxRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(headRef.current, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', delay: 0.04 })
  }, [])

  useEffect(() => {
    const inner = qualityHeroParallaxRef.current
    const outer = qualityHeroClipRef.current
    if (!inner || !outer) return
    const ctx = gsap.context(() => {
      gsap.to(inner, {
        yPercent: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: outer,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      })
    }, outer)
    return () => ctx.revert()
  }, [])

  const pillarsTop = Array.isArray(t('qualityPage.pillarsTop')) ? t('qualityPage.pillarsTop') : []
  const standardsList = Array.isArray(t('qualityPage.standardsList')) ? t('qualityPage.standardsList') : []

  const heroImg = t('qualityPage.heroImage') || 'https://res.cloudinary.com/df7aiznm6/image/upload/v1777490771/suhail-services/quality-hero-certified.png'
  const heroAlt = t('qualityPage.heroImageAlt') || ''

  return (
    <div style={{ background: '#fff' }}>

      {/* Hero */}
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
          <p className="navy-text" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20 }}>
            {t('qualityPage.eyebrowMuted')}
          </p>
          <h1 style={{ fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#0a0a0a', lineHeight: 1.0, margin: '0 0 24px' }}>
            {t('qualityPage.title')}
          </h1>
        </div>
      </section>

      <section style={{ padding: '56px 40px 96px' }}>
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            display: 'grid',
            gap: 'clamp(36px, 6vw, 64px)',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            alignItems: 'start',
          }}
        >
          <div style={{ minWidth: 0 }}>
            <p style={{
              fontSize: 'clamp(15px, 1.65vw, 17px)',
              color: 'rgba(10,26,60,0.78)',
              lineHeight: 1.82,
              margin: '0 0 18px',
              letterSpacing: '-0.01em',
            }}>
              {t('qualityPage.introP1')}
            </p>
            <p style={{
              fontSize: 'clamp(15px, 1.65vw, 17px)',
              color: 'rgba(10,26,60,0.78)',
              lineHeight: 1.82,
              margin: 0,
              letterSpacing: '-0.01em',
            }}>
              {t('qualityPage.introP2')}
            </p>
          </div>

          <div
            ref={qualityHeroClipRef}
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 8,
              aspectRatio: '1 / 1',
              maxWidth: 520,
              margin: '0 auto',
              width: '100%',
              boxShadow: '0 24px 60px rgba(10, 22, 40, 0.12)',
              lineHeight: 0,
              background: '#e8ecf2',
            }}
          >
            <div
              ref={qualityHeroParallaxRef}
              style={{
                position: 'absolute',
                left: 0,
                width: '100%',
                height: '118%',
                top: '-9%',
                willChange: 'transform',
              }}
            >
              <img
                src={heroImg}
                alt={heroAlt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: 'clamp(32px, 6vw, 56px) clamp(22px, 5vw, 40px) clamp(56px, 9vw, 88px)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <RevealBlock y={18}>
            <h2 className="dark-text" style={{
              fontSize: 'clamp(22px, 3vw, 30px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              margin: '0 0 clamp(28px, 4vw, 40px)',
            }}>
              {t('qualityPage.pillarsHeading')}
            </h2>
          </RevealBlock>
          {pillarsTop.map((p, i) => (
            <PillarBulletRow key={p.title || i} title={p.title} body={p.body} index={i} isLast={i === pillarsTop.length - 1} />
          ))}
        </div>
      </section>

      <section style={{ background: '#fafbfd', padding: 'clamp(52px, 9vw, 96px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <SplitFeature
            title={t('qualityPage.communicationTitle')}
            body={t('qualityPage.communicationBody')}
            graphic={<GraphicCommunication />}
          />
        </div>
      </section>

      <section style={{ background: '#eef2f7', padding: 'clamp(44px, 7vw, 72px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <RevealBlock>
            <h2 className="dark-text" style={{
              fontSize: 'clamp(20px, 2.6vw, 26px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              margin: '0 0 16px',
            }}>
              {t('qualityPage.securityTitle')}
            </h2>
            <p style={{
              fontSize: 'clamp(14px, 1.55vw, 16px)',
              color: 'rgba(10,26,60,0.76)',
              lineHeight: 1.82,
              margin: 0,
              whiteSpace: 'pre-line',
            }}>
              {t('qualityPage.securityBody')}
            </p>
          </RevealBlock>
        </div>
      </section>

      <section style={{ background: '#fff', padding: 'clamp(52px, 9vw, 96px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <SplitFeature
            title={t('qualityPage.ideaTitle')}
            body={t('qualityPage.ideaBody')}
            graphic={<GraphicIdeas />}
          />
        </div>
      </section>

      <section style={{ background: '#faf9f6', padding: 'clamp(44px, 7vw, 80px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <RevealBlock>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <BulletRing style={{ marginTop: 3 }} />
              <h2 style={{
                fontSize: 'clamp(19px, 2.4vw, 24px)',
                fontWeight: 700,
                color: '#1d4ed8',
                letterSpacing: '-0.025em',
                margin: 0,
              }}>
                {t('qualityPage.mqsTitle')}
              </h2>
            </div>
            <p style={{
              fontSize: 'clamp(14px, 1.55vw, 16px)',
              color: 'rgba(10,26,60,0.76)',
              lineHeight: 1.82,
              margin: 0,
            }}>
              {t('qualityPage.mqsBody')}
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* ── Certificates / Standards badges ─────────────────────────── */}
      <section style={{ background: '#fff', padding: 'clamp(52px, 10vw, 104px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <BulletRing style={{ marginTop: 3 }} />
            <h2 className="dark-text" style={{
              fontSize: 'clamp(22px, 3vw, 32px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              margin: 0,
            }}>
              {t('qualityPage.standardsHeading')}
            </h2>
          </div>
          <p style={{
            fontSize: 'clamp(14px, 1.55vw, 16px)',
            color: 'rgba(10,26,60,0.65)',
            lineHeight: 1.75,
            margin: '0 0 clamp(28px, 4vw, 40px)',
          }}>
            {t('qualityPage.standardsIntro')}
          </p>

          <div style={{ position: 'relative', marginBottom: 'clamp(36px, 6vw, 52px)' }}>
            <div
              className="cert-scroll-row"
              onScroll={e => {
                const el = e.currentTarget
                const hint = el.parentElement.querySelector('.cert-scroll-hint')
                if (hint) hint.style.opacity = el.scrollLeft > 20 ? '0' : '1'
              }}
              style={{ display: 'flex', flexWrap: 'nowrap', gap: 12, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <CertBadge label="ISO 9001" title="Quality Management" place={1} />
              <CertBadge label="ISO 14001" title="Environmental Mgmt" place={2} />
              <CertBadge label="ISO 45001" title="Health & Safety" place={3} />
              <CertBadge label="ISO/IEC 27001" title="Information Security" place={2} />
              <CertBadge label="SECTOR COMPLIANCE" title="Healthcare · Public Sector" place={3} />
            </div>
            {/* Scroll hint — sits below the row, centered */}
            <div className="cert-scroll-hint" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              marginTop: 10,
              pointerEvents: 'none', transition: 'opacity 0.4s',
            }}>
              <span className="cert-scroll-arrow" style={{ color: '#1d4ed8', fontSize: 18 }}>‹</span>
              <span style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: '#1d4ed8',
              }}>swipe</span>
              <span className="cert-scroll-arrow" style={{ color: '#1d4ed8', fontSize: 18 }}>›</span>
            </div>
          </div>

          {t('qualityPage.standardsFootnote') && (
            <p style={{
              fontSize: 13,
              color: 'rgba(10,26,60,0.55)',
              fontStyle: 'italic',
              lineHeight: 1.65,
              marginBottom: 'clamp(22px, 3vw, 32px)',
            }}>
              {t('qualityPage.standardsFootnote')}
            </p>
          )}

          <p style={{
            fontSize: 'clamp(14px, 1.55vw, 16px)',
            color: 'rgba(10,26,60,0.65)',
            lineHeight: 1.78,
            margin: '0 0 22px',
          }}>
            {t('qualityPage.closing')}
          </p>
          <LiquidButton as={Link} to="/contact" tint="#1B3A7A" textColor="#fff">
            {t('nav.contact')}
          </LiquidButton>
        </div>
      </section>

    </div>
  )
}
