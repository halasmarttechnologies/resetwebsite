"use client";

import * as React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { siteConfig } from "@/config/site";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface AboutServiceItem {
  id: string;
  index: string;
  title: string;
  category: string;
  description: string;
  image: string;
  alt: string;
}

const aboutServices: AboutServiceItem[] = [
  {
    id: "hair-beard",
    index: "01",
    title: "Hair & Beard",
    category: "Precision Architecture",
    description:
      "Expert haircuts and precise beard shaping tailored to your face and lifestyle, leaving you with a clean, sharp look and long-lasting confidence every visit.",
    image: "/images/services/service-hair-beard.webp",
    alt: "Reset Men Salon Haircut and Beard Architecture in Business Bay Dubai",
  },
  {
    id: "hair-treatment-colouring",
    index: "02",
    title: "Hair Treatment & Colouring",
    category: "Restoration & Tone",
    description:
      "Repair damage, restore shine, or refresh your style with nourishing treatments and professional colouring that protect hair health while delivering vibrant, natural-looking results.",
    image: "/images/services/service-colouring.jpg",
    alt: "Reset Men Salon Professional Hair Treatment and Natural Colouring",
  },
  {
    id: "facial",
    index: "03",
    title: "Facial",
    category: "Dermal Wellness",
    description:
      "Deep cleansing and revitalizing facials that hydrate, exfoliate, and improve skin texture, leaving your face refreshed, healthy, and ready for any occasion.",
    image: "/images/services/service-facial.webp",
    alt: "Reset Men Salon Deep Cleansing and Revitalizing Facial Care",
  },
  {
    id: "massage",
    index: "04",
    title: "Massage",
    category: "Recovery & Balance",
    description:
      "Relax and unwind with therapeutic massages designed to ease tension, reduce stress, and restore full-body balance for a calmer, more focused day.",
    image: "/site-pics/site-8.jpg",
    alt: "Reset Men Salon Therapeutic Massage and Stress Relief Therapy",
  },
  {
    id: "waxing",
    index: "05",
    title: "Waxing",
    category: "Clean Definition",
    description:
      "Quick, hygienic waxing services for smooth, clean results on face or body, helping you maintain a perfectly groomed appearance with lasting comfort.",
    image: "/images/services/service-waxing.jpg",
    alt: "Reset Men Salon Hygienic Body and Facial Waxing Grooming",
  },
  {
    id: "nails",
    index: "06",
    title: "Nails",
    category: "Executive Polish",
    description:
      "Professional manicures and pedicures that shape, buff, and nourish hands and feet, ensuring neat, healthy nails and a polished, confident look.",
    image: "/images/services/service-nails.jpg",
    alt: "Reset Men Salon Executive Manicure and Pedicure Nail Care",
  },
  {
    id: "japanese-head-spa",
    index: "07",
    title: "Japanese Head Spa",
    category: "Signature Hydrotherapy",
    description:
      "A luxurious scalp treatment combining massage and cleansing techniques that stimulate circulation, improve hair health, and provide deep relaxation for mind and body.",
    image: "/site-pics/site-3.jpg",
    alt: "Reset Signature Japanese Head Spa Waterfall Scalp Therapy in Dubai",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: LUXURY_EASE },
  },
};

export function AboutServicesShowcase() {
  return (
    <section
      id="about-services"
      className="relative w-full overflow-hidden bg-white text-noir-950 py-20 sm:py-28 md:py-32 border-b border-noir-950/10"
    >
      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-8 md:px-12">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: LUXURY_EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="font-editorial text-xs font-semibold uppercase tracking-[0.2em] text-noir-500">
            Craft & Rituals
          </span>

          <h2 className="mt-3 font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-noir-950 uppercase">
            Our Services
          </h2>

          <p className="mt-4 font-jakarta text-sm sm:text-base md:text-lg leading-relaxed text-noir-600">
            From sharp razor aesthetics to therapeutic Japanese scalp
            hydrotherapy, every ritual is engineered for uncompromising male
            excellence.
          </p>
        </motion.div>

        {/* ── Services Editorial Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {aboutServices.map((service) => (
            <motion.article
              key={service.id}
              variants={itemVariants}
              className="group relative flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl bg-neutral-50 border border-noir-950/10 transition-all duration-500 hover:shadow-xl hover:border-noir-950/20"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-noir-900">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                {/* Index Pill */}
                <span className="absolute top-4 left-4 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 font-editorial text-xs font-semibold text-white tracking-widest border border-white/15">
                  {service.index}
                </span>

                {/* Category Pill */}
                <span className="absolute bottom-4 left-4 rounded-full bg-black/70 backdrop-blur-md px-3 py-1 font-jakarta text-2xs uppercase tracking-wider text-white/90">
                  {service.category}
                </span>
              </div>

              {/* Text Content */}
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                <div>
                  <h3 className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-noir-950 uppercase group-hover:text-brand-DEFAULT transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="mt-3 font-jakarta text-sm leading-relaxed text-noir-600">
                    {service.description}
                  </p>
                </div>

                {/* Booking Trigger */}
                <div className="mt-6 pt-4 border-t border-noir-950/5 flex items-center justify-between">
                  <a
                    href={siteConfig.booking.primaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-editorial text-xs font-bold uppercase tracking-wider text-noir-950 inline-flex items-center gap-2 group/link hover:text-brand-DEFAULT transition-colors"
                  >
                    <span>Reserve Treatment</span>
                    <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
