import { motion } from "framer-motion";
import {
  Code2,
  ServerCog,
  Bot,
  Database,
} from "lucide-react";

const services = [
  {
    title: "Full-Stack Web Development",
    description:
      "Modern, responsive web platforms built from frontend interfaces to backend APIs and database architecture.",
    tags: ["React", "Next.js", "TypeScript"],
    icon: Code2,
  },
  {
    title: "Backend & APIs",
    description:
      "Robust REST APIs and backend systems designed for performance, scalability, security, and maintainability.",
    tags: ["Python", "FastAPI", "Node.js"],
    icon: ServerCog,
  },
  {
    title: "AI & Data Engineering",
    description:
      "AI-powered applications and data solutions combining machine learning, computer vision, automation, and intelligent workflows.",
    tags: ["Python", "YOLOv8", "AI / ML"],
    icon: Bot,
  },
  {
    title: "Databases & Infrastructure",
    description:
      "Reliable data architecture and deployment environments built for scalable applications and production workloads.",
    tags: ["PostgreSQL", "MongoDB", "Docker"],
    icon: Database,
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-12 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">

        {/* Section Header */}
        <div className="mb-8 max-w-4xl">
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
            I build reliable digital solutions that combine modern
            interfaces, scalable backend systems, AI and data.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-px overflow-hidden border border-slate-800 bg-slate-800 md:grid-cols-2">

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
                  delay: index * 0.08,
                }}
                className="
                  group
                  relative
                  min-h-[270px]
                  bg-slate-950
                  p-6
                  lg:p-7
                  transition-all
                  duration-500
                  hover:bg-slate-900
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
                    <Icon size={22} />
                  </div>

                  <span className="text-xs font-semibold tracking-[0.25em] text-slate-600">
                    0{index + 1}
                  </span>

                </div>

                {/* Content */}
                <div className="mt-6">

                  <h3 className="text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-sky-400">
                    {service.title}
                  </h3>

                  <p className="mt-3 max-w-xl text-base leading-6 text-slate-400">
                    {service.description}
                  </p>

                </div>

                {/* Divider */}
                <div className="mt-5 h-px w-full bg-slate-800 transition-colors duration-300 group-hover:bg-sky-400/30" />

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
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-[0.15em]
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

              </motion.article>
            );
          })}

        </div>

      </div>
    </section>
  );
}