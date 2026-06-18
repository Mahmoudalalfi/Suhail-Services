import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LiquidButton from '../components/ui/LiquidButton'
import { useLanguage } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

function useScrollReveal(ref, opts = {}) {
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    gsap.fromTo(
      el,
      { opacity: 0, y: opts.y ?? 26 },
      {
        opacity: 1,
        y: 0,
        duration: opts.duration ?? 0.72,
        ease: 'power3.out',
        delay: opts.delay ?? 0,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }
    )
  }, [])
}

function RevealBlock({ children, y = 26, delay = 0, style = {} }) {
  const ref = useRef(null)
  useScrollReveal(ref, { y, delay })
  return (
    <div ref={ref} style={{ opacity: 0, ...style }}>
      {children}
    </div>
  )
}

/** Flat illustration — process nodes & dialog */
function SvgComplianceFlow() {
  return (
    <svg width={280} height={220} viewBox="0 0 280 220" aria-hidden className="quality-graphic-svg">
      <circle cx={138} cy={118} r={62} fill="#ffffff" stroke="rgba(10,26,60,0.06)" strokeWidth={1} />
      <circle cx={88} cy={92} r={26} fill="#fff" stroke="rgba(10,26,60,0.12)" strokeWidth={2} />
      <rect x={114} y={102} width={48} height={34} rx={8} fill="#2563eb" opacity={0.85} />
      <circle cx={188} cy={76} r={22} fill="#C9A84C" />
      <path d="M188 68v16M180 76h16" stroke="#fff" strokeWidth={3} strokeLinecap="round" />
      <circle cx={62} cy={148} r={20} fill="#fff" stroke="rgba(10,26,60,0.12)" strokeWidth={2} />
      <circle cx={218} cy={156} r={20} fill="#fff" stroke="rgba(10,26,60,0.12)" strokeWidth={2} />
      <path d="M108 108 L138 118 L168 88" fill="none" stroke="rgba(10,26,60,0.22)" strokeWidth={2} strokeDasharray="4 6" />
      <path d="M88 118 L118 130 L158 124" fill="none" stroke="rgba(10,26,60,0.22)" strokeWidth={2} strokeDasharray="4 6" />
    </svg>
  )
}

/** Documents + yellow accent + plus */
function SvgDocsPlus() {
  return (
    <svg width={260} height={200} viewBox="0 0 260 200" aria-hidden className="quality-graphic-svg">
      <rect x={28} y={44} width={112} height={132} rx={14} fill="#fff" stroke="rgba(10,26,60,0.12)" strokeWidth={2} transform="rotate(-6 84 110)" />
      <rect x={108} y={32} width={118} height={138} rx={14} fill="#ffffff" stroke="rgba(10,26,60,0.1)" strokeWidth={2} />
      <rect x={124} y={52} width={36} height={36} rx={6} fill="#C9A84C" />
      <rect x={132} y={104} width={72} height={8} rx={3} fill="#d6dce6" />
      <rect x={132} y={122} width={56} height={8} rx={3} fill="#d6dce6" />
      <circle cx={208} cy={146} r={36} fill="#C9A84C" />
      <path d="M208 132v28M194 146h28" stroke="#fff" strokeWidth={4} strokeLinecap="round" />
    </svg>
  )
}

/** Supply-chain checks — documents + check badges */
function SvgLksgChecks() {
  return (
    <svg width={280} height={220} viewBox="0 0 280 220" aria-hidden className="quality-graphic-svg">
      <rect x={92} y={54} width={72} height={108} rx={12} fill="#fff" stroke="rgba(10,26,60,0.1)" strokeWidth={2} />
      <rect x={156} y={68} width={84} height={96} rx={12} fill="#ffffff" stroke="rgba(10,26,60,0.1)" strokeWidth={2} />
      <rect x={178} y={44} width={72} height={88} rx={12} fill="#fff" stroke="rgba(10,26,60,0.1)" strokeWidth={2} />
      <rect x={188} y={56} width={26} height={18} rx={4} fill="#C9A84C" opacity={0.85} />
      {[[104, 42], [154, 58], [204, 38]].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={16} fill="#C9A84C" />
          <path d={`M${cx - 6} ${cy} l4 4 10-12`} fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
    </svg>
  )
}

function PillPdfLink({ href, label }) {
  if (!href) return null
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48,
        padding: '12px 26px',
        borderRadius: 999,
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: '-0.01em',
        textDecoration: 'none',
        border: '2px solid #C9A84C',
        color: '#0a0a0a',
        background: '#fff',
        transition: 'background 0.2s, color 0.2s',
        marginTop: 8,
        marginRight: 12,
        marginBottom: 8,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#C9A84C'
        e.currentTarget.style.color = '#fff'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#fff'
        e.currentTarget.style.color = '#C9A84C'
      }}
    >
      {label}
    </a>
  )
}

function SplitBand({ graphicLeft, children }) {
  return (
    <div style={{
      display: 'grid',
      gap: 'clamp(28px, 5vw, 48px)',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
      alignItems: 'center',
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 160 }}>
        {graphicLeft}
      </div>
      <div style={{ minWidth: 0 }}>
        {children}
      </div>
    </div>
  )
}

export default function ComplianceLksgPage() {
  const { t } = useLanguage()
  const headRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(headRef.current, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', delay: 0.04 })
  }, [])

  const heroImg = t('complianceLksgPage.heroImage') || 'https://res.cloudinary.com/df7aiznm6/image/upload/v1777490347/suhail-services/compliance-hero-integrity.png'

  return (
    <div style={{ background: '#fff' }}>

      {/* Hero */}
      <section style={{ padding: '160px 40px 80px', background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div ref={headRef} style={{ opacity: 0, maxWidth: 1180, margin: '0 auto' }}>
          <Link
            to="/about"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: 'rgba(10,26,60,0.4)', textDecoration: 'none', letterSpacing: '0.02em', marginBottom: 28 }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A84C' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(10,26,60,0.4)' }}
          >
            ← {t('common.backTo')} {t('nav.about')}
          </Link>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 20 }}>
            {t('complianceLksgPage.eyebrowMuted')}
          </p>
          <h1 style={{ fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#0a0a0a', lineHeight: 1.0, margin: '0 0 24px' }}>
            {t('complianceLksgPage.title')}
          </h1>
        </div>
      </section>

      {/* Hero body */}
      <section style={{ padding: '56px 40px 56px' }}>
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            display: 'grid',
            gap: 'clamp(36px, 6vw, 56px)',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            alignItems: 'center',
          }}
        >
          <div style={{ minWidth: 0 }}>
            <p style={{
              fontSize: 'clamp(15px, 1.65vw, 17px)',
              color: 'rgba(10,26,60,0.78)',
              lineHeight: 1.82,
              margin: '0 0 16px',
              maxWidth: 560,
            }}>
              {t('complianceLksgPage.heroP1')}
            </p>
            <p style={{
              fontSize: 'clamp(15px, 1.65vw, 17px)',
              color: 'rgba(10,26,60,0.78)',
              lineHeight: 1.82,
              margin: 0,
              maxWidth: 560,
            }}>
              {t('complianceLksgPage.heroP2')}
            </p>
          </div>

          <div style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 8,
            aspectRatio: '1 / 1',
            maxWidth: 520,
            margin: '0 auto',
            width: '100%',
            boxShadow: '0 24px 60px rgba(30, 24, 8, 0.12)',
            background: '#ffffff',
            justifySelf: 'center',
          }}>
            <img
              src={heroImg}
              alt={t('complianceLksgPage.heroAlt') || ''}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />
          </div>
        </div>
      </section>

      {/* Compliance band — graphic left */}
      <section style={{ background: '#fff', padding: 'clamp(40px, 7vw, 80px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <RevealBlock>
            <SplitBand graphicLeft={<SvgComplianceFlow />}>
              <>
                <h2 style={{
                  fontSize: 'clamp(22px, 3vw, 28px)',
                  fontWeight: 700,
                  color: '#0a0a0a',
                  letterSpacing: '-0.03em',
                  margin: '0 0 18px',
                }}>
                  {t('complianceLksgPage.splitComplianceHeading')}
                </h2>
                <p style={{
                  fontSize: 'clamp(14px, 1.55vw, 16px)',
                  color: 'rgba(10,26,60,0.78)',
                  lineHeight: 1.78,
                  margin: 0,
                }}>
                  {t('complianceLksgPage.splitComplianceBody')}
                </p>
              </>
            </SplitBand>
          </RevealBlock>
        </div>
      </section>

      {/* Advice — docs graphic left */}
      <section style={{ background: '#fff', padding: 'clamp(44px, 8vw, 88px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <RevealBlock delay={0.06}>
            <SplitBand graphicLeft={<SvgDocsPlus />}>
              <>
                <h2 style={{
                  fontSize: 'clamp(20px, 2.6vw, 26px)',
                  fontWeight: 700,
                  color: '#0a0a0a',
                  letterSpacing: '-0.025em',
                  margin: '0 0 14px',
                }}>
                  {t('complianceLksgPage.adviceHeading')}
                </h2>
                <p style={{
                  fontSize: 'clamp(14px, 1.55vw, 16px)',
                  color: 'rgba(10,26,60,0.78)',
                  lineHeight: 1.78,
                  margin: '0 0 18px',
                }}>
                  {t('complianceLksgPage.adviceBody')}
                </p>
                <p style={{
                  fontSize: 'clamp(13px, 1.45vw, 15px)',
                  color: 'rgba(10,26,60,0.62)',
                  lineHeight: 1.7,
                  margin: '0 0 16px',
                }}>
                  {t('complianceLksgPage.adviceContactNote')}
                </p>
                <Link
                  to="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontSize: 15,
                    fontWeight: 600,
                    color: '#0a0a0a',
                    textDecoration: 'underline',
                    textUnderlineOffset: 4,
                  }}
                >
                  {t('complianceLksgPage.adviceContactLinkLabel')}
                </Link>
              </>
            </SplitBand>
          </RevealBlock>
        </div>
      </section>

      {/* Whistleblower */}
      <section style={{ background: '#fff', padding: 'clamp(44px, 8vw, 88px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <RevealBlock>
            <h2 style={{
              fontSize: 'clamp(20px, 2.6vw, 26px)',
              fontWeight: 700,
              color: '#0a0a0a',
              letterSpacing: '-0.025em',
              margin: '0 0 16px',
            }}>
              {t('complianceLksgPage.whistleHeading')}
            </h2>
            <p style={{
              fontSize: 'clamp(14px, 1.55vw, 16px)',
              color: 'rgba(10,26,60,0.78)',
              lineHeight: 1.78,
              margin: '0 0 22px',
            }}>
              {t('complianceLksgPage.whistleBody')}
            </p>
            <PillPdfLink href={t('complianceLksgPage.whistleHref')} label={t('complianceLksgPage.whistleLinkLabel')} />
          </RevealBlock>
        </div>
      </section>

      {/* LkSG explainer */}
      <section style={{ background: '#fff', padding: 'clamp(44px, 8vw, 88px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <RevealBlock delay={0.04}>
            <SplitBand graphicLeft={<SvgLksgChecks />}>
              <>
                <h2 style={{
                  fontSize: 'clamp(20px, 2.6vw, 26px)',
                  fontWeight: 700,
                  color: '#0a0a0a',
                  letterSpacing: '-0.025em',
                  margin: '0 0 16px',
                }}>
                  {t('complianceLksgPage.lksgHeading')}
                </h2>
                <p style={{
                  fontSize: 'clamp(14px, 1.55vw, 16px)',
                  color: 'rgba(10,26,60,0.78)',
                  lineHeight: 1.78,
                  margin: '0 0 18px',
                }}>
                  {t('complianceLksgPage.lksgP1')}
                </p>
                <p style={{
                  fontSize: 'clamp(14px, 1.55vw, 16px)',
                  color: 'rgba(10,26,60,0.78)',
                  lineHeight: 1.78,
                  margin: 0,
                }}>
                  {t('complianceLksgPage.lksgP2')}
                </p>
              </>
            </SplitBand>
          </RevealBlock>
        </div>
      </section>

      {/* Statement of principles */}
      <section style={{ background: '#fff', padding: 'clamp(44px, 8vw, 88px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <RevealBlock>
            <h2 style={{
              fontSize: 'clamp(20px, 2.6vw, 26px)',
              fontWeight: 700,
              color: '#0a0a0a',
              letterSpacing: '-0.025em',
              margin: '0 0 16px',
            }}>
              {t('complianceLksgPage.statementHeading')}
            </h2>
            <p style={{
              fontSize: 'clamp(14px, 1.55vw, 16px)',
              color: 'rgba(10,26,60,0.78)',
              lineHeight: 1.78,
              margin: '0 0 14px',
            }}>
              {t('complianceLksgPage.statementBody')}
            </p>
            <p style={{
              fontSize: 'clamp(13px, 1.45vw, 15px)',
              color: 'rgba(10,26,60,0.62)',
              lineHeight: 1.7,
              margin: '0 0 18px',
            }}>
              {t('complianceLksgPage.statementPdfIntro')}
            </p>
            <PillPdfLink href={t('complianceLksgPage.statementPdfHref')} label={t('complianceLksgPage.statementPdfLabel')} />
          </RevealBlock>
        </div>
      </section>

      {/* LkSG PDF reports */}
      <section style={{ background: '#fff', padding: 'clamp(44px, 8vw, 88px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <RevealBlock delay={0.06}>
            <h2 style={{
              fontSize: 'clamp(20px, 2.6vw, 26px)',
              fontWeight: 700,
              color: '#0a0a0a',
              letterSpacing: '-0.025em',
              margin: '0 0 16px',
            }}>
              {t('complianceLksgPage.reportsHeading')}
            </h2>
            <p style={{
              fontSize: 'clamp(14px, 1.55vw, 16px)',
              color: 'rgba(10,26,60,0.78)',
              lineHeight: 1.78,
              margin: '0 0 22px',
            }}>
              {t('complianceLksgPage.reportsIntro')}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              <PillPdfLink href={t('complianceLksgPage.report2023Href')} label={t('complianceLksgPage.report2023Label')} />
              <PillPdfLink href={t('complianceLksgPage.report2024Href')} label={t('complianceLksgPage.report2024Label')} />
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Supplier code */}
      <section style={{ background: '#fff', padding: 'clamp(44px, 8vw, 88px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <RevealBlock>
            <h2 style={{
              fontSize: 'clamp(20px, 2.6vw, 26px)',
              fontWeight: 700,
              color: '#0a0a0a',
              letterSpacing: '-0.025em',
              margin: '0 0 16px',
            }}>
              {t('complianceLksgPage.supplierHeading')}
            </h2>
            <p style={{
              fontSize: 'clamp(14px, 1.55vw, 16px)',
              color: 'rgba(10,26,60,0.78)',
              lineHeight: 1.78,
              margin: '0 0 14px',
            }}>
              {t('complianceLksgPage.supplierBody')}
            </p>
            <p style={{
              fontSize: 'clamp(13px, 1.45vw, 15px)',
              color: 'rgba(10,26,60,0.62)',
              lineHeight: 1.7,
              margin: '0 0 18px',
            }}>
              {t('complianceLksgPage.supplierPdfIntro')}
            </p>
            <PillPdfLink href={t('complianceLksgPage.supplierPdfHref')} label={t('complianceLksgPage.supplierPdfLabel')} />
          </RevealBlock>
        </div>
      </section>

      <section style={{ background: '#fff', padding: 'clamp(44px, 7vw, 72px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <RevealBlock>
            <LiquidButton as={Link} to="/contact" tint="#C9A84C" textColor="#000">
              {t('nav.contact')}
            </LiquidButton>
          </RevealBlock>
        </div>
      </section>
    </div>
  )
}
