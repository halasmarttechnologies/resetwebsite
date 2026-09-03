export interface OpenGraphMetadata {
  title: string;
  description: string;
  url: string;
  siteName: string;
  images: Array<{
    url: string;
    width: number;
    height: number;
    alt: string;
  }>;
  locale: string;
  type: "website" | "article";
}

export interface TwitterMetadata {
  card: "summary_large_image" | "summary";
  title: string;
  description: string;
  images: string[];
}

export interface SeoMetadata {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  og?: Partial<OpenGraphMetadata>;
  twitter?: Partial<TwitterMetadata>;
  noIndex?: boolean;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}
