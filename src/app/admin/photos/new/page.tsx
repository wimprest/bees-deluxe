"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminFormField } from "@/components/admin/AdminFormField";
import { createPhoto } from "../actions";

export default function NewPhotoPage() {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    await createPhoto(formData);
    router.push("/admin/photos");
  }

  return (
    <div>
      <Link href="/admin/photos" className="text-sm text-brand-teal hover:text-brand-teal-light">← Back to Photos</Link>
      <h1 className="mt-4 font-heading text-2xl text-brand-white">Admin — Upload Photo</h1>
      <form action={handleSubmit} className="mt-6 max-w-xl space-y-4">
        <AdminFormField label="Caption" name="caption" placeholder="Photo caption" />
        <AdminFormField label="Photo Credit" name="credit" placeholder="Photographer name" />
        <AdminFormField label="Order" name="order" type="number" />
        <div className="flex items-center gap-2">
          <input type="checkbox" id="featured" name="featured" className="accent-brand-teal" />
          <label htmlFor="featured" className="text-sm text-brand-white">Featured</label>
        </div>
        <p className="text-xs text-brand-muted">Note: Image upload via Sanity assets coming in Phase 12. For now, add photos by placing files in public/images/photos/ and setting the order number to match.</p>
        <button type="submit" className="bg-brand-teal px-8 py-3 font-heading uppercase tracking-widest text-brand-black hover:bg-brand-teal-dark">Add Photo Entry</button>
      </form>
    </div>
  );
}
