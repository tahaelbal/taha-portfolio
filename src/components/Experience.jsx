import { motion } from "framer-motion";

const education = [
  {
    number: "01",
    title: "Ingénierie Informatique et Réseaux",
    school: "EMSI — École Marocaine des Sciences de l'Ingénieur",
    period: "2024 — PRESENT",
  },
  {
    number: "02",
    title: "Web Marketing",
    school: "ISTA NTIC SYBA",
    period: "2023 — 2024",
  },
  {
    number: "03",
    title: "Digital Development – Web Full Stack",
    school: "ISTA NTIC SYBA",
    period: "2021 — 2023",
  },
  {
    number: "04",
    title: "Baccalaureate – Sciences",
    school: "Youssef Ben Tachfine High School",
    period: "2020 — 2021",
  },
];

const languages = [
  {
    name: "Arabic",
    level: "Native",
    progress: "100%",
  },
  {
    name: "English",
    level: "Upper-Intermediate (B2)",
    progress: "75%",
  },
  {
    name: "French",
    level: "Upper-Intermediate (B2)",
    progress: "75%",
  },
];

export default function Experience() {
  return (
    <section
      id="education"
      className="relative overflow-hidden bg-[#071225] py-20 text-white md:py-28"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[160px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[180px]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-12">

        {/* MAIN GRID */}
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">

          {/* ================= EDUCATION ================= */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >

            {/* Header */}
            <div className="mb-8 flex items-center justify-between border-b border-slate-800 pb-6">

              <div className="flex items-center gap-4">

                <span className="h-px w-10 bg-cyan-400" />

                <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">
                  Education
                </h2>

              </div>

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                4 Diplomas
              </span>

            </div>

            {/* Education Items */}
            <div>

              {education.map((item, index) => (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="group border-b border-slate-800"
                >

                  <div className="grid grid-cols-[40px_1fr_auto] items-center gap-4 py-7 md:grid-cols-[50px_1fr_auto] md:gap-6 md:py-8">

                    {/* Number */}
                    <span className="text-xs font-semibold text-slate-600 transition-colors group-hover:text-cyan-400">
                      {item.number}
                    </span>

                    {/* Content */}
                    <div>

                      <h3 className="text-lg font-bold text-white transition-colors group-hover:text-cyan-400 md:text-xl">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-cyan-500/80">
                        {item.school}
                      </p>

                    </div>

                    {/* Period */}
                    <span className="text-right text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 transition-colors group-hover:text-cyan-400">
                      {item.period}
                    </span>

                  </div>

                  {/* Hover Line */}
                  <div className="h-px w-0 bg-cyan-400 transition-all duration-500 group-hover:w-full" />

                </motion.div>
              ))}

            </div>

          </motion.div>


          {/* ================= LANGUAGES ================= */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >

            {/* Header */}
            <div className="mb-8 flex items-center justify-between border-b border-slate-800 pb-6">

              <div className="flex items-center gap-4">

                <span className="h-px w-10 bg-cyan-400" />

                <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">
                  Languages
                </h2>

              </div>

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                3 Spoken
              </span>

            </div>

            {/* Languages */}
            <div>

              {languages.map((language, index) => (
                <motion.div
                  key={language.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="group border-b border-slate-800 py-7 md:py-8"
                >

                  {/* Name + Level */}
                  <div className="flex items-center justify-between gap-4">

                    <h3 className="text-lg font-bold text-white transition-colors group-hover:text-cyan-400 md:text-xl">
                      {language.name}
                    </h3>

                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 transition-colors group-hover:text-cyan-400">
                      {language.level}
                    </span>

                  </div>

                  {/* Progress */}
                  <div className="mt-5 h-[3px] w-full bg-slate-800">

                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: language.progress }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        delay: 0.2 + index * 0.1,
                      }}
                      className="h-full bg-cyan-400"
                    />

                  </div>

                </motion.div>
              ))}

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}