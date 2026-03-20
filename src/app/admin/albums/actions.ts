"use server";

import { writeClient } from "@/lib/sanity.server";
import { revalidatePath } from "next/cache";

export async function createAlbum(formData: FormData) {
  const title = formData.get("title") as string;
  await writeClient.create({
    _type: "album",
    title,
    slug: { _type: "slug", current: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") },
    releaseYear: Number(formData.get("releaseYear")),
    albumType: formData.get("albumType") as string,
    description: (formData.get("description") as string) || undefined,
    credits: (formData.get("credits") as string) || undefined,
    featured: formData.get("featured") === "on",
    order: Number(formData.get("order") || 99),
  });
  revalidatePath("/admin/albums");
  revalidatePath("/discs");
}

export async function updateAlbum(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  await writeClient.patch(id).set({
    title,
    slug: { _type: "slug", current: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") },
    releaseYear: Number(formData.get("releaseYear")),
    albumType: formData.get("albumType") as string,
    description: (formData.get("description") as string) || undefined,
    credits: (formData.get("credits") as string) || undefined,
    featured: formData.get("featured") === "on",
    order: Number(formData.get("order") || 99),
  }).commit();
  revalidatePath("/admin/albums");
  revalidatePath("/discs");
}

export async function deleteAlbum(id: string) {
  await writeClient.delete(id);
  revalidatePath("/admin/albums");
  revalidatePath("/discs");
}
