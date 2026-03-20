"use client";

import { useState } from "react";
import { AdminFormField } from "@/components/admin/AdminFormField";
import { updateSettings } from "./actions";

const PLATFORM_OPTIONS = [
  "YouTube",
  "Facebook",
  "Instagram",
  "SoundCloud",
  "Twitter",
  "Spotify",
];

interface SocialLink {
  platform?: string;
  url?: string;
}

interface SettingsFormProps {
  settings?: {
    heroQuote?: string;
    heroQuoteAttribution?: string;
    spotifyEmbedUrl?: string;
    bookingAgentName?: string;
    bookingAgentEmail?: string;
    bookingAgentPhone?: string;
    socialLinks?: SocialLink[];
  } | null;
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const [saved, setSaved] = useState(false);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(
    settings?.socialLinks ?? []
  );

  function addSocialLink() {
    setSocialLinks([...socialLinks, { platform: "YouTube", url: "" }]);
  }

  function removeSocialLink(index: number) {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  }

  function updateSocialLink(
    index: number,
    field: "platform" | "url",
    value: string
  ) {
    const updated = [...socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    setSocialLinks(updated);
  }

  async function handleSubmit(formData: FormData) {
    // Attach social links as JSON since they're managed in state
    formData.set("socialLinks", JSON.stringify(socialLinks));
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

      {/* Social Links */}
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-widest text-brand-teal">
          Social Links
        </p>
        <p className="text-xs text-brand-muted">
          These appear in the nav bar and footer across the site.
        </p>

        {socialLinks.map((link, index) => (
          <div key={index} className="flex items-start gap-2">
            <select
              value={link.platform ?? ""}
              onChange={(e) =>
                updateSocialLink(index, "platform", e.target.value)
              }
              className="w-36 rounded-none border border-brand-teal/20 bg-brand-slate px-3 py-3 text-sm text-brand-white focus:border-brand-teal focus:outline-none"
            >
              {PLATFORM_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <input
              type="url"
              value={link.url ?? ""}
              onChange={(e) =>
                updateSocialLink(index, "url", e.target.value)
              }
              placeholder="https://..."
              className="flex-1 rounded-none border border-brand-teal/20 bg-brand-slate px-4 py-3 text-sm text-brand-white placeholder:text-brand-muted focus:border-brand-teal focus:outline-none"
            />
            <button
              type="button"
              onClick={() => removeSocialLink(index)}
              className="px-2 py-3 text-sm text-brand-red hover:text-brand-white"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addSocialLink}
          className="text-sm text-brand-teal hover:text-brand-teal-light"
        >
          + Add Social Link
        </button>
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
