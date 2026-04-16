# Orchid Unisex Salon & Spa — Website

A modern, mobile-first website for **Orchid Unisex Salon & Spa**, Tarabai Park, Kolhapur.
Built with Next.js 14, Tailwind CSS, and deployed to GitHub Pages.

**Live:** [https://akashp-ai.github.io/orchidwellness](https://akashp-ai.github.io/orchidwellness)

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Getting Started (Local Dev)](#getting-started-local-dev)
4. [Content Management — No Code Required](#content-management--no-code-required)
   - [site.json — Master Config](#sitejson--master-config)
   - [home.json — Hero & Intro](#homejson--hero--intro)
   - [services.json — Service Catalogue](#servicesjson--service-catalogue)
   - [offers.json — Special Offers](#offersjson--special-offers)
   - [founder.json — Founder Bio](#founderjson--founder-bio)
   - [gallery.json — Photos & Videos](#galleryjson--photos--videos)
   - [reviews.json — Testimonials](#reviewsjson--testimonials)
   - [translations/en.json — UI Labels](#translationsenjson--ui-labels)
5. [Section Toggles](#section-toggles)
6. [Replacing Images & Media](#replacing-images--media)
7. [Multilingual Support](#multilingual-support)
8. [Inquiry Form Setup (Google Sheets)](#inquiry-form-setup-google-sheets)
9. [Deployment to GitHub Pages](#deployment-to-github-pages)
10. [Architecture Notes](#architecture-notes)
11. [Custom Domain (Optional)](#custom-domain-optional)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router, static export) |
| Styling | Tailwind CSS with custom design tokens |
| Fonts | Playfair Display (headings) + Inter (body) via Google Fonts |
| Icons | Lucide React + custom SVG social icons |
| Images | Next.js `<Image>` (`unoptimized` for static export) |
| Translations | Google Translate SDK — on-the-fly EN → MR / HI |
| Form backend | Google Apps Script Web App (free, saves to Google Sheets) |
| Hosting | GitHub Pages (free) |
| CI/CD | GitHub Actions — auto-deploys on every push to `master` |

---

## Project Structure

```
orchidwellness/
├── app/
│   ├── components/           # All React UI components
│   │   ├── Navigation.tsx    # Top nav bar + language switcher (EN/MR/HI)
│   │   ├── AnnouncementBar.tsx  # Top announcement strip (toggled from offers.json)
│   │   ├── Hero.tsx          # Full-screen hero section
│   │   ├── IntroSection.tsx  # Stats row + intro text
│   │   ├── ServicesSection.tsx  # Tabbed category grid
│   │   ├── OffersSection.tsx    # Special offer cards
│   │   ├── FounderSection.tsx   # Full-bleed split founder layout
│   │   ├── GallerySection.tsx   # Photo grid + YouTube videos + lightbox
│   │   ├── Testimonials.tsx     # Client review cards
│   │   ├── ContactSection.tsx   # Contact cards + map + booking CTA
│   │   ├── Footer.tsx           # Footer columns + credits
│   │   ├── MobileCTABar.tsx     # Fixed bottom bar (mobile only)
│   │   ├── InquiryWidget.tsx    # Floating inquiry form (? button)
│   │   ├── Logo.tsx             # SVG orchid logo (nav/footer variants)
│   │   └── SocialIcons.tsx      # Instagram, Facebook, JustDial, Google SVGs
│   ├── contexts/
│   │   └── LanguageContext.tsx  # Language state + t() translation hook
│   ├── lib/
│   │   ├── content.ts           # Imports and re-exports all JSON content
│   │   └── utils.ts             # assetUrl() for basePath-aware asset paths
│   ├── globals.css              # Global styles, custom utilities, animations
│   ├── layout.tsx               # Root layout: metadata, JSON-LD schema, Google Translate init
│   └── page.tsx                 # Main page — assembles all sections
├── content/                  # ← EDIT THESE FILES to update all site content
│   ├── site.json             # Master config: brand, contact, address, social, SEO, credits
│   ├── home.json             # Hero, intro stats, CTA button labels
│   ├── services.json         # Service categories + individual services
│   ├── offers.json           # Offer cards + announcement bar
│   ├── founder.json          # Founder name, bio, values, certifications
│   ├── gallery.json          # Gallery photos + YouTube video IDs
│   ├── reviews.json          # Client testimonials + aggregate rating
│   └── translations/
│       └── en.json           # All UI label strings (buttons, headings, micro-copy)
├── public/
│   ├── media/
│   │   ├── gallery/          # gallery-1.jpg … gallery-6.jpg
│   │   └── founder/          # founder.png
│   └── favicon.svg
├── .github/
│   └── workflows/
│       └── deploy.yml        # Auto-build + deploy to GitHub Pages on push to master
├── next.config.ts            # output: "export", basePath: "/orchidwellness"
└── tailwind.config.ts        # Custom color palette (rose, gold, cream, charcoal)
```

---

## Getting Started (Local Dev)

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev
# → Open http://localhost:3000 in your browser

# Build production static export
npm run build
# → Output in ./out/ (ready to deploy)
```

---

## Content Management — No Code Required

All business content lives in `content/`. Edit these JSON files with any text editor (even Notepad) and push to GitHub — the site rebuilds automatically.

### `site.json` — Master Config

Central settings for the whole site. Most important fields:

```jsonc
{
  "brand": {
    "name": "Orchid Unisex Salon & Spa",
    "tagline": "Where Beauty Meets Calm",
    "shortName": "Orchid",
    "establishedYear": "2025"
  },
  "contact": {
    "phone": "072769 97855",       // display format — shown on page
    "whatsapp": "917276997855",    // country code + number, NO spaces, NO +
    "email": "orchidunisexsaloonspa@gmail.com"
  },
  "address": {
    "line1": "5th Floor, Aurum Lohia Apartment",
    "line2": "Aditya Corner, Opposite Purohit Sweets",
    "area": "Tarabai Park",
    "city": "Kolhapur",
    "state": "Maharashtra",
    "pin": "416003",
    "googleMapsUrl": "...",        // link on "Get Directions" button
    "mapEmbedUrl": "..."           // iframe src for embedded map
  },
  "timings": {
    "displayRows": [
      { "days": "Monday – Saturday", "hours": "10:00 AM – 8:30 PM" },
      { "days": "Sunday", "hours": "11:00 AM – 7:00 PM" }
    ]
  },
  "social": {
    "instagram": "https://...",
    "facebook": "https://...",
    "justdial": "https://...",     // set "" to hide the button
    "googleReviews": "https://..."
  },
  "ratings": {
    "score": "4.9",                // shown in hero badge and review section
    "count": "50",                 // shown as "50+ happy clients"
    "platform": "Google"
  },
  "credits": {
    "enabled": true,               // false = hide the developer credit
    "text": "Designed & Developed by Akash Pol",
    "link": ""                     // add a URL to make it a hyperlink
  },
  "sections": { ... }              // see Section Toggles below
}
```

**How to update the Google Maps embed URL:**
1. Go to [maps.google.com](https://maps.google.com) → search your salon
2. Click **Share** → **Embed a map** → copy the URL inside `src="..."`
3. Paste it as `address.mapEmbedUrl` in site.json

---

### `home.json` — Hero & Intro

- `hero.headline` — main heading (use `\n` to split into lines; the second line gets a gold gradient)
- `hero.subheadline` — paragraph beneath the heading
- `hero.primaryCta` / `hero.secondaryCta` — button labels and anchor scroll targets (`#services`, `#contact`, etc.)
- `intro.stats` — array of 4 stat boxes: `{ "value": "50+", "label": "Happy Clients" }`
- `intro.body` — array of intro paragraphs

---

### `services.json` — Service Catalogue

Each entry in the `categories` array:
```jsonc
{
  "id": "hair-women",
  "name": "Hair — Women",
  "emoji": "💇‍♀️",
  "services": [
    { "name": "Haircut & Styling", "description": "Precision cut..." },
    { "name": "Blow Dry",          "description": "Professional blow dry..." }
  ]
}
```

- **Add a service:** append to the `services` array inside the matching category
- **Add a category:** append a new object to `categories` with a unique `id`
- **Remove a service:** delete its object from the array
- No price fields — the site uses an "enquire" link model (`showPricing: false` in site.json)

---

### `offers.json` — Special Offers

```jsonc
{
  "announcementBar": {
    "enabled": true,           // false = hide the top announcement strip
    "badge": "Limited Time",
    "text": "✨ New clients get 20% off their first visit...",
    "ctaText": "Book Now",
    "ctaHref": "#contact"
  },
  "heading": "Special Offers",
  "subheading": "...",
  "offers": [
    {
      "id": "new-client",
      "enabled": true,         // false = hide without deleting
      "badge": "New Clients",
      "title": "First Visit Offer",
      "subtitle": "20% off any service",
      "description": "...",
      "validity": "Valid for first-time clients only.",
      "ctaText": "Claim Offer",
      "ctaHref": "#contact"
    }
  ]
}
```

- **Add an offer:** copy any object in `offers`, give it a new `id`, update the text
- **Hide an offer temporarily:** set `"enabled": false`
- **Hide the announcement bar:** set `announcementBar.enabled: false`
- Any number of offers is supported — the grid adapts (1 col → 2 col → 3 col)

---

### `founder.json` — Founder Bio

```jsonc
{
  "name": "Vidya Kalyankar",
  "title": "Founder & Director",
  "tagline": "\"Empowering every client to feel their most confident self.\"",
  "experience": "2025",          // shown in the gold "Established" badge
  "story": [                     // array of paragraphs
    "Paragraph one...",
    "Paragraph two..."
  ],
  "values": [                    // chips shown below story
    { "icon": "Heart",  "title": "Client First" },
    { "icon": "Award",  "title": "Excellence"   },
    { "icon": "Users",  "title": "Inclusivity"  }
  ],
  "certifications": [            // bullet list of highlights
    "Entrepreneur & Business Leader",
    "..."
  ],
  "image": {
    "src": "/media/founder/founder.png",
    "alt": "Vidya Kalyankar — Founder"
  }
}
```

Supported icon values: `Heart`, `Award`, `Users`

---

### `gallery.json` — Photos & Videos

**Photos** — update `alt` and `caption` to describe your images:
```jsonc
{ "src": "/media/gallery/gallery-1.jpg", "alt": "...", "caption": "Our Brand" }
```
Drop files named `gallery-1.jpg` through `gallery-6.jpg` into `public/media/gallery/`.

**Videos** — tap-to-play YouTube embeds:
```jsonc
{
  "youtubeId": "Q8nkXcvPSVk",
  "title": "The Orchid Experience",
  "caption": "Step inside Orchid..."
}
```
To find your YouTube ID: open the video, copy the part after `v=` in the URL (e.g. `https://youtu.be/`**`Q8nkXcvPSVk`**).
The thumbnail loads from YouTube automatically. The iframe only loads when tapped — saves mobile data.

---

### `reviews.json` — Testimonials

Each review:
```jsonc
{
  "name": "Priya Desai",
  "location": "Kolhapur",
  "rating": 5,
  "text": "Absolutely loved my experience...",
  "date": "March 2025",
  "platform": "Google"
}
```
Update `totalReviews` and `averageRating` at the top to match your current Google count.

---

### `translations/en.json` — UI Labels

All button text, section labels, and micro-copy strings. Edit **values** (not keys) to change any label:

```jsonc
{
  "common": {
    "bookAppointment": "Book Appointment",   // ← change this text
    "callNow": "Call Now"
  },
  "hero": {
    "badge": "4.9★ Rated · Kolhapur's Premier Salon & Spa"
  },
  "footer": {
    "allRights": "All rights reserved."
  }
}
```

---

## Section Toggles

Control which sections appear — edit `content/site.json → sections`:

```jsonc
"sections": {
  "showServices":    true,    // Service grid
  "showPricing":     false,   // Price list (keep false — uses enquire model)
  "showFounder":     true,    // Founder split section
  "showGallery":     true,    // Photo grid + videos
  "showVideos":      true,    // YouTube block inside gallery
  "showReviews":     true,    // Testimonials
  "showOffers":      true,    // Offer cards + announcement bar
  "showMap":         true,    // Google Maps embed in contact
  "showSocialLinks": true     // Social icons in nav, footer, contact
}
```

Set any value to `false` — that section disappears site-wide. No other changes needed.

---

## Replacing Images & Media

All public assets live under `public/`. Reference them as `/media/...`.

| Asset | File path | Notes |
|-------|-----------|-------|
| Gallery photos | `public/media/gallery/gallery-1.jpg` … `gallery-6.jpg` | Replace files in-place; keep filenames |
| Founder photo | `public/media/founder/founder.png` | Update `founder.json → image.src` if you rename it |
| Hero background | `public/media/gallery/gallery-1.jpg` | Same as gallery photo 1 |
| OG / share image | `public/media/hero/hero-og.jpg` | 1200×630 px — shown when sharing link on WhatsApp/social |
| Favicon | `public/favicon.svg` | SVG format |

> **Note on asset paths:** When the site is deployed to GitHub Pages, all URLs include the `/orchidwellness` prefix automatically. The `assetUrl()` helper in `app/lib/utils.ts` handles this — never hardcode full paths in new code.

---

## Multilingual Support

The site supports **English (EN)**, **Marathi (MR)**, and **Hindi (HI)**.

- Language buttons in the nav (EN | MR | HI) call `window.__orchidTranslate(langCode)` which triggers Google Translate programmatically.
- Google Translate translates **all visible page text on the fly** — no separate translation files are needed for MR/HI.
- The Google Translate toolbar is visually hidden via CSS in `globals.css` so it never disrupts the layout.
- Static English strings (button labels, section headings) are in `content/translations/en.json`.

---

## Inquiry Form Setup (Google Sheets)

The floating "?" inquiry button sends submissions to a Google Sheet you own.

### Step 1 — Create the Google Sheet

1. Open [sheets.google.com](https://sheets.google.com) → create a **blank spreadsheet**
2. Name it: **Orchid Wellness Inquiries**

### Step 2 — Add the Apps Script

1. In the sheet: **Extensions → Apps Script**
2. Delete the default code, paste the contents of `setup/google-apps-script.js`
3. Save (Ctrl+S) → name the project **Orchid Inquiry Handler**

### Step 3 — Deploy as Web App

1. **Deploy → New deployment → Web app**
2. Set: Execute as: **Me** | Who has access: **Anyone**
3. Click **Deploy → Authorize** (you may need to approve via "Advanced → Go to app (unsafe)")
4. Copy the **Web app URL** (looks like `https://script.google.com/macros/s/.../exec`)

### Step 4 — Paste URL into InquiryWidget

1. Open `app/components/InquiryWidget.tsx`
2. Find `const GOOGLE_SCRIPT_URL = "..."` near the top of `handleSubmit`
3. Replace the placeholder with your copied URL

### Step 5 — Email notifications (optional)

In your Google Sheet: **Tools → Notification rules → Any changes → Email right away**

---

## Deployment to GitHub Pages

### Automated (every push to `master`)

The GitHub Actions workflow (`.github/workflows/deploy.yml`) runs automatically:
1. Installs Node.js 18 + dependencies
2. Runs `npm run build` → produces `./out/`
3. Deploys `./out/` to the `gh-pages` branch

**To deploy:** just commit and push to `master`.

```bash
git add content/site.json          # stage only what changed
git commit -m "Update phone number"
git push origin master
# → Site rebuilds and goes live in ~2 minutes
```

### One-time GitHub Pages setup

1. Repo → **Settings → Pages → Source**: Deploy from a branch → `gh-pages` / `/(root)`
2. Repo → **Settings → Actions → General → Workflow permissions**: Read and write

### Editing on GitHub.com (no local setup needed)

For small text changes:
1. Go to your repo on GitHub → navigate to the file (e.g. `content/site.json`)
2. Click the **pencil ✏ icon** → edit → **Commit changes**
3. Site rebuilds automatically within 2 minutes

---

## Architecture Notes

### Static Export
`next.config.ts` sets `output: "export"` — Next.js generates plain HTML/CSS/JS with no server runtime. This is required for GitHub Pages hosting.

### Base Path
All routes and assets are prefixed with `/orchidwellness` (set in `next.config.ts` and the `NEXT_PUBLIC_BASE_PATH` env var). **Always use `assetUrl(path)`** from `app/lib/utils.ts` for any `url()` CSS values or `src` attributes outside `<Image>`.

### JSON-LD Schema
`app/layout.tsx` injects a `BeautySalon` JSON-LD schema block using real business data from `site.json`. This powers Google's rich results (star ratings, hours, address in search).

### Scroll Animations
Most sections use `IntersectionObserver` to add `.visible` to a `.reveal` element when scrolled into view, triggering the fade-in defined in `globals.css`. Respects `prefers-reduced-motion`.

### Design Tokens (Tailwind)
Custom colors in `tailwind.config.ts`:
- `rose-*` — primary brand (pink/rose)
- `gold-*` — accent (warm gold)
- `cream-*` — background tones
- `charcoal-*` — text shades

Custom CSS classes in `globals.css`:
| Class | Purpose |
|-------|---------|
| `.text-gold-gradient` | Gold shimmer text effect |
| `.text-rose-gradient` | Rose gradient text |
| `.text-luxury-gradient` | Gold → rose combined gradient |
| `.divider-gold` / `.divider-rose` | Decorative section dividers |
| `.card-lift` | Hover lift (desktop only, `hover:hover` media query) |
| `.blush-pattern` | Soft blush radial-gradient background |
| `.hero-full` | Full-viewport height with `100dvh / 100svh / 100vh` fallbacks |
| `.reveal` + `.reveal.visible` | Scroll-triggered fade-in animation |
| `.scrollbar-hide` | Hide scrollbar (tab strips) |

### Mobile Optimizations
- `touch-action: manipulation` — removes 300ms tap delay
- `min 44×44px` tap targets on all interactive elements
- `font-size: 16px` on inputs — prevents iOS auto-zoom
- `viewport-fit: cover` — fills iPhone notch / Dynamic Island
- `env(safe-area-inset-bottom)` — safe area padding on notch phones
- `100dvh` / `100svh` — accurate full-height on iOS Safari
- `prefers-reduced-motion` — disables all animations for accessibility

---

## Custom Domain (Optional)

To use a custom domain (e.g. `orchidwellness.in`, ~₹800–1200/year):

1. Create `public/CNAME` with one line: `orchidwellness.in`
2. In your domain registrar DNS, add four A records pointing to GitHub Pages IPs:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Repo → Settings → Pages → Custom domain → enter `orchidwellness.in` → Save
4. In `next.config.ts`, set `basePath: ""` (empty string) and update `seo.siteUrl` in site.json
5. Push — site goes live at your custom domain within 24–48 hours

---

*Designed & Developed by Akash Pol*
