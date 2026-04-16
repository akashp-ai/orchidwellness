/**
 * Logo component — Orchid SVG flower + wordmark.
 * Use variant="nav" for the top navigation bar (adapts to scroll state).
 * Use variant="footer" for the footer (always light on dark).
 * Use variant="default" for standalone use on a light background.
 */

type LogoVariant = "nav" | "footer" | "default";

interface LogoProps {
  variant?: LogoVariant;
  /** When variant="nav", scrolled=true uses dark text (on white nav) */
  scrolled?: boolean;
  className?: string;
}

export default function Logo({ variant = "default", scrolled = false, className = "" }: LogoProps) {
  const isLight = variant === "footer" || (variant === "nav" && !scrolled);

  const wordmarkColor = isLight ? "#E8BC72" : "#B5547A";      // gold on dark, rose on light
  const subtitleColor = isLight ? "rgba(255,255,255,0.65)" : "#6b7280";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* ── Orchid flower SVG icon ── */}
      <svg
        viewBox="0 0 44 44"
        width="38"
        height="38"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Soft shadow/glow ring */}
        <circle cx="22" cy="22" r="20" fill={isLight ? "rgba(255,255,255,0.08)" : "rgba(181,84,122,0.08)"} />

        <g transform="translate(22,22)">
          {/* 5 petals — alternating gold & rose, positioned outward from center */}
          <ellipse cx="0" cy="-12" rx="5" ry="9.5" fill="#C9A96E" opacity="0.95" transform="rotate(0)" />
          <ellipse cx="0" cy="-12" rx="5" ry="9.5" fill="#D9608F" opacity="0.88" transform="rotate(72)" />
          <ellipse cx="0" cy="-12" rx="5" ry="9.5" fill="#C9A96E" opacity="0.82" transform="rotate(144)" />
          <ellipse cx="0" cy="-12" rx="5" ry="9.5" fill="#D9608F" opacity="0.82" transform="rotate(216)" />
          <ellipse cx="0" cy="-12" rx="5" ry="9.5" fill="#C9A96E" opacity="0.88" transform="rotate(288)" />

          {/* Center circle — gold */}
          <circle cx="0" cy="0" r="5.5" fill="#E8BC72" />
          {/* Inner highlight */}
          <circle cx="0" cy="0" r="2.5" fill="#FAF8F5" opacity="0.9" />
        </g>
      </svg>

      {/* ── Text wordmark ── */}
      <div className="flex flex-col leading-none">
        <span
          className="font-serif text-xl md:text-2xl font-bold tracking-wide transition-colors duration-300"
          style={{ color: wordmarkColor }}
        >
          Orchid
        </span>
        <span
          className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase font-medium transition-colors duration-300 mt-0.5"
          style={{ color: subtitleColor }}
        >
          Unisex Salon & Spa
        </span>
      </div>
    </div>
  );
}
