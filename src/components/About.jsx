import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

const highlights = [
  { label: "Years building", value: "5+" },
  { label: "Projects shipped", value: "6+" },
  { label: "Focus areas", value: "FULL STACK • AI & DATA" },
];

export default function About() {
  return (
    <section id="about" className="px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 rounded-3xl border border-slate-800/80 bg-slate-950/70 p-8 shadow-2xl shadow-black/20 sm:p-10 lg:flex-row lg:p-14">
        <div className="max-w-2xl">
          <SectionHeading
            eyebrow="About"
            title="Engineering modern digital experiences with code, AI, and data."
            description="I build polished experiences with a strong emphasis on usability, performance, and maintainability. My work blends product thinking with hands-on engineering across frontend, backend, and AI-enabled systems."
          />

          <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.25 }}
  transition={{ duration: 0.55, delay: 0.1 }}
  className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6"
>
  <p className="text-lg leading-8 text-slate-300">
    I&apos;m a Full Stack Developer and future AI & Data Engineer at IADATA,
    passionate about building robust digital products, intelligent solutions,
    and scalable systems. I enjoy combining software engineering, AI, and
    data to turn ideas into useful and reliable experiences.
  </p>

  <a
    href="#contact"
    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-sky-400 transition hover:text-sky-300"
  >
    Let&apos;s connect
    <ArrowRight size={16} />
  </a>
</motion.div>
        </div>

        <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {highlights.map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                <p className="text-3xl font-semibold text-white">{item.value}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.25em] text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
