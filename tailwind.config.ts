import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    extend: {
      colors: {
        brand: {
          50: "#FAF7EE",
          100: "#F3ECD9",
          200: "#E5D7B2",
          300: "#D4AF37", // Primary Warm Bronze / Gold
          400: "#C29B28",
          500: "#A9851F",
          600: "#8B6B18",
          700: "#6B5014",
          800: "#4D3811",
          900: "#30220B",
          DEFAULT: "#D4AF37",
          gold: "#D4AF37",
          bronze: "#C29B38",
          sand: "#DFD3C3",
        },
        noir: {
          950: "#070708", // Pitch black
          900: "#0B0B0C", // Deep Obsidian Canvas
          850: "#101012",
          800: "#161618", // Dark Card Surface
          750: "#1C1C20",
          700: "#242429", // Elevate Border / Surface
          600: "#36363E",
          500: "#50505A",
          400: "#71717A",
          300: "#A1A1AA",
          200: "#D4D4D8",
          100: "#E4E4E7",
          50: "#F4F4F5",
          DEFAULT: "#0B0B0C",
        },
        champagne: {
          50: "#FAF8F5",
          100: "#F4EFE9",
          200: "#E9DFD3",
          300: "#DFD3C3",
          400: "#CBBBA7",
          DEFAULT: "#DFD3C3",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "Inter", "sans-serif"],
        editorial: ["var(--font-editorial)", "var(--font-outfit)", "sans-serif"],
        outfit: ["var(--font-outfit)", "sans-serif"],
        syne: ["var(--font-syne)", "sans-serif"],
        jakarta: ["var(--font-jakarta)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-serif)", "Cormorant Garamond", "serif"],
        display: ["var(--font-display)", "Cinzel", "serif"],
      },
      fontSize: {
        "2xs": ["0.65rem", { lineHeight: "0.85rem" }],
        "display-2xl": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "display-lg": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-md": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "display-sm": ["1.875rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
      },
      letterSpacing: {
        luxury: "0.2em",
        cinematic: "0.3em",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
