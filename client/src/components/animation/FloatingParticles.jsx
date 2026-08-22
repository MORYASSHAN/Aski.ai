import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function FloatingParticles({ count = 24, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-10%" });

  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 6 + Math.random() * 8,
    distance: 40 + Math.random() * 120,
  }));

  useEffect(() => {
    if (!inView) return;
  }, [inView]);

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute h-1 w-1 rounded-full bg-accent/50"
          style={{ left: p.left, top: p.top }}
          animate={{
            y: [0, -p.distance],
            opacity: [0, 0.7, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
