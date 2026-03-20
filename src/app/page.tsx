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
        <div className="mx-auto flex max-w-[960px] flex-col-reverse gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-12">
          <div className="flex-1">
            <h1 className="font-heading text-2xl leading-tight text-brand-white sm:text-3xl lg:text-4xl">
              <span className="text-brand-teal">&ldquo;</span>
              This is what Steely Dan would sound like if they played the blues
              <span className="text-brand-teal">&rdquo;</span>
            </h1>
            <p className="mt-2 text-sm text-brand-muted">
              — John Kereiff, The Rock Doctors Hot Wax Album Reviews
            </p>
          </div>
          <div className="flex-shrink-0 lg:w-[420px]">
            <Image
              src="/images/home/hero-banner.jpg"
              alt="Bees Deluxe live"
              width={840}
              height={560}
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

      {/* Section 3: Upcoming Shows */}
      <section className="py-16 sm:py-20">
        <PageShell>
          <SectionDivider label="Upcoming Shows" />
          <UpcomingShowsWidget shows={upcomingShows} maxShows={6} />
        </PageShell>
      </section>

      {/* Section 4: Featured Album + Review */}
      <section className="py-16 sm:py-20">
        <PageShell>
          <SectionDivider label="Latest Release" />
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-0">
            {/* Left: cover + links */}
            <div className="flex flex-col lg:w-[40%] lg:pr-8">
              <Image
                src="/images/home/hallucinate-cover.jpg"
                alt="Hallucinate album cover"
                width={600}
                height={600}
                className="aspect-square h-auto w-full object-cover"
              />
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                {HALLUCINATE_LINKS.map((link, i) => (
                  <span key={link.label} className="flex items-center">
                    {i > 0 && (
                      <span className="mx-2 text-brand-teal/50">|</span>
                    )}
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-teal transition-colors hover:text-brand-teal-light"
                    >
                      {link.label}
                    </a>
                  </span>
                ))}
              </div>
            </div>

            {/* Vertical delimiter */}
            <div className="hidden lg:block lg:w-px lg:self-stretch lg:bg-brand-teal/30" />

            {/* Right: quote */}
            <div className="flex flex-col justify-center lg:w-[60%] lg:pl-8">
              <p className="text-sm uppercase tracking-widest text-brand-teal">
                Hallucinate
              </p>
              <p className="mt-4 font-body text-lg italic leading-relaxed text-brand-white">
                &ldquo;Hallucinate is one of those albums that come along very
                infrequently, a complete outline of musical genius, songs that
                have substance not only individually, but as an entire album,
                like one lone and complete song, no matter where you are in the
                album, it evolves and transforms into something grand and
                magical.&rdquo;
              </p>
              <p className="mt-2 text-sm text-brand-muted">
                — Joseph Timmons, Indie Pulse Reviews
              </p>
              <Link
                href="/videos"
                className="mt-6 font-heading text-sm uppercase tracking-wide text-brand-teal transition-colors hover:text-brand-teal-light"
              >
                More Bees Deluxe Videos on YouTube &rarr;
              </Link>
            </div>
          </div>
        </PageShell>
      </section>

      {/* Section 5: Spotify Player */}
      <section className="py-16 sm:py-20">
        <PageShell>
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
        </PageShell>
      </section>

      {/* Section 6: Merch */}
      <section className="py-16 sm:py-20">
        <PageShell>
          <SectionDivider label="Merch" />
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
            <div className="flex-shrink-0 lg:w-[280px]">
              <Image
                src="/images/home/merch-tshirt.jpg"
                alt="Bees Deluxe t-shirt"
                width={560}
                height={560}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-body leading-relaxed text-brand-white">
                Get a Bees Deluxe T-Shirt — available in lots of colors and
                styles. Wear yours to a show and we&rsquo;ll give you a free CD.
              </p>
              <a
                href="https://bees-deluxe.printify.me/products"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block font-heading text-sm uppercase tracking-wide text-brand-teal transition-colors hover:text-brand-teal-light"
              >
                Get Yours &rarr;
              </a>
            </div>
          </div>
        </PageShell>
      </section>

      {/* Section 7: Press Quote */}
      <section className="py-16 sm:py-20">
        <PageShell>
          <blockquote className="border-l-2 border-brand-teal py-8 pl-6">
            <p className="font-body text-lg italic leading-relaxed text-brand-white">
              &ldquo;The music, for me, has the same impact that Steely Dan did
              with their first couple of albums. They play very tight Blues that
              sounds as though they are jamming but this is very tight, and the
              playing is absolutely superb.&rdquo;
            </p>
            <p className="mt-2 text-sm text-brand-muted">
              — Andy Snipper,{" "}
              <a
                href="https://www.music-news.com/review/UK/15712/Album/Bees-Deluxe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-teal transition-colors hover:text-brand-teal-light"
              >
                Music News
              </a>
            </p>
          </blockquote>
        </PageShell>
      </section>
    </>
  );
}
