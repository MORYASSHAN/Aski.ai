import { useEffect, useState } from "react";
import { roomsApi } from "../../services/api.js";
import { Panel, EmptyState, Spinner, fmtDate } from "../../components/dashboard/ui.jsx";

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    settings: { aiEnabled: true, recordingEnabled: false, waitingRoom: true, maxParticipants: 50, theme: "dark" },
  });
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await roomsApi.list("?limit=50");
      setRooms(res.rooms ?? []);
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
      await roomsApi.create({
        name: form.name,
        description: form.description,
        settings: form.settings,
      });
      setForm({
        name: "",
        description: "",
        settings: { aiEnabled: true, recordingEnabled: false, waitingRoom: true, maxParticipants: 50, theme: "dark" },
      });
      setShowForm(false);
      load();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this room?")) return;
    try {
      await roomsApi.remove(id);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <header className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-mute">Rooms</p>
          <h1 className="mt-2 font-display text-4xl font-bold">Your spaces</h1>
        </div>
        <button onClick={() => setShowForm((v) => !v)} className="btn-primary">
          {showForm ? "Cancel" : "New room"}
        </button>
      </header>

      {error && (
        <div className="mb-6 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {showForm && (
        <form onSubmit={onCreate} className="card-border mb-8 rounded-2xl p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-fog">Name</label>
              <input
                className="field"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Team standup"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-fog">Max participants</label>
              <input
                type="number"
                className="field"
                value={form.settings.maxParticipants}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    settings: { ...f.settings, maxParticipants: Number(e.target.value) },
                  }))
                }
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-2 block text-sm text-fog">Description</label>
            <textarea
              className="field"
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="What happens in this room?"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-6">
            {[
              ["aiEnabled", "AI features"],
              ["recordingEnabled", "Recording"],
              ["waitingRoom", "Waiting room"],
            ].map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 text-sm text-fog">
                <input
                  type="checkbox"
                  checked={form.settings[key]}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      settings: { ...f.settings, [key]: e.target.checked },
                    }))
                  }
                />
                {label}
              </label>
            ))}
          </div>
          <button type="submit" disabled={saving} className="btn-primary mt-6 disabled:opacity-60">
            {saving ? "Creating…" : "Create room"}
          </button>
        </form>
      )}

      {rooms.length === 0 && !showForm ? (
        <EmptyState title="No rooms yet" hint="Create your first room to start meeting." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <div key={room._id} className="card-border lift rounded-2xl p-6">
              <div className="flex items-start justify-between">
                <h3 className="font-display text-xl font-semibold">{room.name}</h3>
                <button
                  onClick={() => onDelete(room._id)}
                  className="text-xs text-mute hover:text-red-300"
                >
                  Delete
                </button>
              </div>
              <p className="mt-2 text-sm text-fog">{room.description || "No description"}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-white/10 px-3 py-1 text-fog">
                  {room.settings?.maxParticipants ?? 50} seats
                </span>
                {room.settings?.aiEnabled && (
                  <span className="rounded-full bg-accent/15 px-3 py-1 text-accent">AI</span>
                )}
                {room.settings?.recordingEnabled && (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-fog">Rec</span>
                )}
              </div>
              <p className="mt-4 text-xs text-mute">
                /{room.slug} · {fmtDate(room.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
