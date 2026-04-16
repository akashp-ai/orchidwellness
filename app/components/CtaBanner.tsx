"use client";

import { Phone } from "lucide-react";
import { WhatsAppIcon } from "./SocialIcons";
import { home, site } from "../lib/content";
import { useLanguage } from "../contexts/LanguageContext";

export default function CtaBanner() {
  const { t } = useLanguage();
  const waLink = `https://wa.me/${site.contact.whatsapp}?text=Hi%20Orchid%20Salon!%20I%20would%20like%20to%20book%20an%20appointment.`;

  return (
    <section className="py-16 bg-gradient-to-r from-rose-500 via-rose-500 to-gold-500 relative overflow-hidden">
      {/* Decorative dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                            radial-gradient(circle at 80% 50%, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">
          {home.ctaBanner.heading}
        </h2>
        <p className="text-white/80 text-base md:text-lg mb-8">
          {home.ctaBanner.subheading}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-rose-600 font-semibold px-8 py-4 rounded-full text-base hover:bg-cream-100 transition-colors shadow-md"
          >
            <Phone size={18} />
            {t("common.callNow")}
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-full text-base transition-opacity hover:opacity-90 shadow-md"
            style={{ backgroundColor: "#25D366" }}
          >
            <WhatsAppIcon size={18} />
            {t("common.whatsapp")}
          </a>
        </div>
      </div>
    </section>
  );
}
