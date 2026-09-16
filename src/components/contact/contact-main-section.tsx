"use client";

import * as React from "react";
import Script from "next/script";
import Image from "next/image";
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
  Sparkles,
  Coffee,
  Car,
} from "lucide-react";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=971581021540&text=Hello%20Reset%20Barber%2C%20I%27m%20interested%20in%20your%20services.%20Can%20I%20book%20an%20appointment%3F";

const contactCards = [
  {
    icon: MessageCircle,
    title: "WhatsApp Concierge",
    value: "+971 581 021 540",
    badge: "Fastest response (< 5 min)",
    detail: "Instant bookings, inquiries & personalized requests",
    href: WHATSAPP_URL,
    actionLabel: "Chat on WhatsApp",
    isExternal: true,
    highlight: true,
  },
  {
    icon: Phone,
    title: "Salon Direct Line",
    value: "+971 4565 5688",
    badge: "Reception desk",
    detail: "Speak directly with our front desk team",
    href: "tel:+97145655688",
    actionLabel: "Call direct",
    isExternal: false,
    highlight: false,
  },
  {
    icon: Mail,
    title: "Email Inquiries",
    value: "info@resetmensalon.ae",
    badge: "Private consultations",
    detail: "Corporate packages, VIP events & general inquiries",
    href: "mailto:info@resetmensalon.ae",
    actionLabel: "Send email",
    isExternal: false,
    highlight: false,
  },
  {
    icon: MapPin,
    title: "Salon Location",
    value: "Business Bay, Dubai",
    badge: "Executive Bay District",
    detail: "Overlooking Dubai Canal with dedicated valet parking",
    href: "https://maps.google.com/?q=Reset+Men+Salon+Business+Bay+Dubai",
    actionLabel: "Get directions",
    isExternal: true,
    highlight: false,
  },
];

const serviceOptions = [
  "Hair & Beard Styling",
  "Japanese Head Spa",
  "Hair Coloring & Treatment",
  "Facial Treatments",
  "Massage Therapy",
  "Men's Waxing",
  "Manicure & Pedicure (Nails)",
  "VIP Grooming Package / Concierge Inquiry",
];

function useSalonStatus() {
  const [isOpen, setIsOpen] = React.useState(true);

  React.useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      // Dubai is UTC+4
      const gstHours = (now.getUTCHours() + 4) % 24;
      setIsOpen(gstHours >= 10 && gstHours < 22);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return isOpen;
}

export function ContactMainSection() {
  const isSalonCurrentlyOpen = useSalonStatus();

  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    service: serviceOptions[0],
    preferredDate: "",
    message: "",
    website: "",
  });

  const [formStatus, setFormStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const formRenderedAtRef = React.useRef<number>(Date.now());
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
          message: `${formData.preferredDate ? `[Preferred Date/Time: ${formData.preferredDate}] ` : ""}${formData.message}`,
          honeypot: formData.website,
          formRenderedAt: formRenderedAtRef.current,
        }),
      });

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
      setErrorMessage(
        "We couldn't reach the server. Please try again, or message us on WhatsApp."
      );
      setFormStatus("error");
    } finally {
      inFlightRef.current = false;
    }
  };

  return (
    <section className="relative w-full bg-white py-20 sm:py-28 text-noir-950">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-jakarta text-xs font-bold tracking-[0.2em] text-neutral-500 uppercase">
              Concierge & Reservations
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-neutral-100 text-neutral-800 text-[11px] font-semibold">
              <span
                className={`w-2 h-2 rounded-full ${
                  isSalonCurrentlyOpen ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                }`}
              />
              {isSalonCurrentlyOpen ? "Open Now in Business Bay" : "Opens 10:00 AM GST"}
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-noir-950">
            We are at your service.
          </h2>
          <p className="mt-4 font-jakarta text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl">
            Whether you are booking a signature haircut, an immersive Japanese head spa ritual, or a private grooming session, our concierge desk is here to assist you daily.
          </p>
        </div>

        {/* 4 Quick Contact Luxury Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20">
          {contactCards.map((card) => {
            const Icon = card.icon;
            return (
              <a
                key={card.title}
                href={card.href}
                target={card.isExternal ? "_blank" : undefined}
                rel={card.isExternal ? "noopener noreferrer" : undefined}
                className={`group relative p-6 sm:p-7 rounded-2xl sm:rounded-3xl border transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 ${
                  card.highlight
                    ? "bg-noir-950 text-white border-noir-950 shadow-lg ring-1 ring-noir-800"
                    : "bg-white text-noir-950 border-neutral-200/90 hover:border-neutral-400 shadow-sm"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm ${
                        card.highlight
                          ? "bg-[#25D366] text-white"
                          : "bg-neutral-100 text-noir-950 border border-neutral-200"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`font-jakarta text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        card.highlight
                          ? "bg-white/15 text-white"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {card.badge}
                    </span>
                  </div>

                  <span
                    className={`block font-jakarta text-xs font-bold tracking-wider uppercase ${
                      card.highlight ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    {card.title}
                  </span>

                  <p
                    className={`mt-1 font-editorial text-xl sm:text-2xl font-bold tracking-tight ${
                      card.highlight ? "text-white" : "text-noir-950"
                    }`}
                  >
                    {card.value}
                  </p>

                  <p
                    className={`mt-2 font-jakarta text-xs leading-relaxed ${
                      card.highlight ? "text-neutral-300" : "text-neutral-600"
                    }`}
                  >
                    {card.detail}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-current/10 flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1 font-jakarta text-xs font-bold underline underline-offset-4 ${
                      card.highlight
                        ? "text-white decoration-white/40 group-hover:decoration-white"
                        : "text-noir-950 decoration-neutral-300 group-hover:decoration-noir-950"
                    }`}
                  >
                    {card.actionLabel}
                  </span>
                  <ArrowUpRight
                    className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                      card.highlight ? "text-white/70" : "text-neutral-400 group-hover:text-noir-950"
                    }`}
                  />
                </div>
              </a>
            );
          })}
        </div>

        {/* 2-Column Luxury Layout: Interactive Form (Left) & Salon Sanctuary & Map (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-neutral-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-sm">
            {/* GoHighLevel External Tracking */}
            <Script
              id="ghl-external-tracking"
              src="https://link.msgsndr.com/js/external-tracking.js"
              data-tracking-id="tk_5eb25ed2a9be4a22ac9722ee93a6f4aa"
              strategy="afterInteractive"
            />

            <div className="mb-8">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="font-jakarta text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Concierge Direct Form
                </span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-noir-950 tracking-tight">
                Send us a message
              </h3>
              <p className="mt-1.5 font-jakarta text-sm text-neutral-600 leading-relaxed">
                Fill in your details below and our concierge will get in touch promptly. For immediate reservations, WhatsApp is recommended.
              </p>
            </div>

            {formStatus === "success" ? (
              <div className="py-12 px-6 text-center bg-neutral-50 rounded-2xl border border-neutral-200">
                <div className="w-14 h-14 rounded-full bg-emerald-500 text-white mx-auto flex items-center justify-center mb-4 shadow-md">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-editorial text-2xl sm:text-3xl font-bold text-noir-950 tracking-tight">
                  Inquiry Received
                </h4>
                <p className="mt-2 font-jakarta text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Reset Men Salon. Our concierge team in Business Bay has received your details and will get back to you shortly.
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
                        preferredDate: "",
                        message: "",
                        website: "",
                      });
                      formRenderedAtRef.current = Date.now();
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-noir-950 text-white font-jakarta text-xs font-bold hover:bg-neutral-800 transition-colors shadow-sm"
                  >
                    Send another message
                  </button>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366] text-white font-jakarta text-xs font-bold hover:bg-[#20bd5a] transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Instant WhatsApp Follow-Up</span>
                  </a>
                </div>
              </div>
            ) : (
              <form
                id="contact-form"
                name="contact_form"
                data-name="Reset Men Salon Contact Form"
                data-formid="contact-form"
                method="POST"
                action="/api/contact"
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate
              >
                {/* Honeypot */}
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
                    className="rounded-xl bg-red-50 border border-red-200 text-red-900 font-jakarta text-xs sm:text-sm p-4"
                  >
                    {errorMessage}{" "}
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 font-bold text-emerald-700"
                    >
                      Message on WhatsApp
                    </a>
                    .
                  </div>
                ) : null}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block font-jakarta text-xs font-bold text-noir-950 mb-1.5"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="full_name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="e.g. Alexander Vance"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50/70 border border-neutral-200 font-jakarta text-sm text-noir-950 placeholder:text-neutral-400 focus:outline-none focus:border-noir-950 focus:bg-white focus:ring-2 focus:ring-noir-950/10 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-jakarta text-xs font-bold text-noir-950 mb-1.5"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="e.g. alexander@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50/70 border border-neutral-200 font-jakarta text-sm text-noir-950 placeholder:text-neutral-400 focus:outline-none focus:border-noir-950 focus:bg-white focus:ring-2 focus:ring-noir-950/10 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block font-jakarta text-xs font-bold text-noir-950 mb-1.5"
                    >
                      Phone / WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="+971 50 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50/70 border border-neutral-200 font-jakarta text-sm text-noir-950 placeholder:text-neutral-400 focus:outline-none focus:border-noir-950 focus:bg-white focus:ring-2 focus:ring-noir-950/10 transition-all"
                    />
                  </div>

                  {/* Service of Interest */}
                  <div>
                    <label
                      htmlFor="service"
                      className="block font-jakarta text-xs font-bold text-noir-950 mb-1.5"
                    >
                      Desired Treatment
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50/70 border border-neutral-200 font-jakarta text-sm text-noir-950 focus:outline-none focus:border-noir-950 focus:bg-white focus:ring-2 focus:ring-noir-950/10 transition-all cursor-pointer"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Preferred Date & Time */}
                <div>
                  <label
                    htmlFor="preferredDate"
                    className="block font-jakarta text-xs font-bold text-noir-950 mb-1.5"
                  >
                    Preferred Date & Time <span className="text-neutral-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="preferredDate"
                    name="preferredDate"
                    type="text"
                    placeholder="e.g. Tomorrow around 4:00 PM, or this Saturday afternoon"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50/70 border border-neutral-200 font-jakarta text-sm text-noir-950 placeholder:text-neutral-400 focus:outline-none focus:border-noir-950 focus:bg-white focus:ring-2 focus:ring-noir-950/10 transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block font-jakarta text-xs font-bold text-noir-950 mb-1.5"
                  >
                    Special Notes or Questions <span className="text-neutral-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about any specific styling requests, group bookings, or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50/70 border border-neutral-200 font-jakarta text-sm text-noir-950 placeholder:text-neutral-400 focus:outline-none focus:border-noir-950 focus:bg-white focus:ring-2 focus:ring-noir-950/10 transition-all resize-none"
                  />
                </div>

                {/* Submit button & Privacy Badge */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    id="contact-submit-btn"
                    disabled={formStatus === "submitting"}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-noir-950 text-white font-jakarta text-sm font-bold tracking-wide hover:bg-neutral-800 active:scale-[0.98] transition-all disabled:opacity-70 shadow-md"
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

                  <div className="flex items-center gap-2 text-neutral-500 text-xs font-jakarta">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Your details are kept strictly confidential.</span>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Hours, Authentic Lounge Photography & Interactive Map (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Salon Hours & Live Status Card */}
            <div className="bg-noir-950 text-white p-7 sm:p-8 rounded-2xl sm:rounded-3xl border border-noir-900 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-white">
                      Salon Hours
                    </h4>
                    <p className="font-jakarta text-xs text-neutral-400">Business Bay, Dubai</p>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-jakarta font-bold ${
                    isSalonCurrentlyOpen
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSalonCurrentlyOpen ? "bg-emerald-400 animate-ping" : "bg-amber-400"
                    }`}
                  />
                  {isSalonCurrentlyOpen ? "Open Now" : "Closed Now"}
                </span>
              </div>

              <div className="space-y-3 font-jakarta text-sm border-t border-white/10 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Monday – Sunday</span>
                  <span className="font-bold text-white">10:00 AM – 10:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Walk-ins</span>
                  <span className="text-neutral-200">Welcome subject to chair availability</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">VIP Treatments</span>
                  <span className="text-neutral-200">Recommended to book in advance</span>
                </div>
              </div>

              {/* Fast WhatsApp Book button */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-jakarta text-sm font-bold tracking-wide transition-all shadow-md active:scale-[0.99]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp Booking</span>
                </a>
              </div>
            </div>

            {/* Authentic Salon Atmosphere Card */}
            <div className="bg-white border border-neutral-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-sm">
              <div className="relative w-full h-48 sm:h-56 rounded-xl sm:rounded-2xl overflow-hidden mb-4">
                <Image
                  src="/images/salon/salon-rotunda-boutique.webp"
                  alt="Reset Men Salon Business Bay Interior Reception"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="font-editorial text-lg font-bold">The Reset Sanctuary</span>
                  <p className="font-jakarta text-xs text-white/80">Business Bay, Dubai</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-jakarta font-semibold text-neutral-800">
                  <Car className="w-4 h-4 text-noir-950 shrink-0" />
                  <span>Valet Parking</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-jakarta font-semibold text-neutral-800">
                  <Coffee className="w-4 h-4 text-noir-950 shrink-0" />
                  <span>Artisan Lounge</span>
                </div>
              </div>
            </div>

            {/* Google Maps & Directions Card */}
            <div className="bg-white border border-neutral-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-5 h-5 text-noir-950" />
                  <h4 className="font-editorial text-lg font-bold text-noir-950 tracking-tight">
                    Visit Our Salon
                  </h4>
                </div>
                <a
                  href="https://maps.google.com/?q=Reset+Men+Salon+Business+Bay+Dubai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-jakarta text-xs font-bold text-noir-950 hover:text-black inline-flex items-center gap-1 underline underline-offset-4"
                >
                  <span>Open in Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="font-jakarta text-xs sm:text-sm text-neutral-600 mb-4 leading-relaxed">
                Centrally located in Business Bay, Dubai. Direct access from Downtown Dubai, Sheikh Zayed Road, and Al Khail Road.
              </p>

              {/* Map Embed */}
              <div className="w-full h-56 sm:h-64 rounded-xl sm:rounded-2xl border border-neutral-200 overflow-hidden relative bg-neutral-100">
                <iframe
                  title="Reset Men Salon Business Bay Dubai Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14441.139683935293!2d55.2643697!3d25.186714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682d33454b81%3A0x6d8efec009d13db7!2sBusiness%20Bay%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(15%) contrast(1.05)" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Location details list */}
              <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-col gap-2 font-jakarta text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <CalendarCheck className="w-3.5 h-3.5 text-noir-950 shrink-0" />
                  <span>Open 7 days a week, 10:00 AM – 10:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-noir-950 shrink-0" />
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
