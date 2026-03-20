import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";
import { MusicianForm } from "../MusicianForm";

export const dynamic = "force-dynamic";

export default async function EditMusicianPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const musician = await client.fetch(groq`*[_type == "musician" && _id == $id][0]`, { id });
  if (!musician) notFound();

  return (
    <div>
      <Link href="/admin/musicians" className="text-sm text-brand-teal hover:text-brand-teal-light">← Back to Musicians</Link>
      <h1 className="mt-4 font-heading text-2xl text-brand-white">Admin — Edit Musician</h1>
      <div className="mt-6"><MusicianForm musician={musician} /></div>
    </div>
  );
}
