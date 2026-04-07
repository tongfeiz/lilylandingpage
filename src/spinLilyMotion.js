/**
 * Demo lily video — fixed playback rate, starts after demo reveal.
 *
 * | Export | Purpose |
 * |--------|---------|
 * | `LILY_VIDEO_PLAYBACK_RATE` | `video.playbackRate` (try **0.8**). |
 *
 * **Important:** Do not animate **`opacity: 0` on an ancestor of `<video>`** — many browsers never
 * decode/play the file. Use **`.demo-halftone-lily-curtain`** (fade overlay) instead; see `index.css`.
 */

import { useEffect } from 'react'

export const LILY_VIDEO_PLAYBACK_RATE = 0.8

function attemptPlay(video) {
  if (!video) return
  video.muted = true
  video.defaultMuted = true
  video.setAttribute('muted', '')
  video.playbackRate = LILY_VIDEO_PLAYBACK_RATE
  const p = video.play()
  if (p !== undefined && typeof p.then === 'function') {
    p.catch(() => {})
  }
}

export function useLilySpinVideo(videoRef, isDemoRevealed) {
  useEffect(() => {
    if (!isDemoRevealed) return undefined

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const videoEl = videoRef.current
    if (!videoEl) return undefined

    if (mq.matches) {
      videoEl.pause()
      return undefined
    }

    const root = videoEl.parentElement
    let video = videoEl
    let cancelled = false

    const kick = () => {
      if (cancelled) return
      video = videoRef.current
      attemptPlay(video)
    }

    const onVisibility = () => {
      if (document.visibilityState === 'visible') kick()
    }

    videoEl.addEventListener('loadeddata', kick)
    videoEl.addEventListener('canplay', kick)
    videoEl.addEventListener('playing', kick)
    document.addEventListener('visibilitychange', onVisibility)

    let io
    if (root && typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) kick()
        },
        { root: null, threshold: 0.01, rootMargin: '0px' }
      )
      io.observe(root)
    }

    kick()
    requestAnimationFrame(kick)
    const t = window.setTimeout(kick, 120)

    return () => {
      cancelled = true
      window.clearTimeout(t)
      document.removeEventListener('visibilitychange', onVisibility)
      videoEl.removeEventListener('loadeddata', kick)
      videoEl.removeEventListener('canplay', kick)
      videoEl.removeEventListener('playing', kick)
      io?.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- ref handle
  }, [isDemoRevealed])
}
