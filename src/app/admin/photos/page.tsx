import Link from "next/link";
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";

const photosAdmin = groq`*[_type == "photo"] | order(order asc) { _id, caption, order, image { asset -> { url } } }`;
export const dynamic = "force-dynamic";

export default async function AdminPhotosPage() {
  const photos = await client.fetch(photosAdmin);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl text-brand-white">Admin — Photos</h1>
        <Link href="/admin/photos/new" className="bg-brand-teal px-6 py-2 font-heading text-sm uppercase tracking-widest text-brand-black hover:bg-brand-teal-dark">Upload Photo</Link>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
        {photos.map((photo: { _id: string; caption?: string; order: number; image?: { asset?: { url: string } } }, i: number) => (
          <div key={photo._id} className="border border-brand-teal/10">
            <div className="aspect-square bg-brand-charcoal">
              {photo.image?.asset?.url ? (
                <img src={photo.image.asset.url} alt={photo.caption ?? ""} className="h-full w-full object-cover" />
              ) : (
                <img src={`/images/photos/photo-${String(photo.order ?? i + 1).padStart(2, "0")}.jpg`} alt={photo.caption ?? ""} className="h-full w-full object-cover" />
              )}
            </div>
            <p className="truncate px-2 py-1 text-xs text-brand-muted">{photo.caption || `Photo ${photo.order}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
