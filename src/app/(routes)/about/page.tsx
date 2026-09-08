import { Metadata } from "next";
import {
  AboutHeroSection,
  AboutTeamSection,
  AboutServicesShowcase,
  AboutBookingSection,
} from "@/components/about";
import { TestimonialEditorialSection } from "@/components/home";

export const metadata: Metadata = {
  title: "About Us — Our Team, Craftsmanship & Services | Reset Men Salon Dubai",
  description:
    "Discover Reset Men Salon in Business Bay, Dubai. Precision haircuts, beard architecture, luxury facials, and signature Japanese Head Spa delivered by master craftsmen.",
};

export default function AboutPage() {
  return (
    <div className="relative w-full bg-white text-noir-900 min-h-screen flex flex-col items-center">
      {/* 1. Hero Section: Monumental ABOUT US Typography with Parallax */}
      <AboutHeroSection />

      {/* 2. Our Team: Manifesto & Master Specialists Showcase */}
      <AboutTeamSection />

      {/* 3. Our Services: 7 Curated Signature Offerings */}
      <AboutServicesShowcase />

      {/* 4. Interactive Booking: Looking for a Sharp Look? Book Your Barber! */}
      <AboutBookingSection />

      {/* 5. Client Reviews & Sanctuary Feedback */}
      <TestimonialEditorialSection />
    </div>
  );
}
