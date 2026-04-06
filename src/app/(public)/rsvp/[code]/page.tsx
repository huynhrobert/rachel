"use client";

import { useState, useEffect, use } from "react";
import { Loader2 } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AttendanceForm } from "@/components/rsvp/AttendanceForm";
import { RsvpConfirmation } from "@/components/rsvp/RsvpConfirmation";
import type { RsvpGroupData } from "@/components/rsvp/types";

export default function RsvpCodePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = use(params);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [groupData, setGroupData] = useState<RsvpGroupData | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function loadGroup() {
      try {
        const res = await fetch(
          `/api/rsvp/lookup?code=${encodeURIComponent(code.toUpperCase())}`
        );
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Invitation not found");
          return;
        }

        if (data.groups && data.groups.length > 0) {
          setGroupData(data.groups[0]);
        } else {
          setError("Invitation not found. Please check your link.");
        }
      } catch {
        setError("Unable to load your invitation. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadGroup();
  }, [code]);

  return (
    <section className="pt-28 md:pt-32 pb-20 md:pb-28 min-h-screen">
      <Container className="max-w-2xl">
        <SectionHeading
          title="RSVP"
          subtitle="We can't wait to celebrate with you. Please let us know if you'll be joining us."
        />

        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-warm-gray mb-4">{error}</p>
            <p className="text-sm text-warm-gray-light">
              If you believe this is an error, please{" "}
              <a
                href="mailto:rachel@example.com"
                className="text-gold underline"
              >
                contact us
              </a>
              .
            </p>
          </div>
        )}

        {!loading && !error && groupData && !submitted && (
          <AttendanceForm
            groupData={groupData}
            onBack={null}
            onSubmitted={() => setSubmitted(true)}
          />
        )}

        {submitted && groupData && (
          <RsvpConfirmation
            groupData={groupData}
            onEdit={() => setSubmitted(false)}
          />
        )}
      </Container>
    </section>
  );
}
