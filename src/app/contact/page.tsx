import { PageShell } from "@/components/layout/PageShell";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <PageShell>
      <SectionDivider label="Contact Bees Deluxe" />
      <div className="grid grid-cols-1 gap-16 py-12 md:grid-cols-[55fr_45fr]">
        {/* Left: Contact Form */}
        <ContactForm />

        {/* Right: Booking Info */}
        <div>
          <p className="text-sm uppercase tracking-widest text-brand-teal">
            Booking
          </p>
          <p className="mt-4 font-heading text-lg text-brand-white">
            Steve Gaetz
          </p>
          <a
            href="mailto:stevebigcrush@gmail.com"
            className="mt-1 block text-brand-teal transition-colors hover:text-brand-teal-light"
          >
            stevebigcrush@gmail.com
          </a>
          <a
            href="tel:9785375111"
            className="mt-1 block text-brand-teal transition-colors hover:text-brand-teal-light"
          >
            978-537-5111
          </a>
          <p className="mt-6 text-sm text-brand-muted">
            For press inquiries, interview requests, or review copies, use the
            contact form and include your publication credentials.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
