import { motion } from "framer-motion";

export default function AnimatedBorder({ children, className = "", speed = 8 }) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute -inset-[1px] rounded-[inherit] bg-gradient-to-r from-accent via-accent-2 to-accent-3"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ backgroundSize: "200% 200%" }}
      />
      <div className="relative rounded-[inherit] bg-noir">{children}</div>
    </div>
  );
}
