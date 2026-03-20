import { format } from "date-fns";
import type { CalendarLinkOptions } from "@/types";

export function generateGoogleCalendarUrl(options: CalendarLinkOptions): string {
  const startDate = new Date(options.date);
  const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000); // 3 hour default

  const formatGoogleDate = (d: Date) => format(d, "yyyyMMdd'T'HHmmss");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: options.title,
    dates: `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`,
    location: options.location,
  });

  if (options.notes) {
    params.set("details", options.notes);
  }

  return `https://www.google.com/calendar/render?${params.toString()}`;
}

export function generateICSContent(options: CalendarLinkOptions): string {
  const startDate = new Date(options.date);
  const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000);

  const formatICSDate = (d: Date) => format(d, "yyyyMMdd'T'HHmmss");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Bees Deluxe//NONSGML v1.0//EN",
    "BEGIN:VEVENT",
    `DTSTART:${formatICSDate(startDate)}`,
    `DTEND:${formatICSDate(endDate)}`,
    `SUMMARY:${options.title}`,
    `LOCATION:${options.location}`,
    options.notes ? `DESCRIPTION:${options.notes}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
}

export function downloadICS(options: CalendarLinkOptions): void {
  const content = generateICSContent(options);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "event.ics";
  link.click();
  URL.revokeObjectURL(url);
}
