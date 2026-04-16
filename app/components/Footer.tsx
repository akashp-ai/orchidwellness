"use client";

import { Phone, MapPin, Clock } from "lucide-react";
import { InstagramIcon, FacebookIcon, WhatsAppIcon, JustDialIcon, GoogleIcon } from "./SocialIcons";
import Logo from "./Logo";
import { site } from "../lib/content";
import { useLanguage } from "../contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const waLink = `https://wa.me/${site.contact.whatsapp}?text=Hi%20Orchid%20Salon!%20I%20would%20like%20to%20book%20an%20appointment.`;

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
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Logo variant="footer" showTagline />
            </div>
            <p className="text-charcoal-400 text-sm leading-relaxed mb-5">{site.brand.description}</p>
            {site.sections.showSocialLinks && (
              <div className="flex gap-3 flex-wrap">
                {/* Instagram */}
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center transition-all hover:scale-110"
                  style={{ /* Instagram gradient on hover handled via group or inline */ }}
                  onMouseEnter={e => (e.currentTarget.style.background = "linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                  aria-label="Instagram">
                  <InstagramIcon size={16} />
                </a>
                {/* Facebook — official #1877F2 */}
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#1877F2] flex items-center justify-center transition-all hover:scale-110" aria-label="Facebook">
                  <FacebookIcon size={16} />
                </a>
                {/* WhatsApp — official #25D366 */}
                <a href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center transition-all hover:scale-110" aria-label="WhatsApp">
                  <WhatsAppIcon size={16} />
                </a>
                {site.social.justdial && (
                  <a href={site.social.justdial} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center transition-all hover:scale-110"
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#FF6600")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
                    aria-label="JustDial">
                    <JustDialIcon size={16} />
                  </a>
                )}
                {site.social.googleReviews && (
                  <a href={site.social.googleReviews} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-charcoal-800 flex items-center justify-center transition-all hover:scale-110" aria-label="Google Reviews">
                    <GoogleIcon size={16} />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-5">
              {t("footer.navigation")}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-charcoal-400 hover:text-gold-400 text-sm transition-colors">
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-5">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${site.contact.phonePrimary}`}
                  className="flex items-center gap-2 text-charcoal-400 hover:text-gold-400 text-sm transition-colors">
                  <Phone size={14} />
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a href={waLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-charcoal-400 hover:text-[#25D366] text-sm transition-colors">
                  <WhatsAppIcon size={14} />
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-start gap-2 text-charcoal-400 text-sm">
                <MapPin size={14} className="flex-shrink-0 mt-0.5" />
                <span>{site.address.line2}, {site.address.area}, {site.address.city}, {site.address.state}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <Clock size={14} />
              {t("footer.hours")}
            </h3>
            <ul className="space-y-2">
              {site.timings.displayRows.map((row) => (
                <li key={row.days} className="flex flex-col text-sm">
                  <span className="text-charcoal-500 text-xs">{row.days}</span>
                  <span className="text-charcoal-300 font-medium">{row.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 text-center text-xs text-charcoal-500 space-y-1.5">
          <p>© {new Date().getFullYear()} {site.brand.name}. {t("footer.allRights")}</p>
          {site.credits?.enabled && (
            site.credits.link ? (
              <a
                href={site.credits.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-charcoal-500 hover:text-charcoal-400 transition-colors"
              >
                {site.credits.text}
              </a>
            ) : (
              <p className="text-xs text-charcoal-500">{site.credits.text}</p>
            )
          )}
        </div>
      </div>
    </footer>
  );
}
