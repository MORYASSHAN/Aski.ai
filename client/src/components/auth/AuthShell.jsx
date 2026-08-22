import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ISTOCK } from "../../lib/content.js";
import GlowOrb from "../animation/GlowOrb.jsx";
import FloatingParticles from "../animation/FloatingParticles.jsx";

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="relative grid min-h-screen lg:grid-cols-2">
      {/* Left: form */}
      <div className="relative flex items-center justify-center px-6 py-16">
        <GlowOrb className="-left-20 top-20 opacity-40" size={300} color="accent" speed={18} />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-md"
        >
          <Link to="/" className="font-display text-2xl font-bold">
            Aski<span className="text-accent">.ai</span>
          </Link>
          <h1 className="mt-10 font-display text-4xl font-bold leading-tight">{title}</h1>
          {subtitle && <p className="mt-3 text-fog">{subtitle}</p>}
          <div className="mt-10">{children}</div>
          {footer && <div className="mt-8 text-sm text-fog">{footer}</div>}
        </motion.div>
      </div>

      {/* Right: visual */}
      <div className="relative hidden overflow-hidden lg:block">
        <img
          src={ISTOCK.friends}
          alt="Friends on a video call"
          className="h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        <GlowOrb className="right-10 bottom-20 opacity-50" size={350} color="accent-2" speed={20} />
        <FloatingParticles count={15} className="opacity-60" />
        <div className="absolute bottom-10 left-10 right-10">
          <p className="font-display text-2xl font-semibold leading-snug">
            "The first meeting tool that leaves me with a summary, not a headache."
          </p>
          <p className="mt-3 text-sm text-fog">— Early Aski user</p>
        </div>
      </div>
    </div>
  );
}
