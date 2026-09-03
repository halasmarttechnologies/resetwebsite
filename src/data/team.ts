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
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
      alt: "Tariq Al-Mansoor — Master Barber",
    },
    instagramHandle: "tariq.reset",
  },
  {
    id: "tm-2",
    name: "Kenji Takahashi",
    role: "Head Spa Master & Scalp Specialist",
    specialties: ["Japanese Head Spa", "Trichology Scalp Analysis", "Acupressure"],
    bio: "Trained in Tokyo and Kyoto, Kenji brings authentic Japanese scalp hydrotherapy and restorative acupressure rituals to Dubai.",
    experienceYears: 11,
    order: 2,
    avatar: {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
      alt: "Kenji Takahashi — Head Spa Master",
    },
  },
  {
    id: "tm-3",
    name: "Marco Rossi",
    role: "Senior Grooming Specialist & Colorist",
    specialties: ["Keratin Treatments", "Discreet Grey Blending", "Skin Detox"],
    bio: "Italian trained master colorist and grooming specialist with deep expertise in male hair care and skin therapies.",
    experienceYears: 9,
    order: 3,
    avatar: {
      url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
      alt: "Marco Rossi — Senior Grooming Specialist",
    },
  },
];
