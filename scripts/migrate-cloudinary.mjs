/**
 * Migrates images from the old Cloudinary account (dfc0qnh88) to the new one (df7aiznm6)
 * by fetching each image from the old account and re-uploading it to the new account.
 *
 * The src files already reference df7aiznm6 URLs — this script fetches the same
 * images from dfc0qnh88 (which still has them) and uploads to df7aiznm6 under
 * identical public IDs, so the URLs in source code become valid.
 *
 * Usage:
 *   CLOUDINARY_API_KEY=xxx CLOUDINARY_API_SECRET=yyy node scripts/migrate-cloudinary.mjs
 */

import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const NEW_CLOUD_NAME = 'df7aiznm6'
const OLD_CLOUD_NAME = 'dfc0qnh88'
const API_KEY = process.env.CLOUDINARY_API_KEY || ''
const API_SECRET = process.env.CLOUDINARY_API_SECRET || ''

if (!API_KEY || !API_SECRET) {
  console.error('\n❌  Set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET as environment variables.\n')
  process.exit(1)
}

cloudinary.config({ cloud_name: NEW_CLOUD_NAME, api_key: API_KEY, api_secret: API_SECRET, secure: true })

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SRC_DIR = path.join(ROOT, 'src')
const INDEX_HTML = path.join(ROOT, 'index.html')

function walkSrcFiles(dir) {
  const results = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) results.push(...walkSrcFiles(full))
    else if (['.js', '.jsx', '.ts', '.tsx', '.html'].includes(path.extname(entry.name))) results.push(full)
  }
  return results
}

// Collect all new-account URLs currently in source files
const newUrlPattern = new RegExp(`https://res\\.cloudinary\\.com/${NEW_CLOUD_NAME}/image/upload/[^\\s"')]+`, 'g')
const allNewUrls = new Set()

for (const file of [...walkSrcFiles(SRC_DIR), INDEX_HTML]) {
  const content = fs.readFileSync(file, 'utf8')
  for (const url of content.match(newUrlPattern) || []) allNewUrls.add(url)
}

console.log(`\n🚀  Migrating ${allNewUrls.size} images`)
console.log(`    Source: ${OLD_CLOUD_NAME} (old personal account)`)
console.log(`    Target: ${NEW_CLOUD_NAME} (company account)\n`)

let success = 0
let failed = 0

for (const newUrl of allNewUrls) {
  // Derive the old URL by swapping cloud names
  const oldUrl = newUrl.replace(NEW_CLOUD_NAME, OLD_CLOUD_NAME)

  // Extract public_id: everything after /upload/ (strip version prefix vNNN/)
  const match = newUrl.match(/\/upload\/(?:v\d+\/)?(.+)$/)
  if (!match) {
    console.warn(`  ⚠️   Could not parse: ${newUrl}`)
    continue
  }
  const publicId = match[1].replace(/\.[^/.]+$/, '')

  try {
    const result = await cloudinary.uploader.upload(oldUrl, {
      public_id: publicId,
      overwrite: true,
      resource_type: 'image',
      use_filename: false,
      timestamp: Math.floor(Date.now() / 1000),
    })
    console.log(`  ✅  ${publicId}`)
    success++
  } catch (err) {
    console.error(`  ❌  ${publicId}: ${err.message}`)
    failed++
  }
}

console.log(`\n✅  Migration complete: ${success} succeeded, ${failed} failed\n`)
