"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface MusicianData {
  _id: string;
  name?: string;
  role?: string;
  showRole?: boolean;
  bio?: string;
  photoUrl?: string;
  photo?: {
    asset?: {
      _id: string;
      url: string;
    };
  } | null;
}

interface MusicianLightboxProps {
  musicians: MusicianData[];
  selectedIndex: number | null;
  onClose: () => void;
  onSelect: (index: number) => void;
}

export function MusicianLightbox({
  musicians,
  selectedIndex,
  onClose,
  onSelect,
}: MusicianLightboxProps) {
  const [fadingOut, setFadingOut] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(selectedIndex);

  // Sync displayIndex when lightbox opens
  useEffect(() => {
    if (selectedIndex !== null) {
      setDisplayIndex(selectedIndex);
      setFadingOut(false);
    }
  }, [selectedIndex]);

  const navigateTo = useCallback(
    (nextIndex: number) => {
      if (fadingOut) return;
      setFadingOut(true);
      setTimeout(() => {
        setDisplayIndex(nextIndex);
        onSelect(nextIndex);
        setFadingOut(false);
      }, 150); // half of 0.3s — fade out then fade in
    },
    [fadingOut, onSelect]
  );

  const prev = useCallback(() => {
    if (displayIndex === null) return;
    const next = (displayIndex - 1 + musicians.length) % musicians.length;
    navigateTo(next);
  }, [displayIndex, musicians.length, navigateTo]);

  const next = useCallback(() => {
    if (displayIndex === null) return;
    const nextIdx = (displayIndex + 1) % musicians.length;
    navigateTo(nextIdx);
  }, [displayIndex, musicians.length, navigateTo]);

  useEffect(() => {
    if (selectedIndex === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, onClose, prev, next]);

  // Lock body scroll when open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [selectedIndex]);

  if (selectedIndex === null || displayIndex === null) return null;

  const musician = musicians[displayIndex];
  const photoUrl = musician.photoUrl || musician.photo?.asset?.url;
  const name = musician.name ?? "";
  const bio = musician.bio ?? "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 text-brand-white transition-opacity hover:opacity-70"
        aria-label="Close"
      >
        <X size={28} />
      </button>

      {/* Prev */}
      {musicians.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-4 z-10 text-brand-white transition-opacity hover:opacity-70"
          aria-label="Previous musician"
        >
          <ChevronLeft size={36} />
        </button>
      )}

      {/* Content — desktop: side-by-side, mobile: stacked */}
      <div
        className="mx-4 max-h-[90vh] w-full max-w-4xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="transition-opacity duration-150"
          style={{ opacity: fadingOut ? 0 : 1 }}
        >
          {/* Mobile: stacked layout */}
          <div className="md:hidden">
            {photoUrl && (
              <Image
                src={photoUrl}
                alt={name}
                width={800}
                height={1000}
                className="h-auto w-full object-cover"
              />
            )}
            <div className="bg-brand-charcoal p-6">
              <h3 className="font-heading text-2xl text-brand-white">
                {name}
              </h3>
              {musician.showRole && musician.role && (
                <p className="mt-1 text-sm uppercase tracking-wider text-brand-teal">
                  {musician.role}
                </p>
              )}
              {bio && (
                <p className="mt-4 text-sm leading-relaxed text-brand-white/90">
                  {bio}
                </p>
              )}
            </div>
          </div>

          {/* Desktop: photo left, text right */}
          <div className="hidden rounded-lg bg-brand-charcoal p-6 md:flex md:gap-8">
            {photoUrl && (
              <div className="shrink-0">
                <Image
                  src={photoUrl}
                  alt={name}
                  width={400}
                  height={600}
                  className="max-h-[75vh] w-auto object-contain"
                />
              </div>
            )}
            <div className="flex flex-col justify-center py-4">
              <h3 className="font-heading text-3xl text-brand-white">
                {name}
              </h3>
              {musician.showRole && musician.role && (
                <p className="mt-2 text-sm uppercase tracking-wider text-brand-teal">
                  {musician.role}
                </p>
              )}
              {bio && (
                <p className="mt-6 text-base leading-relaxed text-brand-white/90">
                  {bio}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Next */}
      {musicians.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-4 z-10 text-brand-white transition-opacity hover:opacity-70"
          aria-label="Next musician"
        >
          <ChevronRight size={36} />
        </button>
      )}
    </div>
  );
}
