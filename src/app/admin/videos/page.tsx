import Link from "next/link";
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";

const videosAdmin = groq`*[_type == "video"] | order(featured desc, order asc) { _id, title, youtubeId, featured, order }`;
export const dynamic = "force-dynamic";

export default async function AdminVideosPage() {
  const videos = await client.fetch(videosAdmin);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl text-brand-white">Admin — Videos</h1>
        <Link href="/admin/videos/new" className="bg-brand-teal px-6 py-2 font-heading text-sm uppercase tracking-widest text-brand-black hover:bg-brand-teal-dark">Add Video</Link>
      </div>
      <div className="mt-6 space-y-1">
        {videos.map((v: { _id: string; title: string; youtubeId: string; featured: boolean }) => (
          <div key={v._id} className="flex items-center justify-between border-b border-brand-teal/10 py-3">
            <div className="flex items-center gap-3">
              <img src={`https://img.youtube.com/vi/${v.youtubeId}/default.jpg`} alt="" className="h-10 w-14 object-cover" />
              <p className="text-sm text-brand-white">{v.title} {v.featured && <span className="text-brand-teal">★</span>}</p>
            </div>
            <Link href={`/admin/videos/${v._id}`} className="text-xs text-brand-teal hover:text-brand-teal-light">Edit</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
