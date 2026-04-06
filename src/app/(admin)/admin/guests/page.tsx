import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users } from "lucide-react";

async function getGroups() {
  return prisma.invitationGroup.findMany({
    include: {
      guests: {
        include: {
          rsvps: {
            include: { event: true },
          },
        },
        orderBy: [{ isMainGuest: "desc" }, { lastName: "asc" }],
      },
      invitedEvents: {
        include: { event: true },
      },
    },
    orderBy: { name: "asc" },
  });
}

export default async function GuestsPage() {
  const groups = await getGroups();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif text-charcoal">Guest Management</h1>
        <p className="text-sm text-warm-gray">
          {groups.length} groups, {groups.reduce((sum, g) => sum + g.guests.length, 0)} guests
        </p>
      </div>

      <Card>
        <CardContent className="pt-4">
          {groups.length === 0 ? (
            <p className="text-center text-warm-gray py-8">
              No invitation groups found.
            </p>
          ) : (
            <Accordion>
              {groups.map((group) => (
                <AccordionItem key={group.id} value={group.id}>
                  <AccordionTrigger className="px-2">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <Users className="size-4 text-warm-gray shrink-0" />
                      <div className="flex flex-col items-start min-w-0">
                        <span className="font-medium text-charcoal">
                          {group.name}
                        </span>
                        <span className="text-xs text-warm-gray">
                          Code: {group.code}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 ml-auto mr-4">
                        <Badge variant="secondary" className="text-[10px]">
                          {group.guests.length} guest{group.guests.length !== 1 ? "s" : ""}
                        </Badge>
                        {group.plusOneAllowed && (
                          <Badge variant="outline" className="text-[10px] text-gold border-gold/30">
                            +1 allowed
                          </Badge>
                        )}
                        {group.invitedEvents.map((ie) => (
                          <Badge key={ie.id} variant="secondary" className="text-[10px]">
                            {ie.event.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-2">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>RSVP Status</TableHead>
                          <TableHead>Meal</TableHead>
                          <TableHead>Plus One</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {group.guests.map((guest) => {
                          const hasRsvp = guest.rsvps.length > 0;
                          const isAttending = guest.rsvps.some(
                            (r) => r.attending
                          );
                          const latestRsvp = guest.rsvps[0];

                          return (
                            <TableRow key={guest.id}>
                              <TableCell className="font-medium">
                                {guest.firstName} {guest.lastName}
                              </TableCell>
                              <TableCell className="text-warm-gray">
                                {guest.email || "--"}
                              </TableCell>
                              <TableCell>
                                {guest.isMainGuest ? (
                                  <Badge variant="default" className="text-[10px]">
                                    Primary
                                  </Badge>
                                ) : (
                                  <span className="text-xs text-warm-gray">
                                    Guest
                                  </span>
                                )}
                              </TableCell>
                              <TableCell>
                                {hasRsvp ? (
                                  isAttending ? (
                                    <Badge variant="default" className="bg-sage text-white text-[10px]">
                                      Attending
                                    </Badge>
                                  ) : (
                                    <Badge variant="secondary" className="bg-dusty-rose-light text-charcoal text-[10px]">
                                      Declined
                                    </Badge>
                                  )
                                ) : (
                                  <Badge variant="outline" className="text-gold text-[10px]">
                                    Pending
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-warm-gray text-xs">
                                {latestRsvp?.mealChoice || "--"}
                              </TableCell>
                              <TableCell className="text-warm-gray text-xs">
                                {latestRsvp?.plusOneName || "--"}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                    {group.notes && (
                      <p className="text-xs text-warm-gray mt-2 px-2 pb-2">
                        Notes: {group.notes}
                      </p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
