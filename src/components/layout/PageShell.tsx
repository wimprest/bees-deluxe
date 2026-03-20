interface PageShellProps {
  children: React.ReactNode;
  className?: string;
}

export function PageShell({ children, className }: PageShellProps) {
  return (
    <div className="w-full bg-brand-black">
      <div className={`mx-auto max-w-[960px] px-4 sm:px-6 ${className ?? ""}`}>
        {children}
      </div>
    </div>
  );
}
