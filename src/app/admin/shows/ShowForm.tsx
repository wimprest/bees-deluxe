"use client";

import { useRouter } from "next/navigation";
import { AdminFormField } from "@/components/admin/AdminFormField";
import { createShow, updateShow } from "./actions";

interface ShowFormProps {
  show?: {
    _id: string;
    date?: string;
    venueName?: string;
    venueAddress?: string;
    city?: string;
    state?: string;
    startTime?: string;
    phone?: string;
    ticketUrl?: string;
    notes?: string;
  };
}

export function ShowForm({ show }: ShowFormProps) {
  const router = useRouter();
  const isEdit = !!show;

  async function handleSubmit(formData: FormData) {
    if (isEdit) {
      await updateShow(show!._id, formData);
    } else {
      await createShow(formData);
    }
    router.push("/admin/shows");
  }

  return (
    <form action={handleSubmit} className="max-w-xl space-y-4">
      <AdminFormField
        label="Date"
        name="date"
        type="date"
        defaultValue={show?.date?.split("T")[0]}
        required
      />
      <AdminFormField
        label="Venue Name"
        name="venueName"
        defaultValue={show?.venueName}
        required
      />
      <AdminFormField
        label="Venue Address"
        name="venueAddress"
        defaultValue={show?.venueAddress}
        helper="Used for Google Maps link. Include street, city, state."
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <AdminFormField
          label="City"
          name="city"
          defaultValue={show?.city}
          required
        />
        <AdminFormField
          label="State"
          name="state"
          defaultValue={show?.state}
          required
        />
      </div>
      <AdminFormField
        label="Start Time"
        name="startTime"
        defaultValue={show?.startTime}
        placeholder='e.g. "8:00 PM"'
        required
      />
      <AdminFormField
        label="Phone"
        name="phone"
        defaultValue={show?.phone}
        helper="For 'Call for Reservations' link"
      />
      <AdminFormField
        label="Ticket URL"
        name="ticketUrl"
        type="url"
        defaultValue={show?.ticketUrl}
        helper="Advance ticket purchase link"
      />
      <AdminFormField
        label="Notes"
        name="notes"
        defaultValue={show?.notes}
        helper="e.g. 'Opening for Joanna Connor', 'No cover'"
      />
      <button
        type="submit"
        className="bg-brand-teal px-8 py-3 font-heading uppercase tracking-widest text-brand-black transition-colors hover:bg-brand-teal-dark"
      >
        {isEdit ? "Update Show" : "Publish Show"}
      </button>
    </form>
  );
}
