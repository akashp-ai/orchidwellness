"use client";

import { useEffect, useRef } from "react";
import { Phone, MapPin, Clock, Navigation, Mail, ExternalLink } from "lucide-react";
import { InstagramIcon, FacebookIcon, WhatsAppIcon, JustDialIcon, GoogleIcon } from "./SocialIcons";
import { site } from "../lib/content";
import { useLanguage } from "../contexts/LanguageContext";

export default function ContactSection() {
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

  const waLink = `https://wa.me/${site.contact.whatsapp}?text=Hi%20Orchid%20Saloon%20and%20Spa%2C%20I%20would%20like%20to%20make%20an%20appointment.`;

  return (
    <section id="contact" className="py-12 lg:py-16 bg-cream-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal">

          {/* Header */}
          <div className="text-center mb-7">
            <span className="inline-block text-rose-500 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              {t("contact.eyebrow")}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-charcoal-900 mb-2">
              {t("contact.heading")}
            </h2>
            <p className="text-charcoal-500 text-sm max-w-xl mx-auto">
              {t("contact.subheading")}
            </p>
            <div className="divider-gold mt-4" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            {/* ── Left: Contact cards ── */}
            <div className="space-y-3">

              {/* Call */}
              <a
                href={`tel:${site.contact.phonePrimary}`}
                className="flex items-center gap-3 bg-white rounded-xl p-3.5 border border-cream-300 card-lift group w-full"
              >
                <div className="w-9 h-9 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-500 transition-colors">
                  <Phone size={16} className="text-rose-500 group-hover:text-white transition-colors" />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs text-charcoal-400 font-medium uppercase tracking-wider leading-none mb-0.5">
                    {t("contact.callUs")}
                  </div>
                  <div className="font-serif text-sm font-semibold text-charcoal-900">
                    {site.contact.phone}
                  </div>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white rounded-xl p-3.5 border border-cream-300 card-lift group w-full"
              >
                <div className="w-9 h-9 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366] transition-colors">
                  <WhatsAppIcon size={16} className="text-[#25D366] group-hover:text-white transition-colors" />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs text-charcoal-400 font-medium uppercase tracking-wider leading-none mb-0.5">
                    {t("contact.whatsappUs")}
                  </div>
                  <div className="font-serif text-sm font-semibold text-charcoal-900">{site.contact.whatsapp.replace(/^91/, "+91 ")}</div>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-3 bg-white rounded-xl p-3.5 border border-cream-300 card-lift group w-full"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500 transition-colors">
                  <Mail size={16} className="text-blue-500 group-hover:text-white transition-colors" />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs text-charcoal-400 font-medium uppercase tracking-wider leading-none mb-0.5">
                    {t("contact.emailUs")}
                  </div>
                  <div className="font-serif text-xs font-semibold text-charcoal-900 break-all">
                    {site.contact.email}
                  </div>
                </div>
              </a>

              {/* Address + Hours — combined row on desktop */}
              <div className="grid sm:grid-cols-2 gap-3">
                {/* Address */}
                <div className="bg-white rounded-xl p-4 border border-cream-300">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gold-50 border border-gold-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin size={15} className="text-gold-500" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-charcoal-400 font-medium uppercase tracking-wider mb-1">
                        {t("contact.addressLabel")}
                      </div>
                      <p className="text-charcoal-500 text-xs leading-relaxed">
                        {site.address.line2},<br />
                        {site.address.area}, {site.address.city}<br />
                        {site.address.state} — {site.address.pin}
                      </p>
                      <a
                        href={site.address.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-xs text-rose-500 font-medium hover:text-rose-700 transition-colors"
                      >
                        <Navigation size={11} />
                        {t("contact.getDirections")}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="bg-white rounded-xl p-4 border border-cream-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={15} className="text-gold-500" />
                    <h3 className="font-serif font-semibold text-charcoal-900 text-sm">
                      {t("contact.hoursLabel")}
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {site.timings.displayRows.map((row) => (
                      <div key={row.days} className="flex justify-between text-xs">
                        <span className="text-charcoal-600">{row.days}</span>
                        <span className="text-charcoal-900 font-medium">{row.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social links */}
              {site.sections.showSocialLinks && (
                <div className="bg-white rounded-xl p-4 border border-cream-300">
                  <h3 className="font-serif font-semibold text-charcoal-900 text-sm mb-3">
                    {t("contact.followLabel")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <a href={site.social.instagram} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:opacity-90 transition-opacity"
                      style={{ background: "linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)" }}>
                      <InstagramIcon size={13} /> Instagram
                    </a>
                    <a href={site.social.facebook} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: "#1877F2" }}>
                      <FacebookIcon size={13} /> Facebook
                    </a>
                    <a href={waLink} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: "#25D366" }}>
                      <WhatsAppIcon size={13} /> WhatsApp
                    </a>
                    {site.social.justdial && (
                      <a href={site.social.justdial} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: "#F26522" }}>
                        <JustDialIcon size={13} className="text-white" /> JustDial
                      </a>
                    )}
                    {site.social.googleReviews && (
                      <a href={site.social.googleReviews} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 bg-white border border-gray-200 text-charcoal-700 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-gray-50 transition-colors shadow-sm">
                        <GoogleIcon size={13} /> Google Reviews
                        <ExternalLink size={10} className="opacity-40" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ── Right: Map + booking CTA ── */}
            <div className="flex flex-col gap-4">
              {site.sections.showMap && (
                <div className="rounded-2xl overflow-hidden border border-cream-300 shadow-lg">
                  <iframe
                    src={site.address.mapEmbedUrl}
                    width="100%"
                    height="280"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Orchid Unisex Salon & Spa on Google Maps"
                  />
                </div>
              )}

              {/* Booking CTA card */}
              <div className="bg-gradient-to-br from-rose-500 to-rose-700 rounded-2xl p-5 text-center">
                <h3 className="font-serif text-xl font-semibold text-white mb-1">
                  {t("contact.readyToBook")}
                </h3>
                <p className="text-white/70 text-xs mb-4">
                  {t("contact.readySubtext")}
                </p>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={`tel:${site.contact.phonePrimary}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-white text-rose-600 font-semibold py-2.5 rounded-xl text-sm hover:bg-cream-100 transition-colors"
                  >
                    <Phone size={15} />
                    {t("common.callNow")}
                  </a>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 text-white font-semibold py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: "#25D366" }}
                  >
                    <WhatsAppIcon size={15} />
                    {t("common.whatsapp")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
