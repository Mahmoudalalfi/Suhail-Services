export const COOKIE_CONSENT_KEY = 'cookie-consent'
export const OPEN_COOKIE_SETTINGS_EVENT = 'open-cookie-settings'

export function getCookieConsent() {
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setCookieConsent(consent) {
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent))
}

export function openCookieSettings() {
  window.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS_EVENT))
}
