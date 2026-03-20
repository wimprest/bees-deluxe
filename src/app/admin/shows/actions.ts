"use server";

import { writeClient } from "@/lib/sanity.server";
import { revalidatePath } from "next/cache";

export async function createShow(formData: FormData) {
  await writeClient.create({
    _type: "show",
    date: formData.get("date") as string,
    venueName: formData.get("venueName") as string,
    venueAddress: formData.get("venueAddress") as string,
    city: formData.get("city") as string,
    state: formData.get("state") as string,
    startTime: formData.get("startTime") as string,
    phone: (formData.get("phone") as string) || undefined,
    ticketUrl: (formData.get("ticketUrl") as string) || undefined,
    notes: (formData.get("notes") as string) || undefined,
  });
  revalidatePath("/admin/shows");
  revalidatePath("/shows");
  revalidatePath("/");
}

export async function updateShow(id: string, formData: FormData) {
  await writeClient.patch(id).set({
    date: formData.get("date") as string,
    venueName: formData.get("venueName") as string,
    venueAddress: formData.get("venueAddress") as string,
    city: formData.get("city") as string,
    state: formData.get("state") as string,
    startTime: formData.get("startTime") as string,
    phone: (formData.get("phone") as string) || undefined,
    ticketUrl: (formData.get("ticketUrl") as string) || undefined,
    notes: (formData.get("notes") as string) || undefined,
  }).commit();
  revalidatePath("/admin/shows");
  revalidatePath("/shows");
  revalidatePath("/");
}

export async function deleteShow(id: string) {
  await writeClient.delete(id);
  revalidatePath("/admin/shows");
  revalidatePath("/shows");
  revalidatePath("/");
}
