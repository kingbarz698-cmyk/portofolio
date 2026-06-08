import { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'

// ── Context ──────────────────────────────────────────────
const MouseTrackerContext = createContext(undefined)

export const useMouseTracker = () => {
  const ctx = useContext(MouseTrackerContext)
  if (!ctx) throw new Error('useMouseTracker must be used within MouseTrackerProvider')
  return ctx
}

// ── Provider ─────────────────────────────────────────────
export function MouseTrackerProvider({ children, ...rest }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [active, setActive]     = useState(false)
  const wrapperRef = useRef(null)
  const pointerRef = useRef(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const container = wrapper.parentElement
    if (!container) return

    if (getComputedStyle(container).position === 'static') {
      container.style.position = 'relative'
    }

    const updatePosition = (e) => {
      const bounds = container.getBoundingClientRect()
      setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top })
      setActive(true)
    }
    const clearPosition = () => setActive(false)

    container.addEventListener('mousemove', updatePosition)
    container.addEventListener('mouseleave', clearPosition)
    return () => {
      container.removeEventListener('mousemove', updatePosition)
      container.removeEventListener('mouseleave', clearPosition)
    }
  }, [])

  return (
    <MouseTrackerContext.Provider value={{ position, active, wrapperRef, pointerRef }}>
      <div ref={wrapperRef} data-role="tracker-wrapper" {...rest}>
        {children}
      </div>
    </MouseTrackerContext.Provider>
  )
}

// ── Pointer (custom cursor) ───────────────────────────────
export function Pointer({ className, style, children, ...rest }) {
  const { position, active, wrapperRef, pointerRef } = useMouseTracker()
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useEffect(() => {
    const container = wrapperRef.current?.parentElement
    if (container && active) container.style.cursor = 'none'
    return () => { if (container) container.style.cursor = 'default' }
  }, [active, wrapperRef])

  useEffect(() => {
    x.set(position.x)
    y.set(position.y)
  }, [position, x, y])

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          ref={pointerRef}
          data-role="custom-pointer"
          className={`pointer-events-none z-[9999] absolute -translate-x-1/2 -translate-y-1/2 ${className ?? ''}`}
          style={{ top: y, left: x, ...style }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          {...rest}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── PointerFollower (label ikut cursor) ───────────────────
export function PointerFollower({
  align = 'bottom-right',
  gap = 20,
  children,
  className,
  style,
  ...rest
}) {
  const { position, active, pointerRef } = useMouseTracker()
  const followerRef = useRef(null)

  const getOffset = useCallback(() => {
    const box = followerRef.current?.getBoundingClientRect()
    const w = box?.width ?? 0
    const h = box?.height ?? 0
    switch (align) {
      case 'center':      return { x: w / 2, y: h / 2 }
      case 'top':         return { x: w / 2, y: h + gap }
      case 'top-left':    return { x: w + gap, y: h + gap }
      case 'top-right':   return { x: -gap, y: h + gap }
      case 'bottom':      return { x: w / 2, y: -gap }
      case 'bottom-left': return { x: w + gap, y: -gap }
      case 'bottom-right':return { x: -gap, y: -gap }
      case 'left':        return { x: w + gap, y: h / 2 }
      case 'right':       return { x: -gap, y: h / 2 }
      default:            return { x: 0, y: 0 }
    }
  }, [align, gap])

  const offset   = getOffset()
  const pointerBox = pointerRef.current?.getBoundingClientRect()
  const pw = pointerBox?.width ?? 20
  const ph = pointerBox?.height ?? 20
  const x = position.x - offset.x + pw / 2
  const y = position.y - offset.y + ph / 2

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          ref={followerRef}
          data-role="pointer-follower"
          className={`pointer-events-none z-[9998] absolute -translate-x-1/2 -translate-y-1/2 font-medium ${className ?? ''}`}
          style={{ top: y, left: x, ...style }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 50, bounce: 0 }}
          {...rest}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
