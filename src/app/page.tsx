import { Metadata } from "next";
import dynamic from "next/dynamic";
import { getCmsClient } from "@/lib/cms";

// ── Above-the-fold: eager import so hero paints on first response. ─────────
import { HeroSection } from "@/components/sections/hero-section";
import { AboutStatementSection } from "@/components/sections/about-statement-section";
import { ServicesOverviewSection } from "@/components/sections/services-overview-section";

// ── Below-the-fold: separate JS chunks. Each still SSR-renders (default
//    ssr: true) so SEO/JSON-LD stay intact and no visual placeholder flash
//    appears. Only the JavaScript needed to hydrate them is deferred.
//    This keeps the initial JS payload lean without any change to layout,
//    animations, or content order. ──────────────────────────────────────────
const TrueParallaxShowcaseSection = dynamic(
  () =>
    import("@/components/sections/true-parallax-showcase-section").then(
      (m) => m.TrueParallaxShowcaseSection,
    ),
);
const ServicesCatalogView = dynamic(() =>
  import("@/components/sections/services-catalog-view").then(
    (m) => m.ServicesCatalogView,
  ),
);
const PhilosophyEditorialSection = dynamic(() =>
  import("@/components/sections/philosophy-editorial-section").then(
    (m) => m.PhilosophyEditorialSection,
  ),
);
const ImageFlowSection = dynamic(() =>
  import("@/components/sections/image-flow-section").then(
    (m) => m.ImageFlowSection,
  ),
);
const TeamEditorialSection = dynamic(() =>
  import("@/components/sections/team-editorial-section").then(
    (m) => m.TeamEditorialSection,
  ),
);
const TestimonialEditorialSection = dynamic(() =>
  import("@/components/sections/testimonial-editorial-section").then(
    (m) => m.TestimonialEditorialSection,
  ),
);
const FaqEditorialSection = dynamic(() =>
  import("@/components/sections/faq-editorial-section").then(
    (m) => m.FaqEditorialSection,
  ),
);
const BlogEditorialSection = dynamic(() =>
  import("@/components/sections/blog-editorial-section").then(
    (m) => m.BlogEditorialSection,
  ),
);

export const metadata: Metadata = {
  title: "Reset Men Salon | Luxury Grooming Sanctuary & Japanese Head Spa Dubai",
  description:
    "Dubai's premier luxury men's grooming destination in Business Bay. Precision haircuts, beard architecture, and signature Japanese Head Spa.",
};

export default async function HomePage() {
  const cms = getCmsClient();
  const [categories, services] = await Promise.all([
    cms.getServiceCategories(),
    cms.getServices(),
  ]);

  return (
    <div className="relative w-full bg-white text-noir-900 min-h-screen flex flex-col items-center">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Statement / Manifesto Section */}
      <AboutStatementSection />

      {/* 3. Our Services (3-Card Showcase Grid with View All) */}
      <ServicesOverviewSection />

      {/* True Parallax Image Multi-Image Showcase */}
      <TrueParallaxShowcaseSection />

      {/* 4. Interactive Services Catalog & Treatment Explorer */}
      <ServicesCatalogView categories={categories} services={services} />

      {/* 5. Philosophy Editorial Section with Smooth Lens Motion */}
      <PhilosophyEditorialSection />

      {/* 6. Image Flow Carousel (Replacing Studio Editorial Bento Section) */}
      <ImageFlowSection />

      {/* 7. Our Team — Specialists Showcase */}
      <TeamEditorialSection />

      {/* 7. Testimonials — What Our Clients Say */}
      <TestimonialEditorialSection />

      {/* 8. Frequently Asked Questions (with FAQPage JSON-LD) */}
      <FaqEditorialSection />

      {/* 9. Editorial Journal — Grooming & Scalp Insights (Clean & Neat White Background) */}
      <BlogEditorialSection />
    </div>
  );
}
