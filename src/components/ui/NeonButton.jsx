import React from 'react'

/**
 * NeonButton — dari 21st.dev prompt
 * Variants: 'default' | 'solid' | 'ghost'
 * Sizes:    'default' | 'sm' | 'lg'
 */

const variantClasses = {
  default: 'bg-blue-500/5 hover:bg-blue-500/0 border-blue-500/20',
  solid:   'bg-blue-500 hover:bg-blue-600 text-white border-transparent hover:border-foreground/50 transition-all duration-200',
  ghost:   'border-transparent bg-transparent hover:border-zinc-600 hover:bg-white/10',
}

const sizeClasses = {
  default: 'px-7 py-1.5',
  sm:      'px-4 py-0.5',
  lg:      'px-10 py-2.5',
}

export function NeonButton({
  className = '',
  neon = true,
  size = 'default',
  variant = 'default',
  children,
  href,
  onClick,
  ...props
}) {
  const baseClass = [
    'relative group border text-white mx-auto text-center rounded-full',
    'font-syne font-semibold tracking-wide text-sm',
    'transition-all duration-200 cursor-pointer',
    'inline-flex items-center justify-center gap-2',
    variantClasses[variant] || variantClasses.default,
    sizeClasses[size] || sizeClasses.default,
    className,
  ].join(' ')

  const inner = (
    <button onClick={onClick} className={baseClass} {...props}>
      {/* top neon line */}
      {neon && (
        <span className="absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 inset-y-0 bg-gradient-to-r w-3/4 mx-auto from-transparent via-blue-400 to-transparent block" />
      )}
      {children}
      {/* bottom neon line */}
      {neon && (
        <span className="absolute group-hover:opacity-30 transition-all duration-500 ease-in-out inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-blue-400 to-transparent block" />
      )}
    </button>
  )

  if (href) return <a href={href}>{inner}</a>
  return inner
}

export default NeonButton
