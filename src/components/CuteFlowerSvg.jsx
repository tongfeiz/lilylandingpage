import { useEffect, useState } from 'react'

const PETAL_COUNT = 6
const PER_PETAL_STEP_MS = 58
const CX = 24
const CY = 24
const PETAL_CY = 10
const PETAL_R = 10.5
const CENTER_R = 10

/**
 * Vector flower inspired by flowercute.png: six rounded petals + warm center.
 * Petal tint is customizable; center defaults to soft yellow.
 * With bloom=true, petals appear in order 1→6 and the center last (grow-out effect).
 */
function CuteFlowerSvg({
  petalColor,
  centerColor = '#f6d46a',
  className,
  title,
  bloom = false,
  /** Delay before the first petal (e.g. match parent marker animation-delay). */
  bloomDelayMs = 0,
}) {
  const [visiblePetals, setVisiblePetals] = useState(0)
  const [showCenter, setShowCenter] = useState(!bloom)

  useEffect(() => {
    if (!bloom) {
      setVisiblePetals(PETAL_COUNT)
      setShowCenter(true)
    }
  }, [bloom])

  useEffect(() => {
    if (!bloom) return undefined

    setVisiblePetals(0)
    setShowCenter(false)

    const ids = []
    ids.push(
      window.setTimeout(() => {
        for (let i = 1; i <= PETAL_COUNT; i++) {
          ids.push(
            window.setTimeout(
              () => setVisiblePetals(i),
              (i - 1) * PER_PETAL_STEP_MS
            )
          )
        }
        ids.push(
          window.setTimeout(
            () => setShowCenter(true),
            (PETAL_COUNT - 1) * PER_PETAL_STEP_MS + 45
          )
        )
      }, bloomDelayMs)
    )

    return () => ids.forEach(clearTimeout)
  }, [bloom, bloomDelayMs])

  const petalCount = bloom ? visiblePetals : PETAL_COUNT

  const petals = Array.from({ length: petalCount }, (_, index) => (
    <g key={index} transform={`rotate(${index * 60} ${CX} ${CY})`}>
      <g className={bloom ? 'cute-flower-petal-grow' : undefined}>
        <circle
          cx={CX}
          cy={PETAL_CY}
          r={PETAL_R}
          fill={petalColor}
        />
      </g>
    </g>
  ))

  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      role="img"
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {petals}
      {showCenter ? (
        <circle
          className={bloom ? 'cute-flower-center-pop' : undefined}
          cx={CX}
          cy={CY}
          r={CENTER_R}
          fill={centerColor}
        />
      ) : null}
    </svg>
  )
}

export default CuteFlowerSvg
export { PETAL_COUNT }
