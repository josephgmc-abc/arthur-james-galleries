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
        navy: "#002244",
        beige: "#F9F6F0",
        white: "#FFFFFF",
        charcoal: "#1A1A1A",
        gold: "#C5A059",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-neue-haas)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
