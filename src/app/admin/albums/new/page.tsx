import Link from "next/link";
import { AlbumForm } from "../AlbumForm";

export default function NewAlbumPage() {
  return (
    <div>
      <Link href="/admin/albums" className="text-sm text-brand-teal hover:text-brand-teal-light">← Back to Albums</Link>
      <h1 className="mt-4 font-heading text-2xl text-brand-white">Admin — New Album</h1>
      <div className="mt-6"><AlbumForm /></div>
    </div>
  );
}
