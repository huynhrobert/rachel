"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Loader2, ArrowLeft, Music, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { weddingConfig } from "@/config/wedding";
import type { RsvpGroupData, ExistingRsvp } from "./types";

type GuestEventResponse = {
  guestId: string;
  guestName: string;
  eventId: string;
  eventName: string;
  attending: string; // "yes" | "no"
  mealChoice: string;
  dietaryRestrictions: string;
};

type FormData = {
  responses: GuestEventResponse[];
  plusOneName: string;
  plusOneMealChoice: string;
  plusOneDietaryRestrictions: string;
  songRequest: string;
  notes: string;
};

function getExistingRsvp(
  rsvps: ExistingRsvp[],
  guestId: string,
  eventId: string
): ExistingRsvp | undefined {
  return rsvps.find((r) => r.guestId === guestId && r.eventId === eventId);
}

export function AttendanceForm({
  groupData,
  onBack,
  onSubmitted,
}: {
  groupData: RsvpGroupData;
  onBack: (() => void) | null;
  onSubmitted: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Build initial form values from group data + existing RSVPs
  const initialResponses: GuestEventResponse[] = [];
  const sortedEvents = [...groupData.events].sort((a, b) => a.sortOrder - b.sortOrder);

  for (const guest of groupData.guests) {
    for (const event of sortedEvents) {
      const existing = getExistingRsvp(groupData.existingRsvps, guest.id, event.id);
      initialResponses.push({
        guestId: guest.id,
        guestName: `${guest.firstName} ${guest.lastName}`,
        eventId: event.id,
        eventName: event.name,
        attending: existing ? (existing.attending ? "yes" : "no") : "",
        mealChoice: existing?.mealChoice || "",
        dietaryRestrictions: existing?.dietaryRestrictions || "",
      });
    }
  }

  // Get existing plus-one data from the first RSVP that has it
  const existingPlusOne = groupData.existingRsvps.find((r) => r.plusOneName);

  const { register, control, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      responses: initialResponses,
      plusOneName: existingPlusOne?.plusOneName || "",
      plusOneMealChoice: existingPlusOne?.plusOneMealChoice || "",
      plusOneDietaryRestrictions: existingPlusOne?.plusOneDietaryRestrictions || "",
      songRequest: existingPlusOne?.songRequest || groupData.existingRsvps[0]?.songRequest || "",
      notes: existingPlusOne?.notes || groupData.existingRsvps[0]?.notes || "",
    },
  });

  const { fields } = useFieldArray({ control, name: "responses" });
  const watchResponses = watch("responses");

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError("");

    try {
      // Build API payload
      const responses = data.responses
        .filter((r) => r.attending !== "")
        .map((r, _i) => ({
          guestId: r.guestId,
          eventId: r.eventId,
          attending: r.attending === "yes",
          mealChoice: r.attending === "yes" ? r.mealChoice || undefined : undefined,
          dietaryRestrictions: r.attending === "yes" ? r.dietaryRestrictions || undefined : undefined,
          plusOneName: groupData.plusOneAllowed ? data.plusOneName || undefined : undefined,
          plusOneMealChoice: groupData.plusOneAllowed ? data.plusOneMealChoice || undefined : undefined,
          plusOneDietaryRestrictions: groupData.plusOneAllowed ? data.plusOneDietaryRestrictions || undefined : undefined,
          songRequest: data.songRequest || undefined,
          notes: data.notes || undefined,
        }));

      const res = await fetch("/api/rsvp/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupId: groupData.id, responses }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Something went wrong");
        return;
      }

      onSubmitted();
    } catch {
      setError("Unable to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Group fields by guest
  const guestGroups = groupData.guests.map((guest) => ({
    guest,
    fields: fields.filter((f) => f.guestId === guest.id),
    indices: fields
      .map((f, i) => (f.guestId === guest.id ? i : -1))
      .filter((i) => i >= 0),
  }));

  const anyAttending = watchResponses?.some((r) => r.attending === "yes");

  return (
    <AnimatedSection>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Back button */}
        {onBack && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-warm-gray"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to search
          </Button>
        )}

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="font-serif text-xl text-charcoal">
              {groupData.name}
            </CardTitle>
            <p className="text-sm text-warm-gray">
              You&apos;re invited to {sortedEvents.length} event{sortedEvents.length > 1 ? "s" : ""}. Please respond for each guest below.
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            {guestGroups.map(({ guest, indices }) => (
              <div key={guest.id}>
                <h3 className="font-medium text-charcoal mb-4">
                  {guest.firstName} {guest.lastName}
                </h3>
                <div className="space-y-4 pl-4 border-l-2 border-gold/20">
                  {indices.map((idx) => {
                    const resp = watchResponses?.[idx];
                    return (
                      <div key={fields[idx].id} className="space-y-3">
                        <p className="text-sm font-medium text-charcoal">
                          {fields[idx].eventName}
                        </p>

                        {/* Attending */}
                        <RadioGroup
                          value={resp?.attending || ""}
                          onValueChange={(val) =>
                            setValue(`responses.${idx}.attending`, val)
                          }
                          className="flex gap-4"
                        >
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="yes" id={`${idx}-yes`} />
                            <Label htmlFor={`${idx}-yes`} className="text-sm cursor-pointer">
                              Joyfully accepts
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="no" id={`${idx}-no`} />
                            <Label htmlFor={`${idx}-no`} className="text-sm cursor-pointer">
                              Regretfully declines
                            </Label>
                          </div>
                        </RadioGroup>

                        {/* Meal choice (only if attending) */}
                        {resp?.attending === "yes" && (
                          <div className="space-y-2">
                            <Label className="text-sm text-warm-gray">
                              Meal preference
                            </Label>
                            <Select
                              value={resp?.mealChoice || ""}
                              onValueChange={(val) =>
                                setValue(`responses.${idx}.mealChoice`, val ?? "")
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a meal" />
                              </SelectTrigger>
                              <SelectContent>
                                {weddingConfig.mealOptions.map((meal) => (
                                  <SelectItem key={meal.value} value={meal.value}>
                                    {meal.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Input
                              {...register(`responses.${idx}.dietaryRestrictions`)}
                              placeholder="Dietary restrictions or allergies (optional)"
                              className="text-sm"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <Separator className="mt-6" />
              </div>
            ))}

            {/* Plus One */}
            {groupData.plusOneAllowed && anyAttending && (
              <>
                <div className="space-y-4">
                  <h3 className="font-medium text-charcoal">Plus One</h3>
                  <p className="text-sm text-warm-gray">
                    Your invitation includes a plus one. Add their details below
                    (optional).
                  </p>
                  <Input
                    {...register("plusOneName")}
                    placeholder="Guest name"
                  />
                  <Select
                    value={watch("plusOneMealChoice") || ""}
                    onValueChange={(val) => setValue("plusOneMealChoice", val ?? "")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Meal preference for plus one" />
                    </SelectTrigger>
                    <SelectContent>
                      {weddingConfig.mealOptions.map((meal) => (
                        <SelectItem key={meal.value} value={meal.value}>
                          {meal.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    {...register("plusOneDietaryRestrictions")}
                    placeholder="Dietary restrictions (optional)"
                  />
                </div>
                <Separator />
              </>
            )}

            {/* Song request & Notes */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-warm-gray flex items-center gap-1.5 mb-2">
                  <Music className="h-3.5 w-3.5" /> Song request
                </Label>
                <Input
                  {...register("songRequest")}
                  placeholder="What song will get you on the dance floor?"
                />
              </div>
              <div>
                <Label className="text-sm text-warm-gray flex items-center gap-1.5 mb-2">
                  <MessageSquare className="h-3.5 w-3.5" /> Message for the
                  couple
                </Label>
                <Textarea
                  {...register("notes")}
                  placeholder="Any notes or well wishes (optional)"
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {error && (
          <p className="text-sm text-center text-destructive">{error}</p>
        )}

        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-gold hover:bg-gold/90 text-white py-6 text-base font-medium"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting...
            </>
          ) : (
            "Submit RSVP"
          )}
        </Button>
      </form>
    </AnimatedSection>
  );
}
