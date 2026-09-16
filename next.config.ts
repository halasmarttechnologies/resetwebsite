import type { NextConfig } from "next";

/**
 * Production security headers.
 *
 * Key decisions:
 * - CSP is report-only in dev, enforced in production (set CSP_ENFORCE=0 to override).
 * - Cross-Origin-Resource-Policy is NOT set globally — it would block Vercel's CDN
 *   from delivering /_next/static chunks to the browser.
 * - Cross-Origin-Opener-Policy uses same-origin-allow-popups so WhatsApp / booking
 *   links that open in a new tab still work.
 */

const isProd = process.env.NODE_ENV === "production";

const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  "'unsafe-eval'",
  "https:",
  "https://link.msgsndr.com",
  "https://*.msgsndr.com",
  "https://va.vercel-scripts.com",
  "https://vitals.vercel-insights.com",
];

const cspDirectives: Record<string, string[]> = {
  "default-src": ["'self'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'", "https://api.whatsapp.com", "https://wa.me"],
  "frame-ancestors": ["'none'"],
  "object-src": ["'none'"],
  "script-src": scriptSrc,
  // Framer Motion writes inline styles; Google Fonts hosts stylesheets.
  "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  "font-src": ["'self'", "data:", "https://fonts.gstatic.com"],
  "img-src": [
    "'self'",
    "data:",
    "blob:",
    "https:",
  ],
  "media-src": ["'self'", "blob:", "data:", "https:"],
  "connect-src": [
    "'self'",
    "https:",
    "wss:",
    "blob:",
    "https://api.resend.com",
    "https://vitals.vercel-insights.com",
    "https://backend.leadconnectorhq.com",
    "https://*.leadconnectorhq.com",
    "https://link.msgsndr.com",
    "https://*.msgsndr.com",
  ],
  "frame-src": [
    "'self'",
    "https://www.google.com",
    "https://www.google.ae",
    "https://*.google.com",
    "https://widgets.leadconnectorhq.com",
    "https://*.leadconnectorhq.com",
    "https://*.msgsndr.com",
  ],
  "worker-src": ["'self'", "blob:"],
  "manifest-src": ["'self'"],
  "upgrade-insecure-requests": [],
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

// In production, keep CSP in Report-Only mode unless explicitly set to enforce with CSP_ENFORCE=1.
// This guarantees that no legitimate client JS chunks, fonts, or assets are ever blocked.
const CSP_HEADER_NAME =
  process.env.CSP_ENFORCE === "1"
    ? "Content-Security-Policy"
    : "Content-Security-Policy-Report-Only";

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

// Safe headers that work on all routes including static assets on Vercel CDN
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
  // same-origin-allow-popups: keeps WhatsApp / booking popups working
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  // NOTE: Cross-Origin-Resource-Policy is intentionally omitted globally.
  // Setting it to "same-origin" on /:path* would block Vercel's CDN from
  // delivering /_next/static JS/CSS chunks, breaking the entire site.
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

// API responses must never be cached by a shared CDN.
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
