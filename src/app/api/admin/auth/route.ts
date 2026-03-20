import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

function createSessionToken(): string {
  const secret = process.env.ADMIN_SESSION_SECRET!;
  const timestamp = Date.now().toString();
  const hash = crypto
    .createHmac("sha256", secret)
    .update(timestamp)
    .digest("hex");
  return `${timestamp}.${hash}`;
}

function verifySessionToken(token: string): boolean {
  const secret = process.env.ADMIN_SESSION_SECRET!;
  const [timestamp, hash] = token.split(".");
  if (!timestamp || !hash) return false;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(timestamp)
    .digest("hex");
  return hash === expected;
}

export async function POST(req: NextRequest) {
  const { password, action } = await req.json();

  if (action === "logout") {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    return NextResponse.json({ success: true });
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { success: false, error: "Invalid password" },
      { status: 401 }
    );
  }

  const token = createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set("admin_session", token, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return NextResponse.json({ success: true });
}

export { verifySessionToken };
