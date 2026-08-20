import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function LayoutShell({ children }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.18),transparent_30%)]" />
      <div className="relative z-10">{children}</div>
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="fixed bottom-6 right-6 hidden rounded-full border border-slate-700 bg-slate-900/80 p-3 text-slate-200 shadow-lg shadow-black/20 backdrop-blur md:flex"
      >
        <ArrowDown className="rotate-180" size={18} />
      </motion.a>
    </div>
  );
}
