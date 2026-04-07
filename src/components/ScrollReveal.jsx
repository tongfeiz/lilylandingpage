import { useEffect, useRef, useState } from 'react'

function ScrollReveal({ children, onReveal }) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)
  const onRevealRef = useRef(onReveal)

  useEffect(() => {
    onRevealRef.current = onReveal
  }, [onReveal])

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          onRevealRef.current?.()
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`scroll-reveal-section ${isInView ? 'is-in-view' : ''}`}
    >
      {children}
    </div>
  )
}

export default ScrollReveal
