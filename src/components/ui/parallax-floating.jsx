import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export function FloatingElement({ children, depth = 1, className = '', style = {} }) {
  return <div className={`absolute ${className}`} style={style} data-depth={depth}>{children}</div>
}

function DepthLayer({ depth, springX, springY, className, style, children }) {
  const x = useTransform(springX, (v) => v * depth)
  const y = useTransform(springY, (v) => v * depth)
  return (
    <motion.div className={`absolute ${className}`} style={{ x, y, ...style }}>
      {children}
    </motion.div>
  )
}

export function Floating({ children, sensitivity = -0.5, className = '' }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { damping: 25, stiffness: 100 })
  const springY = useSpring(mouseY, { damping: 25, stiffness: 100 })

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    if (isTouchDevice) {
      // Gyroscope: beta = front/back tilt (-180..180), gamma = left/right tilt (-90..90)
      let baseGamma = null
      let baseBeta = null
      const handleOrientation = (e) => {
        const gamma = e.gamma ?? 0  // left/right → X
        const beta  = e.beta  ?? 0  // front/back → Y

        // Capture neutral position on first event
        if (baseGamma === null) { baseGamma = gamma; baseBeta = beta; return }

        const dx = Math.max(-45, Math.min(45, gamma - baseGamma))
        const dy = Math.max(-45, Math.min(45, beta  - baseBeta))

        mouseX.set((dx / 45) * sensitivity * -60)
        mouseY.set((dy / 45) * sensitivity * -60)
      }

      // iOS 13+ requires permission
      if (typeof DeviceOrientationEvent !== 'undefined' &&
          typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
          .then(state => {
            if (state === 'granted') window.addEventListener('deviceorientation', handleOrientation)
          })
          .catch(() => {})
      } else {
        window.addEventListener('deviceorientation', handleOrientation)
      }
      return () => window.removeEventListener('deviceorientation', handleOrientation)
    } else {
      const handleMove = (e) => {
        const { innerWidth, innerHeight } = window
        mouseX.set(((e.clientX / innerWidth) - 0.5) * sensitivity * 80)
        mouseY.set(((e.clientY / innerHeight) - 0.5) * sensitivity * 80)
      }
      window.addEventListener('mousemove', handleMove)
      return () => window.removeEventListener('mousemove', handleMove)
    }
  }, [sensitivity, mouseX, mouseY])

  const childArray = Array.isArray(children) ? children : [children]

  return (
    <div className={`absolute inset-0 ${className}`}>
      {childArray.map((child, i) => {
        if (!child) return null
        const depth = child.props?.depth ?? 1
        const cls = child.props?.className ?? ''
        const sty = child.props?.style ?? {}
        return (
          <DepthLayer key={i} depth={depth} springX={springX} springY={springY} className={cls} style={sty}>
            {child.props?.children}
          </DepthLayer>
        )
      })}
    </div>
  )
}
