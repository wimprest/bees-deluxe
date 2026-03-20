import Link from "next/link";
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";

const musiciansAdmin = groq`*[_type == "musician"] | order(isCurrentMember desc, order asc) { _id, name, role, isCurrentMember, order }`;
export const dynamic = "force-dynamic";

export default async function AdminMusiciansPage() {
  const musicians = await client.fetch(musiciansAdmin);
  const current = musicians.filter((m: { isCurrentMember: boolean }) => m.isCurrentMember);
  const guests = musicians.filter((m: { isCurrentMember: boolean }) => !m.isCurrentMember);

  function renderList(items: { _id: string; name: string; role: string }[]) {
    return items.map((m) => (
      <div key={m._id} className="flex items-center justify-between border-b border-brand-teal/10 py-3">
        <p className="text-sm text-brand-white">{m.name} <span className="text-brand-muted">— {m.role}</span></p>
        <Link href={`/admin/musicians/${m._id}`} className="text-xs text-brand-teal hover:text-brand-teal-light">Edit</Link>
      </div>
    ));
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl text-brand-white">Admin — Musicians</h1>
        <Link href="/admin/musicians/new" className="bg-brand-teal px-6 py-2 font-heading text-sm uppercase tracking-widest text-brand-black hover:bg-brand-teal-dark">Add Musician</Link>
      </div>
      <h2 className="mt-6 text-xs uppercase tracking-widest text-brand-teal">Current Band</h2>
      <div className="mt-2">{renderList(current)}</div>
      <h2 className="mt-8 text-xs uppercase tracking-widest text-brand-teal">Special Guests & Friends</h2>
      <div className="mt-2">{renderList(guests)}</div>
    </div>
  );
}
