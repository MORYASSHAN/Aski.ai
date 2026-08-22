import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../store/authStore.js";
import Magnetic from "../animation/Magnetic.jsx";

const NAV = [
  { label: "Product", href: "/#story" },
  { label: "Features", href: "/#features" },
  { label: "Integrations", href: "/#integrations" },
  { label: "Pricing", href: "/#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-ink/80 backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link to="/" className="font-display text-xl font-bold tracking-tight text-white">
            Aski<span className="text-white/50">.ai</span>
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            {NAV.map((item) => (
              <Magnetic key={item.href} strength={0.2}>
                <a
                  href={item.href}
                  className="relative text-sm text-fog transition-colors hover:text-white"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
                </a>
              </Magnetic>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                <Magnetic>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="btn-ghost px-5 py-2 text-sm"
                  >
                    Dashboard
                  </button>
                </Magnetic>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="text-sm text-fog transition-colors hover:text-bone"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-fog transition-colors hover:text-bone">
                  Log in
                </Link>
                <Magnetic>
                  <Link to="/register" className="btn-primary px-5 py-2 text-sm">
                    Get started
                  </Link>
                </Magnetic>
              </>
            )}
          </div>

          <button
            className="flex h-9 w-9 items-center justify-center md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-bone transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 bg-bone transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 bg-bone transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[64px] z-40 border-b border-white/10 bg-ink/95 px-6 py-8 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-6">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-lg text-bone transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <div className="h-px bg-white/10" />
              {user ? (
                <>
                  <Link to="/dashboard" className="btn-primary" onClick={() => setOpen(false)}>
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                      navigate("/");
                    }}
                    className="text-left text-fog"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-ghost" onClick={() => setOpen(false)}>
                    Log in
                  </Link>
                  <Link to="/register" className="btn-primary" onClick={() => setOpen(false)}>
                    Get started
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
