"use client";

import { Phone, MapPin, Clock } from "lucide-react";
import { InstagramIcon, FacebookIcon, WhatsAppIcon, JustDialIcon, GoogleIcon } from "./SocialIcons";
import Logo from "./Logo";
import { site } from "../lib/content";
import { useLanguage } from "../contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const waLink = `https://wa.me/${site.contact.whatsapp}?text=Hi%20Orchid%20Saloon%20and%20Spa%2C%20I%20would%20like%20to%20make%20an%20appointment.`;

  const navLinks = [
    { key: "nav.home",     href: "#home"     },
    { key: "nav.services", href: "#services" },
    { key: "nav.about",    href: "#founder"  },
    { key: "nav.gallery",  href: "#gallery"  },
    { key: "nav.reviews",  href: "#reviews"  },
    { key: "nav.contact",  href: "#contact"  },
  ];

  return (
    <footer className="bg-charcoal-900 text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-10 pb-5">

        {/* ── Main grid: Brand | Nav | Contact + Hours ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">

          {/* Brand — full width on mobile, 1 col on md+ */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3">
              <Logo variant="footer" showTagline />
            </div>
            <p className="text-charcoal-400 text-xs leading-relaxed mb-4">
              {site.brand.description}
            </p>
            {site.sections.showSocialLinks && (
              <div className="flex gap-2 flex-wrap">
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-all hover:scale-110"
                  onMouseEnter={e => (e.currentTarget.style.background = "linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                  aria-label="Instagram">
                  <InstagramIcon size={15} />
                </a>
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1877F2] flex items-center justify-center transition-all hover:scale-110" aria-label="Facebook">
                  <FacebookIcon size={15} />
                </a>
                <a href={`https://wa.me/${site.contact.whatsapp}?text=Hi%20Orchid%20Saloon%20and%20Spa%2C%20I%20would%20like%20to%20make%20an%20appointment.`} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center transition-all hover:scale-110" aria-label="WhatsApp">
                  <WhatsAppIcon size={15} />
                </a>
                {site.social.justdial && (
                  <a href={site.social.justdial} target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-all hover:scale-110"
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#F26522")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
                    aria-label="JustDial">
                    <JustDialIcon size={15} />
                  </a>
                )}
                {site.social.googleReviews && (
                  <a href={site.social.googleReviews} target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-charcoal-800 flex items-center justify-center transition-all hover:scale-110" aria-label="Google Reviews">
                    <GoogleIcon size={15} />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Navigation — 2-column grid of links */}
          <div>
            <h3 className="font-serif text-xs font-semibold text-white uppercase tracking-wider mb-3">
              {t("footer.navigation")}
            </h3>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-charcoal-400 hover:text-gold-400 text-xs transition-colors">
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-xs font-semibold text-white uppercase tracking-wider mb-3">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href={`tel:${site.contact.phonePrimary}`}
                  className="flex items-center gap-1.5 text-charcoal-400 hover:text-gold-400 text-xs transition-colors">
                  <Phone size={12} className="flex-shrink-0" />
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a href={waLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-charcoal-400 hover:text-[#25D366] text-xs transition-colors">
                  <WhatsAppIcon size={12} className="flex-shrink-0" />
                  {t("common.whatsapp")}
                </a>
              </li>
              <li className="flex items-start gap-1.5 text-charcoal-400 text-xs">
                <MapPin size={12} className="flex-shrink-0 mt-0.5" />
                <span>{site.address.line2}, {site.address.area}, {site.address.city}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-serif text-xs font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Clock size={12} />
              {t("footer.hours")}
            </h3>
            <ul className="space-y-1.5">
              {site.timings.displayRows.map((row) => (
                <li key={row.days} className="text-xs">
                  <span className="text-charcoal-500">{row.days}</span>
                  <br />
                  <span className="text-charcoal-300 font-medium">{row.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-4 text-center text-[11px] text-charcoal-500 space-y-0.5">
          <p>© {new Date().getFullYear()} {site.brand.name}. {t("footer.allRights")}</p>
          {site.credits?.enabled && (
            site.credits.link ? (
              <a href={site.credits.link} target="_blank" rel="noopener noreferrer"
                className="block text-[11px] text-charcoal-500 hover:text-charcoal-400 transition-colors">
                {site.credits.text}
              </a>
            ) : (
              <p className="text-[11px] text-charcoal-500">{site.credits.text}</p>
            )
          )}
        </div>
      </div>
    </footer>
  );
}
