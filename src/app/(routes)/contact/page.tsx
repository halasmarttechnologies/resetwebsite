import { Metadata } from "next";
import { DevelopmentBanner } from "@/components/layout/development-banner";
import { siteConfig } from "@/config/site";
import { getCmsClient } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Contact & Concierge | Business Bay, Dubai | Reset Men Salon",
  description:
    "Visit Reset Men Salon in Business Bay, Dubai. Book via WhatsApp concierge (+971 58 102 1540), call +971 4 565 5688, or view location maps.",
};

export default async function ContactPage() {
  const cms = getCmsClient();
  const locations = await cms.getLocations();

  return (
    <DevelopmentBanner
      pageTitle="Concierge & Business Bay Location"
      category="Contact & Location"
      description="Connect directly with our salon concierge for bookings, consultations, or location directions. Rate-limited API routes for inquiries are ready."
      metaData={{
        Locations: locations.length,
        Phone: siteConfig.contact.phoneDisplay,
        WhatsApp: siteConfig.contact.whatsappDisplay,
        Email: siteConfig.contact.email,
        District: "Business Bay, Dubai",
        Status: "Phase 1 In Development",
      }}
    />
  );
}
