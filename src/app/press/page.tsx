import Image from "next/image";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { allPressQuotesQuery } from "@/lib/queries";
import { PageShell } from "@/components/layout/PageShell";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { PressQuote } from "@/components/press/PressQuote";

const interviewLinks = [
  { label: "Q&A with Danny Coleman of New Jersey Stage", url: "https://www.newjerseystage.com/articles2/2025/03/06/rock-on-this-weeks-sound-bites3625/" },
  { label: "Q&A with Conrad Warre by Michael Limnios Blues Network", url: "https://blues.gr/m/blogpost?id=1982923%3ABlogPost%3A490807" },
  { label: "Interview with Lucky Clark for Central Maine News", url: "https://www.centralmaine.com/2022/09/28/conrad-warre-of-british-american-band-bees-deluxe-talks-about-oct-3-show-in-rockland/" },
  { label: "Ed Symkus interviews Bees Deluxe for the TAB", url: "http://www.enterprisenews.com/article/20150905/ENTERTAINMENTLIFE/150907587" },
  { label: "Michalis Limnios Interviews Bees Deluxe for Blues @ Greece", url: "http://blues.gr/profiles/blogs/an-interview-with-conrad-warre-of-bees-deluxe-an-acid-blues-rock" },
  { label: "A.J. Wachtel interviews Bees Deluxe", url: "http://www.bostonblues.com/features.php?key=storyWarre" },
  { label: "The Patriot Ledger features Bees Deluxe", url: "https://www.patriotledger.com/entertainmentlife/20181122/music-lots-of-buzz-around-newtons-bees-deluxe" },
];

const reviewLinks = [
  { label: "Hallucinate Review by Graham Munn — Blues & Booze", url: "https://rhythmbooze.wordpress.com/2023/12/27/the-bees-deluxe-hallucinate/" },
  { label: "Blues Blast Magazine reviews \"Mouthful of Bees\"", url: "http://www.bluesblastmagazine.com/bees-deluxe-mouthful-of-bees-album-review/" },
  { label: "Worcester Magazine reviews \"Mouthful of Bees\"", url: "https://www.worcestermag.com/entertainmentlife/20191201/listen-up-bees-deluxe-solid-on-mouthful-of-bees" },
  { label: "Bill Copeland Music News reviews \"Bluesapocalypse\"", url: "http://www.billcopelandmusicnews.com/2016/08/bees-deluxe-offer-spectacular-live-album-with-bluesapocalypse/" },
  { label: "Blues Blast Magazine reviews \"A Can of Bees\"", url: "http://www.bluesblastmagazine.com/bees-deluxe-a-can-of-bees-album-review/" },
  { label: "Blues Blast Magazine reviews \"Space Age Bachelor Pad Blues\"", url: "http://www.thebluesblast.com/bluesartists/beesdeluxe.htm" },
  { label: "Boston Blues Society reviews \"Space Age Bachelor Pad Blues\"", url: "http://www.bostonblues.com/features.php?key=cdBees-Space" },
  { label: "Blues Blast Magazine reviews \"Trouble in Paradise\"", url: "http://www.bluesblastmagazine.com/bees-deluxe-trouble-in-paradise-album-review/" },
  { label: "Bill Copeland Music News reviews \"Trouble in Paradise\"", url: "http://www.billcopelandmusicnews.com/2014/05/bees-deluxe-delight-and-impress-again-on-trouble-in-paradise-cd/" },
];

interface PressQuoteResult {
  _id: string;
  quote?: string;
  attribution?: string;
  publication?: string;
  publicationUrl?: string;
  order?: number;
}

export default async function PressPage() {
  let pressQuotes: PressQuoteResult[] = [];
  try {
    pressQuotes = await client.fetch(allPressQuotesQuery);
  } catch {
    // Sanity not yet populated
  }

  return (
    <PageShell>
      {/* Section 1 — Featured Photo */}
      <section className="py-16 pb-8">
        <SectionDivider label="Bees Deluxe Press" />
        <div className="mt-12">
          <Image
            src="/images/press/press-photo.jpg"
            alt="Bees Deluxe live performance"
            width={960}
            height={640}
            className="w-full object-cover"
          />
        </div>
      </section>

      {/* Section 2 — Quotes */}
      <section className="py-8">
        <div className="columns-1 gap-8 md:columns-2">
          {pressQuotes.map((quote) => (
            <div key={quote._id} className="break-inside-avoid">
              <PressQuote quote={quote} />
            </div>
          ))}
        </div>
      </section>

      {/* Section 3 — Media Inquiry CTA */}
      <section className="py-8">
        <p className="text-sm text-brand-white">
          Need an interview with Bees Deluxe — or a review copy of a Bees
          Deluxe release?
        </p>
        <p className="mt-1 text-sm text-brand-muted">
          Send your credentials via the{" "}
          <Link
            href="/contact"
            className="text-brand-teal transition-colors hover:text-brand-teal-light"
          >
            contact form
          </Link>{" "}
          and we&rsquo;ll get back in touch.
        </p>
      </section>

      {/* Section 4 — Press Links */}
      <section className="py-8 pb-16">
        <SectionDivider label="Interviews & Reviews" />
        <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-2 md:grid-cols-2">
          {/* Interviews column */}
          <div>
            <h3 className="mb-4 text-xs uppercase tracking-widest text-brand-teal">
              Interviews &amp; Features
            </h3>
            {interviewLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-2 block text-sm text-brand-white transition-colors hover:text-brand-teal"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Reviews column */}
          <div>
            <h3 className="mb-4 text-xs uppercase tracking-widest text-brand-teal">
              Album Reviews
            </h3>
            {reviewLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-2 block text-sm text-brand-white transition-colors hover:text-brand-teal"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
