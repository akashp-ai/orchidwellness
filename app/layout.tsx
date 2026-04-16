import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { site } from "./lib/content";
import { LanguageProvider } from "./contexts/LanguageContext";

// Viewport — viewport-fit=cover ensures content fills iPhone notch area
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,       // allow user zoom for accessibility
  userScalable: true,
  viewportFit: "cover",  // iPhone notch / Dynamic Island safe areas
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#B5547A" },
    { media: "(prefers-color-scheme: dark)",  color: "#1B050F" },
  ],
};

export const metadata: Metadata = {
  title: site.seo.defaultTitle,
  description: site.seo.defaultDescription,
  keywords: site.seo.keywords,
  metadataBase: new URL(
    site.seo.siteUrl.startsWith("http") ? site.seo.siteUrl : "https://akashp-ai.github.io"
  ),
  openGraph: {
    title: site.seo.defaultTitle,
    description: site.seo.defaultDescription,
    url: site.seo.siteUrl,
    siteName: site.brand.name,
    images: [{ url: site.seo.ogImage, width: 1200, height: 630, alt: site.brand.name }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.defaultTitle,
    description: site.seo.defaultDescription,
    images: [site.seo.ogImage],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: site.brand.shortName,
  },
  formatDetection: {
    telephone: false,
  },
  alternates: {
    canonical: site.seo.siteUrl,
  },
};

// LocalBusiness JSON-LD schema
const structuredData = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: site.brand.name,
  description: site.brand.description,
  url: site.seo.siteUrl,
  telephone: site.contact.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1}, ${site.address.line2}, ${site.address.area}`,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.pin,
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "16.7112701",
    longitude: "74.2405197",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "11:00",
      closes: "22:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.ratings.score,
    reviewCount: site.ratings.count,
    bestRating: "5",
    worstRating: "1",
  },
  foundingDate: site.brand.establishedYear,
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, UPI, Cards",
  sameAs: [
    site.social.instagram,
    site.social.facebook,
    site.social.justdial,
  ].filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/*
          Cookie helpers + orchidTranslate — defined early so they're available
          synchronously. These functions do NOT touch the DOM; they only read/write
          cookies and localStorage, so they are safe to run in <head>.

          How language switching works:
            1. User clicks a language button in Navigation.tsx
            2. __orchidTranslate(lang) is called
            3. It sets/clears the "googtrans" cookie (/auto/mr, /auto/hi, or cleared)
            4. Page reloads
            5. After React hydration, the GT script loads (strategy="afterInteractive")
            6. GT reads the cookie and translates — hydration is already done, no conflict

          Loading GT *after* hydration (step 5-6) is the key fix for the hydration error.
          Previously the GT script was in <head> and ran before React hydrated, causing
          DOM mismatches.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Declare the GT init callback — must exist before the GT script loads
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'en,mr,hi',
                  autoDisplay: false
                }, 'google_translate_element');
              }

              // Set or clear the googtrans cookie on every relevant domain variant.
              // GT requires the cookie on both "host" and ".host" to be picked up reliably.
              function __gtCookie(value) {
                var host = window.location.hostname;
                var domains = [host, '.' + host];
                var expiry = value ? '' : '; expires=Thu, 01 Jan 1970 00:00:00 UTC';
                var base = value ? ('googtrans=' + value) : 'googtrans=';
                domains.forEach(function(d) {
                  document.cookie = base + expiry + '; path=/; domain=' + d;
                });
                document.cookie = base + expiry + '; path=/'; // fallback (localhost)
              }

              // On every fresh page load (including user-initiated refresh), clear the
              // googtrans cookie and reset to English. Language selection is intentionally
              // session-only: user picks a language, page reloads into that language,
              // but a manual refresh always brings back clean English.
              //
              // How we distinguish a language-switch reload from a user refresh:
              //   __orchidTranslate() sets sessionStorage.__orchidLang before reloading.
              //   On the next load we check for it — if present it's our reload (keep the
              //   selected language), if absent it's a real refresh (clear to English).
              (function syncLangState() {
                var pending = '';
                try { pending = sessionStorage.getItem('__orchidLang') || ''; } catch(e) {}

                if (pending === 'mr' || pending === 'hi') {
                  // This is our own language-switch reload — keep the cookie intact
                  // and update the React language state to match.
                  try { localStorage.setItem('orchid-lang', pending); } catch(e) {}
                  try { sessionStorage.removeItem('__orchidLang'); } catch(e) {}
                } else {
                  // Real refresh (or first load) — clear everything, show English
                  __gtCookie(null);
                  try { localStorage.setItem('orchid-lang', 'en'); } catch(e) {}
                  try { sessionStorage.removeItem('__orchidLang'); } catch(e) {}
                }
              })();

              // Called by the React language buttons (Navigation.tsx).
              //
              // DEBOUNCED + LAST-CLICK-WINS:
              //   • Cookie is updated on EVERY click immediately, so the last language
              //     clicked is always the one that gets applied — no race conditions.
              //   • The actual reload only fires 500ms after the LAST click.
              //   • If the user clicks mr → hi → en rapidly, only one reload happens
              //     and it loads English (the last-clicked language).
              //   • Once reload is triggered, all lang buttons are pointer-locked so
              //     no extra clicks can queue another reload mid-navigation.
              var __orchidPending = null;

              window.__orchidTranslate = function(langCode) {
                // Cancel any queued reload — latest click takes over
                if (__orchidPending) {
                  clearTimeout(__orchidPending);
                  __orchidPending = null;
                }

                // Apply cookie immediately (last click wins)
                if (langCode === 'en') {
                  __gtCookie(null);
                  try { sessionStorage.removeItem('__orchidLang'); } catch(e) {}
                } else {
                  __gtCookie('/auto/' + langCode);
                  // Mark sessionStorage so syncLangState knows this reload is ours
                  // (not a user-initiated refresh) and keeps the translation.
                  try { sessionStorage.setItem('__orchidLang', langCode); } catch(e) {}
                }
                try { localStorage.setItem('orchid-lang', langCode); } catch(e) {}

                // Debounce: wait 500ms of silence before reloading
                __orchidPending = setTimeout(function() {
                  // Lock all language buttons to prevent clicks during reload
                  document.querySelectorAll('[data-lang-btn]').forEach(function(b) {
                    b.style.pointerEvents = 'none';
                    b.style.opacity = '0.5';
                  });
                  window.location.reload();
                }, 500);
              };
            `,
          }}
        />
      </head>

      {/*
        suppressHydrationWarning on <body>: GT adds class/style attributes to <body>
        after hydration which would otherwise produce a warning. This suppresses it.
      */}
      <body className="antialiased" suppressHydrationWarning>
        {/* Hidden container required by Google Translate SDK */}
        <div id="google_translate_element" style={{ display: "none" }} />

        <LanguageProvider>
          {children}
        </LanguageProvider>

        {/*
          strategy="afterInteractive": Next.js loads this script AFTER React hydration
          completes. This is the critical fix — GT can now modify the DOM safely without
          conflicting with React's hydration reconciliation.
        */}
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
