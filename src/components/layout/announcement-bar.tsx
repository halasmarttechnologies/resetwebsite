import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Sparkles, ArrowRight } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-noir-950 border-b border-noir-750/70 py-2 text-xs text-noir-300">
      <Container size="xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="flex h-2 w-2 rounded-full bg-brand-gold animate-pulse-subtle" />
            <span className="text-noir-200">
              Business Bay Sanctuary — Signature Japanese Head Spa & Grooming
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-2xs uppercase tracking-luxury text-noir-400">
            <span>Mon–Sun: 10AM – 10PM</span>
            <span className="h-3 w-[1px] bg-noir-700" />
            <Link
              href="/services/japanese-head-spa"
              className="text-brand-300 hover:text-brand-gold inline-flex items-center gap-1 transition-colors"
            >
              <span>Explore Head Spa</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
