import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../../components/auth/AuthShell.jsx";
import { useAuth } from "../../store/authStore.js";

export default function Login() {
  const navigate = useNavigate();
  const { login, status, error } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate("/dashboard");
    } catch {
      /* error shown from store */
    }
  };

  return (
    <AuthShell
      title="Welcome back."
      subtitle="Log in to your encrypted rooms."
      footer={
        <>
          New to Aski?{" "}
          <Link to="/register" className="text-accent hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm text-fog">Email</label>
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={onChange}
            placeholder="you@company.com"
            className="field"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-fog">Password</label>
          <input
            name="password"
            type="password"
            required
            value={form.password}
            onChange={onChange}
            placeholder="••••••••"
            className="field"
          />
        </div>

        {error && (
          <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary w-full disabled:opacity-60"
        >
          {status === "loading" ? "Logging in…" : "Log in"}
        </button>
      </form>
    </AuthShell>
  );
}
