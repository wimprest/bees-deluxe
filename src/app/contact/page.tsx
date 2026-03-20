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

        {/* Right: Contact Info */}
        <div>
          <p className="text-sm text-brand-white">
            Fill out this form and contact us regarding any questions or requests
            and we&rsquo;ll be happy to help you or contact below:
          </p>

          {/* Press & Media */}
          <div className="mt-6">
            <p className="font-heading text-base font-bold text-brand-white">
              Press &amp; Media
            </p>
            <p className="mt-1 text-sm text-brand-white">Carol Band</p>
            <p className="text-sm text-brand-white">(617) 969 0334</p>
            <a
              href="mailto:carol@carolband.com"
              className="text-sm text-brand-teal transition-colors hover:text-brand-teal-light"
            >
              carol@carolband.com
            </a>
          </div>

          {/* Booking */}
          <div className="mt-6">
            <p className="font-heading text-base font-bold text-brand-white">
              To book Bees Deluxe
            </p>
            <a
              href="https://www.wellplayedmusic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-sm text-brand-teal transition-colors hover:text-brand-teal-light"
            >
              www.wellplayedmusic.com
            </a>
          </div>

          {/* Merch */}
          <div className="mt-6">
            <p className="font-heading text-base font-bold text-brand-white">
              T Shirts + Caps = Merch
            </p>
            <a
              href="https://bees-deluxe.printify.me/products"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-sm text-brand-teal transition-colors hover:text-brand-teal-light"
            >
              bees-deluxe.printify.me/products
            </a>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
