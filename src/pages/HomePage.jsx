import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LayoutGroup, motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { TextRotate } from '../components/ui/text-rotate'
import { Floating, FloatingElement } from '../components/ui/parallax-floating'
import LiquidButton from '../components/ui/LiquidButton'
import BrandLogo from '../components/BrandLogo'

// All candidate grid cells — spread across the hero area
const ALL_SQUARES = [
  [2, 2], [5, 1], [8, 3], [12, 2], [16, 4], [20, 1], [24, 3], [28, 2], [32, 4], [36, 1],
  [3, 8], [7, 6], [11, 9], [15, 7], [19, 8], [23, 6], [27, 9], [31, 7],
  [1, 14], [5, 12], [9, 15], [13, 13], [17, 14], [21, 12], [25, 15], [29, 13],
  [4, 18], [8, 17], [12, 19], [16, 18], [20, 17], [24, 19], [28, 18],
  [2, 22], [6, 21], [10, 23], [14, 22], [18, 21], [22, 23], [26, 22],
  [3, 5], [9, 4], [15, 3], [21, 5], [27, 4], [33, 3],
  [6, 10], [12, 11], [18, 10], [24, 11], [30, 10],
  [1, 16], [7, 17], [13, 16], [19, 17], [25, 16], [31, 17],
]

function FlickerGrid({ width = 44, height = 44, x = -1, y = -1 }) {
  const id = useId()
  const svgRef = useRef(null)

  useEffect(() => {
    const rects = svgRef.current?.querySelectorAll('rect[data-sq]')
    if (!rects || rects.length === 0) return

    // Init ~30% lit via opacity directly on DOM nodes — no React state
    rects.forEach(r => {
      r.style.opacity = Math.random() < 0.3 ? '1' : '0.3'
    })

    const tick = () => {
      const count = 2 + Math.floor(Math.random() * 4)
      for (let i = 0; i < count; i++) {
        const r = rects[Math.floor(Math.random() * rects.length)]
        r.style.opacity = r.style.opacity === '1' ? '0.3' : '1'
      }
    }

    const intervalId = setInterval(tick, 320)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      style={{
        pointerEvents: 'none', position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        stroke: 'rgba(29,78,216,0.1)',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, white 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, white 30%, transparent 100%)',
      }}
    >
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" strokeDasharray="0" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      <svg x={x} y={y} style={{ overflow: 'visible' }}>
        {ALL_SQUARES.map(([sx, sy], i) => (
          <rect
            key={i}
            data-sq="1"
            strokeWidth="0"
            width={width - 1}
            height={height - 1}
            x={sx * width + 1}
            y={sy * height + 1}
            fill="rgba(29,78,216,0.13)"
            style={{ opacity: 0.3, transition: 'opacity 0.6s ease' }}
          />
        ))}
      </svg>
    </svg>
  )
}

gsap.registerPlugin(ScrollTrigger)

/*
  Hero images — truly scattered across the ENTIRE screen including the center.
  top/left are percentage-based so they're positioned relative to the 100vh section.
  Images behind the text have z-index via depth (lower depth = further back).
  Center zone (left ~30%–65%) gets images too but smaller/more faded via depth.
*/
const heroImages = [
  // top-left cluster
  { url: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490389/suhail-services/imprint-security-team.png', alt: 'Security team', top: 8, left: 1, w: 155, h: 108, rot: -5, delay: 0.30, depth: 0.8 },
  { url: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490367/suhail-services/history-facts-facility-security-hero.png', alt: 'Facility hero', top: 5, left: 13, w: 185, h: 125, rot: -11, delay: 0.45, depth: 1.0 },
  // mid-left
  { url: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490337/suhail-services/about_1_1777327649561.jpg', alt: 'About team', top: 32, left: 0, w: 160, h: 118, rot: 7, delay: 0.40, depth: 1.2 },
  { url: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490580/suhail-services/pencil-facility-construction-sites.png', alt: 'Construction', top: 28, left: 17, w: 158, h: 112, rot: -8, delay: 0.55, depth: 0.9 },
  // bottom-left cluster
  { url: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490736/suhail-services/pencil-janitorial-services.png', alt: 'Janitorial', top: 62, left: 1, w: 148, h: 148, rot: -4, delay: 0.65, depth: 1.6 },
  { url: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490754/suhail-services/pencil-security-technology.jpg', alt: 'Security tech', top: 60, left: 16, w: 145, h: 112, rot: 9, delay: 0.80, depth: 1.3 },
  { url: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490800/suhail-services/work-project-01.png', alt: 'Work 1', top: 82, left: 2, w: 132, h: 92, rot: 5, delay: 0.95, depth: 0.7 },
  { url: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490339/suhail-services/about_2_1777327661089.jpg', alt: 'About 2', top: 80, left: 19, w: 148, h: 102, rot: -6, delay: 1.05, depth: 1.0 },

  // ── TOP CENTER — above the text block ────────────────────────
  { url: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490803/suhail-services/work-project-02.png', alt: 'Work 2', top: 4, left: 34, w: 152, h: 108, rot: -6, delay: 0.42, depth: 0.7 },
  { url: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490739/suhail-services/pencil-maintenance-cleaning.png', alt: 'Maintenance top', top: 3, left: 55, w: 160, h: 112, rot: 7, delay: 0.50, depth: 0.9 },

  // ── BOTTOM CENTER — below the text block ──────────────────────
  { url: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490564/suhail-services/pencil-day-service-staff.png', alt: 'Day staff', top: 78, left: 32, w: 148, h: 108, rot: 6, delay: 0.70, depth: 1.0 },
  { url: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490800/suhail-services/work-project-01.png', alt: 'Work bottom', top: 76, left: 56, w: 142, h: 104, rot: -7, delay: 0.75, depth: 1.0 },

  // top-right cluster
  { url: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490747/suhail-services/pencil-outdoor-area-care.png', alt: 'Outdoor care', top: 6, left: 68, w: 182, h: 122, rot: -9, delay: 0.38, depth: 1.1 },
  { url: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490816/suhail-services/work-project-06.png', alt: 'Work 6', top: 5, left: 84, w: 148, h: 106, rot: 8, delay: 0.50, depth: 0.9 },
  // mid-right
  { url: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490606/suhail-services/pencil-facility-healthcare.png', alt: 'Healthcare', top: 31, left: 76, w: 152, h: 152, rot: -6, delay: 0.60, depth: 1.5 },
  { url: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490806/suhail-services/work-project-03.png', alt: 'Work 3', top: 30, left: 91, w: 138, h: 104, rot: 12, delay: 0.72, depth: 1.8 },
  // bottom-right cluster
  { url: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490647/suhail-services/pencil-glass-facade-cleaning.png', alt: 'Glass cleaning', top: 62, left: 68, w: 142, h: 116, rot: -10, delay: 0.78, depth: 1.3 },
  { url: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490813/suhail-services/work-project-05.png', alt: 'Work 5', top: 60, left: 84, w: 155, h: 118, rot: 6, delay: 0.90, depth: 0.8 },
  { url: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490381/suhail-services/imprint-extra-operations.png', alt: 'Operations', top: 82, left: 70, w: 132, h: 90, rot: -4, delay: 1.00, depth: 0.6 },
  { url: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490580/suhail-services/pencil-facility-construction-sites.png', alt: 'Sites right', top: 81, left: 88, w: 138, h: 94, rot: 7, delay: 1.10, depth: 1.0 },
]


const MOBILE_HERO_CARDS = [
  /* top — left of center, big, tilted left hard */
  { url: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490606/suhail-services/pencil-facility-healthcare.png', alt: 'Healthcare', rot: -18,
    pos: { top: '7%', left: '5%' }, w: 'clamp(110px,31vw,148px)', h: 'clamp(140px,40vw,186px)' },
  /* top — right, higher up, tilted right, different shape */
  { url: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490816/suhail-services/work-project-06.png', alt: 'Work 6', rot: 14,
    pos: { top: '4%', right: '6%' }, w: 'clamp(118px,34vw,156px)', h: 'clamp(78px,22vw,100px)' },
  /* bottom — far left, low, tilted opposite */
  { url: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490747/suhail-services/pencil-outdoor-area-care.png', alt: 'Outdoor', rot: 11,
    pos: { bottom: '11%', left: '3%' }, w: 'clamp(100px,28vw,128px)', h: 'clamp(100px,28vw,128px)' },
  /* bottom — right but not corner, tucked behind button area, sharp tilt */
  { url: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490647/suhail-services/pencil-glass-facade-cleaning.png', alt: 'Glass cleaning', rot: -23,
    pos: { bottom: '7%', right: '4%' }, w: 'clamp(86px,24vw,110px)', h: 'clamp(114px,32vw,148px)' },
]

/* Each card gets a unique parallax depth multiplier */
const MOBILE_CARD_DEPTHS = [52, 34, 44, 60]

const needsGyroPermission = () =>
  typeof DeviceOrientationEvent !== 'undefined' &&
  typeof DeviceOrientationEvent.requestPermission === 'function'

function MobileHeroCards() {
  const [gyro, setGyro] = useState({ x: 0, y: 0 })
  const [showPrompt, setShowPrompt] = useState(false)
  const [granted, setGranted] = useState(false)
  const baseRef = useRef({ beta: null, gamma: null })

  const attachGyro = () => {
    const handler = (e) => {
      const beta  = e.beta  ?? 0
      const gamma = e.gamma ?? 0
      if (baseRef.current.beta === null) baseRef.current = { beta, gamma }
      const dx = (gamma - baseRef.current.gamma) / 12
      const dy = (beta  - baseRef.current.beta)  / 16
      setGyro({ x: Math.max(-1, Math.min(1, dx)), y: Math.max(-1, Math.min(1, dy)) })
    }
    window.addEventListener('deviceorientation', handler)
    return () => window.removeEventListener('deviceorientation', handler)
  }

  useEffect(() => {
    if (needsGyroPermission()) {
      /* iOS — show the tap prompt instead of calling requestPermission cold */
      setShowPrompt(true)
    } else {
      /* Android / desktop — attach directly */
      return attachGyro()
    }
  }, [])

  const handlePromptTap = () => {
    DeviceOrientationEvent.requestPermission()
      .then(state => {
        if (state === 'granted') { setGranted(true); attachGyro() }
        setShowPrompt(false)
      })
      .catch(() => setShowPrompt(false))
  }

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <FlickerGrid />

      {/* iOS gyro permission prompt */}
      {showPrompt && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          onClick={handlePromptTap}
          style={{
            position: 'absolute',
            bottom: '3%',
            left: 0,
            right: 0,
            margin: '0 auto',
            width: 'fit-content',
            zIndex: 10,
            pointerEvents: 'auto',
            background: 'rgba(15,15,18,0.72)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            color: '#fff',
            border: 'none',
            borderRadius: 999,
            padding: '9px 20px',
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: '0.01em',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            whiteSpace: 'nowrap',
          }}
        >
          Tap to enable tilt effect
        </motion.button>
      )}

      {MOBILE_HERO_CARDS.map((card, i) => {
        const depth = MOBILE_CARD_DEPTHS[i]
        const tx = gyro.x * depth
        const ty = gyro.y * depth
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.78, y: i < 2 ? -24 : 24 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: tx,
              y: ty,
            }}
            transition={
              gyro.x === 0 && gyro.y === 0
                ? { delay: 0.25 + i * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }
                : { type: 'spring', stiffness: 35, damping: 12, mass: 1.1 }
            }
            style={{
              position: 'absolute',
              ...card.pos,
              transform: `rotate(${card.rot}deg)`,
              boxShadow: '0 10px 36px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.12)',
              zIndex: 2,
              overflow: 'hidden',
            }}
          >
            <img
              src={card.url}
              alt={card.alt}
              style={{ width: card.w, height: card.h, objectFit: 'cover', display: 'block' }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}

/* ─────────────────────────── HeroFitTwoLines (kept for potential reuse) ─────────────────────────── */
function HeroFitTwoLines({ text1, text2, style = {}, maxFontPx, lang, line1Ref, line2Ref }) {
  const rowRef = useRef(null)
  const inner1Ref = useRef(null)
  const inner2Ref = useRef(null)
  const display1 = typeof text1 === 'string' ? text1.normalize('NFC') : text1
  const display2 = typeof text2 === 'string' ? text2.normalize('NFC') : text2

  useEffect(() => {
    const el1 = inner1Ref.current
    const el2 = inner2Ref.current
    const row = rowRef.current
    if (!el1 || !el2 || !row) return

    let ro
    let cancelled = false
    let retries = 0

    const measureMax = () => Math.floor(row.getBoundingClientRect().width)

    const fit = () => {
      if (cancelled) return
      const max = measureMax()
      if (max < 32 && retries < 25) {
        retries += 1
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (!cancelled) fit()
          })
        })
        return
      }
      const cap = Number.isFinite(maxFontPx) ? maxFontPx : 500
      let lo = 8
      let hi = Math.min(500, Math.floor(cap + 8))
      el1.style.fontSize = `${hi}px`
      el2.style.fontSize = `${hi}px`
      while (lo < hi - 1) {
        const mid = (lo + hi) >> 1
        el1.style.fontSize = `${mid}px`
        el2.style.fontSize = `${mid}px`
        const ok = el1.scrollWidth <= max && el2.scrollWidth <= max
        ok ? (lo = mid) : (hi = mid)
      }
      const fs = Math.min(lo, cap)
      el1.style.fontSize = `${fs}px`
      el2.style.fontSize = `${fs}px`
    }

    const schedule = () => {
      fit()
      if (typeof document !== 'undefined' && document.fonts?.ready) {
        document.fonts.ready.then(() => {
          if (!cancelled) fit()
        })
      }
    }

    schedule()

    ro = new ResizeObserver(() => schedule())
    ro.observe(row)
    window.addEventListener('resize', schedule)

    return () => {
      cancelled = true
      ro.disconnect()
      window.removeEventListener('resize', schedule)
    }
  }, [text1, text2, lang, maxFontPx])

  const shared = {
    whiteSpace: 'nowrap',
    display: 'block',
    unicodeBidi: 'isolate',
    textAlign: 'center',
    ...style,
    textTransform: lang === 'de' ? 'none' : (style.textTransform ?? 'uppercase'),
    ...(lang === 'de' ? { textRendering: 'optimizeLegibility' } : {}),
  }

  return (
    <div ref={rowRef} style={{ width: '100%', maxWidth: '100%', minWidth: 0, textAlign: 'center' }}>
      <div
        className={lang === 'de' ? 'clip-wrap clip-wrap--de' : 'clip-wrap'}
        style={{
          marginBottom:
            lang === 'de'
              ? 'clamp(10px, 2vmin, 28px)'
              : 'clamp(2px, 0.8vmin, 10px)',
        }}
      >
        <div ref={line1Ref} style={{ width: '100%', minWidth: 0 }}>
          <div ref={inner1Ref} style={shared}>{display1}</div>
        </div>
      </div>
      <div
        className={
          lang === 'de' ? 'clip-wrap clip-wrap--de clip-wrap--de-line2' : 'clip-wrap'
        }
      >
        <div ref={line2Ref} style={{ width: '100%', minWidth: 0 }}>
          <div ref={inner2Ref} style={shared}>{display2}</div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── WorkCard ─────────────────────────── */
function WorkCard({ project }) {
  const [hov, setHov] = useState(false)
  const imgRef = useRef(null)

  return (
    <Link
      className="work-feature-card"
      to="/work"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <img
        ref={imgRef}
        src={project.img}
        alt={project.title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: hov ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.75s cubic-bezier(0.16,1,0.3,1)',
          willChange: 'transform',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(10,11,18,0.6) 0%, rgba(10,11,18,0.1) 45%, transparent 70%)',
        transition: 'opacity 0.4s',
        opacity: hov ? 1 : 0.7,
      }} />
      <div style={{ position: 'absolute', bottom: 'clamp(12px,3vw,28px)', left: 'clamp(12px,3vw,28px)', color: '#fff' }}>
        <p style={{ fontSize: 'clamp(9px,2vw,12px)', fontWeight: 400, opacity: 0.6, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 4 }}>
          {project.tag}
        </p>
        <p style={{ fontSize: 'clamp(13px,3vw,24px)', fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1 }}>
          {project.title}
        </p>
      </div>
      <div style={{
        position: 'absolute', top: 'clamp(10px,2.5vw,22px)', right: 'clamp(10px,2.5vw,22px)',
        width: 'clamp(32px,8vw,44px)', height: 'clamp(32px,8vw,44px)', borderRadius: '50%',
        background: hov ? '#FACC15' : 'rgba(255,255,255,0.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 18,
        color: hov ? '#0f0f12' : '#000000',
        transition: 'background 0.25s, color 0.25s',
        backdropFilter: 'blur(6px)',
        boxShadow: '0 2px 12px rgba(30,31,40,0.12)',
      }}>
        {'↗︎'}
      </div>
    </Link>
  )
}

/* ─────────────────────────── Ticker (white strip only — no dark duplicate) ─────────────────────────── */
function Ticker() {
  const { t } = useLanguage()
  const tickerWords = t('home.ticker')
  const items = [...tickerWords, ...tickerWords]
  return (
    <div style={{
      overflow: 'hidden',
      background: '#fff',
      borderTop: '1px solid rgba(30,31,40,0.08)',
      borderBottom: '1px solid rgba(30,31,40,0.08)',
      padding: '18px 0',
      userSelect: 'none',
    }}>
      <div className="ticker-track">
        {items.map((w, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 0,
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 600,
            fontSize: 15,
            letterSpacing: '0.04em',
            textTransform: 'none',
            color: '#1d4ed8',
            padding: '0 28px',
          }}>
            {w}
            <span style={{ marginLeft: 28, color: '#FACC15' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────── Testimonials (3-D Marquee) ─────────────────────────── */
const TESTIMONIALS = [
  { name: 'Ava Green', username: '@ava_g', body: 'Absolutely professional team — security on point every single shift.', img: 'https://randomuser.me/api/portraits/women/32.jpg', flag: 'https://flagcdn.com/w40/au.png', country: 'Australia' },
  { name: 'Ana Müller', username: '@ana_m', body: 'The cleaning crew transformed our office completely. Highly recommended.', img: 'https://randomuser.me/api/portraits/women/68.jpg', flag: 'https://flagcdn.com/w40/de.png', country: 'Germany' },
  { name: 'Mateo Rossi', username: '@mat_r', body: 'Warehouse staff was efficient, careful, and always on time.', img: 'https://randomuser.me/api/portraits/men/51.jpg', flag: 'https://flagcdn.com/w40/it.png', country: 'Italy' },
  { name: 'Maya Patel', username: '@maya_p', body: 'From cashier services to transport — everything was seamlessly handled.', img: 'https://randomuser.me/api/portraits/women/53.jpg', flag: 'https://flagcdn.com/w40/in.png', country: 'India' },
  { name: 'Noah Smith', username: '@noah_s', body: 'Best facility service partner we have ever worked with. Period.', img: 'https://randomuser.me/api/portraits/men/33.jpg', flag: 'https://flagcdn.com/w40/us.png', country: 'USA' },
  { name: 'Lucas Dubois', username: '@luc_d', body: 'The staffing team adapted to our peak season demands perfectly.', img: 'https://randomuser.me/api/portraits/men/22.jpg', flag: 'https://flagcdn.com/w40/fr.png', country: 'France' },
  { name: 'Haruto Sato', username: '@haru_s', body: 'Electrical assistance crew was fast and extremely professional on site.', img: 'https://randomuser.me/api/portraits/men/85.jpg', flag: 'https://flagcdn.com/w40/jp.png', country: 'Japan' },
  { name: 'Emma Lee', username: '@emma_l', body: 'Our retail chain runs smoothly thanks to their cashier service team.', img: 'https://randomuser.me/api/portraits/women/45.jpg', flag: 'https://flagcdn.com/w40/ca.png', country: 'Canada' },
  { name: 'Carlos Rey', username: '@carl_r', body: 'Construction cleaning was spotless — well ahead of our handover date.', img: 'https://randomuser.me/api/portraits/men/61.jpg', flag: 'https://flagcdn.com/w40/es.png', country: 'Spain' },
  { name: 'Sara Jensen', username: '@sara_j', body: 'The deep cleaning service exceeded every expectation we had set.', img: 'https://randomuser.me/api/portraits/women/12.jpg', flag: 'https://flagcdn.com/w40/dk.png', country: 'Denmark' },
  { name: 'Liam Walsh', username: '@liam_w', body: 'Reliable, punctual, and always professional — great partner to have.', img: 'https://randomuser.me/api/portraits/men/43.jpg', flag: 'https://flagcdn.com/w40/ie.png', country: 'Ireland' },
  { name: 'Chiara Bianchi', username: '@chia_b', body: 'Interior work done with real craftsmanship. Very happy with the outcome.', img: 'https://randomuser.me/api/portraits/women/76.jpg', flag: 'https://flagcdn.com/w40/it.png', country: 'Italy' },
]

const COL_A = TESTIMONIALS.slice(0, 3)
const COL_B = TESTIMONIALS.slice(3, 6)
const COL_C = TESTIMONIALS.slice(6, 9)
const COL_D = TESTIMONIALS.slice(9, 12)

function TestimonialCard({ img, name, username, body, flag, country }) {
  return (
    <div style={{
      width: '100%',
      maxWidth: 300,
      background: '#fff',
      border: '1px solid rgba(30,31,40,0.10)',
      borderRadius: 14,
      padding: '16px',
      boxShadow: '0 2px 12px rgba(10,11,18,0.06)',
      flexShrink: 0,
    }}>
      {/* Avatar row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <img src={img} alt={name} width={36} height={36}
          style={{ borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#0f0f12', whiteSpace: 'nowrap' }}>{name}</span>
            <img src={flag} alt={country} width={16} height={11}
              style={{ borderRadius: 2, objectFit: 'cover', flexShrink: 0 }} />
          </div>
          <span style={{ fontSize: 11, color: 'rgba(30,31,40,0.45)', display: 'block' }}>{username}</span>
        </div>
      </div>
      {/* Quote */}
      <p style={{ fontSize: 13, color: 'rgba(30,31,40,0.70)', lineHeight: 1.55, margin: 0 }}>{body}</p>
    </div>
  )
}

function MarqueeCol({ items, reverse = false, duration = '40s', cls = '' }) {
  const doubled = [...items, ...items, ...items]
  return (
    <div
      className={cls}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        flexShrink: 0,
        animation: `marquee-vertical${reverse ? '-rev' : ''} ${duration} linear infinite`,
      }}
      onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
      onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
    >
      {doubled.map((r, i) => <TestimonialCard key={i} {...r} />)}
    </div>
  )
}

function Testimonials() {
  const { t } = useLanguage()

  return (
    <section style={{ padding: 'clamp(56px, 10vw, 100px) clamp(20px, 5vw, 40px)', background: '#fff', overflow: 'hidden' }}>
      <style>{`
        @keyframes marquee-vertical {
          from { transform: translateY(0); }
          to   { transform: translateY(-33.333%); }
        }
        @keyframes marquee-vertical-rev {
          from { transform: translateY(-33.333%); }
          to   { transform: translateY(0); }
        }

        /* ── Desktop: centred 3-D block ── */
        .testi-scene {
          position: relative;
          height: 560px;
          overflow: hidden;
          border-radius: 20px;
          perspective: 900px;
        }
        .testi-inner {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: center;
          gap: 18px;
          padding: 20px 32px;
          transform: translateY(20px) rotateX(18deg) rotateY(-8deg) rotateZ(18deg);
          transform-style: preserve-3d;
        }

        /* ── Mobile: keep 3-D tilt, 2 cols, tighter height ── */
        @media (max-width: 600px) {
          .testi-scene {
            height: 420px;
            perspective: 600px;
            border-radius: 14px;
          }
          .testi-inner {
            transform: translateY(14px) rotateX(16deg) rotateY(-6deg) rotateZ(14deg);
            gap: 10px;
            padding: 14px 10px;
          }
          .testi-col { width: calc(50% - 5px); }
        }
      `}</style>

      <p style={{
        fontSize: 'clamp(26px, 4vw, 58px)',
        fontWeight: 300,
        letterSpacing: '-0.03em',
        color: '#000000',
        lineHeight: 1.1,
        marginBottom: 'clamp(32px, 5vw, 56px)',
        textAlign: 'center',
      }}>
        {t('home.testimonialsTitle1')}<br />{t('home.testimonialsTitle2')}
      </p>

      {/* 3-D container */}
      <div className="testi-scene">
        {/* inner 3-D transformed frame */}
        <div className="testi-inner">
          <MarqueeCol cls="testi-col" items={COL_A} duration="38s" />
          <MarqueeCol cls="testi-col" items={COL_B} reverse duration="42s" />
          <MarqueeCol cls="testi-col" items={COL_C} duration="36s" />
          <MarqueeCol cls="testi-col" items={COL_D} reverse duration="44s" />
        </div>

        {/* Gradient fades */}
        <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #fff 0%, transparent 22%, transparent 78%, #fff 100%)', zIndex: 2 }} />
        <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, background: 'linear-gradient(to right, #fff 0%, transparent 18%, transparent 82%, #fff 100%)', zIndex: 2 }} />
      </div>
    </section>
  )
}

/* ─────────────────────────── HomePage ─────────────────────────── */
export default function HomePage() {
  const { t, lang } = useLanguage()
  const featured = t('home.featured')

  const heroRef = useRef(null)
  const subRef = useRef(null)
  const workRef = useRef(null)
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)
  /* Alternates #FACC15 (yellow) and #1D4ED8 (blue) on each text rotation */
  const ROTATE_COLORS = ['#FACC15', '#1D4ED8']
  const [rotateColorIdx, setRotateColorIdx] = useState(0)
  const handleRotateNext = (idx) => setRotateColorIdx(idx % ROTATE_COLORS.length)

  /* Lock hero height to the initial viewport so mobile browser chrome hide/show doesn't resize it */
  const [heroH, setHeroH] = useState('100svh')
  useEffect(() => {
    setHeroH(`${window.innerHeight}px`)
  }, [])

  /* ── Work cards scroll reveal ── */
  useEffect(() => {
    gsap.set(card1Ref.current, { opacity: 0, y: 50 })
    gsap.set(card2Ref.current, { opacity: 0, y: 60 })
    const ctx = gsap.context(() => {
      gsap.to(card1Ref.current, {
        opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: card1Ref.current, start: 'top 85%', once: true }
      })
      gsap.to(card2Ref.current, {
        opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: card2Ref.current, start: 'top 85%', once: true }
      })
    })
    return () => ctx.revert()
  }, [])


  return (
    <div>
      {/* ════ HERO ════ */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden flex flex-col items-center justify-center"
        style={{
          height: heroH,
          background: '#f0f3fa',
          paddingTop: 80,
          willChange: 'transform',
        }}
      >
        {/* Mobile: Artemis-style 4-card layout */}
        {window.innerWidth < 768 && <MobileHeroCards />}

        {/* Desktop: flickering grid + floating images */}
        {window.innerWidth >= 768 && (
          <>
            <FlickerGrid />
            <Floating sensitivity={-0.4} className="pointer-events-none hero-floating-images">
              {heroImages.map((img, i) => (
                <FloatingElement
                  key={i}
                  depth={img.depth}
                  className=""
                  style={{
                    top: `${img.top}%`,
                    left: `${img.left}%`,
                    zIndex: img.depth < 0.5 ? 1 : 2,
                  }}
                >
                  <motion.div
                    className="hero-img-card"
                    initial={{ opacity: 0, scale: 0.82, y: 20 + img.depth * 14 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: img.delay, duration: 0.7 + img.depth * 0.18, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: 'relative',
                      transform: `rotate(${img.rot}deg)`,
                      borderRadius: 14,
                      overflow: 'hidden',
                      boxShadow: `
                        0 ${Math.round(4 + img.depth * 12)}px ${Math.round(16 + img.depth * 28)}px rgba(0,0,0,${(0.14 + img.depth * 0.08).toFixed(2)}),
                        0 ${Math.round(12 + img.depth * 24)}px ${Math.round(40 + img.depth * 36)}px rgba(0,0,0,${(0.09 + img.depth * 0.05).toFixed(2)})
                      `,
                      willChange: 'transform',
                    }}
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      style={{
                        width: img.w,
                        height: img.h,
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </motion.div>
                </FloatingElement>
              ))}
            </Floating>
          </>
        )}

        {/* Center content */}
        <div className="relative flex flex-col items-center justify-center text-center px-4 hero-center-content"
          style={{ maxWidth: 680, zIndex: 20, marginTop: window.innerWidth < 768 ? 0 : '-80px' }}>

          <motion.div
            className="hero-logo-wrap"
            style={{ marginBottom: 8, display: 'flex', justifyContent: 'center', height: 90, overflow: 'hidden', alignItems: 'center' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div style={{ transform: 'scale(0.52)', transformOrigin: 'center center', flexShrink: 0 }}>
              <BrandLogo variant="dark" />
            </div>
          </motion.div>

          <motion.h1
            className="font-black leading-none mb-1"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 'clamp(36px, 6vw, 76px)',
              letterSpacing: '-0.03em',
              color: '#0f0f12',
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.55, ease: 'easeOut' }}
          >
            {lang === 'de' ? 'Ihr Partner für' : 'Your Partner for'}
          </motion.h1>

          {/* Rotating service descriptor */}
          <LayoutGroup>
            <motion.div
              className="flex items-center justify-center overflow-hidden"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 'clamp(36px, 6vw, 76px)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                minHeight: 'clamp(44px, 8vw, 92px)',
              }}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.55, ease: 'easeOut' }}
            >
              <TextRotate
                texts={
                  lang === 'de'
                    ? ['Sicherheit', 'Gebäudedienste', 'Reinigung', 'Objektschutz', 'Facilitymanagement']
                    : ['Security', 'Facility Services', 'Cleaning', 'Site Protection', 'Guard Services']
                }
                mainClassName="overflow-hidden rounded-xl px-3 py-1"
                elementLevelClassName=""
                style={{ color: ROTATE_COLORS[rotateColorIdx], transition: 'color 0.3s ease' }}
                staggerDuration={0.025}
                staggerFrom="last"
                rotationInterval={2800}
                onNext={handleRotateNext}
                transition={{ type: 'spring', damping: 28, stiffness: 380 }}
              />
            </motion.div>
          </LayoutGroup>

          <motion.p
            ref={subRef}
            className="mt-4 leading-relaxed"
            style={{
              fontSize: 'clamp(15px, 2.2vw, 20px)',
              fontWeight: 300,
              color: 'rgba(15,15,18,0.65)',
              letterSpacing: '-0.01em',
              maxWidth: '34rem',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5, ease: 'easeOut' }}
          >
            {t('home.heroSub')}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 mt-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5, ease: 'easeOut' }}
          >
            <LiquidButton as={Link} to="/services" tint="#FACC15" textColor="#0f0f12">
              {lang === 'de' ? 'Unsere Leistungen' : 'Our Services'} →
            </LiquidButton>
            <LiquidButton as={Link} to="/contact" textColor="#0f0f12">
              {lang === 'de' ? 'Kontakt aufnehmen' : 'Get in Touch'}
            </LiquidButton>
          </motion.div>
        </div>
      </section>

      <Ticker />

      {/* ════ SERVICES SLIDESHOW ════ */}
      <HomeServicesGrid />

      {/* ════ WORK PREVIEW ════ */}
      <section ref={workRef} style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)',
        padding: '72px clamp(14px, 4vw, 28px) 28px',
        borderTop: '1px solid rgba(30,31,40,0.06)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: 16,
          padding: '0 4px clamp(28px, 5vw, 36px)',
        }}>
          <h2 style={{
            fontSize: 'clamp(24px, 3.5vw, 52px)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            color: '#000000',
            lineHeight: 1.1,
          }}>
            {t('home.workTitle1')}<br />{t('home.workTitle2')}
          </h2>
          <Link to="/work" style={{
            fontSize: 14, fontWeight: 400, color: '#000000',
            textDecoration: 'underline', textUnderlineOffset: 3,
            flexShrink: 0, marginLeft: 24,
          }}>
            {t('home.workLink')}
          </Link>
        </div>

        <div className="home-work-grid">
          <div ref={card1Ref} style={{ minWidth: 0 }}>
            <WorkCard project={featured[0]} />
          </div>
          <div ref={card2Ref} style={{ minWidth: 0 }}>
            <WorkCard project={featured[1]} />
          </div>
        </div>
      </section>

      {/* ════ SERVICES GRID (moved above) ════ */}

      {/* ════ TESTIMONIALS ════ */}
      <Testimonials />

      {/* ════ CTA DARK ════ */}
      <section style={{
        background: '#000000',
        padding: 'clamp(56px, 12vw, 120px) clamp(20px, 5vw, 40px)',
        display: 'flex', flexDirection: 'column', gap: 44,
        overflow: 'hidden',
      }}>
        <div
          className={lang === 'de' ? 'headline-barlow-de' : undefined}
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(56px, 10vw, 148px)',
            color: '#fff',
            letterSpacing: '-0.008em',
            ...(lang === 'de'
              ? {
                textTransform: 'none',
                textRendering: 'optimizeLegibility',
                fontVariantLigatures: 'none',
              }
              : {
                textTransform: 'uppercase',
                lineHeight: 0.87,
              }),
          }}
        >
          {[t('home.cta1'), t('home.cta2'), t('home.cta3')].map((line, i) => (
            <span
              key={i}
              style={{
                display: 'block',
                lineHeight: lang === 'de' ? 1.08 : 0.87,
                marginBottom: lang === 'de' && i < 2 ? '0.04em' : undefined,
              }}
            >
              {typeof line === 'string' ? line.normalize('NFC') : line}
            </span>
          ))}
        </div>
        <div style={{ alignSelf: 'flex-start' }}>
          <LiquidButton as="a" href="mailto:kontact@suhail.de" tint="#FACC15" textColor="#000000" style={{ fontSize: 15, padding: '10px 24px' }}>
            {'kontact@suhail.de ↗︎'}
          </LiquidButton>
        </div>
      </section>
    </div>
  )
}

/* ─────────────────────────────────────────────
   HOME SERVICES GRID
───────────────────────────────────────────── */
const HOME_SERVICES = [
  { slug: 'office-cleaning', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l9-9" /><path d="M12.5 5.5l6 6" /><path d="M6 15l3-3 6.5-6.5a2.12 2.12 0 0 1 3 3L12 15l-3 3z" /></svg>, title: 'Cleaning', desc: 'Office, construction, deep & maintenance cleaning.' },
  { slug: 'warehouse-services', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20V8l10-5 10 5v12" /><rect x="8" y="14" width="8" height="6" /><line x1="12" y1="14" x2="12" y2="20" /></svg>, title: 'Warehouse Services', desc: 'Picking, sorting, packing & goods inspection.' },
  { slug: 'cashier-services', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /><line x1="6" y1="15" x2="6.01" y2="15" /><line x1="10" y1="15" x2="14" y2="15" /></svg>, title: 'Cashier Services', desc: 'Qualified checkout staff for retail & supermarkets.' },
  { slug: 'transport', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>, title: 'Transport', desc: 'Moving vans, delivery & logistics support.' },
  { slug: 'electrical-assistance', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>, title: 'Electrical Assistance', desc: 'Helper services for electrical work on site.' },
  { slug: 'installation-unpacking', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8" /><rect x="1" y="3" width="22" height="5" /><line x1="10" y1="12" x2="14" y2="12" /></svg>, title: 'Installation & Unpacking', desc: 'Furniture assembly, installation & packing.' },
  { slug: 'staffing-services', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>, title: 'Staffing Services', desc: 'Temporary workers & flexible workforce solutions.' },
  { slug: 'general-services', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-4 0v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" /></svg>, title: 'General Services', desc: 'Flexible on-demand support for companies & private clients.' },
]

function HomeServiceCard({ service }) {
  const [hov, setHov] = useState(false)

  return (
    <Link
      to={`/services/${service.slug}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: hov ? '#0f0f12' : '#fff',
        border: `1.5px solid ${hov ? '#FACC15' : 'rgba(30,31,40,0.09)'}`,
        borderRadius: 16,
        padding: 'clamp(18px,2.5vw,28px)',
        textDecoration: 'none',
        transition: 'background 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease, transform 0.28s ease',
        boxShadow: hov ? '0 12px 40px rgba(250,204,21,0.12)' : '0 2px 12px rgba(10,11,18,0.06)',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        cursor: 'pointer',
      }}
    >
      <div style={{
        width: 52, height: 52, borderRadius: 12,
        background: hov ? 'rgba(250,204,21,0.15)' : 'rgba(30,31,40,0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 16,
        color: hov ? '#FACC15' : '#0f0f12',
        transition: 'background 0.28s ease, color 0.28s ease',
      }}>
        {service.icon}
      </div>
      <p style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: 'clamp(15px,1.4vw,18px)', fontWeight: 700,
        color: hov ? '#FACC15' : '#0f0f12',
        letterSpacing: '-0.01em', margin: '0 0 8px',
        textTransform: 'uppercase',
        transition: 'color 0.25s ease',
      }}>
        {service.title}
      </p>
      <p style={{
        fontSize: 13,
        color: hov ? 'rgba(255,255,255,0.65)' : 'rgba(30,31,40,0.55)',
        margin: 0, lineHeight: 1.6,
        transition: 'color 0.25s ease',
      }}>
        {service.desc}
      </p>
    </Link>
  )
}

function HomeServicesGrid() {
  const { t } = useLanguage()
  const trackRef = useRef(null)
  const translatedServices = t('home.homeServices') || []
  // Merge translated text with icons/slugs from the static array
  const services = HOME_SERVICES.map((svc, i) => ({
    ...svc,
    title: translatedServices[i]?.title || svc.title,
    desc: translatedServices[i]?.desc || svc.desc,
  }))

  const doubled = [...services, ...services]

  return (
    <section style={{
      padding: '28px 0',
      background: '#f5f5f7',
      overflow: 'hidden',
      borderBottom: '1px solid rgba(30,31,40,0.07)',
    }}>
      <style>{`
        @keyframes slide-ltr {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .services-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: slide-ltr 32s linear infinite;
        }
        .services-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Fade edges */}
      <div style={{ position: 'relative' }}>
        <div style={{
          pointerEvents: 'none', position: 'absolute', inset: 0, zIndex: 2,
          background: 'linear-gradient(to right, #f5f5f7 0%, transparent 8%, transparent 92%, #f5f5f7 100%)',
        }} />
        <div ref={trackRef} className="services-track" style={{ padding: '8px 0' }}>
          {doubled.map((svc, i) => (
            <div key={i} style={{ flexShrink: 0, width: 'clamp(220px, 22vw, 280px)', height: 180, display: 'flex' }}>
              <HomeServiceCard service={svc} delay={0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
