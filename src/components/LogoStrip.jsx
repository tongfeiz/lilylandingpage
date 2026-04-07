const OUTCOMES = [
  {
    metric: '7M+',
    label: 'students in the U.S. with active IEPs',
  },
  {
    metric: '85%',
    label: 'less time spent on manual progress tracking',
  },
  {
    metric: '2x',
    label: 'burnout rate in special education',
  },
  
]

function LogoStrip() {
  return (
    <section className="logo-strip-shell" id="impact">
      <div className="logo-strip-inner">
        <h2 className="logo-strip-title">Why it matters</h2>

        <div className="logo-strip-panel">
          <div className="logo-row">
            {OUTCOMES.map((item) => (
              <div key={item.label} className="logo-slot">
                <p className="logo-metric">{item.metric}</p>
                <p className="logo-caption">{item.label}</p>
              </div>
            ))}
          </div>

          <a href="#solution" className="logo-strip-cta">
            Read more
          </a>

          <div className="logo-diagonal logo-diagonal-left" aria-hidden="true" />
          <div className="logo-diagonal logo-diagonal-right" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

export default LogoStrip
