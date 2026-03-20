"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const adminLinks = [
  { label: "Dashboard", href: "/admin" },
  { label: "Shows", href: "/admin/shows" },
  { label: "Albums", href: "/admin/albums" },
  { label: "Musicians", href: "/admin/musicians" },
  { label: "Press", href: "/admin/press" },
  { label: "Photos", href: "/admin/photos" },
  { label: "Videos", href: "/admin/videos" },
  { label: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    router.push("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-brand-black">
      {/* Sidebar */}
      <aside className="hidden w-56 flex-shrink-0 border-r border-brand-teal/10 bg-brand-charcoal lg:block">
        <div className="flex h-full flex-col p-4">
          <Link href="/admin" className="mb-6">
            <Image
              src="/images/bees-logo.png"
              alt="Bees Deluxe"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          <nav className="flex-1 space-y-1">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 text-sm transition-colors ${
                  pathname === link.href
                    ? "text-brand-teal"
                    : "text-brand-white hover:text-brand-teal"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-2 border-t border-brand-teal/10 pt-4">
            <Link
              href="/"
              className="block text-sm text-brand-muted transition-colors hover:text-brand-teal"
            >
              ← View Site
            </Link>
            <button
              onClick={handleLogout}
              className="block text-sm text-brand-muted transition-colors hover:text-brand-red"
            >
              Log Out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-brand-teal/10 bg-brand-charcoal lg:hidden">
        <div className="flex overflow-x-auto">
          {adminLinks.slice(0, 5).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex-1 px-2 py-3 text-center text-xs ${
                pathname === link.href
                  ? "text-brand-teal"
                  : "text-brand-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-4 pb-20 sm:p-6 lg:p-8 lg:pb-8">
        {children}
      </main>
    </div>
  );
}
