"use client";

import { useRouter } from "next/navigation";
import { AdminFormField } from "@/components/admin/AdminFormField";
import { createMusician, updateMusician } from "./actions";

interface MusicianFormProps {
  musician?: { _id: string; name?: string; role?: string; bio?: string; isCurrentMember?: boolean; order?: number };
}

export function MusicianForm({ musician }: MusicianFormProps) {
  const router = useRouter();
  const isEdit = !!musician;

  async function handleSubmit(formData: FormData) {
    if (isEdit) await updateMusician(musician!._id, formData);
    else await createMusician(formData);
    router.push("/admin/musicians");
  }

  return (
    <form action={handleSubmit} className="max-w-xl space-y-4">
      <AdminFormField label="Name" name="name" defaultValue={musician?.name} required />
      <AdminFormField label="Role" name="role" defaultValue={musician?.role} placeholder='e.g. "Guitar & Vocals"' required />
      <AdminFormField label="Bio" name="bio" type="textarea" defaultValue={musician?.bio} rows={6} required />
      <AdminFormField label="Order" name="order" type="number" defaultValue={String(musician?.order ?? "")} />
      <div className="flex items-center gap-2">
        <input type="checkbox" id="isCurrentMember" name="isCurrentMember" defaultChecked={musician?.isCurrentMember ?? true} className="accent-brand-teal" />
        <label htmlFor="isCurrentMember" className="text-sm text-brand-white">Current Band Member</label>
      </div>
      <button type="submit" className="bg-brand-teal px-8 py-3 font-heading uppercase tracking-widest text-brand-black hover:bg-brand-teal-dark">
        {isEdit ? "Update Musician" : "Add Musician"}
      </button>
    </form>
  );
}
