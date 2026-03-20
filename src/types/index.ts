// Re-export Sanity generated types
export type {
  Show,
  Musician,
  Album,
  PressQuote,
  Video,
  Photo,
  SiteSettings,
} from "../../sanity.types";

// UI-specific types
export interface CalendarLinkOptions {
  title: string;
  date: string; // ISO datetime
  location: string; // venue name + address
  notes?: string;
}
