# RESET MEN SALON — Official Website Rebuild

> Luxury Men's Grooming Destination & Japanese Head Spa — Business Bay, Dubai, UAE.  
> Official Domain: [https://resetmensalon.ae/](https://resetmensalon.ae/)

---

## 🛠 Tech Stack
- **Framework**: Next.js 15+ (App Router with React Server Components)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS with custom editorial dark luxury design tokens
- **Animations**: Framer Motion, GSAP, and Lenis smooth scroll
- **Icons**: Lucide Icons
- **Validation**: Zod (Environment, API payloads, Forms)
- **Testing**: Vitest & React Testing Library
- **CMS Compatibility**: Decoupled Adapter (Sanity / Strapi / Mock)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js `v20.x` or `v22.x`+
- npm `v10.x`+

### 2. Installation
```bash
# Clone the repository
git clone <repo-url>
cd reset-men-salon

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
```

### 3. Development
```bash
# Start local development server
npm run dev

# Run test suite
npm run test

# Typecheck and lint
npm run typecheck
npm run lint
```

---

## 📚 Complete Project Documentation
All architectural specifications, brand guidelines, design systems, and operational documents are available in the [`docs/`](./docs/) directory:

- [`ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — System design and technical roadmap
- [`PROJECT-BRIEF.md`](./docs/PROJECT-BRIEF.md) — Business vision, target audience, and salon identity
- [`DESIGN-SYSTEM.md`](./docs/DESIGN-SYSTEM.md) — Tokens, typography, colors, layout grid
- [`BRAND-GUIDELINES.md`](./docs/BRAND-GUIDELINES.md) — Visual identity, tone of voice, imagery
- [`CONTENT-STRUCTURE.md`](./docs/CONTENT-STRUCTURE.md) — Site map, service hierarchy, content models
- [`CMS-ARCHITECTURE.md`](./docs/CMS-ARCHITECTURE.md) — Headless CMS integration and schema contracts
- [`COMPONENT-SYSTEM.md`](./docs/COMPONENT-SYSTEM.md) — Component breakdown and patterns
- [`ANIMATION-SYSTEM.md`](./docs/ANIMATION-SYSTEM.md) — Motion curves, Lenis setup, GSAP guidelines
- [`SEO-STRATEGY.md`](./docs/SEO-STRATEGY.md) — Local SEO, Schema.org JSON-LD, metadata
- [`PERFORMANCE.md`](./docs/PERFORMANCE.md) — Core Web Vitals, asset optimization, caching
- [`ACCESSIBILITY.md`](./docs/ACCESSIBILITY.md) — WCAG 2.1 AA compliance, keyboard navigation
- [`SECURITY.md`](./docs/SECURITY.md) — Security headers, validation, rate limiting
- [`ENVIRONMENT.md`](./docs/ENVIRONMENT.md) — Environment variables and third-party setups
- [`API-DOCUMENTATION.md`](./docs/API-DOCUMENTATION.md) — REST endpoints and contracts
- [`DEPLOYMENT.md`](./docs/DEPLOYMENT.md) — CI/CD, Vercel/Node deployment guide
- [`CHANGELOG.md`](./docs/CHANGELOG.md) — Version history and roadmap

---

## 📌 Development State
> **Note**: This codebase is currently in **Phase 1 (Architecture & System Initialization)**. All route pages render a standardized development shell while underlying architecture, data contracts, and systems are configured. Full visual UI design will be developed in structured phases.
