import { Metadata } from "next";
import { DevelopmentBanner } from "@/components/layout/development-banner";
import { getCmsClient } from "@/lib/cms";

export const metadata: Metadata = {
  title: "About Us | The Reset Sanctuary & Master Barbers",
  description:
    "Learn about Reset Men Salon's heritage, master barbers, craftsmanship, and our Business Bay sanctuary in Dubai.",
};

export default async function AboutPage() {
  const cms = getCmsClient();
  const team = await cms.getTeamMembers();

  return (
    <DevelopmentBanner
      pageTitle="About Reset Men Salon"
      category="About Sanctuary"
      description="The master barbers, philosophy, and architectural sanctuary in Business Bay, Dubai. Architecture and team data model configured."
      metaData={{
        "Team Specialists": team.length,
        Location: "Business Bay Flagship",
        Status: "Phase 1 In Development",
      }}
    />
  );
}
