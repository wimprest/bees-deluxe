"use server";

interface ContactFormState {
  success: boolean;
  error: string | null;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email) {
    return { success: false, error: "Name and email are required." };
  }

  // Phase 10: log submission. Upgrade to Resend or similar in Phase 13.
  console.log("Contact form submission:", { name, email, subject, message });

  return { success: true, error: null };
}
