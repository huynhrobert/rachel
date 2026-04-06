import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { weddingConfig } from "@/config/wedding";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get("q");
  const code = searchParams.get("code");

  if (!q && !code) {
    return NextResponse.json(
      { error: "Please provide a name or invitation code" },
      { status: 400 }
    );
  }

  // Check RSVP deadline
  if (new Date() > weddingConfig.rsvpDeadline) {
    return NextResponse.json(
      { error: "The RSVP deadline has passed. Please contact us directly." },
      { status: 400 }
    );
  }

  try {
    if (code) {
      const group = await prisma.invitationGroup.findUnique({
        where: { code: code.toUpperCase() },
        include: {
          guests: true,
          invitedEvents: {
            include: { event: true },
          },
        },
      });

      if (!group) {
        return NextResponse.json(
          { error: "Invitation code not found. Please check and try again." },
          { status: 404 }
        );
      }

      // Fetch existing RSVPs for this group's guests
      const guestIds = group.guests.map((g) => g.id);
      const existingRsvps = await prisma.rsvp.findMany({
        where: { guestId: { in: guestIds } },
      });

      return NextResponse.json({
        groups: [
          {
            ...group,
            events: group.invitedEvents.map((ie) => ie.event),
            existingRsvps,
          },
        ],
      });
    }

    // Name search
    const guests = await prisma.guest.findMany({
      where: {
        OR: [
          { firstName: { contains: q! } },
          { lastName: { contains: q! } },
        ],
      },
      include: {
        group: {
          include: {
            guests: true,
            invitedEvents: {
              include: { event: true },
            },
          },
        },
      },
    });

    if (guests.length === 0) {
      return NextResponse.json(
        { error: "No guests found. Try your invitation code instead." },
        { status: 404 }
      );
    }

    // Deduplicate by group
    const groupMap = new Map<string, (typeof guests)[0]["group"]>();
    for (const guest of guests) {
      groupMap.set(guest.group.id, guest.group);
    }

    const groups = await Promise.all(
      Array.from(groupMap.values()).map(async (group) => {
        const guestIds = group.guests.map((g) => g.id);
        const existingRsvps = await prisma.rsvp.findMany({
          where: { guestId: { in: guestIds } },
        });
        return {
          ...group,
          events: group.invitedEvents.map((ie) => ie.event),
          existingRsvps,
        };
      })
    );

    return NextResponse.json({ groups });
  } catch (error) {
    console.error("Lookup error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
