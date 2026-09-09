import {
  Cormorant_Garamond,
  Outfit,
  Plus_Jakarta_Sans,
} from "next/font/google";

/**
 * Font strategy — critical path only.
 *
 * A grep of `font-*` Tailwind classes across `src/` shows only three families
 * are actually rendered anywhere in the UI:
 *   • `font-editorial` (Outfit)          — 159 refs
 *   • `font-jakarta`   (Plus Jakarta)    — 219 refs
 *   • `font-serif`     (Cormorant)       — 4 refs, all on rarely-hit
 *                                          error / loading / 404 pages
 *
 * The tailwind config still exposes `font-inter`, `font-display`, `font-syne`
 * and `font-outfit` for backward compatibility, but the underlying CSS
 * variables are no longer defined, so the browser resolves them via the
 * fallback stack — no network request is made for them. Only the three
 * families below are downloaded.
 *
 * Weights are trimmed to what the codebase actually uses (light/normal/medium/
 * semibold/bold/black), avoiding the ~30% payload previously spent on
 * unused 800 weights and unused families.
 */

export const fontEditorial = Outfit({
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
  weight: ["400", "500", "600", "700", "900"],
  preload: true,
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "Segoe UI",
    "sans-serif",
  ],
  // Next expects boolean | undefined; opting into the built-in metric
  // adjustment (default true) is enough to eliminate CLS.
  adjustFontFallback: true,
});

/** Legacy alias — a handful of files import `fontOutfit`; keep it resolving. */
export const fontOutfit = fontEditorial;

export const fontJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "Segoe UI",
    "sans-serif",
  ],
  // Next expects boolean | undefined; opting into the built-in metric
  // adjustment (default true) is enough to eliminate CLS.
  adjustFontFallback: true,
});

/** Legacy alias — body className falls through to Jakarta via Tailwind. */
export const fontSans = fontJakarta;

/**
 * Rarely rendered — error / loading / not-found / dev-banner surfaces only.
 * Not preloaded to keep it off the critical path.
 */
export const fontSerif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500"],
  preload: false,
  fallback: [
    "ui-serif",
    "Georgia",
    "Cambria",
    "Times New Roman",
    "serif",
  ],
});
