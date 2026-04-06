import Link from "next/link";
import { ExternalLink, Gift } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { registryNote, registryEntries } from "@/config/registry";

export default function RegistryPage() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <AnimatedSection>
          <SectionHeading title="Registry" subtitle={registryNote} />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {registryEntries.map((entry) => (
              <Card
                key={entry.name}
                className="border-sage-light/30 bg-cream/50"
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-dusty-rose-light/50">
                      <Gift className="h-5 w-5 text-dusty-rose" />
                    </div>
                    <CardTitle className="font-serif text-lg text-charcoal">
                      {entry.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {entry.description && (
                    <p className="text-warm-gray leading-relaxed">
                      {entry.description}
                    </p>
                  )}
                  <Link
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="sm"
                      className="bg-sage hover:bg-sage/90 text-white font-medium tracking-wide"
                    >
                      Visit Registry
                      <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
