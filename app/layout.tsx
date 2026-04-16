import type { Metadata, Viewport } from "next";
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
    telephone: false, // disable auto-linking phone numbers (we handle it ourselves)
  },
  alternates: {
    canonical: site.seo.siteUrl,
  },
};

// LocalBusiness JSON-LD schema — updated with real Tarabai Park coordinates
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
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Google Translate — enables on-the-fly Marathi/Hindi translation of all page content */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'en,mr,hi',
                  autoDisplay: false
                }, 'google_translate_element');
              }

              // Returns true if Google Translate has translated the page
              function __isTranslated() {
                var cls = document.documentElement.className;
                return cls.indexOf('translated-ltr') >= 0 || cls.indexOf('translated-rtl') >= 0;
              }

              // Try to restore original English by clicking GT's own "Show original" button
              // inside its hidden banner iframe — the most reliable no-reload method.
              function __gtRestore() {
                var iframes = document.querySelectorAll('iframe');
                for (var i = 0; i < iframes.length; i++) {
                  try {
                    var d = iframes[i].contentDocument || iframes[i].contentWindow.document;
                    var links = d.querySelectorAll('a');
                    for (var j = 0; j < links.length; j++) {
                      var txt = (links[j].textContent || '') + (links[j].className || '');
                      if (/original|restore/i.test(txt)) {
                        links[j].click();
                        return true;
                      }
                    }
                    // Fallback: first <a> inside the GT banner is usually "Show original"
                    var firstLink = d.querySelector('a');
                    if (firstLink) { firstLink.click(); return true; }
                  } catch(e) {}
                }
                return false;
              }

              // Trigger Google Translate programmatically.
              // Must be called AFTER React re-renders settle (use setTimeout 200ms in callers).
              window.__orchidTranslate = function(langCode) {
                function go(attempts) {
                  var combo = document.querySelector('.goog-te-combo');
                  if (!combo) {
                    if (attempts > 0) setTimeout(function() { go(attempts - 1); }, 300);
                    return;
                  }

                  if (langCode === 'en') {
                    // Step 1 — set combo to empty and fire change (works when GT is cooperative)
                    combo.value = '';
                    ['input', 'change'].forEach(function(type) {
                      combo.dispatchEvent(new Event(type, { bubbles: true, cancelable: true }));
                    });

                    // Step 2 — after a short delay, check if still translated and use banner button
                    setTimeout(function() {
                      if (!__isTranslated()) return; // already restored, done
                      if (__gtRestore()) return;      // banner button worked

                      // Step 3 — last resort: reload (page is natively English, will be fast)
                      setTimeout(function() {
                        if (__isTranslated()) {
                          try { localStorage.setItem('orchid-lang', 'en'); } catch(e) {}
                          window.location.reload();
                        }
                      }, 500);
                    }, 400);

                  } else {
                    // Translate to Marathi / Hindi
                    combo.value = langCode;
                    ['input', 'change'].forEach(function(type) {
                      combo.dispatchEvent(new Event(type, { bubbles: true, cancelable: true }));
                    });
                  }
                }
                go(5);
              };
            `,
          }}
        />
        <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" async />
      </head>
      <body className="antialiased">
        {/* Hidden container required by Google Translate SDK */}
        <div id="google_translate_element" style={{ display: "none" }} />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
