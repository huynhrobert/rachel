"use client";

import { motion } from "motion/react";
import { Check, PartyPopper, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { RsvpGroupData } from "./types";

export function RsvpConfirmation({
  groupData,
  onEdit,
}: {
  groupData: RsvpGroupData;
  onEdit: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white text-center">
        <CardContent className="pt-10 pb-10 space-y-6">
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center"
          >
            <Check className="h-8 w-8 text-sage" />
          </motion.div>

          <div>
            <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-2">
              Thank You!
            </h3>
            <p className="text-warm-gray max-w-md mx-auto">
              Your RSVP has been received. We&apos;re so excited to celebrate
              with you, {groupData.name}!
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 text-gold"
          >
            <PartyPopper className="h-5 w-5" />
            <span className="text-sm font-medium">See you at the wedding!</span>
            <PartyPopper className="h-5 w-5" />
          </motion.div>

          {/* Summary */}
          <div className="bg-cream/50 rounded-lg p-4 text-sm text-left max-w-sm mx-auto space-y-1">
            <p className="font-medium text-charcoal mb-2">Your party:</p>
            {groupData.guests.map((guest) => (
              <p key={guest.id} className="text-warm-gray">
                {guest.firstName} {guest.lastName}
              </p>
            ))}
            <p className="font-medium text-charcoal mt-3 mb-2">Events:</p>
            {[...groupData.events]
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((event) => (
                <p key={event.id} className="text-warm-gray">
                  {event.name} &middot; {event.startTime}
                </p>
              ))}
          </div>

          {/* Edit button */}
          <Button
            variant="outline"
            onClick={onEdit}
            className="text-warm-gray"
          >
            <Pencil className="h-3.5 w-3.5 mr-1.5" />
            Edit your response
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
