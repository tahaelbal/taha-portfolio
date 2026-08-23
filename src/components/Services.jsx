import { motion } from "framer-motion";
import {
  Code2,
  ServerCog,
  Bot,
  Database,
  Search,
  BarChart3,
} from "lucide-react";

const services = [
  {
    title: "Full-Stack Development",
    description:
      "End-to-end web applications combining modern frontend experiences with scalable backend APIs and reliable database architecture.",
    tags: [
      "React",
      "Next.js",
      "Javascript",
      "Tailwind CSS",
      "Node.js",
      "Prisma",
    ],
    icon: Code2,
  },
  {
    title: "Backend & APIs",
    description:
      "High-performance backend systems and REST APIs built for scalability, security, maintainability, and reliable data processing.",
    tags: [
      "Python",
      "FastAPI",
      "Node.js",
      "REST APIs",
      "JWT",
      "Authentication",
    ],
    icon: ServerCog,
  },
  {
    title: "AI & Data Engineering",
    description:
      "Intelligent solutions combining machine learning, computer vision, automation, and data engineering to solve real-world problems.",
    tags: [
      "Python",
      "YOLOv8",
      "Machine Learning",
      "Deep Learning",
      "Pandas",
      "NumPy",
    ],
    icon: Bot,
  },
  {
    title: "Databases & Infrastructure",
    description:
      "Reliable data architectures and deployment environments designed for scalable applications, production workloads, and secure infrastructure.",
    tags: [
      "PostgreSQL",
      "MongoDB",
      "SQLite",
      "Docker",
      "Linux",
      "Cloud",
    ],
    icon: Database,
  },
  {
    title: "SEO & Performance",
    description:
      "Technical SEO and performance optimization focused on search visibility, fast loading times, accessibility, and a better user experience.",
    tags: [
      "SEO Optimization",
      "Technical SEO",
      "Web Analytics",
      "Core Web Vitals",
    ],
    icon: Search,
  },
  {
    title: "Data Analytics & Visualization",
    description:
      "Turning raw data into actionable insights through analysis, dashboards, reporting, and clear interactive visualizations.",
    tags: [
      "Power BI",
      "Python",
      "Pandas",
      "Talend",
      "Excel",
      "Data Visualization",
    ],
    icon: BarChart3,
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-12 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">

        {/* Section Header */}
        <div className="mb-8 max-w-5xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.45em] text-sky-400">
            Services
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Practical solutions for{" "}
            <span className="text-slate-500">
              modern products.
            </span>
          </h2>

          <p className="mt-3 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
            I build reliable digital solutions combining modern interfaces,
            scalable backend systems, AI, data, and performance-focused
            experiences.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-px overflow-hidden border border-slate-800 bg-slate-800 md:grid-cols-2 lg:grid-cols-3">

          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                }}
                className="
                  group
                  relative
                  flex
                  min-h-[330px]
                  flex-col
                  bg-slate-950
                  p-6
                  transition-all
                  duration-500
                  hover:bg-slate-900
                  lg:p-7
                "
              >

                {/* Hover line */}
                <div
                  className="
                    absolute
                    left-0
                    top-0
                    h-full
                    w-[2px]
                    origin-top
                    scale-y-0
                    bg-sky-400
                    transition-transform
                    duration-500
                    group-hover:scale-y-100
                  "
                />

                {/* Top */}
                <div className="flex items-start justify-between">

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-sky-400/20
                      bg-sky-400/10
                      text-sky-400
                      transition-all
                      duration-300
                      group-hover:border-sky-400/40
                      group-hover:bg-sky-400/15
                    "
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </div>

                  <span className="text-xs font-semibold tracking-[0.25em] text-slate-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                </div>

                {/* Content */}
                <div className="mt-6">

                  <h3 className="text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-sky-400">
                    {service.title}
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 lg:text-base">
                    {service.description}
                  </p>

                </div>

                {/* Divider */}
                <div
                  className="
                    mt-auto
                    pt-6
                  "
                >
                  <div className="h-px w-full bg-slate-800 transition-colors duration-300 group-hover:bg-sky-400/30" />

                  {/* Technologies */}
                  <div className="mt-4 flex flex-wrap gap-2">

                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="
                          border
                          border-slate-800
                          bg-slate-900/70
                          px-2.5
                          py-1.5
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.13em]
                          text-slate-400
                          transition-all
                          duration-300
                          group-hover:border-slate-700
                          group-hover:text-slate-200
                        "
                      >
                        {tag}
                      </span>
                    ))}

                  </div>
                </div>

              </motion.article>
            );
          })}

        </div>

      </div>
    </section>
  );
}