/**
 * Logo component — uses the official Orchid brand logo image.
 * Cropped flower+leaf icon from the official brand asset, "ORCHID" wordmark, "UNISEX SALON & SPA" subtitle.
 * Use variant="nav" for the top navigation bar (adapts to scroll state).
 * Use variant="footer" for the footer (always light on dark).
 * Use variant="default" for standalone use on a light background.
 */

import Image from "next/image";
import { assetUrl } from "../lib/utils";

type LogoVariant = "nav" | "footer" | "default";

interface LogoProps {
  variant?: LogoVariant;
  /** When variant="nav", scrolled=true uses dark text (on white nav) */
  scrolled?: boolean;
  /** Show the brand tagline as a third line — use in footer/standalone only */
  showTagline?: boolean;
  className?: string;
}

export default function Logo({ variant = "default", scrolled = false, showTagline = false, className = "" }: LogoProps) {
  const isLight = variant === "footer" || (variant === "nav" && !scrolled);

  // Wordmark colour: white on dark backgrounds, deep magenta on light
  const wordmarkColor = isLight ? "#FFFFFF" : "#B5185A";
  const subtitleColor = isLight ? "rgba(255,255,255,0.80)" : "#7B2D8B";
  const taglineColor  = isLight ? "rgba(255,255,255,0.60)" : "#9C4DB8";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* ── Official Orchid logo icon (cropped from brand asset) ── */}
      <Image
        src={assetUrl("/media/logo-icon.png")}
        alt="Orchid logo"
        width={40}
        height={40}
        className="object-contain flex-shrink-0"
        priority
      />

      {/* ── Text wordmark ── */}
      <div className="flex flex-col leading-none">
        <span
          className="font-serif font-bold tracking-widest transition-colors duration-300"
          style={{ color: wordmarkColor, fontSize: "1.2rem", letterSpacing: "0.12em" }}
        >
          ORCHID
        </span>
        <span
          className="tracking-[0.18em] uppercase font-semibold transition-colors duration-300 mt-0.5"
          style={{ color: subtitleColor, fontSize: "0.52rem" }}
        >
          Unisex Salon &amp; Spa
        </span>
        {showTagline && (
          <span
            className="tracking-wide italic transition-colors duration-300 mt-1"
            style={{ color: taglineColor, fontSize: "0.50rem" }}
          >
            Where Beauty &amp; Relaxation Bloom
          </span>
        )}
      </div>
    </div>
  );
}
