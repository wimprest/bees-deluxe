import Link from "next/link";
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";

const countsQuery = groq`{
  "shows": count(*[_type == "show" && date >= now()]),
  "albums": count(*[_type == "album"]),
  "musicians": count(*[_type == "musician"]),
  "press": count(*[_type == "pressQuote"]),
  "photos": count(*[_type == "photo"]),
  "videos": count(*[_type == "video"])
}`;

const upcomingShowsQuery = groq`
  *[_type == "show" && date >= now()] | order(date asc) [0...3] {
    _id, date, venueName, city, state
  }
`;

interface Counts {
  shows: number;
  albums: number;
  musicians: number;
  press: number;
  photos: number;
  videos: number;
}

const sections = [
  { key: "shows", label: "Upcoming Shows", href: "/admin/shows" },
  { key: "albums", label: "Albums", href: "/admin/albums" },
  { key: "musicians", label: "Musicians", href: "/admin/musicians" },
  { key: "press", label: "Press Quotes", href: "/admin/press" },
  { key: "photos", label: "Photos", href: "/admin/photos" },
  { key: "videos", label: "Videos", href: "/admin/videos" },
] as const;

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let counts: Counts = { shows: 0, albums: 0, musicians: 0, press: 0, photos: 0, videos: 0 };
  let upcomingShows: { _id: string; date: string; venueName: string; city: string; state: string }[] = [];

  try {
    [counts, upcomingShows] = await Promise.all([
      client.fetch(countsQuery),
      client.fetch(upcomingShowsQuery),
    ]);
  } catch {
    // Sanity unavailable
  }

  return (
    <div>
      <h1 className="font-heading text-2xl text-brand-white">
        Admin — Dashboard
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link
            key={section.key}
            href={section.href}
            className="border border-brand-teal/10 bg-brand-charcoal p-6 transition-colors hover:border-brand-teal/30"
          >
            <p className="text-xs uppercase tracking-widest text-brand-muted">
              {section.label}
            </p>
            <p className="mt-2 font-heading text-3xl text-brand-teal">
              {counts[section.key]}
            </p>
            <p className="mt-2 text-sm text-brand-teal">Manage →</p>
          </Link>
        ))}
      </div>

      {/* Quick upcoming shows reference */}
      {upcomingShows.length > 0 && (
        <div className="mt-8 border border-brand-teal/10 bg-brand-charcoal p-6">
          <p className="text-xs uppercase tracking-widest text-brand-muted">
            Next Up
          </p>
          <div className="mt-3 space-y-2">
            {upcomingShows.map((show) => (
              <p key={show._id} className="text-sm text-brand-white">
                <span className="text-brand-teal">
                  {new Date(show.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>{" "}
                — {show.venueName}, {show.city}, {show.state}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
