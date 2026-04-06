import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { storyChapters } from "@/config/story";

export default function OurStoryPage() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <Container>
        <AnimatedSection>
          <SectionHeading
            title="Our Story"
            subtitle="How we went from strangers to soulmates"
          />
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative mx-auto max-w-4xl">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gold/30 -translate-x-1/2" />

          {storyChapters.map((chapter, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={chapter.date}
                className="relative mb-12 last:mb-0 md:mb-16"
              >
                {/* Dot marker */}
                <div className="absolute left-4 md:left-1/2 top-8 -translate-x-1/2 z-10">
                  <div className="h-3 w-3 rounded-full bg-gold ring-4 ring-cream" />
                </div>

                {/* Card wrapper - mobile: always right; desktop: alternating */}
                <div
                  className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                    isEven ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"
                  }`}
                >
                  <AnimatedSection
                    direction={isEven ? "left" : "right"}
                    delay={index * 0.1}
                  >
                    <div className="rounded-lg bg-white p-5 shadow-sm">
                      {/* Image placeholder */}
                      <div className="aspect-[4/3] rounded-md bg-sage/20 mb-4" />

                      {/* Date badge */}
                      <span className="inline-block rounded-full bg-gold-light px-3 py-1 text-xs font-medium tracking-wide text-charcoal uppercase">
                        {chapter.date}
                      </span>

                      {/* Title */}
                      <h3 className="mt-3 font-serif text-xl md:text-2xl text-charcoal">
                        {chapter.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-2 text-sm md:text-base leading-relaxed text-warm-gray">
                        {chapter.description}
                      </p>
                    </div>
                  </AnimatedSection>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
