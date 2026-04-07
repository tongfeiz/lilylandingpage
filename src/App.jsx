import StickyHeader from './components/StickyHeader'
import HeroSection from './components/HeroSection'
import BrowserShowcase from './components/BrowserShowcase'
import LogoStrip from './components/LogoStrip'
import FrameTwoSection from './components/FrameTwoSection'
import DistrictMapSection from './components/DistrictMapSection'
import EndCtaSection from './components/EndCtaSection'
import SiteFooter from './components/SiteFooter'
import ScrollReveal from './components/ScrollReveal'

function App() {
  return (
    <main className="page">
      <StickyHeader />
      <HeroSection />
      <BrowserShowcase />
      <ScrollReveal>
        <FrameTwoSection />
      </ScrollReveal>
      <ScrollReveal>
        <LogoStrip />
      </ScrollReveal>
      <ScrollReveal>
        <DistrictMapSection />
      </ScrollReveal>
      <ScrollReveal>
        <EndCtaSection />
      </ScrollReveal>
      <SiteFooter />
    </main>
  )
  
}

export default App
