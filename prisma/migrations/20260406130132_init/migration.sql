-- CreateTable
CREATE TABLE "InvitationGroup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "maxGuests" INTEGER NOT NULL DEFAULT 2,
    "plusOneAllowed" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "isMainGuest" BOOLEAN NOT NULL DEFAULT false,
    "groupId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Guest_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "InvitationGroup" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT,
    "location" TEXT NOT NULL,
    "address" TEXT,
    "description" TEXT,
    "mapUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "InvitationEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "groupId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    CONSTRAINT "InvitationEvent_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "InvitationGroup" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "InvitationEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rsvp" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "guestId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "attending" BOOLEAN NOT NULL,
    "mealChoice" TEXT,
    "dietaryRestrictions" TEXT,
    "plusOneName" TEXT,
    "plusOneMealChoice" TEXT,
    "plusOneDietaryRestrictions" TEXT,
    "songRequest" TEXT,
    "notes" TEXT,
    "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Rsvp_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Rsvp_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "InvitationGroup_code_key" ON "InvitationGroup"("code");

-- CreateIndex
CREATE INDEX "Guest_groupId_idx" ON "Guest"("groupId");

-- CreateIndex
CREATE INDEX "Guest_lastName_firstName_idx" ON "Guest"("lastName", "firstName");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "InvitationEvent_groupId_eventId_key" ON "InvitationEvent"("groupId", "eventId");

-- CreateIndex
CREATE INDEX "Rsvp_eventId_idx" ON "Rsvp"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "Rsvp_guestId_eventId_key" ON "Rsvp"("guestId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");
