/**
 * Wordmark from `publichttps://res.cloudinary.com/df7aiznm6/image/upload/v1777490797/suhail-services/ServiceLogo.png`.
 * `variant="light"` inverts for dark backgrounds (dark-on-transparent marks).
 * `compact` — use in the top nav beside the pill: one fixed height/max-width so layout stays predictable.
 */
export default function BrandLogo({ variant = 'dark', compact = false, mobile = false }) {
  const light = variant === 'light'
  const h = mobile ? 72 : compact ? 160 : light ? 320 : 380
  const maxW = mobile ? 'min(180px, 44vw)' : compact ? 'min(320px, 60vw)' : 'min(440px, 80vw)'
  return (
    <img
      src="https://res.cloudinary.com/df7aiznm6/image/upload/v1777490797/suhail-services/ServiceLogo.png"
      alt="suhail Services"
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
