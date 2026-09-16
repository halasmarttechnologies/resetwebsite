import { NextResponse } from "next/server";

/**
 * Unified API response envelope.
 *
 * Every JSON body returned by our API routes follows this shape:
 *
 *   { success: boolean,
 *     data?:    T,
 *     message?: string,
 *     code?:    string,
 *     errors?:  Record<string, string[]>,
 *     requestId?: string }
 *
 * `code` is a stable machine-readable slug (`VALIDATION_FAILED`,
 * `RATE_LIMITED`, `INTERNAL_ERROR`, …) that the client UI keys on for
 * copy/retry decisions. `message` is the user-facing sentence. `errors`
 * is the flattened field map from Zod. `requestId` correlates a response
 * to a server log line for support triage.
 */

export interface ApiEnvelope<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  code?: string;
  errors?: Record<string, string[] | undefined>;
  requestId?: string;
}

interface OkOptions {
  message?: string;
  requestId?: string;
  status?: number;
  /** Extra headers merged on top of the JSON content-type. */
  headers?: HeadersInit;
}

interface FailOptions {
  message?: string;
  code?: string;
  errors?: Record<string, string[] | undefined>;
  requestId?: string;
  headers?: HeadersInit;
}

/**
 * Merge no-store cache headers into the caller's headers. API responses
 * must never be cached by a shared cache — a stale rate-limit result or
 * error envelope served from a CDN would be a security bug.
 */
function withApiHeaders(extra?: HeadersInit): HeadersInit {
  const merged = new Headers(extra);
  if (!merged.has("Cache-Control")) {
    merged.set("Cache-Control", "no-store, max-age=0, must-revalidate");
  }
  if (!merged.has("Pragma")) merged.set("Pragma", "no-cache");
  merged.set("X-Content-Type-Options", "nosniff");
  merged.set("Referrer-Policy", "no-referrer");
  return merged;
}

export function ok<T>(data: T, options: OkOptions = {}): NextResponse {
  const body: ApiEnvelope<T> = {
    success: true,
    data,
    ...(options.message ? { message: options.message } : {}),
    ...(options.requestId ? { requestId: options.requestId } : {}),
  };
  return NextResponse.json(body, {
    status: options.status ?? 200,
    headers: withApiHeaders(options.headers),
  });
}

/**
 * Client-error response (4xx). Never call this with a 5xx status — use
 * `serverError()` so log severity stays consistent.
 */
export function fail(status: number, options: FailOptions = {}): NextResponse {
  if (status < 400 || status >= 500) {
    throw new Error(
      `fail() expects a 4xx status, got ${status}. Use serverError() for 5xx.`,
    );
  }
  const body: ApiEnvelope = {
    success: false,
    ...(options.code ? { code: options.code } : {}),
    ...(options.message ? { message: options.message } : {}),
    ...(options.errors ? { errors: options.errors } : {}),
    ...(options.requestId ? { requestId: options.requestId } : {}),
  };
  return NextResponse.json(body, { status, headers: withApiHeaders(options.headers) });
}

/**
 * 5xx response. Message defaults to a generic sentence so we never leak
 * a raw stack trace or dependency error string to a caller.
 */
export function serverError(options: FailOptions = {}): NextResponse {
  const body: ApiEnvelope = {
    success: false,
    code: options.code ?? "INTERNAL_ERROR",
    message:
      options.message ??
      "Something went wrong on our side. Please try again shortly.",
    ...(options.requestId ? { requestId: options.requestId } : {}),
  };
  return NextResponse.json(body, { status: 500, headers: withApiHeaders(options.headers) });
}

/** 405 with an `Allow` header — matches HTTP spec so clients back off correctly. */
export function methodNotAllowed(allowed: string[]): NextResponse {
  const headers = new Headers({ Allow: allowed.join(", ") });
  return fail(405, {
    code: "METHOD_NOT_ALLOWED",
    message: `Method not allowed. Supported: ${allowed.join(", ")}.`,
    headers,
  });
}
