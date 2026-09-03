import { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";

export const metadata: Metadata = {
  title: "Reset Men Salon | Luxury Grooming Sanctuary & Japanese Head Spa Dubai",
  description:
    "Dubai's premier luxury men's grooming destination in Business Bay. Precision haircuts, beard architecture, and signature Japanese Head Spa.",
};

export default function HomePage() {
  return (
    <div className="relative w-full bg-white text-noir-900 min-h-screen flex flex-col items-center">
      {/* 1. Hero Section matching reference screenshot 1:1 */}
      <HeroSection />
    </div>
  );
}
