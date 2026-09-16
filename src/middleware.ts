import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/security/rate-limiter";

/**
 * Edge Middleware — runs on every request before route handlers.
 *
 * Responsibilities:
 *   1. Path traversal guard (all routes).
 *   2. Scanner / bot user-agent block (all routes).
 *   3. Coarse per-IP soft rate limit for the entire site — cuts off
 *      request-flooding before a route handler is ever loaded.
 *   4. CORS enforcement + preflight handling on `/api/*`.
 *   5. Content-Type enforcement on API mutating methods.
 *
 * Pages and static assets are passed through unmodified — no design,
 * animation, or transition behaviour is affected by this file.
 */

/* ------------------------------------------------------------------ */
/*  Trusted origins                                                    */
/* ------------------------------------------------------------------ */

const TRUSTED_ORIGINS = new Set([
  "https://resetmensalon.ae",
  "https://www.resetmensalon.ae",
]);

/** localhost is always trusted; Vercel previews match the request host. */
function isTrustedOrigin(origin: string | null, host: string | null): boolean {
  if (!origin) return true; // Same-origin requests omit Origin.
  if (TRUSTED_ORIGINS.has(origin)) return true;

  try {
    const url = new URL(origin);
    if (url.hostname === "localhost" || url.hostname === "127.0.0.1") return true;
    // Same-host (Vercel preview: e.g. reset-git-branch.vercel.app).
    if (host && url.host === host) return true;
    if (url.hostname.endsWith(".vercel.app")) return true;
  } catch {
    return false;
  }
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
  "openvas",
  "wapiti",
  "arachni",
  "hydra",
  "medusa",
  "commix",
  "xsstrike",
  "fuzzdb",
  "ffuf",
  "wfuzz",
  "netsparker",
  "nexpose",
  "qualys",
];

/* ------------------------------------------------------------------ */
/*  Path traversal patterns                                           */
/* ------------------------------------------------------------------ */

const TRAVERSAL_PATTERN =
  /(?:\.\.|%2e%2e|%252e%252e|\/\.\.\/|\\\.\.\\)/i;

/* ------------------------------------------------------------------ */
/*  Client IP resolution (mirrors lib/api/request-utils resolveClientIp)*/
/* ------------------------------------------------------------------ */

function resolveIp(req: NextRequest): string {
  const h = req.headers;
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return h.get("x-real-ip") || h.get("cf-connecting-ip") || "unknown";
}

/* ------------------------------------------------------------------ */
/*  Middleware handler                                                */
/* ------------------------------------------------------------------ */

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  const ip = resolveIp(request);
  const isApi = pathname.startsWith("/api/");

  // ── 1. Path traversal guard (all routes) ──────────────────────────
  if (
    TRAVERSAL_PATTERN.test(pathname) ||
    TRAVERSAL_PATTERN.test(request.nextUrl.search)
  ) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // ── 2. Bot user-agent blocking (all routes) ───────────────────────
  const ua = (request.headers.get("user-agent") || "").toLowerCase();
  if (ua && BLOCKED_UA_PATTERNS.some((pattern) => ua.includes(pattern))) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // ── 3. Coarse global rate limit ───────────────────────────────────
  //    120 requests/min per IP for pages, 60/min for API. Blunt
  //    protection against request flooding before the route stack
  //    even runs. Individual API routes still apply their own,
  //    stricter, per-endpoint limits.
  const globalLimit = isApi ? 60 : 120;
  const rl = checkRateLimit(`edge:${isApi ? "api" : "page"}:${ip}`, globalLimit, 60);
  if (!rl.success) {
    return new NextResponse(
      isApi
        ? JSON.stringify({
            success: false,
            code: "RATE_LIMITED",
            message: "Too many requests. Please slow down.",
          })
        : "Too Many Requests",
      {
        status: 429,
        headers: {
          "Content-Type": isApi ? "application/json" : "text/plain",
          "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)),
          "X-RateLimit-Limit": String(globalLimit),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(Math.ceil(rl.reset / 1000)),
          "Cache-Control": "no-store",
        },
      },
    );
  }

  // Non-API routes pass through untouched from here.
  if (!isApi) return NextResponse.next();

  // ── 4. CORS: Preflight (OPTIONS) ─────────────────────────────────
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
        "Vary": "Origin",
      },
    });
  }

  // ── 5. CORS: Actual request origin check ──────────────────────────
  if (!isTrustedOrigin(origin, host)) {
    return NextResponse.json(
      { success: false, code: "CORS_REJECTED", message: "Origin not allowed." },
      { status: 403, headers: { "Cache-Control": "no-store" } },
    );
  }

  // ── 6. Content-Type enforcement for mutating methods ──────────────
  const mutatingMethods = ["POST", "PUT", "PATCH"];
  if (mutatingMethods.includes(request.method)) {
    const contentType = request.headers.get("content-type") || "";
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
        { status: 415, headers: { "Cache-Control": "no-store" } },
      );
    }
  }

  // ── 7. CORS response headers ──────────────────────────────────────
  const response = NextResponse.next();
  if (origin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Vary", "Origin");
  }
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimisation)
     * - favicon.ico, sitemap.xml, robots.txt
     * - Static assets (images, fonts, media, etc.)
     */
    "/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ico|css|js)$).*)",
  ],
};
