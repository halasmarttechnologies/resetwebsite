import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export function Card({
  className,
  hoverEffect = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-sm bg-noir-850 border border-noir-750 p-6 transition-all duration-300",
        hoverEffect &&
          "hover:border-brand-gold/40 hover:bg-noir-800 hover:-translate-y-1 shadow-lg shadow-black/40",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
