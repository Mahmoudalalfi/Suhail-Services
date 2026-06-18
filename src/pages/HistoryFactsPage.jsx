import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

function useScrollReveal(ref, opts = {}) {
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    gsap.fromTo(el,
      { opacity: 0, y: opts.y ?? 30 },
      {
        opacity: 1, y: 0,
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
  return <div ref={ref} style={{ opacity: 0, ...style }}>{children}</div>
}

/* Heading with animated gold underline */
function AnimatedHeading({ children }) {
  const wrapRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: wrapRef.current, start: 'top 85%', once: true },
    })
    tl.fromTo(wrapRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' }
    ).fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.55, ease: 'power3.out', transformOrigin: 'left center' },
      '-=0.35'
    )
  }, [])

  return (
    <div ref={wrapRef} style={{ opacity: 0, marginBottom: 'clamp(40px, 6vw, 64px)' }}>
      <h2 style={{
        fontSize: 'clamp(32px, 4.5vw, 52px)',
        fontWeight: 700,
        color: '#0a0a0a',
        letterSpacing: '-0.03em',
        lineHeight: 1.1,
        margin: '0 0 18px',
      }}>
        {children}
      </h2>
      <div ref={lineRef} style={{
        width: 56,
        height: 3,
        background: '#C9A84C',
        transformOrigin: 'left center',
      }} />
    </div>
  )
}

/* Zigzag alternating card for the timeline */
function TimelineItem({ item, index, rowRef }) {
  const cardRef = useRef(null)
  const dotRef  = useRef(null)
  const [hovered, setHovered] = useState(false)
  const isLeft = index % 2 === 0

  /* Set invisible before first paint so there's no flash */
  useLayoutEffect(() => {
    if (cardRef.current) gsap.set(cardRef.current, { opacity: 0, x: isLeft ? -36 : 36 })
    if (dotRef.current)  gsap.set(dotRef.current,  { scale: 0 })
  }, [isLeft])

  /* Scroll-triggered reveal — cards slide off-center; dots pop onto spine */
  useEffect(() => {
    const card = cardRef.current
    const dot  = dotRef.current
    if (!card || !dot) return

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: { trigger: card, start: 'top 87%', once: true },
      })
      .to(card,
        { opacity: 1, x: 0, duration: 0.72, ease: 'power3.out' },
        0,
      )
      .to(dot,
        { scale: 1, duration: 0.36, ease: 'back.out(2.35)' },
        0.12,
      )
    })

    return () => ctx.revert()
  }, [index])

  return (
    <div ref={rowRef} className={`timeline-zz-row timeline-zz-row--${isLeft ? 'left' : 'right'}`}>
      {/* Card — opacity & x are owned by GSAP, not React inline styles */}
      <div
        ref={cardRef}
        className="timeline-zz-card"
        style={{
          background: '#fff',
          borderRadius: 14,
          padding: 'clamp(18px, 2.5vw, 30px)',
          boxShadow: hovered
            ? '0 8px 32px rgba(30,31,40,0.12)'
            : '0 2px 14px rgba(30,31,40,0.07)',
          transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
          cursor: 'default',
          border: '1px solid rgba(30,31,40,0.06)',
          borderLeft: hovered ? '3px solid #C9A84C' : '3px solid rgba(30,31,40,0.06)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <p style={{
          fontSize: 'clamp(44px, 5.5vw, 62px)',
          fontWeight: 700,
          color: hovered ? '#C9A84C' : '#B8972E',
          lineHeight: 1,
          margin: '0 0 14px',
          letterSpacing: '-0.04em',
          transition: 'color 0.25s ease',
        }}>
          {item.year}
        </p>
        <p style={{
          fontSize: 'clamp(13px, 1.4vw, 15px)',
          color: hovered ? 'rgba(30,31,40,0.84)' : 'rgba(30,31,40,0.62)',
          lineHeight: 1.7,
          margin: 0,
          letterSpacing: '-0.01em',
          transition: 'color 0.22s ease',
        }}>
          {item.event}
        </p>
      </div>

      {/* Center dot */}
      <div
        ref={dotRef}
        className="timeline-zz-dot"
        style={{ background: hovered ? '#C9A84C' : '#B8972E', transition: 'background 0.25s ease' }}
      />
    </div>
  )
}

/* Vertical spine: straight line through centre dots — sideways curves previously ran under cards */
function TimelineZigzag({ items }) {
  const wrapRef = useRef(null)
  const pathRef = useRef(null)
  const rowRefs = useRef([])
  const [pathD, setPathD] = useState('')

  const buildPath = useCallback(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const wrapRect = wrap.getBoundingClientRect()
    if (wrapRect.height < 4) return
    const cx = wrapRect.width / 2

    const pts = rowRefs.current
      .filter(Boolean)
      .map(row => {
        const r = row.getBoundingClientRect()
        return { x: cx, y: r.top - wrapRect.top + r.height / 2 }
      })

    if (pts.length < 2) {
      setPathD('')
      return
    }

    /* Smooth snake: each segment is an S-curve using two cubic bezier
       control points that pull gently to opposite sides, creating a
       fluid weave rather than a harsh zigzag */
    const swing = Math.min(wrapRect.width * 0.18, 110)
    let d = `M ${pts[0].x} ${pts[0].y}`
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1]
      const curr = pts[i]
      const dy   = curr.y - prev.y
      /* First control point pulls from the previous dot's side,
         second control point pulls toward the current dot's side */
      const dir  = i % 2 === 1 ? 1 : -1
      const cp1x = cx + dir * swing
      const cp1y = prev.y + dy * 0.35
      const cp2x = cx + dir * swing
      const cp2y = curr.y - dy * 0.35
      d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${curr.x} ${curr.y}`
    }
    setPathD(d)

    window.requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const id = window.setTimeout(buildPath, 60)
    const ro = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => { window.requestAnimationFrame(buildPath) })
      : null
    ro?.observe(wrap)

    window.addEventListener('resize', buildPath)
    window.addEventListener('orientationchange', buildPath)

    return () => {
      window.clearTimeout(id)
      window.removeEventListener('resize', buildPath)
      window.removeEventListener('orientationchange', buildPath)
      ro?.disconnect()
    }
  }, [buildPath, items])

  useEffect(() => {
    const pathEl = pathRef.current
    const wrap = wrapRef.current
    if (!pathEl || !wrap || !pathD) return

    const cleanup = gsap.context(() => {
      const rawLen = pathEl.getTotalLength?.()
      if (rawLen == null || !(rawLen > 0)) return

      pathEl.style.strokeDasharray = String(rawLen)
      pathEl.style.strokeDashoffset = String(rawLen)

      gsap.to(pathEl, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top 78%',
          end: 'bottom 60%',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    }, wrapRef)

    return () => cleanup.revert()
  }, [pathD])

  return (
    <div ref={wrapRef} className="timeline-zz-wrap" style={{ position: 'relative', paddingBottom: 8 }}>
      <svg
        className="timeline-zz-spine-svg"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          overflow: 'visible',
          zIndex: 0,
        }}
      >
        {pathD ? (
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="rgba(30,31,40,0.13)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null}
      </svg>

      {items.map((item, i) => (
        <TimelineItem
          key={`${item.year}-${i}`}
          item={item}
          index={i}
          rowRef={el => { rowRefs.current[i] = el }}
        />
      ))}
    </div>
  )
}

export default function HistoryFactsPage() {
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
      yPercent: -6,
      ease: 'none',
      scrollTrigger: {
        trigger: imgRef.current.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    })
  }, [])

  const historyTimeline = Array.isArray(t('about.historyTimeline')) ? t('about.historyTimeline') : []
  const stats           = Array.isArray(t('about.stats'))           ? t('about.stats')           : []

  return (
    <div>

      {/* ── Page header ───────────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: 'clamp(90px, 12vw, 140px) clamp(20px, 5vw, 40px) clamp(48px, 8vw, 80px)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div ref={headRef} style={{ opacity: 0 }}>
            <Link
              to="/about"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                fontWeight: 500,
                color: 'rgba(10,10,10,0.4)',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                marginBottom: 32,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#C9A84C' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(10,10,10,0.4)' }}
            >
              ← {t('common.backTo')} {t('nav.about')}
            </Link>

            <p style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#C9A84C',
              textTransform: 'uppercase',
              margin: '0 0 16px',
            }}>
              {t('about.historySubtitle')}
            </p>

            <h1 style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 700,
              color: '#0a0a0a',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              margin: '0 0 28px',
              maxWidth: 700,
            }}>
              {t('about.historyTitle')}
            </h1>

            <p style={{
              fontSize: 'clamp(15px, 1.6vw, 18px)',
              color: 'rgba(30,31,40,0.62)',
              lineHeight: 1.75,
              maxWidth: 580,
              letterSpacing: '-0.01em',
              margin: 0,
            }}>
              {t('about.historyIntro')}
            </p>
          </div>
        </div>
      </section>

      {/* ── Body text + image ─────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: 'clamp(64px, 9vw, 96px) clamp(24px, 5vw, 40px)' }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
        }}>
          <RevealBlock>
            <p style={{
              fontSize: 'clamp(15px, 1.6vw, 17px)',
              color: 'rgba(30,31,40,0.65)',
              lineHeight: 1.85,
              letterSpacing: '-0.01em',
              margin: 0,
            }}>
              {t('about.historyBodyText')}
            </p>
          </RevealBlock>

          <RevealBlock delay={0.12} style={{ overflow: 'hidden', borderRadius: 2 }}>
            <img
              ref={imgRef}
              src={t('about.historyBodyImage')}
              alt=""
              style={{
                width: '100%',
                height: 'clamp(280px, 40vw, 480px)',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                willChange: 'transform',
              }}
            />
          </RevealBlock>
        </div>
      </section>

      {/* ── History zigzag timeline ───────────────────────────────── */}
      <section style={{ background: '#f0f3f8', padding: 'clamp(64px, 9vw, 100px) clamp(24px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          <AnimatedHeading>
            {t('about.historyTimelineHeading') || 'History'}
          </AnimatedHeading>

          <TimelineZigzag items={historyTimeline} />

        </div>
      </section>


    </div>
  )
}
