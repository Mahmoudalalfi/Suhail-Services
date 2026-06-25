import { useEffect } from 'react'

export default function useSEO({ title, description, canonical }) {
  useEffect(() => {
    // Title
    document.title = title

    // Meta description
    let desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', description)

    // OG tags
    const setMeta = (sel, val) => {
      const el = document.querySelector(sel)
      if (el) el.setAttribute('content', val)
    }
    setMeta('meta[property="og:title"]', title)
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[name="twitter:title"]', title)
    setMeta('meta[name="twitter:description"]', description)

    // Canonical
    let link = document.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    if (canonical) link.href = canonical

    return () => {
      document.title = 'Suhaili Service GmbH — Service & Facility Management'
    }
  }, [title, description, canonical])
}
