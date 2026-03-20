"use client";

import { useState } from "react";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { MusicianCard } from "@/components/musicians/MusicianCard";
import { MusicianLightbox } from "@/components/musicians/MusicianLightbox";

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

interface MusiciansPageClientProps {
  currentMembers: MusicianData[];
  guests: MusicianData[];
}

export function MusiciansPageClient({
  currentMembers,
  guests,
}: MusiciansPageClientProps) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [guestIndex, setGuestIndex] = useState<number | null>(null);

  return (
    <>
      {/* Current Band Section */}
      <section className="py-16">
        <SectionDivider label="Bees Deluxe Musicians" />
        <div className="mt-12 grid grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {currentMembers.map((musician, index) => (
            <MusicianCard
              key={musician._id}
              musician={musician}
              index={index}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </section>

      {/* Special Guests Section */}
      <section className="py-16">
        <SectionDivider label="Bees Deluxe Special Musical Guests & Friends" />
        <div className="mt-12 grid grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {guests.map((musician, index) => (
            <MusicianCard
              key={musician._id}
              musician={musician}
              index={index}
              onClick={() => setGuestIndex(index)}
            />
          ))}
        </div>
      </section>

      {/* Independent lightboxes — one per section */}
      <MusicianLightbox
        musicians={currentMembers}
        selectedIndex={currentIndex}
        onClose={() => setCurrentIndex(null)}
        onSelect={setCurrentIndex}
      />
      <MusicianLightbox
        musicians={guests}
        selectedIndex={guestIndex}
        onClose={() => setGuestIndex(null)}
        onSelect={setGuestIndex}
      />
    </>
  );
}
