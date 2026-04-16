// Content loader — imports JSON files from /content/.
// All imports are static (resolved at build time) — no server needed.

import siteData    from "../../content/site.json";
import homeData    from "../../content/home.json";
import servicesData from "../../content/services.json";
import reviewsData from "../../content/reviews.json";
import founderData from "../../content/founder.json";
import galleryData from "../../content/gallery.json";
import offersData  from "../../content/offers.json";

export const site     = siteData;
export const home     = homeData;
export const services = servicesData;
export const reviews  = reviewsData;
export const founder  = founderData;
export const gallery  = galleryData;
export const offers   = offersData;
