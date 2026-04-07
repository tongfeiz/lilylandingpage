import lilyLogo from '../assets/lilylogo.png'
import lilyMark from '../assets/lilyjustlogo.png'

function StickyHeader() {
  return (
    <header className="sticky-header">
      <div className="sticky-header-inner">
        <a className="sticky-brand" href="#top" aria-label="Lily home">
          <img src={lilyLogo} alt="Lily" className="sticky-brand-full" />
          <img src={lilyMark} alt="" aria-hidden="true" className="sticky-brand-mark" />
        </a>

        <nav className="sticky-nav" aria-label="Primary">
          <a href="#contact">Contact</a>
          <a href="#faq">FAQ</a>
          <a href="#about">About</a>
        </nav>

        <button type="button" className="sticky-cta">
          Join Lily
        </button>
      </div>
    </header>
  )
}

export default StickyHeader
