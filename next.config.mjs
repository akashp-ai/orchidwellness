/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/orchidwellness" : "";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    // Available in client components as process.env.NEXT_PUBLIC_BASE_PATH
    // Used for CSS background-image URLs that can't use next/image
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
