import { useLayoutEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { useLanguage } from '../i18n/LanguageContext'
import ImprintLegalMarkdown from '../components/ImprintLegalMarkdown'
import { getImprintDatenschutzMarkdown } from '../data/imprintDatenschutzMarkdown'
import { extractMarkdownOutline } from '../utils/legalMarkdownHeadings'
import { buildTocSections } from '../utils/tocGroups'

const BLUE   = '#C9A84C'
const YELLOW = '#C9A84C'

export default function DataProtectionPage() {
  const { t, lang } = useLanguage()
  const headRef = useRef(null)

  const outline     = useMemo(() => extractMarkdownOutline(getImprintDatenschutzMarkdown(lang)), [lang])
  const tocSections = useMemo(() => buildTocSections(outline), [outline])

  useLayoutEffect(() => {
    gsap.fromTo(headRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.05 }
    )
  }, [lang])

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section style={{ padding: '160px 40px 80px', background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div ref={headRef} style={{ opacity: 0, maxWidth: 1180, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: YELLOW, marginBottom: 20 }}>
            {t('dataProtectionPage.eyebrow')}
          </p>
          <h1 style={{ fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#0a0a0a', lineHeight: 1.0, margin: 0 }}>
            {t('dataProtectionPage.title')}
          </h1>
        </div>
      </section>

      {/* ── Body ── */}
      <section style={{ padding: '56px 40px 120px', maxWidth: 1180, margin: '0 auto' }}>

        {/* Intro bar */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 32, marginBottom: 56, flexWrap: 'wrap' }}>
          <p style={{ fontSize: 16, color: 'rgba(30,31,40,0.65)', lineHeight: 1.7, maxWidth: 580, margin: 0 }}>
            {t('dataProtectionPage.intro')}
          </p>
          <Link to="/imprint" style={{
            flexShrink: 0,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '10px 20px',
            fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
            color: '#0a0a0a', textDecoration: 'none',
            border: '1.5px solid rgba(0,0,0,0.15)', borderRadius: 8,
            transition: 'border-color 0.2s, color 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.color = BLUE; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)'; e.currentTarget.style.color = '#0a0a0a'; }}
          >
            {t('dataProtectionPage.imprintLinkLabel')} →
          </Link>
        </div>

        {/* Mobile TOC chips */}
        {outline.length > 0 && (
          <nav className="dp-toc-mobile" aria-label={t('dataProtectionPage.tocLabel')} style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginBottom: 10 }}>
              {t('dataProtectionPage.tocHint')}
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {outline.map(({ id, title, depth }) => (
                <a key={id} href={`#${id}`} style={{
                  fontSize: 12, color: depth === 1 ? BLUE : 'rgba(30,31,40,0.6)',
                  background: depth === 1 ? `${BLUE}10` : 'rgba(0,0,0,0.04)',
                  border: `1px solid ${depth === 1 ? `${BLUE}30` : 'rgba(0,0,0,0.08)'}`,
                  borderRadius: 999, padding: '4px 12px', textDecoration: 'none',
                  fontWeight: depth === 1 ? 600 : 400,
                }}>
                  {typeof title === 'string' ? title.normalize('NFC') : title}
                </a>
              ))}
            </div>
          </nav>
        )}

        {/* Desktop grid: TOC + content */}
        <div className="dp-legal-grid" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 'clamp(32px,4vw,64px)', alignItems: 'start' }}>

          {/* Sticky TOC */}
          {outline.length > 0 && (
            <nav
              className="dp-toc-desktop"
              aria-label={t('dataProtectionPage.tocLabel')}
              style={{
                position: 'sticky', top: 100, maxHeight: 'calc(100vh - 120px)', overflowY: 'auto', paddingRight: 8,
                background: '#f8f9fc', borderRadius: 16, padding: '20px 16px',
                border: '1px solid rgba(29,78,216,0.1)',
              }}
            >
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: YELLOW, marginBottom: 4 }}>
                {t('dataProtectionPage.tocEyebrow')}
              </p>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#0a0a0a', marginBottom: 20, letterSpacing: '-0.01em' }}>
                {t('dataProtectionPage.tocLabel')}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {tocSections.map(({ group, items }) => (
                  <div key={group} style={{ marginBottom: 18 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: BLUE, marginBottom: 8 }}>
                      {t(`dataProtectionPage.tocGroup_${group}`)}
                    </p>
                    {items.map(({ id, title, depth }) => (
                      <a key={id} href={`#${id}`} style={{
                        display: 'block',
                        fontSize: depth === 1 ? 13 : 12,
                        fontWeight: depth === 1 ? 600 : 400,
                        color: depth === 1 ? '#0a0a0a' : '#3a3b4a',
                        textDecoration: 'none',
                        padding: '5px 0 5px ' + (depth === 1 ? '0' : '12px'),
                        lineHeight: 1.45,
                        borderLeft: depth === 1 ? 'none' : `2px solid ${BLUE}40`,
                        transition: 'color 0.15s',
                      }}
                        onMouseEnter={e => e.currentTarget.style.color = BLUE}
                        onMouseLeave={e => e.currentTarget.style.color = depth === 1 ? '#0a0a0a' : '#3a3b4a'}
                      >
                        {typeof title === 'string' ? title.normalize('NFC') : title}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </nav>
          )}

          {/* Markdown content */}
          <div className="dp-legal-main">
            <ImprintLegalMarkdown lang={lang} injectAnchors />
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .dp-legal-grid { grid-template-columns: 1fr !important; }
          .dp-toc-desktop { display: none !important; }
          .dp-toc-mobile { display: block !important; }
        }
        @media (min-width: 861px) {
          .dp-toc-mobile { display: none !important; }
        }
      `}</style>
    </div>
  )
}
