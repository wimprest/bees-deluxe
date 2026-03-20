interface PressQuoteProps {
  quote: {
    quote?: string;
    attribution?: string;
    publication?: string;
    publicationUrl?: string;
  };
}

export function PressQuote({ quote }: PressQuoteProps) {
  return (
    <blockquote className="border-l-2 border-brand-teal/60 pl-4 mb-8">
      <p className="text-sm italic leading-relaxed text-brand-white">
        &ldquo;{quote.quote}&rdquo;
      </p>
      <p className="mt-2 text-xs text-brand-muted">
        —{" "}
        <span className="font-bold text-brand-white">
          {quote.attribution}
        </span>
        ,{" "}
        {quote.publicationUrl ? (
          <a
            href={quote.publicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-muted transition-colors hover:text-brand-teal"
          >
            {quote.publication}
          </a>
        ) : (
          quote.publication
        )}
      </p>
    </blockquote>
  );
}
