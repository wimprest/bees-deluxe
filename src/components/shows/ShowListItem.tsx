import { format, parseISO } from "date-fns";
import { generateGoogleMapsUrl } from "@/lib/maps";
import { AddToCalendar } from "@/components/shows/AddToCalendar";
import type { Show } from "@/types";

interface ShowListItemProps {
  show: Show;
}

export function ShowListItem({ show }: ShowListItemProps) {
  return (
    <div>
      {/* Line 1: Date */}
      <p className="font-heading text-base text-brand-white">
        {show.date && format(parseISO(show.date), "EEEE, MMMM d, yyyy")}
      </p>

      {/* Line 2: Venue + Phone */}
      <div className="flex items-baseline justify-between gap-2">
        <a
          href={generateGoogleMapsUrl(
            show.venueName ?? "",
            show.venueAddress ?? ""
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-brand-teal transition-colors hover:text-brand-teal-light"
        >
          {show.venueName}
        </a>
        {show.phone && (
          <a
            href={`tel:${show.phone}`}
            className="text-xs text-brand-muted transition-colors hover:text-brand-white"
          >
            Call for Reservations
          </a>
        )}
      </div>

      {/* Line 3: City, State */}
      <p className="text-sm text-brand-muted">
        {show.city}, {show.state}
      </p>

      {/* Line 4: Time + Calendar + Tickets */}
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

      {/* Notes (conditional) */}
      {show.notes && (
        <p className="mt-1 text-xs italic text-brand-muted">{show.notes}</p>
      )}
    </div>
  );
}
