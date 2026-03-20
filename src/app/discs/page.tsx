import { client } from "@/lib/sanity";
import { allAlbumsQuery } from "@/lib/queries";
import { PageShell } from "@/components/layout/PageShell";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { DiscsPageClient } from "@/components/discs/DiscsPageClient";

export default async function DiscsPage() {
  let albums = [];
  try {
    albums = await client.fetch(allAlbumsQuery);
  } catch {
    // Sanity not yet populated
  }

  return (
    <PageShell>
      <div className="py-16">
        <SectionDivider label="Bees Deluxe Discs" />
        <div className="mt-8">
          <DiscsPageClient albums={albums} />
        </div>
      </div>
    </PageShell>
  );
}
