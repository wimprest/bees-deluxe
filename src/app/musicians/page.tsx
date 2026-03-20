import { client } from "@/lib/sanity";
import { allMusiciansQuery } from "@/lib/queries";
import { PageShell } from "@/components/layout/PageShell";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { MusicianCard } from "@/components/musicians/MusicianCard";

interface MusicianResult {
  _id: string;
  name?: string;
  role?: string;
  bio?: string;
  isCurrentMember?: boolean;
  order?: number;
  photo?: {
    asset?: {
      _id: string;
      url: string;
    };
  } | null;
}

export default async function MusiciansPage() {
  let musicians: MusicianResult[] = [];
  try {
    musicians = await client.fetch(allMusiciansQuery);
  } catch {
    // Sanity not yet populated
  }

  const currentMembers = musicians.filter((m) => m.isCurrentMember);
  const guests = musicians.filter((m) => !m.isCurrentMember);

  return (
    <PageShell>
      {/* Current Band Section */}
      <section className="py-16">
        <SectionDivider label="Bees Deluxe Musicians" />
        <div className="mt-12 grid grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {currentMembers.map((musician, index) => (
            <MusicianCard
              key={musician._id}
              musician={musician}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Special Guests Section */}
      <section className="py-16">
        <SectionDivider label="Bees Deluxe Special Musical Guests & Friends" />
        <div className="mt-12 grid grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {guests.map((musician, index) => (
            <MusicianCard
              key={musician._id}
              musician={musician}
              index={index}
            />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
