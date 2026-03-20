import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";

export async function GET() {
  const videos = await client.fetch(
    groq`*[_type == "video"] | order(featured desc, order asc) { _id, title, youtubeId, featured, order }`
  );
  return NextResponse.json({ videos });
}
