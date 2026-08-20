import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { projects } from "../data/projects";

export default function Work() {
  const buttonBase =
    "inline-flex items-center gap-3 rounded-full font-semibold uppercase tracking-[1.5px] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a]";
  const primaryButton =
    `${buttonBase} px-6 py-4 text-sm bg-cyan-500 text-slate-950 shadow-sm shadow-slate-950/10 hover:bg-white hover:text-slate-950`;
  const secondaryButton =
    `${buttonBase} px-5 py-3 text-xs border border-slate-600 text-slate-300 hover:border-white hover:text-white`;
  const badgeClasses =
    "whitespace-nowrap rounded-full border border-slate-600 bg-slate-950/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[1px] text-slate-300 transition duration-300 hover:border-slate-400 hover:text-white";

  return (
    <section
      id="work"
      className="relative overflow-hidden bg-[#1e293b] py-12 text-white"
    >
      {/* Background Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

        {/* Section Header */}
        <SectionHeading
          eyebrow="SELECTED WORK"
          title="Projects"
          description="A selection of projects I've designed and developed."
        />

        {/* Projects */}
        <div className="mt-2 space-y-4">

          {projects.slice(0, 3).map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={project.id ?? `${project.title}-${index}`}
                initial={{
                  opacity: 0,
                  y: 60,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                }}
                className={`
                  group
                  grid
                  items-center
                  gap-6
                  border-b
                  border-slate-600/50
                  py-10
                  lg:grid-cols-2
                  lg:gap-8
                `}
              >

                {/* ================= IMAGE ================= */}

                <div
                  className={`
                    relative
                    ${isEven ? "lg:order-1" : "lg:order-2"}
                  `}
                >

                  {/* Image Number */}
                  <div className="absolute -top-7 left-0 z-10 text-sm font-semibold tracking-[3px] text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Image */}
                  <div
                    className="
                      relative
                      aspect-[16/10]
                      overflow-hidden
                      border
                      border-slate-600
                      bg-slate-900
                    "
                  >

                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.alt ?? project.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        width="1280"
                        height="800"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-slate-900">
                        <span className="text-sm uppercase tracking-[4px] text-slate-500">
                          Project Image
                        </span>
                      </div>
                    )}

                    {/* Image Overlay */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-blue-500/0
                        transition-all
                        duration-500
                        group-hover:bg-blue-500/10
                      "
                    />

                  </div>

                  {/* Corner Decoration */}
                  <div
                    className="
                      absolute
                      -bottom-3
                      -right-3
                      h-16
                      w-16
                      border-b-2
                      border-r-2
                      border-blue-400
                      opacity-0
                      transition-all
                      duration-500
                      group-hover:opacity-100
                    "
                  />

                </div>


                {/* ================= CONTENT ================= */}

                <div
                  className={`
                    ${isEven ? "lg:order-2" : "lg:order-1"}
                  `}
                >

                  {/* Top line */}
                  <div className="flex items-center gap-3">

                    <span className="text-sm font-semibold tracking-[3px] text-slate-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className="
                        bg-cyan-500/80
                        px-3
                        py-1
                        text-xs
                        font-bold
                        uppercase
                        tracking-[2px]
                        text-white
                      "
                    >
                      Featured
                    </span>

                  </div>


                  {/* Title */}
                  <h3
                    className="
                      mt-7
                      text-4xl
                      font-bold
                      tracking-tight
                      text-white
                      transition-colors
                      duration-300
                      group-hover:text-cyan-400
                      md:text-5xl
                    "
                  >
                    {project.title}
                  </h3>


                  {/* Main Description */}
                  <div
                    className="
                      mt-7
                      border-l-2
                      border-cyan-400
                      pl-5
                    "
                  >
                    <p className="text-lg leading-8 text-slate-200">
                      {project.description}
                    </p>
                  </div>


                  {/* Secondary Description */}
                  {project.longDescription && (
                    <p className="mt-7 text-base leading-8 text-slate-400">
                      {project.longDescription}
                    </p>
                  )}


                  {/* Visit Button */}
                  <div className="mt-8">

                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${project.title}`}
                        className={primaryButton}
                      >
                        Visit Website

                        <ArrowUpRight
                          size={18}
                          className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                        />
                      </a>
                    ) : (
                      <button type="button" className={primaryButton}>
                        View Project
                        <ArrowUpRight aria-hidden="true" size={18} className="transition-transform duration-300" />
                      </button>
                    )}

                  </div>


                  {/* Technologies */}
                  <div className="mt-5 flex flex-wrap gap-2 max-w-full">
                    {project.stack?.map((technology, techIndex) => (
                      <span key={`${technology}-${techIndex}`} className={badgeClasses}>
                        {technology}
                      </span>
                    ))}
                  </div>

                </div>

              </motion.article>
            );
          })}

        </div>
        {/* ================= MORE WORK ================= */}

<div className="mt-4">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[3px] text-slate-400">
              More Work
            </p>
          </div>

          <div className="grid gap-4 border border-slate-600/60 md:grid-cols-2 lg:grid-cols-3">
    {projects.slice(3).map((project, index) => (

      <motion.article
        key={project.id ?? `${project.title}-${index}`}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.6,
          delay: index * 0.08,
        }}
        className="
          group
          overflow-hidden
          border-b
          border-slate-600/60
          bg-[#1e293b]
          md:border-r
          lg:last:border-r-0
        "
      >

        {/* ================= IMAGE ================= */}

        <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-600/60">

          {project.image ? (
            <img
              src={project.image}
              alt={project.alt ?? project.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              width="1280"
              height="800"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-slate-900">
              <span className="text-xs uppercase tracking-[3px] text-slate-500">
                Project
              </span>
            </div>
          )}

          {/* Image overlay */}
          <div
            className="
              absolute
              inset-0
              bg-blue-500/0
              transition
              duration-500
              group-hover:bg-blue-500/10
            "
          />

        </div>


        {/* ================= CONTENT ================= */}

        <div className="p-7">

          {/* Number + Category */}
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <span className="text-xs font-bold tracking-[2px] text-slate-400">
                {String(index + 4).padStart(2, "0")}
              </span>

              {project.category && (
                <span
                  className="
                    bg-cyan-500/80
                    px-3
                    py-1
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[2px]
                    text-slate-950
                  "
                >
                  {project.category}
                </span>
              )}

            </div>

            <ArrowUpRight
              size={18}
              className="
                text-slate-500
                transition-all
                duration-300
                group-hover:-translate-y-1
                group-hover:translate-x-1
                group-hover:text-cyan-400
              "
            />

          </div>


          {/* Title */}

          <h3
            className="
              mt-7
              text-xl
              font-bold
              text-white
              transition-colors
              duration-300
              group-hover:text-cyan-400
            "
          >
            {project.title}
          </h3>


          {/* Description */}

          <p className="mt-5 min-h-[100px] text-sm leading-7 text-slate-400">
            {project.description}
          </p>


          {/* Separator */}

          <div className="my-5 h-px bg-slate-600/60" />


          {/* Buttons */}

          <div className="flex flex-wrap gap-3">

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.title}`}
                className={`${buttonBase} px-5 py-3 text-xs bg-cyan-500 text-slate-950 hover:bg-white hover:text-slate-950 shadow-sm shadow-slate-950/10`}
              >
                Visit Website
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </a>
            )}

            {project.adminLink && (
              <a
                href={project.adminLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open admin panel for ${project.title}`}
                className={`${secondaryButton}`}
              >
                Admin Panel
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </a>
            )}

          </div>


          {/* Technologies */}

          <div className="mt-4 flex flex-wrap gap-2 max-w-full">
            {project.stack?.map((technology, techIndex) => (
              <span key={`${technology}-${techIndex}`} className={badgeClasses}>
                {technology}
              </span>
            ))}
          </div>

        </div>

      </motion.article>

    ))}

  </div>

</div>
      </div>
      
    </section>
  );
}