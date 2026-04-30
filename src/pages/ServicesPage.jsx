import { useEffect, useLayoutEffect, useRef, useState, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'
import FeatureCarousel from '../components/ui/feature-carousel'
import LiquidButton from '../components/ui/LiquidButton'

gsap.registerPlugin(ScrollTrigger)

/** Footer / deep links → index in `services.servicesList` */
const SERVICES_HASH_INDEX = {
  'general-services':       0,
  'cleaning':               1,
  'cashier-services':       2,
  'warehouse-services':     3,
  'installation-unpacking': 4,
  'electrical-assistance':  5,
  'transport':              6,
  'staffing-services':      7,
}

function hashToServicesPanelIndex(hash) {
  const key = String(hash || '').replace(/^#/, '').toLowerCase()
  const idx = SERVICES_HASH_INDEX[key]
  return typeof idx === 'number' ? idx : null
}

function getFixedHeaderScrollPaddingPx() {
  const rail = document.getElementById('site-logo-rail')
  const header = document.querySelector('header')
  const rh = rail ? rail.offsetHeight : 0
  const hh = header ? header.offsetHeight : 0
  const h = Math.max(rh, hh)
  return h > 0 ? Math.ceil(h + 24) : 140
}

function scrollElementBelowFixedHeader(el, behavior = 'smooth') {
  if (!el) return
  const offset = getFixedHeaderScrollPaddingPx()
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top: Math.max(0, top), behavior })
}

function RevealBlock({ children, delay = 0, style = {} }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(ref.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay,
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      }
    )
  }, [])
  return <div ref={ref} style={{ opacity: 0, ...style }}>{children}</div>
}

function SubItem({ sub }) {
  const [hov, setHov] = useState(false)
  return (
    <Link
      to={`/services/${sub.slug}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'block', textDecoration: 'none' }}
    >
      <span style={{
        fontSize: 'clamp(13px, 1.2vw, 16px)',
        fontWeight: 400,
        color: hov ? '#FACC15' : 'rgba(255,255,255,0.65)',
        letterSpacing: '-0.01em',
        transition: 'color 0.25s ease',
        display: 'block',
      }}>
        {sub.name}
      </span>
      <span style={{
        display: 'block',
        fontSize: 11,
        color: 'rgba(255,255,255,0.35)',
        marginTop: 3,
        letterSpacing: '0.02em',
        height: 14,
        opacity: hov && sub.subtitle ? 1 : 0,
        transition: 'opacity 0.25s ease',
      }}>
        {sub.subtitle || ''}
      </span>
    </Link>
  )
}

function ServicesPanel({ servicesList, openCategoryIndex }) {
  const [activeIdx, setActiveIdx] = useState(() => (
    typeof openCategoryIndex === 'number' ? openCategoryIndex : null
  ))
  const rightRef = useRef(null)
  const animRef = useRef(null)

  const activeService = activeIdx !== null ? servicesList[activeIdx] : null

  useEffect(() => {
    if (typeof openCategoryIndex === 'number') {
      setActiveIdx(openCategoryIndex)
    }
  }, [openCategoryIndex])

  function openPanel(idx) {
    if (animRef.current) animRef.current.kill()
    if (activeIdx === idx) {
      animRef.current = gsap.to(rightRef.current, { opacity: 0, x: -8, duration: 0.22, ease: 'power2.in', onComplete: () => setActiveIdx(null) })
      return
    }
    if (activeIdx !== null) {
      animRef.current = gsap.to(rightRef.current, {
        opacity: 0, x: -8, duration: 0.15, ease: 'power2.in',
        onComplete: () => {
          setActiveIdx(idx)
        }
      })
    } else {
      setActiveIdx(idx)
    }
  }

  useEffect(() => {
    if (activeIdx === null || !rightRef.current) return
    if (animRef.current) animRef.current.kill()
    gsap.set(rightRef.current, { opacity: 0, x: 20 })
    animRef.current = gsap.to(rightRef.current, { opacity: 1, x: 0, duration: 0.35, ease: 'power3.out' })
  }, [activeIdx])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', minHeight: 340 }}>

      {/* LEFT: category list */}
      <div style={{ borderRight: '1px solid rgba(255,255,255,0.07)' }}>
        {servicesList.map((s, i) => {
          const label = (s.category || s.name).replace('\n', ' ')
          const hasChildren = !!s.items
          const active = activeIdx === i
          return (
            <div
              key={label}
              onClick={() => openPanel(i)}
              style={{
                padding: '18px 32px 18px 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
                userSelect: 'none',
              }}
            >
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(14px, 1.4vw, 20px)',
                letterSpacing: '0.02em',
                textTransform: 'none',
                color: active ? '#FACC15' : 'rgba(255,255,255,0.35)',
                transition: 'color 0.25s ease',
              }}>
                {label}
              </span>
              {hasChildren && (
                <span style={{
                  fontSize: 16,
                  color: active ? '#FACC15' : 'rgba(255,255,255,0.15)',
                  transition: 'color 0.25s ease, transform 0.25s ease',
                  transform: active ? 'rotate(90deg)' : 'rotate(0deg)',
                  display: 'inline-block',
                }}>→</span>
              )}
            </div>
          )
        })}
      </div>

      {/* RIGHT: sub-items or description */}
      <div
        ref={rightRef}
        style={{ paddingLeft: 60, paddingTop: 8, opacity: 0 }}
      >
        {activeService?.items ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4px 32px',
            paddingTop: 8,
          }}>
            {activeService.items.map((sub) => (
              <SubItem key={sub.name} sub={sub} />
            ))}
          </div>
        ) : activeService ? (
          <div style={{ paddingTop: 8 }}>
            <p style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(22px, 3vw, 42px)',
              letterSpacing: '-0.02em',
              textTransform: 'none',
              lineHeight: 1.05,
              marginBottom: 16,
            }}>
              {(activeService.name).replace('\n', ' ')}
            </p>
            <p style={{
              fontSize: 14,
              fontWeight: 300,
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.65,
              letterSpacing: '-0.01em',
              maxWidth: 420,
            }}>
              {activeService.desc}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function ServicesTestimonials() {
  const { t } = useLanguage()
  const testimonials = t('services.testimonials')
  const [idx, setIdx] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const goTo = (n) => {
    if (!cardRef.current) { setIdx(n); return }
    gsap.to(cardRef.current, {
      opacity: 0, y: -8, duration: 0.18, ease: 'power2.in',
      onComplete: () => {
        setIdx(n)
        gsap.fromTo(cardRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' })
      }
    })
  }
  const prev = () => goTo((idx - 1 + testimonials.length) % testimonials.length)
  const next = () => goTo((idx + 1) % testimonials.length)

  const btnStyle = { width: 38, height: 38, borderRadius: '50%', border: '1px solid rgba(30,31,40,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#000', cursor: 'pointer', background: 'transparent', transition: 'background 0.2s' }

  return (
    <section style={{ background: '#fafafa', padding: 'clamp(48px, 9vw, 90px) clamp(20px, 5vw, 40px)' }}>
      <RevealBlock style={{ marginBottom: 'clamp(24px, 5vw, 48px)' }}>
        <p style={{ fontSize: 'clamp(26px, 4vw, 58px)', fontWeight: 300, color: '#000000', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          {t('services.testimonialsTitle1')}<br />{t('services.testimonialsTitle2')}
        </p>
      </RevealBlock>

      {isMobile ? (
        /* ── Mobile: single card carousel ── */
        <>
          <div ref={cardRef} style={{ border: '1px solid rgba(30,31,40,0.1)', borderRadius: 16, padding: 28, display: 'flex', flexDirection: 'column', gap: 16, minHeight: 220 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#000', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{testimonials[idx].company}</p>
            <p style={{ fontSize: 15, fontWeight: 300, color: '#000', lineHeight: 1.7, letterSpacing: '-0.01em', flex: 1 }}>{testimonials[idx].quote}</p>
            <p style={{ fontSize: 13, color: 'rgba(30,31,40,0.4)' }}>{testimonials[idx].author}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 16 }}>
            <button style={btnStyle} onClick={prev}
              onMouseEnter={e => e.currentTarget.style.background='rgba(30,31,40,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}>←</button>
            <span style={{ fontSize: 12, color: 'rgba(30,31,40,0.4)', letterSpacing: '0.05em' }}>{idx + 1} / {testimonials.length}</span>
            <button style={btnStyle} onClick={next}
              onMouseEnter={e => e.currentTarget.style.background='rgba(30,31,40,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}>→</button>
          </div>
        </>
      ) : (
        /* ── Desktop: two-column grid ── */
        <>
          <div className="services-testimonials-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {testimonials.map((ts, i) => (
              <RevealBlock key={ts.company} delay={i * 0.1}>
                <div style={{ border: '1px solid rgba(30,31,40,0.1)', borderRadius: 16, padding: 36, display: 'flex', flexDirection: 'column', gap: 20, minHeight: 280 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#000', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{ts.company}</p>
                  <p style={{ fontSize: 15.5, fontWeight: 300, color: '#000', lineHeight: 1.7, letterSpacing: '-0.01em', flex: 1 }}>{ts.quote}</p>
                  <p style={{ fontSize: 13, color: 'rgba(30,31,40,0.4)' }}>{ts.author}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
            {['←', '→'].map((icon, i) => (
              <button key={icon} style={btnStyle}
                onMouseEnter={e => e.currentTarget.style.background='rgba(30,31,40,0.05)'}
                onMouseLeave={e => e.currentTarget.style.background='transparent'}
              >{icon}</button>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default function ServicesPage() {
  const { t } = useLanguage()
  const { hash } = useLocation()
  const headRef = useRef(null)
  const darkPanelRef = useRef(null)

  const openCategoryIndex = useMemo(() => hashToServicesPanelIndex(hash), [hash])

  useEffect(() => {
    if (typeof openCategoryIndex !== 'number' || !darkPanelRef.current) return
    /** Let panel open / fonts settle so `getBoundingClientRect` reflects final layout */
    let cancelled = false
    const tid = window.setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cancelled) scrollElementBelowFixedHeader(darkPanelRef.current, 'auto')
        })
      })
    }, 72)
    return () => {
      cancelled = true
      window.clearTimeout(tid)
    }
  }, [openCategoryIndex])

  useLayoutEffect(() => {
    const el = darkPanelRef.current
    if (!el) return
    function syncScrollMargin() {
      if (!darkPanelRef.current) return
      darkPanelRef.current.style.scrollMarginTop = `${getFixedHeaderScrollPaddingPx()}px`
    }
    syncScrollMargin()
    window.addEventListener('resize', syncScrollMargin)
    return () => window.removeEventListener('resize', syncScrollMargin)
  }, [openCategoryIndex])

  useEffect(() => {
    gsap.fromTo(headRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.05 }
    )
  }, [])

  return (
    <div>
      {/* HEADER */}
      <section style={{ padding: 'clamp(100px, 15vw, 180px) clamp(20px, 5vw, 40px) clamp(48px, 8vw, 80px)', background: '#fff' }}>
        <div ref={headRef} style={{ opacity: 0 }}>
          <h1 style={{
            fontSize: 'clamp(38px, 6.5vw, 96px)',
            fontWeight: 300, letterSpacing: '-0.04em',
            color: '#000000', lineHeight: 1.0, margin: 0,
          }}>
            {t('services.hero1')}<br />{t('services.hero2')}
          </h1>
        </div>
      </section>

      {/* SERVICES FEATURE CAROUSEL */}
      <section ref={darkPanelRef} id="services-categories-panel" style={{ background: '#fff', padding: '72px 0 88px' }}>
        <FeatureCarousel servicesList={t('services.servicesList')} openCategoryIndex={openCategoryIndex} />
      </section>

      {/* PROCESS */}
      <section style={{ padding: 'clamp(56px, 10vw, 100px) clamp(20px, 5vw, 40px)', background: '#fff' }}>
        <RevealBlock style={{ marginBottom: 'clamp(32px, 6vw, 56px)' }}>
          <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#FACC15' }}>
            {t('services.processTitle')}
          </p>
        </RevealBlock>
        <div className="services-process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
          {t('services.process').map((step, i) => (
            <RevealBlock key={step.num} delay={i * 0.1}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 2 }}>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 52, color: 'rgba(30,31,40,0.08)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {step.num}
                </p>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FACC15', flexShrink: 0, marginBottom: 4 }} />
              </div>
              <p style={{ fontSize: 20, fontWeight: 500, color: '#000000', marginTop: 10, letterSpacing: '-0.02em' }}>{step.title}</p>
              <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(30,31,40,0.5)', marginTop: 10, lineHeight: 1.65, letterSpacing: '-0.01em' }}>{step.desc}</p>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <ServicesTestimonials />

      {/* CTA */}
      <section style={{ background: '#000000', padding: 'clamp(56px, 10vw, 100px) clamp(20px, 5vw, 40px)', display: 'flex', flexDirection: 'column', gap: 36 }}>
        <RevealBlock>
          <p style={{ fontSize: 'clamp(32px, 5.5vw, 82px)', fontWeight: 300, color: '#fff', letterSpacing: '-0.035em', lineHeight: 1.05 }}>
            {t('services.cta1')}<br />{t('services.cta2')}
          </p>
        </RevealBlock>
        <RevealBlock delay={0.1}>
          <LiquidButton as={Link} to="/contact" tint="#FACC15" textColor="#000000">
            {t('services.ctaLink')}
          </LiquidButton>
        </RevealBlock>
      </section>
    </div>
  )
}
