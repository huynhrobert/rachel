export type RsvpEvent = {
  id: string;
  name: string;
  slug: string;
  date: string;
  startTime: string;
  endTime: string | null;
  location: string;
  address: string | null;
  description: string | null;
  mapUrl: string | null;
  sortOrder: number;
};

export type RsvpGuest = {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  isMainGuest: boolean;
};

export type ExistingRsvp = {
  id: string;
  guestId: string;
  eventId: string;
  attending: boolean;
  mealChoice: string | null;
  dietaryRestrictions: string | null;
  plusOneName: string | null;
  plusOneMealChoice: string | null;
  plusOneDietaryRestrictions: string | null;
  songRequest: string | null;
  notes: string | null;
};

export type RsvpGroupData = {
  id: string;
  code: string;
  name: string;
  maxGuests: number;
  plusOneAllowed: boolean;
  guests: RsvpGuest[];
  events: RsvpEvent[];
  existingRsvps: ExistingRsvp[];
};
