import { motion, useScroll, useSpring } from "framer-motion";

/** Thin progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[9997] h-0.5 origin-left bg-gradient-to-r from-accent via-accent-2 to-accent-3"
      style={{ scaleX }}
    />
  );
}
