import { Metadata } from "next";
import { ServicesPageView } from "@/components/services/services-page-view";

export const metadata: Metadata = {
  title: "Services & Price List | Reset Men Salon Business Bay Dubai",
  description:
    "Explore our complete service menu with official transparent rates: Precision haircuts, beard sculpting, Japanese head spa, facial therapies, keratin, massages, and executive nails in Business Bay.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <ServicesPageView />
    </main>
  );
}
