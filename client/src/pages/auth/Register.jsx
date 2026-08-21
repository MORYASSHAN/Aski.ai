import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../../components/auth/AuthShell.jsx";
import { useAuth } from "../../store/authStore.js";

export default function Register() {
  const navigate = useNavigate();
  const { register, status, error } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/dashboard");
    } catch {
      /* error shown from store */
    }
  };

  return (
    <AuthShell
      title="Create your room."
      subtitle="Free to start. No card required."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-accent hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm text-fog">Full name</label>
          <input
            name="name"
            required
            value={form.name}
            onChange={onChange}
            placeholder="Ada Lovelace"
            className="field"
          />
        </div>
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
            minLength={8}
            value={form.password}
            onChange={onChange}
            placeholder="At least 8 characters"
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
          {status === "loading" ? "Creating…" : "Create account"}
        </button>
      </form>
    </AuthShell>
  );
}
