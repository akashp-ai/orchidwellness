"use client";

import { useEffect, useRef } from "react";
import { ChevronDown, Star } from "lucide-react";
import { home, site } from "../lib/content";
import { useLanguage } from "../contexts/LanguageContext";
import { assetUrl } from "../lib/utils";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const el = ref.current;
    if (el) setTimeout(() => el.classList.add("visible"), 100);
  }, []);

  const scrollDown = () => {
    document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" });
  };

  const lines = home.hero.headline.split("\n");

  return (
    <section
      id="home"
      className="hero-full relative flex items-center justify-center overflow-hidden"
    >
      {/* ── Real salon image background ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${assetUrl("/media/gallery/gallery-1.jpg")}')` }}
      />

      {/* ── Overlay: strong on left where text sits, lighter on right ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1B050F]/95 via-[#1B050F]/80 to-[#1B050F]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1B050F]/60 via-transparent to-[#1B050F]/30" />

      {/* ── Decorative ambient glows ── */}
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-rose-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-80 h-80 rounded-full bg-gold-400/12 blur-3xl pointer-events-none" />

      {/* ── Gold dot pattern ── */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 30%, #C9A96E 1px, transparent 1px),
                            radial-gradient(circle at 70% 70%, #C9A96E 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Main content ── */}
      <div ref={ref} className="reveal relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 text-left pt-20 md:pt-24">

        {/* Rating badge */}
        <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className="fill-gold-400 text-gold-400" />
            ))}
          </div>
          <span className="text-white/90 text-xs font-medium tracking-wide">
            {t("hero.badge")}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-bold text-white leading-[1.05] mb-6 max-w-3xl">
          {lines.map((line, i) => (
            <span key={i} className="block">
              {i === 1 ? (
                <span className="text-gold-gradient">{line}</span>
              ) : (
                line
              )}
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <p className="text-white/75 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-10 font-light">
          {home.hero.subheadline}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <a
            href={home.hero.primaryCta.href}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(home.hero.primaryCta.href)
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-200 hover:scale-105 shadow-lg shadow-rose-900/40"
          >
            {t("common.bookAppointment")}
          </a>
          <a
            href={home.hero.secondaryCta.href}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(home.hero.secondaryCta.href)
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-full text-base transition-all duration-200 hover:bg-white/10 backdrop-blur-sm"
          >
            {t("common.exploreServices")}
          </a>
        </div>

        {/* Social proof row */}
        <div className="mt-12 flex flex-wrap items-center justify-start gap-6 text-white/60 text-sm">
          <div className="flex items-center gap-1.5">
            <Star size={14} className="fill-gold-400 text-gold-400" />
            <span>
              <strong className="text-white">{site.ratings.score}</strong>{" "}
              {t("hero.ratingLabel")}
            </span>
          </div>
          <div className="w-px h-4 bg-white/20 hidden sm:block" />
          <div>
            <strong className="text-white">{site.ratings.count}+</strong>{" "}
            {t("hero.happyClients")}
          </div>
          <div className="w-px h-4 bg-white/20 hidden sm:block" />
          <div>
            {t("hero.since")}{" "}
            <strong className="text-white">{site.brand.establishedYear}</strong>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/80 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
