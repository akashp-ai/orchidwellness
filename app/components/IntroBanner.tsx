"use client";

import { useEffect, useRef } from "react";
import { Sparkles, Users, Heart, Shield, Activity } from "lucide-react";
import { home } from "../lib/content";
import { useLanguage } from "../contexts/LanguageContext";

const iconMap: Record<string, React.ElementType> = {
  Sparkles, Users, Heart, Shield, Activity,
};

export default function IntroBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add("visible"); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="intro" className="bg-cream-100 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="reveal grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* Left: Text */}
          <div>
            <span className="inline-block text-rose-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              {t("intro.eyebrow")}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-charcoal-900 leading-tight mb-6">
              {home.intro.heading.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <span className="text-rose-500">{line}</span>
                  ) : line}
                </span>
              ))}
            </h2>
            <p className="text-charcoal-500 text-base md:text-lg leading-relaxed mb-10">
              {home.intro.body}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {home.intro.stats.map((stat) => (
                <div key={stat.label} className="text-left">
                  <div className="text-3xl font-serif font-bold text-gold-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-charcoal-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Highlight cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {home.highlights.map((item) => {
              const Icon = iconMap[item.icon] || Sparkles;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-6 card-lift border border-rose-100"
                >
                  <div className="w-11 h-11 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-rose-500" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-charcoal-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-charcoal-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
