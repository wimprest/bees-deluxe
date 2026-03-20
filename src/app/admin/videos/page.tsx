"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface VideoItem {
  _id: string;
  title: string;
  youtubeId: string;
  featured: boolean;
  order: number;
}

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/videos")
      .then((r) => r.json())
      .then((data) => {
        setVideos(data.videos || []);
        setLoading(false);
      });
  }, []);

  async function handleMove(id: string, direction: -1 | 1) {
    const idx = videos.findIndex((v) => v._id === id);
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= videos.length) return;

    const updated = [...videos];
    [updated[idx], updated[newIdx]] = [updated[newIdx], updated[idx]];
    const reordered = updated.map((v, i) => ({ ...v, order: i }));
    setVideos(reordered);

    await fetch("/api/admin/videos/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reordered.map((v) => ({ _id: v._id, order: v.order }))),
    });
  }

  if (loading) {
    return (
      <div>
        <h1 className="font-heading text-2xl text-brand-white">Admin — Videos</h1>
        <p className="mt-4 text-brand-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl text-brand-white">Admin — Videos</h1>
        <Link href="/admin/videos/new" className="bg-brand-teal px-6 py-2 font-heading text-sm uppercase tracking-widest text-brand-black hover:bg-brand-teal-dark">
          Add Video
        </Link>
      </div>
      <div className="mt-6 space-y-1">
        {videos.map((v, idx) => (
          <div key={v._id} className="flex items-center justify-between border-b border-brand-teal/10 py-3">
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => handleMove(v._id, -1)}
                  disabled={idx === 0}
                  className="text-xs text-brand-teal disabled:opacity-30"
                  title="Move up"
                >
                  ▲
                </button>
                <button
                  onClick={() => handleMove(v._id, 1)}
                  disabled={idx === videos.length - 1}
                  className="text-xs text-brand-teal disabled:opacity-30"
                  title="Move down"
                >
                  ▼
                </button>
              </div>
              <img src={`https://img.youtube.com/vi/${v.youtubeId}/default.jpg`} alt="" className="h-10 w-14 object-cover" />
              <p className="text-sm text-brand-white">{v.title} {v.featured && <span className="text-brand-teal">★</span>}</p>
            </div>
            <Link href={`/admin/videos/${v._id}`} className="text-xs text-brand-teal hover:text-brand-teal-light">Edit</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
