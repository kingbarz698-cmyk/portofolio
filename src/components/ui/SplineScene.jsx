import { Suspense, lazy, useState, useEffect, useRef } from 'react'

const SplineLoader = lazy(() => import('@splinetool/react-spline'))

const Spinner = ({ size = 40 }) => (
  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{
      width: size, height: size, borderRadius: '50%',
      border: '2px solid rgba(91,127,255,0.2)',
      borderTopColor: 'var(--accent)',
      animation: 'spin 0.8s linear infinite',
    }} />
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
)

export function SplineScene({ scene, className = '', rootMargin = '200px' }) {
  const ref = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [rootMargin])

  return (
    <div
      ref={ref}
      className={className}
      style={{ width: '100%', height: '100%', overflow: 'hidden', background: 'transparent' }}
    >
      {shouldLoad ? (
        <Suspense fallback={<Spinner size={40} />}>
          <SplineLoader
            scene={scene}
            style={{ width: '100%', height: '100%', background: 'transparent' }}
          />
        </Suspense>
      ) : (
        <Spinner size={40} />
      )}
    </div>
  )
}

export default SplineScene