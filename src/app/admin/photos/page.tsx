"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { deletePhoto } from "./actions";

interface PhotoItem {
  _id: string;
  caption?: string;
  order: number;
  imageSrc: string; // resolved at load time, stays stable through reorder
  image?: { asset?: { url: string } };
}

export default function AdminPhotosPage() {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/photos")
      .then((r) => r.json())
      .then((data) => {
        // Resolve image source once at load time so it doesn't change on reorder
        const resolved = (data.photos || []).map(
          (p: { _id: string; caption?: string; order: number; image?: { asset?: { url: string } } }) => ({
            ...p,
            imageSrc:
              p.image?.asset?.url ??
              `/images/photos/photo-${String(p.order).padStart(2, "0")}.jpg`,
          })
        );
        setPhotos(resolved);
        setLoading(false);
      });
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this photo?")) return;
    await deletePhoto(id);
    setPhotos((prev) => prev.filter((p) => p._id !== id));
  }

  async function handleMove(id: string, direction: -1 | 1) {
    const idx = photos.findIndex((p) => p._id === id);
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= photos.length) return;

    const updated = [...photos];
    [updated[idx], updated[newIdx]] = [updated[newIdx], updated[idx]];

    // Update order values but keep imageSrc stable
    const reordered = updated.map((p, i) => ({ ...p, order: i + 1 }));
    setPhotos(reordered);

    // Persist to Sanity
    await fetch("/api/admin/photos/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        reordered.map((p) => ({ _id: p._id, order: p.order }))
      ),
    });
  }

  if (loading) {
    return (
      <div>
        <h1 className="font-heading text-2xl text-brand-white">Admin — Photos</h1>
        <p className="mt-4 text-brand-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl text-brand-white">
          Admin — Photos
        </h1>
        <Link
          href="/admin/photos/new"
          className="bg-brand-teal px-6 py-2 font-heading text-sm uppercase tracking-widest text-brand-black hover:bg-brand-teal-dark"
        >
          Upload Photo
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, idx) => (
          <div
            key={photo._id}
            className="border border-brand-teal/10 bg-brand-charcoal"
          >
            <div className="aspect-square">
              <img
                src={photo.imageSrc}
                alt={photo.caption ?? ""}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex items-center justify-between px-2 py-2">
              <p className="truncate text-xs text-brand-muted">
                {photo.caption || `Photo ${idx + 1}`}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleMove(photo._id, -1)}
                  disabled={idx === 0}
                  className="text-xs text-brand-teal disabled:opacity-30"
                  title="Move left"
                >
                  ←
                </button>
                <button
                  onClick={() => handleMove(photo._id, 1)}
                  disabled={idx === photos.length - 1}
                  className="text-xs text-brand-teal disabled:opacity-30"
                  title="Move right"
                >
                  →
                </button>
                <button
                  onClick={() => handleDelete(photo._id)}
                  className="text-xs text-brand-red hover:text-brand-white"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
