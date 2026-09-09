"use client";

import * as React from "react";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  CalendarCheck,
} from "lucide-react";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=971581021540&text=Hello%20Reset%20Barber%2C%20I%27m%20interested%20in%20your%20services.%20Can%20I%20book%20an%20appointment%3F";

const contactCards = [
  {
    icon: Phone,
    title: "Phone",
    value: "+971 4565 5688",
    detail: "Dedicated salon reception",
    href: "tel:+97145655688",
    actionLabel: "Call direct",
    isExternal: false,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+971 581 021 540",
    detail: "Fastest response & instant booking",
    href: WHATSAPP_URL,
    actionLabel: "Chat on WhatsApp",
    isExternal: true,
    highlight: true,
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@resetmensalon.ae",
    detail: "General inquiries & private consultations",
    href: "mailto:info@resetmensalon.ae",
    actionLabel: "Send email",
    isExternal: false,
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Dubai, Business Bay",
    detail: "Executive Bay / Dubai Canal District",
    href: "https://maps.google.com/?q=Reset+Men+Salon+Business+Bay+Dubai",
    actionLabel: "Get directions",
    isExternal: true,
  },
];

const serviceOptions = [
  "Hair & Beard Styling",
  "Hair Coloring & Treatment",
  "Facial Treatments",
  "Massage Therapy",
  "Men's Waxing",
  "Manicure & Pedicure (Nails)",
  "Japanese Head Spa",
  "Other / Concierge Inquiry",
];

export function ContactMainSection() {
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    service: serviceOptions[0],
    message: "",
    // Honeypot — hidden from real users, filled only by naïve bots.
    website: "",
  });

  const [formStatus, setFormStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // Snapshot the moment the form was first mounted — the server rejects
  // submissions that came in impossibly fast (bot heuristic).
  const formRenderedAtRef = React.useRef<number>(Date.now());
  // Guard against duplicate submissions while the fetch is in flight.
  const inFlightRef = React.useRef<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inFlightRef.current) return;
    inFlightRef.current = true;

    setFormStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          serviceCategory: formData.service,
          message: formData.message,
          honeypot: formData.website,
          formRenderedAt: formRenderedAtRef.current,
        }),
      });

      // Any JSON parse failure is treated as a transient outage — user
      // sees a soft error and the WhatsApp fallback in the success view.
      const payload = await response.json().catch(() => ({}));

      if (!response.ok || !payload?.success) {
        const msg =
          payload?.message ??
          (response.status === 429
            ? "Please wait a moment before submitting again."
            : "Something went wrong. Please try WhatsApp instead.");
        setErrorMessage(msg);
        setFormStatus("error");
        return;
      }

      setFormStatus("success");
    } catch {
      // Network failure — offer graceful fallback without breaking the UI.
      setErrorMessage(
        "We couldn't reach the server. Please try again, or message us on WhatsApp.",
      );
      setFormStatus("error");
    } finally {
      inFlightRef.current = false;
    }
  };

  return (
    <section className="relative w-full bg-white py-20 sm:py-28 text-noir-950">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <span className="font-editorial text-xs sm:text-sm font-semibold tracking-[0.2em] text-noir-500">
            Concierge & Inquiries
          </span>
          <h2 className="mt-3 font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-noir-950">
            Contact Us
          </h2>
          <p className="mt-4 font-jakarta text-base sm:text-lg text-noir-600 leading-relaxed">
            Do you want to get in touch with us or just want to say hi? Please fill in the form below
            or email us at{" "}
            <a
              href="mailto:info@resetmensalon.ae"
              className="text-noir-950 font-semibold underline underline-offset-4 decoration-noir-300 hover:decoration-noir-950 transition-colors"
            >
              info@resetmensalon.ae
            </a>
            . Our salon team in Business Bay is at your service.
          </p>
        </div>

        {/* 4 Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-16 sm:mb-20">
          {contactCards.map((card) => {
            const Icon = card.icon;
            return (
              <a
                key={card.title}
                href={card.href}
                target={card.isExternal ? "_blank" : undefined}
                rel={card.isExternal ? "noopener noreferrer" : undefined}
                className={`group relative p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between ${
                  card.highlight
                    ? "bg-noir-950 text-white border-noir-950 shadow-lg hover:bg-black"
                    : "bg-noir-50/50 text-noir-950 border-noir-200 hover:border-noir-400 hover:bg-white hover:shadow-md"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
                        card.highlight
                          ? "bg-white/10 text-white border border-white/20"
                          : "bg-white text-noir-950 border border-noir-200 shadow-sm"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight
                      className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                        card.highlight ? "text-white/60 group-hover:text-white" : "text-noir-400 group-hover:text-noir-950"
                      }`}
                    />
                  </div>

                  <span
                    className={`block font-jakarta text-xs font-semibold tracking-wider ${
                      card.highlight ? "text-white/70" : "text-noir-500"
                    }`}
                  >
                    {card.title}
                  </span>

                  <p
                    className={`mt-1 font-editorial text-lg sm:text-xl font-bold tracking-tight ${
                      card.highlight ? "text-white" : "text-noir-950"
                    }`}
                  >
                    {card.value}
                  </p>

                  <p
                    className={`mt-1.5 font-jakarta text-xs leading-relaxed ${
                      card.highlight ? "text-white/60" : "text-noir-500"
                    }`}
                  >
                    {card.detail}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-current/10">
                  <span
                    className={`inline-flex items-center gap-1.5 font-jakarta text-xs font-semibold underline underline-offset-4 ${
                      card.highlight
                        ? "text-white decoration-white/40 group-hover:decoration-white"
                        : "text-noir-900 decoration-noir-300 group-hover:decoration-noir-950"
                    }`}
                  >
                    {card.actionLabel}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* 2-Column Luxury Layout: Form (Left) & Hours + Map (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-noir-200 p-6 sm:p-10 shadow-sm">
            <div className="mb-8">
              <span className="font-editorial text-xs font-semibold tracking-wider text-noir-500">
                Direct Inquiry
              </span>
              <h3 className="mt-1 font-editorial text-2xl sm:text-3xl font-bold text-noir-950 tracking-tight">
                Send us a message
              </h3>
              <p className="mt-2 font-jakarta text-sm text-noir-600 leading-relaxed">
                Whether you have a question about our treatments or wish to arrange a private appointment,
                leave your details below.
              </p>
            </div>

            {formStatus === "success" ? (
              <div className="py-12 px-6 text-center bg-noir-50 border border-noir-200">
                <div className="w-12 h-12 rounded-full bg-noir-950 text-white mx-auto flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-editorial text-2xl font-bold text-noir-950 tracking-tight">
                  Message Sent Successfully
                </h4>
                <p className="mt-2 font-jakarta text-sm text-noir-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Reset Men Salon. Our concierge team in Business Bay will review
                  your inquiry and respond shortly.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFormStatus("idle");
                      setFormData({
                        fullName: "",
                        email: "",
                        phone: "",
                        service: serviceOptions[0],
                        message: "",
                        website: "",
                      });
                      formRenderedAtRef.current = Date.now();
                    }}
                    className="px-6 py-2.5 bg-noir-950 text-white font-jakarta text-xs font-semibold hover:bg-noir-800 transition-colors"
                  >
                    Send another message
                  </button>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 border border-noir-300 text-noir-950 font-jakarta text-xs font-semibold hover:bg-noir-100 transition-colors"
                  >
                    Chat on WhatsApp now
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Honeypot — visually hidden from humans, ignored by design.
                    Bots that fill every input on the page will populate this
                    and be rejected server-side. */}
                <div
                  aria-hidden="true"
                  className="absolute w-px h-px -m-px overflow-hidden clip-[rect(0,0,0,0)] whitespace-nowrap border-0 p-0"
                  style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
                >
                  <label htmlFor="website">Website (do not fill)</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                {errorMessage ? (
                  <div
                    role="alert"
                    className="bg-noir-50 border border-noir-300 text-noir-900 font-jakarta text-xs sm:text-sm px-4 py-3"
                  >
                    {errorMessage}{" "}
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 font-semibold"
                    >
                      Message on WhatsApp
                    </a>
                    .
                  </div>
                ) : null}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block font-jakarta text-xs font-semibold text-noir-800 mb-2"
                    >
                      Your Name <span className="text-noir-400">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-noir-50/50 border border-noir-200 font-jakarta text-sm text-noir-950 placeholder:text-noir-400 focus:outline-none focus:border-noir-950 focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-jakarta text-xs font-semibold text-noir-800 mb-2"
                    >
                      Email Address <span className="text-noir-400">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="e.g. name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-noir-50/50 border border-noir-200 font-jakarta text-sm text-noir-950 placeholder:text-noir-400 focus:outline-none focus:border-noir-950 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block font-jakarta text-xs font-semibold text-noir-800 mb-2"
                    >
                      Phone / WhatsApp <span className="text-noir-400">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      placeholder="+971 50 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-noir-50/50 border border-noir-200 font-jakarta text-sm text-noir-950 placeholder:text-noir-400 focus:outline-none focus:border-noir-950 focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Service Interest */}
                  <div>
                    <label
                      htmlFor="service"
                      className="block font-jakarta text-xs font-semibold text-noir-800 mb-2"
                    >
                      Service of Interest
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 bg-noir-50/50 border border-noir-200 font-jakarta text-sm text-noir-950 focus:outline-none focus:border-noir-950 focus:bg-white transition-colors cursor-pointer"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block font-jakarta text-xs font-semibold text-noir-800 mb-2"
                  >
                    Your Message / Desired Date & Time
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your requirements, appointment preferences, or any questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-noir-50/50 border border-noir-200 font-jakarta text-sm text-noir-950 placeholder:text-noir-400 focus:outline-none focus:border-noir-950 focus:bg-white transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-noir-950 text-white font-jakarta text-sm font-semibold tracking-wide hover:bg-noir-800 active:scale-[0.99] transition-all disabled:opacity-70 shadow-sm"
                  >
                    {formStatus === "submitting" ? (
                      <span>Sending inquiry...</span>
                    ) : (
                      <>
                        <span>Submit inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2 text-noir-500 text-xs font-jakarta">
                    <ShieldCheck className="w-4 h-4 text-noir-700" />
                    <span>Your contact details are strictly confidential.</span>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Hours, WhatsApp Fast Track, & Map (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Hours Card */}
            <div className="bg-noir-950 text-white p-7 sm:p-8 border border-noir-900 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-editorial text-xl font-bold tracking-tight text-white">
                  Salon Hours
                </h4>
              </div>

              <div className="space-y-3 font-jakarta text-sm border-t border-white/10 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Monday – Sunday</span>
                  <span className="font-semibold text-white">10:00 AM – 10:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Walk-ins</span>
                  <span className="text-white/90">Welcome subject to availability</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Appointments</span>
                  <span className="text-white/90">Recommended for peak times</span>
                </div>
              </div>

              {/* Fast WhatsApp Book button */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-jakarta text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md active:scale-[0.99]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp booking</span>
                </a>
              </div>
            </div>

            {/* Map & Location Card */}
            <div className="bg-white border border-noir-200 p-6 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-5 h-5 text-noir-950" />
                  <h4 className="font-editorial text-lg font-bold text-noir-950 tracking-tight">
                    Visit our salon
                  </h4>
                </div>
                <a
                  href="https://maps.google.com/?q=Reset+Men+Salon+Business+Bay+Dubai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-jakarta text-xs font-semibold text-noir-600 hover:text-noir-950 inline-flex items-center gap-1 underline underline-offset-4"
                >
                  <span>Open in Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="font-jakarta text-xs sm:text-sm text-noir-600 mb-4 leading-relaxed">
                Located in the heart of Business Bay, Dubai. Ample valet and visitor parking available
                at the building entrance.
              </p>

              {/* Responsive Google Maps Embed */}
              <div className="w-full h-56 sm:h-64 border border-noir-200 overflow-hidden relative bg-noir-100">
                <iframe
                  title="Reset Men Salon Business Bay Dubai Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14441.139683935293!2d55.2643697!3d25.186714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682d33454b81%3A0x6d8efec009d13db7!2sBusiness%20Bay%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(20%) contrast(1.05)" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Location details list */}
              <div className="mt-4 pt-3 border-t border-noir-100 flex flex-col gap-2 font-jakarta text-xs text-noir-600">
                <div className="flex items-center gap-2">
                  <CalendarCheck className="w-3.5 h-3.5 text-noir-900 shrink-0" />
                  <span>Open 7 days a week, 10:00 AM – 10:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-noir-900 shrink-0" />
                  <span>Business Bay, Dubai, United Arab Emirates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
