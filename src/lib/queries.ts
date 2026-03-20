import { groq } from "next-sanity";

export const upcomingShowsQuery = groq`
  *[_type == "show" && date >= now()] | order(date asc) [0...$limit]
`;

export const allShowsQuery = groq`
  *[_type == "show"] | order(date asc)
`;

export const allMusiciansQuery = groq`
  *[_type == "musician"] | order(isCurrentMember desc, order asc) {
    _id,
    name,
    role,
    bio,
    isCurrentMember,
    order,
    photo {
      asset -> {
        _id,
        url
      }
    }
  }
`;

export const allAlbumsQuery = groq`
  *[_type == "album"] | order(featured desc, order asc) {
    _id,
    title,
    slug,
    releaseYear,
    albumType,
    description,
    tracklist,
    credits,
    featured,
    order,
    coverImage {
      asset -> { _id, url }
    },
    buyLinks,
    pressQuotes
  }
`;

export const albumBySlugQuery = groq`
  *[_type == "album" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    releaseYear,
    albumType,
    description,
    tracklist,
    credits,
    featured,
    order,
    coverImage {
      asset -> { _id, url }
    },
    buyLinks,
    pressQuotes
  }
`;

export const allPressQuotesQuery = groq`
  *[_type == "pressQuote"] | order(order asc)
`;

export const allVideosQuery = groq`
  *[_type == "video"] | order(featured desc, order asc)
`;

export const allPhotosQuery = groq`
  *[_type == "photo"] | order(order asc) {
    _id,
    caption,
    credit,
    order,
    featured,
    image {
      asset -> { _id, url }
    }
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]
`;
