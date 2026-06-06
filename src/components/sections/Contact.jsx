import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import LiquidButton from '../ui/LiquidButton'

const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ea4335' }}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const IconMailSend = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const IconWhatsApp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#25d366">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12.05 1.96C6.495 1.96 2 6.455 2 12.01c0 1.898.512 3.675 1.405 5.2L2 22l4.91-1.394A10.034 10.034 0 0 0 12.05 22c5.555 0 10.05-4.495 10.05-10.05S17.605 1.96 12.05 1.96zm0 18.42a8.352 8.352 0 0 1-4.44-1.28l-.317-.192-3.297.937.936-3.22-.207-.33A8.352 8.352 0 0 1 3.71 12c0-4.603 3.737-8.34 8.34-8.34s8.34 3.737 8.34 8.34-3.737 8.34-8.34 8.34z"/>
  </svg>
)

const IconInstagram = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#ig-gradient)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433"/>
        <stop offset="25%" stopColor="#e6683c"/>
        <stop offset="50%" stopColor="#dc2743"/>
        <stop offset="75%" stopColor="#cc2366"/>
        <stop offset="100%" stopColor="#bc1888"/>
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="url(#ig-gradient)" stroke="none"/>
  </svg>
)

const IconGitHub = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

const links = [
  {
    icon: <IconInstagram />,
    label: 'Instagram',
    value: '@maskfachri',
    href: 'https://instagram.com/maskfachri',
  },
  {
    icon: <IconMail />,
    label: 'Email',
    value: 'barzbar17@gmail.com',
    href: 'mailto:barzbar17@gmail.com',
  },
  {
    icon: <IconWhatsApp />,
    label: 'WhatsApp',
    value: '082123996178',
    href: 'https://wa.me/6282123996178',
  },
  {
    icon: <IconGitHub />,
    label: 'GitHub',
    value: 'kingbarz698-cmyk',
    href: 'https://github.com/kingbarz698-cmyk',
  },
]

const glassCard = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.12)',
  backdropFilter: 'blur(20px) saturate(150%)',
  WebkitBackdropFilter: 'blur(20px) saturate(150%)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 16px rgba(0,0,0,0.15)',
}

export function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })

  return (
    <section
      id="contact"
      className="py-28"
      ref={ref}
      style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-syne font-bold text-[11px] tracking-[0.18em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
              hubungi saya
            </p>

            <h3
              className="font-syne font-bold leading-tight mb-4"
              style={{ fontSize: 'clamp(26px, 3.5vw, 40px)' }}
            >
              <span
                className="block"
                style={{
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  backgroundImage: 'linear-gradient(to bottom, rgb(255,255,255), rgba(255,255,255,0.8))',
                }}
              >
                Mari
              </span>
              <span
                className="block"
                style={{
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  backgroundImage: 'linear-gradient(to right, rgb(165,180,252), rgba(255,255,255,0.9), rgb(253,164,175))',
                }}
              >
                Berkolaborasi Bersama
              </span>
            </h3>

            <p className="text-[15px] leading-relaxed mb-8 max-w-sm" style={{ color: 'var(--muted)' }}>
              Punya project menarik atau peluang kerja sama? Saya terbuka untuk diskusi dan kolaborasi.
            </p>

            <LiquidButton
              href="mailto:barzbar17@gmail.com"
              variant="accent"
              className="font-syne font-bold tracking-wide w-full sm:w-auto"
              style={{ minWidth: '220px', paddingLeft: '32px', paddingRight: '32px' }}
            >
              <IconMailSend />
              Kirim Email
            </LiquidButton>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid gap-3"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.45 }}
                className="flex items-center gap-4 p-4 rounded-2xl text-white no-underline transition-all duration-200"
                style={{ ...glassCard, textDecoration: 'none' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(91,127,255,0.4)'
                  e.currentTarget.style.background = 'rgba(91,127,255,0.1)'
                  e.currentTarget.style.transform = 'translateX(4px)'
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(91,127,255,0.15), inset 0 1px 0 rgba(255,255,255,0.15)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.transform = 'translateX(0)'
                  e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 16px rgba(0,0,0,0.15)'
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  {l.icon}
                </div>
                <div className="flex-1">
                  <div className="font-syne font-bold text-[11px] tracking-widest uppercase mb-0.5" style={{ color: 'var(--muted)' }}>
                    {l.label}
                  </div>
                  <div className="text-[14.5px] font-medium" style={{ color: 'var(--text)' }}>{l.value}</div>
                </div>
                <ArrowRight size={16} style={{ color: 'var(--muted)' }} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact