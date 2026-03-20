"use client";

import { usePathname } from "next/navigation";

export function SiteTagline() {
  const pathname = usePathname();

  // Suppress on home page — it has its own hero quote
  if (pathname === "/") return null;

  return (
    <div className="w-full border-b border-brand-teal/10 bg-brand-black py-3">
      <div className="mx-auto max-w-[960px] px-4 text-center text-xs leading-relaxed text-brand-muted sm:px-6 sm:text-sm">
        <p>
          Bees Deluxe —{" "}
          <span className="italic text-brand-white">
            &ldquo;This is what Steely Dan would sound like if they played the
            blues&rdquo;
          </span>
        </p>
        <p className="mt-1">
          — <span className="font-bold text-brand-white">John Kereiff</span>,
          The Rock Doctors Hot Wax Album Reviews.
        </p>
      </div>
    </div>
  );
}
