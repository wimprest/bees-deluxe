import Image from "next/image";
import { client } from "@/lib/sanity";
import { allShowsQuery } from "@/lib/queries";
import { PageShell } from "@/components/layout/PageShell";
import { ShowListItem } from "@/components/shows/ShowListItem";
import type { Show } from "@/types";

export default async function ShowsPage() {
  let allShows: Show[] = [];
  try {
    allShows = await client.fetch(allShowsQuery);
  } catch {
    // Sanity not yet populated
  }

  const now = new Date();
  const upcomingShows = allShows.filter(
    (show) => show.date && new Date(show.date) >= now
  );

  return (
    <PageShell>
      <div className="py-16">
        {/* Full-width rule with left-anchored label (desktop), centered (mobile) */}
        <div className="relative py-8">
          <hr className="border-t border-brand-teal opacity-40" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-black px-4 text-sm uppercase tracking-widest font-heading text-brand-teal lg:left-0 lg:translate-x-0 lg:pl-0 lg:pr-4">
            Bees Deluxe Shows
          </span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
          {/* Left column — show listing */}
          <div>
            {upcomingShows.length > 0 ? (
              <div>
                {upcomingShows.map((show, index) => (
                  <div key={show._id}>
                    <ShowListItem show={show} />
                    {index < upcomingShows.length - 1 && (
                      <hr className="my-4 border-t border-brand-teal/20" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-brand-muted">
                Check back for upcoming shows.
              </p>
            )}
          </div>

          {/* Right column — Conrad silo, anchored ~2-3px below rule, desktop only */}
          <div className="hidden lg:-mt-[30px] lg:block">
            <Image
              src="/images/shows/shows-hero.jpg"
              alt="Conrad Warre — Bees Deluxe"
              width={380}
              height={500}
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
