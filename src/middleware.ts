import { NextRequest, NextResponse } from "next/server";

/**
 * Edge Middleware — runs on every request before route handlers.
 *
 * Responsibilities:
 *   1. CORS enforcement on API routes (same-origin + trusted origins only).
 *   2. Preflight (OPTIONS) handling with correct Access-Control-* headers.
 *   3. Content-Type enforcement: API POST/PUT/PATCH must be application/json.
 *   4. Bot user-agent blocking: known scanner signatures → 403.
 *   5. Path traversal guard: reject encoded traversal sequences.
 *
 * This middleware does NOT touch pages or static assets — only `/api/*`
 * paths carry enforcement logic. Pages get a pass-through so design,
 * animations, and transitions remain completely unaffected.
 */

/* ------------------------------------------------------------------ */
/*  Trusted origins — extend this list for staging / preview domains  */
/* ------------------------------------------------------------------ */

const TRUSTED_ORIGINS = new Set([
  "https://resetmensalon.ae",
  "https://www.resetmensalon.ae",
  // Vercel preview deployments use *.vercel.app
]);

/** In development, localhost is always trusted. */
function isTrustedOrigin(origin: string | null, host: string | null): boolean {
  if (!origin) return true; // Same-origin requests omit the header.
  if (TRUSTED_ORIGINS.has(origin)) return true;

  // Allow localhost in any port during development.
  try {
    const url = new URL(origin);
    if (url.hostname === "localhost" || url.hostname === "127.0.0.1") return true;
  } catch {
    return false;
  }

  // Allow same-host (e.g. Vercel preview: xyz.vercel.app)
  if (host && origin.endsWith(`://${host}`)) return true;

  return false;
}

/* ------------------------------------------------------------------ */
/*  Known malicious scanner / bot user-agent substrings (lowercase)   */
/* ------------------------------------------------------------------ */

const BLOCKED_UA_PATTERNS = [
  "sqlmap",
  "nikto",
  "nmap",
  "masscan",
  "dirbuster",
  "gobuster",
  "wpscan",
  "nuclei",
  "zgrab",
  "httpx",
  "acunetix",
  "nessus",
  "burpsuite",
  "metasploit",
  "havij",
  "webinspect",
  "appscan",
];

/* ------------------------------------------------------------------ */
/*  Path traversal patterns                                           */
/* ------------------------------------------------------------------ */

const TRAVERSAL_PATTERN = /(?:\.\.|%2e%2e|%252e%252e)/i;

/* ------------------------------------------------------------------ */
/*  Middleware handler                                                */
/* ------------------------------------------------------------------ */

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  // ── 1. Path traversal guard (all routes) ──────────────────────────
  if (TRAVERSAL_PATTERN.test(pathname) || TRAVERSAL_PATTERN.test(request.nextUrl.search)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // ── 2. Bot user-agent blocking (all routes) ───────────────────────
  const ua = (request.headers.get("user-agent") || "").toLowerCase();
  if (ua && BLOCKED_UA_PATTERNS.some((pattern) => ua.includes(pattern))) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // ── Only enforce CORS + content-type on API routes ────────────────
  if (!pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // ── 3. CORS: Preflight (OPTIONS) ─────────────────────────────────
  if (request.method === "OPTIONS") {
    if (!isTrustedOrigin(origin, host)) {
      return new NextResponse(null, { status: 403 });
    }
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Idempotency-Key",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  // ── 4. CORS: Actual request origin check ──────────────────────────
  if (!isTrustedOrigin(origin, host)) {
    return NextResponse.json(
      { success: false, code: "CORS_REJECTED", message: "Origin not allowed." },
      { status: 403 },
    );
  }

  // ── 5. Content-Type enforcement for mutating methods ──────────────
  const mutatingMethods = ["POST", "PUT", "PATCH"];
  if (mutatingMethods.includes(request.method)) {
    const contentType = request.headers.get("content-type") || "";
    // CSP report endpoint accepts different content types from browsers.
    const isCspReport = pathname === "/api/csp-report";
    const isJson = contentType.includes("application/json");
    const isCspContentType =
      contentType.includes("application/csp-report") ||
      contentType.includes("application/reports+json");

    if (!isJson && !(isCspReport && isCspContentType)) {
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_CONTENT_TYPE",
          message: "Content-Type must be application/json.",
        },
        { status: 415 },
      );
    }
  }

  // ── 6. Add CORS headers to the response ───────────────────────────
  const response = NextResponse.next();
  if (origin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Vary", "Origin");
  }
  return response;
}

/* ------------------------------------------------------------------ */
/*  Matcher — skip static assets and internal Next.js routes          */
/* ------------------------------------------------------------------ */

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt
     * - Public assets (images, fonts, etc.)
     */
    "/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|brand/|images/|fonts/).*)",
  ],
};
