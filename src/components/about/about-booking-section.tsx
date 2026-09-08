"use client";

import * as React from "react";
import { motion } from "framer-motion";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const SERVICES_LIST = [
  "Hair & Beard",
  "Hair Treatment & Colouring",
  "Facial",
  "Massage",
  "Waxing",
  "Nails",
  "Japanese Head Spa",
];

export function AboutBookingSection() {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [date, setDate] = React.useState("");
  const [selectedService, setSelectedService] = React.useState("Hair & Beard");
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let text = "Hello Reset Barber, I'm interested in your services. Can I book an appointment?";

    if (name || phone || email || date || selectedService) {
      const parts = [
        "Hello Reset Barber, I would like to book an appointment.",
        name ? `Name: ${name}` : "",
        phone ? `Phone: ${phone}` : "",
        email ? `Email: ${email}` : "",
        date ? `Preferred Date: ${date}` : "",
        selectedService ? `Service: ${selectedService}` : "",
      ].filter(Boolean);

      text = parts.join("\n");
    }

    const whatsappUrl = `https://api.whatsapp.com/send?phone=971581021540&text=${encodeURIComponent(
      text
    )}`;

    setIsSubmitted(true);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="book-appointment"
      className="relative w-full overflow-hidden bg-noir-950 text-white py-20 sm:py-28 md:py-36"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-DEFAULT/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-8 md:px-12">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: LUXURY_EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="font-editorial text-xs font-semibold uppercase tracking-[0.25em] text-brand-DEFAULT">
            Looking for a Sharp Look ? Book Your Barber !
          </span>

          <h2 className="mt-4 font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
            Book an Appointment
          </h2>

          <p className="mt-4 font-jakarta text-sm sm:text-base leading-relaxed text-noir-300">
            Schedule your next grooming session with ease. Simply provide your
            name, email, phone number, preferred date, and the service
            you&apos;d like. Our team will confirm your booking and ensure
            everything is ready for your visit.
          </p>
        </motion.div>

        {/* ── Interactive Booking Form Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, delay: 0.15, ease: LUXURY_EASE }}
          className="mt-12 sm:mt-16 mx-auto max-w-3xl rounded-3xl bg-noir-900/90 border border-white/10 p-6 sm:p-10 md:p-12 backdrop-blur-xl shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* 1. Service Selection Pills */}
            <div>
              <label className="block font-editorial text-xs sm:text-sm font-semibold uppercase tracking-wider text-noir-300 mb-3">
                Select Service
              </label>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {SERVICES_LIST.map((service) => {
                  const isSelected = selectedService === service;
                  return (
                    <button
                      type="button"
                      key={service}
                      onClick={() => setSelectedService(service)}
                      className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-jakarta transition-all duration-300 border ${
                        isSelected
                          ? "bg-white text-noir-950 font-semibold border-white shadow-md scale-[1.02]"
                          : "bg-white/5 text-noir-300 border-white/10 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {service}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Form Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="booking-name"
                  className="block font-editorial text-xs font-semibold uppercase tracking-wider text-noir-400 mb-2"
                >
                  Name
                </label>
                <input
                  id="booking-name"
                  type="text"
                  required
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3.5 font-jakarta text-sm text-white placeholder-noir-500 focus:outline-none focus:border-brand-DEFAULT focus:ring-1 focus:ring-brand-DEFAULT transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="booking-phone"
                  className="block font-editorial text-xs font-semibold uppercase tracking-wider text-noir-400 mb-2"
                >
                  Phone Number
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  required
                  placeholder="+971 50 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3.5 font-jakarta text-sm text-white placeholder-noir-500 focus:outline-none focus:border-brand-DEFAULT focus:ring-1 focus:ring-brand-DEFAULT transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="booking-email"
                  className="block font-editorial text-xs font-semibold uppercase tracking-wider text-noir-400 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="booking-email"
                  type="email"
                  required
                  placeholder="your.email@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3.5 font-jakarta text-sm text-white placeholder-noir-500 focus:outline-none focus:border-brand-DEFAULT focus:ring-1 focus:ring-brand-DEFAULT transition-all"
                />
              </div>

              {/* Preferred Date */}
              <div>
                <label
                  htmlFor="booking-date"
                  className="block font-editorial text-xs font-semibold uppercase tracking-wider text-noir-400 mb-2"
                >
                  Preferred Date
                </label>
                <input
                  id="booking-date"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3.5 font-jakarta text-sm text-white placeholder-noir-500 focus:outline-none focus:border-brand-DEFAULT focus:ring-1 focus:ring-brand-DEFAULT transition-all [color-scheme:dark]"
                />
              </div>
            </div>

            {/* 3. Submit Action & Fallback Link */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-white text-noir-950 font-editorial font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-neutral-200 transition-all duration-300 hover:scale-[1.02] shadow-xl inline-flex items-center justify-center gap-3"
              >
                <span>Book an Appointment</span>
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>

              <a
                href="https://api.whatsapp.com/send?phone=971581021540&text=Hello%20Reset%20Barber%2C%20I%27m%20interested%20in%20your%20services.%20Can%20I%20book%20an%20appointment%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="font-jakarta text-xs text-noir-400 hover:text-white underline underline-offset-4 transition-colors"
              >
                Or chat directly via WhatsApp Concierge (+971 58 102 1540)
              </a>
            </div>

            {/* Confirmation Banner */}
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-brand-DEFAULT/15 border border-brand-DEFAULT/30 text-center"
              >
                <p className="font-jakarta text-sm text-brand-DEFAULT font-medium">
                  Redirecting to Reset WhatsApp Concierge to confirm your
                  appointment...
                </p>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
