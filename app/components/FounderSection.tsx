"use client";

import { useEffect, useRef } from "react";
import { Heart, Award, Users, CheckCircle, Quote } from "lucide-react";
import Image from "next/image";
import { founder, site } from "../lib/content";
import { useLanguage } from "../contexts/LanguageContext";
import { assetUrl } from "../lib/utils";

const iconMap: Record<string, React.ElementType> = { Heart, Award, Users };

export default function FounderSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add("visible"); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  if (!site.sections.showFounder) return null;

  return (
    <section id="founder" className="py-0 overflow-hidden">
      {/* ── Eyebrow above the split ── */}
      <div className="bg-cream-100 text-center pt-16 pb-6 px-4">
        <span className="inline-block text-rose-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          {t("founder.eyebrow")}
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-charcoal-900">
          The Heart Behind Orchid
        </h2>
        <div className="divider-gold mt-5" />
      </div>

      {/* ── Two-column split ── */}
      <div ref={ref} className="reveal grid lg:grid-cols-2">

        {/* ── Left: full-bleed image panel ── */}
        <div className="relative h-[340px] lg:h-auto lg:min-h-[560px] bg-gradient-to-br from-rose-200 to-rose-100">
          <Image
            src={assetUrl(founder.image.src)}
            alt={founder.image.alt}
            fill
            className="object-cover object-top"
            unoptimized
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          {/* Gradient overlay — fades into right panel on desktop */}
          <div className="absolute inset-0 bg-gradient-to-t from-rose-950/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-cream-100/20" />

          {/* Established badge */}
          <div className="absolute bottom-6 left-6 bg-gold-400 text-charcoal-900 rounded-2xl px-5 py-3 shadow-xl">
            <div className="text-2xl font-serif font-bold leading-none">{founder.experience}</div>
            <div className="text-xs font-semibold tracking-wide mt-0.5">{t("founder.experienceLabel")}</div>
          </div>
        </div>

        {/* ── Right: content panel ── */}
        <div className="bg-cream-100 px-7 sm:px-10 lg:px-14 py-10 lg:py-12 flex flex-col justify-center">

          {/* Name + title */}
          <div className="mb-6">
            <h3 className="font-serif text-3xl md:text-4xl font-semibold text-charcoal-900 mb-1">
              {founder.name}
            </h3>
            <p className="text-gold-500 text-sm font-semibold tracking-wider uppercase">
              {founder.title}
            </p>
          </div>

          {/* Tagline */}
          <div className="relative mb-7">
            <Quote size={28} className="text-rose-200 absolute -top-1 -left-1" fill="currentColor" strokeWidth={0} />
            <p className="font-serif text-base md:text-lg text-rose-700 italic leading-relaxed pl-7">
              {founder.tagline.replace(/^"|"$/g, "")}
            </p>
          </div>

          {/* Story */}
          <div className="space-y-3.5 mb-8">
            {founder.story.map((para, i) => (
              <p key={i} className="text-charcoal-500 leading-relaxed text-sm md:text-base">
                {para}
              </p>
            ))}
          </div>

          {/* Values — horizontal chips */}
          <div className="flex flex-wrap gap-3 mb-8">
            {founder.values.map((val) => {
              const Icon = iconMap[val.icon] || Heart;
              return (
                <div
                  key={val.title}
                  className="flex items-center gap-2 bg-white border border-rose-100 rounded-full px-4 py-2 shadow-sm"
                >
                  <Icon size={15} className="text-rose-500 flex-shrink-0" />
                  <span className="text-xs font-semibold text-charcoal-800">{val.title}</span>
                </div>
              );
            })}
          </div>

          {/* Background highlights */}
          <div className="bg-white rounded-2xl p-5 border border-rose-100">
            <h4 className="font-serif font-semibold text-charcoal-900 mb-3 text-sm uppercase tracking-wider">
              {t("founder.certifications")}
            </h4>
            <ul className="space-y-2">
              {founder.certifications.map((cert) => (
                <li key={cert} className="flex items-center gap-2.5 text-sm text-charcoal-600">
                  <CheckCircle size={14} className="text-rose-400 flex-shrink-0" />
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
