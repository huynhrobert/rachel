import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";

export default function RsvpPage() {
  return (
    <section className="pt-28 md:pt-32 pb-20 md:pb-28 min-h-screen">
      <Container className="max-w-xl text-center">
        <SectionHeading
          title="RSVP"
          subtitle="We can't wait to celebrate with you."
        />
        <div className="bg-white rounded-lg border border-border p-8 space-y-4">
          <p className="text-warm-gray">
            Please use the personalized RSVP link from your invitation to
            respond. Each link is unique to your party.
          </p>
          <p className="text-sm text-warm-gray-light">
            Can&apos;t find your link? Please{" "}
            <a
              href="mailto:rachel@example.com"
              className="text-gold underline"
            >
              contact us
            </a>{" "}
            and we&apos;ll send it to you.
          </p>
        </div>
      </Container>
    </section>
  );
}
