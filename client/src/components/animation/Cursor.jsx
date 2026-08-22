import { useEffect, useState, useRef } from "react";

const lerp = (a, b, n) => a + (b - a) * n;

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(true);
  const ringRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf;
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };
    const down = () => setActive(true);
    const up = () => setActive(false);
    const leave = () => setHidden(true);

    const animateRing = () => {
      ringRef.current.x = lerp(ringRef.current.x, pos.x, 0.15);
      ringRef.current.y = lerp(ringRef.current.y, pos.y, 0.15);
      setRing({ x: ringRef.current.x, y: ringRef.current.y });
      raf = requestAnimationFrame(animateRing);
    };
    raf = requestAnimationFrame(animateRing);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [pos.x, pos.y]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9998] hidden md:block"
      style={{ opacity: hidden ? 0 : 1, transition: "opacity 0.3s ease" }}
    >
      <div
        className="fixed h-1.5 w-1.5 rounded-full bg-accent"
        style={{
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
          mixBlendMode: "screen",
          transition: "transform 0.1s ease-out",
        }}
      />
      <div
        className="fixed rounded-full border border-white/30"
        style={{
          left: ring.x,
          top: ring.y,
          width: active ? 56 : 36,
          height: active ? 56 : 36,
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          opacity: 0.5,
        }}
      />
    </div>
  );
}
