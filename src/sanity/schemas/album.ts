import { defineField, defineType } from "sanity";

export const album = defineType({
  name: "album",
  title: "Album",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "releaseYear",
      title: "Release Year",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "albumType",
      title: "Album Type",
      type: "string",
      options: {
        list: [
          { title: "Album", value: "album" },
          { title: "EP", value: "ep" },
          { title: "Single", value: "single" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "Band-written description",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tracklist",
      title: "Tracklist",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "trackNumber",
              title: "Track Number",
              type: "number",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              trackNumber: "trackNumber",
              title: "title",
            },
            prepare({ trackNumber, title }) {
              return { title: `${trackNumber}. ${title}` };
            },
          },
        },
      ],
    }),
    defineField({
      name: "credits",
      title: "Credits",
      description: "Production credits block",
      type: "text",
    }),
    defineField({
      name: "buyLinks",
      title: "Buy Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  "Spotify",
                  "Apple Music",
                  "iTunes",
                  "Amazon",
                  "Bandcamp",
                  "PayPal CD",
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
          },
        },
      ],
    }),
    defineField({
      name: "pressQuotes",
      title: "Press Quotes",
      type: "array",
      of: [
        {
          type: "object",
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
              description: "Reviewer name",
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
          ],
          preview: {
            select: { title: "publication", subtitle: "attribution" },
          },
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Order",
      description: "Controls filmstrip position; lower = featured/first",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      description: "Pins to front of filmstrip",
      type: "boolean",
      initialValue: false,
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
      title: "title",
      subtitle: "releaseYear",
      media: "coverImage",
    },
  },
});
