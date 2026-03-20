import Link from "next/link";
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";
import { DeleteShowButton } from "./DeleteShowButton";

const allShowsAdmin = groq`
  *[_type == "show"] | order(date desc) {
    _id, date, venueName, city, state
  }
`;

export const dynamic = "force-dynamic";

export default async function AdminShowsPage() {
  const shows = await client.fetch(allShowsAdmin);
  const now = new Date();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl text-brand-white">
          Admin — Shows
        </h1>
        <Link
          href="/admin/shows/new"
          className="bg-brand-teal px-6 py-2 font-heading text-sm uppercase tracking-widest text-brand-black transition-colors hover:bg-brand-teal-dark"
        >
          Add New Show
        </Link>
      </div>

      <div className="mt-6 space-y-1">
        {shows.map(
          (show: {
            _id: string;
            date: string;
            venueName: string;
            city: string;
            state: string;
          }) => {
            const isPast = new Date(show.date) < now;
            return (
              <div
                key={show._id}
                className={`flex items-center justify-between border-b border-brand-teal/10 py-3 ${
                  isPast ? "opacity-40" : ""
                }`}
              >
                <div>
                  <p className="text-sm text-brand-white">
                    {new Date(show.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                    {" — "}
                    {show.venueName}, {show.city}, {show.state}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/admin/shows/${show._id}`}
                    className="text-xs text-brand-teal hover:text-brand-teal-light"
                  >
                    Edit
                  </Link>
                  <DeleteShowButton id={show._id} />
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
