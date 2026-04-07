function HeroSection() {
  return (
    <section className="hero-section reveal-up" id="top">
      <div className="hero-title-group">
        <h1 className="hero-title hero-title-primary">Lily supports IEP progress</h1>
        <p className="hero-title hero-title-muted">
          so special educators stop spending
        </p>
        <p className="hero-title hero-title-muted">
          hours tracking and reporting by hand
        </p>
      </div>

      <p className="hero-copy hero-step hero-step-copy">
        Special educators are still forced to manage IEP progress across
        disconnected tools. Lily turns that fragmented process into one connected
        workflow.
      </p>

      <div className="hero-cta-row hero-step hero-step-cta">
        <button type="button" className="hero-btn hero-btn-primary">
          <span>Join</span>
          <span>Lily</span>
        </button>
        <button type="button" className="hero-btn hero-btn-ghost">
          see Lily workflow →
        </button>
      </div>

      <div className="hero-stats hero-step hero-step-stats">
        <p className="hero-stat">85% time reduction in tracking tasks</p>
        <p className="hero-stat">IDEA and FAPE compliant.</p>
        <p className="hero-stat">Zero legal guesswork.</p>
      </div>
    </section>
  )
}

export default HeroSection
