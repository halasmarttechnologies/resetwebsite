import { SeoMetadata } from "./seo";

export type ServiceCategorySlug =
  | "hair-and-beard"
  | "facial"
  | "hair-treatment-and-colouring"
  | "massage"
  | "waxing"
  | "nails"
  | "japanese-head-spa";

export interface ImageAsset {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataUrl?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  categorySlug: ServiceCategorySlug;
  title: string;
  subtitle?: string;
  shortDescription: string;
  fullDescription: string;
  durationMinutes: number;
  priceAED: number;
  isSignature?: boolean;
  isPopular?: boolean;
  featuredImage: ImageAsset;
  gallery?: ImageAsset[];
  benefits: string[];
  processSteps?: Array<{
    stepNumber: number;
    title: string;
    description: string;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  seo?: SeoMetadata;
}

export interface ServiceCategory {
  id: string;
  slug: ServiceCategorySlug;
  title: string;
  subtitle: string;
  description: string;
  heroImage: ImageAsset;
  order: number;
  services?: ServiceItem[];
  seo?: SeoMetadata;
}
