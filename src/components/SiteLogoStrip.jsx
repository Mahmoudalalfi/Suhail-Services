import { Link } from 'react-router-dom'
import BrandLogo from './BrandLogo'

/** Sits at the top of the page in normal flow (scrolls with content). Nav stays `position: fixed` separately. */
export default function SiteLogoStrip() {
  return (
    <div
      id="site-logo-rail"
      style={{
        position: 'relative',
        zIndex: 1003,
        padding: '8px 28px 10px',
        pointerEvents: 'none',
      }}
    >
      <Link
        to="/"
        style={{
          pointerEvents: 'auto',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <BrandLogo variant="dark" compact />
      </Link>
    </div>
  )
}
