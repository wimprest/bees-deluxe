"use server";

import { writeClient } from "@/lib/sanity.server";
import { revalidatePath } from "next/cache";

export async function createMusician(formData: FormData) {
  await writeClient.create({
    _type: "musician",
    name: formData.get("name") as string,
    role: formData.get("role") as string,
    showRole: formData.get("showRole") === "on",
    bio: formData.get("bio") as string,
    photoUrl: (formData.get("photoUrl") as string) || undefined,
    isCurrentMember: formData.get("isCurrentMember") === "on",
    order: Number(formData.get("order") || 99),
  });
  revalidatePath("/admin/musicians");
  revalidatePath("/musicians");
}

export async function updateMusician(id: string, formData: FormData) {
  await writeClient.patch(id).set({
    name: formData.get("name") as string,
    role: formData.get("role") as string,
    showRole: formData.get("showRole") === "on",
    bio: formData.get("bio") as string,
    photoUrl: (formData.get("photoUrl") as string) || undefined,
    isCurrentMember: formData.get("isCurrentMember") === "on",
    order: Number(formData.get("order") || 99),
  }).commit();
  revalidatePath("/admin/musicians");
  revalidatePath("/musicians");
}

export async function deleteMusician(id: string) {
  await writeClient.delete(id);
  revalidatePath("/admin/musicians");
  revalidatePath("/musicians");
}
