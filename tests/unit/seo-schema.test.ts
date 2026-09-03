import { describe, it, expect } from "vitest";
import { generateHairSalonJsonLd, generateServiceJsonLd } from "@/lib/seo/schema";
import { serviceItems } from "@/data/services";

describe("SEO JSON-LD Schema Generator", () => {
  it("should generate a valid HairSalon schema graph", () => {
    const jsonLd = generateHairSalonJsonLd();
    expect(jsonLd["@type"]).toBe("HairSalon");
    expect(jsonLd.name).toBe("Reset Men Salon");
    expect(jsonLd.address.addressLocality).toBe("Dubai");
    expect(jsonLd.geo.latitude).toBe(25.1867);
  });

  it("should generate a valid Service schema for a treatment", () => {
    const service = serviceItems[0];
    const jsonLd = generateServiceJsonLd(service);
    expect(jsonLd["@type"]).toBe("Service");
    expect(jsonLd.offers.price).toBe(service.priceAED);
    expect(jsonLd.offers.priceCurrency).toBe("AED");
  });
});
