import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";
import { VideoForm } from "../VideoForm";

export const dynamic = "force-dynamic";

export default async function EditVideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const video = await client.fetch(groq`*[_type == "video" && _id == $id][0]`, { id });
  if (!video) notFound();

  return (
    <div>
      <Link href="/admin/videos" className="text-sm text-brand-teal hover:text-brand-teal-light">← Back to Videos</Link>
      <h1 className="mt-4 font-heading text-2xl text-brand-white">Admin — Edit Video</h1>
      <div className="mt-6"><VideoForm video={video} /></div>
    </div>
  );
}
