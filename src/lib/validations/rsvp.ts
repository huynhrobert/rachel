import { z } from "zod";

export const lookupSchema = z
  .object({
    q: z.string().min(2, "Please enter at least 2 characters").optional(),
    code: z.string().min(3, "Please enter a valid invitation code").optional(),
  })
  .refine((data) => data.q || data.code, {
    message: "Please provide a name or invitation code",
  });

export const rsvpResponseSchema = z.object({
  guestId: z.string().min(1),
  eventId: z.string().min(1),
  attending: z.boolean(),
  mealChoice: z.string().optional(),
  dietaryRestrictions: z.string().optional(),
  plusOneName: z.string().optional(),
  plusOneMealChoice: z.string().optional(),
  plusOneDietaryRestrictions: z.string().optional(),
  songRequest: z.string().optional(),
  notes: z.string().optional(),
});

export const rsvpSubmitSchema = z.object({
  groupId: z.string().min(1),
  responses: z.array(rsvpResponseSchema).min(1, "At least one response is required"),
});

export type LookupInput = z.infer<typeof lookupSchema>;
export type RsvpResponse = z.infer<typeof rsvpResponseSchema>;
export type RsvpSubmitInput = z.infer<typeof rsvpSubmitSchema>;
