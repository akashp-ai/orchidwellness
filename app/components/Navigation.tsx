"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { site } from "../lib/content";
import { useLanguage, LANGUAGES } from "../contexts/LanguageContext";
import Logo from "./Logo";

/** Call Google Translate SDK programmatically after React re-renders settle */
function triggerGoogleTranslate(langCode: string) {
  setTimeout(() => {
    if (typeof window === "undefined") return;
    const w = window as Window & { __orchidTranslate?: (lang: string) => void };
    w.__orchidTranslate?.(langCode);
  }, 200);
}

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { key: "nav.home",     href: "#home"     },
    { key: "nav.services", href: "#services" },
    { key: "nav.about",    href: "#founder"  },
    { key: "nav.gallery",  href: "#gallery"  },
    { key: "nav.reviews",  href: "#reviews"  },
    { key: "nav.contact",  href: "#contact"  },
  ];

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-glass ${
        scrolled
          ? "bg-white/92 shadow-sm border-b border-rose-100"
          : "bg-gradient-to-b from-black/40 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">

          {/* ── Logo ── */}
          <button onClick={() => handleNavClick("#home")} className="flex-shrink-0">
            <Logo variant="nav" scrolled={scrolled} />
          </button>

          {/* ── Desktop Nav links ── */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                  scrolled
                    ? "text-charcoal-700 hover:text-rose-500"
                    : "text-white/90 hover:text-gold-300 drop-shadow-sm"
                }`}
              >
                {t(link.key)}
              </button>
            ))}
          </nav>

          {/* ── Desktop right: language switcher + CTA ── */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {/* Language switcher — calls Google Translate for on-the-fly translation */}
            <div className={`flex items-center rounded-full overflow-hidden border ${scrolled ? "border-cream-300 bg-white/60" : "border-white/30 bg-white/10"} backdrop-blur-sm`}>
              {LANGUAGES.map((lang, i) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    const code = lang.code;
                    setLanguage(code);
                    triggerGoogleTranslate(code);
                  }}
                  title={lang.full}
                  className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                    i < LANGUAGES.length - 1 ? `border-r ${scrolled ? "border-cream-300" : "border-white/20"}` : ""
                  } ${
                    language === lang.code
                      ? "bg-rose-500 text-white"
                      : scrolled
                        ? "text-charcoal-500 hover:text-charcoal-800 hover:bg-cream-100"
                        : "text-white/80 hover:text-white hover:bg-white/15"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Call CTA */}
            <a
              href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 shadow-sm"
            >
              <Phone size={15} />
              <span>{t("common.callNow")}</span>
            </a>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? "text-charcoal-800 hover:bg-rose-50" : "text-white hover:bg-white/15"}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-rose-100 px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left text-base py-3.5 px-4 rounded-xl text-charcoal-800 hover:bg-rose-50 hover:text-rose-500 transition-colors font-medium"
            >
              {t(link.key)}
            </button>
          ))}

          {/* Language switcher in mobile menu */}
          <div className="mt-3 pt-3 border-t border-cream-300">
            <p className="text-xs text-charcoal-400 font-medium uppercase tracking-wider mb-2 px-4">
              Language
            </p>
            <div className="flex gap-2 px-4">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    const code = lang.code;
                    setLanguage(code);
                    setMenuOpen(false);
                    triggerGoogleTranslate(code);
                  }}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    language === lang.code
                      ? "bg-rose-500 text-white"
                      : "bg-cream-100 text-charcoal-700 hover:bg-cream-200"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <a
            href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
            className="mt-3 flex items-center justify-center gap-2 bg-rose-500 text-white py-3.5 rounded-xl font-semibold text-base hover:bg-rose-600 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            <Phone size={16} />
            {t("common.callNow")}
          </a>
        </div>
      </div>
    </header>
  );
}
