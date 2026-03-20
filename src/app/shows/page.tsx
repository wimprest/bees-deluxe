import Image from "next/image";
import { client } from "@/lib/sanity";
import { allShowsQuery } from "@/lib/queries";
import { PageShell } from "@/components/layout/PageShell";
import { SectionDivider } from "@/components/layout/SectionDivider";
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
      <div className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-[1fr_380px]">
        {/* Left column — show listing */}
        <div>
          <SectionDivider label="Bees Deluxe Shows" />
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
            <p className="text-brand-muted">Check back for upcoming shows.</p>
          )}
        </div>

        {/* Right column — image, desktop only */}
        <div className="hidden lg:block">
          <Image
            src="/images/shows/shows-hero.jpg"
            alt="Bees Deluxe live"
            width={380}
            height={500}
            className="w-full object-cover"
          />
        </div>
      </div>
    </PageShell>
  );
}
