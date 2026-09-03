# Component System & UI Architecture — Reset Men Salon

## 1. Directory Structure

```text
src/components/
├── ui/                     # Design system atoms & primitives
│   ├── button.tsx          # Accessible luxury button variations
│   ├── badge.tsx           # Category, signature & pricing badges
│   ├── card.tsx            # Obsidian surface cards with border micro-accents
│   ├── container.tsx       # Standardized responsive container bounds
│   ├── heading.tsx         # Editorial typography headings
│   ├── input.tsx           # Dark form inputs with bronze focus rings
│   ├── textarea.tsx        # Styled multiline inputs
│   └── skeleton.tsx        # Zero-CLS loading skeletons
├── animation/              # Centralized motion components
│   ├── smooth-scroll.tsx   # Lenis initialization with reduced-motion check
│   ├── motion-wrapper.tsx  # Framer Motion declarative wrappers
│   ├── text-reveal.tsx     # Editorial character/word staggered reveal
│   └── fade-in.tsx         # Viewport entry animation wrappers
├── layout/                 # Global site frame
│   ├── header.tsx          # Fixed luxury header with blur backdrop
│   ├── footer.tsx          # Comprehensive footer with SEO links & hours
│   ├── mobile-nav.tsx      # Fullscreen luxury mobile drawer
│   └── announcement.tsx    # Head Spa & seasonal announcement strip
└── sections/               # Composite feature sections (Phase 2)
    ├── hero-section.tsx
    ├── services-showcase.tsx
    ├── head-spa-feature.tsx
    ├── pricing-grid.tsx
    ├── testimonials-slider.tsx
    └── contact-strip.tsx
```

---

## 2. Component Guidelines
- **Server Components by Default**: All layout, navigation, and section shells are React Server Components (`RSC`) unless state/client-side event listeners are required.
- **Micro-Client Boundaries**: Keep `"use client"` contained at the lowest interactive leaf (e.g. `SmoothScrollProvider`, `MobileNavToggle`, `BookingModal`).
- **No Inline Styles**: All styling must strictly utilize Tailwind design tokens.
- **A11y Compliant**: Every interactive component must support keyboard navigation, ARIA attributes, and focus rings.
