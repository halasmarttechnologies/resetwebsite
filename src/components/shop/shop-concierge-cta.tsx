import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export function ShopConciergeCta() {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200/90 max-w-xl mx-auto shadow-sm text-center">
      <h4 className="font-editorial text-xl font-bold text-noir-950 mb-2">
        Need products today?
      </h4>
      <p className="font-jakarta text-xs sm:text-sm text-neutral-600 mb-5">
        All grooming products are in stock at our Business Bay salon reception. You can also order directly via our WhatsApp concierge.
      </p>
      <a
        href={siteConfig.booking.primaryUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-noir-950 hover:bg-[#25D366] text-white font-jakarta text-xs font-bold transition-all shadow-md active:scale-95"
      >
        <MessageCircle className="w-4 h-4" />
        <span>Order via WhatsApp Concierge</span>
      </a>
    </div>
  );
}
