import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

function PostCard({ post, index, featured }) {
  const ref = useRef(null)
  const [hov, setHov] = useState(false)

  useLayoutEffect(() => {
    if (!ref.current) return
    gsap.set(ref.current, { opacity: 0, y: 40 })
  }, [])
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const rect = el.getBoundingClientRect()
    const aboveViewport = rect.bottom < 0
    if (aboveViewport) { gsap.set(el, { opacity: 1, y: 0 }); return }
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
        delay: (index % 3) * 0.07,
        scrollTrigger: { trigger: el, start: 'top 70%', once: true },
      }
    )
  }, [])

  return (
    <article
      ref={ref}
      className={featured ? 'blog-card-featured' : undefined}
      style={{}}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <Link to="#" style={{ display: 'block', textDecoration: 'none' }}>
        <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '16/10', marginBottom: 20 }}>
          <img
            src={post.img}
            alt={post.title}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: hov ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.65s cubic-bezier(0.16,1,0.3,1)',
              willChange: 'transform',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(30,31,40,0.4)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>{post.tag}</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(30,31,40,0.2)', display: 'block' }} />
          <span style={{ fontSize: 12, color: 'rgba(30,31,40,0.4)' }}>{post.date}</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(30,31,40,0.2)', display: 'block' }} />
          <span style={{ fontSize: 12, color: 'rgba(30,31,40,0.4)' }}>{post.read}</span>
        </div>
        <p style={{
          fontSize: featured ? 'clamp(20px, 2.5vw, 30px)' : 18,
          fontWeight: 400, color: '#000000',
          letterSpacing: '-0.025em', lineHeight: 1.25,
          marginBottom: 10,
          opacity: hov ? 0.65 : 1,
          transition: 'opacity 0.25s',
        }}>
          {post.title}
        </p>
        <p style={{ fontSize: 14, fontWeight: 300, color: 'rgba(30,31,40,0.5)', lineHeight: 1.65, letterSpacing: '-0.01em' }}>
          {post.excerpt}
        </p>
      </Link>
    </article>
  )
}

export default function BlogPage() {
  const { t } = useLanguage()
  const headRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(headRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.05 }
    )
  }, [])

  return (
    <div>
      <section style={{ padding: 'clamp(100px, 14vw, 160px) clamp(20px, 5vw, 40px) 60px', background: '#fff' }}>
        <div ref={headRef}>
          <h1 style={{ fontSize: 'clamp(32px, 6vw, 88px)', fontWeight: 300, letterSpacing: '-0.04em', color: '#000000', lineHeight: 1.0, margin: 0 }}>
            {t('blog.title1')}<br />{t('blog.title2')}
          </h1>
        </div>
      </section>

      <section style={{ padding: '0 clamp(20px, 5vw, 40px) clamp(56px, 10vw, 100px)', background: '#fff' }}>
        <div className="blog-grid">
          {t('blog.posts').map((post, i) => (
            <PostCard key={post.title} post={post} index={i} featured={i === 0} />
          ))}
        </div>
      </section>
    </div>
  )
}
