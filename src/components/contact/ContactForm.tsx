"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/app/contact/actions";

const inputStyles =
  "w-full rounded-none border border-brand-teal/20 bg-brand-slate px-4 py-3 text-brand-white placeholder:text-brand-muted focus:border-brand-teal focus:outline-none";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, {
    success: false,
    error: null,
  });

  if (state.success) {
    return (
      <p className="py-8 text-brand-teal">
        Thanks for reaching out. We&rsquo;ll be in touch soon.
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm text-brand-white"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your name"
          required
          className={inputStyles}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm text-brand-white"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="your@email.com"
          required
          className={inputStyles}
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="mb-1 block text-sm text-brand-white"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          placeholder="Subject"
          className={inputStyles}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1 block text-sm text-brand-white"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Message"
          className={inputStyles}
        />
      </div>

      {state.error && (
        <p className="text-sm text-brand-red">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-brand-teal px-8 py-3 font-heading uppercase tracking-widest text-brand-black transition-colors hover:bg-brand-teal-dark disabled:opacity-50 md:w-auto"
      >
        {isPending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
