"use client";

import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, ExternalLink } from "lucide-react";
import { reviews, site } from "../lib/content";
import { GoogleIcon, JustDialIcon } from "./SocialIcons";
import { useLanguage } from "../contexts/LanguageContext";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const total = reviews.reviews.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add("visible"); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const touchStart = useRef<number | null>(null);

  if (!site.sections.showReviews) return null;

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { if (diff > 0) { next(); } else { prev(); } }
    touchStart.current = null;
  };

  const review = reviews.reviews[active];

  return (
    <section id="reviews" className="py-12 lg:py-16 bg-gradient-to-br from-rose-900 via-rose-800 to-[#3A0A24] relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-48 h-48 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-gold-400/8 translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-5 sm:px-6 relative z-10">
        <div ref={ref} className="reveal">

          {/* Header */}
          <div className="text-center mb-8">
            <span className="inline-block text-gold-300 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              {t("reviews.eyebrow")}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-2">
              {reviews.heading}
            </h2>

            {/* Rating pill */}
            <div className="mt-4 inline-flex items-center gap-2.5 bg-white/10 rounded-full px-5 py-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="fill-gold-400 text-gold-400" />
                ))}
              </div>
              <span className="text-white font-semibold">{reviews.averageRating}</span>
              <span className="text-white/70 text-xs">
                ({reviews.totalReviews}+ {t("reviews.reviewsLabel")} · {reviews.ratingSource})
              </span>
            </div>
          </div>

          {/* Main card */}
          <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} className="relative">
            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-2xl">
              <Quote size={26} className="text-gold-200 mb-3 fill-gold-100" strokeWidth={1} />

              <div className="flex gap-0.5 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-gold-400 text-gold-400" />
                ))}
              </div>

              <blockquote className="font-serif text-base sm:text-lg text-charcoal-800 leading-relaxed mb-4 italic">
                &ldquo;{review.text}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-rose-500 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                  {review.avatar}
                </div>
                <div>
                  <div className="font-semibold text-charcoal-900 text-sm">{review.name}</div>
                  <div className="text-xs text-charcoal-400">
                    {review.location} · {review.service} · {review.date}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-3 mt-5">
              <button onClick={prev} className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors" aria-label="Previous review">
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-1.5">
                {reviews.reviews.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)}
                    className={`rounded-full transition-all duration-200 ${i === active ? "w-5 h-1.5 bg-gold-400" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/50"}`}
                    aria-label={`Review ${i + 1}`}
                  />
                ))}
              </div>
              <button onClick={next} className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors" aria-label="Next review">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* External review links */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {site.social.googleReviews && (
              <a
                href={site.social.googleReviews}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-charcoal-800 hover:bg-cream-100 font-medium px-4 py-2 rounded-full text-sm transition-colors shadow-sm"
              >
                <GoogleIcon size={14} />
                {t("reviews.googleReviewsBtn")}
                <ExternalLink size={11} className="opacity-50" />
              </a>
            )}
            {site.social.justdial && (
              <a
                href={site.social.justdial}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-medium px-4 py-2 rounded-full text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#F26522" }}
              >
                <JustDialIcon size={14} className="text-white" />
                {t("reviews.justdialBtn")}
                <ExternalLink size={11} className="opacity-70" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
