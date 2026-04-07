import { useEffect, useRef, useState } from 'react'
import CuteFlowerSvg from './CuteFlowerSvg'
import {
  US_CONTIGUOUS_PATH_D,
  US_DISTRICT_MARKER_PIXELS,
  US_MAP_VIEWBOX,
} from '../data/usContiguousPath'

/** Palette matched to reference map (pastels + accent tones). */
const DISTRICT_FLOWERS = [
  { id: 'bay-area', petalColor: '#9ec5f7', centerColor: '#f7e08a' },
  { id: 'los-angeles', petalColor: '#f2b8dc', centerColor: '#f7e08a' },
  { id: 'san-diego', petalColor: '#e8788a', centerColor: '#f7e08a' },
  { id: 'michigan', petalColor: '#9ec5f7', centerColor: '#f7e08a' },
  { id: 'philadelphia', petalColor: '#9b7fd6', centerColor: '#f7e08a' },
  { id: 'ny-ct', petalColor: '#f0a04f', centerColor: '#f7e08a' },
  { id: 'nj-de', petalColor: '#eb7d8f', centerColor: '#f7e08a' },
  { id: 'mid-atlantic-south', petalColor: '#5b8def', centerColor: '#f7e08a' },
]

const [VB_W, VB_H] = US_MAP_VIEWBOX.split(' ').slice(2).map(Number)

function DistrictMapSection() {
  const sectionRef = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`district-map-shell ${isInView ? 'is-in-view' : ''}`}
      id="districts"
    >
      <div className="district-map-panel">
        <p className="district-map-kicker">
          Currently representing 8 districts nationwide
        </p>

        <div className="district-map-canvas" aria-hidden="true">
          <svg
            viewBox={US_MAP_VIEWBOX}
            className="district-map-svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <path className="district-map-shape" d={US_CONTIGUOUS_PATH_D} />
            <path className="district-map-outline" d={US_CONTIGUOUS_PATH_D} />
          </svg>

          {DISTRICT_FLOWERS.map((flower, index) => {
            const { x, y } = US_DISTRICT_MARKER_PIXELS[index] ?? { x: 0, y: 0 }
            const leftPct = (x / VB_W) * 100
            const topPct = (y / VB_H) * 100
            return (
              <div
                key={flower.id}
                className="district-flower-marker"
                style={{
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                  animationDelay: `${180 + index * 120}ms`,
                }}
              >
                <CuteFlowerSvg
                  className="district-flower-svg"
                  petalColor={flower.petalColor}
                  centerColor={flower.centerColor}
                  bloom={isInView}
                  bloomDelayMs={180 + index * 120}
                />
              </div>
            )
          })}
        </div>

        <div className="district-pricing-card" aria-labelledby="district-pricing-heading">
          <div className="district-pricing-card-face">
            <p id="district-pricing-heading" className="district-pricing-intro">
              Our pricing is straightforward:
            </p>

            <div className="district-pricing-amount" aria-label="$30 per year">
              <span className="district-pricing-dollar">$30</span>
              <span className="district-pricing-suffix">/year</span>
            </div>

            <p className="district-pricing-sub">per IEP student per year</p>

            <ul className="district-pricing-list">
              <li>
                <span className="district-pricing-check" aria-hidden />
                Teachers
              </li>
              <li>
                <span className="district-pricing-check" aria-hidden />
                Schools
              </li>
              <li>
                <span className="district-pricing-check" aria-hidden />
                Districts
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DistrictMapSection
