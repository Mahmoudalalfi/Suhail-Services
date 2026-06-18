export default function BrandLogo({ variant = 'dark', compact = false, mobile = false, isWhiteMode = false }) {
  const h = mobile ? 72 : compact ? 160 : variant === 'light' ? 320 : 380
  const maxW = mobile ? 'min(180px, 44vw)' : compact ? 'min(320px, 60vw)' : 'min(440px, 80vw)'
  return (
    <img
      src={isWhiteMode ? "/new-logo-dark.png" : "/new-logo.png"}
      alt="suhail Services"
      style={{
        height: h,
        width: 'auto',
        maxWidth: maxW,
        objectFit: 'contain',
        objectPosition: 'left center',
        display: 'block',
      }}
    />
  )
}
