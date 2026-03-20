import Link from "next/link";
import { format } from "date-fns";
import { generateGoogleMapsUrl } from "@/lib/maps";
import { AddToCalendar } from "@/components/shows/AddToCalendar";
import type { Show } from "@/types";

interface UpcomingShowsWidgetProps {
  shows: Show[];
  maxShows?: number;
}

export function UpcomingShowsWidget({
  shows,
  maxShows = 6,
}: UpcomingShowsWidgetProps) {
  const now = new Date();
  const futureShows = shows
    .filter((show) => show.date && new Date(show.date) >= now)
    .slice(0, maxShows);

  if (futureShows.length === 0) {
    return (
      <p className="text-brand-muted">Check back for upcoming shows</p>
    );
  }

  return (
    <div>
      {futureShows.map((show, i) => (
        <div key={show._id}>
          {i > 0 && <hr className="border-t border-brand-teal/30" />}
          <div className="py-3">
            {/* Line 1: Day + date */}
            <p className="font-heading text-brand-white">
              {show.date && format(new Date(show.date), "EEEE, MMMM d")}
            </p>

            {/* Line 2: Venue + phone */}
            <div className="flex items-baseline justify-between gap-2">
              <a
                href={generateGoogleMapsUrl(
                  show.venueName ?? "",
                  show.venueAddress ?? ""
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-white transition-colors hover:text-brand-teal"
              >
                {show.venueName}
              </a>
              {show.phone && (
                <a
                  href={`tel:${show.phone}`}
                  className="shrink-0 text-sm text-brand-teal transition-colors hover:text-brand-teal-light"
                >
                  Call for Reservations
                </a>
              )}
            </div>

            {/* Line 3: City, State */}
            <p className="text-sm text-brand-muted">
              {show.city}, {show.state}
            </p>

            {/* Line 4: Start time + Calendar + Tickets */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-brand-muted">{show.startTime}</p>
              <div className="flex items-center gap-3">
                {show.ticketUrl && (
                  <a
                    href={show.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-wide text-brand-red transition-colors hover:text-brand-teal"
                  >
                    Buy Tickets &rarr;
                  </a>
                )}
                <AddToCalendar show={show} />
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="pt-4">
        <Link
          href="/shows"
          className="font-heading text-sm uppercase tracking-wide text-brand-teal transition-colors hover:text-brand-teal-light"
        >
          More Bees Deluxe Dates &rarr;
        </Link>
      </div>
    </div>
  );
}
