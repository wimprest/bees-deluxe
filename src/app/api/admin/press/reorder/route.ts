import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/lib/sanity.server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const items: { _id: string; order: number }[] = await req.json();
  const transaction = writeClient.transaction();
  for (const item of items) {
    transaction.patch(item._id, { set: { order: item.order } });
  }
  await transaction.commit();
  revalidatePath("/press");
  revalidatePath("/admin/press");
  return NextResponse.json({ success: true });
}
