import { NextRequest, NextResponse } from "next/server";
import { logger, newRequestId } from "@/lib/logger";
import { resolveClientIp } from "@/lib/api/request-utils";
import { checkRateLimit } from "@/lib/security/rate-limiter";

/**
 * CSP violation report sink.
 *
 * Browsers POST here when a page tries to load a resource the policy in
 * `next.config.ts` disallows. Two payload shapes exist in the wild:
 *
 *   • Legacy `application/csp-report`:
 *     { "csp-report": { "blocked-uri": ..., "violated-directive": ..., ... } }
 *
 *   • Modern Reporting API `application/reports+json` (array of):
 *     { "type": "csp-violation",
 *       "body": { "blockedURL": ..., "effectiveDirective": ..., ... } }
 *
 * Both are logged into the same structured line so an aggregator can
 * `WHERE msg='csp.violation'` regardless of source. The response is
 * always 204 — no envelope, no CORS friction, no back-and-forth.
 *
 * The route is intentionally lenient: a malformed report yields a 204,
 * not a 400. The browser sends it fire-and-forget; a 400 would just
 * generate more noise without preventing anything.
 */

const MAX_BODY_BYTES = 16 * 1024;

interface LegacyCspReport {
  "csp-report"?: Record<string, unknown>;
}

interface ReportingApiEntry {
  type?: string;
  body?: Record<string, unknown>;
  url?: string;
  age?: number;
  user_agent?: string;
}

export async function POST(req: NextRequest) {
  const requestId = newRequestId();
  const ip = resolveClientIp(req);

  try {
    // Rate-limit to prevent log-flooding (30 req/min per IP — browsers batch reports).
    const rl = checkRateLimit(`csp-report:${ip}`, 30, 60);
    if (!rl.success) {
      return new NextResponse(null, { status: 204 });
    }

    const buf = await req.arrayBuffer();
    if (buf.byteLength === 0 || buf.byteLength > MAX_BODY_BYTES) {
      return new NextResponse(null, { status: 204 });
    }

    const raw = new TextDecoder("utf-8").decode(buf);
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      logger.warn("csp.report_unparseable", { requestId, ip, bytes: buf.byteLength });
      return new NextResponse(null, { status: 204 });
    }

    // Reporting API — array of entries.
    if (Array.isArray(parsed)) {
      for (const entry of parsed as ReportingApiEntry[]) {
        if (entry?.type !== "csp-violation") continue;
        logger.warn("csp.violation", {
          requestId,
          ip,
          source: "reporting-api",
          documentUrl: entry.url,
          userAgent: entry.user_agent,
          ...entry.body,
        });
      }
      return new NextResponse(null, { status: 204 });
    }

    // Legacy shape.
    const legacy = parsed as LegacyCspReport;
    if (legacy && typeof legacy === "object" && legacy["csp-report"]) {
      logger.warn("csp.violation", {
        requestId,
        ip,
        source: "legacy-report",
        ...legacy["csp-report"],
      });
    }

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    logger.error("csp.report_handler_failed", {
      requestId,
      ip,
      error: (err as Error).message,
    });
    return new NextResponse(null, { status: 204 });
  }
}
