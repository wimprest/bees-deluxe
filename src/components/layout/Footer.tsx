import { Youtube, Facebook, Instagram, Twitter } from "lucide-react";
import { SoundCloudIcon } from "@/components/icons/SoundCloudIcon";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  YouTube: Youtube,
  Facebook: Facebook,
  Instagram: Instagram,
  SoundCloud: SoundCloudIcon,
  Twitter: Twitter,
  "Twitter/X": Twitter,
};

const defaultSocialLinks = [
  { platform: "YouTube", url: "#" },
  { platform: "Facebook", url: "#" },
  { platform: "Instagram", url: "#" },
  { platform: "SoundCloud", url: "#" },
  { platform: "Twitter", url: "#" },
];

interface FooterProps {
  socialLinks?: { platform?: string; url?: string }[];
}

export function Footer({ socialLinks }: FooterProps) {
  const links =
    socialLinks && socialLinks.length > 0 ? socialLinks : defaultSocialLinks;

  const resolvedLinks = links
    .map((link) => ({
      platform: link.platform ?? "",
      href: link.url ?? "#",
      Icon: iconMap[link.platform ?? ""],
    }))
    .filter((link) => link.Icon);

  return (
    <footer className="w-full bg-brand-teal py-6">
      <div className="mx-auto flex max-w-[960px] flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between sm:px-6">
        <p className="text-sm text-brand-black">
          &copy;&nbsp;{new Date().getFullYear()}&nbsp;Bees Deluxe. Slapping Cat
          Records &amp; Carbonmind Music Publishing.
        </p>
        <div className="flex items-center gap-4">
          {resolvedLinks.map(({ platform, href, Icon }) => (
            <a
              key={platform}
              href={href}
              target={href !== "#" ? "_blank" : undefined}
              rel={href !== "#" ? "noopener noreferrer" : undefined}
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
