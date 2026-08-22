import { motion } from "framer-motion";

const charVariant = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      delay: i * 0.03,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function TextReveal({ text, className = "", once = true, stagger = 0.03 }) {
  const chars = Array.from(String(text));

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          custom={i * stagger}
          variants={charVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once }}
          className="inline-block"
          style={{ willChange: "transform, opacity, filter" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
