import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** Image that drifts vertically as it scrolls through the viewport. */
export default function Parallax({ src, alt = "", className = "", speed = 120 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.25 }}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
