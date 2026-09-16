"use client";

import * as React from "react";
import {
  Search,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Clock,
  CalendarCheck,
} from "lucide-react";
import {
  priceListCategories,
  getWhatsAppBookingUrlForService,
} from "@/data/price-list";

export function PricingGridSection() {
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const filteredCategories = React.useMemo(() => {
    return priceListCategories
      .map((cat) => {
        if (activeCategory !== "all" && cat.slug !== activeCategory) {
          return null;
        }

        const matchingItems = cat.items.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cat.title.toLowerCase().includes(searchQuery.toLowerCase())
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
    <section className="relative w-full bg-white py-12 sm:py-24 text-noir-950">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-14">
          <span className="font-editorial text-xs sm:text-sm font-semibold tracking-[0.2em] text-neutral-500 uppercase">
            Transparent Pricing
          </span>
          <h2 className="mt-2 sm:mt-3 font-editorial text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-noir-950">
            Salon Services & Price List
          </h2>
          <p className="mt-2.5 sm:mt-4 font-jakarta text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed">
            All prices are in AED and include all taxes. Every treatment is carried out by master
            stylists and therapists using genuine, skin-safe products in Business Bay, Dubai.
          </p>
        </div>

        {/* Filter Controls: Search & Category Pills */}
        <div className="mb-8 sm:mb-12 space-y-3 sm:space-y-4">
          {/* Live Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search services (e.g. Haircut, Botox, Head Spa)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-12 py-2.5 sm:py-3 rounded-xl bg-neutral-50 border border-neutral-200 font-jakarta text-sm text-noir-950 placeholder:text-neutral-400 focus:outline-none focus:border-noir-950 focus:bg-white transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-jakarta text-neutral-400 hover:text-noir-900 px-1.5 py-0.5"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills (Edge-to-edge scroll on mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 text-xs -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`px-3.5 py-2 rounded-full font-jakarta font-bold transition-all whitespace-nowrap shadow-sm ${
                activeCategory === "all"
                  ? "bg-noir-950 text-white shadow-md scale-[1.02]"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200"
              }`}
            >
              All Services ({priceListCategories.reduce((acc, c) => acc + c.items.length, 0)})
            </button>
            {priceListCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-3.5 py-2 rounded-full font-jakarta font-semibold transition-all whitespace-nowrap shadow-sm ${
                  activeCategory === cat.slug
                    ? "bg-noir-950 text-white shadow-md scale-[1.02]"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200"
                }`}
              >
                {cat.title} ({cat.items.length})
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Luxury Grid with High-Legibility Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {filteredCategories.length === 0 ? (
            <div className="col-span-full py-16 text-center text-neutral-500 bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-8">
              <p className="font-editorial text-xl sm:text-2xl font-bold text-noir-950">No treatments found</p>
              <p className="font-jakarta text-xs sm:text-sm mt-2 text-neutral-600">
                No services match &ldquo;{searchQuery}&rdquo;. Try another search term or click &ldquo;All Services&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="mt-4 px-5 py-2.5 rounded-full bg-noir-950 text-white font-jakarta text-xs font-semibold hover:bg-neutral-800 transition-colors"
              >
                Reset Search
              </button>
            </div>
          ) : (
            filteredCategories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-3 sm:pb-4 mb-3 sm:mb-4 gap-2">
                    <div className="min-w-0">
                      <h3 className="font-editorial text-lg sm:text-2xl font-bold text-noir-950 tracking-tight truncate">
                        {cat.title}
                      </h3>
                      <p className="font-jakarta text-[11px] sm:text-xs text-neutral-500 mt-0.5 line-clamp-1">
                        {cat.description}
                      </p>
                    </div>
                    <span className="font-jakarta text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 bg-neutral-100 border border-neutral-200 text-neutral-800 rounded-full shrink-0">
                      {cat.items.length} options
                    </span>
                  </div>

                  {/* Services Cards (Responsive mobile stack / desktop row) */}
                  <div className="space-y-2 sm:space-y-2.5">
                    {cat.items.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 sm:p-4 rounded-xl border border-neutral-200/70 bg-neutral-50/50 hover:bg-white hover:border-neutral-300 hover:shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 transition-all group"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            <span className="font-jakarta text-[13px] sm:text-[15px] font-bold text-noir-950 group-hover:text-black leading-snug">
                              {item.name}
                            </span>
                            {item.popular && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-[10px] font-jakarta font-bold text-amber-900 shadow-sm">
                                <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                                Popular
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-1.5 sm:pt-0 border-t border-neutral-100 sm:border-0">
                          <span className="font-editorial text-base sm:text-xl font-bold text-noir-950 tracking-tight">
                            {item.priceAED}{" "}
                            <span className="font-jakarta text-[11px] sm:text-xs font-bold text-neutral-500">
                              AED
                            </span>
                          </span>

                          <a
                            href={getWhatsAppBookingUrlForService(item.name, item.priceAED)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-noir-950 hover:bg-[#25D366] text-white text-xs font-jakarta font-bold transition-all hover:scale-105 active:scale-95 shadow-sm"
                            title={`Book ${item.name} via WhatsApp`}
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
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
        <div className="mt-14 p-6 sm:p-8 bg-noir-50 border border-noir-200 grid grid-cols-1 sm:grid-cols-3 gap-6 text-noir-800">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-noir-950 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-editorial text-base font-bold text-noir-950">
                All-inclusive rates
              </h4>
              <p className="font-jakarta text-xs text-noir-600 mt-1">
                Transparent pricing with no hidden charges. All tools sanitized to medical standards.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-noir-950 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-editorial text-base font-bold text-noir-950">
                Open 7 days a week
              </h4>
              <p className="font-jakarta text-xs text-noir-600 mt-1">
                Open daily from 10:00 AM to 10:00 PM in Business Bay. Walk-ins and appointments welcome.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CalendarCheck className="w-5 h-5 text-noir-950 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-editorial text-base font-bold text-noir-950">
                Direct WhatsApp booking
              </h4>
              <p className="font-jakarta text-xs text-noir-600 mt-1">
                Instant reservation confirmation via our concierge desk at +971 581 021 540.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
