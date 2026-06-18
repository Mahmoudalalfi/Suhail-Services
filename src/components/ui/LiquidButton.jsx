import { useState } from 'react'

/**
 * LiquidButton — true frosted-glass pill button.
 * Props:
 *   as          — 'button' | 'a' | Link component (default 'button')
 *   variant     — 'glass' (default) | 'solid'
 *   tint        — hex color to fill a solid variant (e.g. '#1B3A7A')
 *   textColor   — override text color
 *   children
 *   style       — extra style overrides
 *   ...rest     — forwarded to the inner element
 */
export default function LiquidButton({
  as: Tag = 'button',
  variant,
  tint,
  textColor,
  children,
  style = {},
  className,
  ...rest
}) {
  const [pressed, setPressed] = useState(false)
  const [hovered, setHovered] = useState(false)

  // Resolve variant: if tint is provided without explicit variant → solid
  const resolvedVariant = variant ?? (tint ? 'solid' : 'glass')
  const isSolid = resolvedVariant === 'solid'

  const resolvedText = textColor ?? (isSolid ? '#fff' : '#fff')

  const scale = pressed ? 0.965 : hovered ? 1.025 : 1

  const glassStyle = {
    background: 'rgba(255,255,255,0.12)',
    backdropFilter: 'blur(20px) saturate(1.8)',
    WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
    border: '1px solid rgba(255,255,255,0.22)',
    boxShadow: hovered
      ? [
          '0 8px 32px rgba(0,0,0,0.22)',
          'inset 0 1px 0 rgba(255,255,255,0.45)',
          'inset 0 -1px 0 rgba(0,0,0,0.06)',
        ].join(', ')
      : [
          '0 4px 16px rgba(0,0,0,0.14)',
          'inset 0 1px 0 rgba(255,255,255,0.35)',
          'inset 0 -1px 0 rgba(0,0,0,0.05)',
        ].join(', '),
  }

  const solidStyle = {
    background: tint ?? '#1B3A7A',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.16)',
    boxShadow: hovered
      ? [
          `0 8px 28px rgba(0,0,0,0.28)`,
          'inset 0 1px 0 rgba(255,255,255,0.22)',
        ].join(', ')
      : [
          `0 3px 14px rgba(0,0,0,0.18)`,
          'inset 0 1px 0 rgba(255,255,255,0.14)',
        ].join(', '),
  }

  const variantStyle = isSolid ? solidStyle : glassStyle

  return (
    <Tag
      {...rest}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: '11px 26px',
        borderRadius: 999,
        cursor: 'pointer',
        textDecoration: 'none',
        userSelect: 'none',
        outline: 'none',
        overflow: 'hidden',
        color: resolvedText,
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: '-0.01em',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        transform: `scale(${scale})`,
        transition: 'transform 200ms cubic-bezier(0.1,0.4,0.2,1), box-shadow 200ms cubic-bezier(0.1,0.4,0.2,1)',
        ...variantStyle,
        ...style,
      }}
      onMouseEnter={e => { setHovered(true); rest.onMouseEnter?.(e) }}
      onMouseLeave={e => { setHovered(false); setPressed(false); rest.onMouseLeave?.(e) }}
      onMouseDown={e => { setPressed(true); rest.onMouseDown?.(e) }}
      onMouseUp={e => { setPressed(false); rest.onMouseUp?.(e) }}
      onTouchStart={e => { setPressed(true); rest.onTouchStart?.(e) }}
      onTouchEnd={e => { setPressed(false); rest.onTouchEnd?.(e) }}
    >
      {/* Frosted glass top gloss */}
      {!isSolid && (
        <span aria-hidden style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
          borderRadius: '999px 999px 60% 60%',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.04) 100%)',
          pointerEvents: 'none',
        }} />
      )}
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </Tag>
  )
}
