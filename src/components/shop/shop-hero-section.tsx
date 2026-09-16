import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";

export function ShopHeroSection() {
  return (
    <div className="w-full text-center">
      {/* Navigation Breadcrumb */}
      <div className="flex justify-center mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-jakarta text-xs font-semibold text-neutral-500 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Sanctuary</span>
        </Link>
      </div>

      {/* Badge & Title */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-neutral-200/60 border border-neutral-300/80 text-[11px] font-jakarta font-bold uppercase tracking-wider text-neutral-800 mb-4">
        <Sparkles className="w-3 h-3 text-amber-600" />
        <span>Reset E-Commerce Store • Coming Soon</span>
      </div>

      <h1 className="font-editorial text-4xl sm:text-6xl font-bold tracking-tight text-noir-950 mb-4">
        Curated Grooming Essentials
      </h1>
      <p className="font-jakarta text-base sm:text-lg text-neutral-600 max-w-xl mx-auto mb-14 leading-relaxed">
        We are preparing our bespoke online storefront. Handcrafted pomades, organic beard elixirs, and authentic Japanese scalp formulas will soon be available for home delivery across the UAE.
      </p>
    </div>
  );
}
