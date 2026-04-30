const ALL_SLUGS = [
  'general-services',
  'office-cleaning',
  'construction-cleaning',
  'deep-cleaning',
  'maintenance-cleaning',
  'cashier-services',
  'warehouse-services',
  'construction-interior',
  'installation-unpacking',
  'electrical-assistance',
  'transport',
  'staffing-services',
]

const DEDICATED = {
  'general-services':       'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1400',
  'office-cleaning':        'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1400',
  'construction-cleaning':  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1400',
  'deep-cleaning':          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1400',
  'maintenance-cleaning':   'https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=1400',
  'cashier-services':       'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1400',
  'warehouse-services':     'https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1400',
  'construction-interior':  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1400',
  'installation-unpacking': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1400',
  'electrical-assistance':  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1400',
  'transport':              'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1400',
  'staffing-services':      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1400',
}

export const SERVICE_HERO_IMAGES = Object.fromEntries(ALL_SLUGS.map((slug) => [slug, DEDICATED[slug]]))

export function getServiceHeroImage(slug) {
  if (!slug) return undefined
  return DEDICATED[slug]
}
