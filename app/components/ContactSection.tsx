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

  const waLink = `https://wa.me/${site.contact.whatsapp}?text=Hi%20Orchid%20Salon!%20I%20would%20like%20to%20book%20an%20appointment.`;

  return (
    <section id="contact" className="py-16 lg:py-20 bg-cream-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="reveal">

          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block text-rose-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              {t("contact.eyebrow")}
            </span>
            <h2 className="font-serif text-5xl md:text-6xl font-semibold text-charcoal-900 mb-4">
              {t("contact.heading")}
            </h2>
            <p className="text-charcoal-500 max-w-xl mx-auto">
              {t("contact.subheading")}
            </p>
            <div className="divider-gold mt-6" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">

            {/* ── Left: Contact cards ── */}
            <div className="space-y-4">

              {/* Call */}
              <a
                href={`tel:${site.contact.phonePrimary}`}
                className="flex items-start justify-start gap-4 bg-white rounded-2xl p-5 border border-cream-300 card-lift group w-full"
              >
                <div className="w-11 h-11 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-500 transition-colors">
                  <Phone size={18} className="text-rose-500 group-hover:text-white transition-colors" />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs text-charcoal-400 font-medium uppercase tracking-wider mb-1">
                    {t("contact.callUs")}
                  </div>
                  <div className="font-serif text-base font-semibold text-charcoal-900">
                    {site.contact.phone}
                  </div>
                  <div className="text-xs text-charcoal-400 mt-0.5">{t("contact.tapToCall")}</div>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start justify-start gap-4 bg-white rounded-2xl p-5 border border-cream-300 card-lift group w-full"
              >
                <div className="w-11 h-11 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366] transition-colors">
                  <WhatsAppIcon size={18} className="text-[#25D366] group-hover:text-white transition-colors" />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs text-charcoal-400 font-medium uppercase tracking-wider mb-1">
                    {t("contact.whatsappUs")}
                  </div>
                  <div className="font-serif text-base font-semibold text-charcoal-900">{site.contact.whatsapp.replace(/^91/, "+91 ")}</div>
                  <div className="text-xs text-charcoal-400 mt-0.5">{t("contact.quickReplies")}</div>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-start justify-start gap-4 bg-white rounded-2xl p-5 border border-cream-300 card-lift group w-full"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500 transition-colors">
                  <Mail size={18} className="text-blue-500 group-hover:text-white transition-colors" />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs text-charcoal-400 font-medium uppercase tracking-wider mb-1">
                    {t("contact.emailUs")}
                  </div>
                  <div className="font-serif text-sm font-semibold text-charcoal-900 break-all leading-snug">
                    {site.contact.email}
                  </div>
                  <div className="text-xs text-charcoal-400 mt-0.5">{t("contact.replyTime")}</div>
                </div>
              </a>

              {/* Address */}
              <div className="bg-white rounded-2xl p-6 border border-cream-300">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gold-50 border border-gold-100 flex items-center justify-center flex-shrink-0">
                    <MapPin size={22} className="text-gold-500" />
                  </div>
                  <div>
                    <div className="text-xs text-charcoal-400 font-medium uppercase tracking-wider mb-1">
                      {t("contact.addressLabel")}
                    </div>
                    <div className="font-serif text-base font-semibold text-charcoal-900 mb-1">
                      {site.brand.name}
                    </div>
                    <p className="text-charcoal-500 text-sm leading-relaxed">
                      {site.address.line1},<br />
                      {site.address.line2},<br />
                      {site.address.area}, {site.address.city}<br />
                      {site.address.state} — {site.address.pin}
                    </p>
                    <a
                      href={site.address.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 text-sm text-rose-500 font-medium hover:text-rose-700 transition-colors"
                    >
                      <Navigation size={14} />
                      {t("contact.getDirections")}
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-2xl p-6 border border-cream-300">
                <div className="flex items-center gap-3 mb-4">
                  <Clock size={20} className="text-gold-500" />
                  <h3 className="font-serif font-semibold text-charcoal-900">
                    {t("contact.hoursLabel")}
                  </h3>
                </div>
                <div className="space-y-2">
                  {site.timings.displayRows.map((row) => (
                    <div key={row.days} className="flex justify-between text-sm">
                      <span className="text-charcoal-600">{row.days}</span>
                      <span className="text-charcoal-900 font-medium">{row.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social links */}
              {site.sections.showSocialLinks && (
                <div className="bg-white rounded-2xl p-6 border border-cream-300">
                  <h3 className="font-serif font-semibold text-charcoal-900 mb-4">
                    {t("contact.followLabel")}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {/* Instagram — official purple→pink→orange gradient */}
                    <a
                      href={site.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white px-4 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                      style={{ background: "linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)" }}
                    >
                      <InstagramIcon size={15} />
                      Instagram
                    </a>
                    {/* Facebook — official brand blue */}
                    <a
                      href={site.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white px-4 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: "#1877F2" }}
                    >
                      <FacebookIcon size={15} />
                      Facebook
                    </a>
                    {/* WhatsApp — official brand green */}
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white px-4 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: "#25D366" }}
                    >
                      <WhatsAppIcon size={15} />
                      WhatsApp
                    </a>
                    {site.social.justdial && (
                      <a
                        href={site.social.justdial}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white px-4 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: "#F26522" }}
                      >
                        <JustDialIcon size={15} className="text-white" />
                        JustDial
                      </a>
                    )}
                    {site.social.googleReviews && (
                      <a
                        href={site.social.googleReviews}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-white border border-gray-200 text-charcoal-700 px-4 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
                      >
                        <GoogleIcon size={15} />
                        Google Reviews
                        <ExternalLink size={11} className="opacity-40" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ── Right: Map + booking CTA ── */}
            <div className="flex flex-col gap-6">
              {site.sections.showMap && (
                <div className="rounded-3xl overflow-hidden border border-cream-300 shadow-lg">
                  <iframe
                    src={site.address.mapEmbedUrl}
                    width="100%"
                    height="450"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Orchid Unisex Salon & Spa on Google Maps"
                  />
                </div>
              )}

              {/* Booking CTA card */}
              <div className="bg-gradient-to-br from-rose-500 to-rose-700 rounded-2xl p-7 text-center">
                <h3 className="font-serif text-2xl font-semibold text-white mb-2">
                  {t("contact.readyToBook")}
                </h3>
                <p className="text-white/70 text-sm mb-5">
                  {t("contact.readySubtext")}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`tel:${site.contact.phonePrimary}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-white text-rose-600 font-semibold py-3 rounded-xl text-sm hover:bg-cream-100 transition-colors"
                  >
                    <Phone size={16} />
                    {t("common.callNow")}
                  </a>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-xl text-sm hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: "#25D366" }}
                  >
                    <WhatsAppIcon size={16} />
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
