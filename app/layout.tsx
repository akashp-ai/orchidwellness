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

              // Trigger Google Translate programmatically.
              // Must be called AFTER React re-renders settle (use setTimeout 200ms in callers).
              window.__orchidTranslate = function(langCode) {
                function triggerSelect(attempts) {
                  var el = document.querySelector('.goog-te-combo');
                  if (!el) {
                    // Widget not ready yet — retry up to 5 times
                    if (attempts > 0) setTimeout(function() { triggerSelect(attempts - 1); }, 300);
                    return;
                  }
                  var value = langCode === 'en' ? '' : langCode;
                  el.value = value;
                  // Fire both input and change events with bubbling for maximum compatibility
                  ['input', 'change'].forEach(function(type) {
                    el.dispatchEvent(new Event(type, { bubbles: true, cancelable: true }));
                  });
                }
                triggerSelect(5);
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
