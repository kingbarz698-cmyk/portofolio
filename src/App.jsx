import './index.css'
import { Suspense, lazy } from 'react'
import Navbar from './components/sections/Navbar'
import { ElegantShape } from './components/ui/ElegantShape'

const Hero     = lazy(() => import('./components/sections/Hero'))
const About    = lazy(() => import('./components/sections/About'))
const Skills   = lazy(() => import('./components/sections/Skills'))
const Projects = lazy(() => import('./components/sections/Projects'))
const Contact  = lazy(() => import('./components/sections/Contact'))

const SectionFallback = () => (
  <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{
      width: 36, height: 36, borderRadius: '50%',
      border: '2px solid rgba(91,127,255,0.2)',
      borderTopColor: 'var(--accent)',
      animation: 'spin 0.8s linear infinite',
    }} />
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
)

export default function App() {
  return (
    <>
      {/* ── LAYER 0: Dark base ── */}
      <div className="fixed inset-0 z-0" style={{ background: '#030303' }} />

      {/* ── LAYER 1: Ambient gradient asli Anda ── */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(91, 127, 255, 0.15), transparent), radial-gradient(ellipse 60% 60% at 50% 100%, rgba(139, 92, 246, 0.08), transparent)',
        }}
      />

      {/* ── LAYER 2: Semua ElegantShape (Termasuk Variasi Teal & Pink Asli Anda) ── */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <ElegantShape
          delay={0.3}
          width={600} height={140} rotate={12}
          gradient="from-indigo-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />
        <ElegantShape
          delay={0.5}
          width={500} height={120} rotate={-15}
          gradient="from-rose-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />
        <ElegantShape
          delay={0.4}
          width={300} height={80} rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />
        <ElegantShape
          delay={0.6}
          width={200} height={60} rotate={20}
          gradient="from-amber-500/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />
        <ElegantShape
          delay={0.7}
          width={150} height={40} rotate={-25}
          gradient="from-cyan-500/[0.15]"
          className="left-[18%] md:left-[22%] top-[3%] md:top-[6%]"
        />
        
        {/* Kanan tengah — teal, baru (Milik Anda) */}
        <ElegantShape
          delay={0.8}
          width={260} height={70} rotate={10}
          gradient="from-teal-500/[0.12]"
          className="right-[5%] md:right-[8%] top-[35%] md:top-[40%]"
        />
        
        {/* Bawah tengah — pink (Milik Anda) */}
        <ElegantShape
          delay={0.9}
          width={400} height={100} rotate={-5}
          gradient="from-pink-500/[0.10]"
          className="left-[20%] md:left-[25%] top-[80%] md:top-[84%]"
        />
      </div>

      {/* ── Navbar ── */}
      <Navbar />

      {/* ── Sections ── */}
      <main className="relative z-10">
        <Suspense fallback={<SectionFallback />}><Hero /></Suspense>
        <Suspense fallback={<SectionFallback />}><About /></Suspense>
        <Suspense fallback={<SectionFallback />}><Skills /></Suspense>
        <Suspense fallback={<SectionFallback />}><Projects /></Suspense>
        <Suspense fallback={<SectionFallback />}><Contact /></Suspense>
      </main>

      {/* ── Footer asli Anda ── */}
      <footer
        className="relative z-10 text-center py-8 font-syne font-semibold text-sm border-t"
        style={{ borderColor: 'rgba(99,130,255,0.12)', color: 'var(--muted)' }}
      >
        Dibuat oleh <span style={{ color: 'var(--accent)' }}>Fachri Akbar</span> · Web Engineer · 2025
      </footer>
    </>
  )
}