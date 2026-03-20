export function SiteTagline() {
  return (
    <div className="w-full border-b border-brand-teal/10 bg-brand-black py-3">
      <p className="mx-auto max-w-[960px] px-4 text-center text-xs leading-relaxed text-brand-muted sm:px-6 sm:text-sm">
        Bees Deluxe —{" "}
        <span className="italic text-brand-white">
          &ldquo;This is what Steely Dan would sound like if they played the
          blues&rdquo;
        </span>{" "}
        — <span className="font-bold text-brand-white">John Kereiff</span>, The
        Rock Doctors Hot Wax Album Reviews.
      </p>
    </div>
  );
}
