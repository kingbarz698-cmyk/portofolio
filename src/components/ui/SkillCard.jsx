import {
  siHtml5,
  siCss,
  siJavascript,
  siPhp,
  siMysql,
  siReact,
  siLaravel,
  siTailwindcss,
} from "simple-icons";

const icons = {
  html5: siHtml5,
  css3: siCss,
  javascript: siJavascript,
  php: siPhp,
  mysql: siMysql,
  react: siReact,
  laravel: siLaravel,
  tailwind: siTailwindcss,
};

export function SkillSvgIcon({ name, size = 28, className = "" }) {
  const icon = icons[name];

  if (!icon) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={`#${icon.hex}`}
      className={className}
      aria-label={name}
      role="img"
    >
      <path d={icon.path} />
    </svg>
  );
}

// Komponen SkillCard yang dipakai di Skills.jsx
// Data skills pakai field: name, svgPath, pct, color
export function SkillCard({ name, svgPath, pct, color, delay = 0 }) {
  return (
    <div
      className="flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Icon */}
      <div
        className="flex items-center justify-center rounded-xl shrink-0"
        style={{
          width: 52,
          height: 52,
          background: "rgba(255,255,255,0.06)",
        }}
      >
        <SkillSvgIcon name={svgPath} size={28} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-syne font-semibold text-sm text-white truncate">
            {name}
          </span>
          {pct !== undefined && (
            <span
              className="text-xs font-medium ml-2 shrink-0"
              style={{ color: "var(--accent)" }}
            >
              {pct}%
            </span>
          )}
        </div>

        {/* Progress bar */}
        {pct !== undefined && (
          <div
            className="w-full rounded-full overflow-hidden"
            style={{ height: 4, background: "rgba(255,255,255,0.08)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${pct}%`,
                background:
                  "linear-gradient(90deg, var(--accent), var(--accent2))",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SkillSvgIcon;