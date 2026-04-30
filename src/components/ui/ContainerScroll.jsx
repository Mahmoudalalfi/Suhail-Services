import React, { useRef, useState, useEffect } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'

export function ContainerScroll({ titleComponent, children }) {
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Track when the container scrolls through the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Animation plays as element enters viewport (0 = bottom of screen, 0.5 = centered)
  const rotate = useTransform(scrollYProgress, [0, 0.5], [20, 0])
  const scale  = useTransform(scrollYProgress, [0, 0.5], [0.92, 1])

  if (isMobile) {
    return (
      <div style={{ padding: '32px 16px 48px' }}>
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 16 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            borderRadius: 20,
            border: '1px solid rgba(30,31,40,0.1)',
            background: '#fff',
            overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(30,31,40,0.08)',
            transformOrigin: 'top center',
            perspective: 800,
          }}
        >
          {children}
        </motion.div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      style={{
        height: '52rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '40px 20px',
      }}
    >
      <div style={{ width: '100%', perspective: '1000px', position: 'relative', paddingTop: 80 }}>
        {titleComponent && (
          <motion.div style={{ textAlign: 'center', maxWidth: 860, margin: '0 auto' }}>
            {titleComponent}
          </motion.div>
        )}
        <motion.div
          style={{
            rotateX: rotate,
            scale,
            marginTop: titleComponent ? -48 : 0,
            boxShadow: '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a',
            maxWidth: 900,
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: 24,
            border: '1px solid rgba(30,31,40,0.1)',
            background: '#fff',
            overflow: 'hidden',
            transformOrigin: 'top center',
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
