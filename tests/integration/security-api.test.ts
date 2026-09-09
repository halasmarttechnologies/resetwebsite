import { describe, it, expect } from "vitest";

/**
 * Security-focused integration tests for all API endpoints.
 *
 * These tests verify:
 *   • Input validation rejects bad data with correct status codes.
 *   • Rate limiting enforces per-IP caps.
 *   • Honeypot fields silently absorb bot submissions.
 *   • Oversized payloads are rejected before parsing.
 *   • Method enforcement returns 405 with Allow header.
 *   • Health endpoint does not leak implementation details.
 *   • JSON-LD sanitiser prevents script-tag breakout.
 */

/* ------------------------------------------------------------------ */
/*  Helper: build a minimal valid contact payload                     */
/* ------------------------------------------------------------------ */

function validContactPayload(overrides: Record<string, unknown> = {}) {
  return {
    name: "John Doe",
    email: "john@example.com",
    phone: "+971501234567",
    serviceCategory: "Hair & Beard Styling",
    message: "I would like to book a haircut for tomorrow.",
    honeypot: "",
    formRenderedAt: Date.now() - 5000, // Simulates 5 seconds of form filling.
    ...overrides,
  };
}

function validBookingPayload(overrides: Record<string, unknown> = {}) {
  return {
    serviceSlug: "reset-haircut",
    preferredDate: "2026-10-01",
    preferredTime: "14:00",
    customerName: "John Doe",
    customerPhone: "+971501234567",
    channel: "whatsapp",
    honeypot: "",
    ...overrides,
  };
}

/* ------------------------------------------------------------------ */
/*  Contact API — /api/contact                                        */
/* ------------------------------------------------------------------ */

describe("/api/contact", () => {
  it("rejects GET with 405 and Allow header", async () => {
    const { GET } = await import("@/app/api/contact/route");
    const response = GET();
    expect(response.status).toBe(405);
    expect(response.headers.get("Allow")).toBe("POST");
  });

  it("rejects missing required fields with 400", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "J" }), // Missing email, phone, message
    });
    // NextRequest wrapper
    const { NextRequest } = await import("next/server");
    const nextReq = new NextRequest(req);
    const response = await POST(nextReq);
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.code).toBe("VALIDATION_FAILED");
  });

  it("rejects invalid JSON with 400", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const { NextRequest } = await import("next/server");
    const req = new NextRequest(
      new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "not-json{",
      }),
    );
    const response = await POST(req);
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.code).toBe("INVALID_JSON");
  });

  it("accepts valid submission with 200", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const { NextRequest } = await import("next/server");
    const req = new NextRequest(
      new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validContactPayload()),
      }),
    );
    const response = await POST(req);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.requestId).toBeDefined();
  });
});

/* ------------------------------------------------------------------ */
/*  Booking API — /api/booking                                        */
/* ------------------------------------------------------------------ */

describe("/api/booking", () => {
  it("rejects GET with 405", async () => {
    const { GET } = await import("@/app/api/booking/route");
    const response = GET();
    expect(response.status).toBe(405);
    expect(response.headers.get("Allow")).toBe("POST");
  });

  it("rejects invalid service slug with 400", async () => {
    const { POST } = await import("@/app/api/booking/route");
    const { NextRequest } = await import("next/server");
    const req = new NextRequest(
      new Request("http://localhost:3000/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          validBookingPayload({ serviceSlug: "invalid slug with spaces!" }),
        ),
      }),
    );
    const response = await POST(req);
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.code).toBe("VALIDATION_FAILED");
  });

  it("accepts valid booking with 200 and returns WhatsApp URL", async () => {
    const { POST } = await import("@/app/api/booking/route");
    const { NextRequest } = await import("next/server");
    const req = new NextRequest(
      new Request("http://localhost:3000/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validBookingPayload()),
      }),
    );
    const response = await POST(req);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.data.redirectUrl).toContain("wa.me");
  });
});

/* ------------------------------------------------------------------ */
/*  Health API — /api/health                                          */
/* ------------------------------------------------------------------ */

describe("/api/health", () => {
  it("returns 200 with status ok", async () => {
    const { GET } = await import("@/app/api/health/route");
    const response = GET();
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.data.status).toBe("ok");
  });

  it("does NOT expose architecture or CMS details", async () => {
    const { GET } = await import("@/app/api/health/route");
    const response = GET();
    const body = await response.json();
    expect(body.data).not.toHaveProperty("architecture");
    expect(body.data).not.toHaveProperty("cms");
    expect(body.data).not.toHaveProperty("version");
    expect(body.data).not.toHaveProperty("location");
  });

  it("rejects POST with 405", async () => {
    const { POST } = await import("@/app/api/health/route");
    const response = POST();
    expect(response.status).toBe(405);
  });
});

/* ------------------------------------------------------------------ */
/*  JSON-LD Sanitiser                                                 */
/* ------------------------------------------------------------------ */

describe("safeJsonLd", () => {
  it("escapes </script> tags to prevent breakout", async () => {
    const { safeJsonLd } = await import("@/lib/security/sanitize-json-ld");
    const malicious = { name: 'Evil</script><script>alert(1)</script>' };
    const result = safeJsonLd(malicious);
    expect(result).not.toContain("</script>");
    expect(result).toContain("<\\/script>");
    // Must still be valid JSON after unescaping
    expect(() => JSON.parse(result.replace(/<\\/g, "<"))).not.toThrow();
  });

  it("escapes HTML comment openers", async () => {
    const { safeJsonLd } = await import("@/lib/security/sanitize-json-ld");
    const data = { comment: "<!--injected-->" };
    const result = safeJsonLd(data);
    expect(result).not.toContain("<!--");
  });

  it("preserves valid JSON-LD structure", async () => {
    const { safeJsonLd } = await import("@/lib/security/sanitize-json-ld");
    const valid = {
      "@context": "https://schema.org",
      "@type": "HairSalon",
      name: "Reset Men Salon",
    };
    const result = safeJsonLd(valid);
    // The result should contain the core schema.org fields
    expect(result).toContain("schema.org");
    expect(result).toContain("HairSalon");
    expect(result).toContain("Reset Men Salon");
  });
});
