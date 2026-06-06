import { motion } from 'framer-motion'
import LiquidButton from '../ui/LiquidButton'
import SplineScene from '../ui/SplineScene'

const roles = ['Vibe Coder', 'Web Engineer', 'System Builder', 'Backend Logic', 'Frontend Dev', 'Problem Solver']

const IconLightning = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 3L4 14h7l-1 7 9-11h-7z" />
  </svg>
)

const IconArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.5 + i * 0.2,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
}

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden">

      {/* ── DESKTOP layout ── */}
      <div className="hidden lg:block container mx-auto px-6 max-w-6xl relative" style={{ zIndex: 2 }}>
        <div className="grid grid-cols-2 gap-12 items-center">

          {/* Left: Text */}
          <div>
            {/* Badge */}
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-6"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: 'rgba(244,63,94,0.8)' }}
              />
              <span className="font-syne text-[12px] tracking-wide" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Available for Projects
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
              <h1 className="font-syne font-bold leading-[1.04] tracking-tight mb-4" style={{ fontSize: 'clamp(42px,5.5vw,72px)' }}>
                <span
                  className="block"
                  style={{
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    backgroundImage: 'linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.8))',
                  }}
                >
                  Halo, Saya
                </span>
                <span
                  className="block"
                  style={{
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    backgroundImage: 'linear-gradient(to right, #a5b4fc, rgba(255,255,255,0.9), #fda4af)',
                  }}
                >
                  Fachri Akbar
                </span>
              </h1>
            </motion.div>

            {/* Role ticker */}
            <motion.div
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3 mb-5 font-syne font-semibold"
              style={{ fontSize: 'clamp(18px,2.2vw,26px)', color: 'rgba(255,255,255,0.4)' }}
            >
              <span className="text-white">Seorang</span>
              <div className="overflow-hidden" style={{ height: '1.2em' }}>
                <ul className="list-none rotate-list">
                  {roles.map(r => (
                    <li key={r} style={{ height: '1.2em' }} className="text-gradient whitespace-nowrap">{r}</li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              custom={3}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="text-[15px] leading-relaxed max-w-md mb-8 font-light tracking-wide"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Membangun sistem modern, efisien, dan scalable. Fokus pada clean architecture dan pengalaman pengguna yang outstanding.
            </motion.p>

            {/* Buttons */}
            <motion.div
              custom={4}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex gap-3 flex-wrap items-center"
            >
              <LiquidButton href="#projects" className="font-syne font-bold text-sm tracking-wide">
                Lihat Projects <IconArrowRight />
              </LiquidButton>
              <LiquidButton href="#contact" className="font-syne font-bold text-sm tracking-wide" variant="accent">
                Contact Me
              </LiquidButton>
            </motion.div>
          </div>

          {/* Right: Spline 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full" style={{ height: '480px' }}>
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, rgba(91,127,255,0.12) 0%, transparent 70%)' }}
              />
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
                rootMargin="0px"
              />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-8 left-0 rounded-xl px-4 py-2.5 font-syne font-bold text-xs flex items-center gap-1.5"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  color: 'var(--accent)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
                }}
              >
                <IconLightning /> Engineering
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── MOBILE layout ── */}
      <div className="lg:hidden flex flex-col relative px-5 pt-4 pb-2" style={{ zIndex: 2 }}>

        {/* Top row: text left, photo right */}
        <div className="flex items-start justify-between gap-3 mb-5">

          {/* Text */}
          <motion.div
            className="flex-1 min-w-0"
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 mb-3 font-syne"
              style={{
                fontSize: '9px',
                letterSpacing: '0.08em',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(244,63,94,0.8)' }} />
              Available for Projects
            </div>

            {/* Heading */}
            <h1 className="font-syne font-bold leading-[1.06] tracking-tight mb-2" style={{ fontSize: 'clamp(30px,7.5vw,42px)' }}>
              <span
                className="block"
                style={{
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  backgroundImage: 'linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.8))',
                }}
              >
                Halo, Saya
              </span>
              <span
                className="block"
                style={{
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  backgroundImage: 'linear-gradient(to right, #a5b4fc, rgba(255,255,255,0.9), #fda4af)',
                }}
              >
                Fachri Akbar
              </span>
            </h1>

            {/* Role ticker */}
            <div className="flex items-center gap-2 font-syne font-semibold" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>
              <span className="text-white">Seorang</span>
              <div className="overflow-hidden" style={{ height: '1.2em' }}>
                <ul className="list-none rotate-list">
                  {roles.map(r => (
                    <li key={r} style={{ height: '1.2em' }} className="text-gradient whitespace-nowrap">{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Photo */}
          <motion.div
            className="flex-shrink-0"
            style={{ marginTop: '2px' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <div className="relative" style={{ width: 90, height: 108 }}>
              <div
                className="absolute inset-0 rounded-[18px] ring-pulse"
                style={{ border: '1px solid rgba(91,127,255,0.3)' }}
              />
              <div
                className="absolute rounded-[16px] overflow-hidden"
                style={{
                  inset: '5px',
                  background: 'linear-gradient(135deg, rgba(91,127,255,0.15), rgba(139,92,246,0.15))',
                  border: '1px solid rgba(91,127,255,0.25)',
                }}
              >
                <img
                  src="/img/barz.jpeg"
                  alt="Fachri Akbar"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                  onError={e => { e.target.style.display = 'none' }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Description */}
        <motion.p
          className="text-[13px] leading-relaxed mb-5 font-light tracking-wide"
          style={{ color: 'rgba(255,255,255,0.4)' }}
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
        >
          Membangun sistem modern, efisien, dan scalable. Fokus pada clean architecture dan pengalaman pengguna yang outstanding.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex gap-3 flex-wrap"
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
        >
          <LiquidButton href="#projects" className="font-syne font-bold tracking-wide" style={{ height: '42px', fontSize: '13px', padding: '0 18px' }}>
            Lihat Projects <IconArrowRight />
          </LiquidButton>
          <LiquidButton href="#contact" variant="accent" className="font-syne font-bold tracking-wide" style={{ height: '42px', fontSize: '13px', padding: '0 18px' }}>
            Contact Me
          </LiquidButton>
        </motion.div>

        {/* Spline 3D mobile */}
        <motion.div
          className="mt-3 w-full rounded-2xl"
          style={{ height: '340px', maxHeight: '340px', position: 'relative', overflow: 'clip' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, rgba(91,127,255,0.1) 0%, transparent 70%)', zIndex: 1 }}
          />
          <div style={{ position: 'absolute', inset: 0, overflow: 'clip', borderRadius: '1rem' }}>
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
              rootMargin="100px"
            />
          </div>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-4 left-4 rounded-xl px-3 py-2 font-syne font-bold text-[11px] flex items-center gap-1.5"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.18)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              color: 'var(--accent)',
              zIndex: 2,
            }}
          >
            <IconLightning /> Engineering
          </motion.div>
        </motion.div>
      </div>

      {/* Fade bottom — dihapus, penyebab garis belang di mobile */}
    </section>
  )
}

export default Hero