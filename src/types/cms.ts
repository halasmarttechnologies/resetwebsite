import { ServiceCategory, ServiceItem } from "./service";
import { PricingCategoryGroup, PricingPackage } from "./pricing";
import { TeamMember } from "./team";
import { Testimonial } from "./testimonial";
import { FaqItem } from "./faq";
import { BlogCategory, BlogPost, BlogQueryOptions } from "./blog";
import { SalonLocation, SiteSettings } from "./site";

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
