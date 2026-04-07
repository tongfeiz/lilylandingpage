function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p className="site-footer-copy">© {year} Lily. All rights reserved.</p>
        <nav className="site-footer-nav" aria-label="Footer">
          <a href="#contact">Contact</a>
          <a href="#faq">FAQ</a>
          <a href="#about">About</a>
        </nav>
      </div>
    </footer>
  )
}

export default SiteFooter
