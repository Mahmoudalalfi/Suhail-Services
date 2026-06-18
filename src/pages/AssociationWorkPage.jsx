import { useEffect, useRef } from 'react'
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

function BulletRing({ style = {} }) {
  return (
    <span
      aria-hidden
      style={{
        flexShrink: 0,
        width: 14,
        height: 14,
        border: '2px solid #C9A84C',
        borderRadius: '50%',
        marginTop: 5,
        ...style,
      }}
    />
  )
}

export default function AssociationWorkPage() {
  const { t } = useLanguage()
  const headRef = useRef(null)

  useEffect(() => {
    if (!headRef.current) return
    gsap.fromTo(headRef.current, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', delay: 0.04 })
  }, [])

  const heroImg = t('associationWorkPage.heroImage') || 'https://res.cloudinary.com/df7aiznm6/image/upload/v1777490344/suhail-services/association-work-hero.png'
  const engagementImg = t('associationWorkPage.engagementImage') || 'https://res.cloudinary.com/df7aiznm6/image/upload/v1777490341/suhail-services/association-work-engagement.png'
  const internationalItems = Array.isArray(t('associationWorkPage.internationalItems'))
    ? t('associationWorkPage.internationalItems')
    : []
  const nationalLines = Array.isArray(t('associationWorkPage.nationalLines'))
    ? t('associationWorkPage.nationalLines')
    : []

  return (
    <div style={{ background: '#fff' }}>

      {/* Hero */}
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
            {t('associationWorkPage.eyebrowMuted')}
          </p>
          <h1 style={{ fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#0a0a0a', lineHeight: 1.0, margin: '0 0 24px' }}>
            {t('associationWorkPage.title')}
          </h1>
        </div>
      </section>

      {/* Hero body */}
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
              {t('associationWorkPage.heroP1')}
            </p>
            <p style={{
              fontSize: 'clamp(15px, 1.65vw, 17px)',
              color: 'rgba(10,26,60,0.78)',
              lineHeight: 1.82,
              margin: 0,
              maxWidth: 560,
            }}>
              {t('associationWorkPage.heroP2')}
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
            boxShadow: '0 24px 60px rgba(30, 24, 8, 0.12)',
            justifySelf: 'center',
            background: '#e8eef6',
          }}>
            <img
              src={heroImg}
              alt={t('associationWorkPage.heroAlt') || ''}
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
                height: '38%',
                background: 'linear-gradient(to top, rgba(7,26,54,0.72), transparent)',
              }}
            />
          </div>
        </div>
      </section>

      {/* Engagement */}
      <section style={{ padding: 'clamp(28px, 6vw, 56px) clamp(22px, 5vw, 40px)' }}>
        <div style={{
          maxWidth: 1060,
          margin: '0 auto',
          display: 'grid',
          gap: 'clamp(32px, 6vw, 48px)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
          alignItems: 'center',
        }}>
          <RevealBlock>
            <div style={{
              borderRadius: 14,
              overflow: 'hidden',
              maxWidth: 400,
              margin: '0 auto',
              boxShadow: '0 18px 44px rgba(30, 24, 8, 0.1)',
              aspectRatio: '1 / 1',
              background: '#f4f6f9',
            }}>
              <img
                src={engagementImg}
                alt={t('associationWorkPage.engagementAlt') || ''}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                }}
              />
            </div>
          </RevealBlock>
          <RevealBlock delay={0.06}>
            <h2 style={{
              fontSize: 'clamp(20px, 2.5vw, 24px)',
              fontWeight: 700,
              color: '#0a0a0a',
              letterSpacing: '-0.03em',
              margin: '0 0 clamp(14px, 2vw, 18px)',
            }}>
              {t('associationWorkPage.engagementHeading')}
            </h2>
            <p style={{
              fontSize: 'clamp(15px, 1.65vw, 17px)',
              color: 'rgba(10,26,60,0.78)',
              lineHeight: 1.82,
              margin: 0,
            }}>
              {t('associationWorkPage.engagementBody')}
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* International */}
      <section style={{ padding: 'clamp(36px, 7vw, 72px) clamp(22px, 5vw, 40px)', background: '#fafbfd' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <RevealBlock>
            <h2 style={{
              fontSize: 'clamp(22px, 2.8vw, 26px)',
              fontWeight: 700,
              color: '#0a0a0a',
              letterSpacing: '-0.03em',
              margin: '0 0 clamp(22px, 4vw, 32px)',
            }}>
              {t('associationWorkPage.internationalHeading')}
            </h2>
          </RevealBlock>
          {internationalItems.map((item, i) => (
            <RevealBlock key={i} delay={i * 0.05}>
              <div style={{
                display: 'flex',
                gap: 18,
                alignItems: 'flex-start',
                paddingBottom: i < internationalItems.length - 1 ? 'clamp(22px, 3vw, 28px)' : 0,
                marginBottom: i < internationalItems.length - 1 ? 'clamp(22px, 3vw, 28px)' : 0,
                borderBottom: i < internationalItems.length - 1 ? '1px solid rgba(10,26,60,0.08)' : 'none',
              }}>
                <BulletRing />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: 'clamp(15px, 1.65vw, 17px)',
                    fontWeight: 700,
                    color: '#0a0a0a',
                    margin: '0 0 10px',
                    lineHeight: 1.45,
                  }}>
                    {item.title}
                  </p>
                  <p style={{
                    fontSize: 'clamp(14px, 1.5vw, 16px)',
                    color: 'rgba(10,26,60,0.78)',
                    lineHeight: 1.82,
                    margin: 0,
                  }}>
                    {item.body}
                  </p>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* National */}
      <section style={{ padding: 'clamp(48px, 8vw, 96px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <RevealBlock>
            <h2 style={{
              fontSize: 'clamp(22px, 2.8vw, 26px)',
              fontWeight: 700,
              color: '#0a0a0a',
              letterSpacing: '-0.03em',
              margin: '0 0 clamp(22px, 4vw, 32px)',
            }}>
              {t('associationWorkPage.nationalHeading')}
            </h2>
          </RevealBlock>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {nationalLines.map((line, i) => (
              <RevealBlock key={i} delay={Math.min(i * 0.02, 0.35)}>
                <li style={{
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                  paddingBottom: i < nationalLines.length - 1 ? 14 : 0,
                  marginBottom: i < nationalLines.length - 1 ? 14 : 0,
                  borderBottom: i < nationalLines.length - 1 ? '1px solid rgba(10,26,60,0.06)' : 'none',
                }}>
                  <BulletRing style={{ marginTop: 3 }} />
                  <span style={{
                    fontSize: 'clamp(14px, 1.5vw, 16px)',
                    color: 'rgba(10,26,60,0.82)',
                    lineHeight: 1.65,
                  }}>
                    {line}
                  </span>
                </li>
              </RevealBlock>
            ))}
          </ul>
        </div>
      </section>

      <section style={{ background: '#fff', padding: 'clamp(44px, 7vw, 72px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <RevealBlock>
            <LiquidButton as={Link} to="/contact" tint="#C9A84C" textColor="#000">
              {t('nav.contact')}
            </LiquidButton>
          </RevealBlock>
        </div>
      </section>
    </div>
  )
}
