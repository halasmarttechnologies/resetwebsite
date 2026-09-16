import { describe, it, expect } from "vitest";
import { GET, POST } from "@/app/api/health/route";
import type { NextRequest } from "next/server";

function makeReq(): NextRequest {
  return new Request("http://localhost/api/health") as unknown as NextRequest;
}

/**
 * Health endpoint contract test.
 *
 * Every JSON API in the codebase returns the unified envelope from
 * `src/lib/api/response.ts`:
 *   { success: true, data: {...}, message?: string }
 *
 * If this test starts failing, either the envelope changed (audit every
 * client fetch) or the health payload lost fields platform monitors read.
 */
describe("Health API Route", () => {
  it("returns 200 with the standard success envelope", async () => {
    const response = await GET(makeReq());
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.status).toBe("ok");
    expect(json.data.service).toBe("Reset Men Salon");
    expect(typeof json.data.timestamp).toBe("string");
  });

  it("rejects non-GET methods with 405 + Allow header", () => {
    const response = POST();
    expect(response.status).toBe(405);
    expect(response.headers.get("allow")).toBe("GET");
  });
});
