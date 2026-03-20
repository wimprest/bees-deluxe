"use client";

import { useState, useRef } from "react";
import Image from "next/image";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface ImagePickerUploadProps {
  currentUrl?: string;
  folder: string;
  onSelect: (url: string) => void;
  onRemove?: () => void;
}

export function ImagePickerUpload({
  currentUrl,
  folder,
  onSelect,
  onRemove,
}: ImagePickerUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [showGallery, setShowGallery] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_UPLOAD_PRESET;

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    if (file.size > MAX_FILE_SIZE) {
      setError("File must be under 10MB");
      return;
    }

    if (!cloudName || !uploadPreset) {
      setError("Cloudinary not configured");
      return;
    }

    setError("");
    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", folder);

    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", (evt) => {
      if (evt.lengthComputable) {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      }
    });

    xhr.addEventListener("load", () => {
      setUploading(false);
      if (xhr.status === 200) {
        const result = JSON.parse(xhr.responseText);
        onSelect(result.secure_url);
      } else {
        setError("Upload failed");
      }
    });

    xhr.addEventListener("error", () => {
      setUploading(false);
      setError("Upload failed");
    });

    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
    );
    xhr.send(formData);
  }

  async function loadGallery() {
    if (galleryImages.length > 0) {
      setShowGallery(!showGallery);
      return;
    }
    setGalleryLoading(true);
    setShowGallery(true);
    try {
      const res = await fetch(
        `/api/cloudinary-images?folder=${encodeURIComponent(folder)}`
      );
      const data = await res.json();
      setGalleryImages(data.urls || []);
    } catch {
      setError("Failed to load gallery");
    }
    setGalleryLoading(false);
  }

  return (
    <div className="space-y-3">
      {/* Current image preview */}
      {currentUrl && (
        <div className="flex items-start gap-3">
          <Image
            src={currentUrl}
            alt="Current photo"
            width={120}
            height={120}
            className="h-[120px] w-[120px] object-cover"
          />
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="text-xs text-brand-red hover:text-brand-white"
            >
              Remove
            </button>
          )}
        </div>
      )}

      {/* Upload button */}
      <div className="flex items-center gap-3">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="bg-brand-teal px-4 py-2 text-sm font-heading uppercase tracking-widest text-brand-black hover:bg-brand-teal-dark disabled:opacity-50"
        >
          {uploading
            ? `Uploading ${progress}%`
            : currentUrl
              ? "Upload New"
              : "Upload Photo"}
        </button>

        <button
          type="button"
          onClick={loadGallery}
          className="text-sm text-brand-teal hover:text-brand-teal-light"
        >
          {showGallery ? "Hide Gallery" : "Choose Existing"}
        </button>
      </div>

      {error && <p className="text-sm text-brand-red">{error}</p>}

      {/* Existing images gallery */}
      {showGallery && (
        <div className="border border-brand-teal/10 bg-brand-charcoal p-3">
          {galleryLoading ? (
            <p className="text-sm text-brand-muted">Loading...</p>
          ) : galleryImages.length === 0 ? (
            <p className="text-sm text-brand-muted">
              No existing images in this folder.
            </p>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-2">
              {galleryImages.map((url) => {
                const thumb = url.replace(
                  "/upload/",
                  "/upload/c_fill,w_160,h_160/"
                );
                const isSelected = url === currentUrl;
                return (
                  <button
                    key={url}
                    type="button"
                    onClick={() => onSelect(url)}
                    className={`aspect-square overflow-hidden ${
                      isSelected
                        ? "ring-2 ring-brand-teal"
                        : "hover:opacity-80"
                    }`}
                  >
                    <img
                      src={thumb}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
