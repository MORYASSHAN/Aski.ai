export default function SectionLabel({ children, className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      <span className="text-xs font-medium uppercase tracking-[0.35em] text-fog">
        {children}
      </span>
    </div>
  );
}
