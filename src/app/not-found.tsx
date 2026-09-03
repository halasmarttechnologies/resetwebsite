import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 text-center">
      <Container size="sm">
        <div className="rounded-lg border border-noir-750 bg-noir-850 p-12">
          <span className="font-mono text-xs uppercase tracking-luxury text-brand-gold block mb-2">
            404 Error
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-noir-50 mb-4">
            Page Not Found
          </h1>
          <p className="text-noir-300 text-sm mb-8">
            The grooming treatment or page you are looking for does not exist or has been relocated.
          </p>
          <Link href="/">
            <Button variant="gold" size="md">
              Return to Sanctuary
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
