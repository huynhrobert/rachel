import Link from "next/link";
import { Button } from "@/components/ui/button";
import { weddingConfig } from "@/config/wedding";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Container } from "@/components/shared/Container";

export function RsvpCta() {
  return (
    <section className="py-20 md:py-28">
      <Container className="max-w-2xl text-center">
        <AnimatedSection>
          <p className="text-sm tracking-widest uppercase text-warm-gray mb-4">
            Will you join us?
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6">
            We can&apos;t wait to celebrate with you
          </h2>
          <Link href="/rsvp">
            <Button
              size="lg"
              className="bg-gold hover:bg-gold/90 text-white font-medium tracking-wide px-10 py-6 text-base"
            >
              RSVP Now
            </Button>
          </Link>
          <p className="mt-4 text-sm text-warm-gray">
            Please respond by {weddingConfig.rsvpDeadlineDisplay}
          </p>
        </AnimatedSection>
      </Container>
    </section>
  );
}
