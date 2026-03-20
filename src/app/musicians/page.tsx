import { client } from "@/lib/sanity";
import { allMusiciansQuery } from "@/lib/queries";
import { PageShell } from "@/components/layout/PageShell";
import { MusiciansPageClient } from "@/components/musicians/MusiciansPageClient";

interface MusicianResult {
  _id: string;
  name?: string;
  role?: string;
  showRole?: boolean;
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
      <MusiciansPageClient
        currentMembers={currentMembers}
        guests={guests}
      />
    </PageShell>
  );
}
