import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import BrandLogo from './BrandLogo'
import LiquidButton from './ui/LiquidButton'
import { openCookieSettings } from '../utils/cookieConsent'

export default function Footer() {
  const { t, lang } = useLanguage()

  return (
    <footer style={{ background: '#000000', color: '#fff', padding: 'clamp(40px, 8vw, 72px) clamp(20px, 5vw, 40px) clamp(24px, 5vw, 40px)' }} className="site-footer">
      {/* Mobile CTA block — top of footer, only on mobile */}
      <div className="footer-mobile-cta">
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(38px, 12vw, 56px)',
          color: '#fff',
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          lineHeight: 0.9,
          marginBottom: 24,
        }}>
          {lang === 'de'
            ? <><span>IHR PARTNER</span><br /><span>FÜR</span><br /><span>DIENSTLEISTUNGEN</span></>
            : <><span>YOUR PARTNER</span><br /><span>FOR</span><br /><span>SERVICES</span></>}
        </div>
        <LiquidButton as={Link} to="/contact" tint="#C9A84C" textColor="#000" style={{ width: '100%', fontSize: 14, padding: '12px 20px' }}>
          {lang === 'de' ? 'Jetzt Angebot anfordern →' : 'Request a Quote →'}
        </LiquidButton>
        <LiquidButton as={Link} to="/services" textColor="#fff" style={{ width: '100%', fontSize: 14, padding: '12px 20px' }}>
          {lang === 'de' ? 'Leistungen ansehen' : 'View Services'}
        </LiquidButton>
      </div>

      <div className="footer-grid" style={{
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        paddingBottom: 'clamp(32px, 6vw, 56px)',
        marginBottom: 'clamp(24px, 4vw, 36px)',
      }}>
        {/* Brand */}
        <div>
          <FooterLogo />
          <p style={{ marginTop: 20, fontSize: 14, color: 'rgba(255,255,255,0.38)', lineHeight: 1.65, maxWidth: 280, letterSpacing: '-0.01em' }}>
            {t('footer.brandTagline')}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 18 }}>
            {[
              'Services@suhaili.de',
              'Info.Services@suhaili.de',
              'Kontakt.Services@suhaili.de',
            ].map(email => (
              <a key={email} href={`mailto:${email}`} style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.01em', transition: 'color 0.2s', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
              >
                {email}
              </a>
            ))}
            {/* Phone — prominent */}
            <a
              href="tel:+4917641180455"
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                marginTop: 14,
                fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em',
                color: '#fff', textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.07 3.4 2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/>
              </svg>
              +49 176 41180455
            </a>

            {/* WhatsApp — green pill */}
            <a
              href="https://wa.me/4917641180455"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                marginTop: 8,
                padding: '9px 16px',
                borderRadius: 999,
                background: '#25D366',
                color: '#fff',
                fontSize: 14, fontWeight: 600,
                textDecoration: 'none',
                transition: 'opacity 0.2s, transform 0.15s',
                alignSelf: 'flex-start',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'scale(1.03)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}
            >
              <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.004 2C8.28 2 2 8.279 2 15.997c0 2.47.648 4.786 1.776 6.8L2 30l7.374-1.742A13.944 13.944 0 0 0 16.004 30C23.72 30 30 23.721 30 16.003 30 8.279 23.72 2 16.004 2zm0 25.453a11.395 11.395 0 0 1-5.808-1.587l-.416-.247-4.375 1.033 1.077-4.254-.27-.437A11.392 11.392 0 0 1 4.548 16c0-6.314 5.14-11.453 11.456-11.453 6.315 0 11.452 5.14 11.452 11.453 0 6.31-5.137 11.453-11.452 11.453zm6.281-8.578c-.344-.172-2.037-1.005-2.353-1.12-.315-.114-.545-.172-.774.172-.229.344-.889 1.12-1.09 1.35-.2.23-.4.258-.743.086-.344-.172-1.452-.535-2.765-1.706-1.023-.912-1.713-2.04-1.913-2.384-.2-.344-.021-.53.15-.7.155-.154.344-.4.516-.6.172-.2.229-.344.344-.572.115-.23.057-.43-.029-.602-.086-.172-.774-1.864-1.06-2.553-.28-.67-.563-.578-.774-.59-.2-.01-.43-.013-.659-.013-.23 0-.602.086-.916.43-.316.344-1.203 1.176-1.203 2.867 0 1.692 1.232 3.326 1.404 3.556.172.229 2.424 3.7 5.873 5.19.821.354 1.462.566 1.961.724.824.262 1.574.225 2.167.137.661-.099 2.037-.833 2.323-1.636.287-.803.287-1.491.2-1.635-.085-.143-.314-.229-.658-.4z"/>
              </svg>
              WhatsApp
            </a>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: 16, marginTop: 24, alignItems: 'center' }}>
              <a href="https://www.facebook.com/share/14fCHyzmkdC/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', opacity: 0.5, transition: 'opacity 0.2s, transform 0.2s' }} onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.1)' }} onMouseLeave={e => { e.currentTarget.style.opacity = '0.5'; e.currentTarget.style.transform = 'scale(1)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.408 0 22.675 0z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@suhaili_grupp?_r=1&_t=ZG-97JgFHNP5W5" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', opacity: 0.5, transition: 'opacity 0.2s, transform 0.2s' }} onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.1)' }} onMouseLeave={e => { e.currentTarget.style.opacity = '0.5'; e.currentTarget.style.transform = 'scale(1)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/shuhaili_grupp?igsh=OXl3Mno3YzJ0MHN3&utm_source=qr" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', opacity: 0.5, transition: 'opacity 0.2s, transform 0.2s' }} onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.1)' }} onMouseLeave={e => { e.currentTarget.style.opacity = '0.5'; e.currentTarget.style.transform = 'scale(1)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.07M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Nav */}
        <FooterCol title={t('footer.linksTitle')} links={[
          { label: t('nav.projects'), to: '/work' },
          { label: t('nav.about'), to: '/about' },
          { label: t('nav.services'), to: '/services' },
          { label: t('nav.news'), to: '/blog' },
          { label: t('nav.contact'), to: '/contact' },
        ]} />

        {/* Services */}
        <FooterCol
          title={t('footer.servicesColumnTitle')}
          links={t('footer.offerLinks').map(({ hash, label }) => ({ label, to: `/services#${hash}` }))}
        />

        {/* Social & Legal */}
        <FooterCol title={t('footer.legalTitle')} links={[
          { label: t('cookie.cookieSettings'), onClick: openCookieSettings },
        ]} />
      </div>

      {/* ── Banner strip ── */}
      <div style={{
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
        margin: 'clamp(40px, 7vw, 64px) 0',
        height: 'clamp(160px, 22vw, 240px)',
        display: 'flex',
        alignItems: 'center',
      }}>
        <img
          src="https://res.cloudinary.com/df7aiznm6/image/upload/v1782405756/56de228c-1649-4cf3-9181-3b50fb7fb0c6_nim5hy.png"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.82) 100%)',
        }} />
        <div style={{
          position: 'relative',
          zIndex: 1,
          marginLeft: 'auto',
          padding: 'clamp(24px, 4vw, 44px) clamp(28px, 5vw, 56px)',
          maxWidth: 480,
          textAlign: 'right',
        }}>
          <div style={{ width: 36, height: 2, background: '#C9A84C', marginBottom: 14, marginLeft: 'auto' }} />
          <h2 style={{
            fontSize: 'clamp(17px, 2.2vw, 24px)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.25,
            margin: '0 0 10px',
            letterSpacing: '-0.02em',
          }}>
            {lang === 'de'
              ? <><span>Ein starkes Netzwerk für </span><span style={{ color: '#C9A84C' }}>starke Ergebnisse.</span></>
              : <><span>A strong network for </span><span style={{ color: '#C9A84C' }}>strong results.</span></>}
          </h2>
          <p style={{ fontSize: 'clamp(12px, 1.2vw, 14px)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, margin: 0 }}>
            {lang === 'de'
              ? 'Gemeinsam schaffen wir Werte, Sicherheit und nachhaltige Lösungen für unsere Kunden.'
              : 'Together we create value, security and sustainable solutions for our clients.'}
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.22)' }}>
          © {new Date().getFullYear()} suhail Services. {t('footer.rightsReserved')}
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.22)', margin: 0 }}>
            {t('footer.location')}
          </p>
          <Link to="/imprint" style={{ fontSize: 13, color: 'rgba(255,255,255,0.22)', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.22)'}
          >
            {t('footer.impressum')}
          </Link>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }) {
  const linkStyle = { fontSize: 14, color: 'rgba(255,255,255,0.5)', letterSpacing: '-0.01em', transition: 'color 0.2s', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }
  return (
    <div>
      <p style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em', textTransform: 'none', marginBottom: 20 }}>
        {title}
      </p>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 13 }}>
        {links.map(l => (
          <li key={l.label}>
            {l.onClick ? (
              <button onClick={l.onClick} style={linkStyle}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              >
                {l.label}
              </button>
            ) : (
              <Link to={l.to} style={linkStyle}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              >
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function FooterLogo() {
  return <BrandLogo variant="light" />
}
