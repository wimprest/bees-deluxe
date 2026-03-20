import Link from "next/link";
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";

const albumsAdmin = groq`*[_type == "album"] | order(order asc) { _id, title, releaseYear, albumType, order, featured }`;

export const dynamic = "force-dynamic";

export default async function AdminAlbumsPage() {
  const albums = await client.fetch(albumsAdmin);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl text-brand-white">Admin — Albums</h1>
        <Link href="/admin/albums/new" className="bg-brand-teal px-6 py-2 font-heading text-sm uppercase tracking-widest text-brand-black hover:bg-brand-teal-dark">
          Add Album
        </Link>
      </div>
      <div className="mt-6 space-y-1">
        {albums.map((album: { _id: string; title: string; releaseYear: number; albumType: string; featured: boolean }) => (
          <div key={album._id} className="flex items-center justify-between border-b border-brand-teal/10 py-3">
            <div>
              <p className="text-sm text-brand-white">
                {album.title} ({album.releaseYear}) {album.featured && <span className="text-brand-teal">★</span>}
              </p>
              <p className="text-xs text-brand-muted">{album.albumType}</p>
            </div>
            <Link href={`/admin/albums/${album._id}`} className="text-xs text-brand-teal hover:text-brand-teal-light">Edit</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
