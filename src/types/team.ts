import { ImageAsset } from "./service";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  bio: string;
  experienceYears: number;
  avatar: ImageAsset;
  instagramHandle?: string;
  order: number;
}
