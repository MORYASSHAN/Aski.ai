import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import SplitText from "../components/ui/SplitText.jsx";
import TextReveal from "../components/animation/TextReveal.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import SectionLabel from "../components/ui/SectionLabel.jsx";
import Marquee from "../components/ui/Marquee.jsx";
import CountUp from "../components/animation/CountUp.jsx";
import Magnetic from "../components/animation/Magnetic.jsx";
import TiltCard from "../components/animation/TiltCard.jsx";
import AnimatedBorder from "../components/animation/AnimatedBorder.jsx";
import Cursor from "../components/animation/Cursor.jsx";
import Preloader from "../components/animation/Preloader.jsx";
import ScrollProgress from "../components/animation/ScrollProgress.jsx";
import VideoBackdrop from "../components/animation/VideoBackdrop.jsx";
import Monitor3D from "../components/animation/Monitor3D.jsx";
import { IMG, ISTOCK, STORY, FEATURES, INTEGRATIONS, STATS, PRICING, PRODUCT_NARRATIVE } from "../lib/content.js";
import { useAuth } from "../store/authStore.js";

const ease = [0.16, 1, 0.3, 1];

// Each image used ONCE across the entire site
const STORY_IMG = { 2: IMG.hero, 3: IMG.meeting, 4: IMG.studio };

export default function Landing() {
  const { user } = useAuth();
  const cta = user ? "/dashboard" : "/register";

  return (
    <div className="relative text-white">
      <Preloader />
      <Cursor />
      <ScrollProgress />
      {/* Single persistent background video layer */}
      <VideoBackdrop src={IMG.video} poster={IMG.hero} />
      <Navbar />

      {/* ===================== HERO ===================== */}
      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 pb-20 lg:px-10 lg:pt-40">
        <Reveal>
          <span className="label">Aski.ai — 2026</span>
        </Reveal>

        <div className="mt-10 grid items-start gap-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="pr-10 lg:pr-20">
            <h1 className="font-display display-1">
              <span className="tube block">Meetings</span>
              <span className="block text-white/25">that don't</span>
              <span className="tube block">evaporate.</span>
            </h1>
            <Reveal className="mt-12 max-w-lg text-lg text-fog leading-relaxed">
              An AI-powered, end-to-end encrypted video room that listens, writes
              it down, and hands you the outcome — on your keys, on your terms.
            </Reveal>
            <div className="mt-16 flex flex-wrap gap-4">
              <Magnetic>
                <Link to={cta} className="btn-primary">
                  {user ? "Open dashboard" : "Start for free"} <span aria-hidden>→</span>
                </Link>
              </Magnetic>
              <Magnetic>
                <a href="#story" className="btn-ghost">
                  The story
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Goo video — used exactly once, here */}
          <div className="relative max-w-md mx-auto lg:mx-0">
            <Monitor3D src={IMG.goo} poster={IMG.hero} />
          </div>
        </div>

        <div className="mt-28 flex items-center gap-3 text-xs text-mute">
          <span className="h-px w-12 bg-white/15" /> scroll
        </div>
      </section>

      {/* ===================== BREATHING SPACE ===================== */}
      <div className="relative z-10 section-gap" />

      {/* ===================== MARQUEE (subtle) ===================== */}
      <div className="relative z-10 border-y border-white/5 py-8">
        <Marquee items={["Encrypted", "Transcribed", "Summarized", "Assigned", "Scheduled", "Yours"]} />
      </div>

      {/* ===================== THE STORY (editorial chapters) ===================== */}
      <section id="story" className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-6 lg:px-10">
        <Reveal>
          <SectionLabel className="mb-24">The story</SectionLabel>
        </Reveal>

        <div className="space-y-36 lg:space-y-48">
          {STORY.map((s, i) => {
            const img = STORY_IMG[i];
            if (!img) {
              return (
                <div key={s.n} className="mx-auto max-w-3xl text-center">
                  <div className="num text-[9rem] md:text-[14rem]">{s.n}</div>
                  <span className="label">{s.kicker}</span>
                  <SplitText as="h2" className="mt-6 font-display display-3" text={s.title} />
                  <Reveal className="mt-10 max-w-2xl mx-auto text-lg text-fog leading-relaxed">{s.body}</Reveal>
                </div>
              );
            }
            return (
              <div
                key={s.n}
                className={`grid items-center gap-16 lg:grid-cols-2 ${
                  i % 2 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal>
                  <div className="overflow-hidden rounded-2xl border border-white/5">
                    <img src={img} alt={s.title} className="aspect-[4/3] w-full object-cover" />
                  </div>
                </Reveal>
                <div>
                  <div className="num text-[8rem] md:text-[12rem]">{s.n}</div>
                  <span className="label">{s.kicker}</span>
                  <SplitText as="h2" className="mt-5 font-display display-3" text={s.title} />
                  <Reveal className="mt-8 max-w-md text-fog leading-relaxed">{s.body}</Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================== BREATHING SPACE ===================== */}
      <div className="relative z-10 section-gap" />

      {/* ===================== FEATURES (minimal cards) ===================== */}
      <section id="features" className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-6 lg:px-10">
        <Reveal>
          <SectionLabel className="mb-20">Features</SectionLabel>
        </Reveal>
        <div className="grid gap-1 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.01] md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <TiltCard key={f.title} className="bg-ink p-10">
              <div className="flex h-full flex-col">
                <span className="label">{f.tag}</span>
                <h3 className="mt-6 font-display text-2xl font-bold">{f.title}</h3>
                <p className="mt-5 text-fog">{f.body}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* ===================== BREATHING SPACE ===================== */}
      <div className="relative z-10 section-gap" />

      {/* ===================== PICTURES (3 distinct, once) ===================== */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <SectionLabel className="mb-20">In the room</SectionLabel>
        </Reveal>
        <div className="grid gap-8 md:grid-cols-3">
          {[ISTOCK.family, ISTOCK.friends, ISTOCK.connect].map((src, i) => (
            <Reveal key={src} delay={i * 0.12}>
              <div className="overflow-hidden rounded-2xl border border-white/5">
                <img src={src} alt="" className="aspect-[3/4] w-full object-cover grayscale-[0.1]" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== BREATHING SPACE ===================== */}
      <div className="relative z-10 section-gap" />

      {/* ===================== PRODUCT NARRATIVE ===================== */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 text-center lg:px-10">
        <Reveal>
          <span className="label">About the product</span>
        </Reveal>
        <TextReveal as="p" className="tube-soft mt-8 font-display display-3 leading-[1.1]" text={PRODUCT_NARRATIVE.lede} stagger={0.01} />
        <div className="mt-16 max-w-2xl mx-auto space-y-8 text-left text-lg text-fog leading-relaxed">
          {PRODUCT_NARRATIVE.paragraphs.map((p, i) => (
            <Reveal key={i} >
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== BREATHING SPACE ===================== */}
      <div className="relative z-10 section-gap" />

      {/* ===================== STATS / INTEGRATIONS ===================== */}
      <section id="integrations" className="relative z-10 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <SectionLabel className="mb-20">By the numbers</SectionLabel>
          </Reveal>
          <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="num-filled font-display text-7xl md:text-9xl">
                  {s.prefix}
                  <CountUp end={s.value} />
                  {s.suffix}
                </div>
                <p className="mt-6 text-fog">{s.label}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-28 grid gap-1 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.01] md:grid-cols-5">
            {INTEGRATIONS.map((it) => (
              <AnimatedBorder key={it.name} className="bg-ink p-10">
                <h4 className="font-display text-lg font-bold">{it.name}</h4>
                <p className="mt-3 text-sm text-fog">{it.desc}</p>
              </AnimatedBorder>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== BREATHING SPACE ===================== */}
      <div className="relative z-10 section-gap" />

      {/* ===================== PRICING ===================== */}
      <section id="pricing" className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-6 lg:px-10">
        <Reveal>
          <SectionLabel className="mb-20">Pricing</SectionLabel>
        </Reveal>
        <div className="grid gap-8 md:grid-cols-3">
          {PRICING.map((p) => (
            <TiltCard
              key={p.name}
              className={`rounded-2xl p-10 ${
                p.highlight ? "border border-white/20 bg-white/[0.02]" : "border border-white/5 bg-transparent"
              }`}
            >
              <div className="flex h-full flex-col">
                <span className="label">{p.name}</span>
                <div className="mt-8 flex items-end gap-1">
                  <span className="font-display text-5xl font-bold">{p.price}</span>
                  {p.per && <span className="text-fog">{p.per}</span>}
                </div>
                <p className="mt-6 text-fog">{p.blurb}</p>
                <ul className="mt-12 space-y-4 text-bone">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="text-white/60">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-16">
                  <Magnetic>
                    <Link to={cta} className={p.highlight ? "btn-primary w-full" : "btn-ghost w-full"}>
                      {p.cta}
                    </Link>
                  </Magnetic>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* ===================== FINAL BREATH ===================== */}
      <div className="relative z-10 section-gap" />

      <Footer />
    </div>
  );
}