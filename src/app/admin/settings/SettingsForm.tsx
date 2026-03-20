"use client";

import { useState } from "react";
import { AdminFormField } from "@/components/admin/AdminFormField";
import { updateSettings } from "./actions";

interface SettingsFormProps {
  settings?: {
    heroQuote?: string;
    heroQuoteAttribution?: string;
    spotifyEmbedUrl?: string;
    bookingAgentName?: string;
    bookingAgentEmail?: string;
    bookingAgentPhone?: string;
  } | null;
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const [saved, setSaved] = useState(false);

  async function handleSubmit(formData: FormData) {
    await updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <form action={handleSubmit} className="max-w-xl space-y-6">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-widest text-brand-teal">
          Hero Section
        </p>
        <AdminFormField
          label="Hero Quote"
          name="heroQuote"
          defaultValue={settings?.heroQuote}
          placeholder="Main tagline on homepage"
        />
        <AdminFormField
          label="Hero Quote Attribution"
          name="heroQuoteAttribution"
          defaultValue={settings?.heroQuoteAttribution}
        />
      </div>

      <div className="space-y-4">
        <p className="text-xs uppercase tracking-widest text-brand-teal">
          Spotify
        </p>
        <AdminFormField
          label="Spotify Embed URL"
          name="spotifyEmbedUrl"
          type="url"
          defaultValue={settings?.spotifyEmbedUrl}
          helper="Full Spotify embed URL for homepage player"
        />
      </div>

      <div className="space-y-4">
        <p className="text-xs uppercase tracking-widest text-brand-teal">
          Booking Agent
        </p>
        <AdminFormField
          label="Name"
          name="bookingAgentName"
          defaultValue={settings?.bookingAgentName}
        />
        <AdminFormField
          label="Email"
          name="bookingAgentEmail"
          type="email"
          defaultValue={settings?.bookingAgentEmail}
        />
        <AdminFormField
          label="Phone"
          name="bookingAgentPhone"
          defaultValue={settings?.bookingAgentPhone}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="bg-brand-teal px-8 py-3 font-heading uppercase tracking-widest text-brand-black transition-colors hover:bg-brand-teal-dark"
        >
          Save Settings
        </button>
        {saved && (
          <span className="text-sm text-brand-teal">Settings saved.</span>
        )}
      </div>
    </form>
  );
}
