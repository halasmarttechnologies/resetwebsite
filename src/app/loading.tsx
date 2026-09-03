import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20">
      <Container size="sm">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="h-10 w-10 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
          <p className="font-serif text-sm tracking-luxury text-noir-300 uppercase">
            Loading Reset Men Salon...
          </p>
        </div>
      </Container>
    </div>
  );
}
