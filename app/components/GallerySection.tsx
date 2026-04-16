"use client";

import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import { InstagramIcon } from "./SocialIcons";
import { gallery, site } from "../lib/content";
import { useLanguage } from "../contexts/LanguageContext";

export default function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add("visible"); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Keyboard nav for lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setLightbox(null); setActiveVideo(null); }
      if (e.key === "ArrowRight" && lightbox !== null)
        setLightbox((l) => (l! + 1) % gallery.photos.length);
      if (e.key === "ArrowLeft" && lightbox !== null)
        setLightbox((l) => (l! - 1 + gallery.photos.length) % gallery.photos.length);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox]);

  if (!site.sections.showGallery) return null;

  const photos = gallery.photos;
  const videos = gallery.videos ?? [];

  return (
    <section id="gallery" className="py-16 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal">

          {/* ── Header ── */}
          <div className="text-center mb-10 lg:mb-14">
            <span className="inline-block text-rose-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              {t("gallery.eyebrow")}
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-charcoal-900 mb-4">
              {gallery.heading}
            </h2>
            <p className="text-charcoal-500 max-w-xl mx-auto text-sm sm:text-base">
              {gallery.subheading}
            </p>
            <div className="divider-gold mt-6" />
          </div>

          {/* ── Photo grid ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            {photos.map((photo, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden card-lift group bg-rose-100"
                aria-label={`View ${photo.caption}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-3 sm:p-4">
                  <span className="text-white text-xs sm:text-sm font-medium">{photo.caption}</span>
                </div>
              </button>
            ))}
          </div>

          {/* ── Video section ── */}
          {site.sections.showVideos && videos.length > 0 && (
            <div className="mt-12 lg:mt-16">
              <div className="text-center mb-8">
                <span className="inline-block text-rose-500 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                  Watch Us Work
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal-900">
                  {t("gallery.watchUs")}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {videos.map((video, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden shadow-lg bg-charcoal-900 relative group">
                    {activeVideo === i ? (
                      /* ── YouTube embed (lazy — only loads when tapped) ── */
                      <div className="aspect-video">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      /* ── Tap-to-play thumbnail ── */
                      <button
                        onClick={() => setActiveVideo(i)}
                        className="w-full aspect-video flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-rose-900 via-rose-800 to-charcoal-900 relative overflow-hidden"
                        aria-label={`Play: ${video.title}`}
                      >
                        {/* YouTube thumbnail background */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                          alt={video.title}
                          className="absolute inset-0 w-full h-full object-cover opacity-50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        {/* Play button */}
                        <div className="relative z-10 w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/60 flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-200">
                          <Play size={22} className="text-white ml-1 fill-white" />
                        </div>
                        <div className="relative z-10 text-center px-4">
                          <p className="text-white font-semibold text-sm">{video.title}</p>
                          <p className="text-white/60 text-xs mt-1">{video.caption}</p>
                        </div>
                      </button>
                    )}
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ── Instagram CTA ── */}
          {site.sections.showSocialLinks && (
            <div className="mt-12 lg:mt-16 text-center">
              <div className="inline-flex flex-col items-center gap-4 bg-gradient-to-r from-rose-50 to-gold-50 border border-rose-100 rounded-3xl px-6 sm:px-10 py-7 w-full max-w-sm sm:max-w-none sm:w-auto">
                <InstagramIcon size={32} className="text-rose-500" />
                <div>
                  <p className="font-serif text-lg sm:text-xl font-semibold text-charcoal-900 mb-1">
                    {gallery.instagramCta.text}
                  </p>
                  <p className="text-charcoal-500 text-sm">{gallery.instagramCta.handle}</p>
                </div>
                <a
                  href={gallery.instagramCta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-gold-500 text-white font-medium px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity"
                >
                  <InstagramIcon size={16} />
                  {t("common.followInstagram")}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[80] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => (l! - 1 + photos.length) % photos.length); }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-2xl aspect-square rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              fill
              className="object-contain"
              unoptimized
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-center">
              <p className="text-white text-sm font-medium">{photos[lightbox].caption}</p>
              <p className="text-white/50 text-xs mt-0.5">{lightbox + 1} / {photos.length}</p>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => (l! + 1) % photos.length); }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            aria-label="Next photo"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </section>
  );
}
