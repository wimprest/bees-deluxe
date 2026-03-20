import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";

export async function GET() {
  const quotes = await client.fetch(
    groq`*[_type == "pressQuote"] | order(order asc) { _id, quote, attribution, order }`
  );
  return NextResponse.json({ quotes });
}
