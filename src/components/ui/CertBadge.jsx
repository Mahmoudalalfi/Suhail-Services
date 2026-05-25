import { useRef, useState, useEffect } from 'react'

const identityMatrix =
  '1, 0, 0, 0, ' +
  '0, 1, 0, 0, ' +
  '0, 0, 1, 0, ' +
  '0, 0, 0, 1'

const maxRotate = 0.25
const minRotate = -0.25
const maxScale = 1
const minScale = 0.97

// Gold / Silver / Bronze metallic backgrounds
const bgColors = ['#f3e3ac', '#e2e2e2', '#f1cfa6']

const hues = [
  'hsl(358,100%,62%)', 'hsl(30,100%,50%)', 'hsl(60,100%,50%)',
  'hsl(96,100%,50%)', 'hsl(233,85%,47%)', 'hsl(271,85%,47%)',
  'hsl(300,20%,35%)', 'transparent', 'transparent', 'white',
]

export default function CertBadge({ label, title, place = 2, href }) {
  const ref = useRef(null)
  const [overlayPos, setOverlayPos] = useState(0)
  const [matrix, setMatrix] = useState(identityMatrix)
  const [currentMatrix, setCurrentMatrix] = useState(identityMatrix)
  const [disableInOut, setDisableInOut] = useState(true)
  const [disableAnim, setDisableAnim] = useState(false)
  const [timeoutDone, setTimeoutDone] = useState(false)
  const enterTO = useRef(null)
  const leaveTO1 = useRef(null)
  const leaveTO2 = useRef(null)
  const leaveTO3 = useRef(null)
  const overlayPosRef = useRef(0)

  useEffect(() => { overlayPosRef.current = overlayPos }, [overlayPos])

  const getDims = () => {
    const r = ref.current?.getBoundingClientRect() || {}
    return { left: r.left || 0, right: r.right || 0, top: r.top || 0, bottom: r.bottom || 0 }
  }

  const calcMatrix = (cx, cy) => {
    const { left, right, top, bottom } = getDims()
    const xc = (left + right) / 2, yc = (top + bottom) / 2
    const s = [
      maxScale - (maxScale - minScale) * Math.abs(xc - cx) / (xc - left),
      maxScale - (maxScale - minScale) * Math.abs(yc - cy) / (yc - top),
      maxScale - (maxScale - minScale) * (Math.abs(xc - cx) + Math.abs(yc - cy)) / (xc - left + yc - top),
    ]
    return (
      `${s[0]}, 0, ` +
      `${-(maxRotate - (maxRotate - minRotate) * Math.abs(right - cx) / (right - left))}, 0, ` +
      `${0.25 * ((yc - cy) / yc - (xc - cx) / xc)}, ${s[1]}, ` +
      `${0.2 - (0.8) * (top - cy) / (top - bottom)}, 0, ` +
      `${maxRotate - (maxRotate - minRotate) * Math.abs(right - cx) / (right - left)}, ` +
      `${maxRotate - (maxRotate - minRotate) * (top - cy) / (top - bottom)}, ` +
      `${s[2]}, 0, 0, 0, 0, 1`
    )
  }

  const oppMatrix = (m, cy, onEnter) => {
    const { top, bottom } = getDims()
    const oppY = bottom - cy + top
    const weak = onEnter ? 0.7 : 4
    const mul = onEnter ? -1 : 1
    return m.split(', ').map((v, i) => {
      if (i === 2 || i === 4 || i === 8) return String(-parseFloat(v) * mul / weak)
      if (i === 0 || i === 5 || i === 10) return '1'
      if (i === 6) return String(mul * (maxRotate - (maxRotate - minRotate) * (top - oppY) / (top - bottom)) / weak)
      if (i === 9) return String((maxRotate - (maxRotate - minRotate) * (top - oppY) / (top - bottom)) / weak)
      return v
    }).join(', ')
  }

  const onMouseEnter = (e) => {
    ;[leaveTO1, leaveTO2, leaveTO3].forEach(t => t.current && clearTimeout(t.current))
    setDisableAnim(true)
    const { left, right, top, bottom } = getDims()
    const xc = (left + right) / 2, yc = (top + bottom) / 2
    setDisableInOut(false)
    enterTO.current = setTimeout(() => setDisableInOut(true), 350)
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setOverlayPos((Math.abs(xc - e.clientX) + Math.abs(yc - e.clientY)) / 1.5)
    }))
    const m = calcMatrix(e.clientX, e.clientY)
    setMatrix(oppMatrix(m, e.clientY, true))
    setTimeoutDone(false)
    setTimeout(() => setTimeoutDone(true), 200)
  }

  const onMouseMove = (e) => {
    const { left, right, top, bottom } = getDims()
    const xc = (left + right) / 2, yc = (top + bottom) / 2
    setTimeout(() => setOverlayPos((Math.abs(xc - e.clientX) + Math.abs(yc - e.clientY)) / 1.5), 150)
    if (timeoutDone) setCurrentMatrix(calcMatrix(e.clientX, e.clientY))
  }

  const onMouseLeave = (e) => {
    if (enterTO.current) clearTimeout(enterTO.current)
    const opp = oppMatrix(matrix, e.clientY)
    setCurrentMatrix(opp)
    setTimeout(() => setCurrentMatrix(identityMatrix), 200)
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setDisableInOut(false)
      leaveTO1.current = setTimeout(() => setOverlayPos(-overlayPosRef.current / 4), 150)
      leaveTO2.current = setTimeout(() => setOverlayPos(0), 300)
      leaveTO3.current = setTimeout(() => { setDisableAnim(false); setDisableInOut(true) }, 500)
    }))
  }

  useEffect(() => { if (timeoutDone) setMatrix(currentMatrix) }, [currentMatrix, timeoutDone])

  const overlayAnims = [...Array(10).keys()].map(i => `
    @keyframes certAnim${i} {
      0%   { transform: rotate(${i * 10}deg); }
      50%  { transform: rotate(${(i + 1) * 10}deg); }
      100% { transform: rotate(${i * 10}deg); }
    }
  `).join('')

  const bg = bgColors[(place || 2) - 1] || bgColors[1]
  const uid = useRef(`cb-${Math.random().toString(36).slice(2, 6)}`).current
  const Tag = href ? 'a' : 'div'
  const tagProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <Tag
      ref={ref}
      {...tagProps}
      style={{ display: 'block', width: 200, flexShrink: 0, cursor: href ? 'pointer' : 'default', textDecoration: 'none' }}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <style>{overlayAnims}</style>
      <div style={{
        transform: `perspective(700px) matrix3d(${matrix})`,
        transformOrigin: 'center center',
        transition: 'transform 200ms ease-out',
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 60" width={200} height={46} style={{ display: 'block' }}>
          <defs>
            <filter id={`blur-${uid}`}>
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>
            <mask id={`mask-${uid}`}>
              <rect width="260" height="60" fill="white" rx="12" />
            </mask>
          </defs>

          {/* Solid background */}
          <rect width="260" height="60" rx="12" fill={bg} />
          {/* Inner border */}
          <rect x="3" y="3" width="254" height="54" rx="10" fill="transparent" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />

          {/* Wreath icon */}
          <image href="https://res.cloudinary.com/df7aiznm6/image/upload/suhail-services/images/platinum.png" x="10" y="10" width="36" height="36" />

          {/* Label */}
          <text fontFamily="'DM Sans', sans-serif" fontSize="9" fontWeight="600" fill="rgba(0,0,0,0.5)" letterSpacing="0.06em" x="56" y="24">
            {label}
          </text>
          {/* Title */}
          <text fontFamily="'DM Sans', sans-serif" fontSize="15" fontWeight="700" fill="rgba(0,0,0,0.75)" x="56" y="44">
            {title}
          </text>

          {/* Holographic overlay — only visible on hover via mix-blend-mode overlay */}
          <g style={{ mixBlendMode: 'overlay' }} mask={`url(#mask-${uid})`}>
            {hues.map((color, i) => (
              <g key={i} style={{
                transform: `rotate(${overlayPos + i * 10}deg)`,
                transformOrigin: 'center center',
                transition: !disableInOut ? 'transform 200ms ease-out' : 'none',
                animation: disableAnim ? 'none' : `certAnim${i} 5s infinite`,
                willChange: 'transform',
              }}>
                <polygon points="0,0 260,60 260,0 0,60" fill={color} filter={`url(#blur-${uid})`} opacity="0.5" />
              </g>
            ))}
          </g>
        </svg>
      </div>
    </Tag>
  )
}
