import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DevelopmentBanner } from "@/components/layout/development-banner";
import { getCmsClient } from "@/lib/cms";
import { generateServiceJsonLd } from "@/lib/seo/schema";

interface ServiceDetailPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cms = getCmsClient();
  const service = await cms.getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | Reset Men Salon Dubai`,
    description: service.shortDescription,
  };
}

export async function generateStaticParams() {
  const cms = getCmsClient();
  const services = await cms.getServices();
  return services.map((s) => ({
    category: s.categorySlug,
    slug: s.slug,
  }));
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const cms = getCmsClient();
  const service = await cms.getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const jsonLd = generateServiceJsonLd(service);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DevelopmentBanner
        pageTitle={service.title}
        category={`Service Detail: ${service.categorySlug}`}
        description={service.fullDescription}
        metaData={{
          Treatment: service.title,
          Duration: `${service.durationMinutes} Minutes`,
          Price: `AED ${service.priceAED}`,
          Category: service.categorySlug,
          Status: "Phase 1 In Development",
        }}
      />
    </>
  );
}
