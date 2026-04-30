import { useMemo } from 'react'
import { marked } from 'marked'
import { getImprintDatenschutzMarkdown } from '../data/imprintDatenschutzMarkdown'
import { extractMarkdownOutline, injectHeadingIds } from '../utils/legalMarkdownHeadings'

marked.setOptions({ mangle: false, headerIds: false, breaks: true })

export default function ImprintLegalMarkdown({ lang, injectAnchors = false }) {
  const html = useMemo(() => {
    const md = getImprintDatenschutzMarkdown(lang)
    let out = marked.parse(md)
    if (injectAnchors) {
      const outline = extractMarkdownOutline(md)
      out = injectHeadingIds(out, outline)
    }
    return out
  }, [lang, injectAnchors])

  return (
    <div
      className="imprint-legal-md"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
