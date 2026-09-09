import type { NextRequest } from "next/server";

/**
 * Small utilities every JSON API route needs — kept dependency-free so
 * they load fast on the edge.
 */

/**
 * Race a promise against a timeout. On timeout the returned promise
 * rejects with a `TimeoutError`. Handy for wrapping outbound calls
 * (email delivery, CRM webhooks) so a slow dependency can never hang
 * a request forever.
 */
export class TimeoutError extends Error {
  constructor(ms: number) {
    super(`Operation timed out after ${ms}ms`);
    this.name = "TimeoutError";
  }
}

export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new TimeoutError(ms)), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });
}

/**
 * Extract the first client IP from `x-forwarded-for` / `x-real-ip`,
 * safely handling comma-separated proxy chains and IPv6 brackets.
 * Falls back to a stable "unknown" bucket so the rate limiter still
 * has a key to work with (this is deliberate — a truly missing IP
 * should share limits, not bypass them).
 */
export function resolveClientIp(req: NextRequest | Request): string {
  const headers = req.headers;
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return normalizeIp(first);
  }
  const real = headers.get("x-real-ip");
  if (real) return normalizeIp(real);
  const cf = headers.get("cf-connecting-ip");
  if (cf) return normalizeIp(cf);
  return "unknown";
}

function normalizeIp(raw: string): string {
  // IPv6 in brackets, e.g. [::1]:12345 → ::1
  const stripped = raw.startsWith("[") ? raw.slice(1, raw.indexOf("]")) : raw.split(":")[0];
  return stripped || raw;
}

/**
 * Read a request body with a hard size cap. Protects against a bad
 * actor firing gigabytes of JSON at a public endpoint. Returns the
 * raw string so the caller can `JSON.parse` and surface a clean 400
 * instead of an unhandled SyntaxError.
 */
export async function readBoundedJsonText(
  req: NextRequest | Request,
  maxBytes: number,
): Promise<string> {
  const buf = await req.arrayBuffer();
  if (buf.byteLength > maxBytes) {
    throw new PayloadTooLargeError(buf.byteLength, maxBytes);
  }
  return new TextDecoder("utf-8").decode(buf);
}

export class PayloadTooLargeError extends Error {
  constructor(
    public readonly received: number,
    public readonly maxBytes: number,
  ) {
    super(`Request body ${received}B exceeds ${maxBytes}B limit`);
    this.name = "PayloadTooLargeError";
  }
}

/**
 * Sanitize a single free-text field: normalize newlines, trim, and
 * strip C0 control characters (tab \x09 and newline \x0a excepted) plus
 * DEL (\x7f). Zod handles length; this handles character content.
 */
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g;

export function sanitizeText(input: string): string {
  return input.replace(/\r\n?/g, "\n").replace(CONTROL_CHARS, "").trim();
}
