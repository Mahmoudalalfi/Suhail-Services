import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import {
  getCookieConsent,
  setCookieConsent,
  OPEN_COOKIE_SETTINGS_EVENT,
} from '../utils/cookieConsent'

export default function CookieBanner() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState('banner')
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    const consent = getCookieConsent()
    if (!consent) {
      setOpen(true)
      setMode('banner')
    }
  }, [])

  useEffect(() => {
    const onOpenSettings = () => {
      const consent = getCookieConsent()
      setAnalytics(consent?.analytics ?? false)
      setOpen(true)
      setMode('settings')
    }

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpenSettings)
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpenSettings)
  }, [])

  if (!open) return null

  const close = () => setOpen(false)

  const accept = () => {
    setCookieConsent({ essential: true, analytics: true })
    close()
  }

  const reject = () => {
    setCookieConsent({ essential: true, analytics: false })
    close()
  }

  const saveSettings = () => {
    setCookieConsent({ essential: true, analytics })
    close()
  }

  const backFromSettings = () => {
    if (getCookieConsent()) close()
    else setMode('banner')
  }

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999,
      background: '#0a0a0a', color: '#fff',
      padding: '12px 16px',
      boxShadow: '0 -4px 32px rgba(0,0,0,0.35)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {mode === 'banner' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, margin: 0 }}>
              {t('cookie.bannerText')}{' '}
              <Link to="/data-protection" style={{ color: '#7EAADC', textDecoration: 'underline' }}>
                {t('cookie.privacyLink')}
              </Link>
            </p>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button onClick={() => setMode('settings')} style={ghostBtn}>
                {t('cookie.settings')}
              </button>
              <button onClick={reject} style={ghostBtn}>
                {t('cookie.reject')}
              </button>
              <button onClick={accept} style={primaryBtn}>
                {t('cookie.acceptAll')}
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: 0 }}>{t('cookie.settingsTitle')}</p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.05)' }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 500, color: '#fff', margin: '0 0 2px' }}>{t('cookie.essential')}</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0 }}>{t('cookie.essentialDesc')}</p>
              </div>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontStyle: 'italic', flexShrink: 0 }}>{t('cookie.alwaysOn')}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.05)' }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 500, color: '#fff', margin: '0 0 2px' }}>{t('cookie.analytics')}</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0 }}>{t('cookie.analyticsDesc')}</p>
              </div>
              <button
                onClick={() => setAnalytics(v => !v)}
                aria-pressed={analytics}
                style={{
                  width: 36, height: 20, borderRadius: 10, border: 'none', cursor: 'pointer',
                  background: analytics ? '#C9A84C' : 'rgba(255,255,255,0.18)',
                  position: 'relative', transition: 'background 0.2s', flexShrink: 0, marginLeft: 12,
                }}
              >
                <span style={{
                  position: 'absolute', top: 2, left: analytics ? 17 : 2,
                  width: 16, height: 16, borderRadius: '50%',
                  background: '#fff',
                  transition: 'left 0.2s',
                }} />
              </button>
            </div>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={backFromSettings} style={ghostBtn}>{t('cookie.back')}</button>
              <button onClick={saveSettings} style={primaryBtn}>{t('cookie.saveSettings')}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const ghostBtn = {
  fontSize: 12, fontWeight: 500, cursor: 'pointer',
  padding: '7px 14px', borderRadius: 7,
  background: 'transparent',
  border: '1px solid rgba(255,255,255,0.22)',
  color: 'rgba(255,255,255,0.72)',
  transition: 'all 0.18s',
  whiteSpace: 'nowrap',
}

const primaryBtn = {
  fontSize: 12, fontWeight: 600, cursor: 'pointer',
  padding: '7px 14px', borderRadius: 7,
  background: '#C9A84C', border: '1px solid #C9A84C',
  color: '#fff', transition: 'all 0.18s',
  whiteSpace: 'nowrap',
}
