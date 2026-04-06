import type { HotelInfo, TransportOption } from "@/types";

export const airportInfo = {
  name: "Dallas/Fort Worth International Airport",
  code: "DFW",
  distance: "Approximately 20 miles from the venue",
  driveTime: "About 30 minutes",
};

export const hotels: HotelInfo[] = [
  {
    name: "Hotel Placeholder 1",
    description:
      "Our top recommendation. Beautiful property just minutes from the venue.",
    address: "1000 Main Street, Dallas, TX 75201",
    bookingUrl: "https://example.com/hotel-1",
    blockCode: "HUYNH-MITCHELL2027",
    priceRange: "$200 - $300/night",
    distanceToVenue: "5 minutes",
  },
  {
    name: "Hotel Placeholder 2",
    description:
      "Charming boutique hotel in the heart of downtown Dallas.",
    address: "2000 Elm Street, Dallas, TX 75201",
    bookingUrl: "https://example.com/hotel-2",
    blockCode: "RL-WEDDING",
    priceRange: "$250 - $400/night",
    distanceToVenue: "10 minutes",
  },
  {
    name: "Hotel Placeholder 3",
    description:
      "A comfortable and budget-friendly option with great amenities.",
    address: "3000 Commerce Street, Dallas, TX 75201",
    bookingUrl: "https://example.com/hotel-3",
    priceRange: "$120 - $180/night",
    distanceToVenue: "15 minutes",
  },
];

export const transportOptions: TransportOption[] = [
  {
    name: "Shuttle Service",
    description:
      "We will provide complimentary shuttle service between Hotel Placeholder 1 and the venue on the wedding day. Shuttles depart at 3:15 PM for the ceremony and run continuously from 9:00 PM - 11:30 PM after the reception.",
  },
  {
    name: "Rideshare",
    description:
      "Uber and Lyft are widely available in Dallas. Expect a quick pickup and a 10-15 minute ride from downtown.",
  },
  {
    name: "Rental Car",
    description:
      "If you're planning to explore Dallas during your stay, a rental car is easy to pick up at DFW Airport.",
  },
  {
    name: "Valet Parking",
    description:
      "Complimentary valet parking is available at the venue. Self-parking is also available in the adjacent lot.",
  },
];

export const localRecommendations = {
  restaurants: [
    { name: "Pecan Lodge", description: "Legendary Texas BBQ — arrive early for the best brisket in town" },
    { name: "Uchi Dallas", description: "Upscale Japanese farmhouse dining with incredible sushi" },
    { name: "The Mansion Restaurant", description: "Fine dining in the historic Turtle Creek neighborhood" },
    { name: "Meso Maya", description: "Vibrant, modern Mexican with fantastic margaritas" },
  ],
  activities: [
    { name: "Dallas Arboretum", description: "66 acres of gorgeous gardens — especially beautiful in spring" },
    { name: "The Sixth Floor Museum", description: "Fascinating historical museum at Dealey Plaza" },
    { name: "Bishop Arts District", description: "Walkable neighborhood full of boutiques, galleries, and cafes" },
    { name: "Klyde Warren Park", description: "Urban park over a freeway with food trucks and activities" },
  ],
};
