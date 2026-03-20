import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";

export default function EPKPage() {
  return (
    <PageShell>
      {/* Section 1 — Biography */}
      <section className="py-16">
        <h1 className="font-heading text-3xl text-brand-white">
          Bees Deluxe EPK
        </h1>
        <h2 className="mt-4 font-heading text-xl text-brand-teal">
          Bees Deluxe biography
        </h2>

        <div className="mt-6 space-y-4 text-sm leading-relaxed text-brand-white">
          <p>
            Winners of the 2025 New Hampshire State Blues Challenge, and
            semi-finalists at the International Blues Challenge, in Memphis,
            January 2026.
          </p>
          <p>
            Hell-bent on their mission to bring the blues into the 21st century,
            Bees Deluxe pushes the limits, colors outside the lines of
            convention and bends the genre to create a sound that is distinct,
            highly musical and yet deeply respectful of the blues tradition.
          </p>
          <p>
            Fronted and founded by British guitarist Conrad Warre, the
            band&rsquo;s repertoire includes addictive originals, as well as
            fresh takes on tunes by artists ranging from Billie Holiday to Jimi
            Hendrix. Bees Deluxe has toured from Maine to Miami winning fans,
            amazing audiences and sharing the stage with headliners like: Ronnie
            Earl, Joanne Shaw Taylor, Mike Zito, Walter Trout, Joanna Connor,
            Matt Schofield, Mike Welch and Roomful of Blues.
          </p>
          <p>
            Warre was in a high school band with Paul Kossoff, of the band Free.
            He toured Europe with Joe Jackson and The English Beat, then moved
            from London to New York where he became a fixture on the stage at the
            legendary CBGB&rsquo;s. In Boston, he formed Bees Deluxe to
            celebrate the music he fell in love with while touring and playing
            legendary London clubs like Rainbow Theatre, Ronnie Scott&rsquo;s,
            Dingwalls, The Music Machine and the Moonlight Club. Before forming
            Bees Deluxe he was Production Manager for Rykodisc the first music
            audio CD company in the States where he worked directly with Frank
            Zappa, Yoko Ono, Richard Thompson, David Bowie, Mickey Hart and
            others.
          </p>
          <p>
            Carol Band is a classically trained pianist who was recruited while
            playing jazz in Boston&rsquo;s club scene. She also writes tunes and
            wows audiences with her blazing harmonica solos.
          </p>
          <p>
            With a contagious enthusiasm, sense of fun and impeccable
            musicality, Bees Deluxe breaks all the rules and the blues are
            better for it. The band is equally adept at filling a dive bar dance
            floor or commanding a festival stage.
          </p>
        </div>

        {/* Press quote */}
        <blockquote className="mt-8 border-l-2 border-brand-teal/60 pl-4">
          <p className="text-sm italic leading-relaxed text-brand-white">
            Bees Deluxe: &ldquo;...what might happen if Freddie King took a lot
            of acid then wrote a song with Pat Metheny and asked a strung-out
            Stevie Ray Vaughan to take a solo&rdquo;
          </p>
          <p className="mt-1 text-xs text-brand-muted">
            — Blues Blast Magazine
          </p>
        </blockquote>
      </section>

      {/* Section 2 — Band Photo */}
      <section className="py-8">
        <Image
          src="/images/epk/epk-band-photo.jpg"
          alt="Bees Deluxe band photo"
          width={960}
          height={640}
          className="w-full object-cover"
        />
        <p className="mt-3 text-sm text-brand-muted">
          Bees Deluxe: for this and other photos visit{" "}
          <Link
            href="/photos"
            className="text-brand-teal transition-colors hover:text-brand-teal-light"
          >
            Photos
          </Link>
        </p>
      </section>

      {/* Section 3 — Albums */}
      <section className="py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Hallucinate */}
          <div>
            <Link href="/discs/hallucinate">
              <Image
                src="/images/albums/hallucinate.jpg"
                alt="Hallucinate"
                width={400}
                height={400}
                className="aspect-square w-full object-cover"
              />
            </Link>
            <h3 className="mt-3 font-heading text-lg text-brand-red">
              <Link href="/discs/hallucinate">Hallucinate</Link>
            </h3>
            <p className="mt-2 text-sm italic leading-relaxed text-brand-white">
              &ldquo;Hallucinate is one of those albums that come along very
              infrequently, a complete outline of musical genius, songs that have
              substance not only individually, but as an entire album&rdquo;
            </p>
            <p className="mt-1 text-xs text-brand-muted">
              —{" "}
              <span className="font-bold text-brand-white">
                Joseph Timmons
              </span>
              ,{" "}
              <a
                href="https://indiepulsemusic.com/2023/12/02/indiepulse-reviews-hallucinate-the-new-album-of-all-original-tracks-by-bees-deluxe/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-muted transition-colors hover:text-brand-teal"
              >
                Indie Pulse Reviews
              </a>
            </p>
          </div>

          {/* Voice of Dog */}
          <div>
            <Link href="/discs/voice-of-dog">
              <Image
                src="/images/albums/voice-of-dog.jpg"
                alt="Voice of Dog"
                width={400}
                height={400}
                className="aspect-square w-full object-cover"
              />
            </Link>
            <h3 className="mt-3 font-heading text-lg text-brand-red">
              <Link href="/discs/voice-of-dog">Voice of Dog</Link>
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-white">
              Voice of Dog was produced, recorded &amp; mixed by Joe Egan and
              co-produced by Warre, with special guests Richard &lsquo;Rosy&rsquo;
              Rosenblatt on harmonica, Colin Rosso on drums, and Tad McKitterick
              &amp; Jonn Smith on background vocals.
            </p>
          </div>

          {/* Mouthful of Bees */}
          <div>
            <Link href="/discs/mouthful-of-bees">
              <Image
                src="/images/albums/mouthful-of-bees.jpg"
                alt="Mouthful of Bees"
                width={400}
                height={400}
                className="aspect-square w-full object-cover"
              />
            </Link>
            <h3 className="mt-3 font-heading text-lg text-brand-red">
              <Link href="/discs/mouthful-of-bees">Mouthful of Bees</Link>
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-white">
              Mouthful of Bees was produced by Egan &amp; Warre, and it features
              three originals and seven classic blues songs re-interpreted by the
              band. Carol Band on keyboards &amp; vocals, Allyn Dorr on bass
              &amp; vocals, Paul Giovine on drums &amp; percussion and Conrad
              Warre on guitar &amp; vocals.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 — Stage Plot + Downloads */}
      <section className="py-8 pb-16">
        <Image
          src="/images/epk/stage-plot.jpg"
          alt="Bees Deluxe stage plot"
          width={960}
          height={640}
          className="w-full object-cover"
        />

        <div className="mt-6 space-y-3">
          <a
            href="https://drive.google.com/file/d/1BVMMJdYeyGdvB0ahhTwVVrdhz9yvvE01/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-brand-teal transition-colors hover:text-brand-teal-light"
          >
            <Download size={16} />
            Download the Bees Deluxe stage plot
          </a>
          <a
            href="https://drive.google.com/file/d/1lV77Ul1LsmARgtw8899H1Ublg5Q-_HA4/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-brand-teal transition-colors hover:text-brand-teal-light"
          >
            <Download size={16} />
            Download the printable interactive EPK
          </a>
        </div>
      </section>
    </PageShell>
  );
}
