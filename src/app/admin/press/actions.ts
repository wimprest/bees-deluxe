"use server";

import { writeClient } from "@/lib/sanity.server";
import { revalidatePath } from "next/cache";

export async function createPressQuote(formData: FormData) {
  await writeClient.create({
    _type: "pressQuote",
    quote: formData.get("quote") as string,
    attribution: formData.get("attribution") as string,
    publication: formData.get("publication") as string,
    publicationUrl: (formData.get("publicationUrl") as string) || undefined,
    year: Number(formData.get("year")) || undefined,
    order: Number(formData.get("order") || 99),
  });
  revalidatePath("/admin/press");
  revalidatePath("/press");
}

export async function updatePressQuote(id: string, formData: FormData) {
  await writeClient.patch(id).set({
    quote: formData.get("quote") as string,
    attribution: formData.get("attribution") as string,
    publication: formData.get("publication") as string,
    publicationUrl: (formData.get("publicationUrl") as string) || undefined,
    year: Number(formData.get("year")) || undefined,
    order: Number(formData.get("order") || 99),
  }).commit();
  revalidatePath("/admin/press");
  revalidatePath("/press");
}

export async function deletePressQuote(id: string) {
  await writeClient.delete(id);
  revalidatePath("/admin/press");
  revalidatePath("/press");
}
