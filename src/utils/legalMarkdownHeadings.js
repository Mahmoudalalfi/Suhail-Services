/** Plain headings + stable ids for TOC / anchor injection — matches ## / ### in GDPR markdown sources. */

function stripMdDecor(s) {
  return s.replace(/\*\*/g, '').replace(/`/g, '').trim()
}

function slugifyHeadingTitle(text) {
  const cleaned = stripMdDecor(text).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss')
  let slug = cleaned.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return slug || 'section'
}

/**
 * Extract h2/h3 outline from markdown in document order (for sticky TOC).
 */
export function extractMarkdownOutline(md) {
  const outline = []
  const usedIds = Object.create(null)
  const lines = md.split(/\n/)
  for (const line of lines) {
    const m = /^(#{2,3})\s+(.+)$/.exec(line)
    if (!m) continue
    const depth = m[1].length
    const title = stripMdDecor(m[2])
    let base = slugifyHeadingTitle(m[2])
    let id = base
    let n = 2
    while (usedIds[id]) {
      id = `${base}-${n++}`
    }
    usedIds[id] = true
    outline.push({ id, title, depth })
  }
  return outline
}

/**
 * Add id attributes to <h2> / <h3> in lexical order — must mirror extractMarkdownOutline.
 */
export function injectHeadingIds(html, outline) {
  const ids = outline.map(({ id }) => id)
  let i = 0
  return html.replace(/<h([23])(\s[^>]*)?>/g, (_, level, attrs) => {
    const id = ids[i++]
    if (!id) return `<h${level}${attrs ?? ''}>`
    const rest = attrs ?? ''
    if (/\bid\s*=/.test(rest)) return `<h${level}${rest}>`
    return `<h${level} id="${id}"${rest}>`
  })
}
