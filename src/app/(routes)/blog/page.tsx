import { Metadata } from "next";
import { DevelopmentBanner } from "@/components/layout/development-banner";
import { getCmsClient } from "@/lib/cms";

export const metadata: Metadata = {
  title: "The Editorial Journal | Grooming & Scalp Health Insights",
  description:
    "Expert articles on scalp wellness, Japanese Head Spa rituals, beard care, and men's lifestyle in Dubai.",
};

export default async function BlogPage() {
  const cms = getCmsClient();
  const posts = await cms.getBlogPosts();
  const categories = await cms.getBlogCategories();

  return (
    <DevelopmentBanner
      pageTitle="The Grooming Journal"
      category="Editorial & Guides"
      description="Editorial guides, trichological scalp care insights, and barber techniques. Data architecture connected with Article Schema support."
      metaData={{
        "Published Articles": posts.length,
        "Journal Categories": categories.length,
        Status: "Phase 1 In Development",
      }}
    />
  );
}
