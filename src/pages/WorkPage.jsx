import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'
import useSEO from '../hooks/useSEO'
import LiquidButton from '../components/ui/LiquidButton'

gsap.registerPlugin(ScrollTrigger)

function ProjectCard({ project, index, wide = false }) {
  const ref = useRef(null)
  const [hov, setHov] = useState(false)

  useLayoutEffect(() => {
    if (!ref.current) return
    gsap.set(ref.current, { opacity: 0, y: 55 })
  }, [])

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const rect = el.getBoundingClientRect()
    const aboveViewport = rect.bottom < 0
    if (aboveViewport) { gsap.set(el, { opacity: 1, y: 0 }); return }
    gsap.fromTo(el,
      { opacity: 0, y: 55 },
      {
        opacity: 1, y: 0,
        duration: 0.8, ease: 'power3.out',
        delay: (index % 2) * 0.12,
        scrollTrigger: { trigger: el, start: 'top 70%', once: true },
      }
    )
  }, [])

  return (
    <div ref={ref} style={{ minWidth: 0 }} className={wide ? 'work-project-wide' : undefined}>
      <Link
        className="work-project-card"
        to="#"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{ textDecoration: 'none' }}
      >
        <img
          src={project.img}
          alt={project.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            objectPosition: project.imgPosition || 'center',
            transform: hov ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.75s cubic-bezier(0.16,1,0.3,1)',
            willChange: 'transform',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,11,18,0.62) 0%, transparent 55%)',
          opacity: hov ? 1 : 0.75,
          transition: 'opacity 0.4s',
        }} />
        <div style={{ position: 'absolute', bottom: 'clamp(12px,3vw,26px)', left: 'clamp(12px,3vw,26px)', color: '#fff' }}>
          <p style={{ fontSize: 'clamp(9px,2vw,11px)', fontWeight: 400, opacity: 0.6, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 4 }}>
            {project.tag} · {project.year}
          </p>
          <p style={{ fontSize: 'clamp(13px,3vw,22px)', fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1 }}>
            {project.title}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default function WorkPage() {
  const { t } = useLanguage()
  useSEO({
    title: 'Projekte — Suhaili Service GmbH',
    description: 'Unsere abgeschlossenen Projekte im Bereich Facility Management, Reinigung und technische Dienstleistungen in Berlin und Deutschland.',
    canonical: 'https://www.suhaili-services.de/work',
  })
  const headRef = useRef(null)

  useLayoutEffect(() => {
    if (!headRef.current) return
    gsap.set(headRef.current, { opacity: 0, y: 40 })
  }, [])

  useEffect(() => {
    if (!headRef.current) return
    gsap.fromTo(headRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: 0.05 }
    )
  }, [])

  return (
    <div>
      {/* Header — centered below fixed nav so logo/title never collide */}
      <section style={{
        padding: `clamp(108px, 14vh, 152px) clamp(20px, 5vw, 44px) clamp(40px, 6vw, 56px)`,
        background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)',
        borderBottom: '1px solid rgba(30,31,40,0.06)',
      }}>
        <div
          ref={headRef}
          style={{
            maxWidth: 920,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.11em',
            textTransform: 'uppercase',
            color: 'rgba(30,31,40,0.45)',
            marginBottom: 18,
          }}>
            {t('work.subtitle')}
          </p>
          <h1 style={{
            fontSize: 'clamp(32px, 5.4vw, 76px)',
            fontWeight: 300,
            letterSpacing: '-0.035em',
            color: '#0f0f12',
            lineHeight: 1.05,
            margin: 0,
          }}>
            {t('work.title1')}<br />{t('work.title2')}
          </h1>
          <div style={{
            width: 48,
            height: 4,
            borderRadius: 2,
            margin: '28px auto 0',
            background: 'linear-gradient(90deg, #C9A84C 0%, #B8972E 100%)',
          }} aria-hidden />
        </div>
      </section>

      {/* Project grid — two columns from tablet */}
      <section style={{
        padding: 'clamp(28px, 5vw, 44px) clamp(14px, 4vw, 28px) clamp(72px, 10vw, 96px)',
        background: '#fafafa',
      }}>
        <div className="work-page-grid">
          {t('work.projects').map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} wide={i >= 6} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="work-cta-section" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        height: 'clamp(320px, 38vw, 480px)',
        background: '#0f0f12',
        overflow: 'hidden',
      }}>
        <div className="cta-text-side" style={{
          padding: 'clamp(20px, 3vw, 36px) clamp(24px, 5vw, 48px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 12,
        }}>
          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#C9A84C',
            margin: 0,
          }}>
            {t('work.ctaEyebrow')}
          </p>
          <h2 style={{
            fontSize: 'clamp(18px, 2.2vw, 26px)',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            margin: 0,
            maxWidth: 420,
          }}>
            {t('work.ctaTitle')}
          </h2>
          <LiquidButton as={Link} to="/contact" tint="#C9A84C" textColor="#000" style={{ alignSelf: 'flex-start' }}>
            {t('work.ctaButton')} →
          </LiquidButton>
        </div>
        <div className="cta-image-side" style={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src={t('https://res.cloudinary.com/df7aiznm6/image/upload/v1782513136/VanCorrection_ywi7uk.png')}
            alt={t('work.ctaImageAlt')}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }}
          />
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .work-cta-section {
            display: block !important;
            position: relative !important;
            height: 420px !important;
            overflow: hidden !important;
          }
          .work-cta-section .cta-image-side {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
          }
          .work-cta-section .cta-image-side img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            object-position: center center !important;
          }
          .work-cta-section .cta-image-side::after {
            content: '' !important;
            position: absolute !important;
            inset: 0 !important;
            background: linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.4) 50%, rgba(10,10,10,0.15) 100%) !important;
          }
          .work-cta-section .cta-text-side {
            position: relative !important;
            z-index: 2 !important;
            height: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: flex-end !important;
            text-align: center !important;
            padding: 0 24px 48px !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </div>
  )
}
