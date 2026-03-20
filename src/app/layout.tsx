import type { Metadata } from "next";
import { Oswald, Inter, Courier_Prime } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { SiteTagline } from "@/components/layout/SiteTagline";
import { Footer } from "@/components/layout/Footer";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} ${courierPrime.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-brand-black text-brand-white font-body">
        <Nav />
        <div className="pt-16 md:pt-24">
          <SiteTagline />
        </div>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
