import Link from "next/link";
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";
import { AdminShowsList } from "./AdminShowsList";

const allShowsAdmin = groq`
  *[_type == "show"] | order(date desc) {
    _id, date, venueName, city, state
  }
`;

export const dynamic = "force-dynamic";

export default async function AdminShowsPage() {
  const shows = await client.fetch(allShowsAdmin);

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

      <AdminShowsList shows={shows} />
    </div>
  );
}
