import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { useLanguage } from '../i18n/LanguageContext'
import serviceDetailsEn from '../data/serviceDetails'
import serviceDetailsDe from '../data/serviceDetails.de'
import { getServiceHeroImage } from '../data/serviceHeroImages'
import LiquidButton from '../components/ui/LiquidButton'

function findService(servicesList, slug) {
  for (const s of servicesList) {
    if (s.items) {
      const found = s.items.find(item => item.slug === slug)
      if (found) return { service: found, parent: s }
    }
  }
  return null
}

/** Localized yellow label above subpage cards (avoids mixed EN/DE from static data). */
function subPageCategoryLabel(detailSlug, t) {
  if (detailSlug === 'staffing-services') return t('services.subpageCategoryPersonnel')
  if (['office-cleaning', 'construction-cleaning', 'deep-cleaning', 'maintenance-cleaning'].includes(detailSlug))
    return t('services.subpageCategoryCleaning')
  return t('services.subpageCategoryPersonnel')
}

function SubPageCard({ subPage, categoryDisplay }) {
  const { t } = useLanguage()
  const [hov, setHov] = useState(false)
  const thumb = subPage.img || getServiceHeroImage(subPage.slug)
  return (
    <Link
      to={`/services/${subPage.slug}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'block', textDecoration: 'none',
        borderRadius: 14, overflow: 'hidden',
        background: '#fafafa',
        border: `1px solid ${hov ? 'rgba(250,204,21,0.5)' : 'rgba(30,31,40,0.08)'}`,
        transition: 'border-color 0.25s, box-shadow 0.25s',
        boxShadow: hov ? '0 8px 32px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.03)',
      }}
    >
      <div style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, #111 0%, #222 100%)', overflow: 'hidden' }}>
        {thumb
          ? <img src={thumb} alt={subPage.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hov ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.6s ease' }} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(14px, 2vw, 22px)', color: 'rgba(255,255,255,0.07)', letterSpacing: '0.05em', textTransform: 'uppercase', textAlign: 'center', padding: '0 16px' }}>{subPage.title}</span>
            </div>
        }
      </div>
      <div style={{ padding: '20px 24px 24px' }}>
        <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#FACC15', marginBottom: 8 }}>
          {categoryDisplay}
        </p>
        <p style={{ fontSize: 'clamp(15px, 1.5vw, 20px)', fontWeight: 500, color: '#000', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 14 }}>
          {subPage.title}
        </p>
        <span style={{ fontSize: 14, fontWeight: 400, color: hov ? '#000' : 'rgba(30,31,40,0.45)', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: 6 }}>
          {t('common.readMore')}
        </span>
      </div>
    </Link>
  )
}

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const { t, lang } = useLanguage()
  const headRef = useRef(null)
  const serviceCatalog = lang === 'de' ? serviceDetailsDe : serviceDetailsEn

  const servicesList = t('services.servicesList')
  const translationMatch = findService(servicesList, slug)
  const detail = serviceCatalog[slug]

  const serviceName = translationMatch?.service?.name || detail?.title || slug
  const parentSlug = detail?.parentSlug || null
  const heroImg = translationMatch?.service?.img || detail?.heroImage || getServiceHeroImage(slug)

  useEffect(() => {
    if (!headRef.current) return
    gsap.fromTo(headRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.05 }
    )
  }, [slug])

  if (!detail) {
    return (
      <div style={{ padding: '160px 40px 80px', minHeight: '60vh' }}>
        <p style={{ color: '#000', fontSize: 18 }}>{t('common.serviceNotFound')}</p>
        <Link to="/services" style={{ color: '#000', textDecoration: 'underline', marginTop: 16, display: 'inline-block' }}>{t('common.backToServices')}</Link>
      </div>
    )
  }

  return (
    <div style={{ background: '#fff' }}>

      {/* BREADCRUMB */}
      <div style={{ padding: '200px 44px 0', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <Link to="/" style={{ fontSize: 13, color: 'rgba(30,31,40,0.4)', textDecoration: 'none' }}>{t('common.home')}</Link>
        <span style={{ color: 'rgba(30,31,40,0.25)', fontSize: 13 }}>›</span>
        <Link to="/services" style={{ fontSize: 13, color: 'rgba(30,31,40,0.4)', textDecoration: 'none' }}>{t('common.services')}</Link>
        {parentSlug && (
          <>
            <span style={{ color: 'rgba(30,31,40,0.25)', fontSize: 13 }}>›</span>
            <Link to={`/services/${parentSlug}`} style={{ fontSize: 13, color: 'rgba(30,31,40,0.4)', textDecoration: 'none' }}>
              {serviceCatalog[parentSlug]?.title || parentSlug}
            </Link>
          </>
        )}
        <span style={{ color: 'rgba(30,31,40,0.25)', fontSize: 13 }}>›</span>
        <span style={{ fontSize: 13, color: '#000', fontWeight: 500 }}>{serviceName}</span>
      </div>

      {/* HERO */}
      <section style={{ padding: 'clamp(32px, 5vw, 48px) clamp(20px, 5vw, 44px) clamp(48px, 8vw, 80px)' }}>
        <div ref={headRef} style={{ opacity: 0 }}>
          {/* Image — full width on mobile, sits above text */}
          <div style={{
            borderRadius: 16, overflow: 'hidden', background: '#f0f0f0',
            width: '100%',
            height: 'clamp(220px, 52vw, 480px)',
            marginBottom: 'clamp(24px, 4vw, 40px)',
          }}>
            {heroImg
              ? <img src={heroImg} alt={serviceName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(20px, 3vw, 40px)', color: 'rgba(255,255,255,0.08)', letterSpacing: '0.05em', textTransform: 'uppercase', textAlign: 'center', padding: '0 24px' }}>{serviceName}</span>
                </div>
            }
          </div>
          {/* Text below image */}
          <div style={{ maxWidth: 680 }}>
            <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(30,31,40,0.4)', marginBottom: 16 }}>
              {detail.subtitle}
            </p>
            <h1 style={{ fontSize: 'clamp(28px, 4.5vw, 64px)', fontWeight: 300, letterSpacing: '-0.03em', color: '#000', lineHeight: 1.05, marginBottom: 28 }}>
              {serviceName}
            </h1>
            {detail.heroParagraphs.map((p, i) => (
              <p key={i} style={{ fontSize: 15, fontWeight: 300, color: 'rgba(30,31,40,0.65)', lineHeight: 1.75, letterSpacing: '-0.01em', marginBottom: 14 }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* SUB-PAGE CARDS (for pages like Industry Solutions) */}
      {detail.subPages && (
        <section style={{ padding: '0 44px 80px', borderTop: '1px solid rgba(30,31,40,0.06)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
            paddingTop: 48,
          }}>
            {detail.subPages.map(sub => (
              <SubPageCard
                key={sub.slug}
                subPage={sub}
                categoryDisplay={subPageCategoryLabel(slug, t)}
              />
            ))}
          </div>
        </section>
      )}

      {/* CONTENT SECTIONS */}
      {detail.sections?.map((section, si) => {

        if (section.type === 'special') return (
          <section key={si} style={{ padding: '64px 44px', background: si % 2 === 0 ? '#fafafa' : '#fff', borderTop: '1px solid rgba(30,31,40,0.06)' }}>
            <h2 style={{ fontSize: 'clamp(18px, 2vw, 30px)', fontWeight: 500, letterSpacing: '-0.02em', color: '#000', lineHeight: 1.3, marginBottom: 20, maxWidth: 720 }}>
              {section.title}
            </h2>
            {section.paragraphs.map((p, pi) => (
              <p key={pi} style={{ fontSize: 15, fontWeight: 300, color: 'rgba(30,31,40,0.65)', lineHeight: 1.75, letterSpacing: '-0.01em', marginBottom: 16, maxWidth: 860 }}>
                {p}
              </p>
            ))}
          </section>
        )

        if (section.type === 'zigzag') {
          const zigzagSrc = section.image || getServiceHeroImage(slug)
          const imgEl = (
            <div style={{
              borderRadius: 16, overflow: 'hidden', background: '#eef2f6',
              aspectRatio: '4/3', minHeight: 260,
            }}>
              {zigzagSrc
                ? <img src={zigzagSrc} alt={section.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 14, color: 'rgba(15,23,42,0.12)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{section.title}</span>
                  </div>
              }
            </div>
          )
          const textEl = (
            <div>
              <h2 style={{ fontSize: 'clamp(22px, 2.8vw, 40px)', fontWeight: 500, letterSpacing: '-0.03em', color: '#000', lineHeight: 1.15, marginBottom: 20 }}>
                {section.title}
              </h2>
              {section.paragraphs.map((p, pi) => (
                <p key={pi} style={{ fontSize: 15, fontWeight: 300, color: 'rgba(30,31,40,0.65)', lineHeight: 1.75, letterSpacing: '-0.01em', marginBottom: 14 }}>
                  {p}
                </p>
              ))}
            </div>
          )
          return (
            <section key={si} style={{ padding: '64px 44px', background: si % 2 === 0 ? '#fafafa' : '#fff', borderTop: '1px solid rgba(30,31,40,0.06)' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 48,
                alignItems: 'center',
                maxWidth: 1100,
                margin: '0 auto',
              }}>
                {section.imageLeft ? <>{imgEl}{textEl}</> : <>{textEl}{imgEl}</>}
              </div>
            </section>
          )
        }

        if (section.type === 'featureGrid') return (
          <section key={si} style={{ padding: '72px 44px 88px', background: si % 2 === 0 ? '#fafafa' : '#fff', borderTop: '1px solid rgba(30,31,40,0.06)' }}>
            <div style={{ maxWidth: 920, margin: '0 auto 48px', textAlign: 'center' }}>
              <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 48px)', fontWeight: 300, letterSpacing: '-0.03em', color: '#000', lineHeight: 1.15, marginBottom: 22 }}>
                {section.heading}
              </h2>
              <p style={{ fontSize: 16, fontWeight: 300, color: 'rgba(30,31,40,0.65)', lineHeight: 1.75, letterSpacing: '-0.01em', marginBottom: 18 }}>
                {section.intro}
              </p>
              <p style={{ fontSize: 15, fontWeight: 500, color: '#000', letterSpacing: '-0.01em' }}>
                {section.tagline}
              </p>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 20,
              maxWidth: 1000,
              margin: '0 auto',
            }}>
              {section.cards.map((c, ci) => (
                <div
                  key={ci}
                  style={{
                    padding: '28px 24px 26px',
                    borderRadius: 14,
                    background: '#f1f5f9',
                    border: '1px solid rgba(30,31,40,0.06)',
                  }}
                >
                  <span style={{ fontSize: 28, fontWeight: 300, color: '#FACC15', lineHeight: 1, display: 'block', marginBottom: 14 }}>+</span>
                  <p style={{ fontSize: 17, fontWeight: 600, color: '#000', letterSpacing: '-0.02em', marginBottom: 10 }}>{c.title}</p>
                  <p style={{ fontSize: 14, fontWeight: 300, color: 'rgba(30,31,40,0.6)', lineHeight: 1.6, letterSpacing: '-0.01em' }}>{c.text}</p>
                </div>
              ))}
            </div>
          </section>
        )

        if (section.type === 'darkBanner') return (
          <section key={si} style={{
            padding: '80px 44px',
            background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 55%, #0f172a 100%)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 500, letterSpacing: '-0.02em', color: '#fff', lineHeight: 1.25, marginBottom: 22 }}>
                {section.title}
              </h2>
              {section.paragraphs.map((p, pi) => (
                <p key={pi} style={{ fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.82)', lineHeight: 1.75, letterSpacing: '-0.01em', marginBottom: 16 }}>
                  {p}
                </p>
              ))}
              {section.linkLine && (
                <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.82)', lineHeight: 1.75 }}>
                  {section.linkLine.prefix}
                  <a href={section.linkLine.href} style={{ color: '#FACC15', textDecoration: 'underline', textUnderlineOffset: 3 }}>{section.linkLine.linkText}</a>
                  {section.linkLine.suffix}
                </p>
              )}
            </div>
          </section>
        )

        if (section.type === 'industryCarousel') return (
          <section key={si} style={{ padding: '64px 44px', background: si % 2 === 0 ? '#fafafa' : '#fff', borderTop: '1px solid rgba(30,31,40,0.06)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 48, alignItems: 'start' }}>
              <div>
                <h2 style={{ fontSize: 'clamp(24px, 3vw, 48px)', fontWeight: 300, letterSpacing: '-0.03em', color: '#000', lineHeight: 1.1, marginBottom: 16 }}>
                  {section.title}
                </h2>
                <div style={{ width: 48, height: 3, background: '#FACC15' }} />
              </div>
              <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(30,31,40,0.65)', lineHeight: 1.75, letterSpacing: '-0.01em', paddingTop: 8 }}>
                {section.description}
              </p>
            </div>
            <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
              <div style={{ display: 'flex', gap: 14 }}>
                {section.industries.map(ind => (
                  <Link
                    key={ind.slug}
                    to={`/services/${ind.slug}`}
                    style={{ textDecoration: 'none', flexShrink: 0 }}
                  >
                    <div style={{
                      width: 168, padding: '20px 18px 18px', borderRadius: 8,
                      border: '1px solid rgba(30,31,40,0.1)', background: '#fff',
                      display: 'flex', flexDirection: 'column', gap: 28,
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(250,204,21,0.6)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.07)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(30,31,40,0.1)'; e.currentTarget.style.boxShadow = 'none' }}
                    >
                      <span style={{ fontSize: 15, fontWeight: 500, color: '#000', lineHeight: 1.3 }}>{ind.label}</span>
                      <span style={{ fontSize: 18, color: 'rgba(30,31,40,0.3)' }}>→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: 44 }}>
              <LiquidButton as={Link} to="/services/staffing-services" tint="#111827" textColor="#fff">
                {t('common.industries')}
              </LiquidButton>
            </div>
          </section>
        )

        return (
          <section key={si} style={{ padding: '64px 44px', background: si % 2 === 0 ? '#fafafa' : '#fff', borderTop: '1px solid rgba(30,31,40,0.06)' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 52px)', fontWeight: 300, letterSpacing: '-0.03em', color: '#000', lineHeight: 1.1, marginBottom: 32, maxWidth: 800 }}>
              {section.title}
            </h2>
            {section.paragraphs.map((p, pi) => (
              <p key={pi} style={{ fontSize: 15, fontWeight: 300, color: 'rgba(30,31,40,0.65)', lineHeight: 1.75, letterSpacing: '-0.01em', marginBottom: 16, maxWidth: 860 }}>
                {p}
              </p>
            ))}
            {section.bullets?.length > 0 && (
              <ul style={{ listStyle: 'none', padding: 0, marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {section.bullets.map((b, bi) => (
                  <li key={bi} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', border: '1.5px solid #FACC15', flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 15, fontWeight: 300, color: 'rgba(30,31,40,0.7)', lineHeight: 1.6, letterSpacing: '-0.01em' }}>
                      {b.label && <strong style={{ fontWeight: 600, color: '#000' }}>{b.label}{b.text ? ': ' : ''}</strong>}
                      {b.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )
      })}

      {/* BACK LINK */}
      <section style={{ padding: '60px 44px', background: '#000' }}>
        <LiquidButton as={Link} to={parentSlug ? `/services/${parentSlug}` : '/services'} tint="#FACC15" textColor="#000">
          {parentSlug
            ? `← ${t('common.backTo')} ${serviceCatalog[parentSlug]?.title || t('common.overview')}`
            : t('common.backToServices')}
        </LiquidButton>
      </section>
    </div>
  )
}
