import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: (stagger = 0.04) => ({
    transition: { staggerChildren: stagger },
  }),
};

const wordVariant = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Cinematic text reveal — each word slides up from a masked line.
 * Used for big display headings like the reference sites.
 */
export default function SplitText({
  text,
  as: Tag = "span",
  className = "",
  stagger = 0.05,
  delay = 0,
  once = true,
}) {
  const words = String(text).split(" ");
  return (
    <Tag className={`reveal-line font-display ${className}`}>
      <motion.span
        style={{ display: "inline-block" }}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
        custom={stagger}
        transition={{ delayChildren: delay }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
          >
            <motion.span
              variants={wordVariant}
              style={{ display: "inline-block", willChange: "transform" }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
