import type { NextConfig } from "next";

/**
 * Content-Security-Policy directives.
 *
 * Shipped as `Content-Security-Policy-Report-Only` first so any missed
 * source shows up in logs instead of breaking pages. Promote to the
 * enforced header (`Content-Security-Policy`) once `/api/csp-report`
 * has been quiet for a full week of real traffic — see the toggle
 * `CSP_ENFORCE=1` at the bottom of this file.
 *
 * Notes on trade-offs:
 * • `script-src 'unsafe-inline'` — Next.js injects small inline scripts
 *   for the RSC payload + a JSON-LD `<script type=application/ld+json>`
 *   we render intentionally. A nonce-based approach requires runtime
 *   middleware; not worth it for a marketing site with no user-supplied
 *   HTML. `'strict-dynamic'` mitigates the risk of injected 3rd-party
 *   script loading further scripts.
 * • `style-src 'unsafe-inline'` — Framer Motion sets inline styles
 *   (transform, opacity, etc.) on every animated element. Without this
 *   every scroll and hover animation would violate the policy.
 * • Google Maps embed and Google Fonts are the only 3rd-party origins
 *   used at runtime — everything else is same-origin or a CDN we
 *   already allow through `remotePatterns`.
 */

const cspDirectives: Record<string, string[]> = {
  "default-src": ["'self'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'", "https://api.whatsapp.com", "https://wa.me"],
  "frame-ancestors": ["'self'"],
  "object-src": ["'none'"],
  // Next injects minimal inline scripts + our JSON-LD is inline; keep
  // 'strict-dynamic' so a trusted script cannot pull in an untrusted one.
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    "'strict-dynamic'",
    "https:",
  ],
  // Framer Motion writes inline styles.
  "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  "font-src": ["'self'", "data:", "https://fonts.gstatic.com"],
  "img-src": [
    "'self'",
    "data:",
    "blob:",
    "https://resetmensalon.ae",
    "https://images.unsplash.com",
    "https://cdn.sanity.io",
    // Google Maps embed leaks tile imagery.
    "https://maps.gstatic.com",
    "https://maps.googleapis.com",
    "https://www.google.com",
  ],
  "media-src": ["'self'", "blob:", "data:"],
  "connect-src": [
    "'self'",
    "https://api.resend.com",
    // Vercel/analytics defaults — safe fallbacks that do nothing until
    // the corresponding env var is set.
    "https://vitals.vercel-insights.com",
  ],
  "frame-src": [
    "'self'",
    "https://www.google.com",
    "https://www.google.ae",
  ],
  "worker-src": ["'self'", "blob:"],
  "manifest-src": ["'self'"],
  "upgrade-insecure-requests": [],
  // Where CSP violation reports POST to. The stub route logs each
  // violation as a structured log line and returns 204.
  "report-uri": ["/api/csp-report"],
};

function buildCspHeader(): string {
  return Object.entries(cspDirectives)
    .map(([directive, values]) =>
      values.length > 0 ? `${directive} ${values.join(" ")}` : directive,
    )
    .join("; ");
}

const CSP_HEADER_NAME =
  process.env.CSP_ENFORCE === "0"
    ? "Content-Security-Policy-Report-Only"
    : "Content-Security-Policy";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self)",
  },
  { key: CSP_HEADER_NAME, value: buildCspHeader() },
  // Cross-Origin isolation headers — mitigates Spectre-class side-channel attacks.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  // "credentialless" is safer than "require-corp" — doesn't break Google Maps embed.
  { key: "Cross-Origin-Embedder-Policy", value: "credentialless" },
  // Modern Reporting API — pairs with `report-to` in CSP above.
  // The older `Report-To` (JSON, deprecated) is intentionally omitted:
  // the built-in Node server strips subsequent headers when it sees the
  // stringified JSON, but `Reporting-Endpoints` alone works everywhere
  // Report-To once was needed and browsers now prefer.
  { key: "Reporting-Endpoints", value: `csp-endpoint="/api/csp-report"` },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false, // Disables Next.js DevTools Segment Explorer overlay that causes React Client Manifest crashes
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90, 100],
    remotePatterns: [
      { protocol: "https", hostname: "resetmensalon.ae" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
