import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.rsvp.deleteMany();
  await prisma.invitationEvent.deleteMany();
  await prisma.guest.deleteMany();
  await prisma.event.deleteMany();
  await prisma.invitationGroup.deleteMany();
  await prisma.adminUser.deleteMany();

  // Create admin user
  await prisma.adminUser.create({
    data: {
      email: "admin@rachelandloren.com",
      passwordHash: hashSync("admin123", 10),
      name: "Admin",
    },
  });

  // Create events — Dallas, May 2027
  const ceremony = await prisma.event.create({
    data: {
      name: "Wedding Ceremony",
      slug: "ceremony",
      date: new Date("2027-05-15T16:00:00"),
      startTime: "4:00 PM",
      endTime: "5:00 PM",
      location: "The Venue at Placeholder Estate",
      address: "1234 Placeholder Blvd, Dallas, TX 75201",
      description: "Join us as we say our vows surrounded by family and friends.",
      mapUrl: "https://maps.google.com/?q=Dallas+TX",
      sortOrder: 1,
    },
  });

  const cocktailHour = await prisma.event.create({
    data: {
      name: "Cocktail Hour",
      slug: "cocktails",
      date: new Date("2027-05-15T17:00:00"),
      startTime: "5:00 PM",
      endTime: "6:00 PM",
      location: "The Terrace",
      address: "1234 Placeholder Blvd, Dallas, TX 75201",
      description: "Enjoy drinks and hors d'oeuvres while we steal a few moments for photos.",
      sortOrder: 2,
    },
  });

  const reception = await prisma.event.create({
    data: {
      name: "Reception & Dinner",
      slug: "reception",
      date: new Date("2027-05-15T18:00:00"),
      startTime: "6:00 PM",
      endTime: "11:00 PM",
      location: "The Grand Ballroom",
      address: "1234 Placeholder Blvd, Dallas, TX 75201",
      description: "Dinner, dancing, and celebration!",
      sortOrder: 3,
    },
  });

  const welcomeDrinks = await prisma.event.create({
    data: {
      name: "Welcome Drinks",
      slug: "welcome-drinks",
      date: new Date("2027-05-14T19:00:00"),
      startTime: "7:00 PM",
      endTime: "10:00 PM",
      location: "The Venue Bar",
      address: "1234 Placeholder Blvd, Dallas, TX 75201",
      description: "A casual evening to kick off the wedding weekend.",
      sortOrder: 0,
    },
  });

  const teaCeremony = await prisma.event.create({
    data: {
      name: "Tea Ceremony",
      slug: "tea-ceremony",
      date: new Date("2027-05-15T10:00:00"),
      startTime: "10:00 AM",
      endTime: "11:30 AM",
      location: "The Garden Pavilion",
      address: "1234 Placeholder Blvd, Dallas, TX 75201",
      description: "A traditional tea ceremony honoring our families.",
      sortOrder: 0,
    },
  });

  const allEvents = [welcomeDrinks, teaCeremony, ceremony, cocktailHour, reception];
  const mainEvents = [ceremony, cocktailHour, reception];

  // Helper to create a group with guests and event invitations
  async function createGroup(
    code: string,
    name: string,
    guests: { firstName: string; lastName: string; isMainGuest?: boolean; email?: string }[],
    events: typeof allEvents,
    plusOneAllowed: boolean = false
  ) {
    const group = await prisma.invitationGroup.create({
      data: {
        code,
        name,
        maxGuests: guests.length + (plusOneAllowed ? 1 : 0),
        plusOneAllowed,
      },
    });

    for (const guest of guests) {
      await prisma.guest.create({
        data: {
          firstName: guest.firstName,
          lastName: guest.lastName,
          email: guest.email,
          isMainGuest: guest.isMainGuest ?? false,
          groupId: group.id,
        },
      });
    }

    for (const event of events) {
      await prisma.invitationEvent.create({
        data: {
          groupId: group.id,
          eventId: event.id,
        },
      });
    }

    return group;
  }

  // Create invitation groups with varied configurations
  await createGroup(
    "NGUYEN2027",
    "The Nguyen Family",
    [
      { firstName: "David", lastName: "Nguyen", isMainGuest: true, email: "david@example.com" },
      { firstName: "Lisa", lastName: "Nguyen" },
      { firstName: "Emily", lastName: "Nguyen" },
    ],
    allEvents
  );

  await createGroup(
    "CHEN2027",
    "The Chen Family",
    [
      { firstName: "Michael", lastName: "Chen", isMainGuest: true, email: "michael@example.com" },
      { firstName: "Sarah", lastName: "Chen" },
    ],
    allEvents
  );

  await createGroup(
    "SMITH2027",
    "James Smith",
    [{ firstName: "James", lastName: "Smith", isMainGuest: true, email: "james@example.com" }],
    mainEvents,
    true // plus one allowed
  );

  await createGroup(
    "JOHNSON2027",
    "The Johnson Family",
    [
      { firstName: "Robert", lastName: "Johnson", isMainGuest: true, email: "robert@example.com" },
      { firstName: "Maria", lastName: "Johnson" },
      { firstName: "Alex", lastName: "Johnson" },
      { firstName: "Sophie", lastName: "Johnson" },
    ],
    mainEvents
  );

  await createGroup(
    "WILLIAMS2027",
    "Emma Williams",
    [{ firstName: "Emma", lastName: "Williams", isMainGuest: true, email: "emma@example.com" }],
    mainEvents,
    true
  );

  await createGroup(
    "GARCIA2027",
    "The Garcia Family",
    [
      { firstName: "Carlos", lastName: "Garcia", isMainGuest: true, email: "carlos@example.com" },
      { firstName: "Ana", lastName: "Garcia" },
    ],
    allEvents
  );

  await createGroup(
    "PATEL2027",
    "Priya Patel",
    [{ firstName: "Priya", lastName: "Patel", isMainGuest: true, email: "priya@example.com" }],
    mainEvents,
    true
  );

  await createGroup(
    "KIM2027",
    "The Kim Family",
    [
      { firstName: "Daniel", lastName: "Kim", isMainGuest: true, email: "daniel@example.com" },
      { firstName: "Grace", lastName: "Kim" },
    ],
    allEvents
  );

  await createGroup(
    "TAYLOR2027",
    "Olivia Taylor",
    [{ firstName: "Olivia", lastName: "Taylor", isMainGuest: true, email: "olivia@example.com" }],
    [ceremony, reception],
    false
  );

  await createGroup(
    "BROWN2027",
    "The Brown Family",
    [
      { firstName: "William", lastName: "Brown", isMainGuest: true, email: "william@example.com" },
      { firstName: "Jennifer", lastName: "Brown" },
      { firstName: "Ethan", lastName: "Brown" },
    ],
    mainEvents
  );

  await createGroup(
    "LEE2027",
    "Kevin Lee",
    [{ firstName: "Kevin", lastName: "Lee", isMainGuest: true, email: "kevin@example.com" }],
    allEvents,
    true
  );

  await createGroup(
    "MARTINEZ2027",
    "The Martinez Family",
    [
      { firstName: "Diego", lastName: "Martinez", isMainGuest: true, email: "diego@example.com" },
      { firstName: "Isabella", lastName: "Martinez" },
    ],
    mainEvents
  );

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
