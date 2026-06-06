'use client'
import * as React from 'react'

function GlassFilter() {
  return (
    <svg className="hidden" aria-hidden="true">
      <defs>
        <filter id="container-glass" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="1" result="turbulence"/>
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise"/>
          <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="70" xChannelSelector="R" yChannelSelector="B" result="displaced"/>
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur"/>
          <feComposite in="finalBlur" in2="finalBlur" operator="over"/>
        </filter>
      </defs>
    </svg>
  )
}

export function LiquidButton({ className = '', children, onClick, href, variant = 'default', style = {}, ...props }) {
  const isAccent = variant === 'accent'

  const inner = (
    <button
      onClick={onClick}
      className={`
        relative inline-flex items-center justify-center cursor-pointer gap-2
        whitespace-nowrap rounded-full text-sm font-semibold
        h-12 px-8
        hover:scale-105 active:scale-95 duration-200 transition-transform
        text-white
        ${className}
      `}
      style={{
        background: isAccent
          ? 'rgba(91,127,255,0.25)'
          : 'rgba(255,255,255,0.1)',
        ...style,
      }}
      {...props}
    >
      {/* Liquid glass layer */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          background: isAccent
            ? 'rgba(91,127,255,0.2)'
            : 'rgba(255,255,255,0.08)',
          border: isAccent
            ? '1px solid rgba(91,127,255,0.5)'
            : '1px solid rgba(255,255,255,0.25)',
          boxShadow: isAccent
            ? 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.15), 0 0 20px rgba(91,127,255,0.35), 0 4px 20px rgba(0,0,0,0.3)'
            : 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.1), 0 4px 20px rgba(0,0,0,0.25)',
        }}
      />
      {/* SVG displacement untuk efek liquid */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden -z-10"
        style={{ backdropFilter: 'url("#container-glass")' }}
      />
      <span className="relative z-10 font-bold flex items-center gap-2" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
        {children}
      </span>
      <GlassFilter />
    </button>
  )

  if (href) return (
    <a href={href} style={{ textDecoration: 'none', display: 'inline-block' }}>
      {inner}
    </a>
  )
  return inner
}

export default LiquidButton
