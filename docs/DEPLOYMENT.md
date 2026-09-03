# Deployment & CI/CD Strategy — Reset Men Salon

## 1. Hosting Target: Vercel (Production Recommended)
- **Runtime**: Node.js 20.x / Edge Middleware
- **Domain Mapping**: `resetmensalon.ae` & `www.resetmensalon.ae`
- **DNS**: Cloudflare / Route53 with SSL/TLS Full Strict mode.

---

## 2. Build & Release Pipeline
1. **Pull Request**:
   - Automated Lint (`npm run lint`)
   - Automated Typecheck (`npm run typecheck`)
   - Unit & Integration Test Suite (`npm run test`)
   - Preview Deployment on Vercel
2. **Main Branch Release**:
   - Production Build compilation (`npm run build`)
   - Zero-downtime atomic deployment
   - Cache invalidation and sitemap ping to search engines

---

## 3. Production Health Checks
- Verify `/api/health` returns `status: ok`
- Confirm `sitemap.xml` and `robots.txt` respond with `200 OK`
- Confirm Core Web Vitals via Vercel Speed Insights or PageSpeed Insights.
