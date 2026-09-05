import { Metadata } from "next";
import { getCmsClient } from "@/lib/cms";
import {
  HeroSection,
  AboutStatementSection,
  ServicesOverviewSection,
  ServicesCatalogView,
  PhilosophyEditorialSection,
} from "@/components/home";

export const metadata: Metadata = {
  title: "Reset Men Salon | Luxury Grooming Sanctuary & Japanese Head Spa Dubai",
  description:
    "Dubai's premier luxury men's grooming destination in Business Bay. Precision haircuts, beard architecture, and signature Japanese Head Spa.",
};

export default async function HomePage() {
  const cms = getCmsClient();
  const categories = await cms.getServiceCategories();
  const services = await cms.getServices();

  return (
    <div className="relative w-full bg-white text-noir-900 min-h-screen flex flex-col items-center">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Statement / Manifesto Section */}
      <AboutStatementSection />

      {/* 3. Our Services (3-Card Showcase Grid with View All) */}
      <ServicesOverviewSection />

      {/* 4. Interactive Services Catalog & Treatment Explorer */}
      <ServicesCatalogView categories={categories} services={services} />

      {/* 5. Philosophy Editorial Section with Smooth Lens Motion */}
      <PhilosophyEditorialSection />
    </div>
  );
}
