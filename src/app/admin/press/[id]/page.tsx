import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";
import { PressForm } from "../PressForm";

export const dynamic = "force-dynamic";

export default async function EditPressPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quote = await client.fetch(groq`*[_type == "pressQuote" && _id == $id][0]`, { id });
  if (!quote) notFound();

  return (
    <div>
      <Link href="/admin/press" className="text-sm text-brand-teal hover:text-brand-teal-light">← Back to Press</Link>
      <h1 className="mt-4 font-heading text-2xl text-brand-white">Admin — Edit Press Quote</h1>
      <div className="mt-6"><PressForm quote={quote} /></div>
    </div>
  );
}
