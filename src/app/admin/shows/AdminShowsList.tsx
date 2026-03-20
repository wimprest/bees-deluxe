"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { DeleteShowButton } from "./DeleteShowButton";

interface AdminShow {
  _id: string;
  date: string;
  venueName: string;
  city: string;
  state: string;
}

function ShowRow({ show }: { show: AdminShow }) {
  return (
    <div className="flex items-center justify-between border-b border-brand-teal/10 py-3">
      <p className="text-sm text-brand-white">
        {new Date(show.date).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
        {" — "}
        {show.venueName}, {show.city}, {show.state}
      </p>
      <div className="flex items-center gap-3">
        <Link
          href={`/admin/shows/${show._id}`}
          className="text-xs text-brand-teal hover:text-brand-teal-light"
        >
          Edit
        </Link>
        <DeleteShowButton id={show._id} />
      </div>
    </div>
  );
}

export function AdminShowsList({ shows }: { shows: AdminShow[] }) {
  const [openYear, setOpenYear] = useState<number | null>(null);
  const now = new Date();

  const upcoming = shows.filter((s) => new Date(s.date) >= now);
  const past = shows.filter((s) => new Date(s.date) < now);

  // Group past by year descending
  const byYear = new Map<number, AdminShow[]>();
  for (const show of past) {
    const year = new Date(show.date).getFullYear();
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push(show);
  }
  const years = Array.from(byYear.keys()).sort((a, b) => b - a);

  return (
    <>
      {/* Upcoming shows — flat list */}
      {upcoming.length > 0 && (
        <div className="mt-6">
          <h2 className="mb-2 font-heading text-sm uppercase tracking-widest text-brand-teal">
            Upcoming ({upcoming.length})
          </h2>
          <div className="space-y-1">
            {upcoming.map((show) => (
              <ShowRow key={show._id} show={show} />
            ))}
          </div>
        </div>
      )}

      {/* Past shows — year accordion, one open at a time */}
      {years.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-2 font-heading text-sm uppercase tracking-widest text-brand-teal">
            Past Shows
          </h2>
          {years.map((year) => {
            const yearShows = byYear.get(year)!;
            const isOpen = openYear === year;

            return (
              <div key={year} className="border-b border-brand-teal/10">
                <button
                  onClick={() => setOpenYear(isOpen ? null : year)}
                  className="flex w-full items-center justify-between py-4"
                >
                  <span className="font-heading text-base text-brand-white">
                    {year}{" "}
                    <span className="text-sm text-brand-muted">
                      ({yearShows.length} show
                      {yearShows.length !== 1 ? "s" : ""})
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
                    {yearShows.map((show) => (
                      <ShowRow key={show._id} show={show} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
