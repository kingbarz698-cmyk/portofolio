import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

const links = [
  { href: '#hero',     label: 'Home' },
  { href: '#about',    label: 'About' },
  { href: '#skills',   label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact',  label: 'Contact' },
]

export function Navbar() {
  const [active, setActive]       = useState('hero')
  const [scrolled, setScrolled]   = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [pill, setPill]           = useState({ left: 0, top: 0, width: 0, height: 0 })
  const [ready, setReady]         = useState(false)
  const navRef   = useRef(null)
  const linkRefs = useRef({})
  const rafRef   = useRef(null)

  const updatePill = useCallback((id) => {
    const el  = linkRefs.current[id]
    const nav = navRef.current
    if (!el || !nav) return
    const er = el.getBoundingClientRect()
    const nr = nav.getBoundingClientRect()
    setPill({ left: er.left - nr.left, top: er.top - nr.top, width: er.width, height: er.height })
  }, [])

  // Scroll tracker — throttled via rAF
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        setScrolled(window.scrollY > 30)
        const ids = links.map(l => l.href.slice(1))
        let current = ids[0]
        for (const id of ids) {
          const el = document.getElementById(id)
          if (el && window.scrollY >= el.offsetTop - 150) current = id
        }
        setActive(current)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Update pill saat active berubah
  useEffect(() => {
    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(() => {
        updatePill(active)
        setReady(true)
      })
      return () => cancelAnimationFrame(r2)
    })
    return () => cancelAnimationFrame(r1)
  }, [active, updatePill])

  useEffect(() => {
    const onResize = () => updatePill(active)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [active, updatePill])

  useEffect(() => {
    const onOpen  = () => setModalOpen(true)
    const onClose = () => setModalOpen(false)
    window.addEventListener('modal:open',  onOpen)
    window.addEventListener('modal:close', onClose)
    return () => {
      window.removeEventListener('modal:open',  onOpen)
      window.removeEventListener('modal:close', onClose)
    }
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed left-1/2 z-50 flex items-center rounded-full"
      style={{
        top: '12px',
        padding: '6px 6px',
        transform: modalOpen
          ? 'translateX(-50%) translateY(-12px)'
          : 'translateX(-50%) translateY(0)',
        background: 'rgba(15,15,20,0.75)',
        border: '1px solid rgba(255,255,255,0.15)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        boxShadow: scrolled
          ? '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)'
          : '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        // FIX: pakai width fixed agar tidak terpotong
        width: 'max-content',
        maxWidth: 'calc(100vw - 16px)',
        opacity: modalOpen ? 0 : 1,
        pointerEvents: modalOpen ? 'none' : 'auto',
        transition: 'box-shadow 0.3s ease, opacity 0.25s ease, transform 0.25s ease',
        willChange: 'transform',
      }}
    >
      {/* Sliding pill */}
      {ready && pill.width > 0 && (
        <motion.span
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none"
          style={{
            background: 'rgba(91,127,255,0.25)',
            border: '1px solid rgba(91,127,255,0.5)',
            boxShadow: '0 0 12px rgba(91,127,255,0.3)',
            willChange: 'transform',
          }}
          animate={{ left: pill.left, top: pill.top, width: pill.width, height: pill.height }}
          initial={false}
          // FIX: lebih smooth
          transition={{ type: 'spring', stiffness: 250, damping: 38, mass: 0.5 }}
        />
      )}

      {links.map(l => {
        const id = l.href.slice(1)
        return (
          <a
            key={id}
            href={l.href}
            ref={el => { if (el) linkRefs.current[id] = el }}
            onClick={() => setActive(id)}
            className="relative z-10 rounded-full font-syne font-semibold whitespace-nowrap select-none"
            style={{
              color: active === id ? '#ffffff' : 'rgba(255,255,255,0.45)',
              // FIX: ukuran lebih besar dan padding lebih lega
              fontSize: 'clamp(11px, 3.2vw, 13px)',
              padding: 'clamp(8px, 2vw, 10px) clamp(12px, 3.5vw, 18px)',
              letterSpacing: '0.02em',
              transition: 'color 0.2s ease',
              textDecoration: 'none',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {l.label}
          </a>
        )
      })}
    </nav>
  )
}

export default Navbar