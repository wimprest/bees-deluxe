import Link from "next/link";
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";

const pressAdmin = groq`*[_type == "pressQuote"] | order(order asc) { _id, quote, attribution, order }`;
export const dynamic = "force-dynamic";

export default async function AdminPressPage() {
  const quotes = await client.fetch(pressAdmin);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl text-brand-white">Admin — Press Quotes</h1>
        <Link href="/admin/press/new" className="bg-brand-teal px-6 py-2 font-heading text-sm uppercase tracking-widest text-brand-black hover:bg-brand-teal-dark">Add Quote</Link>
      </div>
      <div className="mt-6 space-y-1">
        {quotes.map((q: { _id: string; quote: string; attribution: string; order: number }, i: number) => (
          <div key={q._id} className="flex items-center justify-between border-b border-brand-teal/10 py-3">
            <p className="text-sm text-brand-white">
              <span className="mr-2 text-brand-muted">{i + 1}.</span>
              {q.quote?.substring(0, 60)}... <span className="text-brand-muted">— {q.attribution}</span>
            </p>
            <Link href={`/admin/press/${q._id}`} className="text-xs text-brand-teal hover:text-brand-teal-light">Edit</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
