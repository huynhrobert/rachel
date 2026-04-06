import { weddingConfig } from "@/config/wedding";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Container } from "@/components/shared/Container";

export function WelcomeNote() {
  return (
    <section className="py-20 md:py-28">
      <Container className="max-w-3xl text-center">
        <AnimatedSection>
          <p className="font-serif text-2xl md:text-3xl text-charcoal leading-relaxed">
            {weddingConfig.welcomeNote}
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gold/40" />
            <span className="text-gold font-serif text-xl">R & L</span>
            <div className="h-px w-12 bg-gold/40" />
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
