import { client } from "@/lib/sanity";
import { allPhotosQuery } from "@/lib/queries";
import { PageShell } from "@/components/layout/PageShell";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { PhotoGallery } from "@/components/photos/PhotoGallery";

export default async function PhotosPage() {
  let photos = [];
  try {
    photos = await client.fetch(allPhotosQuery);
  } catch {
    // Sanity not yet populated
  }

  return (
    <PageShell>
      <section className="py-16">
        <SectionDivider label="Bees Deluxe Photos" />
        <PhotoGallery photos={photos} />
        <p className="mt-8 text-center text-xs text-brand-muted">
          Photos sourced from the Bees Deluxe archive. Additional photos on{" "}
          <a
            href="https://www.flickr.com/photos/beesdeluxe/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-teal transition-colors hover:text-brand-teal-light"
          >
            Flickr
          </a>
          .
        </p>
      </section>
    </PageShell>
  );
}
