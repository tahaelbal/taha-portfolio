import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55 }}
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-left"}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-400">
        {eyebrow}
      </p>
      <h2 className="mt-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 text-base leading-8 text-slate-400 sm:text-lg">{description}</p>
      ) : null}
    </motion.div>
  );
}
