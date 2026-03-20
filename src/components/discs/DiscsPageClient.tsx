"use client";

import { useState, useCallback } from "react";
import { AlbumFilmstrip } from "./AlbumFilmstrip";
import { AlbumDetail } from "./AlbumDetail";

interface AlbumData {
  _id: string;
  title?: string;
  slug?: { current?: string };
  releaseYear?: number;
  albumType?: string;
  description?: string;
  tracklist?: { _key?: string; trackNumber?: number; title?: string }[];
  credits?: string;
  featured?: boolean;
  buyLinks?: { _key?: string; platform?: string; url?: string }[];
  pressQuotes?: {
    _key?: string;
    quote?: string;
    attribution?: string;
    publication?: string;
    publicationUrl?: string;
  }[];
}

interface DiscsPageClientProps {
  albums: AlbumData[];
  initialSlug?: string;
}

export function DiscsPageClient({
  albums,
  initialSlug,
}: DiscsPageClientProps) {
  const defaultSlug =
    initialSlug ?? albums[0]?.slug?.current ?? null;

  const [selectedSlug, setSelectedSlug] = useState<string | null>(defaultSlug);
  const [showDetail, setShowDetail] = useState(!!initialSlug);

  const selectedAlbum = albums.find(
    (a) => a.slug?.current === selectedSlug
  );

  const handleSelect = useCallback(
    (slug: string) => {
      setSelectedSlug(slug);
      setShowDetail(true);
      // Update URL without triggering page transition
      window.history.pushState(null, "", `/discs/${slug}`);
    },
    []
  );

  const handleClose = useCallback(() => {
    setShowDetail(false);
    window.history.pushState(null, "", "/discs");
  }, []);

  return (
    <>
      <AlbumFilmstrip
        albums={albums}
        selectedSlug={selectedSlug}
        onSelect={handleSelect}
      />

      {/* Desktop: always show detail for selected album */}
      {selectedAlbum && (
        <div className="mt-8 hidden lg:block">
          <AlbumDetail album={selectedAlbum} />
        </div>
      )}

      {/* Mobile: show detail only when explicitly selected */}
      {showDetail && selectedAlbum && (
        <div className="mt-8 lg:hidden">
          <AlbumDetail album={selectedAlbum} onClose={handleClose} />
        </div>
      )}
    </>
  );
}
