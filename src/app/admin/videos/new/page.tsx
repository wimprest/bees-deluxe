import Link from "next/link";
import { VideoForm } from "../VideoForm";

export default function NewVideoPage() {
  return (
    <div>
      <Link href="/admin/videos" className="text-sm text-brand-teal hover:text-brand-teal-light">← Back to Videos</Link>
      <h1 className="mt-4 font-heading text-2xl text-brand-white">Admin — New Video</h1>
      <div className="mt-6"><VideoForm /></div>
    </div>
  );
}
