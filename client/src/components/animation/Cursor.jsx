import { useEffect, useState } from "react";

/** Glowing cursor follower — desktop only. Adds a "magnetic" dot + ring. */
export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setRing({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };
    const down = () => setActive(true);
    const up = () => setActive(false);
    const leave = () => setHidden(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9998] hidden md:block"
      style={{ opacity: hidden ? 0 : 1, transition: "opacity 0.3s ease" }}
    >
      <div
        className="fixed h-2 w-2 rounded-full bg-accent"
        style={{
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="fixed rounded-full border border-white/40"
        style={{
          left: ring.x,
          top: ring.y,
          width: active ? 50 : 34,
          height: active ? 50 : 34,
          transform: "translate(-50%, -50%)",
          transition: "width 0.25s ease, height 0.25s ease, opacity 0.25s ease",
          opacity: 0.6,
        }}
      />
    </div>
  );
}
