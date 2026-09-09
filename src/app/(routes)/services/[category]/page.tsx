import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DevelopmentBanner } from "@/components/layout/development-banner";
import { getCmsClient } from "@/lib/cms";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const cms = getCmsClient();
  const category = await cms.getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: "Service Category Not Found",
    };
  }

  return {
    title: `${category.title} | Reset Men Salon Dubai`,
    description: category.description,
  };
}

export async function generateStaticParams() {
  const cms = getCmsClient();
  const categories = await cms.getServiceCategories();
  const dedicatedSlugs = [
    "hair-and-beard",
    "hair-treatment-and-colouring",
    "facial",
    "massage",
    "waxing",
    "nails",
    "japanese-head-spa",
  ];
  return categories
    .filter((cat) => !dedicatedSlugs.includes(cat.slug))
    .map((cat) => ({
      category: cat.slug,
    }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const cms = getCmsClient();
  const category = await cms.getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const services = await cms.getServicesByCategory(categorySlug);

  return (
    <DevelopmentBanner
      pageTitle={category.title}
      category={`Category: ${category.slug}`}
      description={category.description}
      metaData={{
        Category: category.title,
        "Available Services": services.length,
        "Starting Price": services.length > 0 ? `AED ${Math.min(...services.map((s) => s.priceAED))}` : "Inquire",
        Status: "Phase 1 In Development",
      }}
    />
  );
}
