/**
 * Uploads images to Cloudinary from two sources:
 *   1. dist/images/             → replaces /images/... references in src/
 *   2. assets/facility-services-images/ → replaces relative asset paths in src/
 *
 * Usage:
 *   CLOUDINARY_API_KEY=xxx CLOUDINARY_API_SECRET=yyy node scripts/upload-to-cloudinary.mjs
 */

import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// ── Config ────────────────────────────────────────────────────────────────────
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'dfc0qnh88'
const API_KEY    = process.env.CLOUDINARY_API_KEY    || ''
const API_SECRET = process.env.CLOUDINARY_API_SECRET || ''

if (!API_KEY || !API_SECRET) {
  console.error('\n❌  Set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET as environment variables.\n')
  process.exit(1)
}

cloudinary.config({ cloud_name: CLOUD_NAME, api_key: API_KEY, api_secret: API_SECRET, secure: true })

const __dirname  = path.dirname(fileURLToPath(import.meta.url))
const ROOT       = path.resolve(__dirname, '..')
const SRC_DIR    = path.join(ROOT, 'src')

// ── Image sources ─────────────────────────────────────────────────────────────
// localPrefix: the string pattern used in source code
// absDir:      where the actual files live on disk
// cloudFolder: Cloudinary folder to upload into
const IMAGE_SOURCES = [
  {
    absDir:      path.join(ROOT, 'dist', 'images'),
    localPrefix: '/images/',
    cloudFolder: 'suhail-services/images',
  },
  {
    absDir:      path.join(ROOT, 'assets', 'facility-services-images'),
    // serviceDetails.js uses paths like: /assets/facility-services-images/facility-automotive.png
    // or possibly relative — we handle both
    localPrefix: '/assets/facility-services-images/',
    cloudFolder: 'suhail-services/facility-services-images',
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function walkFiles(dir, exts = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif']) {
  const results = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) results.push(...walkFiles(full, exts))
    else if (exts.includes(path.extname(entry.name).toLowerCase())) results.push(full)
  }
  return results
}

function walkSrcFiles(dir, exts = ['.js', '.jsx', '.ts', '.tsx', '.css', '.html']) {
  const results = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) results.push(...walkSrcFiles(full, exts))
    else if (exts.includes(path.extname(entry.name).toLowerCase())) results.push(full)
  }
  return results
}

// ── Step 1: Upload ────────────────────────────────────────────────────────────

const urlMap = {}   // localUrl → cloudinaryUrl

for (const source of IMAGE_SOURCES) {
  if (!fs.existsSync(source.absDir)) {
    console.warn(`\n⚠️   Skipping (not found): ${source.absDir}`)
    continue
  }

  const files = walkFiles(source.absDir)
  console.log(`\n📦  ${source.absDir}\n    ${files.length} images to upload\n`)

  for (const file of files) {
    const rel      = path.relative(source.absDir, file).replace(/\\/g, '/')
    const noExt    = rel.replace(/\.[^.]+$/, '')
    const publicId = source.cloudFolder + '/' + noExt
    const localUrl = source.localPrefix + rel

    try {
      const result = await cloudinary.uploader.upload(file, {
        public_id:     publicId,
        overwrite:     true,
        resource_type: 'image',
        use_filename:  false,
      })
      urlMap[localUrl] = result.secure_url
      console.log(`  ✅  ${localUrl}\n      → ${result.secure_url}`)
    } catch (err) {
      console.error(`  ❌  ${localUrl}: ${err.message}`)
    }
  }
}

// Save map for reference
const mapPath = path.join(ROOT, 'scripts', 'cloudinary-url-map.json')
fs.writeFileSync(mapPath, JSON.stringify(urlMap, null, 2))
console.log(`\n📝  URL map saved to scripts/cloudinary-url-map.json`)

// ── Step 2: Rewrite source files ──────────────────────────────────────────────

console.log('\n🔁  Rewriting source files…\n')

const srcFiles = walkSrcFiles(SRC_DIR)
let totalReplacements = 0

for (const file of srcFiles) {
  let content = fs.readFileSync(file, 'utf8')
  let changed = false

  for (const [local, cdn] of Object.entries(urlMap)) {
    const escaped = local.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    if (new RegExp(escaped).test(content)) {
      content = content.replace(new RegExp(escaped, 'g'), cdn)
      changed = true
      totalReplacements++
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8')
    console.log(`  ✏️   ${path.relative(ROOT, file)}`)
  }
}

console.log(`\n✅  Done! ${totalReplacements} references rewritten across source files.`)
console.log('    You can now safely delete dist/images/ and assets/facility-services-images/ (keep a backup first).\n')
