export type { ServiceCategory, ServiceItem } from "./service";
export type { PricingCategoryGroup, PricingPackage } from "./pricing";
export type { TeamMember } from "./team";
export type { Testimonial } from "./testimonial";
export type { FaqItem } from "./faq";
export type { BlogCategory, BlogPost, BlogQueryOptions } from "./blog";
export type { SalonLocation, SiteSettings } from "./site";

import type { ServiceCategory, ServiceItem } from "./service";
import type { PricingCategoryGroup, PricingPackage } from "./pricing";
import type { TeamMember } from "./team";
import type { Testimonial } from "./testimonial";
import type { FaqItem } from "./faq";
import type { BlogCategory, BlogPost, BlogQueryOptions } from "./blog";
import type { SalonLocation, SiteSettings } from "./site";

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
}

export interface CmsClient {
  getServices(): Promise<ServiceItem[]>;
  getServiceBySlug(slug: string): Promise<ServiceItem | null>;
  getServicesByCategory(categorySlug: string): Promise<ServiceItem[]>;
  getServiceCategories(): Promise<ServiceCategory[]>;
  getCategoryBySlug(slug: string): Promise<ServiceCategory | null>;
  getPricingPackages(): Promise<PricingPackage[]>;
  getPricingCategories(): Promise<PricingCategoryGroup[]>;
  getTeamMembers(): Promise<TeamMember[]>;
  getTestimonials(limit?: number): Promise<Testimonial[]>;
  getGalleryItems(): Promise<GalleryItem[]>;
  getFaqs(category?: string): Promise<FaqItem[]>;
  getBlogPosts(options?: BlogQueryOptions): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | null>;
  getBlogCategories(): Promise<BlogCategory[]>;
  getLocations(): Promise<SalonLocation[]>;
  getSiteSettings(): Promise<SiteSettings>;
}
