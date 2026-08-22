import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function GlowOrb({ className = "", size = 500, color = "accent", speed = 20 }) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-20%" });

  useEffect(() => {
    if (!inView) return;
    const animate = async () => {
      await controls.start({
        x: [0, 60, -40, 0],
        y: [0, -50, 30, 0],
        scale: [1, 1.15, 0.9, 1],
        transition: {
          duration: speed,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      });
    };
    animate();
  }, [controls, inView, speed]);

  const colorMap = {
    accent: "bg-accent/25 blur-[120px]",
    white: "bg-white/15 blur-[100px]",
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ x: 0, y: 0, scale: 1 }}
      className={`pointer-events-none absolute rounded-full ${colorMap[color] || colorMap.accent} ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
