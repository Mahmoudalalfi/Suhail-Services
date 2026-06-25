export default function BrandLogo({ variant = 'dark', compact = false, mobile = false, isWhiteMode = false }) {
  const h = mobile ? 56 : compact ? 140 : variant === 'light' ? 320 : 380
  const maxW = mobile ? 'min(150px, 38vw)' : compact ? 'min(280px, 55vw)' : 'min(440px, 80vw)'
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
