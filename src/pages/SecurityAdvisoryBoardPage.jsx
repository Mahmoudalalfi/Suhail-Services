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

function initialsFromName(name) {
  if (!name || typeof name !== 'string') return '?'
  const parts = name.replace(/^Dr\.?\s+/i, '').trim().split(/\s+/)
  const a = (parts[0] || '?')[0] || '?'
  const b = (parts[parts.length - 1] || '?')[0] || '?'
  return `${a}${b}`.toUpperCase()
}

function MemberPortrait({ src, name, alt }) {
  const [broken, setBroken] = useState(false)

  if (!src || broken) {
    return (
      <div
        role="img"
        aria-label={alt || name || ''}
        style={{
          width: '100%',
          aspectRatio: '1 / 1',
          maxWidth: 320,
          margin: '0 auto',
          borderRadius: 8,
          background: 'linear-gradient(145deg, #e8eef6 0%, #f4f6f9 55%, #dfe8f3 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(44px, 12vmin, 68px)',
          color: 'rgba(0,48,89,0.35)',
          letterSpacing: '-0.03em',
          border: '1px solid rgba(10,26,60,0.08)',
          boxSizing: 'border-box',
        }}
      >
        {initialsFromName(name)}
      </div>
    )
  }

  return (
    <div style={{
      width: '100%',
      maxWidth: 320,
      margin: '0 auto',
      borderRadius: 8,
      overflow: 'hidden',
      boxShadow: '0 18px 44px rgba(10, 22, 40, 0.1)',
      lineHeight: 0,
      aspectRatio: '1 / 1',
      background: '#f4f6f9',
    }}
    >
      <img
        src={src}
        alt={alt || ''}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
          display: 'block',
        }}
        onError={() => setBroken(true)}
      />
    </div>
  )
}

export default function SecurityAdvisoryBoardPage() {
  const { t } = useLanguage()
  const headRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(headRef.current, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', delay: 0.04 })
  }, [])

  const members = Array.isArray(t('securityAdvisoryPage.members')) ? t('securityAdvisoryPage.members') : []
  const heroImg = t('securityAdvisoryPage.heroImage') || 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490795/suhail-services/security-advisory-hero.png'

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
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FACC15', marginBottom: 20 }}>
            {t('securityAdvisoryPage.eyebrowMuted')}
          </p>
          <h1 style={{ fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#0a0a0a', lineHeight: 1.0, margin: '0 0 24px' }}>
            {t('securityAdvisoryPage.title')}
          </h1>
        </div>
      </section>

      {/* Hero body */}
      <section style={{ padding: '56px 40px 56px' }}>
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
              margin: 0,
              maxWidth: 560,
            }}>
              {t('securityAdvisoryPage.heroIntro')}
            </p>
          </div>

          <div style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 8,
            aspectRatio: '1 / 1',
            maxWidth: 520,
            margin: '0 auto',
            width: '100%',
            boxShadow: '0 24px 60px rgba(10, 22, 40, 0.12)',
            justifySelf: 'center',
            background: '#fff',
          }}>
            <img
              src={heroImg}
              alt={t('securityAdvisoryPage.heroAlt') || ''}
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
      </section>

      {/* Dialogue block */}
      <section style={{ background: '#fff', padding: 'clamp(36px, 6vw, 72px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <RevealBlock y={18}>
            <h2 style={{
              fontSize: 'clamp(22px, 3vw, 28px)',
              fontWeight: 700,
              color: '#0a0a0a',
              letterSpacing: '-0.03em',
              margin: '0 0 clamp(18px, 2.5vw, 26px)',
            }}>
              {t('securityAdvisoryPage.dialogueHeading')}
            </h2>
            <p style={{ fontSize: 'clamp(15px, 1.65vw, 17px)', color: 'rgba(10,26,60,0.78)', lineHeight: 1.82, margin: '0 0 16px' }}>
              {t('securityAdvisoryPage.dialogueP1')}
            </p>
            <p style={{ fontSize: 'clamp(15px, 1.65vw, 17px)', color: 'rgba(10,26,60,0.78)', lineHeight: 1.82, margin: '0 0 16px' }}>
              {t('securityAdvisoryPage.dialogueP2')}
            </p>
            <p style={{ fontSize: 'clamp(15px, 1.65vw, 17px)', color: 'rgba(10,26,60,0.78)', lineHeight: 1.82, margin: 0 }}>
              {t('securityAdvisoryPage.dialogueP3')}
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* Members */}
      <section style={{ background: '#fff', padding: 'clamp(28px, 5vw, 48px) clamp(22px, 5vw, 40px) clamp(56px, 9vw, 96px)' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <RevealBlock>
            <h2 style={{
              fontSize: 'clamp(22px, 2.8vw, 28px)',
              fontWeight: 700,
              color: '#0a0a0a',
              letterSpacing: '-0.03em',
              textAlign: 'center',
              margin: '0 0 clamp(36px, 6vw, 52px)',
            }}>
              {t('securityAdvisoryPage.membersHeading')}
            </h2>
          </RevealBlock>

          {members.map((m, i) => (
            <RevealBlock key={m.slug || i} delay={i * 0.06}>
              <div style={{
                display: 'grid',
                gap: 'clamp(24px, 4vw, 40px)',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
                alignItems: 'center',
                marginBottom: i < members.length - 1 ? 'clamp(44px, 7vw, 72px)' : 0,
                paddingBottom: i < members.length - 1 ? 'clamp(44px, 7vw, 72px)' : 0,
                borderBottom: i < members.length - 1 ? '1px solid rgba(10,26,60,0.08)' : 'none',
              }}>
                <MemberPortrait src={m.photo} name={m.name} alt={m.portraitAlt} />
                <div style={{ minWidth: 0 }}>
                  <h3 style={{
                    fontSize: 'clamp(19px, 2.2vw, 22px)',
                    fontWeight: 700,
                    color: '#0a0a0a',
                    letterSpacing: '-0.02em',
                    margin: '0 0 14px',
                  }}>
                    {m.name}
                  </h3>
                  <p style={{
                    fontSize: 'clamp(14px, 1.55vw, 16px)',
                    color: 'rgba(10,26,60,0.78)',
                    lineHeight: 1.82,
                    margin: 0,
                  }}>
                    {m.bio}
                  </p>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* Young talent banner */}
      <section style={{
        background: 'linear-gradient(135deg, #071a36 0%, #0a2644 48%, #0d3058 100%)',
        padding: 'clamp(52px, 9vw, 88px) clamp(22px, 5vw, 40px)',
      }}>
        <div style={{ maxWidth: 840, margin: '0 auto', textAlign: 'center' }}>
          <RevealBlock>
            <h2 style={{
              fontSize: 'clamp(22px, 3vw, 30px)',
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '-0.03em',
              margin: '0 0 clamp(18px, 3vw, 26px)',
              lineHeight: 1.2,
            }}>
              {t('securityAdvisoryPage.youngTalentHeading')}
            </h2>
            <p style={{
              fontSize: 'clamp(15px, 1.65vw, 17px)',
              color: 'rgba(255,255,255,0.88)',
              lineHeight: 1.78,
              margin: 0,
            }}>
              {t('securityAdvisoryPage.youngTalentBody')}
            </p>
          </RevealBlock>
        </div>
      </section>

      <section style={{ background: '#fff', padding: 'clamp(44px, 7vw, 72px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <RevealBlock>
            <LiquidButton as={Link} to="/contact" tint="#FACC15" textColor="#000">
              {t('nav.contact')}
            </LiquidButton>
          </RevealBlock>
        </div>
      </section>
    </div>
  )
}
