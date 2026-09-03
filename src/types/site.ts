import { ImageAsset } from "./service";
import { SeoMetadata } from "./seo";

export interface SalonLocation {
  id: string;
  name: string;
  address: {
    line1: string;
    line2?: string;
    district: string;
    city: string;
    country: string;
    postalCode?: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  whatsapp: string;
  email: string;
  openingHours: Array<{
    days: string;
    hours: string;
    isOpen: boolean;
  }>;
  mapsEmbedUrl?: string;
  directionsUrl?: string;
  parkingInfo?: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  description: string;
  logo: ImageAsset;
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
  };
  socials: {
    instagram: string;
    tiktok?: string;
    facebook?: string;
    youtube?: string;
  };
  bookingUrl: string;
  announcement?: {
    enabled: boolean;
    text: string;
    link?: string;
  };
  defaultSeo: SeoMetadata;
}
