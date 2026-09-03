import { Metadata } from "next";
import { DevelopmentBanner } from "@/components/layout/development-banner";
import { getCmsClient } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Pricing Menu & Luxury Packages | Reset Men Salon Dubai",
  description:
    "Transparent pricing for all grooming treatments, signature Japanese Head Spa sessions, and curated executive packages in Business Bay, Dubai.",
};

export default async function PricingPage() {
  const cms = getCmsClient();
  const packages = await cms.getPricingPackages();
  const groups = await cms.getPricingCategories();

  return (
    <DevelopmentBanner
      pageTitle="Pricing & Curated Packages"
      category="Grooming Menu"
      description="Transparent, all-inclusive luxury pricing across all 7 categories and executive packages. Ready for CMS-backed dynamic price updates."
      metaData={{
        "Curated Packages": packages.length,
        "Menu Categories": groups.length,
        VAT: "Inclusive",
        Status: "Phase 1 In Development",
      }}
    />
  );
}
