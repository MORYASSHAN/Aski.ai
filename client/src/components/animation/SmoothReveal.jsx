import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function SmoothReveal({ children, className = "", delay = 0, duration = 1.2 }) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    controls.start({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
    });
  }, [controls, inView, delay, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}
