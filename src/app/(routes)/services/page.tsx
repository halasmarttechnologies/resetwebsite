import { Metadata } from "next";
import { getCmsClient } from "@/lib/cms";
import { ServicesCatalogView } from "@/components/home/services-catalog-view";

export const metadata: Metadata = {
  title: "Grooming Services & Rituals Menu | Reset Men Salon Dubai",
  description:
    "Explore our complete service menu: Precision haircuts, beard sculpting, Japanese head spa, facial therapies, keratin, massages, and executive nails.",
};

export default async function ServicesPage() {
  const cms = getCmsClient();
  const categories = await cms.getServiceCategories();
  const services = await cms.getServices();

  return (
    <main className="w-full min-h-screen bg-white">
      <ServicesCatalogView categories={categories} services={services} />
    </main>
  );
}
