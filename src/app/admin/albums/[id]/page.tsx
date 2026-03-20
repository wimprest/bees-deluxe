import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";
import { AlbumForm } from "../AlbumForm";

export const dynamic = "force-dynamic";

export default async function EditAlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const album = await client.fetch(groq`*[_type == "album" && _id == $id][0]`, { id });
  if (!album) notFound();

  return (
    <div>
      <Link href="/admin/albums" className="text-sm text-brand-teal hover:text-brand-teal-light">← Back to Albums</Link>
      <h1 className="mt-4 font-heading text-2xl text-brand-white">Admin — Edit Album</h1>
      <div className="mt-6"><AlbumForm album={album} /></div>
    </div>
  );
}
