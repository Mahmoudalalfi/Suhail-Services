import en1 from './imprint-datenschutz.en.part1.md?raw'
import en2 from './imprint-datenschutz.en.part2.md?raw'
import en3 from './imprint-datenschutz.en.part3.md?raw'
import deSummary from './imprint-datenschutz.de.summary.md?raw'

export const imprintDatenschutzMdEn = [en1, en2, en3].join('\n\n')

export function getImprintDatenschutzMarkdown(lang) {
  if (lang === 'de') {
    return `${deSummary}\n\n---\n\n## Full legal text (English)\n\n${imprintDatenschutzMdEn}`
  }
  return imprintDatenschutzMdEn
}
