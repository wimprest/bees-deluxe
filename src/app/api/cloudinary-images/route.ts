import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req: NextRequest) {
  const folder = req.nextUrl.searchParams.get("folder") || "bees-deluxe";

  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: folder,
      resource_type: "image",
      max_results: 50,
    });

    const urls = result.resources.map(
      (r: { secure_url: string }) => r.secure_url
    );

    return NextResponse.json({ urls });
  } catch {
    return NextResponse.json({ urls: [] });
  }
}
