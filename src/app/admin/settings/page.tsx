import { client } from "@/lib/sanity";
import { siteSettingsQuery } from "@/lib/queries";
import { SettingsForm } from "./SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  let settings = null;
  try {
    settings = await client.fetch(siteSettingsQuery);
  } catch {
    // Not yet created
  }

  return (
    <div>
      <h1 className="font-heading text-2xl text-brand-white">
        Admin — Site Settings
      </h1>
      <div className="mt-6">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
