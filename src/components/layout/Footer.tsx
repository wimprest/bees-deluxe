import { Youtube, Facebook, Instagram, Twitter } from "lucide-react";
import { SoundCloudIcon } from "@/components/icons/SoundCloudIcon";

const socialLinks = [
  { platform: "YouTube", href: "#", icon: Youtube },
  { platform: "Facebook", href: "#", icon: Facebook },
  { platform: "Instagram", href: "#", icon: Instagram },
  { platform: "SoundCloud", href: "#", icon: SoundCloudIcon },
  { platform: "Twitter", href: "#", icon: Twitter },
];

export function Footer() {
  return (
    <footer className="w-full bg-brand-teal py-6">
      <div className="mx-auto flex max-w-[960px] flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between sm:px-6">
        <p className="text-sm text-brand-black">
          &copy; {new Date().getFullYear()} Bees Deluxe. Slapping Cat Records
          &amp; Carbonmind Music Publishing.
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map(({ platform, href, icon: Icon }) => (
            <a
              key={platform}
              href={href}
              aria-label={platform}
              className="text-brand-black transition-opacity hover:opacity-70"
            >
              <Icon size={24} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
