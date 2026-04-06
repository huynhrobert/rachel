import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { faqItems } from "@/config/faq";

export default function FaqPage() {
  return (
    <section className="py-20 md:py-28">
      <Container className="max-w-3xl">
        <AnimatedSection>
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Everything you need to know"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <Accordion className="divide-y divide-sage-light/30">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={index}>
                <AccordionTrigger className="py-5 text-base font-serif text-charcoal hover:no-underline hover:text-sage transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-warm-gray leading-relaxed pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </Container>
    </section>
  );
}
