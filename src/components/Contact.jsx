import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl rounded-4xl border border-slate-800/80 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 p-8 shadow-2xl shadow-black/20 sm:p-10 lg:p-14">
        <SectionHeading
          eyebrow="Contact"
          title="Ready to build something meaningful?"
          description="If you need a thoughtful developer for a product, a landing experience, or an AI-enabled platform, I would love to hear from you."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="mt-12 flex flex-col items-center justify-center gap-6"
        >
          <a
            href="mailto:hello@tahaelbal.dev"
            className="inline-flex items-center gap-3 rounded-full border border-slate-700 bg-slate-950/70 px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-200 transition hover:border-sky-400 hover:text-sky-300"
          >
            <Mail size={18} />
            hello@tahaelbal.dev
          </a>
          <a
            href="#hero"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-sky-400 transition hover:text-sky-300"
          >
            Back to top
            <Send size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
