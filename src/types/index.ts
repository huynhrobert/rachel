export type NavLink = {
  label: string;
  href: string;
};

export type StoryChapter = {
  date: string;
  title: string;
  description: string;
  image: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type HotelInfo = {
  name: string;
  description: string;
  address: string;
  bookingUrl?: string;
  blockCode?: string;
  priceRange?: string;
  distanceToVenue?: string;
};

export type TransportOption = {
  name: string;
  description: string;
  icon?: string;
};

export type RegistryEntry = {
  name: string;
  url: string;
  description?: string;
};

export type GalleryPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type MealOption = {
  value: string;
  label: string;
};
