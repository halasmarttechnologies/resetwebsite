import { Metadata } from "next";
import { BlogView } from "@/components/blog/blog-view";
import { getCmsClient } from "@/lib/cms";

export const metadata: Metadata = {
  title: "The Editorial Journal | Grooming & Scalp Health Insights | Reset Men Salon",
  description:
    "Expert articles on scalp wellness, Japanese Head Spa rituals, beard care, and men's lifestyle in Dubai from master specialists.",
};

export default async function BlogPage() {
  const cms = getCmsClient();
  const posts = await cms.getBlogPosts();
  const categories = await cms.getBlogCategories();

  return <BlogView categories={categories} posts={posts} />;
}
