import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";
import { ShowForm } from "../ShowForm";

const showByIdQuery = groq`*[_type == "show" && _id == $id][0]`;

export const dynamic = "force-dynamic";

interface EditShowPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditShowPage({ params }: EditShowPageProps) {
  const { id } = await params;
  const show = await client.fetch(showByIdQuery, { id });

  if (!show) notFound();

  return (
    <div>
      <Link
        href="/admin/shows"
        className="text-sm text-brand-teal hover:text-brand-teal-light"
      >
        ← Back to Shows
      </Link>
      <h1 className="mt-4 font-heading text-2xl text-brand-white">
        Admin — Edit Show
      </h1>
      <div className="mt-6">
        <ShowForm show={show} />
      </div>
    </div>
  );
}
