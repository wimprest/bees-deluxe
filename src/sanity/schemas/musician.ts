import { defineField, defineType } from "sanity";

export const musician = defineType({
  name: "musician",
  title: "Musician",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      description: 'e.g. "Guitar & Vocals", "Keyboards, Vocals & Harmonica"',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      description: "Plain text biography",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      description: "Manual sort order",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isCurrentMember",
      title: "Current Member",
      description: "true = Current Band, false = Special Guests & Friends",
      type: "boolean",
      initialValue: true,
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "photo",
    },
  },
});
