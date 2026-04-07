import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ffmpeg from 'ffmpeg-static'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const assets = path.join(__dirname, '..', 'src', 'assets')
const outputGif = path.join(assets, 'spinning.gif')
const outputMp4 = path.join(assets, 'spinning.mp4')
const master = path.join(assets, 'spinning.full.gif')

if (!ffmpeg) {
  console.error('ffmpeg-static binary missing')
  process.exit(1)
}

const vfGif =
  'fps=12,scale=360:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=48:stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3:diff_mode=rectangle'

/** Match src/spinLilyMotion.js comment if you change fps/scale here. */
const vfMp4 = 'fps=12,scale=360:-1:flags=lanczos'

if (!fs.existsSync(outputGif) && !fs.existsSync(master)) {
  console.error('Missing src/assets/spinning.gif or spinning.full.gif')
  process.exit(1)
}

if (fs.existsSync(master)) {
  execFileSync(
    ffmpeg,
    ['-hide_banner', '-y', '-i', master, '-vf', vfGif, '-loop', '0', outputGif],
    { stdio: 'inherit' }
  )
} else if (fs.existsSync(outputGif)) {
  const bytes = fs.statSync(outputGif).size
  if (bytes > 5 * 1024 * 1024) {
    fs.renameSync(outputGif, master)
    console.warn('Renamed large original → spinning.full.gif (local master copy)')
    execFileSync(
      ffmpeg,
      ['-hide_banner', '-y', '-i', master, '-vf', vfGif, '-loop', '0', outputGif],
      { stdio: 'inherit' }
    )
  } else {
    console.warn('spinning.gif already optimized; skipping GIF re-encode')
  }
}

const mp4Source = fs.existsSync(master) ? master : outputGif
execFileSync(
  ffmpeg,
  [
    '-hide_banner',
    '-y',
    '-i',
    mp4Source,
    '-an',
    '-vf',
    vfMp4,
    '-c:v',
    'libx264',
    '-preset',
    'fast',
    '-crf',
    '26',
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    outputMp4,
  ],
  { stdio: 'inherit' }
)

const gifBytes = fs.statSync(outputGif).size
const mp4Bytes = fs.statSync(outputMp4).size
console.log(
  `spinning.gif: ${(gifBytes / 1024).toFixed(0)} KB | spinning.mp4: ${(mp4Bytes / 1024).toFixed(0)} KB`
)
