import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, CheckCircle, XCircle, Clock, Mail } from "lucide-react";
import { ExportButton } from "./ExportButton";

async function getDashboardData() {
  const [totalGuests, guests, rsvps] = await Promise.all([
    prisma.guest.count(),
    prisma.guest.findMany({
      include: {
        group: true,
        rsvps: {
          include: { event: true },
        },
      },
      orderBy: [{ group: { name: "asc" } }, { lastName: "asc" }],
    }),
    prisma.rsvp.findMany(),
  ]);

  const guestsWithRsvp = new Set(rsvps.map((r) => r.guestId));
  const responded = guestsWithRsvp.size;
  const attending = new Set(
    rsvps.filter((r) => r.attending).map((r) => r.guestId)
  ).size;
  const declined = new Set(
    rsvps.filter((r) => !r.attending).map((r) => r.guestId)
  ).size;
  const pending = totalGuests - responded;

  return { totalGuests, responded, attending, declined, pending, guests };
}

export default async function AdminDashboardPage() {
  const { totalGuests, responded, attending, declined, pending, guests } =
    await getDashboardData();

  const stats = [
    {
      label: "Total Invited",
      value: totalGuests,
      icon: Users,
      color: "text-charcoal",
    },
    {
      label: "Responded",
      value: responded,
      icon: Mail,
      color: "text-sage",
    },
    {
      label: "Attending",
      value: attending,
      icon: CheckCircle,
      color: "text-sage",
    },
    {
      label: "Declined",
      value: declined,
      icon: XCircle,
      color: "text-dusty-rose",
    },
    {
      label: "Pending",
      value: pending,
      icon: Clock,
      color: "text-gold",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif text-charcoal">Dashboard</h1>
        <ExportButton />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs font-sans font-medium text-warm-gray uppercase tracking-wider">
                    {stat.label}
                  </CardTitle>
                  <Icon className={`size-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <p className={`text-2xl font-semibold ${stat.color}`}>
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Guest Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-sans">All Guests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Group</TableHead>
                <TableHead>Events</TableHead>
                <TableHead>Attending</TableHead>
                <TableHead>Meal</TableHead>
                <TableHead>Dietary</TableHead>
                <TableHead>Plus One</TableHead>
                <TableHead>Submitted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guests.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center text-warm-gray py-8"
                  >
                    No guests found.
                  </TableCell>
                </TableRow>
              ) : (
                guests.map((guest) => {
                  const hasRsvp = guest.rsvps.length > 0;
                  const latestRsvp = guest.rsvps[0];

                  return (
                    <TableRow key={guest.id}>
                      <TableCell className="font-medium">
                        {guest.firstName} {guest.lastName}
                      </TableCell>
                      <TableCell className="text-warm-gray">
                        {guest.group.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {guest.rsvps.map((rsvp) => (
                            <Badge
                              key={rsvp.id}
                              variant={rsvp.attending ? "default" : "secondary"}
                              className="text-[10px]"
                            >
                              {rsvp.event.name}
                            </Badge>
                          ))}
                          {!hasRsvp && (
                            <span className="text-warm-gray-light text-xs">
                              --
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {hasRsvp ? (
                          guest.rsvps.some((r) => r.attending) ? (
                            <Badge variant="default" className="bg-sage text-white">
                              Yes
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-dusty-rose-light text-charcoal">
                              No
                            </Badge>
                          )
                        ) : (
                          <Badge variant="outline" className="text-gold">
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-warm-gray">
                        {latestRsvp?.mealChoice || "--"}
                      </TableCell>
                      <TableCell className="text-warm-gray">
                        {latestRsvp?.dietaryRestrictions || "--"}
                      </TableCell>
                      <TableCell className="text-warm-gray">
                        {latestRsvp?.plusOneName || "--"}
                      </TableCell>
                      <TableCell className="text-warm-gray text-xs">
                        {latestRsvp?.submittedAt
                          ? new Date(latestRsvp.submittedAt).toLocaleDateString()
                          : "--"}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
