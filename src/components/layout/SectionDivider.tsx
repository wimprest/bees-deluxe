interface SectionDividerProps {
  label: string;
  className?: string;
}

export function SectionDivider({ label, className }: SectionDividerProps) {
  return (
    <div className={`relative py-8 ${className ?? ""}`}>
      <hr className="border-t border-brand-teal opacity-40" />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-black px-4 text-sm uppercase tracking-widest font-heading text-brand-teal">
        {label}
      </span>
    </div>
  );
}
