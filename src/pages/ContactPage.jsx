import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useLanguage } from '../i18n/LanguageContext'
import LiquidButton from '../components/ui/LiquidButton'

export default function ContactPage() {
  const { t } = useLanguage()
  const headRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [focused, setFocused] = useState({})

  const addressLines = Array.isArray(t('contact.companyNameLines')) ? t('contact.companyNameLines') : []
  const socialLinks = Array.isArray(t('contact.socialLinks')) ? t('contact.socialLinks') : []
  const companyLabel = t('contact.company')

  useEffect(() => {
    gsap.set([headRef.current, leftRef.current, rightRef.current], { opacity: 0, y: 40 })
    const tl = gsap.timeline({ delay: 0.05 })
    tl.to(headRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    tl.to(leftRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
    tl.to(rightRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.55')
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    gsap.to(rightRef.current, { opacity: 0, y: -16, duration: 0.3, ease: 'power2.in', onComplete: () => setSent(true) })
  }

  const fields = [
    { id: 'name', label: t('contact.name'), type: 'text', required: true },
    { id: 'email', label: t('contact.email'), type: 'email', required: true },
    ...(companyLabel ? [{ id: 'company', label: companyLabel, type: 'text', required: false }] : []),
  ]

  const infoItems = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: t('contact.infoAddress'),
      content: addressLines.join(', '),
      href: null,
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.16 11.9 19.79 19.79 0 0 1 1.08 3.26 2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      label: t('contact.infoPhone'),
      content: '+49 176 20607329',
      href: 'tel:+4917620607329',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: t('contact.infoEmail'),
      content: 'kontact@suhail.de',
      href: 'mailto:kontact@suhail.de',
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>

      {/* ── Hero heading ── */}
      <div
        ref={headRef}
        style={{
          padding: 'clamp(120px,14vw,180px) clamp(20px,5vw,60px) clamp(32px,5vw,56px)',
          background: '#fff',
          borderBottom: '1px solid rgba(30,31,40,0.07)',
        }}
      >
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1d4ed8', marginBottom: 16 }}>
          {t('contact.subtitle') || 'Get in touch'}
        </p>
        <h1 style={{
          fontSize: 'clamp(42px, 7vw, 100px)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          color: '#0a0a0a',
          lineHeight: 0.95,
          fontFamily: "'Barlow Condensed', sans-serif",
          textTransform: 'uppercase',
          margin: 0,
        }}>
          {t('contact.title1')}
          {t('contact.title2') && <><br /><span style={{ color: '#1d4ed8' }}>{t('contact.title2')}</span></>}
        </h1>
      </div>

      {/* ── Two-panel body ── */}
      <div className="contact-body-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.6fr',
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 clamp(20px,5vw,60px) clamp(60px,8vw,100px)',
        gap: 'clamp(40px,6vw,80px)',
        alignItems: 'start',
      }}>

        {/* LEFT — light info panel */}
        <div
          ref={leftRef}
          style={{
            paddingTop: 'clamp(32px,5vw,56px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
          }}
        >
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(30,31,40,0.35)', marginBottom: 24 }}>
              Contact details
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {infoItems.map(({ icon, label, content, href }) => (
                <div key={label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                    background: '#f0f4ff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#1d4ed8',
                  }}>{icon}</div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(30,31,40,0.35)', marginBottom: 5 }}>{label}</p>
                    {href ? (
                      <a href={href} style={{ fontSize: 15, color: '#0a0a0a', textDecoration: 'none', letterSpacing: '-0.01em', lineHeight: 1.5 }}
                        onMouseEnter={e => e.currentTarget.style.color = '#1d4ed8'}
                        onMouseLeave={e => e.currentTarget.style.color = '#0a0a0a'}
                      >{content}</a>
                    ) : (
                      <p style={{ fontSize: 15, color: 'rgba(30,31,40,0.7)', letterSpacing: '-0.01em', lineHeight: 1.5, margin: 0 }}>{content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social links */}
          {socialLinks.length > 0 && (
            <div style={{ paddingTop: 24, borderTop: '1px solid rgba(30,31,40,0.08)' }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(30,31,40,0.35)', marginBottom: 14 }}>
                {t('contact.infoFollow')}
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {socialLinks.map((s) => (
                  <a key={s.label} href={s.href} style={{
                    fontSize: 13, fontWeight: 500, color: 'rgba(30,31,40,0.6)',
                    textDecoration: 'none', padding: '7px 14px', borderRadius: 8,
                    border: '1px solid rgba(30,31,40,0.12)', transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#1d4ed8'; e.currentTarget.style.borderColor = '#1d4ed8' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(30,31,40,0.6)'; e.currentTarget.style.borderColor = 'rgba(30,31,40,0.12)' }}
                  >{s.label}</a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — form panel */}
        <div
          ref={rightRef}
          style={{
            paddingTop: 'clamp(32px,5vw,56px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          {sent ? (
            <div style={{ maxWidth: 480 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 12 }}>
                {t('contact.success1')}
              </p>
              <p style={{ fontSize: 16, color: 'rgba(30,31,40,0.55)', lineHeight: 1.6 }}>{t('contact.success2')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ maxWidth: 520 }}>
              <p style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(30,31,40,0.35)', marginBottom: 32 }}>
                Send a message
              </p>

              {fields.map((f) => (
                <div key={f.id} style={{ position: 'relative', marginBottom: 20 }}>
                  <label htmlFor={f.id} style={{
                    display: 'block', fontSize: 12, fontWeight: 600,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    color: focused[f.id] ? '#1d4ed8' : 'rgba(30,31,40,0.45)',
                    marginBottom: 8, transition: 'color 0.2s',
                  }}>
                    {f.label}{f.required && <span style={{ color: '#ef4444', marginLeft: 2 }}>*</span>}
                  </label>
                  <input
                    id={f.id}
                    type={f.type}
                    value={form[f.id]}
                    onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                    onFocus={() => setFocused(p => ({ ...p, [f.id]: true }))}
                    onBlur={() => setFocused(p => ({ ...p, [f.id]: false }))}
                    required={f.required}
                    style={{
                      width: '100%', padding: '14px 16px', boxSizing: 'border-box',
                      background: focused[f.id] ? '#fff' : '#f8f9fc',
                      border: `1.5px solid ${focused[f.id] ? '#1d4ed8' : 'rgba(30,31,40,0.12)'}`,
                      borderRadius: 10, fontSize: 15, fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 400, color: '#0a0a0a', outline: 'none',
                      transition: 'all 0.2s',
                    }}
                  />
                </div>
              ))}

              <div style={{ marginBottom: 28 }}>
                <label htmlFor="message" style={{
                  display: 'block', fontSize: 12, fontWeight: 600,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  color: focused.message ? '#1d4ed8' : 'rgba(30,31,40,0.45)',
                  marginBottom: 8, transition: 'color 0.2s',
                }}>
                  {t('contact.message')}<span style={{ color: '#ef4444', marginLeft: 2 }}>*</span>
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  onFocus={() => setFocused(p => ({ ...p, message: true }))}
                  onBlur={() => setFocused(p => ({ ...p, message: false }))}
                  rows={5}
                  required
                  style={{
                    width: '100%', padding: '14px 16px', boxSizing: 'border-box',
                    background: focused.message ? '#fff' : '#f8f9fc',
                    border: `1.5px solid ${focused.message ? '#1d4ed8' : 'rgba(30,31,40,0.12)'}`,
                    borderRadius: 10, fontSize: 15, fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 400, color: '#0a0a0a', outline: 'none',
                    resize: 'vertical', minHeight: 130, transition: 'all 0.2s',
                  }}
                />
              </div>

              <LiquidButton type="submit" tint="#FACC15" textColor="#000">
                {t('contact.send')} →
              </LiquidButton>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
