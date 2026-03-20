import Image from "next/image";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { upcomingShowsQuery } from "@/lib/queries";
import { PageShell } from "@/components/layout/PageShell";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { UpcomingShowsWidget } from "@/components/shows/UpcomingShowsWidget";
import type { Show } from "@/types";

const SPOTIFY_EMBED_URL =
  "https://open.spotify.com/embed/artist/17Y0kmsT4nzoNXI9nMkrp3?utm_source=generator&theme=0";

const HALLUCINATE_LINKS = [
  { label: "Spotify", href: "https://spoti.fi/46pplbM" },
  { label: "iTunes", href: "https://apple.co/3Mv5dho" },
  { label: "Apple Music", href: "https://apple.co/46X5F0f" },
  { label: "Amazon", href: "https://amzn.to/3MzIEIy" },
];

export default async function HomePage() {
  let upcomingShows: Show[] = [];
  try {
    upcomingShows = await client.fetch(upcomingShowsQuery, { limit: 6 });
  } catch {
    // Sanity not yet populated — fall back to empty
  }

  return (
    <>
      {/* Section 1: Hero */}
      <section
        className="w-full py-16 sm:py-20"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="mx-auto max-w-[960px] px-4 sm:px-6">
          <h1 className="font-heading text-2xl leading-tight text-brand-white sm:text-3xl lg:text-4xl">
            <span className="text-brand-teal">&ldquo;</span>
            This is what Steely Dan would sound like if they played the blues
            <span className="text-brand-teal">&rdquo;</span>
          </h1>
          <p className="mt-2 text-sm text-brand-muted">
            — <span className="font-bold text-brand-white">John Kereiff</span>,{" "}
            The Rock Doctors Hot Wax Album Reviews
          </p>
          <div className="mt-8">
            <Image
              src="/images/home/hero-banner.jpg"
              alt="Bees Deluxe live"
              width={960}
              height={640}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Section 2: Band Description */}
      <section className="py-16 sm:py-20">
        <PageShell>
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            <div className="flex-1">
              <p className="font-body leading-relaxed text-brand-white">
                Winners of the 2025 New Hampshire State Blues Challenge, and
                semi-finalists at the International Blues Challenge, in Memphis
                January 2026.
              </p>
              <p className="mt-4 font-body leading-relaxed text-brand-white">
                Hell-bent on their mission to bring the blues into the 21st
                century, Bees Deluxe pushes the limits, colors outside the lines
                of convention and bends the genre to create a sound that is
                distinct, highly musical and yet deeply respectful of the blues
                tradition.
              </p>
            </div>
            <div className="flex-shrink-0 lg:w-[360px]">
              <Image
                src="/images/home/band-photo.jpg"
                alt="Bees Deluxe band photo"
                width={720}
                height={720}
                className="aspect-square h-auto w-full object-cover"
              />
            </div>
          </div>
        </PageShell>
      </section>

      {/* Section 3: Spotify + Shows side by side (Correction 1: moved above Hallucinate) */}
      <section className="py-16 sm:py-20">
        <PageShell>
          <div className="flex flex-col-reverse gap-8 lg:flex-row lg:gap-12">
            {/* Left: Spotify (~45%) */}
            <div className="lg:w-[45%]">
              <p className="mb-4 text-sm uppercase tracking-widest text-brand-muted">
                Listen on Spotify
              </p>
              <div
                className="p-4"
                style={{ background: "var(--gradient-dark-surface)" }}
              >
                <iframe
                  src={SPOTIFY_EMBED_URL}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify player"
                />
              </div>
            </div>

            {/* Right: Upcoming Shows (~55%) */}
            <div className="lg:w-[55%]">
              <SectionDivider label="Upcoming Shows" />
              <UpcomingShowsWidget shows={upcomingShows} maxShows={6} />
            </div>
          </div>
        </PageShell>
      </section>

      {/* Section 4: Hallucinate Review (Correction 2: SectionDivider + title changes) */}
      <section className="py-16 sm:py-20">
        <PageShell>
          <SectionDivider label="Hallucinate Review" />
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">
            {/* Left: cover + title */}
            <div className="flex-shrink-0 lg:w-[30%]">
              <Image
                src="/images/home/hallucinate-cover.jpg"
                alt="Hallucinate album cover"
                width={600}
                height={600}
                className="aspect-square h-auto w-full object-cover"
              />
              {/* Correction 3: brand.red on HALLUCINATE title */}
              <p className="mt-3 text-sm font-bold uppercase tracking-widest text-brand-red">
                Hallucinate
              </p>
            </div>

            {/* Center: review */}
            <div className="flex flex-1 flex-col justify-center">
              <p className="font-body text-lg italic leading-relaxed text-brand-white">
                &ldquo;Hallucinate is one of those albums that come along very
                infrequently, a complete outline of musical genius, songs that
                have substance not only individually, but as an entire album,
                like one lone and complete song, no matter where you are in the
                album, it evolves and transforms into something grand and
                magical.&rdquo;
              </p>
              {/* Correction 4: Indie Pulse Reviews linked */}
              <p className="mt-2 text-sm text-brand-muted">
                — <span className="font-bold text-brand-white">Joseph Timmons</span>,{" "}
                <a
                  href="https://indiepulsemusic.com/2023/12/02/indiepulse-reviews-hallucinate-the-new-album-of-all-original-tracks-by-bees-deluxe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-muted transition-colors hover:text-brand-teal"
                >
                  Indie Pulse Reviews
                </a>
              </p>
            </div>

            {/* Right: buy links */}
            <div className="flex flex-col gap-2 lg:w-[20%]">
              {HALLUCINATE_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-teal transition-colors hover:text-brand-teal-light"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </PageShell>
      </section>

      {/* Section 5: YouTube Video */}
      <section className="py-16 sm:py-20">
        <PageShell>
          <div className="aspect-video w-full">
            <iframe
              src="https://www.youtube.com/embed/WSUWKOIGip0"
              width="100%"
              height="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              title="Bees Deluxe video"
              className="h-full w-full"
            />
          </div>
          <Link
            href="/videos"
            className="mt-4 inline-block font-heading text-sm uppercase tracking-wide text-brand-teal transition-colors hover:text-brand-teal-light"
          >
            More Bees Deluxe Videos on YouTube &rarr;
          </Link>
        </PageShell>
      </section>

      {/* Section 6: Merch + Press Quote side by side */}
      <section className="py-16 sm:py-20">
        <PageShell>
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            {/* Left: Merch */}
            <div className="flex flex-col gap-4 lg:w-1/2">
              <SectionDivider label="Merch" />
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                {/* Correction 5: plain image, no blend modes or bg manipulation */}
                <div className="flex-shrink-0 sm:w-[200px]">
                  <Image
                    src="/images/home/merch-tshirt.jpg"
                    alt="Bees Deluxe t-shirt"
                    width={400}
                    height={400}
                    className="h-auto w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-body leading-relaxed text-brand-white">
                    Get a Bees Deluxe T-Shirt — available in lots of colors and
                    styles. Wear yours to a show and we&rsquo;ll give you a free
                    CD.
                  </p>
                  <a
                    href="https://bees-deluxe.printify.me/products"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block font-heading text-sm uppercase tracking-wide text-brand-teal transition-colors hover:text-brand-teal-light"
                  >
                    Get Yours &rarr;
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Press Quote */}
            <div className="flex items-center lg:w-1/2">
              <blockquote className="border-l-2 border-brand-teal py-8 pl-6">
                <p className="font-body text-lg italic leading-relaxed text-brand-white">
                  &ldquo;The music, for me, has the same impact that Steely Dan
                  did with their first couple of albums. They play very tight
                  Blues that sounds as though they are jamming but this is very
                  tight, and the playing is absolutely superb.&rdquo;
                </p>
                <p className="mt-2 text-sm text-brand-muted">
                  — <span className="font-bold text-brand-white">Andy Snipper</span>,{" "}
                  <a
                    href="https://www.music-news.com/review/UK/15712/Album/Bees-Deluxe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-muted transition-colors hover:text-brand-teal"
                  >
                    Music News
                  </a>
                </p>
              </blockquote>
            </div>
          </div>
        </PageShell>
      </section>
    </>
  );
}
