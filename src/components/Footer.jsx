import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import BrandLogo from './BrandLogo'
import LiquidButton from './ui/LiquidButton'

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
        <LiquidButton as={Link} to="/contact" tint="#1B3A7A" textColor="#fff" style={{ width: '100%', fontSize: 14, padding: '12px 20px' }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 18 }}>
            {[
              'Services@suhaili.de',
              'Info.Services@suhaili.de',
              'Kontakt.Services@suhaili.de',
            ].map(email => (
              <a key={email} href={`mailto:${email}`} style={{ fontSize: 13, color: 'rgba(255,255,255,0.42)', letterSpacing: '-0.01em', transition: 'color 0.2s', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.42)'}
              >
                {email}
              </a>
            ))}

            {/* Phone — prominent call row */}
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

            {/* WhatsApp — full pill button */}
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
          { label: t('footer.impressum'), to: '/imprint' },
          { label: t('footer.dataProtection'), to: '/data-protection' },
          { label: t('cookie.cookieSettings'), to: '#', onClick: () => { localStorage.removeItem('cookie-consent'); window.location.reload() } },
        ]} />
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
          <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 13 }}>|</span>
          <Link to="/data-protection" style={{ fontSize: 13, color: 'rgba(255,255,255,0.22)', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.22)'}
          >
            {t('footer.dataProtection')}
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
