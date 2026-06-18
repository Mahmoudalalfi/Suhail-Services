import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'
import LiquidButton from '../components/ui/LiquidButton'

function CounterStat({ s, delay }) {
  const numRef = useRef(null)
  useEffect(() => {
    const el = numRef.current
    if (!el) return
    // Parse numeric value, preserving suffix (e.g. "16.400" → 16400, suffix "")
    const raw = String(s.num).replace(/\s/g, '')
    const match = raw.match(/^([\d.,]+)(.*)$/)
    if (!match) return
    // Detect decimal separator: if last dot/comma has ≤3 digits after it treat as thousands sep
    const numStr = match[1]
    const suffix = match[2] || ''
    // Normalise: European thousands dots → remove, comma decimal → dot
    const normalised = numStr.replace(/\./g, '').replace(',', '.')
    const target = parseFloat(normalised)
    if (isNaN(target)) return

    // Format back the same way the original used (dots as thousands separators)
    const fmt = (v) => {
      const rounded = Math.round(v)
      return rounded.toLocaleString('de-DE').replace(/,.*/, '') + suffix
    }

    const obj = { val: 0 }
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          delay,
          ease: 'power2.out',
          onUpdate: () => { el.textContent = fmt(obj.val) },
          onComplete: () => { el.textContent = fmt(target) },
        })
      },
    })
  }, [])

  return (
    <div style={{ borderTop: '2px solid rgba(255,255,255,0.35)', paddingTop: 22 }}>
      <p ref={numRef} style={{
        fontSize: 'clamp(38px, 4.5vw, 58px)',
        fontWeight: 700,
        color: '#fff',
        letterSpacing: '-0.04em',
        lineHeight: 1,
        margin: '0 0 12px',
      }}>
        0
      </p>
      <p style={{
        fontSize: 13,
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: '0.01em',
        lineHeight: 1.45,
        margin: 0,
      }}>
        {s.label}
      </p>
    </div>
  )
}

gsap.registerPlugin(ScrollTrigger)

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
  const { t } = useLanguage()

  const headRef = useRef(null)
  const imgRef  = useRef(null)

  useEffect(() => {
    gsap.fromTo(headRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.05 }
    )
  }, [])

  useEffect(() => {
    if (!imgRef.current) return
    gsap.to(imgRef.current, {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: imgRef.current.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    })
  }, [])

  const learnMorePath = t('about.learnMoreHref') || '/contact'
  const stats         = Array.isArray(t('about.stats'))         ? t('about.stats')         : []
  const aboutSections = Array.isArray(t('about.aboutSections')) ? t('about.aboutSections') : []

  return (
    <div>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(100px, 14vw, 160px) clamp(20px, 5vw, 40px) clamp(56px, 10vw, 100px)', background: '#fff' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(32px, 5vw, 56px)',
            alignItems: 'center',
            maxWidth: 1200,
            margin: '0 auto',
          }}
        >
          <div className="about-hero-image-wrap" style={{ overflow: 'hidden', minHeight: 420, maxHeight: 720 }}>
            <img
              ref={imgRef}
              src={t('about.aboutImage')}
              alt={t('about.aboutImgAlt')}
              style={{
                width: '100%',
                height: '100%',
                minHeight: 420,
                objectFit: 'cover',
                objectPosition: 'center top',
                willChange: 'transform',
              }}
            />
          </div>

          <div ref={headRef} style={{ opacity: 0 }}>
            <h1
              style={{
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#0a0a0a',
                lineHeight: 1.15,
                margin: '0 0 28px',
              }}
            >
              {t('about.hero1')}
              {t('about.hero2') ? <><br />{t('about.hero2')}</> : null}
            </h1>

            {t('about.mission2') && (
              <p
                style={{
                  fontSize: 17,
                  color: 'rgba(30,31,40,0.62)',
                  lineHeight: 1.75,
                  maxWidth: 560,
                  letterSpacing: '-0.01em',
                  margin: '0 0 36px',
                }}
              >
                {t('about.mission2')}
              </p>
            )}

            <LiquidButton as={Link} to={learnMorePath} tint="#1B3A7A" textColor="#fff">
              {t('about.learnMoreLabel')}
            </LiquidButton>
          </div>
        </div>
      </section>


      {/* ── Tailor-made solutions ──────────────────────────────────── */}
      {(t('about.solutionsTitle') || t('about.solutionsDesc')) && (
        <section style={{ background: '#fff', padding: 'clamp(64px, 9vw, 96px) clamp(24px, 5vw, 40px)' }}>
          <div style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(24px, 4vw, 64px)',
            alignItems: 'start',
          }}>
            <RevealBlock>
              <h2 style={{
                fontSize: 'clamp(26px, 3.5vw, 42px)',
                fontWeight: 700,
                color: '#0a0a0a',
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                margin: 0,
              }}>
                {t('about.solutionsTitle')}
              </h2>
            </RevealBlock>
            <RevealBlock delay={0.1}>
              <p style={{
                fontSize: 'clamp(15px, 1.6vw, 17px)',
                color: 'rgba(30,31,40,0.62)',
                lineHeight: 1.75,
                letterSpacing: '-0.01em',
                margin: 0,
              }}>
                {t('about.solutionsDesc')}
              </p>
            </RevealBlock>
          </div>
        </section>
      )}

      {/* ── About bento collage ───────────────────────────────────── */}
      <section style={{ background: '#fff', padding: 'clamp(56px, 10vw, 96px) clamp(24px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <RevealBlock>
            <div className="about-bento-grid">
              {aboutSections.map((item, i) => {
                const href = `/about/${item.id}`
                const imgs = {
                  'history-facts':           'https://images.unsplash.com/photo-1580983218765-f663bec07b37?w=800&q=80',
                  'references':              'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
                  'quality-certificates':    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
                  'csr-esg':                 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80',
                  'philosophy-code':         'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
                  'compliance-lksg':         'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
                  'security-advisory-board': 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80',
                  'association-work':        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
                  'other-companies':         'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
                }
                return (
                  <Link
                    key={item.id}
                    to={href}
                    className={`about-bento-cell about-bento-cell--${i}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      className="about-bento-bg"
                      style={{ backgroundImage: `url(${imgs[item.id] || ''})` }}
                    />
                    <div className="about-bento-overlay" />
                    <div className="about-bento-content">
                      <span className="about-bento-index">0{i + 1}</span>
                      <h2 className="about-bento-title">{item.title}</h2>
                      <span className="about-bento-arrow">→</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </RevealBlock>
        </div>
      </section>

    </div>
  )
}
