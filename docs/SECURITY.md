# Security Architecture & Policies — Reset Men Salon

## 1. Threat Modeling & Defense in Depth
- **Zero Exposed Secrets**: No sensitive environment variables (API keys, secrets) prefixed with `NEXT_PUBLIC_`.
- **Runtime Environment Validation**: Zod schema in `src/lib/env.ts` parses and enforces valid environment configurations at build and startup time.

---

## 2. HTTP Security Headers
Configured natively in `next.config.ts`:
- `Content-Security-Policy`: Restricts script, frame, and media sources.
- `Strict-Transport-Security`: `max-age=63072000; includeSubDomains; preload`
- `X-Frame-Options`: `SAMEORIGIN` (prevents clickjacking attacks)
- `X-Content-Type-Options`: `nosniff` (mitigates MIME-type sniffing)
- `Referrer-Policy`: `origin-when-cross-origin`
- `Permissions-Policy`: `camera=(), microphone=(), geolocation=(self)`

---

## 3. API & Form Protection
- **Payload Validation**: All incoming requests to `/api/contact` and `/api/booking` validated with Zod.
- **Sanitization**: Strip HTML and SQL injection patterns from user input.
- **Spam & Bot Prevention**: Honeypot field technique on contact forms alongside rate limiting.
- **Rate Limiting**: IP-based rate limiting window (10 requests per minute per IP).
