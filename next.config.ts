import type { NextConfig } from "next";

/**
 * Production security headers.
 *
 * CSP is emitted as `Content-Security-Policy` in production and as
 * `Content-Security-Policy-Report-Only` in development so that missed
 * sources surface in `/api/csp-report` logs instead of breaking a
 * developer page. Set `CSP_ENFORCE=0` in the environment to force
 * report-only mode on a preview deployment while auditing.
 *
 * Trade-off notes:
 * • `'unsafe-inline'` on `script-src` is limited to production because
 *   Next injects tiny bootstrap scripts and we render one intentional
 *   JSON-LD `<script>` tag. A nonce-based CSP requires request-scoped
 *   middleware and buys little on a static marketing site.
 * • `'unsafe-eval'` is only allowed in development (Next HMR + refresh
 *   loop). Production builds do not need it.
 * • `'strict-dynamic'` keeps any trusted script from pulling in an
 *   untrusted one.
 * • `style-src 'unsafe-inline'` remains because Framer Motion writes
 *   inline style attributes on every animated element.
 */

const isProd = process.env.NODE_ENV === "production";

const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  "'strict-dynamic'",
  // GoHighLevel form tracker (contact page) — origin-scoped, not wildcarded.
  "https://link.msgsndr.com",
  // Dev/HMR needs eval; production build does not.
  ...(isProd ? [] : ["'unsafe-eval'"]),
];

const cspDirectives: Record<string, string[]> = {
  "default-src": ["'self'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'", "https://api.whatsapp.com", "https://wa.me"],
  "frame-ancestors": ["'self'"],
  "object-src": ["'none'"],
  "script-src": scriptSrc,
  // Framer Motion writes inline styles; Google Fonts host stylesheets.
  "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  "font-src": ["'self'", "data:", "https://fonts.gstatic.com"],
  // Narrowed from the previous `https:` wildcard to the actual image
  // sources Next optimises: same-origin, blob:/data: for image processing,
  // and the two CDNs registered in `images.remotePatterns` below.
  "img-src": [
    "'self'",
    "data:",
    "blob:",
    "https://images.unsplash.com",
    "https://cdn.sanity.io",
    "https://resetmensalon.ae",
    "https://www.resetmensalon.ae",
  ],
  "media-src": ["'self'", "blob:", "data:"],
  "connect-src": [
    "'self'",
    "https://api.resend.com",
    "https://vitals.vercel-insights.com",
    // GoHighLevel / LeadConnector external form tracking.
    "https://backend.leadconnectorhq.com",
    "https://*.leadconnectorhq.com",
    "https://link.msgsndr.com",
    "https://*.msgsndr.com",
  ],
  "frame-src": [
    "'self'",
    "https://www.google.com",
    "https://www.google.ae",
  ],
  "worker-src": ["'self'", "blob:"],
  "manifest-src": ["'self'"],
  "upgrade-insecure-requests": [],
  // Where CSP violation reports POST to. Kept alongside `report-to` for
  // older browsers that ignore the Reporting API endpoint group.
  "report-uri": ["/api/csp-report"],
  "report-to": ["csp-endpoint"],
};

function buildCspHeader(): string {
  return Object.entries(cspDirectives)
    .map(([directive, values]) =>
      values.length > 0 ? `${directive} ${values.join(" ")}` : directive,
    )
    .join("; ");
}

const CSP_HEADER_NAME =
  !isProd || process.env.CSP_ENFORCE === "0"
    ? "Content-Security-Policy-Report-Only"
    : "Content-Security-Policy";

const permissionsPolicy = [
  "accelerometer=()",
  "autoplay=(self)",
  "camera=()",
  "clipboard-read=()",
  "clipboard-write=(self)",
  "display-capture=()",
  "encrypted-media=()",
  "fullscreen=(self)",
  "geolocation=(self)",
  "gyroscope=()",
  "hid=()",
  "identity-credentials-get=()",
  "idle-detection=()",
  "interest-cohort=()",
  "magnetometer=()",
  "microphone=()",
  "midi=()",
  "otp-credentials=()",
  "payment=()",
  "picture-in-picture=()",
  "publickey-credentials-create=()",
  "publickey-credentials-get=()",
  "screen-wake-lock=()",
  "serial=()",
  "storage-access=()",
  "usb=()",
  "web-share=(self)",
  "xr-spatial-tracking=()",
].join(", ");

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: permissionsPolicy },
  { key: CSP_HEADER_NAME, value: buildCspHeader() },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "Origin-Agent-Cluster", value: "?1" },
  {
    key: "Reporting-Endpoints",
    value: `csp-endpoint="/api/csp-report"`,
  },
  {
    key: "Report-To",
    value: JSON.stringify({
      group: "csp-endpoint",
      max_age: 10886400,
      endpoints: [{ url: "/api/csp-report" }],
    }),
  },
];

// API responses must never be cached by a shared CDN. We set no-store in
// application code too (see `src/lib/api/response.ts`), but pin it at the
// edge as belt-and-braces so a misconfigured route cannot leak.
const noStoreForApis = [
  { key: "Cache-Control", value: "no-store, max-age=0, must-revalidate" },
  { key: "Pragma", value: "no-cache" },
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90, 100],
    remotePatterns: [
      { protocol: "https", hostname: "resetmensalon.ae" },
      { protocol: "https", hostname: "www.resetmensalon.ae" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/api/:path*", headers: noStoreForApis },
    ];
  },
};

export default nextConfig;
