export default function Marquee({ items, className = "" }) {
  const row = [...items, ...items];
  return (
    <div className={`relative overflow-hidden border-y border-white/10 py-6 ${className}`}>
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {row.map((item, i) => (
          <span
            key={i}
            className="font-display text-2xl font-medium text-bone/80 md:text-3xl"
          >
            {item}
            <span className="mx-12 text-accent">/</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
