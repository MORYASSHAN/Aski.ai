import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { roomsApi, meetingsApi, bookingsApi } from "../../services/api.js";
import { StatCard, Panel, EmptyState, Spinner, fmtDate } from "../../components/dashboard/ui.jsx";
import GlowOrb from "../../components/animation/GlowOrb.jsx";

export default function DashboardHome() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ rooms: 0, meetings: 0, bookings: 0, recent: [], upcoming: [] });
  const [err, setErr] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [rooms, meetings, bookings, upcoming] = await Promise.all([
          roomsApi.list("?limit=1"),
          meetingsApi.list("?limit=5"),
          bookingsApi.list("?limit=5"),
          bookingsApi.upcoming(5),
        ]);
        if (!active) return;
        setData({
          rooms: rooms.total ?? 0,
          meetings: meetings.total ?? 0,
          bookings: bookings.total ?? 0,
          recent: meetings.meetings ?? [],
          upcoming: upcoming.bookings ?? [],
        });
      } catch (e) {
        if (active) setErr(e.message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="relative">
      <GlowOrb className="left-10 top-10 opacity-20" size={350} color="accent" speed={20} />
      <header className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-mute">Overview</p>
        <h1 className="mt-2 font-display text-4xl font-bold">Your workspace</h1>
      </header>

      {err && (
        <div className="mb-6 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {err}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Rooms" value={data.rooms} />
        <StatCard label="Meetings" value={data.meetings} />
        <StatCard label="Bookings" value={data.bookings} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel
          title="Recent meetings"
          action={
            <Link to="/dashboard/meetings" className="text-sm text-accent hover:underline">
              View all
            </Link>
          }
        >
          {data.recent.length === 0 ? (
            <EmptyState title="No meetings yet" hint="Start one from a room." />
          ) : (
            <ul className="divide-y divide-white/5">
              {data.recent.map((m) => (
                <li key={m._id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-bone">{m.roomId?.name || "Meeting"}</p>
                    <p className="text-xs text-mute">{fmtDate(m.createdAt)}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      m.endedAt
                        ? "bg-white/10 text-fog"
                        : "bg-green-500/15 text-green-300"
                    }`}
                  >
                    {m.endedAt ? "Ended" : "Live"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel
          title="Upcoming bookings"
          action={
            <Link to="/dashboard/bookings" className="text-sm text-accent hover:underline">
              View all
            </Link>
          }
        >
          {data.upcoming.length === 0 ? (
            <EmptyState title="Nothing booked" hint="Share your event link to get meetings." />
          ) : (
            <ul className="divide-y divide-white/5">
              {data.upcoming.map((b) => (
                <li key={b._id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-bone">{b.bookerName}</p>
                    <p className="text-xs text-mute">{b.eventTypeId?.title || "Booking"}</p>
                  </div>
                  <span className="text-sm text-fog">{fmtDate(b.startTime)}</span>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  );
}
