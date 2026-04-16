// Utility: prepend the basePath to public media URLs.
// Required for CSS background-image and plain <img> src attributes
// because Next.js only auto-prefixes paths used by <Image> and <Link>.
//
// Usage:  assetUrl("/media/gallery/gallery-1.jpg")
//  dev  → "/media/gallery/gallery-1.jpg"
//  prod → "/orchidwellness/media/gallery/gallery-1.jpg"

export function assetUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
