import { CmsClient } from "@/types/cms";
import { ServiceCategory, ServiceItem } from "@/types/service";
import { PricingCategoryGroup, PricingPackage } from "@/types/pricing";
import { TeamMember } from "@/types/team";
import { Testimonial } from "@/types/testimonial";
import { GalleryItem } from "@/types/cms";
import { FaqItem } from "@/types/faq";
import { BlogCategory, BlogPost, BlogQueryOptions } from "@/types/blog";
import { SalonLocation, SiteSettings } from "@/types/site";

import { serviceCategories, serviceItems } from "@/data/services";
import { pricingMenuGroups, pricingPackages } from "@/data/pricing";
import { teamMembers } from "@/data/team";
import { testimonials } from "@/data/testimonials";
import { galleryItems } from "@/data/gallery";
import { faqs } from "@/data/faqs";
import { blogCategories, blogPosts } from "@/data/blog";
import { salonLocations } from "@/data/locations";
import { siteConfig } from "@/config/site";

export class MockCmsClient implements CmsClient {
  async getServices(): Promise<ServiceItem[]> {
    return [...serviceItems];
  }

  async getServiceBySlug(slug: string): Promise<ServiceItem | null> {
    const service = serviceItems.find((s) => s.slug === slug);
    return service || null;
  }

  async getServicesByCategory(categorySlug: string): Promise<ServiceItem[]> {
    return serviceItems.filter((s) => s.categorySlug === categorySlug);
  }

  async getServiceCategories(): Promise<ServiceCategory[]> {
    return serviceCategories.map((cat) => ({
      ...cat,
      services: serviceItems.filter((s) => s.categorySlug === cat.slug),
    }));
  }

  async getCategoryBySlug(slug: string): Promise<ServiceCategory | null> {
    const category = serviceCategories.find((c) => c.slug === slug);
    if (!category) return null;
    return {
      ...category,
      services: serviceItems.filter((s) => s.categorySlug === slug),
    };
  }

  async getPricingPackages(): Promise<PricingPackage[]> {
    return [...pricingPackages];
  }

  async getPricingCategories(): Promise<PricingCategoryGroup[]> {
    return [...pricingMenuGroups];
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return [...teamMembers].sort((a, b) => a.order - b.order);
  }

  async getTestimonials(limit?: number): Promise<Testimonial[]> {
    if (limit) {
      return testimonials.slice(0, limit);
    }
    return [...testimonials];
  }

  async getGalleryItems(): Promise<GalleryItem[]> {
    return [...galleryItems];
  }

  async getFaqs(category?: string): Promise<FaqItem[]> {
    if (category) {
      return faqs.filter((f) => f.category === category);
    }
    return [...faqs];
  }

  async getBlogPosts(options?: BlogQueryOptions): Promise<BlogPost[]> {
    let posts = [...blogPosts];
    if (options?.categorySlug) {
      posts = posts.filter((p) => p.category.slug === options.categorySlug);
    }
    if (options?.featuredOnly) {
      posts = posts.filter((p) => p.isFeatured);
    }
    if (options?.limit) {
      const offset = options.offset || 0;
      posts = posts.slice(offset, offset + options.limit);
    }
    return posts;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const post = blogPosts.find((p) => p.slug === slug);
    return post || null;
  }

  async getBlogCategories(): Promise<BlogCategory[]> {
    return [...blogCategories];
  }

  async getLocations(): Promise<SalonLocation[]> {
    return [...salonLocations];
  }

  async getSiteSettings(): Promise<SiteSettings> {
    return {
      siteName: siteConfig.name,
      tagline: siteConfig.tagline,
      description: siteConfig.description,
      logo: {
        url: "/brand/logo.svg",
        alt: "Reset Men Salon Dubai Logo",
      },
      contact: {
        phone: siteConfig.contact.phoneDisplay,
        whatsapp: siteConfig.contact.whatsappDisplay,
        email: siteConfig.contact.email,
        address: "Business Bay, Dubai, UAE",
      },
      socials: {
        instagram: siteConfig.socials.instagram,
        tiktok: siteConfig.socials.tiktok,
      },
      bookingUrl: siteConfig.booking.primaryUrl,
      announcement: {
        enabled: true,
        text: "Experience Dubai's Premier Japanese Head Spa — Now in Business Bay",
        link: "/services/japanese-head-spa",
      },
      defaultSeo: {
        title: `${siteConfig.name} | Luxury Men Salon Dubai`,
        description: siteConfig.description,
      },
    };
  }
}

// Singleton CMS Client Instance
let cmsClientInstance: CmsClient | null = null;

export function getCmsClient(): CmsClient {
  if (!cmsClientInstance) {
    // Easily switch between Mock, Sanity, Contentful based on CMS_PROVIDER env
    cmsClientInstance = new MockCmsClient();
  }
  return cmsClientInstance;
}
