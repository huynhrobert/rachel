"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { weddingConfig } from "@/config/wedding";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Container } from "@/components/shared/Container";

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white shadow-sm border border-border rounded-lg w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-2">
        <span className="font-serif text-3xl md:text-4xl text-charcoal">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs md:text-sm tracking-widest uppercase text-warm-gray">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer() {
  const { days, hours, minutes, seconds, isPast } = useCountdown(
    weddingConfig.date
  );

  if (isPast) {
    return (
      <section className="py-16 md:py-20 bg-sage/10">
        <Container className="text-center">
          <p className="font-serif text-3xl md:text-4xl text-charcoal">
            We said &ldquo;I do&rdquo;!
          </p>
          <p className="mt-3 text-warm-gray">
            Thank you for being part of our story.
          </p>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-sage/10">
      <Container className="text-center">
        <AnimatedSection>
          <p className="text-sm tracking-widest uppercase text-warm-gray mb-8">
            Counting down to forever
          </p>
          <div className="flex justify-center gap-4 md:gap-6">
            <CountdownUnit value={days} label="Days" />
            <CountdownUnit value={hours} label="Hours" />
            <CountdownUnit value={minutes} label="Mins" />
            <CountdownUnit value={seconds} label="Secs" />
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
