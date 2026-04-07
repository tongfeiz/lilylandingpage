const STEPS = [
  {
    step: '01',
    title: 'Upload IEP PDF',
    copy: 'Auto-parsed profile',
    preview: 'upload',
  },
  {
    step: '02',
    title: 'Voice log progress',
    copy: 'Structured, timestamped data',
    preview: 'voice',
  },
  {
    step: '03',
    title: 'Click Export',
    copy: 'Ready-to-go reports',
    preview: 'export',
  },
]

const VOICE_WAVE_HEIGHTS = [8, 18, 28, 20, 32, 14, 24, 10, 20, 26, 12, 22]

function FrameStepPreview({ variant }) {
  if (variant === 'upload') {
    return (
      <div className="f2p f2p-upload">
        <div className="f2p-upload-block">
          <span className="f2p-upload-kicker">Source document</span>
          <div className="f2p-upload-grid">
            <div className="f2p-upload-doc">
              <span className="f2p-doc-label">IEP</span>
              <p className="f2p-doc-filename">Martinez_IEP_2025.pdf</p>
              <div className="f2p-doc-lines">
                <span className="f2p-line f2p-line-strong" />
                <span className="f2p-line" />
                <span className="f2p-line" />
                <span className="f2p-line f2p-line-med" />
                <span className="f2p-line f2p-line-short" />
              </div>
            </div>
            <div className="f2p-upload-aside">
              <span className="f2p-chip f2p-chip-live">Auto-extract</span>
              <ul className="f2p-field-list">
                <li><span className="f2p-field-k">Student</span><span className="f2p-field-v">●●●</span></li>
                <li><span className="f2p-field-k">Goals</span><span className="f2p-field-v">12 mapped</span></li>
                <li><span className="f2p-field-k">Services</span><span className="f2p-field-v">Speech, OT</span></li>
                <li><span className="f2p-field-k">Accommodations</span><span className="f2p-field-v">4 listed</span></li>
              </ul>
              <div className="f2p-parse-meter" aria-hidden>
                <span className="f2p-parse-meter-label">Sections</span>
                <div className="f2p-parse-meter-track">
                  <span className="f2p-parse-meter-fill" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'voice') {
    return (
      <div className="f2p f2p-voice">
        <div className="f2p-voice-block">
          <span className="f2p-voice-kicker">Voice capture</span>
          <div className="f2p-voice-meter">
            <span className="f2p-rec" />
            <div className="f2p-wave-wrap">
              {VOICE_WAVE_HEIGHTS.map((h, i) => (
                <span key={i} className="f2p-wave-bar" style={{ height: `${h}px` }} />
              ))}
            </div>
            <span className="f2p-timestamp">00:14.20</span>
          </div>
          <div className="f2p-voice-structured">
            <span className="f2p-chip f2p-chip-muted">Structured entry</span>
            <p className="f2p-snippet">“Identified 4/5 emotions in social story…”</p>
            <div className="f2p-voice-meta">
              <span className="f2p-voice-meta-tag">Jayden P.</span>
              <span className="f2p-voice-meta-tag">Session 04</span>
              <span className="f2p-voice-meta-tag">Today 2:40 PM</span>
            </div>
            <div className="f2p-voice-skeleton">
              <span className="f2p-line f2p-line-strong" />
              <span className="f2p-line" />
              <span className="f2p-line f2p-line-short" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="f2p f2p-export">
      <div className="f2p-reports-block">
        <span className="f2p-reports-kicker">Your reports</span>
        <div className="f2p-report-stack">
          <div className="f2p-report-sheet f2p-report-sheet-a" aria-hidden>
            <span className="f2p-report-sheet-eyebrow">IEP snapshot</span>
            <span className="f2p-line f2p-line-strong" />
            <span className="f2p-line" />
            <span className="f2p-line f2p-line-short" />
          </div>
          <div className="f2p-report-sheet f2p-report-sheet-b" aria-hidden>
            <span className="f2p-report-sheet-eyebrow">Progress narrative</span>
            <span className="f2p-line f2p-line-strong" />
            <span className="f2p-line" />
            <span className="f2p-line" />
            <span className="f2p-line f2p-line-short" />
          </div>
        </div>
      </div>
      <div className="f2p-export-footer">
        <span className="f2p-format f2p-format-soft">PDF · Doc export</span>
        <div className="f2p-export-actions">
          <ul className="f2p-export-checklist">
            <li>
              <span className="f2p-check" aria-hidden />
              District-ready
            </li>
            <li>
              <span className="f2p-check" aria-hidden />
              Fully compliant
            </li>
          </ul>
          <span className="f2p-export-btn">Export</span>
        </div>
      </div>
    </div>
  )
}

function FrameTwoSection() {
  return (
    <section className="frame2" id="solution">
      <div className="frame2-inner">
        <header className="frame2-intro">
          <h2 className="frame2-intro-title">
            How Lily works
          </h2>
          <p className="frame2-intro-copy">
            Three simple steps. Minimal clicks. Completely compliance-ready.
          </p>
        </header>

        <div className="frame2-steps">
          {STEPS.map((feature) => (
          <article key={feature.title} className="frame2-feature">
            <p className="frame2-feature-eyebrow">Step {feature.step}</p>
            <div className="frame2-step-preview" aria-hidden="true">
              <FrameStepPreview variant={feature.preview} />
            </div>
            <h3 className="frame2-feature-title">{feature.title}</h3>
            <p className="frame2-feature-copy">{feature.copy}</p>
          </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FrameTwoSection
