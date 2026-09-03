# Changelog — Reset Men Salon Rebuild

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0-alpha.1] - 2026-09-03

### Added
- **Project Foundation**: Initialized Next.js 15+ App Router with TypeScript (Strict Mode).
- **Design Tokens**: Configured Tailwind CSS with custom dark luxury tokens (`noir`, `brand-gold`, `brand-bronze`, `champagne`).
- **Comprehensive Documentation**: Added 16 architectural documents in `docs/` and root `ARCHITECTURE.md`.
- **Decoupled CMS Data Model**: Created TypeScript domain models for Services (7 categories), Pricing, Testimonials, Team, FAQs, Blog, and Location.
- **Animation System**: Integrated Lenis smooth scroll provider, Framer Motion transitions, and reduced-motion fallback handlers.
- **SEO Framework**: Established dynamic JSON-LD Schema generators (`HairSalon`, `Service`, `Article`, `BreadcrumbList`), dynamic `sitemap.ts`, and `robots.ts`.
- **Security & Env**: Configured strict HTTP security headers in `next.config.ts`, Zod-based environment variable validation, and rate limiting foundations.
- **Test Suite**: Configured Vitest and test harnesses in `tests/`.
- **Routing Scaffold**: Scaffolded all routes (`/`, `/about`, `/services`, `/pricing`, `/blog`, `/contact`, `/api/health`) with clean "In Development" status placeholders.
