import { Link } from "react-router-dom";
import SplitText from "../ui/SplitText.jsx";
import SmoothReveal from "../animation/SmoothReveal.jsx";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-noir overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ink to-noir" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <SmoothReveal>
          <SplitText
            as="h2"
            className="max-w-4xl text-4xl font-bold leading-[1.05] md:text-6xl lg:text-7xl"
            text="Start every meeting from nothing."
          />
        </SmoothReveal>
        <SmoothReveal delay={0.2}>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link to="/register" className="btn-primary">
              Create your room
            </Link>
            <a href="/#pricing" className="btn-ghost">
              See pricing
            </a>
          </div>
        </SmoothReveal>

        <div className="mt-24 grid gap-12 border-t border-white/10 pt-12 md:grid-cols-4">
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
            <ul className="mt-6 space-y-3 text-sm text-fog">
              <li><a href="/#features" className="transition-colors hover:text-bone">Features</a></li>
              <li><a href="/#integrations" className="transition-colors hover:text-bone">Integrations</a></li>
              <li><a href="/#pricing" className="transition-colors hover:text-bone">Pricing</a></li>
              <li><Link to="/login" className="transition-colors hover:text-bone">Sign in</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-mute">Company</p>
            <ul className="mt-6 space-y-3 text-sm text-fog">
              <li><a href="#" className="transition-colors hover:text-bone">About</a></li>
              <li><a href="#" className="transition-colors hover:text-bone">Privacy</a></li>
              <li><a href="#" className="transition-colors hover:text-bone">Security</a></li>
              <li><a href="#" className="transition-colors hover:text-bone">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 text-xs text-mute md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Aski.ai — Secure by design.</span>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/MORYASSHAN"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="group grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-bone transition-all hover:border-accent hover:bg-accent/10 hover:text-accent"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.67.41.36.78 1.07.78 2.16v3.2c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/shaan-goswami-778729274/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="group grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-bone transition-all hover:border-accent hover:bg-accent/10 hover:text-accent"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
              </svg>
            </a>
          </div>

          <span>Built for teams who'd rather talk than type.</span>
        </div>
      </div>
    </footer>
  );
}
