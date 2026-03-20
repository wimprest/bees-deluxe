import { client } from "@/lib/sanity";
import { allVideosQuery } from "@/lib/queries";
import { PageShell } from "@/components/layout/PageShell";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { VideoGrid } from "@/components/videos/VideoGrid";

export default async function VideosPage() {
  let videos = [];
  try {
    videos = await client.fetch(allVideosQuery);
  } catch {
    // Sanity not yet populated
  }

  return (
    <PageShell>
      <section className="py-16">
        <SectionDivider label="Bees Deluxe Videos" />
        <VideoGrid videos={videos} />
      </section>
    </PageShell>
  );
}
