import { Metadata } from "next";
import { DevelopmentBanner } from "@/components/layout/development-banner";
import { getCmsClient } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Grooming Services Menu | Hair, Beard, Japanese Head Spa Dubai",
  description:
    "Explore our complete service menu: Precision haircuts, beard sculpting, Japanese head spa, facial therapies, keratin, massages, and executive nails.",
};

export default async function ServicesPage() {
  const cms = getCmsClient();
  const categories = await cms.getServiceCategories();
  const services = await cms.getServices();

  return (
    <DevelopmentBanner
      pageTitle="Services & Grooming Menu"
      category="Services Master Overview"
      description="The full master taxonomy covering 7 grooming pillars, Japanese Head Spa, and specialized therapies. All category routes and detail pages are mapped."
      metaData={{
        "Active Categories": categories.length,
        "Total Treatments": services.length,
        Currencies: "AED (Inclusive of VAT)",
        Status: "Phase 1 In Development",
      }}
    />
  );
}
