import type { Metadata } from "next";
import { Oswald, Inter, Courier_Prime } from "next/font/google";
import { client } from "@/lib/sanity";
import { siteSettingsQuery } from "@/lib/queries";
import { Nav } from "@/components/layout/Nav";
import { SiteTagline } from "@/components/layout/SiteTagline";
import { Footer } from "@/components/layout/Footer";
import { NavigationProvider } from "@/context/NavigationContext";
import { PageTransition } from "@/components/layout/PageTransition";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Bees Deluxe | Boston Blues",
  description:
    "Bees Deluxe — Boston acid blues. Live shows, music, videos, and more.",
  icons: {
    icon: "/images/favicon.png",
  },
};

interface SocialLink {
  platform?: string;
  url?: string;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let socialLinks: SocialLink[] = [];
  try {
    const settings = await client.fetch(siteSettingsQuery);
    if (settings?.socialLinks) {
      socialLinks = settings.socialLinks;
    }
  } catch {
    // Sanity unavailable — use defaults
  }

  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} ${courierPrime.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden bg-brand-black text-brand-white font-body">
        <NavigationProvider>
          <Nav socialLinks={socialLinks} />
          <div className="pt-16 md:pt-24">
            <SiteTagline />
          </div>
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer socialLinks={socialLinks} />
        </NavigationProvider>
      </body>
    </html>
  );
}
