"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { safeJsonLd } from "@/lib/security/sanitize-json-ld";

/**
 * Shared FAQ accordion + FAQPage JSON-LD. Every per-service FAQ was
 * structurally identical (identical accordion markup, same schema);
 * only the eyebrow, subtitle, and FAQs themselves varied. The
 * `id` prefix ensures ARIA button/panel IDs stay unique when two
 * FAQ sections happen to land on the same page.
 */

export interface ServiceFaq {
  id: string;
  question: string;
  answer: string;
}

interface ServiceFaqSectionProps {
  id?: string;
  eyebrow?: string;
  subtitle?: string;
  faqs: ServiceFaq[];
}

export function ServiceFaqSection({
  id = "faq",
  eyebrow = "Got Questions?",
  subtitle,
  faqs,
}: ServiceFaqSectionProps) {
  const [openId, setOpenId] = React.useState<string | null>(null);

  const faqSchema = React.useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    }),
    [faqs],
  );

  return (
    <section
      id={id}
      className="relative w-full overflow-hidden bg-white py-16 sm:py-20 md:py-28 border-b border-noir-950/10"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-8 md:px-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-editorial text-xs font-semibold tracking-[0.2em] text-noir-500">
            {eyebrow}
          </span>
          <h2 className="mt-3 font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-noir-950">
            Frequently Asked Questions
          </h2>
          {subtitle ? (
            <p className="mt-3 font-jakarta text-base text-noir-600">{subtitle}</p>
          ) : null}
        </div>

        <div className="w-full max-w-3xl mx-auto mt-10 sm:mt-14 border-t border-noir-950/10">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            const panelId = `faq-panel-${faq.id}`;
            const buttonId = `faq-button-${faq.id}`;

            return (
              <div key={faq.id} className="border-b border-noir-950/10">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="flex w-full items-center justify-between py-5 sm:py-6 text-left gap-4 focus:outline-none group cursor-pointer"
                  >
                    <span className="font-editorial text-base sm:text-lg font-medium text-noir-900 group-hover:text-black transition-colors">
                      {faq.question}
                    </span>
                    <span className="shrink-0 text-noir-500 transition-transform duration-300">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pr-6 font-jakarta text-sm sm:text-base leading-relaxed text-noir-600">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
