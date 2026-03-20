"use server";

import { writeClient } from "@/lib/sanity.server";
import { revalidatePath } from "next/cache";

export async function createVideo(formData: FormData) {
  await writeClient.create({
    _type: "video",
    title: formData.get("title") as string,
    youtubeId: formData.get("youtubeId") as string,
    description: (formData.get("description") as string) || undefined,
    featured: formData.get("featured") === "on",
    order: Number(formData.get("order") || 99),
  });
  revalidatePath("/admin/videos");
  revalidatePath("/videos");
}

export async function updateVideo(id: string, formData: FormData) {
  await writeClient.patch(id).set({
    title: formData.get("title") as string,
    youtubeId: formData.get("youtubeId") as string,
    description: (formData.get("description") as string) || undefined,
    featured: formData.get("featured") === "on",
    order: Number(formData.get("order") || 99),
  }).commit();
  revalidatePath("/admin/videos");
  revalidatePath("/videos");
}

export async function deleteVideo(id: string) {
  await writeClient.delete(id);
  revalidatePath("/admin/videos");
  revalidatePath("/videos");
}
