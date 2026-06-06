import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ProjectCard } from '../ui/ProjectCard'
import { Modal } from '../ui/Modal'
import { projects } from '../../data'

export function Projects() {
  const [selected, setSelected] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })

  return (
    <section id="projects" className="py-28" ref={ref}>
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="font-syne font-bold text-[11px] tracking-[0.18em] uppercase mb-3" style={{ color: 'var(--accent)' }}>
            featured projects
          </p>

          <h2
            className="font-syne font-bold tracking-tight"
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
              Project
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
              Unggulan
            </span>
          </h2>

          <div className="w-12 h-0.5 rounded mt-4" style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent2))' }} />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ delay: i * 0.06, duration: 0.55 }}
            >
              <ProjectCard project={p} onClick={setSelected} />
            </motion.div>
          ))}
        </div>
      </div>

      {selected && <Modal project={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}

export default Projects