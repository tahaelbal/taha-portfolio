import { motion } from "framer-motion";
import {
  Code2,
  Server,
  BrainCircuit,
  Database,
  Cloud,
  BarChart3,
} from "lucide-react";

const skillGroups = [
  {
    title: "FRONTEND",
    count: "06",
    icon: Code2,
    skills: [
      "React",
      "Next.js",
      "JavaScript",
      "Figma",
      "Vite",
      "Tailwind CSS",
      "HTML / CSS",
    ],
  },
  {
    title: "BACKEND  & DATABASE",
    count: "06",
    icon: Server,
    skills: [
      "Oracle SQL",
      "Python",
      "FastAPI",
      "Node.js",
      "REST APIs",
      "MySQL",
      "MongoDB",
      "SQLite",
      "PostgreSQL",
      "Prisma ORM",
      "Auth.js",
    ],
  },
  {
    title: "AI & DATA",
    count: "06",
    icon: BrainCircuit,
    skills: [
      "YOLOv8",
      "Computer Vision",
      "Machine Learning",
      "Deep Learning",
      "OpenCV",
      "Pytorch",
      "Data Analysis",
    ],
  },
  {
    title: "Marketing & SEO",
    count: "04",
    icon: Database,
    skills: [
      "SEO Optimization",
      "Digital Marketing",
      "Web Analytics",
      "Content Strategy",
    ],
  },
  {
    title: "DEVOPS & TOOLS",
    count: "06",
    icon: Cloud,
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "Vercel",
      "Linux",
      "API Testing",
      "CI/CD",
    ],
  },
  {
    title: "DATA & ANALYTICS",
    count: "05",
    icon: BarChart3,
    skills: [
      "Power BI",
      "Numpy",
      "Pandas",
      "Talend",
      "Data Visualization",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-sky-500" />

                <span className="text-sm font-bold uppercase tracking-[0.3em] text-sky-400">
                  Skills
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Technologies I work with.
              </h2>
            </div>

            <span className="hidden text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 sm:block">
              33+ Technologies
            </span>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid overflow-hidden border border-slate-800 bg-slate-950/40 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;

            return (
              <motion.article
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                }}
                className="group min-h-[230px] border-b border-slate-800 p-6 transition-colors duration-300 hover:bg-sky-500/[0.04] sm:p-7"
              >
                {/* Category */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon
                      size={19}
                      strokeWidth={1.8}
                      className="text-sky-400"
                    />

                    <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-slate-200">
                      {group.title}
                    </h3>
                  </div>

                  <span className="text-xs font-bold text-slate-500">
                    {group.count}
                  </span>
                </div>

                {/* Skills */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="border border-slate-700 bg-slate-900/70 px-3 py-2 text-xs font-semibold text-slate-300 transition-all duration-200 hover:border-sky-500/60 hover:bg-sky-500/10 hover:text-sky-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Bottom line */}
                <div className="mt-8 h-px w-full bg-slate-800">
                  <div className="h-px w-0 bg-sky-500 transition-all duration-500 group-hover:w-16" />
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}