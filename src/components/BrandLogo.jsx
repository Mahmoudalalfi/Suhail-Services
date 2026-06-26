export default function BrandLogo({ variant = 'dark', compact = false, mobile = false, isWhiteMode = false }) {
  const h = mobile ? 68 : compact ? 140 : variant === 'light' ? 320 : 380
  const maxW = mobile ? 'min(170px, 42vw)' : compact ? 'min(280px, 55vw)' : 'min(440px, 80vw)'
  return (
    <img
      src={isWhiteMode ? "/new-logo-dark.png" : "/new-logo.png"}
      alt="Suhaili Services"
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
