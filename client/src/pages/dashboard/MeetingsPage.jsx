import { useEffect, useState } from "react";
import { meetingsApi } from "../../services/api.js";
import { Panel, EmptyState, Spinner, fmtDate } from "../../components/dashboard/ui.jsx";
import AnimatedBorder from "../../components/animation/AnimatedBorder.jsx";
import TiltCard from "../../components/animation/TiltCard.jsx";

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await meetingsApi.list("?limit=50");
      setMeetings(res.meetings ?? []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await meetingsApi.create(roomId ? { roomId } : {});
      setRoomId("");
      load();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const toggle = async (m, action) => {
    try {
      await meetingsApi[action](m._id);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <header className="mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-mute">Meetings</p>
        <h1 className="mt-2 font-display text-4xl font-bold">Live & past calls</h1>
      </header>

      {error && (
        <div className="mb-6 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={onCreate} className="card-border mb-8 flex flex-col gap-3 rounded-2xl p-6 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="mb-2 block text-sm text-fog">Start a meeting (optional room slug/id)</label>
          <input
            className="field"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Leave empty to use a default room"
          />
        </div>
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Starting…" : "Start meeting"}
        </button>
      </form>

      {meetings.length === 0 ? (
        <EmptyState title="No meetings yet" hint="Start one above or from a room." />
      ) : (
        <div className="space-y-3">
          {meetings.map((m) => (
            <TiltCard key={m._id} intensity={4}>
              <AnimatedBorder speed={10}>
                <div className="relative flex items-center justify-between rounded-2xl bg-noir/80 p-5 backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        m.endedAt ? "bg-white/20" : "animate-pulse bg-green-400"
                      }`}
                    />
                    <div>
                      <p className="font-medium text-bone">{m.roomId?.name || "Meeting"}</p>
                      <p className="text-xs text-mute">{fmtDate(m.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!m.startedAt && (
                      <button
                        onClick={() => toggle(m, "start")}
                        className="rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
                      >
                        Start
                      </button>
                    )}
                    {m.startedAt && !m.endedAt && (
                      <button
                        onClick={() => toggle(m, "end")}
                        className="rounded-xl bg-red-500/20 px-4 py-2 text-sm text-red-200 hover:bg-red-500/30"
                      >
                        End
                      </button>
                    )}
                    {m.endedAt && (
                      <span className="text-xs text-mute">Ended {fmtDate(m.endedAt)}</span>
                    )}
                  </div>
                </div>
              </AnimatedBorder>
            </TiltCard>
          ))}
        </div>
      )}
    </div>
  );
}
