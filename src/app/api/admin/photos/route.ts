import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";

export async function GET() {
  const photos = await client.fetch(
    groq`*[_type == "photo"] | order(order asc) { _id, caption, order, image { asset -> { url } } }`
  );
  return NextResponse.json({ photos });
}
