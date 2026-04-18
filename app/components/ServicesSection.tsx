"use client";

import { useState, useEffect, useRef } from "react";
import {
  Scissors, Palette, Flower2, Zap, Star, Leaf, Hand, Crown, Minus, Sparkles,
} from "lucide-react";
import { services, site } from "../lib/content";
import { useLanguage } from "../contexts/LanguageContext";

const iconMap: Record<string, React.ElementType> = {
  Scissors, Palette, Flower2, Zap, Star, Leaf, Hand, Crown, Minus, Sparkles,
};

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState(services.categories[0].id);
  const tabsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add("visible"); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Scroll active tab into view on mobile
  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    const tab = tabsRef.current?.querySelector(`[data-tab="${id}"]`);
    tab?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  if (!site.sections.showServices) return null;

  const activeData = services.categories.find((c) => c.id === activeCategory)!;

  return (
    <section id="services" className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="reveal">

          {/* ── Header ── */}
          <div className="text-center mb-10 lg:mb-14">
            <span className="inline-block text-rose-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              {t("services.eyebrow")}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-charcoal-900 mb-3">
              {services.heading}
            </h2>
            <p className="text-charcoal-500 max-w-xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
              {services.subheading}
            </p>
            <div className="divider-gold mt-6" />
          </div>

          {/* ── Category tabs — horizontally scrollable on mobile ── */}
          <div
            ref={tabsRef}
            className="flex gap-2 overflow-x-auto pb-3 mb-8 lg:mb-10 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center"
          >
            {services.categories.map((cat) => {
              const Icon = iconMap[cat.icon] || Star;
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  data-tab={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 border ${
                    isActive
                      ? "bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-200"
                      : "bg-white text-charcoal-600 border-cream-300 hover:border-rose-300 hover:text-rose-500 hover:bg-rose-50"
                  }`}
                >
                  <Icon size={14} className="flex-shrink-0" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* ── Active category label + count ── */}
          <div className="flex items-center justify-between mb-5 lg:mb-7">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-rose-500 rounded-full" />
              <h3 className="font-serif text-lg font-semibold text-charcoal-900">
                {activeData.name}
              </h3>
            </div>
            <span className="text-xs text-charcoal-400 font-medium bg-cream-100 px-3 py-1 rounded-full">
              {activeData.services.length} services
            </span>
          </div>

          {/* ── Service cards grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {activeData.services.map((service) => (
              <div
                key={service.name}
                className="group bg-cream-50 hover:bg-white border border-cream-200 hover:border-rose-200 rounded-2xl p-5 transition-all duration-200 hover:shadow-md"
              >
                {/* Emoji icon */}
                <div className="text-2xl mb-3" aria-hidden="true">
                  {activeData.emoji ?? "✦"}
                </div>

                {/* Service name */}
                <h4 className="font-serif font-semibold text-charcoal-900 text-base mb-2 leading-snug">
                  {service.name}
                </h4>

                {/* Description */}
                <p className="text-charcoal-500 text-sm leading-relaxed line-clamp-3">
                  {service.description}
                </p>

                {/* Tap-to-enquire link */}
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-1.5 text-rose-500 font-medium text-xs mt-4 hover:text-rose-600 transition-colors group-hover:underline"
                >
                  {t("services.enquire")} →
                </a>
              </div>
            ))}
          </div>

          {/* ── Book CTA ── */}
          <div className="mt-10 lg:mt-14 text-center">
            <p className="text-charcoal-500 text-sm mb-4">
              {t("services.ctaSubtext")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold px-8 py-4 rounded-full text-sm transition-all duration-200 hover:scale-105 shadow-md shadow-rose-200"
              >
                {t("common.bookService")}
              </a>
              <a
                href={`https://wa.me/${site.contact.whatsapp}?text=Hi%20Orchid%2C%20I%27d%20like%20to%20enquire%20about%20your%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-green-500 text-green-600 hover:bg-green-50 font-semibold px-8 py-4 rounded-full text-sm transition-all duration-200"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
