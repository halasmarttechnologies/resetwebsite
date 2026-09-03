import { describe, it, expect } from "vitest";
import { getCmsClient } from "@/lib/cms";

describe("CMS Client Adapter Layer", () => {
  const cms = getCmsClient();

  it("should fetch all 7 service categories", async () => {
    const categories = await cms.getServiceCategories();
    expect(categories.length).toBe(7);
    expect(categories.map((c) => c.slug)).toContain("japanese-head-spa");
    expect(categories.map((c) => c.slug)).toContain("hair-and-beard");
  });

  it("should fetch service by slug with valid pricing and duration", async () => {
    const service = await cms.getServiceBySlug("signature-haircut");
    expect(service).not.toBeNull();
    expect(service?.priceAED).toBeGreaterThan(0);
    expect(service?.durationMinutes).toBe(45);
  });

  it("should retrieve pricing packages", async () => {
    const packages = await cms.getPricingPackages();
    expect(packages.length).toBeGreaterThanOrEqual(3);
    expect(packages.some((p) => p.isPopular)).toBe(true);
  });

  it("should return team members with specialties", async () => {
    const team = await cms.getTeamMembers();
    expect(team.length).toBeGreaterThan(0);
    expect(team[0].specialties.length).toBeGreaterThan(0);
  });
});
