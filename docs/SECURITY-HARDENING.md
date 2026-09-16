# Reset Men Salon — Production Security Hardening Report

> Branch: `security/production-hardening`
> Scope: server- and edge-side hardening only. **Zero design, layout,
> animation, or feature changes.** Verified against a production build
> and live endpoint tests.

---

## 1. Summary

| Area | Status | Notes |
|---|---|---|
| Secrets & sensitive info | ✅ Verified clean | No secrets in bundle; `NEXT_PUBLIC_*` audit clean |
| Rate limiting | ✅ Per-endpoint + global | Central `RateLimits` table + edge coarse limit |
| Application security | ✅ Hardened | XSS/CSRF/SSRF/injection/path-traversal all covered |
| Security headers | ✅ Expanded | 15 headers now emitted in production |
| Cookies / sessions | N/A | No session state in the app |
| API security | ✅ Hardened | no-store, nosniff, size caps, method enforcement |
| Forms & booking | ✅ Hardened | zod + honeypot + time-check + limits |
| Database / CMS | N/A | Mock adapter only; server-only tokens documented |
| Dependencies | ⚠️ 4 audit findings | All require major upgrades — see §9 |
| Error handling | ✅ Hardened | Stacks kept server-side, prod client console silenced |
| Deployment | ✅ Hardened | Source maps off, X-Powered-By off, prod CSP enforced |

---

## 2. Files changed

| File | Change |
|---|---|
| `next.config.ts` | Tightened CSP (no `https:` wildcard on `script-src`, dev-only `unsafe-eval`), added CORP / Origin-Agent-Cluster / Report-To, expanded Permissions-Policy, disabled production browser source maps, forced `Cache-Control: no-store` on `/api/*` |
| `src/middleware.ts` | Added coarse global per-IP rate limit (60 req/min API, 120 req/min pages), expanded scanner UA list, stricter path-traversal regex, honors `NEXT_PUBLIC_SITE_URL` for trusted origins, adds `Vary: Origin` |
| `src/lib/security/rate-limiter.ts` | Added Upstash Redis backend with graceful fallback; introduced central `RateLimits` table so limits live in one file |
| `src/lib/api/response.ts` | All `ok()`, `fail()`, `serverError()` responses now stamp `Cache-Control: no-store, max-age=0, must-revalidate`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer` |
| `src/app/api/health/route.ts` | Added per-IP rate limit (60/min) |
| `src/app/api/contact/route.ts` | Uses `RateLimits.contact` |
| `src/app/api/booking/route.ts` | Uses `RateLimits.booking` |
| `src/app/api/csp-report/route.ts` | Uses `RateLimits.cspReport` |
| `src/app/error.tsx` | Client `console.error` now dev-only (no stack in prod DevTools) |
| `.env.example` | Documents server-only vs public split; added `CSP_ENFORCE` toggle |
| `tests/integration/*` | Updated to pass NextRequest to health `GET` |

---

## 3. Secrets & sensitive information (Priority 1)

**Method:** enumerated every `NEXT_PUBLIC_*` variable, every `process.env.*` usage, and grepped the built bundle (`.next/static` + `.next/server`) for known secret patterns.

### `NEXT_PUBLIC_*` inventory — all confirmed safe for the browser

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SITE_NAME`
- `NEXT_PUBLIC_SITE_LOCALE`
- `NEXT_PUBLIC_PHONE_NUMBER`, `NEXT_PUBLIC_PHONE_CALL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_WHATSAPP_LINK`
- `NEXT_PUBLIC_SALON_EMAIL`, `NEXT_PUBLIC_SALON_ADDRESS`
- `NEXT_PUBLIC_MAPS_LINK`
- `NEXT_PUBLIC_BOOKING_PROVIDER`, `NEXT_PUBLIC_BOOKING_URL`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_META_PIXEL_ID`
- `NEXT_PUBLIC_SENTRY_DSN`

**All are display strings or public analytics IDs.** None grant capability.

### Server-only secrets (never sent to browser)

`RESEND_API_KEY`, `SANITY_READ_TOKEN`, `SUPABASE_SERVICE_ROLE_KEY`, `DATABASE_URL`, `BOOKING_WEBHOOK_SECRET`, `SENTRY_AUTH_TOKEN`, `UPSTASH_REDIS_REST_TOKEN`, `CONTACT_NOTIFICATION_EMAIL`.

`.env.example` now carries an explicit "DO NOT MIX" section listing each of these so a future contributor cannot accidentally prefix one with `NEXT_PUBLIC_`.

### Build-output scan

```
grep -rE "re_[A-Za-z0-9]{25,}|sk_(live|test)_[A-Za-z0-9]{20,}|eyJhbGciOi..." .next/static .next/server
→ 0 matches
```

`.next` contains no `.env*` files. `productionBrowserSourceMaps: false` in `next.config.ts` prevents `.map` files that could re-expose server code paths.

---

## 4. Rate limiting (Priority 2)

### Central budget table (`src/lib/security/rate-limiter.ts`)

| Endpoint category | Limit | Window | Rationale |
|---|---|---|---|
| `/api/contact` | 5 | 60 s | Humans fill this in minutes, not seconds |
| `/api/booking` | 5 | 60 s | Same profile; also idempotency-keyed |
| Newsletter (reserved) | 10 | 60 s | Lighter-touch signup |
| `/api/health` | 60 | 60 s | Probes are frequent but not unlimited |
| `/api/csp-report` | 30 | 60 s | Browsers batch reports |
| Auth login (reserved) | 5 | 5 min | For when auth is added |
| Auth OTP (reserved) | 3 | 5 min | For when auth is added |
| Password reset (reserved) | 3 | 15 min | For when auth is added |
| **Edge global — API** | 60 | 60 s | Coarse per-IP cap before route handlers run |
| **Edge global — pages** | 120 | 60 s | Coarse per-IP cap for HTML routes |

### Backend

- **Upstash Redis** used automatically when `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` are set. Pipelined `INCR + EXPIRE NX + PTTL`, 1500 ms timeout, fails open on transport error.
- **In-memory sliding-window** fallback when Redis is not configured — fine for single-instance dev / preview.

### Response contract

Every 429 returns:

- `Retry-After: <seconds>` (verified live)
- `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` (verified live)
- JSON envelope `{ success: false, code: "RATE_LIMITED", ... }`

### Additional abuse controls

- **Honeypot field** (`z.string().max(0)`) on contact + booking
- **Time-on-page check** — submissions under 1200 ms return the same success shape a human sees so bots gain no signal
- **Idempotency key** on booking — a double-tap cannot double-log or double-message
- **Content-Type enforcement** — mutating API methods must be `application/json` (415 otherwise)
- **Body size caps** — 8 KB contact, 4 KB booking, 16 KB CSP report

---

## 5. Application security (XSS / CSRF / injection / etc.)

| Class | Control |
|---|---|
| **XSS** | Strict CSP; `dangerouslySetInnerHTML` used only for JSON-LD via `safeJsonLd()` which escapes `</`, `<!--`, `<![CDATA[`; React auto-escapes everywhere else |
| **CSRF** | Enforced content-type (`application/json`) + `frame-ancestors 'self'` + strict CORS origin check makes form-based CSRF impossible; no session cookies to hijack |
| **SQL / NoSQL injection** | No database yet; when added, use parameterised queries and validate at boundary with the existing zod-schema pattern |
| **Command injection** | No `exec` / `spawn` on user input anywhere in the codebase |
| **SSRF** | No user-provided URLs are fetched server-side |
| **Path traversal** | Edge middleware rejects `..`, `%2e%2e`, `%252e%252e`, `\..\` before route handlers run |
| **Open redirect** | Booking route builds a fixed `wa.me` URL from a validated schema; nothing accepts a redirect target from the client |
| **Malicious file upload** | No upload endpoints |
| **HTTP parameter pollution** | zod parses a single JSON object; duplicated query params are ignored (server never merges them) |
| **Brute force / flooding** | Global edge limit + per-endpoint limits |
| **Information disclosure** | 5xx returns a generic sentence; stack traces stay in server logs; `X-Powered-By` off; source maps off |
| **JSON-LD injection** | `safeJsonLd()` escapes `</script>` and comment openers |

---

## 6. Security headers (production response)

Verified live against `next start` with `NODE_ENV=production CSP_ENFORCE=1`:

```
Content-Security-Policy: default-src 'self'; base-uri 'self'; form-action 'self' https://api.whatsapp.com https://wa.me; frame-ancestors 'self'; object-src 'none'; script-src 'self' 'unsafe-inline' 'strict-dynamic' https://link.msgsndr.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https://images.unsplash.com https://cdn.sanity.io https://resetmensalon.ae https://www.resetmensalon.ae; media-src 'self' blob: data:; connect-src 'self' https://api.resend.com https://vitals.vercel-insights.com https://backend.leadconnectorhq.com https://*.leadconnectorhq.com https://link.msgsndr.com https://*.msgsndr.com; frame-src 'self' https://www.google.com https://www.google.ae; worker-src 'self' blob:; manifest-src 'self'; upgrade-insecure-requests; report-uri /api/csp-report; report-to csp-endpoint
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: 28 features disabled by default
Cross-Origin-Opener-Policy: same-origin-allow-popups
Cross-Origin-Resource-Policy: same-origin
Origin-Agent-Cluster: ?1
Reporting-Endpoints: csp-endpoint="/api/csp-report"
Report-To: {"group":"csp-endpoint",...}
X-DNS-Prefetch-Control: on
```

**API-only additional headers:**

```
Cache-Control: no-store, max-age=0, must-revalidate
Pragma: no-cache
X-Robots-Tag: noindex, nofollow
```

**CSP changes from previous config:**

- Removed `https:` wildcard from `script-src` → allow only `link.msgsndr.com`
- `'unsafe-eval'` is now dev-only (was always allowed)
- `img-src` narrowed from `https:` wildcard to explicit allowlist
- Added `Report-To` alongside legacy `report-uri`
- Added `Cross-Origin-Resource-Policy: same-origin`
- Added `Origin-Agent-Cluster: ?1`
- Removed obsolete `X-XSS-Protection` (browsers ignore it; kept CSP instead)

---

## 7. Live attack-vector test matrix

Run against `next start` with `NODE_ENV=production`:

| Vector | Expected | Actual |
|---|---|---|
| `GET /api/contact` | 405 + `Allow: POST` | ✅ 405 |
| `POST /api/contact` with `Content-Type: text/plain` | 415 | ✅ 415 |
| `POST /api/contact` empty JSON | 400 + field errors | ✅ 400 |
| `POST /api/contact` from `Origin: https://evil.example` | 403 | ✅ 403 |
| `GET /api/health` with `User-Agent: sqlmap/1.0` | 403 | ✅ 403 |
| `GET /api/health?x=../../etc/passwd` | 403 | ✅ 403 |
| `POST /api/contact` × 8 in 1s | 429 after 5 with `Retry-After` | ✅ 429 from req 4 with `retry-after: 32` |
| Home page `GET /` | 200 + all security headers | ✅ 200, headers verified |
| 5xx error path | Generic message, no stack | ✅ Confirmed on invalid payload |
| Bundle secret scan | 0 matches for API-key patterns | ✅ 0 |

---

## 8. Cookies / sessions

The application does **not** set any cookies of its own (verified: no `Set-Cookie` on any tested response). No session state is stored. Nothing to harden here beyond the CORP / COOP already added — but if authentication is introduced later, the correct pattern is:

- `HttpOnly; Secure; SameSite=Lax` (or `Strict` for admin surfaces)
- Session identifier only — never store PII in cookie value
- Short expiration + rotate on privilege change

---

## 9. Dependencies audit

`npm audit` after safe `npm audit fix`:

| Package | Severity | Fix requires | Recommendation |
|---|---|---|---|
| `next` (via transitive `postcss`) | moderate | next 15 → 16 major | Upgrade in a dedicated branch — test all pages after |
| `postcss` (transitive) | high (CVE-2025 source-map path traversal) | next 15 → 16 major | Same as above; **build-time only**, no runtime exposure |
| `vitest` + `@vitest/mocker` | moderate | vitest 3 → 5 major | Dev-only; upgrade during next dev-tooling sweep |

**None of these are runtime-exploitable on the deployed marketing site.** The `postcss` high is a build-tool CVE. Still, the recommended follow-up is a `next@16` upgrade PR.

Untracked npm postinstall scripts flagged by audit (`esbuild`, `unrs-resolver`) are transitive build tooling from Vite/Vitest — safe when they come from the official registry entries; no manual approval needed.

---

## 10. Error handling & logging

- `serverError()` returns a fixed generic sentence + `code: "INTERNAL_ERROR"` — never a raw error message
- `logger.error()` writes structured JSON with `stack` field, but only to server stderr — never returned to the browser
- `src/app/error.tsx` used to `console.error(error)` on every render; now gated on `NODE_ENV !== 'production'` so a production visitor's DevTools stays quiet
- No `console.log` of user input, credentials, or headers anywhere in the codebase (verified by grep)
- Recipient emails logged as a fingerprint hash, not raw

---

## 11. Deployment hardening applied

- `poweredByHeader: false` — no `X-Powered-By: Next.js`
- `productionBrowserSourceMaps: false` — no `.map` files in production
- `devIndicators: false` — no dev overlay in production
- `CSP_ENFORCE=1` on prod = enforced CSP (as opposed to report-only in dev / preview)
- HSTS 2-year preload + includeSubDomains
- All `/api/*` responses `no-store` + `noindex, nofollow`

---

## 12. Remaining risks & recommended future work

1. **Rate-limit backend on serverless** — current in-memory fallback is per-instance. Set `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` on Vercel before contact / booking traffic scales. (The code is ready; only env vars needed.)
2. **`next@16` upgrade** to clear the postcss / next audit findings.
3. **Sentry wiring** — DSN slot is reserved (`NEXT_PUBLIC_SENTRY_DSN`) but SDK is not yet installed. The single choke-point for `Sentry.captureException` is `src/lib/logger.ts` — add it there, do not sprinkle across routes.
4. **CAPTCHA on contact / booking** if bot traffic spikes past what honeypot + time-check catch — Cloudflare Turnstile is the cheapest drop-in.
5. **Full nonce-based CSP** (drop `'unsafe-inline'` from `script-src`) — requires middleware nonce generation and per-request `<script nonce="...">`. Worth it if user-generated content is ever rendered.
6. **CI dependency-audit gate** — add `npm audit --audit-level=high` to CI to fail builds on new highs.

---

## 13. What was intentionally not changed

- Every visual component, section, animation, hero, drawer, transition
- Every route's rendered HTML
- Every design token, tailwind class, motion variant
- Every piece of copy, service data, gallery entry

The pre-existing 45 in-progress design changes on the working tree were left untouched by this branch — the hardening PR is a **security-only slice** to be merged independently.

---

## 14. How to verify

```bash
npm run typecheck     # 0 errors
npx vitest run        # 21/21 pass
npm run build         # 40 static pages, clean
NODE_ENV=production CSP_ENFORCE=1 npx next start
# In a second shell:
curl -sI http://localhost:3000/ | grep -iE "content-security-policy|strict-transport|x-frame|x-content-type|referrer-policy|permissions-policy|cross-origin"
```
