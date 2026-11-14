"use client";

import * as React from "react";
import Image from "next/image";
import {
  Search,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Clock,
  CalendarCheck,
  Maximize2,
  X,
} from "lucide-react";
import {
  priceListCategories,
  priceListMeta,
  getWhatsAppBookingUrlForService,
} from "@/data/price-list";

export function PricingGridSection() {
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [isMenuImageOpen, setIsMenuImageOpen] = React.useState(false);

  const filteredCategories = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return priceListCategories
      .map((cat) => {
        if (activeCategory !== "all" && cat.slug !== activeCategory) {
          return null;
        }

        if (!query) {
          return cat;
        }

        const matchingItems = cat.items.filter(
          (item) =>
            item.name.toLowerCase().includes(query) || cat.title.toLowerCase().includes(query)
        );

        if (matchingItems.length === 0) return null;

        return {
          ...cat,
          items: matchingItems,
        };
      })
      .filter(Boolean) as typeof priceListCategories;
  }, [activeCategory, searchQuery]);

  return (
    <section className="relative w-full bg-white py-12 text-noir-950 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="mb-8 max-w-3xl sm:mb-12">
          <span className="font-editorial text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 sm:text-sm">
            Transparent Pricing
          </span>
          <h2 className="mt-2 font-editorial text-2xl font-bold tracking-tight text-noir-950 sm:mt-3 sm:text-4xl md:text-5xl lg:text-6xl">
            Salon Services & Price List
          </h2>
          <p className="mt-2.5 font-jakarta text-sm leading-relaxed text-neutral-600 sm:mt-4 sm:text-base md:text-lg">
            All prices are in AED and include all taxes. Every treatment is carried out by master
            stylists and therapists using genuine, skin-safe products in Business Bay, Dubai.
          </p>
        </div>

        {/* Official Menu Sheet Card */}
        <div className="mb-10 flex flex-col items-center justify-between gap-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 sm:mb-14 sm:p-7 md:flex-row">
          <div className="flex-1 space-y-2 text-center md:text-left">
            <span className="inline-block rounded-full border border-neutral-200 bg-white px-3 py-1 font-jakarta text-xs font-bold uppercase tracking-wider text-neutral-700">
              Official Menu Sheet
            </span>
            <h3 className="font-editorial text-xl font-bold text-noir-950 sm:text-2xl">
              In-Salon Printed Price List
            </h3>
            <p className="max-w-lg font-jakarta text-xs leading-relaxed text-neutral-600 sm:text-sm">
              Compare our direct salon price sheet showing all 44 services across Hair & Beard,
              Colouring, Treatments, Nails, Facials, Japanese Head Spa, Massages, and Waxing.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsMenuImageOpen(true)}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-noir-950 px-4 py-2 font-jakarta text-xs font-semibold text-white transition-colors hover:bg-neutral-800"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                <span>View Full Menu Picture</span>
              </button>
            </div>
          </div>

          <div
            onClick={() => setIsMenuImageOpen(true)}
            className="group relative aspect-[1/1.4] w-40 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-neutral-300 bg-white shadow sm:w-48"
            title="Click to view full picture"
          >
            <Image
              src="/images/reset-price-list.jpg"
              alt="Official Reset Men Salon Price List"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/30">
              <span className="rounded-full bg-black/80 px-2.5 py-1 font-jakarta text-[11px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                Click to Expand
              </span>
            </div>
          </div>
        </div>

        {/* Filter Controls: Search & Category Pills */}
        <div className="mb-8 space-y-3 sm:mb-12 sm:space-y-4">
          {/* Live Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search services (e.g. Haircut, Botox, Head Spa)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-10 pr-12 font-jakarta text-sm text-noir-950 shadow-sm transition-all placeholder:text-neutral-400 focus:border-noir-950 focus:bg-white focus:outline-none sm:py-3"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 font-jakarta text-xs text-neutral-400 hover:text-noir-900"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills (Edge-to-edge scroll on mobile) */}
          <div className="no-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto px-4 py-2 text-xs sm:mx-0 sm:px-0">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`whitespace-nowrap rounded-full px-3.5 py-2 font-jakarta font-bold shadow-sm transition-all ${
                activeCategory === "all"
                  ? "scale-[1.02] bg-noir-950 text-white shadow-md"
                  : "border border-neutral-200 bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              All Services ({priceListMeta.totalServices})
            </button>
            {priceListCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.slug)}
                className={`whitespace-nowrap rounded-full px-3.5 py-2 font-jakarta font-semibold shadow-sm transition-all ${
                  activeCategory === cat.slug
                    ? "scale-[1.02] bg-noir-950 text-white shadow-md"
                    : "border border-neutral-200 bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {cat.title} ({cat.items.length})
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Luxury Grid with High-Legibility Cards */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10">
          {filteredCategories.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-neutral-200 bg-neutral-50 p-6 py-16 text-center text-neutral-500 sm:p-8">
              <p className="font-editorial text-xl font-bold text-noir-950 sm:text-2xl">
                No treatments found
              </p>
              <p className="mt-2 font-jakarta text-xs text-neutral-600 sm:text-sm">
                No services match &ldquo;{searchQuery}&rdquo;. Try another search term or click
                &ldquo;All Services&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="mt-4 rounded-full bg-noir-950 px-5 py-2.5 font-jakarta text-xs font-semibold text-white transition-colors hover:bg-neutral-800"
              >
                Reset Search
              </button>
            </div>
          ) : (
            filteredCategories.map((cat) => (
              <div
                key={cat.id}
                className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-6 md:p-8"
              >
                <div>
                  {/* Category Header */}
                  <div className="mb-3 flex items-center justify-between gap-2 border-b border-neutral-100 pb-3 sm:mb-4 sm:pb-4">
                    <div className="min-w-0">
                      <h3 className="font-editorial text-lg font-bold tracking-tight text-noir-950 sm:text-2xl">
                        {cat.title}
                      </h3>
                      <p className="mt-0.5 line-clamp-1 font-jakarta text-[11px] text-neutral-500 sm:text-xs">
                        {cat.description}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full border border-neutral-200 bg-neutral-100 px-2.5 py-1 font-jakarta text-[11px] font-bold text-neutral-800 sm:px-3 sm:text-xs">
                      {cat.items.length} options
                    </span>
                  </div>

                  {/* Services Cards (Responsive mobile stack / desktop row) */}
                  <div className="space-y-2 sm:space-y-2.5">
                    {cat.items.map((item) => (
                      <div
                        key={item.id}
                        className="group flex flex-col justify-between gap-2.5 rounded-xl border border-neutral-200/70 bg-neutral-50/50 p-3 transition-all hover:border-neutral-300 hover:bg-white hover:shadow-sm sm:flex-row sm:items-center sm:gap-3 sm:p-4"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            <span className="font-jakarta text-[13px] font-bold leading-snug text-noir-950 group-hover:text-black sm:text-[15px]">
                              {item.name}
                            </span>
                            {item.popular && (
                              <span className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 font-jakarta text-[10px] font-bold text-amber-900 shadow-sm">
                                <Sparkles className="h-2.5 w-2.5 text-amber-600" />
                                Popular
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-neutral-100 pt-1.5 sm:justify-end sm:border-0 sm:pt-0">
                          <span className="font-editorial text-base font-bold tracking-tight text-noir-950 sm:text-xl">
                            {item.priceAED}{" "}
                            <span className="font-jakarta text-[11px] font-bold text-neutral-500 sm:text-xs">
                              AED
                            </span>
                          </span>

                          <a
                            href={getWhatsAppBookingUrlForService(item.name, item.priceAED)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full bg-noir-950 px-3.5 py-1.5 font-jakarta text-xs font-bold text-white shadow-sm transition-all hover:scale-105 hover:bg-[#25D366] active:scale-95"
                            title={`Book ${item.name} via WhatsApp`}
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            <span>Book</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Informational Assurance Ribbon */}
        <div className="mt-14 grid grid-cols-1 gap-6 border border-noir-200 bg-noir-50 p-6 text-noir-800 sm:grid-cols-3 sm:p-8">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-noir-950" />
            <div>
              <h4 className="font-editorial text-base font-bold text-noir-950">
                All-inclusive rates
              </h4>
              <p className="mt-1 font-jakarta text-xs text-noir-600">
                Transparent pricing with no hidden charges. All tools sanitized to medical
                standards.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-noir-950" />
            <div>
              <h4 className="font-editorial text-base font-bold text-noir-950">
                Open 7 days a week
              </h4>
              <p className="mt-1 font-jakarta text-xs text-noir-600">
                Open daily from 10:00 AM to 12:00 AM (midnight) in Business Bay. Walk-ins and
                appointments welcome.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CalendarCheck className="mt-0.5 h-5 w-5 shrink-0 text-noir-950" />
            <div>
              <h4 className="font-editorial text-base font-bold text-noir-950">
                Direct WhatsApp booking
              </h4>
              <p className="mt-1 font-jakarta text-xs text-noir-600">
                Instant reservation confirmation via our concierge desk at +971 581 021 540.
              </p>
            </div>
          </div>
        </div>
        {/* Full Screen Image Modal if tapped */}
        {isMenuImageOpen && (
          <div
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black/95 p-4"
            onClick={() => setIsMenuImageOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsMenuImageOpen(false)}
              className="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/40"
              aria-label="Close full view"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="relative h-[85vh] w-full max-w-2xl">
              <Image
                src="/images/reset-price-list.jpg"
                alt="Official Reset Men Salon Price List Full View"
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
