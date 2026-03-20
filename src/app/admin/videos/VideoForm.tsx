"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminFormField } from "@/components/admin/AdminFormField";
import { createVideo, updateVideo, deleteVideo } from "./actions";

interface VideoFormProps {
  video?: { _id: string; title?: string; youtubeId?: string; description?: string; featured?: boolean; order?: number };
}

export function VideoForm({ video }: VideoFormProps) {
  const router = useRouter();
  const isEdit = !!video;
  const [youtubeId, setYoutubeId] = useState(video?.youtubeId ?? "");

  async function handleSubmit(formData: FormData) {
    if (isEdit) await updateVideo(video!._id, formData);
    else await createVideo(formData);
    router.push("/admin/videos");
  }

  return (
    <form action={handleSubmit} className="max-w-xl space-y-4">
      <AdminFormField label="Title" name="title" defaultValue={video?.title} required />
      <div>
        <label className="mb-1 block text-xs uppercase tracking-wide text-brand-muted">YouTube ID <span className="text-brand-red">*</span></label>
        <input
          type="text"
          name="youtubeId"
          value={youtubeId}
          onChange={(e) => setYoutubeId(e.target.value)}
          placeholder="e.g. WSUWKOIGip0"
          required
          className="w-full rounded-none border border-brand-teal/20 bg-brand-slate px-4 py-3 text-brand-white placeholder:text-brand-muted focus:border-brand-teal focus:outline-none"
        />
        <p className="mt-1 text-xs text-brand-muted">The ID is the part after &quot;v=&quot; in a YouTube URL. Example: for youtube.com/watch?v=WSUWKOIGip0 the ID is WSUWKOIGip0</p>
        {youtubeId.length === 11 && (
          <img src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`} alt="Preview" className="mt-2 w-48" />
        )}
      </div>
      <AdminFormField label="Description" name="description" type="textarea" defaultValue={video?.description} rows={3} />
      <AdminFormField label="Order" name="order" type="number" defaultValue={String(video?.order ?? "")} />
      <div className="flex items-center gap-2">
        <input type="checkbox" id="featured" name="featured" defaultChecked={video?.featured} className="accent-brand-teal" />
        <label htmlFor="featured" className="text-sm text-brand-white">Featured (full-width on videos page)</label>
      </div>
      <div className="flex items-center justify-between">
        <button type="submit" className="bg-brand-teal px-8 py-3 font-heading uppercase tracking-widest text-brand-black hover:bg-brand-teal-dark">
          {isEdit ? "Update Video" : "Add Video"}
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={async () => {
              if (!confirm("Are you sure you want to delete this video?")) return;
              await deleteVideo(video!._id);
              router.push("/admin/videos");
            }}
            className="bg-brand-red px-6 py-3 font-heading text-sm uppercase tracking-widest text-brand-white hover:opacity-80"
          >
            Delete Video
          </button>
        )}
      </div>
    </form>
  );
}
