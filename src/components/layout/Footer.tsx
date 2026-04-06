import Link from "next/link";
import { weddingConfig } from "@/config/wedding";
import { Container } from "@/components/shared/Container";

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80 py-12 md:py-16">
      <Container className="text-center">
        <p className="font-serif text-2xl md:text-3xl text-cream mb-2">
          {weddingConfig.couple.person1.name}{" "}
          <span className="text-gold">&</span>{" "}
          {weddingConfig.couple.person2.name}
        </p>
        <p className="text-sm tracking-widest uppercase text-cream/60 mb-6">
          {weddingConfig.displayDate}
        </p>
        <div className="h-px w-12 bg-gold/40 mx-auto mb-6" />
        <p className="text-sm text-cream/50 mb-2">
          {weddingConfig.hashtag}
        </p>
        <p className="text-xs text-cream/30">
          Made with love
        </p>
      </Container>
    </footer>
  );
}
