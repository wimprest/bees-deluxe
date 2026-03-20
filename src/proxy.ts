import { NextRequest, NextResponse } from "next/server";

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin routes (except /admin/login and /api/admin/auth)
  if (
    !pathname.startsWith("/admin") ||
    pathname === "/admin/login" ||
    pathname.startsWith("/api/admin/auth")
  ) {
    return NextResponse.next();
  }

  const session = req.cookies.get("admin_session")?.value;
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // Verify token structure (timestamp.hash)
  const [timestamp, hash] = session.split(".");
  if (!timestamp || !hash) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
