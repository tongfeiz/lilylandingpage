import { useEffect, useRef, useState } from 'react'
import lilyMark from '../assets/lilyjustlogo.png'
import lilySpinning from '../assets/spinning.mp4'
import ScrollReveal from './ScrollReveal'

const WALKTHROUGH_STAGES = [
  { name: 'upload', duration: 600 },
  { name: 'dashboard', duration: 1700 },
  { name: 'voice', duration: 1800 },
  { name: 'structured', duration: 1100 },
  { name: 'reports', duration: 1100 },
  { name: 'student-progress', duration: 1100 },
  { name: 'goals', duration: 1100 },
]

const VOICE_TRANSCRIPT =
  '"Today, Jayden identified 4 out of 5 emotions correctly in a social story."'

function formatVoiceTimer(ms) {
  const totalCentiseconds = Math.floor(ms / 10)
  const centiseconds = totalCentiseconds % 100
  const totalSeconds = Math.floor(totalCentiseconds / 100)
  const seconds = totalSeconds % 60
  const minutes = Math.floor(totalSeconds / 60)

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`
}

function easeOutCubic(value) {
  return 1 - (1 - value) ** 3
}

function BrowserShowcase() {
  const spinVideoRef = useRef(null)
  const [demoRevealed, setDemoRevealed] = useState(false)
  const [lilyRevealed, setLilyRevealed] = useState(false)

  useEffect(() => {
    // Double-rAF guarantees one painted frame before we start transitions.
    let raf1 = 0
    let raf2 = 0
    raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        setDemoRevealed(true)
        setLilyRevealed(true)
      })
    })
    return () => {
      window.cancelAnimationFrame(raf1)
      window.cancelAnimationFrame(raf2)
    }
  }, [])

  useEffect(() => {
    if (!demoRevealed) return undefined

    const video = spinVideoRef.current
    if (!video) return undefined

    const forcePlay = () => {
      video.muted = true
      video.defaultMuted = true
      video.playbackRate = 0.8
      video.play().catch(() => {})
    }

    forcePlay()
    const retry = window.setInterval(forcePlay, 350)
    const stopRetry = window.setTimeout(() => window.clearInterval(retry), 4500)

    return () => {
      window.clearInterval(retry)
      window.clearTimeout(stopRetry)
    }
  }, [demoRevealed])

  const [activeIndex, setActiveIndex] = useState(0)
  const [stageProgress, setStageProgress] = useState(0)
  const [voiceElapsedMs, setVoiceElapsedMs] = useState(0)
  const [typedChars, setTypedChars] = useState(0)

  useEffect(() => {
    const { duration } = WALKTHROUGH_STAGES[activeIndex]
    const start = Date.now()

    setStageProgress(0)

    const progressTimer = window.setInterval(() => {
      const elapsed = Date.now() - start
      setStageProgress(Math.min(elapsed / duration, 1))
    }, 40)

    const stageTimer = window.setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % WALKTHROUGH_STAGES.length)
    }, duration)

    return () => {
      window.clearInterval(progressTimer)
      window.clearTimeout(stageTimer)
    }
  }, [activeIndex])

  const stage = WALKTHROUGH_STAGES[activeIndex].name
  const uploadProgress = stage === 'upload' ? Math.round(stageProgress * 100) : 100
  const dashboardOverviewWidth = stage === 'dashboard'
    ? easeOutCubic(Math.min(stageProgress / 0.3, 1)) * 60
    : 60
  const voicePressed = stage === 'dashboard' && stageProgress > 0.78
  const flowStageOrder = ['structured', 'reports', 'student-progress', 'goals']
  const flowStageIndex = flowStageOrder.indexOf(stage)
  const showFlowStack = flowStageIndex >= 0
  const useFlowMask = flowStageIndex >= 1

  useEffect(() => {
    if (stage !== 'voice') return undefined

    setVoiceElapsedMs(0)
    setTypedChars(0)

    const timer = window.setInterval(() => {
      setVoiceElapsedMs((prev) => prev + 80)
      setTypedChars((prev) => Math.min(prev + 2, VOICE_TRANSCRIPT.length))
    }, 80)

    return () => window.clearInterval(timer)
  }, [stage])

  const typedTranscript = VOICE_TRANSCRIPT.slice(0, typedChars)

  return (
    <section className="showcase-shell" id="demo">
      <div
        className={`showcase-browser-stack${demoRevealed ? ' is-demo-revealed' : ''}${lilyRevealed ? ' is-lily-revealed' : ''}`}
      >
        <div className="demo-halftone-lily-shell" aria-hidden>
          <div className="demo-halftone-lily">
            <div className="demo-halftone-lily-blend">
              <video
                ref={spinVideoRef}
                src={lilySpinning}
                width={320}
                height={320}
                muted
                playsInline
                loop
                preload="auto"
                autoPlay
              />
            </div>
            <div className="demo-halftone-lily-curtain" />
          </div>
        </div>
        <ScrollReveal onReveal={() => setDemoRevealed(true)}>
          <div className="browser browser-demo">
          <div className="browser-topbar">
            <div className="browser-dots">
              <span />
              <span />
              <span />
            </div>
            <div className="browser-title">
              <img src={lilyMark} alt="" aria-hidden="true" />
              <span>Lily Progress Workspace</span>
            </div>
            <div className="browser-zoom"> </div>
          </div>

          <div className={`lily-walkthrough stage-${stage}`}>
            <div className="lily-main">
              <header className="lily-main-header">
                <div className="lily-greeting">
                  <span className="lily-avatar" />
                  <p>Good evening, Ms. Brown</p>
                </div>
                <button type="button" className="lily-reminders">
                  Reminders
                </button>
              </header>

              <div className={`lily-stage-stack ${useFlowMask ? 'has-flow-mask' : ''}`}>
                <section className={`lily-stage lily-upload ${stage === 'upload' ? 'is-visible' : ''}`}>
                  <div className="dropzone">
                    <p>Click to select a PDF</p>
                    <p className="muted">Oscar_IEP_2025.pdf</p>
                    <div className="parse-line">
                      <span style={{ width: `${uploadProgress}%` }} />
                    </div>
                  </div>
                </section>

                <section className={`lily-stage lily-dashboard ${stage === 'dashboard' ? 'is-visible' : ''}`}>
                <div className="dash-row dashboard-enter">
                  <article className="dash-card">
                    <p>Log Progress</p>
                    <div className="quick-actions">
                      <button type="button" className={voicePressed ? 'is-pressed' : ''}>Voice</button>
                      <button type="button">Manual</button>
                    </div>
                  </article>
                  <article className="dash-card">
                    <p>View Recent Logs</p>
                    <ul>
                      <li>Tongfei Zhu - 04/13/2025</li>
                      <li>Harry Ahn - 04/22/2025</li>
                      <li>Pranav Lingareddy - 04/25/2025</li>
                    </ul>
                  </article>
                </div>
                <article className="dash-card wide dashboard-enter dashboard-enter-delay">
                  <p>Weekly Objectives Overview</p>
                  <h3>60%</h3>
                  <div className="bar"><span style={{ width: `${dashboardOverviewWidth}%` }} /></div>
                </article>
              </section>

              <section className={`lily-stage lily-voice ${stage === 'voice' ? 'is-visible' : ''}`}>
                <article className="dash-card wide centered">
                  <p>Log Progress</p>
                  <div className="audio-waveform" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <p className="voice-text">{formatVoiceTimer(voiceElapsedMs)}</p>
                  <p className="muted voice-transcript">
                    {typedTranscript}
                    <span className="typing-caret" aria-hidden="true">|</span>
                  </p>
                </article>
              </section>

              <section className={`lily-stage lily-flow-stack flow-${stage} ${showFlowStack ? 'is-visible' : ''}`}>
                <div className={`flow-stack flow-step-${Math.max(flowStageIndex, 0)}`}>
                  <div className={`flow-card ${flowStageIndex >= 0 ? 'is-visible' : ''} ${flowStageIndex === 0 ? 'is-new' : ''}`}>
                    <article className="dash-card wide form flow-card-inner">
                      <p>Session 1 of 1</p>
                      <div className="field">
                        <label>Transcript</label>
                        <div className="value">"Today, Jayden identified 4 out of 5 emotions correctly in a social story."</div>
                      </div>
                      <div className="field two-col">
                        <div className="value">Student: Jayden White</div>
                        <div className="value">Objective: Reading comprehension</div>
                      </div>
                    </article>
                  </div>

                  <div className={`flow-card ${flowStageIndex >= 1 ? 'is-visible' : ''} ${flowStageIndex === 1 ? 'is-new' : ''}`}>
                    <article className="dash-card wide table flow-card-inner">
                      <p>Students</p>
                      <div className="row header">
                        <span>Student Name</span>
                        <span>Date of Review</span>
                        <span />
                      </div>
                      <div className="row"><span>Jethro Zhao</span><span>02/06/2025</span><button type="button">View details</button></div>
                      <div className="row"><span>Henry Yin</span><span>02/16/2025</span><button type="button">View details</button></div>
                      <div className="row"><span>Pranav Lingereddy</span><span>03/04/2025</span><button type="button">View details</button></div>
                    </article>
                  </div>

                  <div className={`flow-card ${flowStageIndex >= 2 ? 'is-visible' : ''} ${flowStageIndex === 2 ? 'is-new' : ''}`}>
                    <article className="dash-card wide student-progress-card flow-card-inner">
                      <p className="student-progress-back">← back</p>
                      <p className="student-progress-title">
                        Given a structured activity, Alex will complete sentences using
                        appropriate grammar, with 80% accuracy, independently, across
                        4 out of 5 data collections.
                      </p>
                      <div className="student-progress-meter">
                        <span>Total Progress:</span>
                        <div className="progress-dots" aria-hidden="true">
                          <i className="is-red" />
                          <i className="is-red" />
                          <i className="is-green" />
                          <i className="is-green" />
                          <i className="is-green" />
                        </div>
                        <strong>70%</strong>
                      </div>
                      <p className="student-progress-subhead">New goals:</p>
                      <div className="student-progress-table">
                        <div className="student-progress-table-head">
                          <span>Date</span>
                          <span>Score</span>
                          <span>Notes</span>
                        </div>
                        <div className="student-progress-table-row">
                          <span>02/01/2025</span>
                          <span>3/10</span>
                          <span>Struggled about halfway through</span>
                        </div>
                        <div className="student-progress-table-row">
                          <span>02/08/2025</span>
                          <span>4/10</span>
                          <span>Difficult to pronounce the "th" in "fifteen"</span>
                        </div>
                        <div className="student-progress-table-row">
                          <span>02/15/2025</span>
                          <span>8/10</span>
                          <span>Improved fluency across responses</span>
                        </div>
                        <div className="student-progress-table-row">
                          <span>02/22/2025</span>
                          <span>10/10</span>
                          <span>Consistent independent completion</span>
                        </div>
                      </div>
                    </article>
                  </div>

                  <div className={`flow-card ${flowStageIndex >= 3 ? 'is-visible' : ''} ${flowStageIndex === 3 ? 'is-new' : ''}`}>
                    <article className="dash-card wide goals flow-card-inner">
                      <p>Goals & Objectives</p>
                      <div className="chips">
                        <span>Math</span>
                        <span className="is-active">Speech</span>
                        <span>Reading</span>
                      </div>
                      <div className="suggestion">Given faded cues, Jayden will answer corresponding "WH" questions independently with 80% accuracy.</div>
                      <div className="suggestion">Given structured activity, Jayden will complete sentences with appropriate grammar at 80% accuracy.</div>
                    </article>
                  </div>
                </div>
              </section>
            </div>
          </div>

        </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default BrowserShowcase
