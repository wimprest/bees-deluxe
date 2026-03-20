"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { generateGoogleCalendarUrl, downloadICS } from "@/lib/calendar";
import type { Show } from "@/types";

interface AddToCalendarProps {
  show: Show;
}

export function AddToCalendar({ show }: AddToCalendarProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const calendarOptions = {
    title: `Bees Deluxe at ${show.venueName}`,
    date: show.date ?? "",
    location: `${show.venueName}, ${show.venueAddress}`,
    notes: show.notes ?? undefined,
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-xs uppercase tracking-wide text-brand-teal transition-colors hover:text-brand-teal-light"
      >
        Add to Calendar
        <ChevronDown size={12} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-10 mt-1 border border-brand-teal/30 bg-brand-charcoal">
          <a
            href={generateGoogleCalendarUrl(calendarOptions)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 text-sm text-brand-white transition-colors hover:text-brand-teal"
          >
            Google Calendar
          </a>
          <button
            onClick={() => {
              downloadICS(calendarOptions);
              setOpen(false);
            }}
            className="block w-full px-3 py-2 text-left text-sm text-brand-white transition-colors hover:text-brand-teal"
          >
            Apple / Outlook
          </button>
        </div>
      )}
    </div>
  );
}
