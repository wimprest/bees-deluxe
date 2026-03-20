import { defineField, defineType } from "sanity";

export const show = defineType({
  name: "show",
  title: "Show",
  type: "document",
  fields: [
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "venueName",
      title: "Venue Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "venueAddress",
      title: "Venue Address",
      description: "Full address string for Google Maps URL",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "state",
      title: "State",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "startTime",
      title: "Start Time",
      description: 'Display string e.g. "8:00 PM"',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      description: 'Digits only, displayed as "Call for Reservations"',
      type: "string",
    }),
    defineField({
      name: "notes",
      title: "Notes",
      description: 'e.g. "Supporting as special guest", "No cover"',
      type: "string",
    }),
    defineField({
      name: "ticketUrl",
      title: "Ticket URL",
      type: "url",
    }),
  ],
  orderings: [
    {
      title: "Date",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "venueName",
      subtitle: "date",
    },
  },
});
