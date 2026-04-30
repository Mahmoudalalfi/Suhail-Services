import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const GALLERY_URLS = [
  'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490389/suhail-services/imprint-security-team.png',
  'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490367/suhail-services/history-facts-facility-security-hero.png',
  'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490337/suhail-services/about_1_1777327649561.jpg',
  'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490580/suhail-services/pencil-facility-construction-sites.png',
  'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490736/suhail-services/pencil-janitorial-services.png',
  'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490754/suhail-services/pencil-security-technology.jpg',
  'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490800/suhail-services/work-project-01.png',
  'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490339/suhail-services/about_2_1777327661089.jpg',
  'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490606/suhail-services/pencil-facility-healthcare.png',
  'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490747/suhail-services/pencil-outdoor-area-care.png',
  'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490564/suhail-services/pencil-day-service-staff.png',
  'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490739/suhail-services/pencil-maintenance-cleaning.png',
  'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490816/suhail-services/work-project-06.png',
  'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490806/suhail-services/work-project-03.png',
  'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490647/suhail-services/pencil-glass-facade-cleaning.png',
  'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490813/suhail-services/work-project-05.png',
  'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490381/suhail-services/imprint-extra-operations.png',
  'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490803/suhail-services/work-project-02.png',
]

const CARD_W = 320
const CARD_GAP = 20
const CARD_STRIDE = CARD_W + CARD_GAP
const SPEED_PX_PER_SEC = 60

// Shared zoomed state lifted to module level so both rows share one overlay
let _setGlobalZoomed = null
let _setGlobalPaused = null

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

  function handleMouseEnter(idx, item) {
    pausedRef.current = true
    setHoveredIdx(idx)
    if (_setGlobalZoomed) _setGlobalZoomed(item)
  }

  function handleMouseLeave() {
    pausedRef.current = false
    setHoveredIdx(null)
    if (_setGlobalZoomed) _setGlobalZoomed(null)
  }

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
            onMouseEnter={() => handleMouseEnter(idx, item)}
            onMouseLeave={handleMouseLeave}
            style={{
              flexShrink: 0,
              width: CARD_W,
              height: 240,
              borderRadius: 14,
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer',
              boxShadow: '0 4px 24px rgba(10,11,18,0.10)',
              border: '1.5px solid rgba(250,204,21,0.13)',
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

  useEffect(() => {
    _setGlobalZoomed = setZoomed
    return () => { _setGlobalZoomed = null }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: zoomed ? 'rgba(10,11,18,0.72)' : 'rgba(10,11,18,0)',
        backdropFilter: zoomed ? 'blur(6px)' : 'blur(0px)',
        transition: 'background 0.35s ease, backdrop-filter 0.35s ease',
      }}
    >
      <div style={{
        width: '50vw',
        maxWidth: 860,
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
              style={{ width: '100%', height: '56vw', maxHeight: 500, objectFit: 'cover', display: 'block' }}
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
    </div>
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
            background: 'linear-gradient(90deg, #FACC15 0%, #EAB308 100%)',
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
          <GallerySlideshow galleryItems={galleryItems} />
        </div>
        <div ref={row2Ref} style={{ opacity: 0 }}>
          <GallerySlideshow reverse galleryItems={galleryItems} />
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
  'Construction & Interior Work': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
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
    category: 'Construction & Interior Work',
    slug: 'construction-interior',
    desc: 'Skilled support for construction projects and interior finishing.',
    bullets: ['Construction assistance', 'Interior finishing', 'Renovation', 'Drywall work'],
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
      {/* Icon */}
      <div style={{
        width: 52,
        height: 52,
        borderRadius: 12,
        background: hov ? 'rgba(250,204,21,0.15)' : 'rgba(30,31,40,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        color: hov ? '#FACC15' : '#0f0f12',
        transition: 'background 0.28s ease, color 0.28s ease',
      }}>
        {SERVICE_ICON[service.category] || SERVICE_ICON['General Services']}
      </div>

      {/* Title */}
      <p style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: 'clamp(15px,1.4vw,18px)',
        fontWeight: 700,
        color: hov ? '#FACC15' : '#0f0f12',
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
            <span style={{ color: '#FACC15', fontSize: 12, lineHeight: '20px', flexShrink: 0 }}>✓</span>
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
          background: 'linear-gradient(90deg,#FACC15,#EAB308)',
          margin: '0 auto',
        }} />
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,220px), 1fr))',
        gap: 'clamp(12px,1.8vw,20px)',
        maxWidth: 1200,
        margin: '0 auto',
      }}>
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
          background: 'linear-gradient(90deg,#FACC15,#EAB308)',
          margin: '0 auto',
        }} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'clamp(12px,2vw,22px)',
        maxWidth: 1200,
        margin: '0 auto',
      }}
        className="why-grid"
      >
        {whyItems.map((item, i) => (
          <WhyCard key={i} item={item} delay={i * 0.07} />
        ))}
      </div>
    </section>
  )
}

function WhyCard({ item, delay }) {
  const ref = useRef(null)
  const [hov, setHov] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(ref.current,
      { opacity: 0, y: 28 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay,
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true }
      }
    )
  }, [delay])

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'left',
        padding: 'clamp(20px,2.5vw,28px)',
        borderRadius: 16,
        background: hov ? '#0f0f12' : '#fff',
        border: `1.5px solid ${hov ? '#FACC15' : 'rgba(30,31,40,0.09)'}`,
        boxShadow: hov ? '0 12px 40px rgba(250,204,21,0.12)' : '0 2px 12px rgba(10,11,18,0.06)',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'background 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease, transform 0.28s ease',
      }}
    >
      <div style={{
        width: 52, height: 52, borderRadius: 12,
        background: hov ? 'rgba(250,204,21,0.15)' : 'rgba(30,31,40,0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: hov ? '#FACC15' : '#0f0f12',
        marginBottom: 16,
        transition: 'background 0.28s ease, color 0.28s ease',
      }}>
        {item.icon}
      </div>
      <p style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: 'clamp(14px,1.3vw,17px)',
        fontWeight: 700,
        color: hov ? '#FACC15' : '#0f0f12',
        letterSpacing: '-0.01em',
        textTransform: 'uppercase',
        margin: '0 0 8px',
        transition: 'color 0.25s ease',
      }}>
        {item.title}
      </p>
      <p style={{
        fontSize: 13,
        color: hov ? 'rgba(255,255,255,0.60)' : 'rgba(30,31,40,0.55)',
        margin: 0,
        lineHeight: 1.6,
        transition: 'color 0.25s ease',
      }}>
        {item.desc}
      </p>
    </div>
  )
}
