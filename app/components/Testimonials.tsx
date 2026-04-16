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
    <section id="reviews" className="py-20 lg:py-28 bg-gradient-to-br from-rose-900 via-rose-800 to-[#3A0A24] relative overflow-hidden">
      {/* Decorative ambient glows */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gold-400/8 translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        <div ref={ref} className="reveal">

          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-block text-gold-300 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              {t("reviews.eyebrow")}
            </span>
            <h2 className="font-serif text-5xl md:text-6xl font-semibold text-white mb-4">
              {reviews.heading}
            </h2>
            <p className="text-white/70 max-w-xl mx-auto">{reviews.subheading}</p>

            {/* Overall rating pill */}
            <div className="mt-6 inline-flex items-center gap-3 bg-white/10 rounded-full px-6 py-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-gold-400 text-gold-400" />
                ))}
              </div>
              <span className="text-white font-semibold text-lg">{reviews.averageRating}</span>
              <span className="text-white/70 text-sm">
                ({reviews.totalReviews}+ {t("reviews.reviewsLabel")} · {reviews.ratingSource})
              </span>
            </div>
          </div>

          {/* Main card */}
          <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} className="relative">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-3xl mx-auto">
              <Quote size={48} className="text-gold-200 mb-6 fill-gold-100" strokeWidth={1} />

              <div className="flex gap-1 mb-5">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-gold-400 text-gold-400" />
                ))}
              </div>

              <blockquote className="font-serif text-xl md:text-2xl text-charcoal-800 leading-relaxed mb-8 italic">
                &ldquo;{review.text}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  {review.avatar}
                </div>
                <div>
                  <div className="font-semibold text-charcoal-900">{review.name}</div>
                  <div className="text-sm text-charcoal-400">
                    {review.location} · {review.service} · {review.date}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button onClick={prev} className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors" aria-label="Previous review">
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {reviews.reviews.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)}
                    className={`rounded-full transition-all duration-200 ${i === active ? "w-6 h-2 bg-gold-400" : "w-2 h-2 bg-white/30 hover:bg-white/50"}`}
                    aria-label={`Review ${i + 1}`}
                  />
                ))}
              </div>
              <button onClick={next} className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors" aria-label="Next review">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Mini cards (desktop) */}
          <div className="hidden lg:grid grid-cols-3 gap-4 mt-12">
            {reviews.reviews.slice(0, 3).map((r, i) => (
              <button key={r.id} onClick={() => setActive(i)}
                className={`text-left bg-white/10 hover:bg-white/15 rounded-2xl p-5 transition-all border ${active === i ? "border-gold-400" : "border-white/10"}`}
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(r.rating)].map((_, j) => (
                    <Star key={j} size={12} className="fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-white/80 text-sm line-clamp-3 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                <div className="mt-3 text-white/50 text-xs font-medium">{r.name}</div>
              </button>
            ))}
          </div>

          {/* External review links */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {site.social.googleReviews && (
              <a
                href={site.social.googleReviews}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-charcoal-800 hover:bg-cream-100 font-medium px-5 py-2.5 rounded-full text-sm transition-colors shadow-sm"
              >
                <GoogleIcon size={16} />
                {t("reviews.googleReviewsBtn")}
                <ExternalLink size={12} className="opacity-50" />
              </a>
            )}
            {site.social.justdial && (
              <a
                href={site.social.justdial}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2.5 rounded-full text-sm transition-colors"
              >
                <JustDialIcon size={16} className="text-white" />
                {t("reviews.justdialBtn")}
                <ExternalLink size={12} className="opacity-70" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
