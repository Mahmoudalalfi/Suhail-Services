/**
 * Wordmark from `publichttps://res.cloudinary.com/dfc0qnh88/image/upload/v1777490797/suhail-services/ServiceLogo.png`.
 * `variant="light"` inverts for dark backgrounds (dark-on-transparent marks).
 * `compact` — use in the top nav beside the pill: one fixed height/max-width so layout stays predictable.
 */
export default function BrandLogo({ variant = 'dark', compact = false, mobile = false }) {
  const light = variant === 'light'
  const h = mobile ? 52 : compact ? 120 : light ? 250 : 300
  const maxW = mobile ? 'min(140px, 36vw)' : compact ? 'min(260px, 52vw)' : 'min(360px, 72vw)'
  return (
    <img
      src="https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490797/suhail-services/ServiceLogo.png"
      alt="Suhail Services"
      style={{
        height: h,
        width: 'auto',
        maxWidth: maxW,
        objectFit: 'contain',
        objectPosition: 'left center',
        display: 'block',
        ...(light ? { filter: 'brightness(0) invert(1)' } : {}),
      }}
    />
  )
}
