import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const [hov, setHov] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(ref.current,
      { opacity: 0, y: 55 },
      {
        opacity: 1, y: 0,
        duration: 0.8, ease: 'power3.out',
        delay: (index % 2) * 0.12,
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      }
    )
  }, [])

  return (
    <div ref={ref} style={{ opacity: 0, minWidth: 0 }}>
      <Link
        className="work-project-card"
        to="#"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{ textDecoration: 'none' }}
      >
        <img
          src={project.img}
          alt={project.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hov ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.75s cubic-bezier(0.16,1,0.3,1)',
            willChange: 'transform',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,11,18,0.62) 0%, transparent 55%)',
          opacity: hov ? 1 : 0.75,
          transition: 'opacity 0.4s',
        }} />
        <div style={{ position: 'absolute', bottom: 'clamp(12px,3vw,26px)', left: 'clamp(12px,3vw,26px)', color: '#fff' }}>
          <p style={{ fontSize: 'clamp(9px,2vw,11px)', fontWeight: 400, opacity: 0.6, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 4 }}>
            {project.tag} · {project.year}
          </p>
          <p style={{ fontSize: 'clamp(13px,3vw,22px)', fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1 }}>
            {project.title}
          </p>
        </div>
        <div style={{
          position: 'absolute', top: 'clamp(10px,2.5vw,22px)', right: 'clamp(10px,2.5vw,22px)',
          width: 'clamp(30px,7vw,44px)', height: 'clamp(30px,7vw,44px)', borderRadius: '50%',
          background: hov ? '#FACC15' : 'rgba(255,255,255,0.92)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 17,
          color: hov ? '#0f0f12' : '#000000',
          transition: 'background 0.25s, color 0.25s',
          backdropFilter: 'blur(6px)',
          boxShadow: '0 2px 12px rgba(30,31,40,0.12)',
        }}>↗</div>
      </Link>
    </div>
  )
}

export default function WorkPage() {
  const { t } = useLanguage()
  const headRef = useRef(null)

  useEffect(() => {
    if (!headRef.current) return
    gsap.fromTo(headRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: 0.05 }
    )
  }, [])

  return (
    <div>
      {/* Header — centered below fixed nav so logo/title never collide */}
      <section style={{
        padding: `clamp(108px, 14vh, 152px) clamp(20px, 5vw, 44px) clamp(40px, 6vw, 56px)`,
        background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)',
        borderBottom: '1px solid rgba(30,31,40,0.06)',
      }}>
        <div
          ref={headRef}
          style={{
            opacity: 0,
            maxWidth: 920,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.11em',
            textTransform: 'uppercase',
            color: 'rgba(30,31,40,0.45)',
            marginBottom: 18,
          }}>
            {t('work.subtitle')}
          </p>
          <h1 style={{
            fontSize: 'clamp(32px, 5.4vw, 76px)',
            fontWeight: 300,
            letterSpacing: '-0.035em',
            color: '#0f0f12',
            lineHeight: 1.05,
            margin: 0,
          }}>
            {t('work.title1')}<br />{t('work.title2')}
          </h1>
          <div style={{
            width: 48,
            height: 4,
            borderRadius: 2,
            margin: '28px auto 0',
            background: 'linear-gradient(90deg, #FACC15 0%, #EAB308 100%)',
          }} aria-hidden />
        </div>
      </section>

      {/* Project grid — two columns from tablet */}
      <section style={{
        padding: 'clamp(28px, 5vw, 44px) clamp(14px, 4vw, 28px) clamp(72px, 10vw, 96px)',
        background: '#fafafa',
      }}>
        <div className="work-page-grid">
          {t('work.projects').map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  )
}
