import { motion } from "framer-motion";

export function StatCard({ label, value, sub }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="card-border rounded-2xl p-6"
    >
      <p className="font-display text-3xl font-bold text-gradient">{value}</p>
      <p className="mt-1 text-sm text-fog">{label}</p>
      {sub && <p className="mt-1 text-xs text-mute">{sub}</p>}
    </motion.div>
  );
}

export function Panel({ title, action, children, className = "" }) {
  return (
    <section className={`card-border rounded-2xl p-6 ${className}`}>
      {(title || action) && (
        <div className="mb-5 flex items-center justify-between">
          {title && <h2 className="font-display text-lg font-semibold">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function EmptyState({ title, hint }) {
  return (
    <div className="rounded-xl border border-dashed border-white/10 px-6 py-10 text-center">
      <p className="text-fog">{title}</p>
      {hint && <p className="mt-1 text-sm text-mute">{hint}</p>}
    </div>
  );
}

export function Spinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-accent" />
    </div>
  );
}

export function fmtDate(d) {
  if (!d) return "—";
  const date = new Date(d);
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
