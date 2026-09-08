import { Metadata } from "next";
import { TeamEditorialSection, TestimonialEditorialSection } from "@/frontend/about";

export const metadata: Metadata = {
  title: "Our Team & Testimonials | Reset Men Salon Dubai",
  description:
    "Meet Reset Men Salon's master barbers and specialists in Business Bay, Dubai. Discover client testimonials and our sanctuary craftsmanship.",
};

export default function AboutPage() {
  return (
    <div className="w-full bg-white">
      <TeamEditorialSection />
      <TestimonialEditorialSection />
    </div>
  );
}
