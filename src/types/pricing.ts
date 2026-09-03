export interface PricingItem {
  id: string;
  name: string;
  description?: string;
  durationMinutes: number;
  priceAED: number;
  categorySlug: string;
  isPopular?: boolean;
}

export interface PricingPackage {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  priceAED: number;
  originalPriceAED?: number;
  durationEstimate: string;
  isPopular?: boolean;
  isVip?: boolean;
  includedServices: string[];
  description: string;
  ctaText?: string;
}

export interface PricingCategoryGroup {
  categorySlug: string;
  categoryTitle: string;
  items: PricingItem[];
}
