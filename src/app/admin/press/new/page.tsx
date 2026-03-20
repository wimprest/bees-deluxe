import Link from "next/link";
import { PressForm } from "../PressForm";

export default function NewPressPage() {
  return (
    <div>
      <Link href="/admin/press" className="text-sm text-brand-teal hover:text-brand-teal-light">← Back to Press</Link>
      <h1 className="mt-4 font-heading text-2xl text-brand-white">Admin — New Press Quote</h1>
      <div className="mt-6"><PressForm /></div>
    </div>
  );
}
