import { useEffect, useState } from "react";
import { bookingsApi } from "../../services/api.js";
import { Panel, EmptyState, Spinner, fmtDate } from "../../components/dashboard/ui.jsx";

const STATUS_STYLES = {
  confirmed: "bg-green-500/15 text-green-300",
  cancelled: "bg-red-500/15 text-red-300",
  rescheduled: "bg-amber-500/15 text-amber-300",
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await bookingsApi.list("?limit=50");
      setBookings(res.bookings ?? []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onCancel = async (id) => {
    if (!confirm("Cancel this booking?")) return;
    try {
      await bookingsApi.cancel(id);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <header className="mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-mute">Bookings</p>
        <h1 className="mt-2 font-display text-4xl font-bold">Scheduled time</h1>
      </header>

      {error && (
        <div className="mb-6 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {bookings.length === 0 ? (
        <EmptyState title="No bookings yet" hint="Share your public event link to get booked." />
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div key={b._id} className="card-border flex items-center justify-between rounded-2xl p-5">
              <div>
                <p className="font-medium text-bone">{b.bookerName}</p>
                <p className="text-xs text-mute">
                  {b.eventTypeId?.title || "Event"} · {b.bookerEmail}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-fog">{fmtDate(b.startTime)}</span>
                <span className={`rounded-full px-3 py-1 text-xs ${STATUS_STYLES[b.status] || "bg-white/10 text-fog"}`}>
                  {b.status}
                </span>
                {b.status === "confirmed" && (
                  <button
                    onClick={() => onCancel(b._id)}
                    className="text-xs text-mute hover:text-red-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
