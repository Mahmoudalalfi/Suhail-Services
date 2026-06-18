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
            <a href="tel:+4917641180455" style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.01em', transition: 'color 0.2s', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
            >
              +49 176 41180455
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
