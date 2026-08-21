import { Link } from "react-router-dom";
import SplitText from "../ui/SplitText.jsx";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-noir">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <SplitText
          as="h2"
          className="max-w-3xl text-4xl font-bold leading-[1.05] md:text-6xl"
          text="Start every meeting from nothing."
        />
        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/register" className="btn-primary">
            Create your room
          </Link>
          <a href="/#pricing" className="btn-ghost">
            See pricing
          </a>
        </div>

        <div className="mt-20 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="font-display text-2xl font-bold">
              Aski<span className="text-accent">.ai</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-fog">
              AI-powered, end-to-end encrypted video conferencing. Your rooms, your
              keys, your transcripts — turned into summaries and action items
              automatically.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-mute">Product</p>
            <ul className="mt-4 space-y-2 text-sm text-fog">
              <li><a href="/#features" className="hover:text-bone">Features</a></li>
              <li><a href="/#integrations" className="hover:text-bone">Integrations</a></li>
              <li><a href="/#pricing" className="hover:text-bone">Pricing</a></li>
              <li><Link to="/login" className="hover:text-bone">Sign in</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-mute">Company</p>
            <ul className="mt-4 space-y-2 text-sm text-fog">
              <li><a href="#" className="hover:text-bone">About</a></li>
              <li><a href="#" className="hover:text-bone">Privacy</a></li>
              <li><a href="#" className="hover:text-bone">Security</a></li>
              <li><a href="#" className="hover:text-bone">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-mute md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Aski.ai — Secure by design.</span>
          <span>Built for teams who'd rather talk than type.</span>
        </div>
      </div>
    </footer>
  );
}
