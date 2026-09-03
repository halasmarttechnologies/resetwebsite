import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "gold" | "noir" | "outline" | "success";
}

export function Badge({
  className,
  variant = "noir",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-2xs font-semibold uppercase tracking-luxury rounded-sm select-none",
        variant === "gold" &&
          "bg-brand-gold/15 text-brand-300 border border-brand-gold/30",
        variant === "noir" &&
          "bg-noir-800 text-noir-300 border border-noir-700",
        variant === "outline" &&
          "bg-transparent text-brand-200 border border-noir-600",
        variant === "success" &&
          "bg-emerald-950/60 text-emerald-400 border border-emerald-800/40",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
