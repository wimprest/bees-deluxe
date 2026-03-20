"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

interface AlbumForFilmstrip {
  _id: string;
  title?: string;
  slug?: { current?: string };
}

interface AlbumFilmstripProps {
  albums: AlbumForFilmstrip[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
}

export function AlbumFilmstrip({
  albums,
  selectedSlug,
  onSelect,
}: AlbumFilmstripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll selected thumbnail into view on mobile
  useEffect(() => {
    if (selectedRef.current && scrollRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedSlug]);

  return (
    <div
      ref={scrollRef}
      className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
    >
      {albums.map((album) => {
        const slug = album.slug?.current ?? "";
        const isSelected = slug === selectedSlug;

        return (
          <button
            key={album._id}
            ref={isSelected ? selectedRef : undefined}
            onClick={() => onSelect(slug)}
            className={`flex-shrink-0 transition-opacity ${
              isSelected ? "opacity-100" : "opacity-70 hover:opacity-100"
            }`}
          >
            <div
              className={`border-b-2 ${
                isSelected ? "border-brand-teal" : "border-transparent"
              }`}
            >
              <Image
                src={`/images/albums/${slug}.jpg`}
                alt={album.title ?? "Album cover"}
                width={120}
                height={120}
                className="aspect-square h-[120px] w-[120px] object-cover"
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
