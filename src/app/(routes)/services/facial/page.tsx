import type { Metadata } from "next";
import {
  ServiceHeroSection,
  ServiceListSection,
  WhyChooseSection,
  ServiceBookingCtaSection,
  ServiceFaqSection,
} from "@/components/services/shared";
import {
  TestimonialEditorialSection,
  BlogEditorialSection,
  TrueParallaxShowcaseSection,
} from "@/components/home";
import { facialPage as data } from "@/data/service-pages/facial";

export const metadata: Metadata = data.metadata;

export default function Page() {
  return (
    <div className="relative w-full bg-white text-noir-900 min-h-screen flex flex-col items-center">
      <ServiceHeroSection {...data.hero} whatsappUrl={data.whatsappUrl} />

      <ServiceListSection
        id="services-list"
        title={data.list.title}
        subtitle={data.list.subtitle}
        items={data.list.items}
        filters={data.list.filters}
        footerCta={{ label: "Book an Appointment via WhatsApp", href: data.whatsappUrl }}
      />

      <TrueParallaxShowcaseSection items={data.parallax} />

      <WhyChooseSection
        eyebrow={data.whyChoose.eyebrow}
        title={data.whyChoose.title}
        intro={data.whyChoose.intro}
        pillars={data.whyChoose.pillars}
      />

      <ServiceBookingCtaSection {...data.bookingCta} />

      <ServiceFaqSection
        eyebrow={data.faq.eyebrow}
        subtitle={data.faq.subtitle}
        faqs={data.faq.faqs}
      />

      <TestimonialEditorialSection />
      <BlogEditorialSection />
    </div>
  );
}
