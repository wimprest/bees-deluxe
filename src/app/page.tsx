import { PageShell } from "@/components/layout/PageShell";
import { SectionDivider } from "@/components/layout/SectionDivider";

export default function HomePage() {
  return (
    <PageShell>
      <SectionDivider label="Coming Soon" />
      <h1 className="text-center font-heading text-4xl text-brand-teal">
        Bees Deluxe
      </h1>
    </PageShell>
  );
}
