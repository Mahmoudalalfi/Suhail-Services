import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const GALLERY_URLS = [
  'https://res.cloudinary.com/df7aiznm6/image/upload/v1777490389/suhail-services/imprint-security-team.png',
  'https://res.cloudinary.com/df7aiznm6/image/upload/v1777490367/suhail-services/history-facts-facility-security-hero.png',
  'https://res.cloudinary.com/df7aiznm6/image/upload/v1779230964/NewAbout_rhys19.png',
  'https://res.cloudinary.com/df7aiznm6/image/upload/v1777490580/suhail-services/pencil-facility-construction-sites.png',
  'https://res.cloudinary.com/df7aiznm6/image/upload/v1777490736/suhail-services/pencil-janitorial-services.png',
  'https://res.cloudinary.com/df7aiznm6/image/upload/v1777490754/suhail-services/pencil-security-technology.jpg',
  'https://res.cloudinary.com/df7aiznm6/image/upload/v1777490800/suhail-services/work-project-01.png',
  'https://res.cloudinary.com/df7aiznm6/image/upload/v1777490339/suhail-services/about_2_1777327661089.jpg',
  'https://res.cloudinary.com/df7aiznm6/image/upload/v1777490606/suhail-services/pencil-facility-healthcare.png',
  'https://res.cloudinary.com/df7aiznm6/image/upload/v1777490747/suhail-services/pencil-outdoor-area-care.png',
  'https://res.cloudinary.com/df7aiznm6/image/upload/v1777580100/pencil-day-service-staff_koskip.jpg',
  'https://res.cloudinary.com/df7aiznm6/image/upload/v1777490739/suhail-services/pencil-maintenance-cleaning.png',
  'https://res.cloudinary.com/df7aiznm6/image/upload/v1777490816/suhail-services/work-project-06.png',
  'https://res.cloudinary.com/df7aiznm6/image/upload/v1777490806/suhail-services/work-project-03.png',
  'https://res.cloudinary.com/df7aiznm6/image/upload/v1777490647/suhail-services/pencil-glass-facade-cleaning.png',
  'https://res.cloudinary.com/df7aiznm6/image/upload/v1777580142/work-project-05_pwdduz.png',
  'https://res.cloudinary.com/df7aiznm6/image/upload/v1777580060/imprint-extra-operations_ojmpml.jpg',
  'https://res.cloudinary.com/df7aiznm6/image/upload/v1777580123/work-project-02_sg8bni.jpg',
]

const CARD_W = 320
const CARD_GAP = 20
const CARD_STRIDE = CARD_W + CARD_GAP
const SPEED_PX_PER_SEC = 60

// Shared zoomed state lifted to module level so both rows share one overlay
let _setGlobalZoomed = null
let _getGlobalZoomed = null
let _closeAllRows = null
function _registerClose(fn) { _closeAllRows = fn }

function GallerySlideshow({ reverse = false, galleryItems }) {
  const trackRef = useRef(null)
  const animRef = useRef(null)
  const posRef = useRef(0)
  const pausedRef = useRef(false)
  const [hoveredIdx, setHoveredIdx] = useState(null)

  // Triple the items for seamless infinite scroll
  const ITEMS = [...galleryItems, ...galleryItems, ...galleryItems]
  const totalOrigW = galleryItems.length * CARD_STRIDE

  useEffect(() => {
    let last = null

    function step(ts) {
      if (last === null) last = ts
      const dt = ts - last
      last = ts

      if (!pausedRef.current) {
        posRef.current += (SPEED_PX_PER_SEC * dt) / 1000
        if (posRef.current >= totalOrigW) posRef.current -= totalOrigW
        if (trackRef.current) {
          const tx = reverse
            ? posRef.current - totalOrigW
            : -posRef.current
          trackRef.current.style.transform = `translateX(${tx}px)`
        }
      }

      animRef.current = requestAnimationFrame(step)
    }

    animRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animRef.current)
  }, [totalOrigW])

  function openZoom(item) {
    pausedRef.current = true
    if (_setGlobalZoomed) _setGlobalZoomed(item)
  }

  function closeZoom() {
    pausedRef.current = false
    setHoveredIdx(null)
    if (_setGlobalZoomed) _setGlobalZoomed(null)
  }

  // expose closeZoom so overlay can resume the ribbon
  useEffect(() => {
    _registerClose(closeZoom)
    return () => _registerClose(null)
  })

  // Handle clicking outside on mobile to resume
  useEffect(() => {
    function handleOutside(e) {
      if (window.innerWidth < 1024) {
        if (trackRef.current && !trackRef.current.contains(e.target)) {
          pausedRef.current = false
          setHoveredIdx(null)
        }
      }
    }
    document.addEventListener('touchstart', handleOutside)
    document.addEventListener('mousedown', handleOutside)
    return () => {
      document.removeEventListener('touchstart', handleOutside)
      document.removeEventListener('mousedown', handleOutside)
    }
  }, [])

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: CARD_GAP,
          willChange: 'transform',
          width: `${ITEMS.length * CARD_STRIDE}px`,
        }}
      >
        {ITEMS.map((item, idx) => (
          <div
            key={idx}
            onMouseEnter={() => { 
              if (window.innerWidth >= 1024) {
                pausedRef.current = true; setHoveredIdx(idx); openZoom(item);
              }
            }}
            onMouseLeave={() => { 
              if (window.innerWidth >= 1024) {
                closeZoom() 
              }
            }}
            onClick={(e) => {
              if (window.innerWidth < 1024) {
                e.preventDefault();
                e.stopPropagation();
                pausedRef.current = true;
                setHoveredIdx(idx);
              } else {
                openZoom(item);
              }
            }}
            onTouchEnd={(e) => { 
              if (window.innerWidth >= 1024) {
                e.preventDefault(); openZoom(item) 
              }
            }}
            style={{
              flexShrink: 0,
              width: CARD_W,
              height: 240,
              borderRadius: 14,
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer',
              boxShadow: '0 4px 24px rgba(10,11,18,0.10)',
              border: '1.5px solid rgba(27,58,122,0.2)',
              background: '#0f0f12',
            }}
          >
            <img
              src={item.url}
              alt={item.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
                transform: hoveredIdx === idx ? 'scale(1.08)' : 'scale(1)',
              }}
              draggable={false}
            />
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(to top, rgba(10,11,18,0.78) 0%, transparent 100%)',
              padding: '32px 16px 14px',
            }}>
              <p style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                color: '#fff',
                letterSpacing: '0.02em',
                margin: 0,
                textTransform: 'uppercase',
              }}>
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ZoomedOverlay() {
  const [zoomed, setZoomed] = useState(null)
  const zoomedRef = useRef(null)

  useEffect(() => {
    _setGlobalZoomed = (item) => { zoomedRef.current = item; setZoomed(item) }
    _getGlobalZoomed = () => zoomedRef.current
    return () => { _setGlobalZoomed = null; _getGlobalZoomed = null }
  }, [])

  function close() {
    zoomedRef.current = null
    setZoomed(null)
    if (_closeAllRows) _closeAllRows()
  }

  return createPortal(
    <div
      onClick={zoomed ? close : undefined}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: zoomed ? 'rgba(10,11,18,0.82)' : 'rgba(10,11,18,0)',
        backdropFilter: zoomed ? 'blur(6px)' : 'blur(0px)',
        transition: 'background 0.35s ease, backdrop-filter 0.35s ease',
        cursor: zoomed ? 'zoom-out' : 'default',
      }}
    >
      <div style={{
        width: 'clamp(280px, 88vw, 860px)',
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: '0 32px 96px rgba(0,0,0,0.55)',
        transform: zoomed ? 'scale(1)' : 'scale(0.88)',
        opacity: zoomed ? 1 : 0,
        transition: 'transform 0.38s cubic-bezier(0.16,1,0.3,1), opacity 0.32s ease',
        pointerEvents: 'none',
        position: 'relative',
      }}>
        {zoomed && (
          <>
            <img
              src={zoomed.url}
              alt={zoomed.title}
              style={{ width: '100%', height: 'clamp(200px, 56vw, 500px)', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(to top, rgba(10,11,18,0.82) 0%, transparent 100%)',
              padding: 'clamp(16px,3vw,32px)',
            }}>
              <p style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 'clamp(18px,2.4vw,30px)',
                fontWeight: 600,
                color: '#fff',
                letterSpacing: '-0.01em',
                margin: 0,
              }}>
                {zoomed.title}
              </p>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  )
}

export default function GalleryPage() {
  const { t } = useLanguage()
  const headRef = useRef(null)
  const row1Ref = useRef(null)
  const row2Ref = useRef(null)

  // Build gallery items from URLs + translated labels
  const imageLabels = t('gallery.imageLabels') || []
  const galleryItems = GALLERY_URLS.map((url, i) => ({
    url,
    title: imageLabels[i] || '',
  }))

  const halfIdx = Math.ceil(galleryItems.length / 2)
  const row1Items = galleryItems.slice(0, halfIdx)
  const row2Items = galleryItems.slice(halfIdx)

  useEffect(() => {
    if (headRef.current) {
      gsap.fromTo(headRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: 0.05 }
      )
    }
    const els = [row1Ref.current, row2Ref.current].filter(Boolean)
    els.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.18 + i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true }
        }
      )
    })
  }, [])

  return (
    <div>
      <ZoomedOverlay />
      {/* Header */}
      <section style={{
        padding: `clamp(108px, 14vh, 152px) clamp(20px, 5vw, 44px) clamp(40px, 6vw, 56px)`,
        background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)',
        borderBottom: '1px solid rgba(30,31,40,0.06)',
      }}>
        <div ref={headRef} style={{ opacity: 0, maxWidth: 920, margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.11em',
            textTransform: 'uppercase',
            color: 'rgba(30,31,40,0.45)',
            marginBottom: 18,
          }}>
            {t('gallery.eyebrow')}
          </p>
          <h1 style={{
            fontSize: 'clamp(32px, 5.4vw, 76px)',
            fontWeight: 300,
            letterSpacing: '-0.035em',
            color: '#0f0f12',
            lineHeight: 1.05,
            margin: 0,
          }}>
            {t('gallery.title1')}<br />{t('gallery.title2')}
          </h1>
          <div style={{
            width: 48, height: 4, borderRadius: 2,
            margin: '28px auto 0',
            background: 'linear-gradient(90deg, #1B3A7A 0%, #162E62 100%)',
          }} aria-hidden />
        </div>
      </section>

      {/* Gallery rows */}
      <section style={{
        padding: 'clamp(40px, 7vw, 72px) 0 clamp(72px, 10vw, 96px)',
        background: '#fafafa',
        overflow: 'hidden',
      }}>
        <div ref={row1Ref} style={{ opacity: 0, marginBottom: CARD_GAP + 8 }}>
          <GallerySlideshow galleryItems={row1Items} />
        </div>
        <div ref={row2Ref} style={{ opacity: 0 }}>
          <GallerySlideshow reverse galleryItems={row2Items} />
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <WhyChooseUs />
    </div>
  )
}

/* ─────────────────────────────────────────────
   SERVICE ICONS (inline SVG, no deps)
───────────────────────────────────────────── */
const SERVICE_ICON = {
  'General Services': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-4 0v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  ),
  'Cleaning': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21l9-9" /><path d="M12.5 5.5l6 6" /><path d="M6 15l3-3 6.5-6.5a2.12 2.12 0 0 1 3 3L12 15l-3 3z" />
    </svg>
  ),
  'Cashier Services': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /><line x1="6" y1="15" x2="6.01" y2="15" /><line x1="10" y1="15" x2="14" y2="15" />
    </svg>
  ),
  'Warehouse Services': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20V8l10-5 10 5v12" /><rect x="8" y="14" width="8" height="6" /><line x1="12" y1="14" x2="12" y2="20" />
    </svg>
  ),
  'Installation & Unpacking': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="21 8 21 21 3 21 3 8" /><rect x="1" y="3" width="22" height="5" /><line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  ),
  'Electrical Assistance': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  'Transport': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  'Staffing Services': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
}

const SERVICES_DATA = [
  {
    category: 'General Services',
    slug: 'general-services',
    desc: 'Flexible support for companies and private clients – available on demand.',
    bullets: ['Services for companies and private clients', 'Flexible support', 'On demand'],
  },
  {
    category: 'Cleaning',
    slug: 'office-cleaning',
    desc: 'Professional cleaning for every area – reliable, efficient, tailored.',
    bullets: ['Office cleaning', 'Construction cleaning', 'Deep cleaning', 'Maintenance cleaning'],
  },
  {
    category: 'Cashier Services',
    slug: 'cashier-services',
    desc: 'Reliable checkout staff for supermarkets and retail.',
    bullets: ['Cashiers for supermarkets', 'Checkout staff support', 'Retail staff support'],
  },
  {
    category: 'Warehouse Services',
    slug: 'warehouse-services',
    desc: 'Professional warehouse work – from order picking to goods inspection.',
    bullets: ['Picking', 'Sorting', 'Packing', 'Goods inspection'],
  },
  {
    category: 'Installation & Unpacking',
    slug: 'installation-unpacking',
    desc: 'Furniture assembly, installation services, and unpacking.',
    bullets: ['Furniture assembly', 'Installation services', 'LR packing service'],
  },
  {
    category: 'Electrical Assistance',
    slug: 'electrical-assistance',
    desc: 'Support for electrical work and helper services on construction sites.',
    bullets: ['Helper services for electrical work', 'Helper services on site'],
  },
  {
    category: 'Transport',
    slug: 'transport',
    desc: 'Moving services, deliveries, and logistics support.',
    bullets: ['Moving vans / cars', 'Delivery', 'Logistics support'],
  },
  {
    category: 'Staffing Services',
    slug: 'staffing-services',
    desc: 'Qualified temporary workers and flexible staffing for projects.',
    bullets: ['Temporary workers', 'Flexible workforce for projects'],
  },
]

const WHY_ITEMS = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Proven Reliability',
    desc: 'Years of trusted service across hundreds of clients — we deliver on every commitment, every time.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Fast Response',
    desc: 'We mobilise quickly. Short notice, urgent requests, last-minute staffing — we are ready when you need us.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: 'Transparent Pricing',
    desc: 'No hidden fees, no surprises. Clear, fair pricing tailored to the scope of your project.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Expert Team',
    desc: 'Trained, vetted professionals across all disciplines — from cleaning crews to warehouse specialists.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6M9 12h6M9 15h4" />
      </svg>
    ),
    title: 'One-Stop Solution',
    desc: 'From staffing to construction support — all services under one roof, one contact, zero hassle.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Germany-Wide Coverage',
    desc: 'Operating across all major cities and regions — we come to your location, wherever you are.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Quality Guaranteed',
    desc: 'Every job is completed to the highest standard. We hold ourselves accountable so you never have to chase results.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: 'Client-First Mindset',
    desc: 'Long-term relationships built on trust, open communication, and genuine care for your business.',
  },
]

function ServiceCard({ service, delay }) {
  const [hov, setHov] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(ref.current,
      { opacity: 0, y: 36 },
      {
        opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', delay,
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true }
      }
    )
  }, [delay])

  return (
    <Link
      to={`/services/${service.slug}`}
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: 0,
        display: 'flex',
        flexDirection: 'column',
        background: hov ? '#0f0f12' : '#fff',
        border: `1.5px solid ${hov ? '#1B3A7A' : 'rgba(30,31,40,0.09)'}`,
        borderRadius: 16,
        padding: 'clamp(18px,2.5vw,28px)',
        textDecoration: 'none',
        transition: 'background 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease, transform 0.28s ease',
        boxShadow: hov ? '0 12px 40px rgba(27,58,122,0.18)' : '0 2px 12px rgba(10,11,18,0.06)',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        cursor: 'pointer',
      }}
    >
      {/* Icon */}
      <div style={{
        width: 52,
        height: 52,
        borderRadius: 12,
        background: hov ? 'rgba(27,58,122,0.1)' : 'rgba(30,31,40,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        color: hov ? '#1B3A7A' : '#0f0f12',
        transition: 'background 0.28s ease, color 0.28s ease',
      }}>
        {SERVICE_ICON[service.category] || SERVICE_ICON['General Services']}
      </div>

      {/* Title */}
      <p style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: 'clamp(15px,1.4vw,18px)',
        fontWeight: 700,
        color: hov ? '#1B3A7A' : '#0f0f12',
        letterSpacing: '-0.01em',
        margin: '0 0 8px',
        textTransform: 'uppercase',
        transition: 'color 0.25s ease',
      }}>
        {service.category}
      </p>

      {/* Bullets */}
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', flex: 1 }}>
        {service.bullets.map((b, i) => (
          <li key={i} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 8,
            marginBottom: 5,
          }}>
            <span style={{ color: '#1B3A7A', fontSize: 12, lineHeight: '20px', flexShrink: 0 }}>✓</span>
            <span style={{
              fontSize: 13,
              color: hov ? 'rgba(255,255,255,0.65)' : 'rgba(30,31,40,0.60)',
              lineHeight: 1.5,
              transition: 'color 0.25s ease',
            }}>{b}</span>
          </li>
        ))}
      </ul>
    </Link>
  )
}

function ServicesSection() {
  const { t } = useLanguage()
  const headRef = useRef(null)
  const servicesData = t('gallery.servicesData') || SERVICES_DATA

  useEffect(() => {
    if (!headRef.current) return
    gsap.fromTo(headRef.current,
      { opacity: 0, y: 32 },
      {
        opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%', once: true }
      }
    )
  }, [])

  return (
    <section style={{
      padding: 'clamp(64px,9vw,100px) clamp(20px,6vw,80px)',
      background: '#f5f5f7',
    }}>
      {/* Header */}
      <div ref={headRef} style={{ opacity: 0, textAlign: 'center', marginBottom: 'clamp(36px,5vw,56px)' }}>
        <p style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(30,31,40,0.42)',
          marginBottom: 14,
        }}>
          {t('gallery.servicesEyebrow')}
        </p>
        <h2 style={{
          fontSize: 'clamp(28px,4.5vw,58px)',
          fontWeight: 300,
          letterSpacing: '-0.03em',
          color: '#0f0f12',
          lineHeight: 1.08,
          margin: '0 auto 20px',
        }}>
          {t('gallery.servicesTitle')}
        </h2>
        <div style={{
          width: 44, height: 4, borderRadius: 2,
          background: 'linear-gradient(90deg,#1B3A7A,#162E62)',
          margin: '0 auto',
        }} />
      </div>

      {/* Grid */}
      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: clamp(12px,1.8vw,20px);
          max-width: 1200px;
          margin: 0 auto;
        }
        @media (max-width: 640px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .services-grid > *:last-child:nth-child(odd) {
            grid-column: 1 / -1;
            max-width: calc(50% - 6px);
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
      <div className="services-grid">
        {servicesData.map((svc, i) => (
          <ServiceCard key={svc.slug || svc.category} service={svc} delay={i * 0.06} />
        ))}
      </div>
    </section>
  )
}

function WhyChooseUs() {
  const { t } = useLanguage()
  const headRef = useRef(null)
  const translatedWhyItems = t('gallery.whyItems') || []
  // Merge translated text with icons from the hardcoded WHY_ITEMS
  const whyItems = translatedWhyItems.map((item, i) => ({
    ...item,
    icon: WHY_ITEMS[i]?.icon || null,
  }))

  useEffect(() => {
    if (!headRef.current) return
    gsap.fromTo(headRef.current,
      { opacity: 0, y: 28 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 87%', once: true }
      }
    )
  }, [])

  return (
    <section style={{
      padding: 'clamp(64px,9vw,100px) clamp(20px,6vw,80px)',
      background: '#f5f5f7',
    }}>
      <div ref={headRef} style={{ opacity: 0, textAlign: 'center', marginBottom: 'clamp(36px,5vw,56px)' }}>
        <p style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(30,31,40,0.42)',
          marginBottom: 14,
        }}>
          {t('gallery.whyEyebrow')}
        </p>
        <h2 style={{
          fontSize: 'clamp(28px,4.5vw,58px)',
          fontWeight: 300,
          letterSpacing: '-0.03em',
          color: '#0f0f12',
          lineHeight: 1.08,
          margin: '0 auto 20px',
        }}>
          {t('gallery.whyTitle')}
        </h2>
        <div style={{
          width: 44, height: 4, borderRadius: 2,
          background: 'linear-gradient(90deg,#1B3A7A,#162E62)',
          margin: '0 auto',
        }} />
      </div>

      <style>{`
        .why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: clamp(12px,2vw,22px);
          max-width: 1200px;
          margin: 0 auto;
        }
        @media (max-width: 640px) {
          .why-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .why-grid > * { height: 100%; }
          .why-card-inner { height: 100%; }
          .why-card-desc {
            display: -webkit-box;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .why-grid > *:last-child:nth-child(odd) {
            grid-column: 1 / -1;
            max-width: calc(50% - 6px);
            margin: 0 auto;
          }
        }
      `}</style>
      <div className="why-grid">
        {whyItems.map((item, i) => (
          <WhyCard key={i} item={item} delay={i * 0.07} />
        ))}
      </div>
    </section>
  )
}

function WhyCard({ item, delay }) {
  const wrapRef = useRef(null)
  const [hov, setHov] = useState(false)

  useEffect(() => {
    if (!wrapRef.current) return
    gsap.fromTo(wrapRef.current,
      { opacity: 0, y: 28 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay,
        scrollTrigger: { trigger: wrapRef.current, start: 'top 90%', once: true }
      }
    )
  }, [delay])

  return (
    /* Outer wrapper: GSAP target, fills the grid cell completely */
    <div ref={wrapRef} style={{ opacity: 0, display: 'flex', width: '100%' }}>
    <div
      className="why-card-inner"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'left',
        padding: 'clamp(20px,2.5vw,28px)',
        borderRadius: 16,
        background: hov ? '#0f0f12' : '#fff',
        border: `1.5px solid ${hov ? '#1B3A7A' : 'rgba(30,31,40,0.09)'}`,
        boxShadow: hov ? '0 12px 40px rgba(27,58,122,0.18)' : '0 2px 12px rgba(10,11,18,0.06)',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'background 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease, transform 0.28s ease',
      }}
    >
      <div style={{
        width: 52, height: 52, borderRadius: 12,
        background: hov ? 'rgba(27,58,122,0.1)' : 'rgba(30,31,40,0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: hov ? '#1B3A7A' : '#0f0f12',
        marginBottom: 16,
        transition: 'background 0.28s ease, color 0.28s ease',
      }}>
        {item.icon}
      </div>
      <p style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: 'clamp(14px,1.3vw,17px)',
        fontWeight: 700,
        color: hov ? '#1B3A7A' : '#0f0f12',
        letterSpacing: '-0.01em',
        textTransform: 'uppercase',
        margin: '0 0 8px',
        transition: 'color 0.25s ease',
      }}>
        {item.title}
      </p>
      <p className="why-card-desc" style={{
        fontSize: 13,
        color: hov ? 'rgba(255,255,255,0.60)' : 'rgba(30,31,40,0.55)',
        margin: 0,
        lineHeight: 1.6,
        transition: 'color 0.25s ease',
      }}>
        {item.desc}
      </p>
    </div>
    </div>
  )
}
