import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export function ProjectCard({ project, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: hovered ? 'rgba(91,127,255,0.1)' : 'rgba(255,255,255,0.05)',
        border: hovered ? '1px solid rgba(91,127,255,0.4)' : '1px solid rgba(255,255,255,0.12)',
        backdropFilter: 'blur(20px) saturate(150%)',
        WebkitBackdropFilter: 'blur(20px) saturate(150%)',
        boxShadow: hovered
          ? '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(91,127,255,0.12), inset 0 1px 0 rgba(255,255,255,0.15)'
          : 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 16px rgba(0,0,0,0.15)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(project)}
    >
      {/* Glow overlay on hover */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(91,127,255,0.08) 0%, transparent 50%, rgba(139,92,246,0.05) 100%)',
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.target.style.display = 'none' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div
          className="absolute top-3 right-3 w-2 h-2 rounded-full transition-opacity duration-300"
          style={{
            background: 'var(--accent)',
            boxShadow: '0 0 8px var(--accent)',
            opacity: hovered ? 1 : 0.4,
          }}
        />
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tech.slice(0, 3).map(t => (
            <span
              key={t}
              className="text-[11px] font-bold font-syne px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(91,127,255,0.15)',
                border: '1px solid rgba(91,127,255,0.3)',
                color: 'var(--accent)',
                letterSpacing: '0.04em',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <h3 className="font-syne font-bold text-lg text-white mb-2 leading-tight">{project.title}</h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>{project.desc}</p>

        <div
          className="flex items-center text-sm font-bold font-syne transition-all duration-300"
          style={{ color: 'var(--accent)', gap: hovered ? '12px' : '8px' }}
        >
          Detail Project <ArrowRight size={15} />
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
