import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Sticky "chapter" panel. The image stays pinned while the text rises in.
 * Used for the narrative feature deep-dives.
 */
export default function PinnedChapter({ n, kicker, title, body, image, align = "left" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section ref={ref} className="relative h-[120vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.img
          src={image}
          alt=""
          style={{ scale: imgScale }}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />

        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className={`relative mx-auto w-full max-w-7xl px-6 lg:px-10 ${
            align === "right" ? "text-right" : "text-left"
          }`}
        >
          <div className={`flex items-center gap-3 ${align === "right" ? "justify-end" : ""}`}>
            <span className="font-display text-7xl font-bold text-accent/30">{n}</span>
            <span className="text-xs uppercase tracking-[0.4em] text-accent">{kicker}</span>
          </div>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.02] md:text-6xl">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-lg text-fog">{body}</p>
        </motion.div>
      </div>
    </section>
  );
}
