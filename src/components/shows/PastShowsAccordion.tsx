"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ShowListItem } from "./ShowListItem";
import type { Show } from "@/types";

interface PastShowsAccordionProps {
  shows: Show[];
}

export function PastShowsAccordion({ shows }: PastShowsAccordionProps) {
  const [openYears, setOpenYears] = useState<Set<number>>(new Set());

  // Group by year descending
  const byYear = new Map<number, Show[]>();
  for (const show of shows) {
    if (!show.date) continue;
    const year = new Date(show.date).getFullYear();
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push(show);
  }
  const years = Array.from(byYear.keys()).sort((a, b) => b - a);

  function toggleYear(year: number) {
    setOpenYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });
  }

  if (years.length === 0) return null;

  return (
    <div className="mt-8">
      {years.map((year) => {
        const yearShows = byYear.get(year)!;
        const isOpen = openYears.has(year);

        return (
          <div key={year} className="border-b border-brand-teal/10">
            <button
              onClick={() => toggleYear(year)}
              className="flex w-full items-center justify-between py-4"
            >
              <span className="font-heading text-base text-brand-white">
                {year}{" "}
                <span className="text-sm text-brand-muted">
                  ({yearShows.length} show{yearShows.length !== 1 ? "s" : ""})
                </span>
              </span>
              <ChevronDown
                size={18}
                className={`text-brand-teal transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="pb-4">
                {yearShows.map((show, index) => (
                  <div key={show._id}>
                    <ShowListItem show={show} />
                    {index < yearShows.length - 1 && (
                      <hr className="my-4 border-t border-brand-teal/20" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
