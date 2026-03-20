"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface PressItem {
  _id: string;
  quote: string;
  attribution: string;
  order: number;
}

export default function AdminPressPage() {
  const [quotes, setQuotes] = useState<PressItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/press")
      .then((r) => r.json())
      .then((data) => {
        setQuotes(data.quotes || []);
        setLoading(false);
      });
  }, []);

  async function handleMove(id: string, direction: -1 | 1) {
    const idx = quotes.findIndex((q) => q._id === id);
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= quotes.length) return;

    const updated = [...quotes];
    [updated[idx], updated[newIdx]] = [updated[newIdx], updated[idx]];
    const reordered = updated.map((q, i) => ({ ...q, order: i + 1 }));
    setQuotes(reordered);

    await fetch("/api/admin/press/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reordered.map((q) => ({ _id: q._id, order: q.order }))),
    });
  }

  if (loading) {
    return (
      <div>
        <h1 className="font-heading text-2xl text-brand-white">Admin — Press Quotes</h1>
        <p className="mt-4 text-brand-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl text-brand-white">Admin — Press Quotes</h1>
        <Link href="/admin/press/new" className="bg-brand-teal px-6 py-2 font-heading text-sm uppercase tracking-widest text-brand-black hover:bg-brand-teal-dark">
          Add Quote
        </Link>
      </div>
      <div className="mt-6 space-y-1">
        {quotes.map((q, idx) => (
          <div key={q._id} className="flex items-center justify-between border-b border-brand-teal/10 py-3">
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => handleMove(q._id, -1)}
                  disabled={idx === 0}
                  className="text-xs text-brand-teal disabled:opacity-30"
                  title="Move up"
                >
                  ▲
                </button>
                <button
                  onClick={() => handleMove(q._id, 1)}
                  disabled={idx === quotes.length - 1}
                  className="text-xs text-brand-teal disabled:opacity-30"
                  title="Move down"
                >
                  ▼
                </button>
              </div>
              <span className="w-6 text-center text-xs text-brand-muted">{idx + 1}</span>
              <p className="text-sm text-brand-white">
                {q.quote?.substring(0, 60)}... <span className="text-brand-muted">— {q.attribution}</span>
              </p>
            </div>
            <Link href={`/admin/press/${q._id}`} className="text-xs text-brand-teal hover:text-brand-teal-light">Edit</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
