"use client";

import { useRouter } from "next/navigation";
import { AdminFormField } from "@/components/admin/AdminFormField";
import { createAlbum, updateAlbum } from "./actions";

interface AlbumFormProps {
  album?: { _id: string; title?: string; releaseYear?: number; albumType?: string; description?: string; credits?: string; featured?: boolean; order?: number };
}

export function AlbumForm({ album }: AlbumFormProps) {
  const router = useRouter();
  const isEdit = !!album;

  async function handleSubmit(formData: FormData) {
    if (isEdit) await updateAlbum(album!._id, formData);
    else await createAlbum(formData);
    router.push("/admin/albums");
  }

  return (
    <form action={handleSubmit} className="max-w-xl space-y-4">
      <AdminFormField label="Title" name="title" defaultValue={album?.title} required />
      <div className="grid grid-cols-2 gap-4">
        <AdminFormField label="Release Year" name="releaseYear" type="number" defaultValue={String(album?.releaseYear ?? "")} required />
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-brand-muted">Album Type <span className="text-brand-red">*</span></label>
          <select name="albumType" defaultValue={album?.albumType ?? "album"} className="w-full rounded-none border border-brand-teal/20 bg-brand-slate px-4 py-3 text-brand-white focus:border-brand-teal focus:outline-none">
            <option value="album">Album</option>
            <option value="ep">EP</option>
            <option value="single">Single</option>
          </select>
        </div>
      </div>
      <AdminFormField label="Order" name="order" type="number" defaultValue={String(album?.order ?? "")} helper="Lower = first in filmstrip" />
      <div className="flex items-center gap-2">
        <input type="checkbox" id="featured" name="featured" defaultChecked={album?.featured} className="accent-brand-teal" />
        <label htmlFor="featured" className="text-sm text-brand-white">Featured</label>
      </div>
      <AdminFormField label="Description" name="description" type="textarea" defaultValue={album?.description} rows={4} />
      <AdminFormField label="Credits" name="credits" type="textarea" defaultValue={album?.credits} rows={6} />
      <button type="submit" className="bg-brand-teal px-8 py-3 font-heading uppercase tracking-widest text-brand-black hover:bg-brand-teal-dark">
        {isEdit ? "Update Album" : "Create Album"}
      </button>
    </form>
  );
}
