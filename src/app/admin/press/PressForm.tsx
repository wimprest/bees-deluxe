"use client";

import { useRouter } from "next/navigation";
import { AdminFormField } from "@/components/admin/AdminFormField";
import { createPressQuote, updatePressQuote } from "./actions";

interface PressFormProps {
  quote?: { _id: string; quote?: string; attribution?: string; publication?: string; publicationUrl?: string; year?: number; order?: number };
}

export function PressForm({ quote }: PressFormProps) {
  const router = useRouter();
  const isEdit = !!quote;

  async function handleSubmit(formData: FormData) {
    if (isEdit) await updatePressQuote(quote!._id, formData);
    else await createPressQuote(formData);
    router.push("/admin/press");
  }

  return (
    <form action={handleSubmit} className="max-w-xl space-y-4">
      <AdminFormField label="Quote" name="quote" type="textarea" defaultValue={quote?.quote} rows={4} required />
      <AdminFormField label="Attribution" name="attribution" defaultValue={quote?.attribution} placeholder="Reviewer name" required />
      <AdminFormField label="Publication" name="publication" defaultValue={quote?.publication} required />
      <AdminFormField label="Publication URL" name="publicationUrl" type="url" defaultValue={quote?.publicationUrl} />
      <div className="grid grid-cols-2 gap-4">
        <AdminFormField label="Year" name="year" type="number" defaultValue={String(quote?.year ?? "")} />
        <AdminFormField label="Order" name="order" type="number" defaultValue={String(quote?.order ?? "")} />
      </div>
      <button type="submit" className="bg-brand-teal px-8 py-3 font-heading uppercase tracking-widest text-brand-black hover:bg-brand-teal-dark">
        {isEdit ? "Update Quote" : "Add Quote"}
      </button>
    </form>
  );
}
