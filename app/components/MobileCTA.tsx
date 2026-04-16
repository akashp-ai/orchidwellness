"use client";

import { Phone, MessageCircle, Navigation } from "lucide-react";
import { site } from "../lib/content";
import { useLanguage } from "../contexts/LanguageContext";

export default function MobileCTA() {
  const { t } = useLanguage();
  const waLink = `https://wa.me/${site.contact.whatsapp}?text=Hi%20Orchid%20Salon!%20I%20would%20like%20to%20book%20an%20appointment.`;
  const mapsLink = site.address.googleMapsUrl;

  return (
    <div className="mobile-cta-bar fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="bg-white border-t border-rose-100 shadow-2xl px-4 py-3 grid grid-cols-3 gap-2">
        {/* Call */}
        <a
          href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
          className="flex flex-col items-center gap-1 bg-rose-500 text-white rounded-xl py-2.5 hover:bg-rose-600 active:scale-95 transition-all"
        >
          <Phone size={20} />
          <span className="text-[11px] font-medium">{t("mobileCta.call")}</span>
        </a>

        {/* WhatsApp */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 bg-green-500 text-white rounded-xl py-2.5 hover:bg-green-600 active:scale-95 transition-all"
        >
          <MessageCircle size={20} />
          <span className="text-[11px] font-medium">{t("mobileCta.whatsapp")}</span>
        </a>

        {/* Directions */}
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 bg-gold-400 text-charcoal-900 rounded-xl py-2.5 hover:bg-gold-500 active:scale-95 transition-all"
        >
          <Navigation size={20} />
          <span className="text-[11px] font-medium">{t("mobileCta.directions")}</span>
        </a>
      </div>
    </div>
  );
}
