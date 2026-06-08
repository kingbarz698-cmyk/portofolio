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
  const navRef   = useRef(null)
  const linkRefs = useRef({})
  const rafRef   = useRef(null)

  const updatePill = useCallback((id) => {
    const el  = linkRefs.current[id]
    const nav = navRef.current
    if (!el || !nav) return
    const er = el.getBoundingClientRect()
    const nr = nav.getBoundingClientRect()
    setPill({
      left:   er.left - nr.left,
      top:    er.top  - nr.top,
      width:  er.width,
      height: er.height,
    })
  }, [])

  // Scroll tracker — throttled via rAF agar tidak lag
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

  useEffect(() => {
    let raf1 = requestAnimationFrame(() => {
      let raf2 = requestAnimationFrame(() => updatePill(active))
      return () => cancelAnimationFrame(raf2)
    })
    return () => cancelAnimationFrame(raf1)
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
      className="fixed top-3 left-1/2 z-50 flex items-center p-1.5 rounded-full"
      style={{
        transform: modalOpen
          ? 'translateX(-50%) translateY(-12px)'
          : 'translateX(-50%) translateY(0)',
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.2)',
        backdropFilter: 'blur(40px) saturate(200%)',
        WebkitBackdropFilter: 'blur(40px) saturate(200%)',
        boxShadow: scrolled
          ? '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.25)'
          : '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)',
        maxWidth: 'calc(100vw - 24px)',
        opacity: modalOpen ? 0 : 1,
        pointerEvents: modalOpen ? 'none' : 'auto',
        transition: 'box-shadow 0.3s, opacity 0.25s ease, transform 0.25s ease',
      }}
    >
      {/* Sliding pill */}
      {pill.width > 0 && (
        <motion.span
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none"
          style={{
            background: 'rgba(91,127,255,0.28)',
            border: '1px solid rgba(91,127,255,0.55)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 0 16px rgba(91,127,255,0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
            willChange: 'transform',
          }}
          animate={{
            left:   pill.left,
            top:    pill.top,
            width:  pill.width,
            height: pill.height,
          }}
          initial={false}
          // Lebih smooth: stiffness lebih rendah, damping lebih tinggi
          transition={{ type: 'spring', stiffness: 280, damping: 40, mass: 0.6 }}
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
            className="relative z-10 rounded-full font-syne font-semibold whitespace-nowrap"
            style={{
              color: active === id ? '#fff' : 'rgba(255,255,255,0.5)',
              // FIX: ukuran font lebih besar di mobile
              padding: 'clamp(7px,1.8vw,9px) clamp(11px,3vw,17px)',
              fontSize: 'clamp(12px,2.8vw,13px)',
              letterSpacing: '0.02em',
              transition: 'color 0.2s',
              textDecoration: 'none',
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