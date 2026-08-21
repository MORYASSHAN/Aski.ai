import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import SplitText from "../components/ui/SplitText.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import SectionLabel from "../components/ui/SectionLabel.jsx";
import Marquee from "../components/ui/Marquee.jsx";
import Cursor from "../components/animation/Cursor.jsx";
import ScrollProgress from "../components/animation/ScrollProgress.jsx";
import Parallax from "../components/animation/Parallax.jsx";
import CountUp from "../components/animation/CountUp.jsx";
import HorizontalStory from "../components/animation/HorizontalStory.jsx";
import PinnedChapter from "../components/animation/PinnedChapter.jsx";
import {
  IMG,
  STORY,
  REEL,
  FEATURES,
  INTEGRATIONS,
  STATS,
  PRICING,
} from "../lib/content.js";
import { useAuth } from "../store/authStore.js";

const ease = [0.16, 1, 0.3, 1];
const prologue = STORY[0];
const chapters = STORY.slice(2, 6); // chapters 02..05
const chapterImages = [IMG.hero, IMG.meeting, IMG.studio, IMG.hero];

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="bg-ink text-bone">
      <Cursor />
      <ScrollProgress />
      <Navbar />

      {/* ---------- HERO (video) ---------- */}
      <section className="relative flex min-h-screen items-center overflow-hidden hero-glow">
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover opacity-50"
            src={IMG.video}
            poster={IMG.hero}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/55 to-ink" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-transparent to-ink/40" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-6 pt-32 pb-20 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="mb-7"
          >
            <SectionLabel>Secure AI video conferencing</SectionLabel>
          </motion.div>

          <SplitText
            as="h1"
            className="max-w-5xl text-5xl font-bold leading-[0.98] md:text-7xl lg:text-[5.5rem]"
            text="Meet like it's the future."
            stagger={0.06}
          />
          <SplitText
            as="h1"
            className="max-w-4xl text-3xl font-medium leading-[1.05] text-fog md:text-5xl lg:text-6xl"
            text="Private by default."
            delay={0.4}
            stagger={0.06}
          />

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease }}
            className="mt-8 max-w-xl text-lg text-fog"
          >
            Aski.ai is an encrypted video platform that listens, writes and follows
            up for you — live transcripts, instant summaries and action items, all
            behind keys you own.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link to={user ? "/dashboard" : "/register"} className="btn-primary">
              {user ? "Go to dashboard" : "Start for free"}
              <span aria-hidden>→</span>
            </Link>
            <a href="#story" className="btn-ghost">
              Read the story
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.1, ease }}
            className="card-border absolute right-6 top-40 hidden rounded-2xl p-5 lg:block"
          >
            <p className="text-3xl font-bold text-gradient">256-bit</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-mute">
              Encrypted rooms
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.4em] text-mute"
        >
          Scroll to explore
        </motion.div>
      </section>

      {/* ---------- PROLOGUE / MANIFESTO ---------- */}
      <section id="story" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-32 lg:px-10">
        <SectionLabel className="mb-6">Chapter {prologue.n}</SectionLabel>
        <SplitText
          as="h2"
          className="font-display text-4xl font-bold leading-[1.05] md:text-6xl"
          text={prologue.title}
        />
        <Reveal className="mt-8 text-xl text-fog md:text-2xl">{prologue.body}</Reveal>
      </section>

      {/* ---------- MARQUEE ---------- */}
      <Marquee
        items={["Encrypted", "Transcribed", "Summarized", "Scheduled", "Private", "Open"]}
      />

      {/* ---------- HORIZONTAL STORY REEL ---------- */}
      <HorizontalStory items={REEL} label="The reel" />

      {/* ---------- PINNED CHAPTERS (feature deep-dives) ---------- */}
      {chapters.map((c, i) => (
        <PinnedChapter
          key={c.n}
          n={c.n}
          kicker={c.kicker}
          title={c.title}
          body={c.body}
          image={chapterImages[i % chapterImages.length]}
          align={i % 2 === 0 ? "left" : "right"}
        />
      ))}

      {/* ---------- PARALLAX QUOTE BREAK ---------- */}
      <section className="relative">
        <Parallax src={IMG.studio} alt="Aski studio" className="h-[70vh] w-full" speed={140} />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/50">
          <Reveal className="px-6 text-center">
            <p className="mx-auto max-w-3xl font-display text-3xl font-semibold leading-snug md:text-5xl">
              “The first meeting tool that leaves me with a summary, not a
              headache.”
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- FEATURES GRID ---------- */}
      <section id="features" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-28 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel className="mb-4">What's inside</SectionLabel>
            <SplitText
              as="h2"
              className="max-w-2xl text-4xl font-bold leading-[1.05] md:text-5xl"
              text="A room that does the work."
            />
          </div>
          <Reveal className="max-w-sm text-fog">
            Aski is built so you can stay present in the conversation while the
            machine handles the memory. No plugins, no exports, no busywork.
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal
              key={f.title}
              delay={(i % 3) * 0.08}
              className="group relative bg-noir p-8 lift"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-accent">{f.tag}</span>
              <h3 className="mt-4 font-display text-2xl font-semibold">{f.title}</h3>
              <p className="mt-3 text-fog">{f.body}</p>
              <span className="absolute bottom-6 right-6 text-2xl text-white/10 transition-colors group-hover:text-accent">
                ↗
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- STATS (count-up) ---------- */}
      <section className="border-y border-white/10 bg-noir/60">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-white/5 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="bg-noir p-10 text-center">
              <p className="font-display text-4xl font-bold text-gradient md:text-5xl">
                <CountUp value={s.value} prefix={s.prefix || ""} suffix={s.suffix || ""} />
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.25em] text-mute">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- INTEGRATIONS ---------- */}
      <section id="integrations" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-28 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionLabel className="mb-4">Bring your own</SectionLabel>
            <SplitText
              as="h2"
              className="max-w-xl text-4xl font-bold leading-[1.05] md:text-5xl"
              text="Your keys. Your providers."
            />
            <Reveal className="mt-6 max-w-md text-fog">
              Connect LiveKit, speech-to-text, your LLM, email and calendar. Every
              credential is encrypted at rest and never sent to the client.
            </Reveal>
          </div>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 sm:grid-cols-2">
            {INTEGRATIONS.map((it, i) => (
              <Reveal key={it.name} delay={i * 0.06} className="bg-noir p-7 lift">
                <h3 className="font-display text-xl font-semibold">{it.name}</h3>
                <p className="mt-2 text-sm text-fog">{it.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PRICING ---------- */}
      <section id="pricing" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-28 lg:px-10">
        <div className="text-center">
          <SectionLabel className="mb-4 justify-center">Pricing</SectionLabel>
          <SplitText
            as="h2"
            className="mx-auto max-w-2xl text-4xl font-bold leading-[1.05] md:text-5xl"
            text="Simple, like the rest of it."
          />
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PRICING.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 0.08}
              className={`lift rounded-3xl p-8 ${
                p.highlight ? "card-border ring-1 ring-accent/40" : "border border-white/10"
              }`}
            >
              {p.highlight && (
                <span className="mb-4 inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-xl font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-fog">{p.blurb}</p>
              <div className="mt-6 flex items-end gap-1">
                <span className="font-display text-4xl font-bold">{p.price}</span>
                {p.per && <span className="mb-1 text-sm text-mute">{p.per}</span>}
              </div>
              <ul className="mt-6 space-y-3 text-sm text-fog">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to={user ? "/dashboard" : "/register"}
                className={`mt-8 w-full ${p.highlight ? "btn-primary" : "btn-ghost"}`}
              >
                {p.cta}
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
