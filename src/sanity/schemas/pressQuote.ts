import { defineField, defineType } from "sanity";

export const pressQuote = defineType({
  name: "pressQuote",
  title: "Press Quote",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "attribution",
      title: "Attribution",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publication",
      title: "Publication",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publicationUrl",
      title: "Publication URL",
      type: "url",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
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
      title: "publication",
      subtitle: "attribution",
    },
  },
});
