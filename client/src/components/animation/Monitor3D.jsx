import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// A 3D computer monitor that floats and reacts to the pointer.
// `src` is a video (or image) shown on the screen.
export default function Monitor3D({
  src,
  poster,
  float = true,
  className = "",
  amplitude = 10,
}) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [amplitude, -amplitude]), {
    stiffness: 120,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-amplitude, amplitude]), {
    stiffness: 120,
    damping: 18,
  });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      className={`stage-3d ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        className="monitor"
        style={float ? { rotateX: rx, rotateY: ry } : { rotateX: ry, rotateY: rx }}
        animate={float ? { y: [0, -14, 0] } : undefined}
        transition={
          float
            ? { duration: 6, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
      >
        <div className="bezel">
          <div className="screen">
            {src ? (
              <video src={src} poster={poster} autoPlay muted loop playsInline />
            ) : (
              <img src={poster} alt="" />
            )}
            <div className="glare" />
          </div>
        </div>
        <div className="neck" />
        <div className="base" />
      </motion.div>
    </div>
  );
}
