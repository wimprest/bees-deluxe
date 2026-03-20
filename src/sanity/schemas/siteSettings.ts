import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroQuote",
      title: "Hero Quote",
      description: "Main tagline displayed on the homepage",
      type: "string",
    }),
    defineField({
      name: "heroQuoteAttribution",
      title: "Hero Quote Attribution",
      type: "string",
    }),
    defineField({
      name: "bookingAgentName",
      title: "Booking Agent Name",
      type: "string",
    }),
    defineField({
      name: "bookingAgentEmail",
      title: "Booking Agent Email",
      type: "string",
    }),
    defineField({
      name: "bookingAgentPhone",
      title: "Booking Agent Phone",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
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
                  "YouTube",
                  "Facebook",
                  "Instagram",
                  "SoundCloud",
                  "Twitter",
                  "TikTok",
                  "Spotify",
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
      name: "spotifyEmbedUrl",
      title: "Spotify Embed URL",
      description: "Full Spotify embed URL for homepage player",
      type: "url",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
