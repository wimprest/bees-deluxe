import Link from "next/link";
import { ShowForm } from "../ShowForm";

export default function NewShowPage() {
  return (
    <div>
      <Link
        href="/admin/shows"
        className="text-sm text-brand-teal hover:text-brand-teal-light"
      >
        ← Back to Shows
      </Link>
      <h1 className="mt-4 font-heading text-2xl text-brand-white">
        Admin — New Show
      </h1>
      <div className="mt-6">
        <ShowForm />
      </div>
    </div>
  );
}
