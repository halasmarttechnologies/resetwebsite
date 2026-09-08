import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-noir-900 disabled:pointer-events-none disabled:opacity-50",
          // Variants
          variant === "primary" &&
            "bg-brand-gold text-noir-950 hover:bg-brand-400 active:bg-brand-500 font-semibold shadow-lg shadow-brand-gold/10",
          variant === "gold" &&
            "bg-gradient-to-r from-brand-gold via-brand-300 to-brand-bronze text-noir-950 font-semibold hover:brightness-110 shadow-lg shadow-brand-gold/15",
          variant === "secondary" &&
            "bg-noir-800 text-brand-50 border border-noir-700 hover:bg-noir-750 hover:border-noir-600",
          variant === "outline" &&
            "bg-transparent text-brand-300 border border-brand-gold/40 hover:border-brand-gold hover:bg-brand-gold/10",
          variant === "ghost" &&
            "bg-transparent text-noir-200 hover:text-brand-gold hover:bg-noir-800/60",
          // Sizes
          size === "sm" && "text-xs px-3.5 py-1.5 rounded-sm",
          size === "md" && "text-sm px-5 py-2.5 rounded-sm",
          size === "lg" && "text-base px-7 py-3.5 rounded-sm uppercase tracking-luxury text-xs font-semibold",
          size === "icon" && "h-10 w-10 p-0 rounded-sm",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="h-4 w-4 animate-spin text-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
