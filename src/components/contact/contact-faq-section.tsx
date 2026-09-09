"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const contactFaqs: FaqItem[] = [
  {
    question: "Where in Business Bay is Reset Men Salon located?",
    answer:
      "We are situated centrally in Business Bay, Dubai, within easy reach of Downtown Dubai and the Dubai Canal. Dedicated valet and visitor parking are available upon arrival at the entrance.",
  },
  {
    question: "Do I need to book an appointment in advance?",
    answer:
      "While we gladly welcome walk-ins whenever our master stylists and therapists are available, booking in advance ensures your preferred time slot and dedicated grooming master. You can book instantly via WhatsApp or call our reception.",
  },
  {
    question: "What is the fastest way to get in touch or book?",
    answer:
      "Our direct WhatsApp concierge (+971 58 102 1540) is monitored continuously by our reception team for immediate confirmations, special requests, and inquiries.",
  },
  {
    question: "What payment methods are accepted at the salon?",
    answer:
      "We accept all major credit and debit cards (Visa, Mastercard, American Express), Apple Pay, digital wallet payments, and cash in AED.",
  },
  {
    question: "Can I book multiple services or private grooming packages?",
    answer:
      "Yes. Our concierge can customize a tailored half-day or multi-service grooming session combining haircuts, Japanese head spa, massage, and nail care. Mention your preferences when messaging us.",
  },
];

export function ContactFaqSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-noir-50/70 py-20 sm:py-28 border-t border-noir-200">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="font-editorial text-xs sm:text-sm font-semibold tracking-[0.2em] text-noir-500">
            Frequently Asked Questions
          </span>
          <h2 className="mt-3 font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-noir-950">
            Need more information?
          </h2>
          <p className="mt-3 font-jakarta text-sm sm:text-base text-noir-600">
            Quick answers to common questions about visiting Reset Men Salon in Business Bay.
          </p>
        </div>

        <div className="space-y-4">
          {contactFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="bg-white border border-noir-200 transition-colors duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                >
                  <span className="font-editorial text-base sm:text-lg font-semibold text-noir-950">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-noir-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-noir-950" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-7 font-jakarta text-sm sm:text-base text-noir-600 leading-relaxed border-t border-noir-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
