"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface MusicianCardProps {
  musician: {
    _id: string;
    name?: string;
    role?: string;
    bio?: string;
    photo?: {
      asset?: {
        _id: string;
        url: string;
      };
    } | null;
  };
  index: number;
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

export function MusicianCard({ musician, index }: MusicianCardProps) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const photoUrl = musician.photo?.asset?.url;
  const name = musician.name ?? "";
  const bio = musician.bio ?? "";
  const truncated = truncateBio(bio, 2);
  const needsTruncation = truncated !== bio;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {/* Photo or placeholder */}
      {photoUrl ? (
        <Image
          src={photoUrl}
          alt={name}
          width={400}
          height={400}
          className="aspect-square w-full object-cover"
        />
      ) : (
        <div className="flex aspect-square w-full items-center justify-center bg-brand-charcoal">
          <span className="font-heading text-3xl text-brand-teal">
            {getInitials(name)}
          </span>
        </div>
      )}

      {/* Name */}
      <h3 className="mt-3 font-heading text-xl text-brand-white">{name}</h3>

      {/* Role */}
      <p className="text-sm uppercase tracking-wide text-brand-teal">
        {musician.role}
      </p>

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
              onClick={() => setExpanded(!expanded)}
              className="mt-1 text-xs text-brand-teal"
            >
              {expanded ? "Read less" : "Read more"}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
