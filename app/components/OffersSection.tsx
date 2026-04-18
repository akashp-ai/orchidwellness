"use client";

import { useEffect, useRef } from "react";
import { Tag, Clock, ArrowRight } from "lucide-react";
import { site, offers } from "../lib/content";
import { useLanguage } from "../contexts/LanguageContext";

export default function OffersSection() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  if (!site.sections.showOffers) return null;

  const activeOffers = offers.offers.filter((o) => o.enabled);
  if (activeOffers.length === 0) return null;

  return (
    <section id="offers" className="py-16 lg:py-20 blush-pattern">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="reveal">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-rose-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              <Tag size={12} />
              {t("offers.eyebrow")}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-charcoal-900 mb-2">
              {offers.heading}
            </h2>
            <p className="text-charcoal-500 max-w-xl mx-auto text-sm md:text-base">
              {offers.subheading}
            </p>
            <div className="divider-gold mt-5" />
          </div>

          {/* Offer cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white border border-rose-100 rounded-2xl overflow-hidden card-lift flex flex-col shadow-sm"
              >
                {/* Card top accent */}
                <div className="h-1 bg-gradient-to-r from-rose-400 to-gold-400" />

                {/* Header */}
                <div className="px-6 pt-5 pb-4 relative">
                  {offer.badge && (
                    <span className="inline-flex items-center bg-gold-100 text-gold-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-3 tracking-wide">
                      {offer.badge}
                    </span>
                  )}
                  <h3 className="font-serif text-xl font-semibold text-charcoal-900 leading-snug mb-1">
                    {offer.title}
                  </h3>
                  {offer.subtitle && (
                    <p className="text-rose-500 text-sm font-medium">{offer.subtitle}</p>
                  )}
                </div>

                {/* Body */}
                <div className="px-6 pb-4 flex-1">
                  <p className="text-charcoal-500 text-sm leading-relaxed">
                    {offer.description}
                  </p>
                  {offer.validity && (
                    <div className="flex items-center gap-1.5 mt-4 text-xs text-charcoal-400">
                      <Clock size={12} />
                      <span>
                        {t("offers.validLabel")} {offer.validity}
                      </span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                {offer.ctaText && (
                  <div className="px-6 pb-6">
                    <a
                      href={offer.ctaHref || "#contact"}
                      onClick={(e) => {
                        const href = offer.ctaHref || "#contact";
                        if (href.startsWith("#")) {
                          e.preventDefault();
                          document
                            .getElementById(href.slice(1))
                            ?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-medium px-5 py-2.5 rounded-full text-sm transition-colors"
                    >
                      {offer.ctaText}
                      <ArrowRight size={14} />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
