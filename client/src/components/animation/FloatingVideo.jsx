import { motion } from "framer-motion";

// Small tilted video card that drifts — "goo videos going here and there".
export default function FloatingVideo({
  src,
  poster,
  className = "",
  rotate = -8,
  duration = 7,
  delay = 0,
}) {
  return (
    <motion.div
      className={`float-card ${className}`}
      initial={{ rotate }}
      animate={{ y: [0, -18, 0], rotate: [rotate, rotate + 3, rotate] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <video src={src} poster={poster} autoPlay muted loop playsInline />
    </motion.div>
  );
}
