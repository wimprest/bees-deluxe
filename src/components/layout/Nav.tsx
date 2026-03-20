"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Youtube, Facebook, Instagram, Twitter } from "lucide-react";
import { SoundCloudIcon } from "@/components/icons/SoundCloudIcon";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shows", href: "/shows" },
  { label: "Musicians", href: "/musicians" },
  { label: "Press", href: "/press" },
  { label: "Discs", href: "/discs" },
  { label: "Photos", href: "/photos" },
  { label: "Videos", href: "/videos" },
  { label: "EPK", href: "/epk" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { platform: "YouTube", href: "#", icon: Youtube },
  { platform: "Facebook", href: "#", icon: Facebook },
  { platform: "Instagram", href: "#", icon: Instagram },
  { platform: "SoundCloud", href: "#", icon: SoundCloudIcon },
  { platform: "Twitter", href: "#", icon: Twitter },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-brand-teal/20 bg-brand-black">
      <div className="mx-auto flex h-16 max-w-[960px] items-center justify-between px-4 sm:px-6 md:h-24">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/bees-logo.png"
            alt="Bees Deluxe"
            width={270}
            height={90}
            className="h-[90px] w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link, i) => (
            <span key={link.href} className="flex items-center">
              {i > 0 && (
                <span className="mx-2 text-brand-teal/50">|</span>
              )}
              <Link
                href={link.href}
                className={`text-sm font-heading uppercase tracking-wide transition-colors hover:text-brand-teal ${
                  pathname === link.href
                    ? "text-brand-red"
                    : "text-brand-white"
                }`}
              >
                {link.label}
              </Link>
            </span>
          ))}
        </div>

        {/* Desktop social icons */}
        <div className="hidden items-center gap-3 lg:flex">
          {socialLinks.map(({ platform, href, icon: Icon }) => (
            <a
              key={platform}
              href={href}
              aria-label={platform}
              className="text-brand-white transition-colors hover:text-brand-teal"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-brand-white lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-brand-teal/20 bg-brand-charcoal lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block border-b border-brand-teal/10 px-4 py-3 text-sm font-heading uppercase tracking-wide transition-colors hover:text-brand-teal ${
                pathname === link.href
                  ? "text-brand-red"
                  : "text-brand-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-4 px-4 py-4">
            {socialLinks.map(({ platform, href, icon: Icon }) => (
              <a
                key={platform}
                href={href}
                aria-label={platform}
                className="text-brand-white transition-colors hover:text-brand-teal"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
