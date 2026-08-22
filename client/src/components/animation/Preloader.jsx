import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** Cinematic intro: a brief reveal of the wordmark, then fades to reveal the page. */
export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 40%, rgba(143,182,255,0.14), transparent 70%)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative text-center"
          >
            <motion.h1
              className="font-display text-6xl font-bold tracking-tight md:text-8xl"
              initial={{ y: "40%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              Aski<span className="text-accent">.ai</span>
            </motion.h1>
            <motion.div
              className="mx-auto mt-6 h-px w-0 bg-gradient-to-r from-transparent via-accent to-transparent"
              animate={{ width: ["0%", "60%", "0%"] }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            <p className="mt-6 text-xs uppercase tracking-[0.5em] text-mute">
              Loading the room
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
