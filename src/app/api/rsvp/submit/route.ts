import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { rsvpSubmitSchema } from "@/lib/validations/rsvp";
import { weddingConfig } from "@/config/wedding";

export async function POST(request: NextRequest) {
  // Check RSVP deadline
  if (new Date() > weddingConfig.rsvpDeadline) {
    return NextResponse.json(
      { error: "The RSVP deadline has passed. Please contact us directly." },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();
    const parsed = rsvpSubmitSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid submission data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { groupId, responses } = parsed.data;

    // Verify the group exists
    const group = await prisma.invitationGroup.findUnique({
      where: { id: groupId },
      include: {
        guests: true,
        invitedEvents: true,
      },
    });

    if (!group) {
      return NextResponse.json(
        { error: "Invitation group not found" },
        { status: 404 }
      );
    }

    // Verify all guests belong to this group
    const groupGuestIds = new Set(group.guests.map((g) => g.id));
    const groupEventIds = new Set(group.invitedEvents.map((ie) => ie.eventId));

    for (const response of responses) {
      if (!groupGuestIds.has(response.guestId)) {
        return NextResponse.json(
          { error: "Invalid guest in submission" },
          { status: 400 }
        );
      }
      if (!groupEventIds.has(response.eventId)) {
        return NextResponse.json(
          { error: "Invalid event in submission" },
          { status: 400 }
        );
      }
    }

    // Upsert all RSVPs in a transaction
    const results = await prisma.$transaction(
      responses.map((response) =>
        prisma.rsvp.upsert({
          where: {
            guestId_eventId: {
              guestId: response.guestId,
              eventId: response.eventId,
            },
          },
          create: {
            guestId: response.guestId,
            eventId: response.eventId,
            attending: response.attending,
            mealChoice: response.mealChoice || null,
            dietaryRestrictions: response.dietaryRestrictions || null,
            plusOneName: response.plusOneName || null,
            plusOneMealChoice: response.plusOneMealChoice || null,
            plusOneDietaryRestrictions: response.plusOneDietaryRestrictions || null,
            songRequest: response.songRequest || null,
            notes: response.notes || null,
          },
          update: {
            attending: response.attending,
            mealChoice: response.mealChoice || null,
            dietaryRestrictions: response.dietaryRestrictions || null,
            plusOneName: response.plusOneName || null,
            plusOneMealChoice: response.plusOneMealChoice || null,
            plusOneDietaryRestrictions: response.plusOneDietaryRestrictions || null,
            songRequest: response.songRequest || null,
            notes: response.notes || null,
            submittedAt: new Date(),
          },
        })
      )
    );

    return NextResponse.json({
      success: true,
      message: "Your RSVP has been submitted successfully!",
      count: results.length,
    });
  } catch (error) {
    console.error("RSVP submit error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
