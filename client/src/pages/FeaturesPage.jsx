import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import SplitText from "../components/ui/SplitText.jsx";
import TextReveal from "../components/animation/TextReveal.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import SectionLabel from "../components/ui/SectionLabel.jsx";
import Parallax from "../components/animation/Parallax.jsx";
import Magnetic from "../components/animation/Magnetic.jsx";
import Preloader from "../components/animation/Preloader.jsx";
import Cursor from "../components/animation/Cursor.jsx";
import ScrollProgress from "../components/animation/ScrollProgress.jsx";
import VideoBackdrop from "../components/animation/VideoBackdrop.jsx";
import { FEATURE_PAGES, IMG } from "../lib/content.js";
import { useAuth } from "../store/authStore.js";

const ease = [0.16, 1, 0.3, 1];

export default function FeaturesPage() {
  const { user } = useAuth();
  const cta = user ? "/dashboard" : "/register";

  return (
    <div className="relative text-white">
      <Preloader />
      <Cursor />
      <ScrollProgress />
      <VideoBackdrop src={IMG.video} poster={IMG.hero} />
      <Navbar />

      {/* ===================== HERO ===================== */}
      <section className="relative z-10 mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-6 py-32 lg:px-10 lg:py-44">
        <Reveal>
          <span className="label">The product</span>
        </Reveal>
        <h1 className="mt-8 font-display display-2">
          <span className="tube block">Every feature,</span>
          <span className="block text-white/25">a chapter.</span>
        </h1>
        <Reveal className="mt-12 max-w-xl text-lg text-fog leading-relaxed">
          Four capabilities that turn a call into something you can actually use —
          each one built to keep you in the conversation, not buried in notes.
        </Reveal>
        <div className="mt-16">
          <Magnetic>
            <Link to={cta} className="btn-primary">
              {user ? "Go to dashboard" : "Start for free"} <span aria-hidden>→</span>
            </Link>
          </Magnetic>
        </div>
      </section>

      {/* ===================== BREATHING SPACE ===================== */}
      <div className="relative z-10 section-gap" />

      {/* ===================== FEATURE DEEP DIVES ===================== */}
      {FEATURE_PAGES.map((f, i) => (
        <section key={f.id} id={f.id} className="relative z-10 scroll-mt-24 border-t border-white/5">
          <div className={`mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2 lg:items-center lg:px-10 lg:py-32 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <Reveal>
              <div className="overflow-hidden rounded-2xl border border-white/5">
                <Parallax src={f.image} alt={f.title} className="aspect-[4/3] w-full" speed={60} />
              </div>
            </Reveal>

            <div>
              <div className="flex items-center gap-4">
                <span className="num text-8xl md:text-10xl">{String(i + 1).padStart(2, "0")}</span>
                <span className="label">{f.tag}</span>
              </div>
              <SplitText as="h2" className="mt-5 font-display display-3" text={f.title} />
              <Reveal className="mt-8 text-lg text-fog leading-relaxed">{f.body}</Reveal>
              <ul className="mt-12 space-y-4">
                {f.points.map((p, j) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: j * 0.08, duration: 0.6, ease }}
                    className="flex items-center gap-3 text-bone"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-xs">✓</span>
                    {p}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      {/* ===================== BREATHING SPACE ===================== */}
      <div className="relative z-10 section-gap" />

      {/* ===================== CLOSING (background video parallax) ===================== */}
      <section className="relative z-10 overflow-hidden">
        <Parallax src={IMG.video} alt="A live meeting" className="h-[60vh] w-full" speed={100} />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/55">
          <Reveal className="px-6 text-center">
            <p className="mx-auto max-w-2xl font-display display-3 font-semibold">
              One room. Every word captured. Nothing lost.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===================== BREATHING SPACE ===================== */}
      <div className="relative z-10 section-gap" />

      {/* ===================== CTA ===================== */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center lg:px-10 lg:py-32">
        <TextReveal as="h2" className="tube font-display display-3" text="Remember every meeting." stagger={0.02} />
        <div className="mt-16 flex justify-center">
          <Magnetic>
            <Link to={cta} className="btn-primary">
              {user ? "Open dashboard" : "Create your room"} <span aria-hidden>→</span>
            </Link>
          </Magnetic>
        </div>
        <Link to="/" className="mt-10 inline-block text-sm text-fog hover:text-white">
          ← Back to home
        </Link>
      </section>

      {/* ===================== FINAL BREATH ===================== */}
      <div className="relative z-10 section-gap" />

      <Footer />
    </div>
  );
}