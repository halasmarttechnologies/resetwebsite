import { Metadata } from "next";
import { DevelopmentBanner } from "@/components/layout/development-banner";
import { getCmsClient } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Reset Men Salon | Luxury Men's Grooming Sanctuary & Japanese Head Spa Dubai",
  description:
    "Reset Men Salon is Dubai's premier luxury men's grooming destination in Business Bay. Precision haircuts, beard architecture, and signature Japanese Head Spa.",
};

export default async function HomePage() {
  const cms = getCmsClient();
  const categories = await cms.getServiceCategories();
  const services = await cms.getServices();

  return (
    <DevelopmentBanner
      pageTitle="Reset Men Salon — System Initialized"
      category="Homepage Architecture"
      description="The production architecture, design system tokens, Lenis smooth scrolling, and CMS-ready data models are fully established. Visual homepage UI design will be crafted in the next phase."
      metaData={{
        "Service Categories": categories.length,
        "Catalog Services": services.length,
        Location: "Business Bay, Dubai",
        Status: "Architecture & Data Layer Ready",
      }}
    />
  );
}
