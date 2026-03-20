"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminFormField } from "@/components/admin/AdminFormField";
import { ImagePickerUpload } from "@/components/admin/ImagePickerUpload";
import { createMusician, updateMusician, deleteMusician } from "./actions";

interface MusicianFormProps {
  musician?: {
    _id: string;
    name?: string;
    role?: string;
    bio?: string;
    isCurrentMember?: boolean;
    order?: number;
    photoUrl?: string;
  };
}

export function MusicianForm({ musician }: MusicianFormProps) {
  const router = useRouter();
  const isEdit = !!musician;
  const [photoUrl, setPhotoUrl] = useState(musician?.photoUrl ?? "");

  async function handleSubmit(formData: FormData) {
    formData.set("photoUrl", photoUrl);
    if (isEdit) await updateMusician(musician!._id, formData);
    else await createMusician(formData);
    router.push("/admin/musicians");
  }

  const slug = (musician?.name ?? "unsorted")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <form action={handleSubmit} className="max-w-xl space-y-4">
      <AdminFormField label="Name" name="name" defaultValue={musician?.name} required />
      <AdminFormField label="Role" name="role" defaultValue={musician?.role} placeholder='e.g. "Guitar & Vocals"' required />

      {/* Photo upload */}
      <div>
        <label className="mb-1 block text-xs uppercase tracking-wide text-brand-muted">
          Photo
        </label>
        <ImagePickerUpload
          currentUrl={photoUrl || undefined}
          folder={`bees-deluxe/musicians/${slug}`}
          onSelect={(url) => setPhotoUrl(url)}
          onRemove={() => setPhotoUrl("")}
        />
      </div>

      <AdminFormField label="Bio" name="bio" type="textarea" defaultValue={musician?.bio} rows={6} required />
      <AdminFormField label="Order" name="order" type="number" defaultValue={String(musician?.order ?? "")} />
      <div className="flex items-center gap-2">
        <input type="checkbox" id="isCurrentMember" name="isCurrentMember" defaultChecked={musician?.isCurrentMember ?? true} className="accent-brand-teal" />
        <label htmlFor="isCurrentMember" className="text-sm text-brand-white">Current Band Member</label>
      </div>
      <div className="flex items-center justify-between">
        <button type="submit" className="bg-brand-teal px-8 py-3 font-heading uppercase tracking-widest text-brand-black hover:bg-brand-teal-dark">
          {isEdit ? "Update Musician" : "Add Musician"}
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={async () => {
              if (!confirm("Are you sure you want to delete this musician?")) return;
              await deleteMusician(musician!._id);
              router.push("/admin/musicians");
            }}
            className="bg-brand-red px-6 py-3 font-heading text-sm uppercase tracking-widest text-brand-white hover:opacity-80"
          >
            Delete Musician
          </button>
        )}
      </div>
    </form>
  );
}
