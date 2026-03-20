"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface PhotoData {
  _id: string;
  caption?: string;
  credit?: string;
  order?: number;
  image?: {
    asset?: {
      _id: string;
      url: string;
    };
  } | null;
}

interface PhotoGalleryProps {
  photos: PhotoData[];
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const close = useCallback(() => setSelectedIndex(null), []);

  const prev = useCallback(() => {
    setSelectedIndex((i) =>
      i !== null ? (i - 1 + photos.length) % photos.length : null
    );
  }, [photos.length]);

  const next = useCallback(() => {
    setSelectedIndex((i) =>
      i !== null ? (i + 1) % photos.length : null
    );
  }, [photos.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, close, prev, next]);

  const selectedPhoto =
    selectedIndex !== null ? photos[selectedIndex] : null;

  return (
    <>
      {/* Grid */}
      <div className="mt-12 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, index) => {
          const url =
            photo.image?.asset?.url ??
            `/images/photos/photo-${String(photo.order ?? index + 1).padStart(2, "0")}.jpg`;
          return (
            <button
              key={photo._id}
              onClick={() => setSelectedIndex(index)}
              className="cursor-pointer transition-opacity hover:opacity-80"
            >
              <Image
                src={url}
                alt={photo.caption ?? "Bees Deluxe photo"}
                width={400}
                height={400}
                className="aspect-square w-full object-cover"
              />
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={close}
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute right-4 top-4 text-brand-white"
            aria-label="Close"
          >
            <X size={28} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 text-brand-white"
            aria-label="Previous photo"
          >
            <ChevronLeft size={36} />
          </button>

          {/* Image + caption */}
          <div
            className="flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={
                selectedPhoto.image?.asset?.url ??
                `/images/photos/photo-${String(selectedPhoto.order ?? (selectedIndex! + 1)).padStart(2, "0")}.jpg`
              }
              alt={selectedPhoto.caption ?? "Bees Deluxe photo"}
              width={1200}
              height={900}
              className="max-h-[85vh] max-w-[90vw] object-contain"
            />
            {selectedPhoto.caption && (
              <p className="mt-3 text-center text-sm text-brand-muted">
                {selectedPhoto.caption}
              </p>
            )}
            {selectedPhoto.credit && (
              <p className="mt-1 text-center text-xs text-brand-muted">
                Photo: {selectedPhoto.credit}
              </p>
            )}
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 text-brand-white"
            aria-label="Next photo"
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </>
  );
}
