# CMS Architecture & Data Layer — Reset Men Salon

## 1. Decoupled Architecture Design
The application is designed to be **100% headless-ready from Day 1**. The presentation layer never queries database drivers or API endpoints directly; instead, all data is mediated by the `CmsClient` interface:

```typescript
export interface CmsClient {
  getServices(): Promise<ServiceItem[]>;
  getServiceBySlug(slug: string): Promise<ServiceItem | null>;
  getServiceCategories(): Promise<ServiceCategory[]>;
  getCategoryBySlug(slug: string): Promise<ServiceCategory | null>;
  getPricingPackages(): Promise<PricingPackage[]>;
  getTeamMembers(): Promise<TeamMember[]>;
  getTestimonials(): Promise<Testimonial[]>;
  getGalleryItems(): Promise<GalleryItem[]>;
  getFaqs(category?: string): Promise<FaqItem[]>;
  getBlogPosts(options?: BlogQueryOptions): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | null>;
  getBlogCategories(): Promise<BlogCategory[]>;
  getSiteSettings(): Promise<SiteSettings>;
}
```

---

## 2. Supported Adapters
1. **Mock CMS Adapter (`MockCmsAdapter`)**: Serves statically typed, comprehensive local datasets located in `src/data/`. Enabled by default for zero-latency local development and tests.
2. **Sanity Adapter (`SanityCmsAdapter`)**: Queries Sanity GROQ endpoints with live preview support.
3. **Contentful / Strapi Adapter**: Easily swappable by fulfilling the `CmsClient` contract without changing a single React component.

---

## 3. Core Schema Definitions

### `ServiceItem`
- `id`: string (UUID)
- `slug`: string (unique kebab-case)
- `title`: string
- `categorySlug`: string
- `shortDescription`: string
- `fullDescription`: string
- `durationMinutes`: number
- `priceAED`: number
- `isSignature`: boolean
- `featuredImage`: ImageAsset
- `benefits`: string[]
- `faqs`: FaqItem[]
- `seo`: SeoMetadata

### `PricingPackage`
- `id`: string
- `title`: string
- `subtitle`: string
- `priceAED`: number
- `duration`: string
- `isPopular`: boolean
- `includedServices`: string[]
- `ctaText`: string

### `BlogPost`
- `id`: string
- `slug`: string
- `title`: string
- `excerpt`: string
- `content`: string (Markdown / PortableText)
- `category`: BlogCategory
- `author`: TeamMember
- `publishedAt`: string (ISO 8601)
- `readingTimeMinutes`: number
- `coverImage`: ImageAsset
- `seo`: SeoMetadata
