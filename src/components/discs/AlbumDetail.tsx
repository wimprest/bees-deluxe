"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { SectionDivider } from "@/components/layout/SectionDivider";

interface BuyLink {
  _key?: string;
  platform?: string;
  url?: string;
}

interface PressQuote {
  _key?: string;
  quote?: string;
  attribution?: string;
  publication?: string;
  publicationUrl?: string;
}

interface Track {
  _key?: string;
  trackNumber?: number;
  title?: string;
}

interface AlbumDetailProps {
  album: {
    title?: string;
    slug?: { current?: string };
    releaseYear?: number;
    albumType?: string;
    description?: string;
    tracklist?: Track[];
    credits?: string;
    buyLinks?: BuyLink[];
    pressQuotes?: PressQuote[];
  };
  onClose?: () => void;
}

export function AlbumDetail({ album, onClose }: AlbumDetailProps) {
  const slug = album.slug?.current ?? "";
  const isEpOrSingle =
    album.albumType === "ep" || album.albumType === "single";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Mobile close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="mb-4 flex items-center gap-1 text-sm text-brand-teal lg:hidden"
        >
          <X size={16} /> Back to albums
        </button>
      )}

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        {/* Left column: cover + buy links */}
        <div className="lg:w-[45%]">
          <Image
            src={`/images/albums/${slug}.jpg`}
            alt={album.title ?? "Album cover"}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />

          {isEpOrSingle && (
            <p className="mt-2 text-xs uppercase text-brand-muted">
              {album.albumType === "ep" ? "EP" : "Single"}
            </p>
          )}

          {/* Buy links */}
          {album.buyLinks && album.buyLinks.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-1 text-sm">
              {album.buyLinks.map((link, i) => (
                <span key={link._key ?? i} className="flex items-center">
                  {i > 0 && (
                    <span className="mx-2 text-brand-teal/50">|</span>
                  )}
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transition-colors hover:text-brand-teal-light ${
                      link.platform === "PayPal CD"
                        ? "text-brand-red"
                        : "text-brand-teal"
                    }`}
                  >
                    {link.platform}
                  </a>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right column: details */}
        <div className="lg:w-[55%]">
          {/* Title — all album titles in brand.red */}
          <h2 className="font-heading text-3xl uppercase tracking-wide text-brand-red">
            {album.title}
          </h2>

          {/* Year */}
          <p className="mt-1 text-sm text-brand-muted">{album.releaseYear}</p>

          {/* Description */}
          {album.description && (
            <p className="mt-4 text-sm leading-relaxed text-brand-white">
              {album.description}
            </p>
          )}

          {/* Tracklist */}
          {album.tracklist && album.tracklist.length > 0 && (
            <ol className="mt-4 list-none space-y-0.5">
              {album.tracklist.map((track) => (
                <li
                  key={track._key}
                  className="text-sm leading-tight text-brand-muted"
                >
                  <span className="mr-2 text-brand-teal/50">
                    {track.trackNumber}.
                  </span>
                  {track.title}
                </li>
              ))}
            </ol>
          )}

          {/* Credits */}
          {album.credits && (
            <p className="mt-4 text-xs italic text-brand-muted">
              {album.credits}
            </p>
          )}

          {/* Press Quotes */}
          {album.pressQuotes && album.pressQuotes.length > 0 && (
            <div className="mt-8">
              <SectionDivider label="Press" />
              <div className="space-y-6">
                {album.pressQuotes.map((quote) => (
                  <blockquote
                    key={quote._key}
                    className="border-l-2 border-brand-teal pl-4"
                  >
                    <p className="text-sm italic leading-relaxed text-brand-white">
                      &ldquo;{quote.quote}&rdquo;
                    </p>
                    <p className="mt-1 text-xs text-brand-muted">
                      —{" "}
                      <span className="font-bold text-brand-white">
                        {quote.attribution}
                      </span>
                      ,{" "}
                      {quote.publicationUrl ? (
                        <a
                          href={quote.publicationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-muted transition-colors hover:text-brand-teal"
                        >
                          {quote.publication}
                        </a>
                      ) : (
                        quote.publication
                      )}
                    </p>
                  </blockquote>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
