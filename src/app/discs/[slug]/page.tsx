import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import { allAlbumsQuery, albumBySlugQuery } from "@/lib/queries";
import { PageShell } from "@/components/layout/PageShell";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { DiscsPageClient } from "@/components/discs/DiscsPageClient";

interface AlbumPageProps {
  params: Promise<{ slug: string }>;
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { slug } = await params;

  const [albums, album] = await Promise.all([
    client.fetch(allAlbumsQuery),
    client.fetch(albumBySlugQuery, { slug }),
  ]);

  if (!album) {
    notFound();
  }

  return (
    <PageShell>
      <div className="py-16">
        <SectionDivider label="Bees Deluxe Discs" />
        <div className="mt-8">
          <DiscsPageClient albums={albums} initialSlug={slug} />
        </div>
      </div>
    </PageShell>
  );
}
