import { useEffect } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function Modal({ project, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'

    /* Beritahu Navbar bahwa modal sedang terbuka */
    window.dispatchEvent(new Event('modal:open'))

    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''

      /* Beritahu Navbar bahwa modal sudah tertutup */
      window.dispatchEvent(new Event('modal:close'))
    }
  }, [onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)' }}
      >
        <motion.div
          className="relative w-full max-w-xl max-h-[88vh] overflow-y-auto rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}
          initial={{ scale: 0.94, y: 16 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.94, y: 16 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 pb-0">
            <h2 className="font-syne font-extrabold text-xl text-white pr-4">{project.title}</h2>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'var(--muted)',
              }}
            >
              <X size={15} />
            </button>
          </div>

          <div className="p-6 pt-4 space-y-4">
            {project.image && (
              <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full object-cover"
                  onError={(e) => e.target.parentElement.style.display = 'none'}
                />
              </div>
            )}

            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              {project.desc}
            </p>

            <div>
              <p className="text-[11px] font-bold font-syne tracking-widest uppercase mb-2" style={{ color: 'var(--accent)' }}>
                Teknologi
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map(t => (
                  <span
                    key={t}
                    className="text-[11px] font-bold font-syne px-2.5 py-1 rounded-full"
                    style={{
                      background: 'rgba(91,127,255,0.15)',
                      border: '1px solid rgba(91,127,255,0.3)',
                      color: 'var(--accent)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-bold font-syne tracking-widest uppercase mb-1.5" style={{ color: 'var(--accent)' }}>
                Tujuan Project
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                {project.goal}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-bold font-syne tracking-widest uppercase mb-2" style={{ color: 'var(--accent)' }}>
                Fitur Utama
              </p>
              <ul className="space-y-2">
                {project.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm leading-relaxed"
                    style={{ color: 'var(--muted)' }}
                  >
                    <span className="font-bold font-syne flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }}>
                      →
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Modal