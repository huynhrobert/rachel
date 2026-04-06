import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

function escapeCsv(value: string | null | undefined): string {
  if (!value) return "";
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rsvps = await prisma.rsvp.findMany({
    include: {
      guest: {
        include: {
          group: true,
        },
      },
      event: true,
    },
    orderBy: [
      { guest: { group: { name: "asc" } } },
      { guest: { lastName: "asc" } },
      { event: { sortOrder: "asc" } },
    ],
  });

  const headers = [
    "Group",
    "Guest Name",
    "Email",
    "Event",
    "Attending",
    "Meal Choice",
    "Dietary Restrictions",
    "Plus One Name",
    "Plus One Meal",
    "Song Request",
    "Notes",
    "Submitted At",
  ];

  const rows = rsvps.map((rsvp) => [
    escapeCsv(rsvp.guest.group.name),
    escapeCsv(`${rsvp.guest.firstName} ${rsvp.guest.lastName}`),
    escapeCsv(rsvp.guest.email),
    escapeCsv(rsvp.event.name),
    rsvp.attending ? "Yes" : "No",
    escapeCsv(rsvp.mealChoice),
    escapeCsv(rsvp.dietaryRestrictions),
    escapeCsv(rsvp.plusOneName),
    escapeCsv(rsvp.plusOneMealChoice),
    escapeCsv(rsvp.songRequest),
    escapeCsv(rsvp.notes),
    rsvp.submittedAt
      ? new Date(rsvp.submittedAt).toISOString()
      : "",
  ]);

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="rsvp-export-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
