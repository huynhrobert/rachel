"use client";

import {
  Heart,
  Wine,
  Leaf,
  GlassWater,
  Music,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { eventDetails } from "@/config/events";
import { weddingConfig } from "@/config/wedding";

import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Wine,
  Leaf,
  Martini: GlassWater,
  GlassWater,
  Music,
};

export default function DetailsPage() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <Container>
        {/* Page heading */}
        <AnimatedSection>
          <SectionHeading
            title="Wedding Details"
            subtitle="Everything you need to know to join us for the celebration"
          />
        </AnimatedSection>

        {/* Event Schedule */}
        <div className="mx-auto max-w-3xl">
          <AnimatedSection>
            <h3 className="font-serif text-2xl md:text-3xl text-charcoal text-center mb-10">
              Event Schedule
            </h3>
          </AnimatedSection>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[7.5rem] top-0 bottom-0 hidden w-px bg-gold/30 md:block" />

            {eventDetails.map((event, index) => {
              const Icon = iconMap[event.icon] ?? Heart;

              return (
                <AnimatedSection
                  key={event.slug}
                  delay={index * 0.1}
                  className="mb-8 last:mb-0"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:gap-8">
                    {/* Time column */}
                    <div className="flex-shrink-0 md:w-28 md:text-right">
                      <p className="text-sm font-medium text-charcoal">
                        {event.time.split(" - ")[0]}
                      </p>
                      <p className="text-xs text-warm-gray">{event.date}</p>
                    </div>

                    {/* Dot marker (desktop) */}
                    <div className="relative hidden flex-shrink-0 md:flex md:items-start md:pt-1">
                      <div className="h-3 w-3 rounded-full bg-gold ring-4 ring-cream" />
                    </div>

                    {/* Card */}
                    <div className="flex-1 rounded-lg bg-white p-5 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sage-light">
                          <Icon className="h-5 w-5 text-sage" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-serif text-lg md:text-xl text-charcoal">
                            {event.name}
                          </h4>
                          <p className="mt-1 flex items-center gap-1 text-xs text-warm-gray">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-warm-gray">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>

        {/* Venue Section */}
        <div className="mx-auto mt-20 max-w-3xl">
          <AnimatedSection>
            <div className="rounded-lg bg-white p-8 shadow-sm text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-dusty-rose-light">
                <MapPin className="h-6 w-6 text-dusty-rose" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-charcoal">
                {weddingConfig.venue.name}
              </h3>
              <p className="mt-2 text-warm-gray">
                {weddingConfig.venue.address}
              </p>
              <a
                href={weddingConfig.venue.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-sage px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sage/90"
              >
                View on Google Maps
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </AnimatedSection>
        </div>

        {/* Dress Code Section */}
        <div className="mx-auto mt-16 max-w-3xl">
          <AnimatedSection>
            <div className="rounded-lg bg-white p-8 shadow-sm text-center">
              <h3 className="font-serif text-2xl md:text-3xl text-charcoal">
                Dress Code
              </h3>
              <div className="mx-auto mt-4 h-px w-12 bg-gold" />
              <p className="mt-4 text-warm-gray leading-relaxed">
                Formal / Black Tie Optional. We want you to feel your best!
                Think elegant evening wear -- floor-length gowns, cocktail
                dresses, suits, or tuxedos.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
