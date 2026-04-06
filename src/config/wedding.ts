export const weddingConfig = {
  couple: {
    person1: { name: "Rachel", fullName: "Rachel Huynh" },
    person2: { name: "Loren", fullName: "Loren Mitchell" },
  },
  date: new Date("2027-05-15T16:00:00"),
  displayDate: "May 15, 2027",
  venue: {
    name: "The Venue at Placeholder Estate",
    city: "Dallas, Texas",
    address: "1234 Placeholder Blvd, Dallas, TX 75201",
    mapUrl: "https://maps.google.com/?q=Dallas+TX",
  },
  welcomeNote:
    "With joyful hearts, we invite you to celebrate the beginning of our forever. Your presence would mean the world to us as we say 'I do' surrounded by the people we love most.",
  rsvpDeadline: new Date("2027-03-15"),
  rsvpDeadlineDisplay: "March 15, 2027",
  hashtag: "#RachelandLoren2027",
  sitePassword: "rachelandloren",
  hero: {
    image: "/images/hero/main.jpg",
    mobileImage: "/images/hero/main-mobile.jpg",
  },
  mealOptions: [
    { value: "beef", label: "Filet Mignon" },
    { value: "fish", label: "Pan-Seared Salmon" },
    { value: "vegetarian", label: "Wild Mushroom Risotto" },
    { value: "vegan", label: "Roasted Vegetable Tower" },
  ],
} as const;
