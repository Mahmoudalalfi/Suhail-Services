import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import BrandLogo from './BrandLogo'

const NAV_LINKS = [
  { key: 'nav.projects', to: '/work'     },
  { key: 'nav.about',    to: '/about'    },
  { key: 'nav.services', to: '/services' },
  { key: 'nav.news',     to: '/blog'     },
  { key: 'nav.gallery',  to: '/gallery'  },
  { key: 'nav.contact',  to: '/contact'  },
]

/* data URI of a 1x1 #1B3A7A pixel — Samsung Internet does NOT recolor background-image */
const GLASS_IMG = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%231B3A7A'/%3E%3C/svg%3E\")"
const GLASS = `${GLASS_IMG}, #1B3A7A`

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return mobile
}

function navLinkIsActive(to, pathname) {
  return pathname === to || pathname.startsWith(`${to}/`)
}

function getActivePageName(pathname, t) {
  if (pathname === '/') return 'Home'
  const link = NAV_LINKS.find(({ to }) => navLinkIsActive(to, pathname))
  return link ? t(link.key) : 'Home'
}

export default function Nav() {
  const { pathname } = useLocation()
  const { lang, toggleLanguage, t } = useLanguage()
  const isMobile = useIsMobile()

  const [collapsed, setCollapsed] = useState(false)
  const [hovered,   setHovered]   = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const isMinimized = collapsed && !hovered

  const pillRef      = useRef(null)
  const navRailRef   = useRef(null)
  const homeLinkRef  = useRef(null)
  const linkRefs     = useRef([])

  const lastY  = useRef(0)
  const raf    = useRef(null)
  const timer  = useRef(null)

  /* Close menu on route change */
  useEffect(() => { setMenuOpen(false) }, [pathname])

  /* Scroll: collapse on scroll-down, expand on scroll-up */
  useEffect(() => {
    lastY.current = window.scrollY
    const onScroll = () => {
      if (raf.current) return
      raf.current = requestAnimationFrame(() => {
        raf.current = null
        const y  = window.scrollY
        const dy = y - lastY.current
        lastY.current = y
        clearTimeout(timer.current)
        timer.current = setTimeout(() => {
          if (dy > 0 && y > 40) setCollapsed(true)
          if (dy < 0)           setCollapsed(false)
        }, 30)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer.current)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  /* Active tab highlight — handled via CSS background on the active link directly */

  const activePageName = getActivePageName(pathname, t)

  /* ── MOBILE NAV ── */
  if (isMobile) {
    return (
      <>
        {/* Pill-shaped floating header */}
        <div className="nav-pill-mobile" style={{
          position: 'fixed', top: 10, left: 12, right: 12, zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 10px 0 10px', height: 60, boxSizing: 'border-box',
          background: '#1B3A7A',
          borderRadius: 999,
          boxShadow: '0 4px 24px rgba(30,31,40,0.13)',
        }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <BrandLogo variant="dark" mobile />
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <LangButton lang={lang} onToggle={toggleLanguage} />
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              data-open={menuOpen ? 'true' : 'false'}
              className="mobile-menu-toggle"
              style={{
                width: 36, height: 36, borderRadius: 999,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0,
              }}
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ pointerEvents: 'none' }}>
                <path className="menu-bar menu-bar-top" d="M4 12L20 12" />
                <path className="menu-bar menu-bar-mid" d="M4 12H20" />
                <path className="menu-bar menu-bar-bot" d="M4 12H20" />
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <>
              {/* outside-click backdrop */}
              <div
                onClick={() => setMenuOpen(false)}
                style={{ position: 'fixed', inset: 0, zIndex: 998 }}
              />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="nav-menu-dropdown"
              style={{
                position: 'fixed', top: 78, left: 12, right: 12, zIndex: 999,
                background: GLASS,
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 24,
                boxShadow: '0 8px 32px rgba(30,31,40,0.14)',
                padding: '8px 0 12px',
                overflow: 'hidden',
              }}
            >
              <Link to="/" onClick={() => setMenuOpen(false)} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '12px 20px', textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.12)',
                fontSize: 15, fontWeight: pathname === '/' ? 600 : 400, color: '#fff',
                background: pathname === '/' ? 'rgba(255,255,255,0.12)' : 'transparent',
              }}>
                <HomeIcon />
                <span>{t('nav.home')}</span>
                {pathname === '/' && <span style={{ marginLeft: 4, color: '#fff' }}>●</span>}
              </Link>
              {NAV_LINKS.map(({ key, to }) => {
                const active = navLinkIsActive(to, pathname)
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'block', padding: '12px 20px',
                      fontSize: 15, fontWeight: active ? 600 : 400,
                      color: '#fff', textDecoration: 'none',
                      letterSpacing: '-0.01em',
                      borderBottom: '1px solid rgba(255,255,255,0.12)',
                      background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
                    }}
                  >
                    {t(key)}
                    {active && <span style={{ marginLeft: 8, color: '#fff' }}>●</span>}
                  </Link>
                )
              })}
            </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    )
  }

  /* ── DESKTOP NAV ── */
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center',
      padding: '0 28px', height: 80, boxSizing: 'border-box', pointerEvents: 'none',
      gap: 16,
    }}>

      {/* Logo — fades out when minimized OR on home page (logo shown in hero instead) */}
      <motion.div
        style={{ pointerEvents: 'auto', flexShrink: 0 }}
        animate={{ opacity: (isMinimized || pathname === '/') ? 0 : 1, scale: isMinimized ? 0.9 : 1, pointerEvents: (isMinimized || pathname === '/') ? 'none' : 'auto' }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <BrandLogo variant="dark" compact />
        </Link>
      </motion.div>

      {/* Spacer to push nav pill to center */}
      <div style={{ flex: 1 }} />

      <motion.div
        ref={pillRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{ maxWidth: isMinimized ? (pathname === '/' ? 60 : Math.max(80, activePageName.length * 11 + 48)) : 900 }}
        transition={{ type: 'spring', damping: 32, stiffness: 300, mass: 0.75 }}
        style={{
          pointerEvents: 'auto',
          background: '#1B3A7A',
          border: '1px solid rgba(255,255,255,0.18)',
          boxShadow: '0 4px 24px rgba(10,20,60,0.22)',
          borderRadius: 999,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: isMinimized ? 'pointer' : 'default',
          position: 'relative',
          height: 52,
          flexShrink: 0,
        }}
        onClick={() => { if (isMinimized) setCollapsed(false) }}
      >
        <motion.div
          animate={{ opacity: isMinimized ? 1 : 0, pointerEvents: isMinimized ? 'auto' : 'none' }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 2,
          }}
        >
          {pathname === '/' ? (
            <HomeIcon />
          ) : (
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 400,
              fontSize: 15, letterSpacing: '-0.01em', color: '#fff',
              textTransform: 'uppercase', whiteSpace: 'nowrap',
            }}>
              {activePageName}
            </span>
          )}
        </motion.div>

        <motion.nav
          ref={navRailRef}
          animate={{ opacity: isMinimized ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'relative',
            display: 'flex', alignItems: 'center',
            gap: 0, padding: '5px 6px', whiteSpace: 'nowrap',
            pointerEvents: isMinimized ? 'none' : 'auto',
            zIndex: 1,
          }}
        >
          <Link
            ref={homeLinkRef}
            to="/"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 36, height: 36, borderRadius: 999,
              background: pathname === '/' ? 'rgba(255,255,255,0.18)' : 'transparent',
              textDecoration: 'none',
              position: 'relative', zIndex: 1, flexShrink: 0,
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => { if (pathname !== '/') e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
            onMouseLeave={e => { if (pathname !== '/') e.currentTarget.style.background = 'transparent' }}
          >
            <HomeIcon />
          </Link>
          {NAV_LINKS.map(({ key, to }, i) => {
            const active = navLinkIsActive(to, pathname)
            return (
              <Link
                key={to}
                ref={node => { linkRefs.current[i] = node }}
                to={to}
                style={{
                  padding: lang === 'de' ? '8px 11px' : '8px 18px', borderRadius: 999,
                  fontSize: lang === 'de' ? 13 : 15, fontWeight: active ? 600 : 400,
                  color: '#fff', letterSpacing: '-0.01em',
                  lineHeight: 1, whiteSpace: 'nowrap',
                  background: active ? 'rgba(255,255,255,0.18)' : 'transparent',
                  textTransform: 'uppercase',
                  textDecoration: 'none', position: 'relative', zIndex: 1,
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = active ? 'rgba(255,255,255,0.18)' : 'transparent' }}
              >
                {t(key)}
              </Link>
            )
          })}
        </motion.nav>
      </motion.div>

      {/* Spacer to push right panel to the right */}
      <div style={{ flex: 1 }} />

      <motion.div
        style={{
          pointerEvents: 'auto', flexShrink: 0,
          display: 'flex', alignItems: 'center', gap: 10,
        }}
        animate={{ opacity: isMinimized ? 0 : 1, scale: isMinimized ? 0.9 : 1 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <Link
          to="/contact"
          style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '7px 18px', borderRadius: 999, height: 52,
            background: '#1B3A7A',
            border: '1px solid rgba(255,255,255,0.18)',
            boxShadow: '0 4px 24px rgba(10,20,60,0.22)',
            color: '#fff', fontSize: 15, fontWeight: 400,
            letterSpacing: '-0.01em', textTransform: 'uppercase',
            textDecoration: 'none', whiteSpace: 'nowrap',
            transition: 'background 0.2s',
            boxSizing: 'border-box',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#142d5e' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#1B3A7A' }}
        >
          {lang === 'de' ? 'Angebot anfordern' : 'Get a Quote'}
        </Link>
        <LangButton lang={lang} onToggle={toggleLanguage} />
      </motion.div>
    </header>
  )
}

function LangButton({ lang, onToggle }) {
  const btnRef = useRef(null)

  const handleClick = () => {
    const btn = btnRef.current
    if (!btn) return
    gsap.timeline()
      .to(btn, { scaleX: 0.35, opacity: 0.55, duration: 0.13, ease: 'power3.in' })
      .call(onToggle)
      .to(btn, { scaleX: 1, opacity: 1, duration: 0.42, ease: 'elastic.out(1, 0.55)' })
  }

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={handleClick}
      style={{
        position: 'relative',
        display: 'inline-flex', alignItems: 'center', gap: 7,
        padding: '7px 14px', borderRadius: 999, border: 'none',
        fontSize: 14, fontWeight: 500, letterSpacing: '0.03em',
        whiteSpace: 'nowrap', cursor: 'pointer', color: '#fff',
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(20px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
        border: '1px solid rgba(255,255,255,0.22)',
        boxShadow: [
          '0 4px 16px rgba(0,0,0,0.14)',
          'inset 0 1px 0 rgba(255,255,255,0.35)',
          'inset 0 -1px 0 rgba(0,0,0,0.05)',
        ].join(', '),
        transformOrigin: 'center center', willChange: 'transform',
        transition: 'box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.06)'
        gsap.to(e.currentTarget, { scale: 1.06, duration: 0.18, ease: 'power2.out' })
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.05)'
        gsap.to(e.currentTarget, { scale: 1, duration: 0.22, ease: 'power2.out' })
      }}
    >
      {/* gloss streak */}
      <span aria-hidden style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: '40%',
        borderRadius: '0 0 50% 50%',
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.28) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />
      {lang === 'en' ? <FlagUS /> : <FlagDE />}
      <span style={{ lineHeight: 1, position: 'relative' }}>{lang.toUpperCase()}</span>
    </button>
  )
}

function FlagUS() {
  return (
    <svg width="22" height="15" viewBox="0 0 22 15"
      style={{ borderRadius: 3, flexShrink: 0, display: 'block',
               filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}>
      <defs>
        <linearGradient id="us-sheen" gradientUnits="userSpaceOnUse" x1="-15" y1="0" x2="-5" y2="0">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
          <animate attributeName="x1" values="-15;25" dur="3.8s" begin="0.6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="-5;35" dur="3.8s" begin="0.6s" repeatCount="indefinite" />
        </linearGradient>
      </defs>
      {Array.from({ length: 13 }, (_, i) => (
        <rect key={i} x={0} y={i*(15/13)} width={22} height={15/13+0.15} fill={i%2===0?'#B22234':'#FFFFFF'} />
      ))}
      <rect x={0} y={0} width={9} height={15*7/13} fill="#3C3B6E" />
      {[0,1,2,3,4,5,6,7,8].map(r =>
        Array.from({ length: r%2===0?6:5 }, (_,c) => (
          <circle key={`${r}-${c}`} cx={(r%2===0?0.65:1.3)+c*1.4} cy={0.65+r*0.85} r={0.28} fill="white" />
        ))
      )}
      <rect x={0} y={0} width={22} height={15} fill="url(#us-sheen)" style={{ mixBlendMode:'screen' }} />
    </svg>
  )
}

function FlagDE() {
  return (
    <svg width="22" height="15" viewBox="0 0 22 15"
      style={{ borderRadius: 3, flexShrink: 0, display: 'block',
               filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}>
      <defs>
        <linearGradient id="de-sheen" gradientUnits="userSpaceOnUse" x1="-15" y1="0" x2="-5" y2="0">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
          <animate attributeName="x1" values="-15;25" dur="3.8s" begin="1.8s" repeatCount="indefinite" />
          <animate attributeName="x2" values="-5;35" dur="3.8s" begin="1.8s" repeatCount="indefinite" />
        </linearGradient>
      </defs>
      <rect x={0} y={0}  width={22} height={5} fill="#000000" />
      <rect x={0} y={5}  width={22} height={5} fill="#DD0000" />
      <rect x={0} y={10} width={22} height={5} fill="#FFCE00" />
      <rect x={0} y={0}  width={22} height={15} fill="url(#de-sheen)" style={{ mixBlendMode:'screen' }} />
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M2.5 8.5L10 2.5l7.5 6V17a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5V8.5z"
        stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7.5 17.5v-5.25a.25.25 0 01.25-.25h4.5a.25.25 0 01.25.25V17.5"
        stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}
