import { ImageAsset } from "./service";

export interface Testimonial {
  id: string;
  authorName: string;
  authorTitle?: string;
  source: "Google" | "Fresha" | "Direct";
  rating: number; // 1-5
  comment: string;
  serviceMentioned?: string;
  date: string;
  avatar?: ImageAsset;
  isFeatured?: boolean;
}
