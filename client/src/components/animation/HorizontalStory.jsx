import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SplitText from "../ui/SplitText.jsx";

/**
 * Horizontal-scrolling "film reel" of story beats. The section is tall;
 * the inner track locks (sticky) and translates left as you scroll.
 */
export default function HorizontalStory({ items, label = "The reel" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);

  return (
    <section ref={ref} className="relative h-[320vh] bg-ink">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex h-full items-center gap-8 pl-[6vw] pr-[20vw]">
          {/* Intro panel */}
          <div className="flex h-[60vh] w-[42vw] shrink-0 flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.4em] text-accent">{label}</span>
            <SplitText
              as="h2"
              className="mt-4 font-display text-5xl font-bold leading-[1.02] md:text-7xl"
              text="Six beats. One remembered meeting."
            />
            <p className="mt-6 max-w-sm text-fog">
              Scroll to move through the Aski story — each frame a capability that
              turns talk into something you can use.
            </p>
          </div>

          {items.map((item, i) => (
            <article
              key={i}
              className="card-border flex h-[60vh] w-[34vw] shrink-0 flex-col justify-between rounded-3xl p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-6xl font-bold text-white/10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="rounded-full bg-accent/15 px-3 py-1 text-xs uppercase tracking-widest text-accent">
                  {item.tag}
                </span>
              </div>
              <div>
                <h3 className="font-display text-3xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-fog">{item.text}</p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
