import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Efek ripple/lingkaran saat tap di mobile
export function TouchRipple() {
  const [ripples, setRipples] = useState([])

  const addRipple = useCallback((x, y) => {
    const id = Date.now() + Math.random()
    setRipples(prev => [...prev, { id, x, y }])
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id))
    }, 700)
  }, [])

  useEffect(() => {
    // Hanya aktif di touch device
    const isTouchDevice = () => window.matchMedia('(hover: none)').matches

    const onTouch = (e) => {
      if (!isTouchDevice()) return
      const touch = e.touches[0]
      if (touch) addRipple(touch.clientX, touch.clientY)
    }

    window.addEventListener('touchstart', onTouch, { passive: true })
    return () => window.removeEventListener('touchstart', onTouch)
  }, [addRipple])

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {ripples.map(r => (
          <motion.div
            key={r.id}
            className="absolute rounded-full"
            style={{
              left: r.x,
              top: r.y,
              x: '-50%',
              y: '-50%',
              background: 'radial-gradient(circle, rgba(91,127,255,0.35) 0%, rgba(91,127,255,0) 70%)',
              border: '1px solid rgba(91,127,255,0.4)',
            }}
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{ width: 120, height: 120, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default TouchRipple
