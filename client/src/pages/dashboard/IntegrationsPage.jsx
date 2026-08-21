import { useEffect, useState } from "react";
import { integrationsApi } from "../../services/api.js";
import { Panel, EmptyState, Spinner } from "../../components/dashboard/ui.jsx";

const CATEGORIES = [
  { value: "livekit", label: "LiveKit" },
  { value: "stt", label: "Speech-to-Text" },
  { value: "llm", label: "LLM" },
  { value: "email", label: "Email" },
  { value: "calendar", label: "Calendar" },
];

const STATUS_STYLES = {
  active: "bg-green-500/15 text-green-300",
  invalid: "bg-red-500/15 text-red-300",
  revoked: "bg-white/10 text-fog",
};

export default function IntegrationsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ category: "livekit", provider: "", credentials: "" });
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await integrationsApi.list();
      setItems(res.integrations ?? []);
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
      let credentials = {};
      try {
        credentials = JSON.parse(form.credentials || "{}");
      } catch {
        throw new Error("Credentials must be valid JSON, e.g. {\"apiKey\":\"...\"}");
      }
      await integrationsApi.create({
        category: form.category,
        provider: form.provider,
        credentials,
      });
      setForm({ category: "livekit", provider: "", credentials: "" });
      setShowForm(false);
      load();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const onRemove = async (id) => {
    if (!confirm("Remove this integration?")) return;
    try {
      await integrationsApi.remove(id);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const onValidate = async (id) => {
    try {
      await integrationsApi.validate(id);
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
          <p className="text-sm uppercase tracking-[0.3em] text-mute">Integrations</p>
          <h1 className="mt-2 font-display text-4xl font-bold">Bring your own keys</h1>
        </div>
        <button onClick={() => setShowForm((v) => !v)} className="btn-primary">
          {showForm ? "Cancel" : "Add integration"}
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
              <label className="mb-2 block text-sm text-fog">Category</label>
              <select
                className="field"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value} className="bg-noir">
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm text-fog">Provider</label>
              <input
                className="field"
                required
                value={form.provider}
                onChange={(e) => setForm((f) => ({ ...f, provider: e.target.value }))}
                placeholder="e.g. livekit-cloud"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-2 block text-sm text-fog">Credentials (JSON)</label>
            <textarea
              className="field font-mono text-xs"
              rows={4}
              value={form.credentials}
              onChange={(e) => setForm((f) => ({ ...f, credentials: e.target.value }))}
              placeholder='{ "apiKey": "...", "apiSecret": "..." }'
            />
          </div>
          <button type="submit" disabled={saving} className="btn-primary mt-6 disabled:opacity-60">
            {saving ? "Saving…" : "Encrypt & save"}
          </button>
        </form>
      )}

      {items.length === 0 && !showForm ? (
        <EmptyState
          title="No integrations connected"
          hint="Add LiveKit, STT, LLM, email or calendar credentials. Stored encrypted."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div key={it._id} className="card-border rounded-2xl p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold">{it.provider}</h3>
                  <p className="text-xs uppercase tracking-widest text-mute">{it.category}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs ${STATUS_STYLES[it.status] || "bg-white/10 text-fog"}`}>
                  {it.status}
                </span>
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => onValidate(it._id)}
                  className="rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
                >
                  Validate
                </button>
                <button
                  onClick={() => onRemove(it._id)}
                  className="text-xs text-mute hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
