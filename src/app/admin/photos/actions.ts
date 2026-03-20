"use server";

import { writeClient } from "@/lib/sanity.server";
import { revalidatePath } from "next/cache";

export async function createPhoto(formData: FormData) {
  await writeClient.create({
    _type: "photo",
    caption: (formData.get("caption") as string) || undefined,
    credit: (formData.get("credit") as string) || undefined,
    featured: formData.get("featured") === "on",
    order: Number(formData.get("order") || 99),
  });
  revalidatePath("/admin/photos");
  revalidatePath("/photos");
}

export async function deletePhoto(id: string) {
  await writeClient.delete(id);
  revalidatePath("/admin/photos");
  revalidatePath("/photos");
}
