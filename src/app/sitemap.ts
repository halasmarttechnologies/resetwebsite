import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getCmsClient } from "@/lib/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cms = getCmsClient();
  const baseUrl = siteConfig.url;
  const now = new Date().toISOString();

  // Core static routes
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/pricing",
    "/blog",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic Service Category routes
  const categories = await cms.getServiceCategories();
  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/services/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Dynamic Individual Service detail routes
  const services = await cms.getServices();
  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.categorySlug}/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic Blog Post routes
  const posts = await cms.getBlogPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...serviceRoutes, ...blogRoutes];
}
