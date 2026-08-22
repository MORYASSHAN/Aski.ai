import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function TiltCard({ children, className = "", intensity = 12 }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setStyle({
      rotateX,
      rotateY,
      "--glare-x": `${glareX}%`,
      "--glare-y": `${glareY}%`,
    });
  };

  const reset = () => setStyle({});

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={style}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
      className={`relative preserve-3d ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}
