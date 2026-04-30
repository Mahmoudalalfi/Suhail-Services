/** Buckets headings for data-protection TOC navigation (English + German headings). */

export const TOC_GROUP_ORDER = ['core', 'engagement', 'channels', 'marketing', 'legal', 'general']

/**
 * @param {string} title Heading text from markdown
 * @returns {string} Group key from TOC_GROUP_ORDER
 */
export function assignTocGroup(title) {
  const x = title.toLowerCase()

  // Marketing & analytics (check before generic "google")
  if (
    /\bgoogle ad|\badwords\b|\bremarketing\b|\bdouble\s*[- ]?click\b|\bconversion\b.*google/i.test(
      x + ' '
    )
  )
    return 'marketing'

  /* Stand-alone line "### X": /^x$/ was broken when tested against `title + ' '` */
  if (title.trim().toLowerCase() === 'x') return 'channels'

  // Social platforms & outbound links — specific product names first
  if (
    /\bfacebook\b|\binstagram\b|\btiktok\b|\byoutube\b|\bxing\b|\blinkedin\b|\bwhatsapp\b|links to other|link.*extern|extern.*website|\btwitter\b|(^|\s)—\s*x(\s|$)/i.test(
      x + ' '
    )
  )
    return 'channels'

  // Liability, IP, contests, conferencing (long tail of document)
  if (
    /copyright|\burheber|^exclusion of liability|\bhaftungsausschluss|brand names|\b trademarks?\b|^markennamen|\b trademarks?\s+and|^datensicherheit|^data security|^technology used|\btechnologien\b|\bcompetitions?\b|\bwettbewerb|\bprediction game|\badvent calendar|\baudio and video|\bvideokonferenz|\bkonferenztool|\bteams\b|\bzoom\b|teilnahmebedingungen|^terms and conditions|nutzungsbedingungen/i.test(
      x + ' '
    )
  )
    return 'legal'

  // Consent, newsletter, objection
  if (
    /\bnewsletter\b|\bobjection\b|\brevocation\b|\bconsent\b|\bdouble opt|\bopt-?in\b|widerruf|widerspruch|einwilligung|zustimmung.*verarbeitung/i.test(
      x + ' '
    )
  )
    return 'engagement'

  // Opening sections: scope, rights, logs, cookies, services
  if (
    /^data protection statement|^datenschutzerklärung|information on the collection|sammlung personenbezogener|erfassung personenbezogener|informationen zur erhebung|^your rights|\bbetroffenenrechte|^ihre rechte|collection of personal data|further functions|weitere funktionen|^kernrechte|hinweis zur parallelen|full legal text/i.test(
      x + ' '
    )
  )
    return 'core'

  return 'general'
}

/**
 * @param {Array<{ id: string, title: string, depth: number }>} outline
 * @returns {Array<{ group: string, items: typeof outline }>}
 */
export function buildTocSections(outline) {
  const buckets = Object.fromEntries(TOC_GROUP_ORDER.map((k) => [k, []]))
  for (const item of outline) {
    buckets[assignTocGroup(item.title)].push(item)
  }
  return TOC_GROUP_ORDER.filter((g) => buckets[g].length > 0).map((g) => ({
    group: g,
    items: buckets[g],
  }))
}
