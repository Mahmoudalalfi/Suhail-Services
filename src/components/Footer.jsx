import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import BrandLogo from './BrandLogo'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer style={{ background: '#000000', color: '#fff', padding: 'clamp(40px, 8vw, 72px) clamp(20px, 5vw, 40px) clamp(24px, 5vw, 40px)' }}>
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
            <a href="mailto:contact@suhaili.de" style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.01em', transition: 'color 0.2s', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
            >
              contact@suhaili.de
            </a>
            <a href="tel:+4917620607329" style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.01em', transition: 'color 0.2s', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
            >
              +49 176 20607329
            </a>
          </div>
        </div>

        {/* Nav */}
        <FooterCol title={t('footer.linksTitle')} links={[
          { label: t('nav.projects'),  to: '/work' },
          { label: t('nav.about'),     to: '/about' },
          { label: t('nav.services'),  to: '/services' },
          { label: t('nav.news'),      to: '/blog' },
          { label: t('nav.contact'),   to: '/contact' },
        ]} />

        {/* Services */}
        <FooterCol
          title={t('footer.servicesColumnTitle')}
          links={t('footer.offerLinks').map(({ hash, label }) => ({ label, to: `/services#${hash}` }))}
        />

        {/* Social & Legal */}
        <FooterCol title={t('footer.legalTitle')} links={[
          { label: t('footer.impressum'),      to: '/imprint' },
          { label: t('footer.dataProtection'), to: '/data-protection' },
        ]} />
      </div>

      <div className="footer-bottom">
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.22)' }}>
          © {new Date().getFullYear()} Suhail Services. {t('footer.rightsReserved')}
        </p>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.22)' }}>
          {t('footer.location')}
        </p>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }) {
  return (
    <div>
      <p style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em', textTransform: 'none', marginBottom: 20 }}>
        {title}
      </p>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 13 }}>
        {links.map(l => (
          <li key={l.label}>
            <Link to={l.to} style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', letterSpacing: '-0.01em', transition: 'color 0.2s', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FooterLogo() {
  return <BrandLogo variant="light" />
}
