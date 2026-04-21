# Orchid Luxury Spa — Website Guide

**Live website:** https://orchidluxuryspa.com
**GitHub repo:** https://github.com/akashp-ai/orchidwellness

This is the complete guide for making any change to the Orchid website — written for someone with no coding experience. All common updates (text, photos, address, phone number, services, offers, reviews) are done by editing simple text files. No coding required.

---

## How the Website Works (Simple Explanation)

```
You edit a file  →  Save it  →  Push to GitHub  →  Website updates in 2-3 minutes
```

All content (text, phone numbers, services, gallery photos, etc.) lives in the `content/` folder as simple JSON files. Think of them like structured text files — just edit the text between the quote marks.

---

## Where Everything Lives

```
content/
  site.json        <- Phone, address, social links, business hours  (EDIT THIS MOST)
  home.json        <- Hero headline, intro text, CTA banner text
  services.json    <- All service categories and descriptions
  gallery.json     <- Photo captions and YouTube video IDs
  reviews.json     <- Customer testimonials
  offers.json      <- Special offers and promotions
  founder.json     <- About the founder section

public/
  media/
    gallery/       <- Drop gallery photos here (gallery-1.jpg to gallery-6.jpg)
    hero/          <- Hero background image (hero-og.jpg)
    founder/       <- Founder photo
```

---

## Most Common Updates

### Change Phone Number
Open `content/site.json`, find and update:
```json
"contact": {
  "phone": "72763 47855 / 72769 97855",
  "phonePrimary": "7276347855",
  "whatsapp": "917276347855",
  "email": "orchidunisexsaloonspa@gmail.com"
}
```
- `phone` — shown on website exactly as typed
- `phonePrimary` — used for Call button (no spaces, no +)
- `whatsapp` — WhatsApp number (91 + number, no spaces or +)

### Change Address
Open `content/site.json`, find `"address"` and update all fields:
```json
"line1": "CS 247/3, E Ward, Aditya Corner",
"line2": "Tarabai Park, Near Kelavkar Hospital",
"city": "Kolhapur",
"pin": "416003",
"fullAddress": "CS 247/3, E Ward, Aditya Corner, Tarabai Park, Near Kelavkar Hospital, Kolhapur - 416003"
```
Always update `fullAddress` to match the other fields.

### Change Business Hours
Open `content/site.json`, find `"timings"`:
```json
"displayRows": [
  { "days": "All Days", "hours": "11:00 AM - 10:00 PM" }
]
```

### Add or Edit a Service
Open `content/services.json`. Each service looks like:
```json
{
  "name": "Swedish Full Body Massage",
  "description": "A gentle, relaxing full-body massage using long strokes."
}
```
Keep descriptions short (1-2 sentences) so they fit on cards.

### Add or Edit a Special Offer
Open `content/offers.json`. Each offer has:
```json
{
  "id": "unique-id",
  "enabled": true,
  "title": "Orchid Special Package",
  "subtitle": "Our Signature Experience",
  "description": "Body massage, scrub, polishing, wrap and facial.",
  "badge": "POPULAR",
  "validity": "Valid all week",
  "ctaText": "Book Now",
  "ctaHref": "#contact"
}
```
Set `"enabled": false` to hide an offer without deleting it.

### Add or Edit a Customer Review
Open `content/reviews.json`. Each review looks like:
```json
{
  "name": "Priya S.",
  "avatar": "PS",
  "location": "Kolhapur",
  "service": "Swedish Massage",
  "date": "March 2025",
  "rating": 5,
  "text": "Amazing experience! Highly recommend."
}
```

### Change Gallery Photos
1. Rename your new photo to match the slot you want (e.g. `gallery-3.jpg`)
2. Copy it to `public/media/gallery/`
3. Open `content/gallery.json` and update the `"caption"` and `"alt"` for that slot
4. Push to GitHub

Photos must be named exactly: `gallery-1.jpg` through `gallery-6.jpg`

Current gallery slots:
- gallery-1.jpg = Our Brand
- gallery-2.jpg = Our Reception
- gallery-3.jpg = Premium Products
- gallery-4.jpg = Salon Floor
- gallery-5.jpg = Couples Spa Room
- gallery-6.jpg = Private Spa Suite

### Change Hero Background Image
Replace `public/media/hero/hero-og.jpg` with your new image. Keep the same filename.

### Change Founder Photo
Replace the photo in `public/media/founder/` with your new image. Keep the same filename shown in `content/founder.json` under `"image" > "src"`.

### Change YouTube Videos
Open `content/gallery.json`, find `"videos"` and replace the `youtubeId`:
```json
{
  "youtubeId": "abc123XYZ",
  "isShort": true,
  "title": "Video title here",
  "caption": "Short description"
}
```
The `youtubeId` is the part after `watch?v=` in any YouTube URL.
Set `"isShort": true` for YouTube Shorts, `false` for regular videos.

### Hide or Show a Section
Open `content/site.json`, find `"sections"`:
```json
"sections": {
  "showServices": true,
  "showGallery": true,
  "showVideos": true,
  "showReviews": true,
  "showOffers": true,
  "showFounder": true,
  "showMap": true,
  "showSocialLinks": true
}
```
Change `true` to `false` to hide a section. Change back to `true` to show it again.

### Update Social Media Links
Open `content/site.json`, find `"social"`:
```json
"social": {
  "instagram": "https://www.instagram.com/orchid_unisex_salon_spa/",
  "facebook": "https://www.facebook.com/...",
  "justdial": "https://www.justdial.com/...",
  "googleReviews": "https://www.google.com/maps/..."
}
```
Paste the full URL for each platform.

---

## How to Make Changes Live (Push to GitHub)

After editing any file, open **Command Prompt**, navigate to the project folder, and run these 3 commands:

```
cd C:\Users\akash.pol\Documents\Project\orchidwellness
git add .
git commit -m "brief description of what you changed"
git push origin master
```

Example commit messages:
- `git commit -m "Updated phone number"`
- `git commit -m "Added new massage service"`
- `git commit -m "Changed gallery photo 3"`

The website at `orchidluxuryspa.com` will update within **2-3 minutes**.

---

## How to Pause / Unpause the Website

**To pause (take offline):**
Go to GitHub -> your repo -> Settings -> Pages -> click **Unpublish site**

**To unpause (bring back online):**
Go to GitHub -> your repo -> Settings -> Pages -> Source -> select **GitHub Actions** -> Save
Website comes back in ~2 minutes.

---

## Google Search Console (Help People Find You on Google)

To rank for searches like "spa in Kolhapur" or "massage in Kolhapur":

1. Go to **search.google.com/search-console**
2. Add property -> URL prefix -> type `https://orchidluxuryspa.com`
3. Verify using the HTML tag method (copy the verification code and share with your developer to add it to the code)
4. After verified -> Sitemaps (left menu) -> enter `sitemap.xml` -> Submit
5. URL Inspection -> type your URL -> Request Indexing

---

## File Quick Reference Table

| What you want to change | File to edit |
|-------------------------|-------------|
| Phone number | `content/site.json` |
| Address | `content/site.json` |
| Business hours | `content/site.json` |
| Social media links | `content/site.json` |
| Show or hide sections | `content/site.json` |
| Hero headline / subheading | `content/home.json` |
| Services list | `content/services.json` |
| Gallery photo captions | `content/gallery.json` |
| YouTube videos | `content/gallery.json` |
| Customer reviews | `content/reviews.json` |
| Special offers | `content/offers.json` |
| Founder story | `content/founder.json` |
| Gallery photos (image files) | `public/media/gallery/` |
| Hero background image | `public/media/hero/` |
| Founder photo | `public/media/founder/` |

---

## Language Support

The website supports English, Marathi, and Hindi via buttons in the navigation bar. This works automatically. No changes needed.

---

## Technical Details (for Developer Reference)

- **Framework:** Next.js 14 with static export
- **Styling:** Tailwind CSS with custom theme
- **Hosting:** GitHub Pages via GitHub Actions
- **Domain:** orchidluxuryspa.com via Cloudflare DNS
- **Deploy:** Push to `master` branch triggers auto-deploy via GitHub Actions

---

*Website designed and developed by Akash Pol*
