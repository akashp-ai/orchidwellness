"use client";

import { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import { site, offers } from "../lib/content";
import { useLanguage } from "../contexts/LanguageContext";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const dismissed = sessionStorage.getItem("orchid-offer-dismissed");
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem("orchid-offer-dismissed", "1");
  };

  const bar = offers.announcementBar;
  if (!site.sections.showOffers || !bar.enabled || !visible) return null;

  return (
    <div className="relative z-[70] bg-gradient-to-r from-rose-600 via-rose-500 to-gold-500 text-white">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-3 pr-10 text-center">
        <Sparkles size={13} className="flex-shrink-0 opacity-80" />
        {bar.badge && (
          <span className="hidden sm:inline-flex items-center bg-white/20 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full tracking-wide">
            {bar.badge}
          </span>
        )}
        <span className="text-sm font-medium leading-snug">{bar.text}</span>
        {bar.ctaText && (
          <a
            href={bar.ctaHref || "#contact"}
            onClick={(e) => {
              if ((bar.ctaHref || "#contact").startsWith("#")) {
                e.preventDefault();
                document
                  .getElementById((bar.ctaHref || "#contact").slice(1))
                  ?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="hidden sm:inline text-xs font-bold underline underline-offset-2 hover:no-underline whitespace-nowrap"
          >
            {bar.ctaText} →
          </a>
        )}
      </div>
      <button
        onClick={dismiss}
        aria-label={t("announcement.dismiss")}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-white/20 transition-colors"
      >
        <X size={13} />
      </button>
    </div>
  );
}
