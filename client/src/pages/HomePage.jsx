import { useEffect, useState } from "react";
import { fetchHealth } from "../services/health.service.js";

export default function HomePage() {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHealth()
      .then(setHealth)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <h1 className="text-2xl font-bold tracking-tight">
          Aski<span className="text-indigo-400">.ai</span>
        </h1>
        <p className="mt-1 text-sm text-slate-400">AI-powered secure video conferencing</p>

        <div className="mt-6 space-y-2 text-sm">
          <h2 className="font-semibold text-slate-300">API status</h2>
          {error && (
            <p className="rounded-lg bg-red-950/60 p-3 text-red-300">
              API unreachable: {error}
            </p>
          )}
          {health && (
            <ul className="space-y-1 rounded-lg bg-slate-800/60 p-3 font-mono text-xs">
              <li>status : {health.status}</li>
              <li>env    : {health.env}</li>
              <li>db     : {health.db}</li>
            </ul>
          )}
          {!health && !error && <p className="text-slate-500">Checking...</p>}
        </div>

        <p className="mt-6 text-xs text-slate-500">
          Phase 1 foundation. Auth UI, meetings and LiveKit rooms arrive in later phases.
        </p>
      </div>
    </main>
  );
}