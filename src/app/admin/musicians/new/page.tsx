import Link from "next/link";
import { MusicianForm } from "../MusicianForm";

export default function NewMusicianPage() {
  return (
    <div>
      <Link href="/admin/musicians" className="text-sm text-brand-teal hover:text-brand-teal-light">← Back to Musicians</Link>
      <h1 className="mt-4 font-heading text-2xl text-brand-white">Admin — New Musician</h1>
      <div className="mt-6"><MusicianForm /></div>
    </div>
  );
}
