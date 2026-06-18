import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

export default function CookieBanner() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setVisible(true)
  }, [])

  if (!visible) return null

  const accept = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({ essential: true, analytics: true }))
    setVisible(false)
  }

  const reject = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({ essential: true, analytics: false }))
    setVisible(false)
  }

  const saveSettings = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({ essential: true, analytics }))
    setVisible(false)
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
        {!showSettings ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, margin: 0 }}>
              {t('cookie.bannerText')}{' '}
              <Link to="/data-protection" style={{ color: '#7EAADC', textDecoration: 'underline' }}>
                {t('cookie.privacyLink')}
              </Link>
            </p>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button onClick={() => setShowSettings(true)} style={ghostBtn}>
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
                style={{
                  width: 36, height: 20, borderRadius: 10, border: 'none', cursor: 'pointer',
                  background: analytics ? '#1B3A7A' : 'rgba(255,255,255,0.18)',
                  position: 'relative', transition: 'background 0.2s', flexShrink: 0, marginLeft: 12,
                }}
              >
                <span style={{
                  position: 'absolute', top: 2, left: analytics ? 17 : 2,
                  width: 16, height: 16, borderRadius: '50%',
                  background: analytics ? '#fff' : '#fff',
                  transition: 'left 0.2s',
                }} />
              </button>
            </div>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowSettings(false)} style={ghostBtn}>{t('cookie.back')}</button>
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
  background: '#1B3A7A', border: '1px solid #1B3A7A',
  color: '#fff', transition: 'all 0.18s',
  whiteSpace: 'nowrap',
}
