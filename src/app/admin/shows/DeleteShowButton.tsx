"use client";

import { useRouter } from "next/navigation";
import { deleteShow } from "./actions";

export function DeleteShowButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this show?")) return;
    await deleteShow(id);
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="text-xs text-brand-red hover:text-brand-white"
    >
      Delete
    </button>
  );
}
