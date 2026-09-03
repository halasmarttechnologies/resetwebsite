import { ImageAsset } from "./service";
import { SeoMetadata } from "./seo";

export interface BlogCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  count?: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or rich text
  coverImage: ImageAsset;
  category: BlogCategory;
  authorName: string;
  authorRole: string;
  authorAvatar?: ImageAsset;
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes: number;
  tags: string[];
  isFeatured?: boolean;
  seo?: SeoMetadata;
}

export interface BlogQueryOptions {
  categorySlug?: string;
  tag?: string;
  limit?: number;
  offset?: number;
  featuredOnly?: boolean;
}
