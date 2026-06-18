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

/** Assets with heavy margins or vertical aspect read tiny at default clamps — give them more room. */
const LARGER_LOGO_SLUGS = new Set(['wachschutz-paderborn', 'duesseldorfer'])

/** Full-bleed shield needs a slight inset to match neighbours’ optical left edge. */
const LOGO_INSET_LEFT = {
  'bielefelder-heimschutz': 'clamp(50px, 3.8vw, 32px)',
}

function BrandRow({ slug, logo, name, body, showDivider }) {
  const [broken, setBroken] = useState(false)
  const larger = slug && LARGER_LOGO_SLUGS.has(slug)
  const slotHeight = larger ? 'clamp(128px, 38vmin, 236px)' : 'clamp(96px, 28vmin, 168px)'
  const insetLeft = (slug && LOGO_INSET_LEFT[slug]) || undefined

  return (
    <RevealBlock>
      <div className="brand-row-grid" style={{
        display: 'grid',
        gap: 'clamp(16px, 4vw, 36px)',
        gridTemplateColumns: 'minmax(min(100%, 190px), min(300px, 48vw)) minmax(0, 1fr)',
        alignItems: 'start',
        paddingBottom: showDivider ? 'clamp(28px, 5vw, 44px)' : 0,
        marginBottom: showDivider ? 'clamp(28px, 5vw, 44px)' : 0,
        borderBottom: showDivider ? '1px solid rgba(10,26,60,0.08)' : 'none',
      }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          paddingTop: 4,
          paddingRight: 12,
          paddingBottom: 10,
          paddingLeft: insetLeft ?? 0,
          boxSizing: 'border-box',
          minWidth: 0,
          width: '100%',
        }}
        >
          {!broken ? (
            <div
              style={{
                width: '100%',
                height: slotHeight,
                flexShrink: 0,
                display: 'block',
              }}
            >
              <img
                src={logo}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left top',
                  display: 'block',
                }}
                onError={() => setBroken(true)}
              />
            </div>
          ) : (
            <span style={{
              fontSize: 13,
              fontWeight: 700,
              color: 'rgba(0,48,89,0.35)',
              letterSpacing: '0.02em',
            }}
            >
              {(name || '?').slice(0, 12)}
            </span>
          )}
        </div>
        <div style={{ minWidth: 0 }}>
          <h3 style={{
            fontSize: 'clamp(17px, 2vw, 19px)',
            fontWeight: 700,
            color: '#0a0a0a',
            letterSpacing: '-0.02em',
            margin: '0 0 12px',
            lineHeight: 1.25,
          }}
          >
            {name}
          </h3>
          <p style={{
            fontSize: 'clamp(14px, 1.55vw, 16px)',
            color: 'rgba(10,26,60,0.78)',
            lineHeight: 1.82,
            margin: 0,
          }}
          >
            {body}
          </p>
        </div>
      </div>
    </RevealBlock>
  )
}

export default function OtherCompaniesPage() {
  const { t } = useLanguage()
  const headRef = useRef(null)

  useEffect(() => {
    if (!headRef.current) return
    gsap.fromTo(headRef.current, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', delay: 0.04 })
  }, [])

  const heroImg = t('otherCompaniesPage.heroImage') || 'https://res.cloudinary.com/df7aiznm6/image/upload/v1777490547/suhail-services/other-companies-hero.png'
  const activeBrands = Array.isArray(t('otherCompaniesPage.activeBrands')) ? t('otherCompaniesPage.activeBrands') : []
  const portfolioBrands = Array.isArray(t('otherCompaniesPage.portfolioBrands')) ? t('otherCompaniesPage.portfolioBrands') : []
  const integratedBrands = Array.isArray(t('otherCompaniesPage.integratedBrands')) ? t('otherCompaniesPage.integratedBrands') : []

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
            {t('otherCompaniesPage.eyebrowMuted')}
          </p>
          <h1 style={{ fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#0a0a0a', lineHeight: 1.0, margin: '0 0 24px' }}>
            {t('otherCompaniesPage.title')}
          </h1>
        </div>
      </section>

      <section style={{ padding: '56px 40px 64px' }}>
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            display: 'grid',
            gap: 'clamp(36px, 6vw, 56px)',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            alignItems: 'center',
          }}
        >
          <div style={{ minWidth: 0 }}>
            <p style={{
              fontSize: 'clamp(15px, 1.65vw, 17px)',
              color: 'rgba(10,26,60,0.78)',
              lineHeight: 1.82,
              margin: '0 0 16px',
              maxWidth: 560,
            }}>
              {t('otherCompaniesPage.heroP1')}
            </p>
            <p style={{
              fontSize: 'clamp(15px, 1.65vw, 17px)',
              color: 'rgba(10,26,60,0.78)',
              lineHeight: 1.82,
              margin: 0,
              maxWidth: 560,
            }}>
              {t('otherCompaniesPage.heroP2')}
            </p>
          </div>

          <div style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 14,
            aspectRatio: '4 / 3',
            maxWidth: 560,
            margin: '0 auto',
            width: '100%',
            boxShadow: '0 24px 60px rgba(10, 22, 40, 0.12)',
            justifySelf: 'center',
            background: '#e8eef6',
          }}
          >
            <img
              src={heroImg}
              alt={t('otherCompaniesPage.heroAlt') || ''}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />
            <div
              aria-hidden
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: '36%',
                background: 'linear-gradient(to top, rgba(7,26,54,0.65), transparent)',
              }}
            />
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(28px, 6vw, 56px) clamp(22px, 5vw, 40px) clamp(56px, 9vw, 88px)' }}>
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          <RevealBlock>
            <h2 style={{
              fontSize: 'clamp(20px, 2.4vw, 24px)',
              fontWeight: 700,
              color: '#0a0a0a',
              letterSpacing: '-0.03em',
              textAlign: 'center',
              margin: '0 0 clamp(28px, 5vw, 40px)',
            }}
            >
              {t('otherCompaniesPage.activeBrandsHeading')}
            </h2>
          </RevealBlock>

          {activeBrands.map((row, i) => (
            <BrandRow
              key={row.slug || i}
              slug={row.slug}
              logo={row.logo}
              name={row.name}
              body={row.body}
              showDivider={i < activeBrands.length - 1}
            />
          ))}

          <div style={{ height: 'clamp(28px, 5vw, 44px)' }} aria-hidden />

          {portfolioBrands.map((row, i) => (
            <BrandRow
              key={row.slug || `p-${i}`}
              slug={row.slug}
              logo={row.logo}
              name={row.name}
              body={row.body}
              showDivider={i < portfolioBrands.length - 1}
            />
          ))}

          <RevealBlock>
            <h2 style={{
              fontSize: 'clamp(20px, 2.4vw, 24px)',
              fontWeight: 700,
              color: '#0a0a0a',
              letterSpacing: '-0.03em',
              textAlign: 'center',
              margin: 'clamp(36px, 7vw, 56px) 0 clamp(28px, 5vw, 40px)',
            }}
            >
              {t('otherCompaniesPage.integratedBrandsHeading')}
            </h2>
          </RevealBlock>

          {integratedBrands.map((row, i) => (
            <BrandRow
              key={row.slug || `i-${i}`}
              slug={row.slug}
              logo={row.logo}
              name={row.name}
              body={row.body}
              showDivider={i < integratedBrands.length - 1}
            />
          ))}
        </div>
      </section>

      <section style={{ background: '#fff', padding: 'clamp(44px, 7vw, 72px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <RevealBlock>
            <LiquidButton as={Link} to="/contact" tint="#1B3A7A" textColor="#fff">
              {t('nav.contact')}
            </LiquidButton>
          </RevealBlock>
        </div>
      </section>
    </div>
  )
}
