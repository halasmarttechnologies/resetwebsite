"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Only surface stack details in development. In production we
    // deliberately keep the client console quiet — the same error is
    // captured server-side with its `digest` for correlation, and
    // exposing a stack in DevTools would leak internal file paths.
    if (process.env.NODE_ENV !== "production") {
      console.error("App Error Boundary caught:", error);
    }
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 text-center">
      <Container size="sm">
        <div className="rounded-lg border border-red-950/80 bg-noir-850 p-12">
          <span className="font-mono text-xs uppercase tracking-luxury text-red-400 block mb-2">
            System Error
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-noir-50 mb-4">
            Something Went Wrong
          </h1>
          <p className="text-noir-300 text-sm mb-8">
            An unexpected error occurred while loading this page. Please try refreshing.
          </p>
          <Button onClick={() => reset()} variant="gold" size="md">
            Try Again
          </Button>
        </div>
      </Container>
    </div>
  );
}
