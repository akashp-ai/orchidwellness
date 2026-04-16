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
        {/* Google Translate — cookie-based language switching
            How it works:
              • The "googtrans" cookie (/auto/mr, /auto/hi) tells GT which language
                to apply when the page loads. Clearing it = back to English.
              • We set/clear that cookie then reload. Each page load is a clean,
                fully-translated state with zero leftover text from a previous language.
              • autoDisplay:false hides the Google toolbar but translation still applies. */}
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

              // Set or clear the googtrans cookie on all domain variants.
              // Must cover both "example.com" and ".example.com" for GT to see it.
              function __gtCookie(value) {
                var host = window.location.hostname;
                var domains = [host, '.' + host];
                var expiry = value
                  ? ''
                  : '; expires=Thu, 01 Jan 1970 00:00:00 UTC';
                var base = value ? ('googtrans=' + value) : 'googtrans=';
                domains.forEach(function(d) {
                  document.cookie = base + expiry + '; path=/; domain=' + d;
                });
                // Also set without explicit domain (covers localhost & edge cases)
                document.cookie = base + expiry + '; path=/';
              }

              // Sync localStorage with the actual googtrans cookie so the React
              // language buttons show the correct active state after a reload.
              (function syncLangState() {
                var m = document.cookie.match(/(?:^|;\\s*)googtrans=\\/[^/]+\\/([^;]+)/);
                var gtLang = m ? m[1] : 'en';
                var lang = (gtLang === 'mr' || gtLang === 'hi') ? gtLang : 'en';
                try { localStorage.setItem('orchid-lang', lang); } catch(e) {}
              })();

              // Called by the React language buttons.
              // Sets/clears the googtrans cookie then reloads — guarantees a fully
              // translated (or fully English) page with no partial DOM artifacts.
              window.__orchidTranslate = function(langCode) {
                try { localStorage.setItem('orchid-lang', langCode); } catch(e) {}
                if (langCode === 'en') {
                  __gtCookie(null);          // clear cookie → GT skips translation
                } else {
                  __gtCookie('/auto/' + langCode); // set cookie → GT auto-translates
                }
                window.location.reload();
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
