import { TeamMember } from "@/types/team";

export const teamMembers: TeamMember[] = [
  {
    id: "tm-1",
    name: "Tariq Al-Mansoor",
    role: "Master Barber & Creative Director",
    specialties: ["Precision Scissor Architecture", "Beard Sculpting", "Classic Fades"],
    bio: "Over 14 years of master barbering experience across London and Dubai. Known for architectural precision and tailoring every cut to bone structure.",
    experienceYears: 14,
    order: 1,
    avatar: {
      url: "/team/A7R07317-1-922x1024.webp",
      alt: "Reset Men Salon Master Barber",
    },
    instagramHandle: "tariq.reset",
  },
  {
    id: "tm-2",
    name: "Kenji Takahashi",
    role: "Master Barber & Stylist",
    specialties: ["Precision Tapers", "Beard Styling", "Hair Sculpting"],
    bio: "Passionate master craftsman dedicated to modern gentleman styling, clean lines, and tailored cuts.",
    experienceYears: 11,
    order: 2,
    avatar: {
      url: "/team/A7R07323-1-922x1024.webp",
      alt: "Reset Men Salon Master Barber",
    },
  },
  {
    id: "tm-3",
    name: "Marco Rossi",
    role: "Senior Master Barber",
    specialties: ["Classic Fades", "Beard Grooming", "Discreet Grey Blending"],
    bio: "Master barber with deep expertise in male hair care, traditional straight razor shaving, and executive styling.",
    experienceYears: 9,
    order: 3,
    avatar: {
      url: "/team/A7R07324-1-922x1024.webp",
      alt: "Reset Men Salon Senior Barber",
    },
  },
  {
    id: "tm-4",
    name: "Elena Rostova",
    role: "Facial & Spa Specialist",
    specialties: ["Clinical Facials", "Skin Detox", "Recovery Therapies"],
    bio: "Certified therapist specializing in advanced men's dermatological therapies and rejuvenating skin treatments.",
    experienceYears: 10,
    order: 4,
    avatar: {
      url: "/team/A7R07328-1-922x1024.webp",
      alt: "Reset Men Salon Spa Specialist",
    },
  },
  {
    id: "tm-5",
    name: "Maria Santos",
    role: "Japanese Head Spa & Scalp Master",
    specialties: ["Japanese Head Spa", "Trichology Scalp Analysis", "Acupressure"],
    bio: "Specializing in authentic Japanese scalp hydrotherapy, tension relief, and restorative hair and scalp care.",
    experienceYears: 8,
    order: 5,
    avatar: {
      url: "/team/A7R07329-1-922x1024.webp",
      alt: "Reset Men Salon Head Spa Master",
    },
  },
];
