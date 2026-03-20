"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface MusicianCardProps {
  musician: {
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
  };
  index: number;
  onClick?: () => void;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function truncateBio(bio: string, sentences: number): string {
  const parts = bio.split(". ");
  if (parts.length <= sentences) return bio;
  return parts.slice(0, sentences).join(". ") + ".";
}

export function MusicianCard({ musician, index, onClick }: MusicianCardProps) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const photoUrl = musician.photoUrl || musician.photo?.asset?.url;
  const name = musician.name ?? "";
  const bio = musician.bio ?? "";
  const truncated = truncateBio(bio, 2);
  const needsTruncation = truncated !== bio;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
      transition={{ duration: 0.4, delay: 0.25 + index * 0.1 }}
      onClick={onClick}
      className={onClick ? "cursor-pointer" : undefined}
    >
      {/* Photo or placeholder */}
      {photoUrl ? (
        <Image
          src={photoUrl}
          alt={name}
          width={400}
          height={600}
          className="h-auto w-full object-cover"
        />
      ) : (
        <div className="flex aspect-[3/4] w-full items-center justify-center bg-brand-charcoal">
          <span className="font-heading text-3xl text-brand-teal">
            {getInitials(name)}
          </span>
        </div>
      )}

      {/* Red background text block — flush below photo */}
      <div className="bg-brand-red p-4">
        {/* Name */}
        <h3 className="font-heading text-xl text-brand-white">{name}</h3>

        {/* Role — only shown when showRole is true */}
        {musician.showRole && (
          <p className="text-sm uppercase tracking-wide text-brand-white">
            {musician.role}
          </p>
        )}

        {/* Bio — desktop: full, mobile: truncated */}
        <div className="mt-2">
          {/* Desktop: always full */}
          <p className="hidden text-sm leading-relaxed text-brand-white md:block">
            {bio}
          </p>

          {/* Mobile: truncated with toggle */}
          <div className="md:hidden">
            <p className="text-sm leading-relaxed text-brand-white">
              {expanded ? bio : truncated}
            </p>
            {needsTruncation && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(!expanded);
                }}
                className="mt-1 text-xs text-brand-white/70"
              >
                {expanded ? "Read less" : "Read more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
