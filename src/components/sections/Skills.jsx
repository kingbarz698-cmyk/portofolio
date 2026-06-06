import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SkillCard } from '../ui/SkillCard'
import { skills } from '../../data'

export function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })

  return (
    <section id="skills" className="py-28" ref={ref}>
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-syne font-bold text-[11px] tracking-[0.18em] uppercase mb-3" style={{ color: 'var(--accent)' }}>
            tech stack
          </p>
          <h2 className="font-syne font-bold tracking-tight" style={{ fontSize: 'clamp(30px, 4vw, 46px)' }}>
            <span
              className="block"
              style={{
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                backgroundImage: 'linear-gradient(to bottom, rgb(255,255,255), rgba(255,255,255,0.8))',
              }}
            >
              Skills &amp;
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
              Keahlian
            </span>
          </h2>
          <div className="w-12 h-0.5 rounded mx-auto mt-4" style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent2))' }} />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              <SkillCard {...skill} delay={i * 100} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills