# Performance Engineering Strategy — Reset Men Salon

## 1. Core Web Vitals Targets

| Metric | Target | Optimization Strategy |
|---|---|---|
| **LCP (Largest Contentful Paint)** | `< 1.2s` | Preload hero images, Next/Image with AVIF/WebP, priority loading on above-the-fold media |
| **FID / INP (Interaction to Next Paint)**| `< 50ms` | Minimal client JS bundle, deferred non-critical scripts, event delegation |
| **CLS (Cumulative Layout Shift)** | `0.00` | Explicit width/height on images, skeleton fallbacks, font `display: swap` with size adjust |
| **TTFB (Time to First Byte)** | `< 200ms` | Edge CDN caching via Vercel/Cloudflare, incremental static regeneration (ISR) |

---

## 2. Server vs Client Component Splitting
- 90% of page layouts are rendered as React Server Components (RSC).
- Client bundle size is strictly monitored; dynamic imports (`next/dynamic`) are utilized for heavy interactive components (e.g. Map embeds, video modal dialogs).

---

## 3. Image Optimization Pipeline
- All photographic assets are served via Next.js Image Optimization (`next/image`) in modern formats (`image/avif`, `image/webp`).
- Responsive `sizes` attributes prevent desktop-sized images from downloading on mobile viewports.
- Lazy-loading applied natively to all off-screen gallery items and service cards.
