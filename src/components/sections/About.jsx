import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { num: '1+', label: 'Tahun pengalaman' },
  { num: '5+', label: 'Projects selesai' },
  { num: '4+', label: 'Tech stack' },
  { num: '∞',  label: 'Semangat belajar' },
]

const glassCard = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.12)',
  backdropFilter: 'blur(20px) saturate(150%)',
  WebkitBackdropFilter: 'blur(20px) saturate(150%)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.2)',
}

export function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })

  return (
    <section id="about" className="py-28" ref={ref}>
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-syne font-bold text-[11px] tracking-[0.18em] uppercase mb-3" style={{ color: 'var(--accent)' }}>
              tentang saya
            </p>

            <h2
              className="font-syne font-bold tracking-tight leading-tight mb-2"
              style={{ fontSize: 'clamp(30px, 4vw, 46px)' }}
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
                Engineer yang
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
                Berpikir Sistemik
              </span>
            </h2>

            <div className="w-12 h-0.5 rounded mb-6" style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent2))' }} />

            <p className="text-[15px] leading-relaxed mb-8 max-w-lg" style={{ color: 'var(--muted)' }}>
              Saya adalah <strong className="text-white font-semibold">Vibe Coder</strong> yang berfokus pada pengembangan sistem berbasis web dengan pendekatan clean architecture, efisiensi performa, dan pengalaman pengguna yang modern.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="rounded-2xl p-5"
                  style={glassCard}
                >
                  <div className="font-syne font-extrabold text-3xl leading-none text-gradient mb-1">{s.num}</div>
                  <div className="text-sm" style={{ color: 'var(--muted)' }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative rounded-2xl p-7 overflow-hidden"
            style={glassCard}
          >
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(91,127,255,0.12), transparent 70%)' }} />

            <div className="flex gap-1.5 mb-5">
              <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
            </div>

            <pre className="font-mono text-[13.5px] leading-8" style={{ color: 'var(--muted)' }}>
{`// fachri.config.js\n`}<span style={{ color: 'var(--accent)' }}>const</span>{` `}<span style={{ color: '#4ade80' }}>engineer</span>{` = {\n  name: `}<span style={{ color: '#c084fc' }}>'Fachri Akbar'</span>{`,\n  role: `}<span style={{ color: '#c084fc' }}>'Web Engineer'</span>{`,\n  focus: [\n    `}<span style={{ color: '#c084fc' }}>'Clean Architecture'</span>{`,\n    `}<span style={{ color: '#c084fc' }}>'System Design'</span>{`,\n    `}<span style={{ color: '#c084fc' }}>'Modern UI'</span>{`,\n  ],\n  available: `}<span style={{ color: '#4ade80' }}>true</span>{`,\n};\n\n`}<span style={{ color: '#374151' }}>{`// ✓ Open for opportunities`}</span>
            </pre>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About