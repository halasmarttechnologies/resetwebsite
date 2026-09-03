# SEO & Local Search Strategy — Reset Men Salon

## 1. Local SEO Objective
Dominate high-intent, luxury grooming search queries across Dubai, specifically targeting:
- **Primary Keywords**:
  - "Luxury men salon Business Bay Dubai"
  - "Japanese Head Spa Dubai for men"
  - "Best men's haircut Business Bay"
  - "Executive beard styling Dubai"
  - "Gentlemen's facial and scalp treatment Dubai"
- **Secondary Local Terms**: Downtown Dubai, DIFC, Sheikh Zayed Road, Dubai Canal.

---

## 2. Structured Data & JSON-LD Schemas

### 1. `HairSalon` / `LocalBusiness` Schema (Global Layout)
```json
{
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "name": "Reset Men Salon",
  "image": "https://resetmensalon.ae/brand/og-image.jpg",
  "@id": "https://resetmensalon.ae",
  "url": "https://resetmensalon.ae",
  "telephone": "+97145655688",
  "priceRange": "$$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Business Bay",
    "addressLocality": "Dubai",
    "addressRegion": "Dubai",
    "postalCode": "00000",
    "addressCountry": "AE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 25.1867,
    "longitude": 55.2744
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "10:00",
      "closes": "22:00"
    }
  ]
}
```

### 2. `Service` Schema (Per Service Page)
- Attached to individual service routes (`/services/[category]/[slug]`).
- Includes precise service type, provider reference, duration (`PT45M`), and currency (`AED`).

### 3. `Article` Schema (Blog Pages)
- Full author byline, publisher attribution, and date modified.

---

## 3. Dynamic Sitemap & Robots.txt
- `src/app/sitemap.ts`: Automatically enumerates all static routes, active service categories, individual service detail URLs, and published blog posts with `<lastmod>` timestamps.
- `src/app/robots.ts`: Allows all search engines while disallowing internal API endpoints and admin paths.
