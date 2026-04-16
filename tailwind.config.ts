import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Rose / Pink — primary brand colour (salon interior pink + gold) ──
        rose: {
          50:  "#FDF2F6",
          100: "#FADDE9",
          200: "#F4B3CC",
          300: "#E985AE",
          400: "#D9608F",
          500: "#B5547A",   // primary buttons & accents
          600: "#963E61",   // hover state
          700: "#742B49",   // darker elements
          800: "#531A32",   // very dark
          900: "#330E1E",   // darkest bg element
          950: "#1B050F",   // hero/dark-section background
        },
        // ── Gold — luxury accent ──
        gold: {
          50:  "#fdf8f0",
          100: "#faefd8",
          200: "#f3d9a8",
          300: "#e8bc72",
          400: "#C9A96E",   // main gold accent
          500: "#b8914d",
          600: "#9a7340",
          700: "#7d5c35",
          800: "#634830",
          900: "#4f3a27",
        },
        // ── Forest green — kept for brand logo/wordmark ──
        forest: {
          50:  "#f0f5f3",
          100: "#d8e9e3",
          200: "#b0d2c6",
          300: "#7db4a4",
          400: "#4d9080",
          500: "#2D4A3E",
          600: "#254039",
          700: "#1e3330",
          800: "#172927",
          900: "#111f1e",
        },
        // ── Cream — light backgrounds ──
        cream: {
          50:  "#FDFCFA",
          100: "#FAF8F5",
          200: "#F5F1EB",
          300: "#EDE7DD",
          400: "#DDD4C6",
        },
        // ── Charcoal — text & dark tones ──
        charcoal: {
          900: "#1A1A1A",
          800: "#2C2C2C",
          700: "#3D3D3D",
          600: "#4E4E4E",
          500: "#6B6B6B",
          400: "#8A8A8A",
          300: "#A8A8A8",
        },
        // ── Blush — very light pink backgrounds ──
        blush: {
          50:  "#FEF8FA",
          100: "#FDEDF3",
          200: "#FAD9E8",
          300: "#F5C0D7",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans:  ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
