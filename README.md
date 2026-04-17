# Orchid Unisex Salon & Spa — Website

Premium salon & spa website for **Orchid Unisex Salon & Spa, Kolhapur**.  
Built with Next.js 14, Tailwind CSS, and deployed on GitHub Pages.

🌐 **Live site:** https://akashp-ai.github.io/orchidwellness  
📁 **GitHub repo:** https://github.com/akashp-ai/orchidwellness

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Folder Structure](#folder-structure)
3. [Running Locally](#running-locally)
4. [Content Files — What to Edit](#content-files--what-to-edit)
   - [site.json — Master settings](#1-sitejson--master-settings)
   - [home.json — Hero & homepage](#2-homejson--hero--homepage)
   - [gallery.json — Photos & Videos](#3-galleryjson--photos--videos)
   - [services.json — Service menu](#4-servicesjson--service-menu)
   - [founder.json — About section](#5-founderjson--about-section)
   - [reviews.json — Testimonials](#6-reviewsjson--testimonials)
   - [offers.json — Offers banner](#7-offersjson--offers-banner)
5. [How to Change YouTube Videos](#how-to-change-youtube-videos)
6. [How to Replace Images](#how-to-replace-images)
7. [Language Switching](#language-switching)
8. [Show / Hide Sections](#show--hide-sections)
9. [Deploying to GitHub Pages](#deploying-to-github-pages)
10. [SEO & Social Sharing](#seo--social-sharing)
11. [Common Tasks — Quick Reference](#common-tasks--quick-reference)
12. [Development Notes](#development-notes)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, static export) |
| Styling | Tailwind CSS |
| Language | TypeScript |
| Icons | Lucide React + custom SVGs |
| Translation | Google Translate SDK (cookie-based, loads after hydration) |
| Hosting | GitHub Pages via GitHub Actions |
| Images | Next.js `<Image>` with `unoptimized` (required for static export) |
| Videos | YouTube embed via `youtube-nocookie.com` (lazy — loads only on tap) |

---

## Folder Structure

```
orchidwellness/
│
├── content/                        ← ALL EDITABLE CONTENT LIVES HERE
│   ├── site.json                   ← Brand, contact, address, social, SEO, section toggles
│   ├── home.json                   ← Hero headline, stats, highlights, CTA banner
│   ├── gallery.json                ← Gallery photos + YouTube video IDs  ← CHANGE VIDEOS HERE
│   ├── services.json               ← All services (categories + individual items)
│   ├── founder.json                ← Founder bio, photo path, quote
│   ├── reviews.json                ← Client testimonials
│   ├── offers.json                 ← Announcement bar offer text
│   └── translations/
│       ├── en.json                 ← English UI labels (nav, buttons, etc.)
│       ├── mr.json                 ← Marathi translations
│       └── hi.json                 ← Hindi translations
│
├── public/                         ← IMAGES & STATIC FILES
│   ├── media/
│   │   ├── gallery/                ← gallery-1.jpg … gallery-6.jpg
│   │   ├── founder/                ← founder.jpg
│   │   ├── hero/                   ← salon-interior.jpg, hero-og.jpg (social share image)
│   │   ├── logo-icon.png           ← Square logo used in nav & footer
│   │   └── logo-full.png           ← Full logo (optional)
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
│
├── app/
│   ├── components/                 ← One React component per section
│   │   ├── Navigation.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── FounderSection.tsx
│   │   ├── GallerySection.tsx      ← Video embed logic lives here
│   │   ├── Testimonials.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Footer.tsx
│   │   ├── Logo.tsx
│   │   ├── MobileCTA.tsx
│   │   └── SocialIcons.tsx
│   ├── contexts/
│   │   └── LanguageContext.tsx     ← Language state (EN / मराठी / हिंदी)
│   ├── lib/
│   │   ├── content.ts              ← Loads all JSON content files
│   │   └── utils.ts                ← assetUrl() helper for image paths
│   ├── globals.css                 ← Global styles + Tailwind
│   └── layout.tsx                  ← Root layout, Google Translate, SEO metadata
│
├── .github/
│   └── workflows/deploy.yml        ← Auto-deploy to GitHub Pages on every push
├── next.config.ts                  ← basePath "/orchidwellness" for GitHub Pages
└── .claude/launch.json             ← Dev server config (port 3002)
```

---

## Running Locally

```bash
# 1. Install dependencies (only once)
cd orchidwellness
npm install

# 2. Start development server
npm run dev
# → Open http://localhost:3002

# 3. Production build (checks for TypeScript / build errors)
npm run build
```

The dev server hot-reloads automatically when you edit any file in `content/` or `app/`.

---

## Content Files — What to Edit

> **All content is JSON files inside `/content/`. No coding knowledge needed.**  
> Edit → Save → the page updates instantly in your browser.

---

### 1. `site.json` — Master settings

The single most important file. Controls business info, social links, section visibility, and SEO.

#### Contact details

```json
"contact": {
  "phone":        "72763 47855 / 72769 97855",  ← displayed text on the site
  "phonePrimary": "7276347855",                  ← used for tel: links — no spaces, no +
  "whatsapp":     "917276347855",                ← 91 (India code) + number, no spaces
  "email":        "orchidunisexsaloonspa@gmail.com"
}
```

#### Business hours

```json
"timings": {
  "displayRows": [
    { "days": "All Days", "hours": "11:00 AM – 10:00 PM" }
  ]
}
```

To show different hours for weekdays vs Sunday:
```json
"displayRows": [
  { "days": "Mon – Sat", "hours": "10:00 AM – 9:00 PM" },
  { "days": "Sunday",    "hours": "11:00 AM – 7:00 PM" }
]
```

#### Address & Google Maps

```json
"address": {
  "line1":         "CS 247/3, E Ward, Office Unit No. 501, 5th Floor, Aurum",
  "line2":         "Aditya Corner, Near Kelavar Hospital",
  "area":          "Tarabai Park",
  "city":          "Kolhapur",
  "state":         "Maharashtra",
  "pin":           "416003",
  "googleMapsUrl": "https://maps.google.com/...",   ← "Get Directions" button
  "mapEmbedUrl":   "https://maps.google.com/..."    ← embedded map in Contact section
}
```

> **To update the embedded map:**  
> Google Maps → search your salon → Share → Embed a map → copy the `src="..."` URL → paste into `mapEmbedUrl`.

#### Social links

```json
"social": {
  "instagram":    "https://www.instagram.com/orchid_unisex_salon_spa/",
  "facebook":     "https://www.facebook.com/...",
  "justdial":     "https://www.justdial.com/...",
  "googleReviews":"https://www.google.com/maps/..."
}
```

Leave a field as `""` to hide that platform's icon.

#### Ratings

```json
"ratings": {
  "score": "4.9",   ← update as your reviews grow
  "count": "50"
}
```

---

### 2. `home.json` — Hero & homepage

Controls the main banner, intro section, stat counters, key highlights, and CTA banner.

```json
"hero": {
  "badge":       "Kolhapur's New Premium Salon & Spa",
  "headline":    "Your Best Look,\nEvery Single Day",
  "subheadline": "Step into a space where expert hands..."
},
"intro": {
  "stats": [
    { "value": "Est. 2025", "label": "New Premium Venture" },
    { "value": "4.9★",      "label": "Rated on Google" },
    { "value": "50+",       "label": "Happy Clients" },
    { "value": "20+",       "label": "Services Offered" }
  ]
}
```

---

### 3. `gallery.json` — Photos & Videos

Controls the photo grid and the YouTube video section below it.

#### Photos

```json
"photos": [
  {
    "src":     "/media/gallery/gallery-1.jpg",
    "alt":     "Orchid Salon entrance",
    "caption": "Our Brand"
  },
  ...
]
```

- `src` — must match a file inside `/public/media/gallery/`
- `alt` — description for screen readers and Google image search
- `caption` — shown on hover over the photo

#### Videos — see full section below ↓

---

### 4. `services.json` — Service menu

```json
{
  "id":   "hair-women",
  "name": "Hair — Women",
  "icon": "Scissors",
  "services": [
    {
      "name":        "Haircut & Blow Dry",
      "description": "Precision cut tailored to your face shape...",
      "price":       null     ← set a number (e.g. 500) to show price; null hides price
    }
  ]
}
```

To **add a service:** add an object to `services[]` inside the right category.  
To **add a new category:** add a new object to the top-level array with a unique `id`.

---

### 5. `founder.json` — About section

```json
{
  "name":  "Rameshwari Kalyankar",
  "role":  "Founder, Orchid Unisex Salon & Spa",
  "quote": "A great salon isn't just about skills...",
  "bio":   [
    "First paragraph...",
    "Second paragraph..."
  ],
  "image": {
    "src": "/media/founder/founder.jpg",
    "alt": "Rameshwari Kalyankar"
  }
}
```

Replace the founder photo by dropping a new `founder.jpg` into `/public/media/founder/`.

---

### 6. `reviews.json` — Testimonials

```json
{
  "reviews": [
    {
      "name":     "Priya Deshmukh",
      "location": "Kolhapur",
      "service":  "Keratin Treatment",
      "date":     "March 2025",
      "rating":   5,
      "text":     "I got my keratin treatment done here..."
    }
  ]
}
```

Add, edit, or remove review objects freely. Displayed in order, top to bottom.

---

### 7. `offers.json` — Announcement bar

The scrolling pink bar at the very top of the page.

```json
{
  "offers": [
    {
      "text":   "New clients enjoy 20% off their first visit — walk in or call to book",
      "active": true
    }
  ]
}
```

Set `"active": false` to hide an offer without deleting it.  
Add more objects to `offers[]` to rotate multiple offers.

---

## How to Change YouTube Videos

> **This is fully modular. Only one file changes: `content/gallery.json`.**

### Step 1 — Find your YouTube video ID

| Video type | Example URL | ID to copy |
|---|---|---|
| Regular video | `https://youtube.com/watch?v=`**`dQw4w9WgXcQ`** | `dQw4w9WgXcQ` |
| YouTube Short | `https://youtube.com/shorts/`**`96f620czPrA`** | `96f620czPrA` |

The ID is the part after `v=` (regular) or after `shorts/` (Shorts).  
Ignore everything from `?` onwards (e.g. `?feature=shared`).

### Step 2 — Edit `content/gallery.json`

```json
"videos": [
  {
    "youtubeId": "PASTE_NEW_ID_HERE",    ← only this field changes
    "isShort":   true,                   ← true = vertical portrait (Shorts)
                                         ← false = horizontal landscape (regular video)
    "title":     "The Orchid Experience — Salon & Spa Tour",
    "caption":   "Step inside Orchid and experience the calm..."
  },
  {
    "youtubeId": "SECOND_VIDEO_ID",
    "isShort":   true,
    "title":     "Relax, Restore, Renew",
    "caption":   "Our signature spa treatments..."
  }
]
```

### Step 3 — Save and deploy

```bash
git add content/gallery.json
git commit -m "Update gallery videos"
git push
```

Live on https://akashp-ai.github.io/orchidwellness in ~2 minutes.

### Adding or removing videos

| Action | What to do |
|---|---|
| Add a third video | Add another `{...}` object to the `"videos"` array |
| Remove a video | Delete its `{...}` object from the array |
| Hide all videos | Set `"showVideos": false` in `site.json → sections` |
| Use a regular (horizontal) video | Set `"isShort": false` |

### How video embedding works (technical)

- Thumbnails are plain `<img>` tags loaded lazily — **zero iframe cost on page load**
- The YouTube `<iframe>` only mounts when the user taps the play button
- Uses `youtube-nocookie.com` — no tracking cookies until the user plays the video
- `playsinline=1` ensures videos play inline on iOS (no forced fullscreen)
- A spinner appears while the iframe initialises after tapping

---

## How to Replace Images

Drop new files into `/public/media/` with the **exact same filename**. No code changes.

| What | File path | Recommended size |
|---|---|---|
| Hero background | `public/media/hero/salon-interior.jpg` | 1920×1080px, landscape |
| Social share / OG image | `public/media/hero/hero-og.jpg` | 1200×630px |
| Logo icon (nav + footer) | `public/media/logo-icon.png` | Square, 200×200px min, transparent PNG |
| Founder photo | `public/media/founder/founder.jpg` | Portrait orientation |
| Gallery photo 1 | `public/media/gallery/gallery-1.jpg` | Square, 800×800px min |
| Gallery photos 2–6 | `public/media/gallery/gallery-2.jpg` … `gallery-6.jpg` | Same |

**To add a 7th (or more) gallery photo:**
1. Drop `gallery-7.jpg` into `/public/media/gallery/`
2. Add an entry to `content/gallery.json → photos[]`

---

## Language Switching

The site supports **English · मराठी · हिंदी** via Google Translate.

### How it works

1. User clicks a language button in the nav
2. The `googtrans` cookie is set to `/auto/mr` or `/auto/hi`
3. Page reloads — Google Translate reads the cookie and fully translates everything
4. Clicking **EN** or refreshing the page clears the cookie → clean English

### Behaviour guarantees

- **Refresh always returns to English** — the cookie is intentionally cleared on refresh
- **Rapid clicking is safe** — a 500ms debounce ensures only the last-clicked language loads
- **No partial translations** — each load is a complete, clean translation

### Editing UI labels (nav, buttons, etc.)

Edit `content/translations/en.json` for English labels.  
Add the same keys to `mr.json` and `hi.json` for translated versions.

---

## Show / Hide Sections

In `content/site.json → sections`, flip any value to `false` to hide that section:

```json
"sections": {
  "showServices":    true,
  "showPricing":     false,    ← pricing hidden (prices not published yet)
  "showFounder":     true,
  "showGallery":     true,
  "showVideos":      true,     ← false hides only the video subsection inside gallery
  "showReviews":     true,
  "showOffers":      true,     ← false hides the announcement bar
  "showMap":         true,
  "showSocialLinks": true
}
```

No code changes needed — just flip the boolean and push.

---

## Deploying to GitHub Pages

Every `git push` to `master` automatically builds and deploys the site.

```bash
# Make your changes to any content file
git add .
git commit -m "your description"
git push
```

- Watch deploy progress: https://github.com/akashp-ai/orchidwellness/actions
- Live in ~2 minutes: https://akashp-ai.github.io/orchidwellness

### First-time setup (already done — for reference)

1. Create repo on GitHub
2. Repo → Settings → Pages → Source → **GitHub Actions**
3. Push to `master` → Actions picks up `deploy.yml` automatically

---

## SEO & Social Sharing

All SEO metadata is driven from `content/site.json → seo`:

```json
"seo": {
  "siteUrl":            "https://akashp-ai.github.io/orchidwellness",
  "defaultTitle":       "Orchid Unisex Salon & Spa | Tarabai Park, Kolhapur",
  "defaultDescription": "Premium unisex salon and spa in Tarabai Park...",
  "keywords":           "salon kolhapur, spa kolhapur, bridal makeup kolhapur, ...",
  "ogImage":            "/media/hero/hero-og.jpg"
}
```

- **`ogImage`** — image shown when the link is shared on WhatsApp, Instagram, Facebook, LinkedIn. Use a 1200×630px JPG.
- **Structured data** (Google Business / BeautySalon schema) is auto-generated from `site.json` — no extra edits needed.
- **`public/sitemap.xml`** — update the `<lastmod>` date after major content updates.

---

## Common Tasks — Quick Reference

| Task | File | Field / action |
|---|---|---|
| Change phone number | `content/site.json` | `contact.phone`, `contact.phonePrimary` |
| Change WhatsApp number | `content/site.json` | `contact.whatsapp` (91 + number, no spaces or +) |
| Update business hours | `content/site.json` | `timings.displayRows` |
| Update address | `content/site.json` | `address.*` |
| Update Google Maps embed | `content/site.json` | `address.mapEmbedUrl` |
| Change social media links | `content/site.json` | `social.*` |
| Update rating / review count | `content/site.json` | `ratings.score`, `ratings.count` |
| Change hero headline | `content/home.json` | `hero.headline` |
| Change offer banner text | `content/offers.json` | `offers[0].text` |
| Hide offer banner | `content/offers.json` | `offers[0].active: false` |
| **Change a YouTube video** | **`content/gallery.json`** | **`videos[n].youtubeId`** |
| Add a gallery photo | `content/gallery.json` + drop file in `public/media/gallery/` | `photos[]` |
| Add a service | `content/services.json` | add to `services[]` in the right category |
| Add a client review | `content/reviews.json` | add object to `reviews[]` |
| Hide a section | `content/site.json` | `sections.show*: false` |
| Replace founder photo | Drop `founder.jpg` in `public/media/founder/` | — |
| Replace hero background | Drop `salon-interior.jpg` in `public/media/hero/` | — |
| Replace logo | Drop `logo-icon.png` in `public/media/` | — |
| Update SEO title/description | `content/site.json` | `seo.defaultTitle`, `seo.defaultDescription` |

---

## Development Notes

**Dev server port:** `3002` (configured in `.claude/launch.json`)

**Image paths — important:** All local image `src` values must use the `assetUrl()` utility from `app/lib/utils.ts` so the `/orchidwellness` base path is prepended on GitHub Pages:

```ts
import { assetUrl } from "../lib/utils";
<Image src={assetUrl("/media/gallery/gallery-1.jpg")} ... />
```

External URLs (YouTube thumbnails, Google Maps, etc.) do **not** need `assetUrl()`.

**Static export:** `output: "export"` in `next.config.ts` — no server-side rendering. Everything is pre-built HTML/CSS/JS.

**Google Translate:** Loaded with `strategy="afterInteractive"` so it runs after React hydration, preventing DOM mismatch errors.

**Language state:** `LanguageContext` reads from `localStorage` for button highlight state. The actual translation is done by Google Translate reading the `googtrans` cookie — these are two separate systems kept in sync.

---

*Designed & Developed by Akash Pol*
