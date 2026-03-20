"use server";

import { writeClient } from "@/lib/sanity.server";
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";
import { revalidatePath } from "next/cache";

export async function updateSettings(formData: FormData) {
  // Find existing settings doc or create one
  const existing = await client.fetch(groq`*[_type == "siteSettings"][0]._id`);

  const data = {
    _type: "siteSettings" as const,
    heroQuote: formData.get("heroQuote") as string,
    heroQuoteAttribution: formData.get("heroQuoteAttribution") as string,
    spotifyEmbedUrl: (formData.get("spotifyEmbedUrl") as string) || undefined,
    bookingAgentName: (formData.get("bookingAgentName") as string) || undefined,
    bookingAgentEmail: (formData.get("bookingAgentEmail") as string) || undefined,
    bookingAgentPhone: (formData.get("bookingAgentPhone") as string) || undefined,
  };

  if (existing) {
    await writeClient.patch(existing).set(data).commit();
  } else {
    await writeClient.create(data);
  }

  revalidatePath("/admin/settings");
  revalidatePath("/");
}
