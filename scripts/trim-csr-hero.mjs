/**
 * Trim letterboxing / white mats from public/images/csr-hero-forest.png
 *
 * - Keeps csr-hero-forest.before-trim.png backup once (if missing)
 * - Try sharp.trim() thresholds
 * - Trim uniform near-white rows from bottom/top (forest imagery stays textured → higher variance)
 */
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const target = path.join(root, 'public', 'images', 'csr-hero-forest.png')
const backup = path.join(root, 'public', 'images', 'csr-hero-forest.before-trim.png')

/** Row reads like uniform bright letterboxing when luminance high AND variance low */
function rowIsLetterbox(u8, W, channels, y) {
  const lum = []
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * channels
    const r = u8[i]
    const g = u8[i + 1]
    const b = u8[i + 2]
    lum.push((r + g + b) / 3)
  }
  const avg = lum.reduce((a, l) => a + l, 0) / W
  const v = lum.reduce((s, l) => s + (l - avg) ** 2, 0) / W
  const sd = Math.sqrt(v)
  return avg >= 246 && sd <= 18
}

async function main() {
  if (!fs.existsSync(target)) {
    console.error('Missing:', target)
    process.exit(1)
  }

  if (!fs.existsSync(backup)) {
    fs.copyFileSync(target, backup)
    console.log('Backup:', backup)
  }

  let buf = await fs.promises.readFile(target)
  const m0 = await sharp(buf).metadata()
  console.log('Before:', m0.width, 'x', m0.height)

  let metaByTrim = null
  for (const threshold of [6, 12, 20, 32]) {
    const attempt = await sharp(buf).trim({ threshold }).png({ compressionLevel: 9 }).toBuffer()
    const mm = await sharp(attempt).metadata()
    if (mm.width * mm.height < m0.width * m0.height) {
      buf = attempt
      metaByTrim = mm
      console.log('Sharp.trim threshold', threshold, '→', mm.width, 'x', mm.height)
      break
    }
  }

  const meta = await sharp(buf).metadata()
  const W = meta.width
  const H = meta.height

  const rawBuf = await sharp(buf).ensureAlpha().raw().toBuffer()
  const u8 = new Uint8Array(rawBuf.buffer, rawBuf.byteOffset, rawBuf.byteLength)
  const c = 4

  let top = 0
  while (top < H && rowIsLetterbox(u8, W, c, top)) top++

  let bottom = H - 1
  while (bottom > top && rowIsLetterbox(u8, W, c, bottom)) bottom--

  const newW = W
  const newH = bottom - top + 1

  console.log('Horizontal heuristic:', {
    top,
    bottomInclusive: bottom,
    newHeight: newH,
  })

  const dimsMatchTrimOnly =
    metaByTrim &&
    metaByTrim.width === newW &&
    metaByTrim.height === newH

  let outBuf = buf

  if (newH > 0 && (top > 0 || bottom < H - 1)) {
    outBuf = await sharp(buf)
      .extract({ left: 0, top, width: newW, height: newH })
      .png({ compressionLevel: 9 })
      .toBuffer()
  } else if (!dimsMatchTrimOnly && metaByTrim) {
    outBuf = buf
  }

  const prev = await fs.promises.readFile(target)
  if (Buffer.compare(prev, outBuf) === 0) {
    console.log('No pixel-level trim applied — image already fills frame (no uniform white bands).')
    process.exit(0)
  }

  const tmp = target + '.tmp.png'
  await fs.promises.writeFile(tmp, outBuf)
  fs.renameSync(tmp, target)

  const after = await sharp(await fs.promises.readFile(target)).metadata()
  console.log('After:', after.width, 'x', after.height)
  console.log('Written:', target)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
