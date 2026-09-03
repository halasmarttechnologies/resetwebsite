import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Construction, ArrowRight, ShieldCheck, Phone, MessageSquare } from "lucide-react";

interface DevelopmentBannerProps {
  pageTitle: string;
  category?: string;
  description?: string;
  metaData?: Record<string, string | number>;
}

export function DevelopmentBanner({
  pageTitle,
  category = "Page",
  description = "This route is scaffolded with full production architecture, CMS schema bindings, SEO metadata, and security layers. Visual UI design will be crafted step-by-step.",
  metaData,
}: DevelopmentBannerProps) {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-20">
      <Container size="md">
        <div className="relative rounded-lg border border-noir-700 bg-noir-850/90 p-8 md:p-12 backdrop-blur-md shadow-2xl overflow-hidden text-center">
          {/* Subtle Ambient Gold Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-brand-gold/5 blur-3xl pointer-events-none" />

          {/* Badge indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Badge variant="gold" className="flex items-center gap-1.5 py-1 px-3">
              <Construction className="w-3.5 h-3.5" />
              <span>Phase 1 — In Development</span>
            </Badge>
            <Badge variant="noir" className="py-1 px-3">
              {category}
            </Badge>
          </div>

          {/* Page Heading */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-noir-50 tracking-tight mb-4">
            {pageTitle}
          </h1>

          <p className="text-noir-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8">
            {description}
          </p>

          {/* Architecture Status Checklist */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-8 text-left bg-noir-900/80 p-4 rounded-md border border-noir-750">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-gold flex-shrink-0" />
              <span className="text-xs text-noir-200">SSR / RSC</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-gold flex-shrink-0" />
              <span className="text-xs text-noir-200">CMS Schema</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-gold flex-shrink-0" />
              <span className="text-xs text-noir-200">Local SEO</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-gold flex-shrink-0" />
              <span className="text-xs text-noir-200">Lenis Motion</span>
            </div>
          </div>

          {/* Metadata Display if present */}
          {metaData && Object.keys(metaData).length > 0 && (
            <div className="mb-8 p-4 bg-noir-900 rounded border border-noir-750/70 text-left max-w-md mx-auto">
              <span className="text-2xs font-semibold uppercase tracking-luxury text-brand-300 block mb-2">
                Route Context
              </span>
              <div className="space-y-1">
                {Object.entries(metaData).map(([k, v]) => (
                  <div key={k} className="flex justify-between text-xs text-noir-300">
                    <span className="font-mono capitalize">{k}:</span>
                    <span className="text-noir-100 font-medium">{String(v)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Direct Concierge CTA */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-noir-750/80">
            <a
              href={siteConfig.booking.primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="gold" size="md" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Concierge</span>
              </Button>
            </a>
            <a href={siteConfig.contact.phoneHref}>
              <Button variant="secondary" size="md" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-gold" />
                <span>{siteConfig.contact.phoneDisplay}</span>
              </Button>
            </a>
            <Link href="/">
              <Button variant="outline" size="md" className="flex items-center gap-2">
                <span>Back to Overview</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
