/**
 * Structured server-side logger.
 *
 * Every log line is one JSON object so production log aggregators
 * (Vercel Logs / Datadog / Sentry breadcrumbs) can parse fields
 * without regex. Nothing PII-sensitive is ever logged at info level —
 * only shape/size + hashed identifiers. Errors are logged with a
 * stack trace but with the same envelope.
 *
 * In development the same lines are pretty-printed to stderr so they
 * stay legible in the terminal.
 *
 * If a Sentry DSN is configured (NEXT_PUBLIC_SENTRY_DSN), this file
 * is the single choke-point where SDK wiring should be added later —
 * do NOT sprinkle `Sentry.captureException` calls across routes.
 */

type Level = "debug" | "info" | "warn" | "error";

interface LogFields {
  [key: string]: unknown;
}

function isProd(): boolean {
  return process.env.NODE_ENV === "production";
}

function emit(level: Level, message: string, fields?: LogFields): void {
  const entry = {
    level,
    time: new Date().toISOString(),
    msg: message,
    ...fields,
  };

  const stream = level === "error" || level === "warn" ? console.error : console.log;

  if (isProd()) {
    // Single-line JSON for aggregators.
    stream(JSON.stringify(entry));
  } else {
    // Readable form for local dev.
    const tag = `[${level.toUpperCase()}]`;
    const extras = fields && Object.keys(fields).length > 0 ? ` ${JSON.stringify(fields)}` : "";
    stream(`${tag} ${message}${extras}`);
  }
}

export const logger = {
  debug(message: string, fields?: LogFields) {
    if (!isProd()) emit("debug", message, fields);
  },
  info(message: string, fields?: LogFields) {
    emit("info", message, fields);
  },
  warn(message: string, fields?: LogFields) {
    emit("warn", message, fields);
  },
  error(message: string, fields?: LogFields) {
    emit("error", message, fields);
  },
};

/**
 * Cheap unique ID for correlating a request across log lines and the
 * response envelope. Uses `crypto.randomUUID` when present (Edge +
 * Node ≥ 19), falls back to a timestamp+random hybrid.
 */
export function newRequestId(): string {
  const c = (globalThis as { crypto?: Crypto }).crypto;
  if (c && typeof c.randomUUID === "function") return c.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
